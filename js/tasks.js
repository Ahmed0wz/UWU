// HEADER SCORE BADGES
// Month total shown on month/year views; all-time always shown

function updateHeaderScores() {
    const container = document.getElementById('headerScores');
    if (!container) return;

    const allTime = calcAllTimeTotal();
    const dateStr = dateToLocalString(state.currentDate);
    const monthTotal = state.calendarMode === 'hijri' ? calcHijriMonthTotal(state.currentDate) : calcMonthTotal(dateStr);
    let monthName, year;
    if (state.calendarMode === 'hijri') {
        const h = toHijri(state.currentDate);
        const hm = islamicMonths.indexOf(h.month) + 1;
        monthName = tHijri(hm).substring(0, 5);
        year = h.year;
    } else {
        monthName = t('monthNamesShort')[state.currentDate.getMonth()];
        year = state.currentDate.getFullYear();
    }

    const showMonthScore = state.currentView === 'month' || state.currentView === 'year';

    container.innerHTML = `
        ${showMonthScore ? `
        <div class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg theme-bg-tertiary border theme-border text-sm">
            <span class="text-[11px] theme-text-secondary font-medium">${state.currentView === 'year' ? year : monthName}</span>
            <span class="font-bold text-blue-600 dark:text-blue-400">${state.currentView === 'year' ? calcYearTotal() : monthTotal} ${t('pts')}</span>
        </div>` : ''}
        <div class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg theme-bg-tertiary border theme-border text-sm" title="All-time score">
            <svg class="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
            <span class="text-[11px] theme-text-secondary font-medium">${t('allTime')}</span>
            <span class="font-bold text-blue-600 dark:text-blue-400">${allTime} ${t('pts')}</span>
        </div>
    `;
}

