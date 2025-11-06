/*
  Vanilla JS Todo App with localStorage persistence
  - Features: add, edit, delete, toggle complete, filter, sort
  - Optional: priority and due date
*/

(function () {
  'use strict';

  /** Storage Keys **/
  const STORAGE_KEY = 'todo.tasks.v1';

  /** Elements **/
  const formEl = document.getElementById('task-form');
  const inputEl = document.getElementById('task-input');
  const priorityEl = document.getElementById('priority');
  const dueEl = document.getElementById('due');
  const errorEl = document.getElementById('form-error');
  const listEl = document.getElementById('task-list');
  const emptyEl = document.getElementById('empty-state');
  const filterButtons = Array.from(document.querySelectorAll('.chip'));
  const sortByEl = document.getElementById('sort-by');

  /** State **/
  /** @type {Array<{id:string,text:string,completed:boolean,priority:'low'|'normal'|'high',due:string|null,created:number}>} */
  let tasks = [];
  let currentFilter = 'all';

  /** Utils **/
  const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      tasks = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(tasks)) tasks = [];
    } catch (_) {
      tasks = [];
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (_) {
      // Best-effort; ignore quota errors
    }
  }

  function setError(message) {
    errorEl.textContent = message || '';
  }

  function clearComposer() {
    inputEl.value = '';
    priorityEl.value = 'normal';
    dueEl.value = '';
  }

  /** Rendering **/
  function render() {
    const filtered = tasks.filter(t => {
      if (currentFilter === 'active') return !t.completed;
      if (currentFilter === 'completed') return t.completed;
      return true;
    });

    const sorted = filtered.slice().sort((a, b) => {
      switch (sortByEl.value) {
        case 'created_asc': return a.created - b.created;
        case 'due_asc':
          return (a.due ? new Date(a.due).getTime() : Infinity) - (b.due ? new Date(b.due).getTime() : Infinity);
        case 'priority_desc':
          return priorityRank(b.priority) - priorityRank(a.priority);
        case 'created_desc':
        default:
          return b.created - a.created;
      }
    });

    listEl.innerHTML = '';
    if (sorted.length === 0) {
      emptyEl.hidden = false;
      return;
    }
    emptyEl.hidden = true;

    for (const task of sorted) {
      listEl.appendChild(renderItem(task));
    }
  }

  function priorityRank(p) {
    return p === 'high' ? 2 : p === 'normal' ? 1 : 0;
  }

  function renderItem(task) {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');
    li.dataset.id = task.id;

    // Left: checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', 'Mark task as completed');
    checkbox.addEventListener('change', () => toggleComplete(task.id, checkbox.checked));

    // Middle: content
    const content = document.createElement('div');
    const title = document.createElement('p');
    title.className = 'task-title';
    title.textContent = task.text;

    const meta = document.createElement('div');
    meta.className = 'muted';
    const parts = [];
    if (task.due) parts.push(`Due ${formatDate(task.due)}`);
    parts.push(`Added ${relativeTime(task.created)}`);
    meta.textContent = parts.join(' • ');

    const badge = document.createElement('span');
    badge.className = `badge ${task.priority}`;
    badge.textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

    content.appendChild(title);
    content.appendChild(meta);
    content.appendChild(badge);

    // Right: actions
    const actions = document.createElement('div');
    actions.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'icon-btn';
    editBtn.type = 'button';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => startEdit(li, task));

    const delBtn = document.createElement('button');
    delBtn.className = 'icon-btn delete';
    delBtn.type = 'button';
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => deleteTask(task.id));

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(checkbox);
    li.appendChild(content);
    li.appendChild(actions);
    return li;
  }

  function formatDate(iso) {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString();
    } catch { return iso; }
  }

  function relativeTime(ts) {
    const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });
    const diff = Date.now() - ts;
    const minutes = Math.round(diff / 60000);
    if (Math.abs(minutes) < 60) return rtf.format(-minutes, 'minute');
    const hours = Math.round(minutes / 60);
    if (Math.abs(hours) < 24) return rtf.format(-hours, 'hour');
    const days = Math.round(hours / 24);
    return rtf.format(-days, 'day');
  }

  /** CRUD **/
  function addTask(text, priority, due) {
    const trimmed = text.trim();
    if (trimmed.length === 0) {
      setError('Please enter a task.');
      inputEl.focus();
      return;
    }
    const newTask = {
      id: uid(),
      text: trimmed,
      completed: false,
      priority: priority || 'normal',
      due: due || null,
      created: Date.now(),
    };
    tasks.unshift(newTask);
    save();
    setError('');
    clearComposer();
    render();
  }

  function toggleComplete(id, completed) {
    const t = tasks.find(t => t.id === id);
    if (!t) return;
    t.completed = Boolean(completed);
    save();
    render();
  }

  function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    save();
    render();
  }

  function startEdit(li, task) {
    // Guard: avoid duplicate edit rows
    if (li.querySelector('.edit-row')) return;

    const editRow = document.createElement('div');
    editRow.className = 'edit-row';
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = task.text;
    editInput.setAttribute('aria-label', 'Edit task');

    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn';
    saveBtn.type = 'button';
    saveBtn.textContent = 'Save';

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'icon-btn';
    cancelBtn.type = 'button';
    cancelBtn.textContent = 'Cancel';

    saveBtn.addEventListener('click', () => {
      const val = editInput.value.trim();
      if (!val) {
        editInput.focus();
        return;
      }
      task.text = val;
      save();
      render();
    });
    cancelBtn.addEventListener('click', () => {
      render();
    });
    editInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') saveBtn.click();
      if (e.key === 'Escape') cancelBtn.click();
    });

    editRow.appendChild(editInput);
    editRow.appendChild(saveBtn);
    editRow.appendChild(cancelBtn);

    li.appendChild(editRow);
    editInput.focus();
    editInput.setSelectionRange(editInput.value.length, editInput.value.length);
  }

  /** Events **/
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask(inputEl.value, priorityEl.value, dueEl.value || null);
  });

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      currentFilter = btn.dataset.filter || 'all';
      render();
    });
  });

  sortByEl.addEventListener('change', () => render());

  /** Init **/
  load();
  render();
})();


