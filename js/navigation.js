// VIEW MANAGEMENT

function applyI18nQuick() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = t(key);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
            el.placeholder = val;
        } else {
            el.textContent = val;
        }
    });
    // Render window
    const rwMin = document.getElementById('renderWindowMin');
    if (rwMin) rwMin.textContent = state.language==='ar' ? 'أسبوع' : '1 Week';
    const rwMax = document.getElementById('renderWindowMax');
    if (rwMax) rwMax.textContent = state.language==='ar' ? 'سنة' : '1 Year';
    const ftSub = document.getElementById('forgottenTasksSubtitle');
    if (ftSub) ftSub.textContent = state.language==='ar' ? 'أكمل المهام وانسبها لأي يوم' : 'Complete and attribute to any day you choose';
    const rwSub = document.getElementById('renderWindowSubtitle');
    if (rwSub) rwSub.textContent = state.language==='ar' ? 'حدد نطاق إنشاء الأحداث المتكررة.' : 'How far to generate repeating events from your current view.';
    const rwApply = document.getElementById('renderWindowApplyBtn');
    if (rwApply) rwApply.textContent = state.language==='ar' ? 'تطبيق' : 'Apply';
    const slider = document.getElementById('renderWindowSlider');
    if (slider) onRenderWindowSlide(slider.value);
    // Add account modal
    const addAccLabel = document.getElementById('addAccountNameLabel');
    if (addAccLabel) addAccLabel.textContent = state.language==='ar' ? 'اسم الحساب' : 'Account Name';
    const addAccHint = document.getElementById('addAccountHint');
    if (addAccHint) addAccHint.textContent = state.language==='ar' ? 'حروف وأرقام وشرطات وشرطات سفلية فقط' : 'Letters, numbers, hyphens and underscores only';
    const createAccBtn = document.getElementById('createAccountBtn');
    if (createAccBtn) createAccBtn.textContent = state.language==='ar' ? 'إنشاء حساب' : 'Create Account';
    // Delete account modal
    const delAccSelLabel = document.getElementById('deleteAccountSelectLabel');
    if (delAccSelLabel) delAccSelLabel.textContent = state.language==='ar' ? 'اختر حساباً للحذف' : 'Select account to delete';
    const delAccWarnTitle = document.getElementById('deleteAccountWarnTitle');
    if (delAccWarnTitle) delAccWarnTitle.textContent = state.language==='ar' ? '⚠️ لا يمكن التراجع عن هذا' : '⚠️ This cannot be undone';
    const delAccConfirmLabel = document.getElementById('deleteAccountConfirmLabel');
    if (delAccConfirmLabel) delAccConfirmLabel.textContent = state.language==='ar' ? 'اكتب اسم الحساب للتأكيد' : 'Type the account name to confirm';
    // Add calendar modal
    const calNameLabel = document.getElementById('calendarNameLabel');
    if (calNameLabel) calNameLabel.textContent = state.language==='ar' ? 'اسم التقويم' : 'Calendar Name';
    const calColorLabel = document.getElementById('calendarColorLabel');
    if (calColorLabel) calColorLabel.textContent = state.language==='ar' ? 'اللون' : 'Color';
    const createCalBtn = document.getElementById('createCalendarBtn');
    if (createCalBtn) createCalBtn.textContent = state.language==='ar' ? 'إنشاء' : 'Create';
    // Background modal
    const AR = state.language === 'ar';
    const bgPairs = [
        ['bgSettingsTitle',       AR ? 'إعدادات الخلفية'          : 'Background Settings'],
        ['bgUploadLabel',         AR ? 'رفع صورة خلفية'           : 'Upload Background Image'],
        ['bgDropHint',            AR ? 'انقر للرفع أو اسحب وأفلت' : 'Click to upload or drag and drop'],
        ['bgFormatHint',          AR ? 'PNG أو JPG حتى 5MB'       : 'PNG, JPG up to 5MB (smaller is better for storage)'],
        ['bgOpacityLabel',        AR ? 'الشفافية'                  : 'Opacity'],
        ['bgApplyToLabel',        AR ? 'تطبيق على'                 : 'Apply to'],
        ['bgMonthlyOverrideLabel',AR ? 'تثبيت شهري'               : 'Monthly Override'],
        ['bgMonthlyHint',         AR ? 'حفظ هذه الصورة لشهر العرض الحالي فقط. لن تظهر أي خلفية الشهر القادم إلا إذا ضبطتها.' : 'Save this image only for the current view month. Next month will show no background unless you set one.'],
        ['bgPinBtnLabel',         AR ? 'تثبيت لهذا الشهر'         : 'Pin to this month'],
        ['bgUnpinBtnLabel',       AR ? 'إلغاء التثبيت'            : 'Remove pin'],
        ['bgRemoveBtnLabel',      AR ? 'إزالة الخلفية'            : 'Remove Background'],
    ];
    bgPairs.forEach(([id, text]) => { const el = document.getElementById(id); if (el) el.textContent = text; });
    // Scope buttons
    const scopeLabels = AR ? { month: 'هذا الشهر', year: 'هذا العام', all: 'كل الوقت' }
                           : { month: 'This Month', year: 'This Year', all: 'All Time' };
    document.querySelectorAll('[data-scope-label]').forEach(btn => {
        btn.textContent = scopeLabels[btn.getAttribute('data-scope-label')] || btn.textContent;
    });
    // Render window apply button
    const rwApplyBtn = document.getElementById('renderWindowApplyBtn');
    if (rwApplyBtn) rwApplyBtn.textContent = AR ? 'تطبيق' : 'Apply';
    // Search tabs (if already rendered)
    const stEvt = document.getElementById('searchTabEvents');
    if (stEvt) stEvt.textContent = AR ? 'الأحداث' : 'Events';
    const stJnl = document.getElementById('searchTabJournal');
    if (stJnl) stJnl.textContent = AR ? 'اليومية' : 'Journal';
    // Static HTML placeholders
    const naInput = document.getElementById('newAccountNameInput');
    if (naInput) naInput.placeholder = AR ? 'مثال: عمل، شخصي' : 'e.g., work, personal';
    const ncInput = document.getElementById('newCalendarNameInput');
    if (ncInput) ncInput.placeholder = AR ? 'مثال: رياضة، دراسة' : 'e.g., Gym, Study';
    const daCInput = document.getElementById('deleteAccountConfirmInput');
    if (daCInput) daCInput.setAttribute('dir', 'ltr');
    // Prayer offset placeholders (static in index.html)
    const ps = document.getElementById('prayerStartOffset');
    if (ps) ps.placeholder = AR ? 'مثال: 0' : 'e.g., 0';
    const pe = document.getElementById('prayerEndOffset');
    if (pe) pe.placeholder = AR ? 'مثال: 30' : 'e.g., 30';
    // Prayer times toggle button label
    const prayerBtn = document.getElementById('prayerViewToggleBtn');
    if (prayerBtn) {
        const pLabel = prayerBtn.querySelector('span.hidden.lg\\:inline, span[data-i18n]');
        if (pLabel) pLabel.textContent = state.showPrayerTimesInView ? t('hidePrayerTimes') : t('prayerTimes');
    }
    // Edit series modal
    const esPairs = [
        ['editSeriesTitle',    AR ? 'تعديل حدث متكرر'           : 'Edit Repeating Event'],
        ['editSeriesSubtitle', AR ? 'هذا الحدث جزء من سلسلة متكررة.' : 'This event is part of a repeating series.'],
        ['editSeriesOneLabel', AR ? 'هذا الحدث فقط'             : 'This event only'],
        ['editSeriesOneDesc',  AR ? 'سيتم تحديث هذا التكرار فقط وفصله عن السلسلة.' : 'Only this occurrence will be updated. It will be detached from the series.'],
        ['editSeriesAllLabel', AR ? 'جميع أحداث السلسلة'        : 'All events in series'],
        ['editSeriesAllDesc',  AR ? 'يتم تحديث العنوان والوقت والتقويم وغيرها لكل تكرار. تُحفظ التواريخ.' : 'Title, time, calendar, and other settings update for every occurrence. Dates are preserved.'],
    ];
    esPairs.forEach(([id, text]) => { const el = document.getElementById(id); if (el) el.textContent = text; });
}

