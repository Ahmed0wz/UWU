// DATA PERSISTENCE

function saveEvents() { saveToStorage(STORAGE_KEYS.EVENTS(state.currentUser), events); syncDebounce(); updateWidgetData(); }
function loadEvents() {
    const saved = loadFromStorage(STORAGE_KEYS.EVENTS(state.currentUser)) || [];
    const hadInstances = saved.some(e => e.parentId);
    events = saved.filter(e => !e.parentId);
    if (!saved.length || hadInstances) saveEvents();
}

function saveTheme() { saveToStorage(STORAGE_KEYS.THEME(state.currentUser), { isDarkMode: state.isDarkMode, currentTheme: state.currentTheme }); }
function loadTheme() {
    const saved = loadFromStorage(STORAGE_KEYS.THEME(state.currentUser));
    if (saved) {
        state.isDarkMode = saved.isDarkMode || false;
        state.currentTheme = saved.currentTheme || 'default';
        applyTheme(state.currentTheme, state.isDarkMode ? 'dark' : 'light');
    } else { checkSystemTheme(); }
}

function applyTheme(themeId, mode) {
    const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
    // Gradient themes are dark-only — use dark vars regardless of mode toggle
    const effectiveMode = theme.gradient ? 'dark' : mode;
    const vars = effectiveMode === 'dark' ? theme.dark : theme.light;
    const root = document.documentElement;

    // Reset all vars from previous theme (including gradient vars)
    const gradientVars = ['--sidebar-gradient','--header-gradient','--accent-gradient','--accent-2'];
    const defaults = THEMES[0];
    const defaultVars = effectiveMode === 'dark' ? defaults.dark : defaults.light;
    [...Object.keys(defaultVars), ...gradientVars].forEach(k => root.style.removeProperty(k));

    // Apply theme vars
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));

    // Apply dark class
    if (effectiveMode === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');

    // Toggle gradient-theme class for any gradient-specific CSS
    root.classList.toggle('gradient-theme', !!theme.gradient);

    state.isDarkMode   = effectiveMode === 'dark';
    state.currentTheme = themeId;
    updateThemeToggleUI();
}

function updateThemeToggleUI() {
    const dot = $('themeToggleDot'), text = $('themeText'), icon = $('themeIcon');
    const dark = state.isDarkMode;
    if (dot)  dot.style.transform = dark ? 'translateX(16px)' : 'translateX(0)';
    if (text) text.textContent = dark ? 'Light Mode' : 'Dark Mode';
    if (icon) icon.innerHTML = dark
        ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>'
        : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>';
}

function setTheme(mode) { applyTheme(state.currentTheme || 'default', mode); saveTheme(); }

function saveBackground() {
    if (state.backgroundImage) {
        const sizeEstimate = Math.ceil(state.backgroundImage.length * 3 / 4 / 1024);
        if (sizeEstimate > 3000) console.warn(`Background image is large (~${sizeEstimate}KB). This may cause localStorage issues.`);
    }
    return saveToStorage(STORAGE_KEYS.BACKGROUND(state.currentUser), {
        image: state.backgroundImage,
        opacity: state.backgroundOpacity,
        scope: state.backgroundScope
    });
}

function saveAsMonthlyBackground() {
    if (!state.backgroundImage) return;
    const monthKey = dateToLocalString(state.currentDate).substring(0, 7);
    state.monthlyBackgrounds[monthKey] = {
        image: state.backgroundImage,
        opacity: state.backgroundOpacity
    };
    saveMonthlyBg();
    applyBackground();
}

function removeMonthlyBackground() {
    const monthKey = dateToLocalString(state.currentDate).substring(0, 7);
    delete state.monthlyBackgrounds[monthKey];
    saveMonthlyBg();
    applyBackground();
    updateMonthlyBgUI();
}