function calcYearTotal() {
    const year = state.currentDate.getFullYear();
    let total = 0;
    const seenWeeks = new Set();
    for (let m = 0; m < 12; m++) {
        const days = new Date(year, m + 1, 0).getDate();
        for (let d = 1; d <= days; d++) {
            const key = `${year}-${String(m + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
            total += calcDayTotal(key);
            const wk = getWeekKey(key);
            if (!seenWeeks.has(wk)) {
                seenWeeks.add(wk);
                const sun = new Date(wk + 'T12:00:00');
                if (sun.getFullYear() === year) total += calcWeekTaskPts(wk);
            }
        }
        total += calcMonthTaskPts(`${year}-${String(m + 1).padStart(2,'0')}`);
    }
    total += calcYearTaskPts(String(year));
    return total;
}

function showTasksTab() {
    state.sidebarView = 'tasks';
    renderSidebarContent();
}

function setTaskPeriod(period) {
    state.taskPeriod = period;
    renderSidebarContent();
}

function getTaskKey(dateStr) {
    const p = state.taskPeriod;
    return p === 'day' ? dateStr : p === 'week' ? getWeekKey(dateStr) : p === 'month' ? getMonthKey(dateStr) : getYearKey(dateStr);
}

function renderTaskList(dateStr) {
    const p = state.taskPeriod;
    const key = getTaskKey(dateStr);
    const list = state.tasks[p][key] || [];
    if (list.length === 0) {
        const noTaskLabels = {
            day:   state.language==='ar' ? 'لا مهام اليوم' : 'No tasks today',
            week:  state.language==='ar' ? 'لا مهام هذا الأسبوع' : 'No tasks this week',
            month: state.language==='ar' ? 'لا مهام هذا الشهر' : 'No tasks this month',
            year:  state.language==='ar' ? 'لا مهام هذا العام' : 'No tasks this year',
        };
        return `<p class="text-sm theme-text-secondary text-center py-6">${noTaskLabels[p]}</p>`;
    }
    const completedPts = list.filter(t => t.completed).reduce((s, t) => s + (t.points || 0), 0);
    const totalPts = list.reduce((s, t) => s + (t.points || 0), 0);
    return `
        <div class="flex items-center justify-between py-1 mb-1">
            <span class="text-xs theme-text-secondary">${list.filter(t=>t.completed).length}/${list.length} ${state.language==='ar' ? 'مكتمل' : 'done'}</span>
            <span class="text-xs font-semibold text-blue-600 dark:text-blue-400">${completedPts}/${totalPts} ${t('pts')}</span>
        </div>
        ${list.map((task, idx) => `
        <div class="rounded-xl ${task.completed ? 'theme-bg-tertiary opacity-60' : 'theme-bg-panel border theme-border'} transition-all overflow-hidden">
            <div class="flex items-center gap-2.5 px-2.5 py-2">
                <button onclick="toggleTask('${dateStr}', ${idx})"
                    class="shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                        ${task.completed ? 'bg-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-600'}">
                    ${task.completed ? '<svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>' : ''}
                </button>
                <span class="flex-1 text-sm ${task.completed ? 'line-through theme-text-secondary' : 'theme-text'}">${task.name}</span>
                ${task.points ? `<span class="text-xs font-semibold ${task.completed ? 'text-blue-400' : 'text-blue-600 dark:text-blue-400'} shrink-0">${task.points}${t('pts')}</span>` : ''}
                <button onclick="toggleTaskNotes('${dateStr}', ${idx})" title="Notes" class="shrink-0 p-0.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                    <svg class="w-3.5 h-3.5 ${task.notes ? 'text-blue-500' : 'text-gray-400'}" fill="${task.notes ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </button>
                <button onclick="forgetTask('${dateStr}', ${idx})" title="Mark as forgotten" class="shrink-0 p-0.5 rounded hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                    <svg class="w-3.5 h-3.5 text-gray-400 hover:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </button>
                <button onclick="deleteTask('${dateStr}', ${idx})" title="Delete task" class="shrink-0 p-0.5 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                    <svg class="w-3.5 h-3.5 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            </div>
            <div id="task-notes-${idx}" class="${task._notesOpen ? '' : 'hidden'} px-2.5 pb-2">
                <textarea rows="2" placeholder="Add a note…"
                    class="w-full text-xs theme-bg-tertiary border theme-border rounded-lg px-2 py-1.5 focus:ring-1 focus:ring-blue-500 theme-text resize-none"
                    onblur="saveTaskNote('${dateStr}', ${idx}, this.value)"
                    onkeydown="if(event.key==='Escape'){event.target.blur();}" placeholder="${state.language==='ar' ? 'أضف ملاحظة…' : 'Add a note…'}"
                    >${task.notes || ''}</textarea>
            </div>
        </div>`).join('')}
    `;
}

function toggleTaskNotes(dateStr, idx) {
    const p = state.taskPeriod;
    const key = getTaskKey(dateStr);
    const task = state.tasks[p][key]?.[idx];
    if (!task) return;
    task._notesOpen = !task._notesOpen;
    // Don't save _notesOpen to storage — just re-render
    renderSidebarContent();
    // Focus the textarea after render
    setTimeout(() => {
        const el = document.getElementById(`task-notes-${idx}`)?.querySelector('textarea');
        if (el && task._notesOpen) el.focus();
    }, 0);
}

function saveTaskNote(dateStr, idx, value) {
    const p = state.taskPeriod;
    const key = getTaskKey(dateStr);
    const task = state.tasks[p][key]?.[idx];
    if (!task) return;
    task.notes = value.trim() || undefined;
    saveTasks();
    // Update note icon color without full re-render
    const notesDiv = document.getElementById(`task-notes-${idx}`);
    if (notesDiv) {
        const btn = notesDiv.previousElementSibling?.querySelector('[title="Notes"] svg');
        if (btn) {
            btn.style.color = task.notes ? 'rgb(59,130,246)' : '';
            btn.setAttribute('fill', task.notes ? 'currentColor' : 'none');
        }
    }
}



function addTask() {
    const nameEl = $('newTaskName'), ptsEl = $('newTaskPoints');
    const name = nameEl?.value?.trim();
    if (!name) return;
    const key = getTaskKey(state.currentDaySidebar);
    const p = state.taskPeriod;
    (state.tasks[p][key] ||= []).push({ id: Date.now(), name, points: parseInt(ptsEl?.value) || 0, completed: false });
    saveTasks(); renderSidebarContent();
    setTimeout(() => $('newTaskName')?.focus(), 0);
}

function toggleTask(dateStr, idx) {
    const p = state.taskPeriod;
    const key = getTaskKey(dateStr);
    const task = state.tasks[p][key]?.[idx];
    if (!task) return;
    task.completed = !task.completed;
    saveTasks();
    renderSidebarContent();
}

function deleteTask(dateStr, idx) {
    const p = state.taskPeriod;
    const key = getTaskKey(dateStr);
    state.tasks[p][key]?.splice(idx, 1);
    saveTasks();
    renderSidebarContent();
}

function forgetTask(dateStr, idx) {
    const p = state.taskPeriod;
    const key = getTaskKey(dateStr);
    const task = state.tasks[p][key]?.[idx];
    if (!task) return;
    const periodLabels = { day: 'Day', week: 'Week', month: 'Month', year: 'Year' };
    state.forgottenTasks.unshift({
        id: Date.now(), name: task.name, points: task.points || 0,
        originalPeriod: p, originalKey: key, periodLabel: periodLabels[p], 
        forgottenAt: new Date().toISOString(), attributedDate: null, completed: false
    });
    state.tasks[p][key].splice(idx, 1);
    saveTasks(); saveForgottenTasks(); updateForgottenBadge(); renderSidebarContent();
}

function getRenderWindowLabel() {
    const rwLabels = state.language==='ar' ? RENDER_WINDOW_LABELS_AR : RENDER_WINDOW_LABELS_EN;
    const steps  = RENDER_WINDOW_STEPS;
    const d = state.renderWindowDays;
    if (d <= 7) return '1 week';
    if (d <= 14) return '2 weeks';
    if (d <= 31) return '1 month';
    if (d <= 92) return '3 months';
    if (d <= 183) return '6 months';
    return '1 year';
}

function openRenderWindowSettings() {
    showEl('renderWindowModal');
    const steps = [7, 14, 31, 92, 183, 365];
    const slider = document.getElementById('renderWindowSlider');
    if (slider) {
        const idx = steps.indexOf(state.renderWindowDays);
        slider.value = idx >= 0 ? idx : 2;
        onRenderWindowSlide(slider.value);
    }
}

function closeRenderWindowSettings() { hideEl('renderWindowModal'); }

function setRenderWindow(days) {
    state.renderWindowDays = days;
    saveRenderWindow();
    const lbl = document.getElementById('renderWindowLabel');
    if (lbl) lbl.textContent = getRenderWindowLabel();
    renderCurrentView();
    closeRenderWindowSettings();
}

const RENDER_WINDOW_STEPS = [7, 14, 31, 92, 183, 365];
const RENDER_WINDOW_LABELS_EN = ['1 Week', '2 Weeks', '1 Month', '3 Months', '6 Months', '1 Year'];
const RENDER_WINDOW_LABELS_AR = ['أسبوع', 'أسبوعان', 'شهر', '٣ أشهر', '٦ أشهر', 'سنة'];
const RENDER_WINDOW_DESCS_EN = [
    'Lightest — ideal for slow devices or phones.',
    'Light — good for most mobile use.',
    'Default — balanced performance for most devices.',
    'Comfortable — good for tablets and mid-range PCs.',
    'Heavier — recommended for laptops and desktops.',
    'Maximum — for powerful devices only.'
];
const RENDER_WINDOW_DESCS_AR = [
    'الأخف — مثالي للأجهزة البطيئة والهواتف.',
    'خفيف — مناسب لمعظم الهواتف.',
    'افتراضي — أداء متوازن لمعظم الأجهزة.',
    'مريح — مناسب للأجهزة اللوحية والحواسيب المتوسطة.',
    'ثقيل — موصى به للحواسيب المحمولة والمكتبية.',
    'الحد الأقصى — للأجهزة القوية فقط.'
];

function onRenderWindowSlide(val) {
    const i = parseInt(val);
    const label = document.getElementById('renderWindowSliderLabel');
    const desc = document.getElementById('renderWindowDesc');
    const rwLabels = state.language==='ar' ? RENDER_WINDOW_LABELS_AR : RENDER_WINDOW_LABELS_EN;
    const rwDescs  = state.language==='ar' ? RENDER_WINDOW_DESCS_AR  : RENDER_WINDOW_DESCS_EN;
    if (label) label.textContent = rwLabels[i] || '';
    if (desc) desc.textContent  = rwDescs[i]  || '';
}

function applyRenderWindowSlider() {
    const slider = document.getElementById('renderWindowSlider');
    if (!slider) return;
    const days = RENDER_WINDOW_STEPS[parseInt(slider.value)];
    setRenderWindow(days);
}

function savePfp() { saveToStorage(STORAGE_KEYS.PFP(state.currentUser), state.pfp); }
function loadPfp() { state.pfp = loadFromStorage(STORAGE_KEYS.PFP(state.currentUser)) || null; updateAvatarDisplay(); }
function saveMonthlyBg() { saveToStorage(STORAGE_KEYS.MONTHLY_BG(state.currentUser), state.monthlyBackgrounds); }
function loadMonthlyBg() { state.monthlyBackgrounds = loadFromStorage(STORAGE_KEYS.MONTHLY_BG(state.currentUser)) || {}; }

function updateAvatarDisplay() {
    const avatar = document.getElementById('userAvatar');
    if (!avatar) return;
    if (state.pfp) {
        avatar.innerHTML = '';
        avatar.style.backgroundImage = `url(${state.pfp})`;
        avatar.style.backgroundSize = 'cover';
        avatar.style.backgroundPosition = 'center';
        avatar.style.fontSize = '0';
    } else {
        avatar.style.backgroundImage = '';
        avatar.style.backgroundSize = '';
        avatar.innerHTML = state.currentUser.substring(0, 2).toUpperCase();
    }
}

function handlePfpUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        // Compress to max 200x200 for storage efficiency
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const size = 200;
            canvas.width = size; canvas.height = size;
            const ctx = canvas.getContext('2d');
            // Crop to square from center
            const min = Math.min(img.width, img.height);
            const sx = (img.width - min) / 2;
            const sy = (img.height - min) / 2;
            ctx.drawImage(img, sx, sy, min, min, 0, 0, size, size);
            state.pfp = canvas.toDataURL('image/jpeg', 0.8);
            savePfp();
            updateAvatarDisplay();
            closeAccountSettings();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function removePfp() {
    state.pfp = null;
    savePfp();
    updateAvatarDisplay();
}

function updateForgottenBadge() {
    const badge = $('forgottenBadge');
    if (!badge) return;
    const pending = state.forgottenTasks.filter(t => !t.completed).length;
    badge.textContent = pending;
    badge.classList.toggle('hidden', !pending);
}

function openForgottenTasks() {
    closeAccountSettings();
    renderForgottenTasksModal();
    const modal = $('forgottenTasksModal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
}

function closeForgottenTasks() {
    const modal = $('forgottenTasksModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.style.display = '';
}

function openViewAllTasks() {
    $('viewAllTasksModal')?.remove();
    const modal = document.createElement('div');
    modal.id = 'viewAllTasksModal';
    modal.className = 'fixed inset-0 z-[200] flex items-end sm:items-center justify-center modal-backdrop';
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });

    // Gather all uncompleted tasks across all scopes and keys
    const sections = [];
    const scopeLabels = state.language==='ar' ? { day: 'يومية', week: 'أسبوعية', month: 'شهرية', year: 'سنوية' } : { day: 'Daily', week: 'Weekly', month: 'Monthly', year: 'Yearly' };
    for (const scope of ['day', 'week', 'month', 'year']) {
        const entries = [];
        for (const [key, list] of Object.entries(state.tasks[scope] || {})) {
            const pending = (list || []).filter(t => !t.completed);
            for (const t of pending) entries.push({ key, task: t, scope });
        }
        // Sort keys newest-first (they're date strings)
        entries.sort((a, b) => b.key.localeCompare(a.key));
        if (entries.length) sections.push({ scope, label: scopeLabels[scope], entries });
    }

    const total = sections.reduce((s, sec) => s + sec.entries.length, 0);

    const bodyHTML = total === 0
        ? `<div class="text-center py-12 theme-text-secondary">
            <div class="text-4xl mb-3">✅</div>
            <p class="font-medium">${state.language==='ar' ? 'أحسنت! لا شيء بقي' : 'All caught up!'}</p>
            <p class="text-sm mt-1 opacity-70">${state.language==='ar' ? 'لا مهام غير مكتملة' : 'No uncompleted tasks across any period'}</p>
           </div>`
        : sections.map(sec => `
            <div class="px-5 pt-4 pb-1">
                <div class="text-xs font-bold theme-text-secondary uppercase tracking-wider mb-2">${sec.label} · ${sec.entries.length}</div>
                <div class="space-y-1.5">
                    ${sec.entries.map(({ key, task }) => `
                    <div class="flex items-start gap-3 py-2 px-3 theme-bg-tertiary rounded-xl">
                        <div class="flex-1 min-w-0">
                            <div class="text-sm font-medium theme-text truncate">${task.name}</div>
                            <div class="text-xs theme-text-secondary">${key}${task.points ? ' · ' + task.points + ' ' + t('pts') : ''}</div>
                            ${task.notes ? `<div class="text-xs theme-text-secondary mt-0.5 italic">${task.notes}</div>` : ''}
                        </div>
                        <button onclick="quickCompleteTask('${sec.scope}','${key}',${task.id})"
                            class="p-1.5 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 transition-colors flex-shrink-0" title="Complete">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        </button>
                    </div>`).join('')}
                </div>
            </div>`).join('');

    modal.innerHTML = `
        <div class="theme-bg rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col border theme-border overflow-hidden">
            <div class="px-5 py-4 border-b theme-border flex items-center justify-between shrink-0">
                <div>
                    <h2 class="font-bold text-base">${state.language==='ar' ? 'جميع المهام المعلقة' : 'All Pending Tasks'}</h2>
                    <p class="text-xs theme-text-secondary mt-0.5">${total} ${state.language==='ar' ? 'مهمة غير مكتملة' : ('uncompleted task' + (total !== 1 ? 's' : '') + ' across all periods')}</p>
                </div>
                <button onclick="$('viewAllTasksModal')?.remove()" class="p-2 hover:theme-bg-tertiary rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            </div>
            <div class="overflow-y-auto flex-1 pb-4">${bodyHTML}</div>
        </div>`;
    document.body.appendChild(modal);
}

function quickCompleteTask(scope, key, taskId) {
    const list = state.tasks[scope]?.[key];
    if (!list) return;
    const t = list.find(t => t.id === taskId);
    if (t) t.completed = true;
    saveTasks(); updateHeaderScores(); updateForgottenBadge();
    // Re-render the modal in place
    $('viewAllTasksModal')?.remove();
    openViewAllTasks();
}

function renderForgottenTasksModal() {
    const container = document.getElementById('forgottenTasksList');
    if (!container) return;
    const list = state.forgottenTasks;
    if (list.length === 0) {
        container.innerHTML = `<div class="text-center py-12 theme-text-secondary"><div class="text-4xl mb-3">&#x2705;</div><p class="font-medium">${state.language==='ar' ? 'لا توجد مهام منسية' : 'No forgotten tasks'}</p><p class="text-sm mt-1 opacity-70">${state.language==='ar' ? 'المهام التي تؤجلها ستظهر هنا' : 'Tasks you mark as forgotten will appear here'}</p></div>`;
        return;
    }
    container.innerHTML = list.map((task, idx) => {
        const forgottenLabel = new Date(task.forgottenAt).toLocaleDateString(state.language==='ar' ? 'ar-SA' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const completedHtml = task.completed
            ? `<div class="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                Completed &middot; ${new Date(task.attributedDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
               </div>`
            : `<div class="space-y-2">
                <p class="text-xs font-medium theme-text-secondary">${state.language==='ar' ? 'أكمل المهمة وانسبها ليوم:' : 'Complete and attribute to a day:'}</p>
                <div class="flex gap-2">
                    <input type="date" id="forgotten-date-${idx}" value="${dateToLocalString(new Date())}"
                        class="flex-1 theme-bg-panel border theme-border rounded-lg px-3 py-2 text-sm theme-text focus:ring-2 focus:ring-blue-500">
                    <button onclick="completeForgottenTask(${idx})"
                        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
                        &#x2713; ${state.language==='ar' ? 'إتمام' : 'Complete'}
                    </button>
                </div>
               </div>`;
        return `
        <div class="theme-bg-tertiary rounded-xl p-4 space-y-3">
            <div class="flex items-start justify-between gap-3">
                <div class="flex-1 min-w-0">
                    <p class="font-medium theme-text">${task.name}</p>
                    <div class="flex flex-wrap items-center gap-2 mt-1">
                        <span class="text-xs theme-text-secondary">${state.language==='ar' ? 'مهمة ' + {day:'يومية',week:'أسبوعية',month:'شهرية',year:'سنوية'}[task.originalPeriod] : 'Originally a <strong>' + task.periodLabel + '</strong> task'}</span>
                        ${task.points ? `<span class="text-xs font-semibold text-blue-600 dark:text-blue-400">${task.points} pts</span>` : ''}
                    </div>
                    <p class="text-xs theme-text-secondary mt-0.5">${state.language==='ar' ? 'تم تأجيلها ' : 'Forgotten '} ${forgottenLabel}</p>
                </div>
                <button onclick="deleteForgottenTask(${idx})" title="Remove permanently"
                    class="shrink-0 p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                    <svg class="w-4 h-4 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
            </div>
            ${completedHtml}
        </div>`;
    }).join('');
}

function completeForgottenTask(idx) {
    const task = state.forgottenTasks[idx];
    if (!task) return;
    const dateInput = document.getElementById('forgotten-date-' + idx);
    const chosenDate = dateInput?.value;
    if (!chosenDate) return;
    if (!state.tasks.day[chosenDate]) state.tasks.day[chosenDate] = [];
    state.tasks.day[chosenDate].push({ id: Date.now(), name: task.name, points: task.points, completed: true, fromForgotten: true });
    task.completed = true;
    task.attributedDate = chosenDate;
    saveTasks(); saveForgottenTasks(); updateForgottenBadge(); updateHeaderScores();
    if (state.currentDaySidebar) renderSidebarContent();
    renderForgottenTasksModal();
}

function deleteForgottenTask(idx) {
    state.forgottenTasks.splice(idx, 1);
    saveForgottenTasks(); updateForgottenBadge(); renderForgottenTasksModal();
}


function getWeekTotal(dateStr) {
    const date = new Date(dateStr + 'T12:00:00');
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    let total = 0;
    for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        total += calcDayTotal(dateToLocalString(d));
    }
    total += calcWeekTaskPts(getWeekKey(dateStr));
    return total;
}

function showJournalEditor() {
    switchView('day');
    const today = todayLocalString();
    state.currentDate = new Date(today + 'T12:00:00');
    state.sidebarView = 'journal';
    openDaySidebar(today);
}

function openScoreView() {
    switchView('day');
    const today = todayLocalString();
    state.currentDate = new Date(today + 'T12:00:00');
    state.sidebarView = 'score';
    openDaySidebar(today);
}

function showScoreEditor() {
    state.sidebarView = 'score';
    renderSidebarContent();
    setTimeout(() => {
        const input = document.getElementById('scoreExpression');
        if (input) {
            input.addEventListener('input', updateScorePreview);
            updateScorePreview();
        }
    }, 0);
}

// SCORE EXPRESSION EVALUATOR
// Prevents arbitrary code execution.

function evaluateScoreExpression(expression) {
    let expr = expression.trim();
    // Replace variable names with their numeric values
    for (const [key, value] of Object.entries(state.variables)) {
        const regex = new RegExp(`\\b${key}\\b`, 'g');
        expr = expr.replace(regex, String(value));
    }
    // Whitelist: only digits, decimal point, +, -, *, /, (, ), spaces, %
    if (!/^[\d\s\+\-\*\/\(\)\.\%]+$/.test(expr)) {
        throw new Error('Expression contains invalid characters. Only numbers and operators (+, -, *, /, %, parentheses) are allowed.');
    }
    // Safety: no consecutive operators that could be sneaky
    const result = Function('"use strict"; return (' + expr + ')')();
    if (typeof result !== 'number' || !isFinite(result)) throw new Error('Expression did not produce a valid number.');
    return result;
}

function updateScorePreview() {
    const input = document.getElementById('scoreExpression');
    const preview = document.getElementById('scorePreview');
    if (!input || !preview) return;
    if (!input.value.trim()) {
        preview.innerHTML = '<span class="text-3xl font-bold text-blue-600 dark:text-blue-400">--</span><span class="text-sm theme-text-secondary">pts</span>';
        return;
    }
    try {
        const result = evaluateScoreExpression(input.value);
        preview.innerHTML = `<span class="text-3xl font-bold text-blue-600 dark:text-blue-400">${result}</span><span class="text-sm theme-text-secondary">pts</span>`;
    } catch {
        preview.innerHTML = '<span class="text-sm text-red-500">Invalid expression</span>';
    }
}

function saveJournalEntry() {
    const dateStr = state.currentDaySidebar;
    if (!dateStr) return;
    const title = document.getElementById('journalTitle')?.value?.trim() || '';
    const content = document.getElementById('journalContent')?.value?.trim() || '';
    if (!title && !content) { alert('Please enter a title or content'); return; }
    if (!state.journalEntries[dateStr]) state.journalEntries[dateStr] = {};
    state.journalEntries[dateStr].title = title;
    state.journalEntries[dateStr].content = content;
    state.journalEntries[dateStr].timestamp = Date.now();
    saveJournal();
    state.sidebarView = null;
    renderSidebarContent();
    updateHeatMapIndicators();
    updateHeaderScores();
}

function saveScoreEntry() {
    const dateStr = state.currentDaySidebar;
    if (!dateStr) return;
    const expression = document.getElementById('scoreExpression')?.value?.trim();
    if (!expression) { alert('Please enter a score expression'); return; }
    let score;
    try {
        score = evaluateScoreExpression(expression);
    } catch (err) {
        alert('Invalid expression: ' + err.message); return;
    }
    if (!state.journalEntries[dateStr]) state.journalEntries[dateStr] = {};
    state.journalEntries[dateStr].expression = expression;
    state.journalEntries[dateStr].score = score;
    state.journalEntries[dateStr].timestamp = Date.now();
    saveJournal();
    state.sidebarView = null;
    renderSidebarContent();
    updateHeatMapIndicators();
    updateHeaderScores();
}

function toggleEventComplete(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    event.completed = !event.completed;
    saveEvents();
    if (state.currentDaySidebar) renderSidebarContent();
}