function renderCurrentView() {
    if (state.currentView === 'day')   renderDayView();
    if (state.currentView === 'week')  renderWeekView();
    if (state.currentView === 'month') renderMonthView();
    if (state.currentView === 'year')  renderYearView();
    updateHeaderScores();
    applyI18nQuick();
}

function switchView(view) {
    state.currentView = view;
    ['day','week','month','year'].forEach(v => {
        const btn = document.getElementById(`view-${v}`);
        if (!btn) return;
        if (v === view) { btn.classList.remove('theme-text-secondary'); btn.classList.add('theme-bg', 'shadow-sm'); }
        else            { btn.classList.add('theme-text-secondary'); btn.classList.remove('theme-bg', 'shadow-sm'); }
    });

    $('dayView')?.classList.toggle('hidden', view !== 'day');
    $('weekView')?.classList.toggle('hidden', view !== 'week');
    $('monthView')?.classList.toggle('hidden', view !== 'month');
    $('yearView')?.classList.toggle('hidden', view !== 'year');

    if (view !== 'day') {
        // Close sidebar fully (hide DOM + clear state) so stale content
        // never remains visible when returning to a different day.
        if (state.currentDaySidebar || !document.getElementById('daySidebar')?.classList.contains('hidden')) {
            state.currentDaySidebar = null;
            state.sidebarView = null;
            hideEl('daySidebar');
            const label = document.getElementById('sidebarToggleBtnLabel');
            if (label) label.textContent = t('openJournal');
        }
    }
    animateNavView('switch');
    renderCurrentView();
}