function updateMonthlyBgUI() {
    const monthKey = dateToLocalString(state.currentDate).substring(0, 7);
    const hasMontly = !!state.monthlyBackgrounds[monthKey];
    const monthlyBtn = document.getElementById('saveMonthlyBgBtn');
    const removeMonthlyBtn = document.getElementById('removeMonthlyBgBtn');
    if (monthlyBtn) monthlyBtn.classList.toggle('hidden', hasMontly);
    if (removeMonthlyBtn) removeMonthlyBtn.classList.toggle('hidden', !hasMontly);
    // Show current month label
    const label = document.getElementById('monthlyBgLabel');
    if (label) {
        const [y, m] = monthKey.split('-');
        label.textContent = t('monthNamesShort')[parseInt(m)-1] + ' ' + y;
    }
}
function loadBackground() {
    const saved = loadFromStorage(STORAGE_KEYS.BACKGROUND(state.currentUser));
    if (saved && saved.image) {
        state.backgroundImage = saved.image;
        state.backgroundOpacity = saved.opacity || 0.5;
        state.backgroundScope = saved.scope || 'month';
        const bgControls = document.getElementById('bgControls');
        const bgPreview = document.getElementById('bgPreview');
        const opacitySlider = document.querySelector('.opacity-slider');
        const opacityValue = document.getElementById('opacityValue');
        if (bgControls) bgControls.classList.remove('hidden');
        if (bgPreview) { bgPreview.classList.remove('hidden'); bgPreview.style.backgroundImage = `url(${state.backgroundImage})`; }
        if (opacitySlider) opacitySlider.value = state.backgroundOpacity * 100;
        if (opacityValue) opacityValue.textContent = `${Math.round(state.backgroundOpacity * 100)}%`;
        setBackgroundScope(state.backgroundScope);
        applyBackground();
    }
}

function saveCalendars() { saveToStorage(STORAGE_KEYS.CALENDARS(state.currentUser), state.calendars); }
function loadCalendars() {
    const saved = loadFromStorage(STORAGE_KEYS.CALENDARS(state.currentUser));
    state.calendars = (saved?.length > 0) ? saved : [...DEFAULT_CALENDARS];
    if (!saved?.length) saveCalendars();
    state.activeCalendars = loadFromStorage(STORAGE_KEYS.CALENDARS(state.currentUser) + '_active')
        || state.calendars.map(c => c.id);
    renderCalendarList();
}

// THEME MANAGEMENT

function openThemePicker() {
    closeSettings();
    let modal = document.getElementById('themePickerModal');
    if (modal) modal.remove();
    modal = document.createElement('div');
    modal.id = 'themePickerModal';
    modal.className = 'fixed inset-0 modal-backdrop flex items-center justify-center z-50';

    function buildThemeBtn(t) {
        const isActive = t.id === state.currentTheme;
        const [c1, c2, c3] = t.preview;
        const borderCls = isActive ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700';
        let preview = '';
        if (t.gradient) {
            preview = '<div class="w-full h-10 rounded-md mb-2" style="background:linear-gradient(135deg,' + c1 + ',' + c2 + ',' + c3 + ')"></div>';
        } else {
            preview = '<div class="flex space-x-1 mb-2">'
                    + '<div class="w-8 h-8 rounded-md" style="background:' + c1 + '"></div>'
                    + '<div class="w-8 h-8 rounded-md" style="background:' + c2 + '"></div>'
                    + '<div class="w-8 h-8 rounded-md" style="background:' + c3 + '"></div>'
                    + '</div>';
        }
        const gradientBadge = t.gradient ? `<span class="text-[9px] uppercase tracking-wider font-bold text-purple-400 mt-0.5 block">${state.language==='ar' ? 'متدرج' : 'Gradient'}</span>` : '';
        const activeDot = isActive ? '<div class="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"><svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></div>' : '';
        const arT = THEME_NAMES_AR[t.id];
        const displayName = (state.language === 'ar' && arT) ? arT.name : t.name;
        const displayDesc = (state.language === 'ar' && arT) ? arT.description : t.description;
        return "<button onclick='selectTheme(\"" + t.id + "\")' id='theme-btn-" + t.id + "' class='relative p-3 rounded-xl border-2 text-left transition-all hover:scale-105 " + borderCls + "'>"
             + preview
             + '<div class="font-semibold text-sm">' + displayName + '</div>'
             + '<div class="text-xs theme-text-secondary mt-0.5">' + displayDesc + '</div>'
             + gradientBadge
             + activeDot
             + '</button>';
    }

    const standardThemes = THEMES.filter(function(t) { return !t.gradient; });
    const gradientThemes  = THEMES.filter(function(t) { return !!t.gradient; });

    const sectionHeader = `<div class="col-span-2 sm:col-span-3 text-xs font-semibold theme-text-secondary uppercase tracking-wider mt-1 mb-1">${state.language==='ar' ? '\u062b\u064a\u0645\u0627\u062a \u0642\u064a\u0627\u0633\u064a\u0629' : 'Standard'}</div>`;
    const gradHeader    = `<div class="col-span-2 sm:col-span-3 text-xs font-semibold theme-text-secondary uppercase tracking-wider mt-3 mb-1 border-t theme-border pt-3">${state.language==='ar' ? '\u062b\u064a\u0645\u0627\u062a \u0645\u062a\u062f\u0631\u062c\u0629' : 'Gradient Themes'}</div>`;

    const grid = sectionHeader + standardThemes.map(buildThemeBtn).join('') + gradHeader + gradientThemes.map(buildThemeBtn).join('');

    modal.innerHTML = `
        <div class="theme-bg rounded-2xl shadow-2xl w-full max-w-xl modal-animate border theme-border flex flex-col" style="max-height:90vh">
            <div class="px-6 py-4 border-b theme-border flex items-center justify-between shrink-0">
                <div>
                    <h3 class="text-lg font-semibold">${t('appearance')}</h3>
                    <p class="text-xs theme-text-secondary mt-0.5">${state.language==='ar' ? 'اختر ثيماً لتقويمك' : 'Choose a theme for your calendar'}</p>
                </div>
                <button onclick="closeThemePicker()" class="theme-text-secondary hover:theme-text transition-colors p-1">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div class="p-6 overflow-y-auto flex-1">
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6" id="themeGrid">${grid}</div>
            </div>
            <div class="px-6 py-4 border-t theme-border flex items-center justify-between shrink-0">
                <div class="flex items-center space-x-3">
                    <span class="text-sm font-medium">${state.language==='ar' ? 'الوضع' : 'Mode'}</span>
                    <button onclick="toggleTheme()" class="flex items-center space-x-2 px-3 py-1.5 rounded-lg border theme-border hover:theme-bg-tertiary transition-colors">
                        <div class="w-8 h-4 bg-gray-200 dark:bg-gray-700 rounded-full relative">
                            <div id="themeToggleDot" class="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${state.isDarkMode ? 'translate-x-4' : 'translate-x-0'}"></div>
                        </div>
                        <span class="text-sm" id="themeText">${state.isDarkMode ? (state.language==='ar' ? 'الوضع الفاتح' : 'Light Mode') : (state.language==='ar' ? 'الوضع الداكن' : 'Dark Mode')}</span>
                    </button>
                </div>
                <button onclick="closeThemePicker()" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">${state.language==='ar' ? 'تم' : 'Done'}</button>
            </div>
        </div>`;

    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) closeThemePicker(); });
}

function selectTheme(themeId) {
    const mode = state.isDarkMode ? 'dark' : 'light';
    applyTheme(themeId, mode);
    saveTheme();
    renderCurrentView();
    document.querySelectorAll('[id^="theme-btn-"]').forEach(btn => {
        const id = btn.id.replace('theme-btn-', '');
        btn.classList.toggle('border-blue-500', id === themeId);
        btn.classList.toggle('theme-border', id !== themeId);
        // Update checkmark
        const check = btn.querySelector('.bg-blue-500.rounded-full');
        if (id === themeId && !check) {
            const chk = document.createElement('div');
            chk.className = 'absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center';
            chk.innerHTML = '<svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>';
            btn.appendChild(chk);
        } else if (id !== themeId && check) {
            check.remove();
        }
    });
}

function closeThemePicker() {
    $('themePickerModal')?.remove();
}