function updateHeatMapIndicators() {
    if (state.currentView === 'month') renderMonthView();
    if (state.currentView === 'week') renderWeekView();
    renderMiniCalendar();
}

function getDayScoreColor(score) {
    if (!score) return '';
    if (score < 30) return 'bg-red-100 dark:bg-red-900/20';
    if (score < 70) return 'bg-yellow-100 dark:bg-yellow-900/20';
    if (score < 120) return 'bg-green-100 dark:bg-green-900/20';
    return 'bg-emerald-200 dark:bg-emerald-800/40';
}

function getDayIndicator(dateStr) {
    const j = state.journalEntries[dateStr];
    if (!j) return '';
    if (j.score) return `<span class="text-[10px] font-bold text-blue-600 dark:text-blue-400 leading-none">${j.score}${t('pts')}</span>`;
    return '<span class="w-2 h-2 rounded-full bg-green-400 inline-block"></span>';
}

// NAVIGATION

// NAV ANIMATION HELPER
function animateNavView(direction) {
    // direction: 'next' | 'prev' | 'switch'
    const ids = ['dayView','weekView','monthView','yearView'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el || el.classList.contains('hidden')) return;
        el.classList.remove('nav-anim-next','nav-anim-prev','nav-anim-switch');
        void el.offsetWidth; // force reflow
        if (direction === 'next')   el.classList.add('nav-anim-next');
        else if (direction === 'prev') el.classList.add('nav-anim-prev');
        else                           el.classList.add('nav-anim-switch');
    });
}

// Day view: ±1 day | Week view: ±7 days | Month view: ±1 month | Year view: ±1 year

function navigatePrev() {
    switch (state.currentView) {
        case 'day':
            state.currentDate.setDate(state.currentDate.getDate() - 1);
            if (state.currentDaySidebar) {
                state.currentDaySidebar = dateToLocalString(state.currentDate);
            }
            break;
        case 'week':
            state.currentDate.setDate(state.currentDate.getDate() - (window.innerWidth < 768 ? 1 : 7));
            break;
        case 'month': {
            if (state.calendarMode === 'hijri') { hijriPrevMonth(); break; }
            const m = state.currentDate.getMonth();
            const y = state.currentDate.getFullYear();
            state.currentDate = new Date(m === 0 ? y - 1 : y, m === 0 ? 11 : m - 1, 1);
            break;
        }
        case 'year':
            if (state.calendarMode === 'hijri') { hijriPrevYear(); break; }
            state.currentDate.setFullYear(state.currentDate.getFullYear() - 1);
            break;
    }
    animateNavView('prev');
    renderCurrentView();
    renderMiniCalendar();
    applyBackground();
}

function navigateNext() {
    switch (state.currentView) {
        case 'day':
            state.currentDate.setDate(state.currentDate.getDate() + 1);
            if (state.currentDaySidebar) {
                state.currentDaySidebar = dateToLocalString(state.currentDate);
            }
            break;
        case 'week':
            state.currentDate.setDate(state.currentDate.getDate() + (window.innerWidth < 768 ? 1 : 7));
            break;
        case 'month': {
            if (state.calendarMode === 'hijri') { hijriNextMonth(); break; }
            const m = state.currentDate.getMonth();
            const y = state.currentDate.getFullYear();
            state.currentDate = new Date(m === 11 ? y + 1 : y, m === 11 ? 0 : m + 1, 1);
            break;
        }
        case 'year':
            if (state.calendarMode === 'hijri') { hijriNextYear(); break; }
            state.currentDate.setFullYear(state.currentDate.getFullYear() + 1);
            break;
    }
    animateNavView('next');
    renderCurrentView();
    renderMiniCalendar();
    applyBackground();
}

// Mini calendar still uses these for its own prev/next arrows (month-only)
function changeMonth(delta) {
    const m = state.currentDate.getMonth();
    const y = state.currentDate.getFullYear();
    let newMonth = m + delta;
    let newYear = y;
    while (newMonth > 11) { newMonth -= 12; newYear++; }
    while (newMonth < 0)  { newMonth += 12; newYear--; }
    state.currentDate = new Date(newYear, newMonth, 1);
    renderMiniCalendar();
    if (state.currentView === 'month') renderMonthView();
    if (state.currentView === 'year') renderYearView();
    applyBackground();
}

function goToToday() {
    state.currentDate = state.selectedDate = new Date();
    renderCurrentView(); renderMiniCalendar(); applyBackground();
}

function openMonthPicker() { switchView('month'); }

function openMonthYearPicker(e) {
    if (e) e.stopPropagation();
    // Remove any existing popover
    const existing = document.getElementById('dateJumpPopover');
    if (existing) { existing.remove(); return; }

    const btn = e?.currentTarget || document.querySelector('[onclick*="openMonthYearPicker"]');
    const rect = btn ? btn.getBoundingClientRect() : { left: 120, bottom: 60, width: 180 };

    const popover = document.createElement('div');
    popover.id = 'dateJumpPopover';
    popover.className = 'fixed z-50 theme-bg border theme-border rounded-2xl shadow-2xl p-4 w-72 modal-animate';
    // Position below the header button
    const top = rect.bottom + 8;
    const left = Math.min(rect.left, window.innerWidth - 300);
    popover.style.cssText = `top:${top}px; left:${Math.max(8, left)}px;`;

    const today = dateToLocalString(new Date());

    popover.innerHTML = `
        <div class="mb-3">
            <p class="text-xs font-semibold theme-text-secondary uppercase tracking-wider mb-1">${state.language==='ar' ? 'الانتقال إلى تاريخ' : 'Jump to Date'}</p>
        </div>
        <input type="date" id="dateJumpInput" value="${dateToLocalString(state.currentDate)}"
            class="w-full theme-bg-tertiary border theme-border rounded-xl px-3 py-2.5 text-sm theme-text focus:ring-2 focus:ring-blue-500 mb-3">
        <div class="flex gap-2">
            <button onclick="applyDateJump()" class="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-colors">${state.language==='ar' ? 'انتقل' : 'Go'}</button>
            <button onclick="applyDateJump('${today}')" class="px-3 py-2 theme-bg-tertiary hover:theme-bg-panel border theme-border rounded-xl text-sm theme-text transition-colors">${t('today')}</button>
        </div>
        <div class="mt-3 grid grid-cols-3 gap-1.5">
            <button onclick="jumpRelative(-1)" class="py-1.5 text-xs theme-bg-tertiary hover:theme-bg-panel border theme-border rounded-lg theme-text transition-colors">${state.language==='ar' ? '−شهر' : '−Month'}</button>
            <button onclick="jumpRelative(1)" class="py-1.5 text-xs theme-bg-tertiary hover:theme-bg-panel border theme-border rounded-lg theme-text transition-colors">${state.language==='ar' ? '+شهر' : '+Month'}</button>
            <button onclick="jumpRelative(12)" class="py-1.5 text-xs theme-bg-tertiary hover:theme-bg-panel border theme-border rounded-lg theme-text transition-colors">${state.language==='ar' ? '+سنة' : '+Year'}</button>
        </div>
    `;
    document.body.appendChild(popover);
    setTimeout(() => $('dateJumpInput')?.focus(), 50);

    // Remove any stale listener before adding fresh one
    document.removeEventListener('click', closeDateJumpOnOutside);
    setTimeout(() => document.addEventListener('click', closeDateJumpOnOutside), 0);
}