function checkSystemTheme() {
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) applyTheme('default', 'dark');
}

function toggleTheme() {
    const theme = THEMES.find(t => t.id === (state.currentTheme || 'default'));
    if (theme?.gradient && state.isDarkMode) {
        const toast = document.createElement('div');
        toast.className = 'fixed top-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-full shadow-xl z-[400] flex items-center gap-2.5 pointer-events-none';
        toast.innerHTML = '<svg class="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg><span>' + (state.language==='ar' ? 'الثيمات المتدرجة للوضع الداكن فقط. يرجى التبديل لثيم عادي أولاً.' : 'Gradient themes are dark-only. Switch to a standard theme first.') + '</span>';
        document.body.appendChild(toast);
        setTimeout(() => { toast.style.transition='opacity 0.3s'; toast.style.opacity='0'; setTimeout(()=>toast.remove(),300); }, 2500);
        return;
    }
    applyTheme(state.currentTheme || 'default', state.isDarkMode ? 'light' : 'dark');
    saveTheme();
}

// CALENDAR MANAGEMENT

function renderCalendarList() {
    const list = document.getElementById('calendarList');
    if (!list) return;
    list.innerHTML = '';
    state.calendars.forEach(calendar => {
        const isActive = state.activeCalendars.includes(calendar.id);
        const colorObj = CALENDAR_COLORS.find(c => c.id === calendar.color) || CALENDAR_COLORS[0];
        const div = document.createElement('div');
        div.className = `sidebar-item group flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all ${isActive ? 'active' : ''}`;
        div.dataset.calendarId = calendar.id;
        div.addEventListener('contextmenu', (e) => { e.preventDefault(); openCalendarEditModal(calendar.id); });
        div.onclick = (e) => { if (!e.target.closest('.calendar-actions')) toggleCalendar(calendar.id); };
        div.innerHTML = `
            <span class="color-dot ${colorObj.bg}" title="${colorObj.name}"></span>
            <span class="text-sm flex-1 truncate">${calendar.name}</span>
            <div class="calendar-actions opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 ml-2">
                <button onclick="event.stopPropagation(); openCalendarEditModal('${calendar.id}')" class="p-1 hover:theme-bg-tertiary rounded transition-colors" title="Edit ${calendar.name}">
                    <svg class="w-3 h-3 theme-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
            </div>
            <svg class="w-4 h-4 ml-auto check-icon ${isActive ? 'opacity-100' : 'opacity-0'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        `;
        list.appendChild(div);
    });
}

function toggleCalendar(calendarId) {
    const index = state.activeCalendars.indexOf(calendarId);
    if (index > -1) {
        if (state.activeCalendars.length > 1) state.activeCalendars.splice(index, 1);
    } else {
        state.activeCalendars.push(calendarId);
    }
    saveToStorage(STORAGE_KEYS.CALENDARS(state.currentUser) + '_active', state.activeCalendars);
    renderCalendarList();
    renderCurrentView();
}

function addNewCalendar() {
    const modal = document.getElementById('addCalendarModal');
    if (!modal) return;
    const input = document.getElementById('newCalendarName');
    if (input) input.value = '';

    // Build color picker
    const picker = document.getElementById('newCalendarColorPicker');
    if (picker) {
        picker.innerHTML = '';
        const defaultColor = CALENDAR_COLORS[Math.floor(Math.random() * CALENDAR_COLORS.length)].id;
        CALENDAR_COLORS.forEach(color => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `w-8 h-8 rounded-full ${color.bg} transition-transform hover:scale-110 ${color.id === defaultColor ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600' : ''}`;
            btn.title = color.name;
            btn.dataset.colorId = color.id;
            btn.onclick = () => {
                picker.querySelectorAll('button').forEach(b => b.classList.remove('ring-2', 'ring-offset-2', 'ring-gray-400', 'dark:ring-gray-600'));
                btn.classList.add('ring-2', 'ring-offset-2', 'ring-gray-400', 'dark:ring-gray-600');
            };
            picker.appendChild(btn);
        });
    }

    showEl('addCalendarModal');
    setTimeout(() => input?.focus(), 50);
    modal.addEventListener('click', e => { if (e.target === modal) closeAddCalendarModal(); }, { once: true });
}