function closeDateJumpOnOutside(e) {
    const popover = document.getElementById('dateJumpPopover');
    if (!popover) { document.removeEventListener('click', closeDateJumpOnOutside); return; }
    if (!popover.contains(e.target) && !e.target.closest('[onclick*="openMonthYearPicker"]')) {
        popover.remove();
        document.removeEventListener('click', closeDateJumpOnOutside);
    }
}

function applyDateJump(dateStr) {
    const val = dateStr || document.getElementById('dateJumpInput')?.value;
    if (!val) return;
    state.currentDate = new Date(val + 'T12:00:00');
    const popover = document.getElementById('dateJumpPopover');
    if (popover) popover.remove();
    document.removeEventListener('click', closeDateJumpOnOutside);
    renderCurrentView();
    renderMiniCalendar();
}

function jumpRelative(months) {
    const d = new Date(state.currentDate);
    d.setMonth(d.getMonth() + months);
    state.currentDate = d;
    const inp = document.getElementById('dateJumpInput');
    if (inp) inp.value = dateToLocalString(d);
    renderCurrentView();
    renderMiniCalendar();
}

// BACKGROUND SETTINGS

function openBackgroundSettings() {
    const modal = document.getElementById('backgroundModal');
    showEl('backgroundModal');
    if (state.backgroundImage) {
        $('bgControls')?.classList.remove('hidden');
        const bgPreview = document.getElementById('bgPreview');
        if (bgPreview) { bgPreview.classList.remove('hidden'); bgPreview.style.backgroundImage = `url(${state.backgroundImage})`; }
    }
    updateMonthlyBgUI();
}

function closeBackgroundSettings() { hideEl('backgroundModal'); }

function handleBackgroundUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
        alert(`Image too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Maximum size is 5MB.\n\nNote: Large images are stored in browser storage and can fill it quickly. Use images under 1MB for best results.`);
        return;
    }
    if (!file.type.startsWith('image/')) { alert('Please select a valid image file (PNG, JPG, GIF)'); return; }

    const estimatedStorageMB = (file.size * 1.37 / 1024 / 1024).toFixed(1);
    if (file.size > 2 * 1024 * 1024) {
        if (!confirm(`This image will use about ${estimatedStorageMB}MB of browser storage, which may cause issues if storage is nearly full.\n\nContinue anyway?`)) return;
    }

    const reader = new FileReader();
    reader.onerror = () => alert('Error reading file. Please try another image.');
    reader.onload = (e) => {
        state.backgroundImage = e.target.result;
        state.backgroundOpacity = 0.5;
        $('bgControls')?.classList.remove('hidden');
        const bgPreview = document.getElementById('bgPreview');
        if (bgPreview) { bgPreview.classList.remove('hidden'); bgPreview.style.backgroundImage = `url(${state.backgroundImage})`; }
        const opacitySlider = document.querySelector('.opacity-slider');
        const opacityValue = document.getElementById('opacityValue');
        if (opacitySlider) opacitySlider.value = 50;
        if (opacityValue) opacityValue.textContent = '50%';
        const saved = saveBackground();
        if (saved !== false) applyBackground();
    };
    reader.readAsDataURL(file);
}

function updateBackgroundOpacity(value) {
    state.backgroundOpacity = value / 100;
    const opacityValue = document.getElementById('opacityValue');
    if (opacityValue) opacityValue.textContent = `${value}%`;
    saveBackground(); applyBackground();
}

function setBackgroundScope(scope) {
    state.backgroundScope = scope;
    ['month','year','all'].forEach(s => {
        const btn = document.getElementById(`scope-${s}`);
        if (!btn) return;
        if (s === scope) { btn.classList.add('bg-blue-500','text-white','border-blue-500'); btn.classList.remove('theme-border'); }
        else             { btn.classList.remove('bg-blue-500','text-white','border-blue-500'); btn.classList.add('theme-border'); }
    });
    saveBackground(); applyBackground();
}

function applyBackground() {
    const bgLayer = document.getElementById('backgroundLayer');
    if (!bgLayer) return;
    bgLayer.style.position = 'fixed';
    bgLayer.style.top = '0'; bgLayer.style.left = '0';
    bgLayer.style.right = '0'; bgLayer.style.bottom = '0';
    bgLayer.style.zIndex = '0'; bgLayer.style.pointerEvents = 'none';
    bgLayer.style.backgroundSize = 'cover'; bgLayer.style.backgroundPosition = 'center';
    bgLayer.style.backgroundRepeat = 'no-repeat'; bgLayer.style.transition = 'opacity 0.3s ease';

    // Check monthly background for current view month first
    const monthKey = dateToLocalString(state.currentDate).substring(0, 7);
    const monthlyBg = state.monthlyBackgrounds[monthKey];
    if (monthlyBg && monthlyBg.image) {
        bgLayer.style.backgroundImage = `url(${monthlyBg.image})`;
        bgLayer.style.opacity = (monthlyBg.opacity || 0.5).toString();
        bgLayer.classList.add('active');
        return;
    }

    // Fall back to global background
    if (!state.backgroundImage) { bgLayer.style.backgroundImage = ''; bgLayer.style.opacity = '0'; bgLayer.classList.remove('active'); return; }
    if (checkBackgroundScope()) {
        bgLayer.style.backgroundImage = `url(${state.backgroundImage})`;
        bgLayer.style.opacity = state.backgroundOpacity.toString();
        bgLayer.classList.add('active');
    } else {
        bgLayer.style.opacity = '0'; bgLayer.classList.remove('active');
    }
}

function checkBackgroundScope() {
    if (state.backgroundScope === 'all') return true;
    const now = new Date();
    if (state.backgroundScope === 'month') return now.getMonth() === state.currentDate.getMonth() && now.getFullYear() === state.currentDate.getFullYear();
    if (state.backgroundScope === 'year') return now.getFullYear() === state.currentDate.getFullYear();
    return true;
}

function removeBackground() {
    state.backgroundImage = null; state.backgroundOpacity = 0.5; state.backgroundScope = 'month';
    $('bgControls')?.classList.add('hidden');
    const bgPreview = document.getElementById('bgPreview');
    if (bgPreview) bgPreview.classList.add('hidden');
    const bgLayer = document.getElementById('backgroundLayer');
    if (bgLayer) { bgLayer.classList.remove('active'); bgLayer.style.opacity = '0'; }
    const bgImageInput = document.getElementById('bgImageInput');
    if (bgImageInput) bgImageInput.value = '';
    const opacitySlider = document.querySelector('.opacity-slider');
    if (opacitySlider) opacitySlider.value = 50;
    const opacityValue = document.getElementById('opacityValue');
    if (opacityValue) opacityValue.textContent = '50%';
    removeFromStorage(STORAGE_KEYS.BACKGROUND(state.currentUser));
}