function closeAddCalendarModal() { hideEl('addCalendarModal'); }

function confirmAddCalendar() {
    const nameInput = document.getElementById('newCalendarName');
    const name = nameInput?.value?.trim();
    if (!name) { nameInput?.focus(); return; }

    const selectedBtn = document.querySelector('#newCalendarColorPicker button.ring-2');
    const colorId = selectedBtn ? selectedBtn.dataset.colorId : CALENDAR_COLORS[0].id;
    const id = 'cal_' + Date.now();
    const newCalendar = { id, name, color: colorId };
    state.calendars.push(newCalendar);
    state.activeCalendars.push(id);
    saveCalendars();
    saveToStorage(STORAGE_KEYS.CALENDARS(state.currentUser) + '_active', state.activeCalendars);
    renderCalendarList();
    renderCurrentView();
    closeAddCalendarModal();
}

function openCalendarEditModal(calendarId) {
    const calendar = state.calendars.find(c => c.id === calendarId);
    if (!calendar) return;
    state.editingCalendarId = calendarId;
    const nameInput = document.getElementById('editCalendarName');
    if (nameInput) nameInput.value = calendar.name;
    const colorPicker = document.getElementById('colorPicker');
    if (colorPicker) {
        colorPicker.innerHTML = '';
        CALENDAR_COLORS.forEach(color => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `w-8 h-8 rounded-full ${color.bg} ${calendar.color === color.id ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600' : ''} transition-transform hover:scale-110`;
            btn.title = color.name;
            btn.dataset.colorId = color.id;
            btn.onclick = () => selectCalendarColor(color.id);
            colorPicker.appendChild(btn);
        });
    }
    const modal = document.getElementById('calendarEditModal');
    showEl('calendarEditModal');
}

function selectCalendarColor(colorId) {
    document.querySelectorAll('#colorPicker button').forEach(btn => {
        btn.classList.toggle('ring-2', btn.dataset.colorId === colorId);
        btn.classList.toggle('ring-offset-2', btn.dataset.colorId === colorId);
        btn.classList.toggle('ring-gray-400', btn.dataset.colorId === colorId);
        btn.classList.toggle('dark:ring-gray-600', btn.dataset.colorId === colorId);
    });
}

function saveCalendarEdit() {
    const calendar = state.calendars.find(c => c.id === state.editingCalendarId);
    if (!calendar) return;
    const newName = document.getElementById('editCalendarName')?.value?.trim();
    if (!newName) { alert('Calendar name cannot be empty'); return; }
    const selectedColorBtn = document.querySelector('#colorPicker button.ring-2');
    calendar.name = newName;
    calendar.color = selectedColorBtn ? selectedColorBtn.dataset.colorId : calendar.color;
    saveCalendars(); renderCalendarList(); renderCurrentView(); closeCalendarEditModal();
}

function deleteCalendar() {
    const calendar = state.calendars.find(c => c.id === state.editingCalendarId);
    if (!calendar) return;
    const defaultIds = ['personal', 'work', 'reminders'];
    if (defaultIds.includes(calendar.id)) {
        alert(`Cannot delete the "${calendar.name}" calendar. You can rename it or change its color instead.`); return;
    }
    if (!confirm(`Delete "${calendar.name}" calendar? All events in this calendar will also be deleted. This cannot be undone.`)) return;
    state.calendars = state.calendars.filter(c => c.id !== state.editingCalendarId);
    state.activeCalendars = state.activeCalendars.filter(id => id !== state.editingCalendarId);
    events = events.filter(e => e.calendar !== state.editingCalendarId);
    saveCalendars(); saveEvents();
    saveToStorage(STORAGE_KEYS.CALENDARS(state.currentUser) + '_active', state.activeCalendars);
    renderCalendarList(); renderCurrentView(); closeCalendarEditModal();
}

function closeCalendarEditModal() {
    hideEl('calendarEditModal');
    state.editingCalendarId = null;
}

