// USER MENU & SETTINGS


// MERGED ACCOUNT & SETTINGS PANEL
// Fixed-position so sidebar overflow never clips it
function openAccountSettings(e) {
    if (e) e.stopPropagation();

    let panel = document.getElementById('accountSettingsPanel');
    if (panel) { panel.remove(); return; }

    const btn = document.getElementById('accountSettingsBtn');
    const rect = btn ? btn.getBoundingClientRect() : { top: 0, left: 0, width: 280 };

    // Build user list HTML
    let userListHTML = state.users.map(user => {
        const isActive = user === state.currentUser;
        return `<button onclick="switchUser('${user}'); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-sm transition-colors ${isActive ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'hover:theme-bg-tertiary'}">
            <div class="w-6 h-6 rounded-full bg-gradient-to-br ${isActive ? 'from-blue-400 to-blue-600' : 'from-gray-400 to-gray-600'} flex items-center justify-center text-white text-xs font-bold">${user.substring(0,2).toUpperCase()}</div>
            <span class="flex-1">${user}</span>
            ${isActive ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' : ''}
        </button>`;
    }).join('');

    panel = document.createElement('div');
    panel.id = 'accountSettingsPanel';
    panel.className = 'fixed theme-bg rounded-xl shadow-2xl border theme-border overflow-y-auto z-[200] w-72';
    // Position above the button; clamp left so panel stays on screen
    const panelW = 288; // w-72
    const safeLeft = Math.min(rect.left, window.innerWidth - panelW - 8);
    const bottomFromViewport = window.innerHeight - rect.top + 8;
    panel.style.cssText = `bottom: ${bottomFromViewport}px; left: ${Math.max(8, safeLeft)}px; max-height: calc(${rect.top}px - 16px);`;
    panel.innerHTML = `
        <div class="p-3 border-b theme-border">
            <div class="text-xs font-semibold theme-text-secondary uppercase tracking-wider mb-2">${t('accounts')}</div>
            <div class="space-y-1">${userListHTML}</div>
            <div class="flex gap-2 mt-2 pt-2 border-t theme-border">
                <button onclick="openAddAccountModal();" class="flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm text-blue-600 dark:text-blue-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                    <span>${t('add')}</span>
                </button>
                <button onclick="openDeleteAccountModal();" class="flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-sm text-red-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    <span>${t('delete')}</span>
                </button>
            </div>
        </div>
        <div class="p-2 space-y-1">
            <div class="text-xs font-semibold theme-text-secondary uppercase tracking-wider px-3 py-1">${t('settings')}</div>
            <button onclick="document.getElementById('pfpInput').click(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <div id="pfpMenuPreview" class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold overflow-hidden shrink-0"></div>
                <span>${t('profilePicture')}</span>
                ${state.pfp ? `<span class="ml-auto text-xs text-red-500 hover:underline" onclick="event.stopPropagation(); removePfp(); closeAccountSettings();">${t('remove')}</span>` : `<span class="ml-auto text-xs theme-text-secondary">${t('upload')}</span>`}
            </button>
            <button onclick="toggleCalendarMode(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
                <span id="calendarModeMenuLabel">${state.calendarMode === 'hijri' ? t('toGregorian') : t('toHijri')}</span>
            </button>
            <button onclick="openThemePicker(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                <span>${t('appearance')}</span>
            </button>
            <button onclick="openVariableSettings(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm text-blue-600 dark:text-blue-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path></svg>
                <span>${t('journalVars')}</span>
            </button>
            <button onclick="openLocationSettings(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>${t('locationSettings')}</span>
            </button>
            <button onclick="openBackgroundSettings(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span>${t('backgroundImage')}</span>
            </button>
            <button onclick="openRenderWindowSettings(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                <span>${t('renderWindow')}</span>
                <span class="ml-auto text-xs theme-text-secondary font-medium" id="renderWindowLabel">${getRenderWindowLabel()}</span>
            </button>
                        <button onclick="openViewAllTasks(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                <span>${t('viewAllTasks')}</span>
            </button>
                        <button onclick="openForgottenTasks();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span>${t('forgottenTasks')}</span>
                <span id="forgottenBadge" class="ml-auto text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-full px-2 py-0.5 font-semibold hidden">0</span>
            </button>
            <button onclick="openSyncModal(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4 flex-shrink-0 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>
                <span>${t('syncData')}</span>
                <span class="ml-auto flex items-center gap-1.5"><span id="syncStatusDot" class="w-2 h-2 rounded-full ${isSyncEnabled()?'bg-green-500':'bg-gray-400'}"></span><span id="syncStatusLabel" class="text-xs theme-text-secondary">${isSyncEnabled()?(state.language==='ar'?'متصل':'Connected'):(state.language==='ar'?'غير متصل':'Not connected')}</span></span>
            </button>
            <button onclick="openStandaloneAlarmsPanel(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4 flex-shrink-0 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span>${state.language==='ar' ? 'المنبّهات' : 'Alarms'}</span>
                <span class="ml-auto text-xs theme-text-secondary">${getStandaloneAlarms().length} alarm${getStandaloneAlarms().length !== 1 ? 's' : ''}</span>
            </button>
            <button onclick="toggleLanguage()" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/></svg>
                <span class="font-medium">${state.language === 'ar' ? t('switchToEnglish') : t('switchToArabic')}</span>
            </button>
            <div class="border-t theme-border my-1"></div>
            <button onclick="exportData(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                <span>${t('exportJson')}</span>
            </button>
            <button onclick="exportICS(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span>${t('exportIcs')}</span>
            </button>
            <button onclick="importData(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                <span>${t('importData')}</span>
            </button>
            <button onclick="clearAllData(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm text-red-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                <span>${t('clearData')}</span>
            </button>
        </div>
    `;
    document.body.appendChild(panel);

    // Update pfp preview in menu
    const pfpMenuPreview = document.getElementById('pfpMenuPreview');
    if (pfpMenuPreview) {
        if (state.pfp) {
            pfpMenuPreview.style.backgroundImage = 'url(' + state.pfp + ')';
            pfpMenuPreview.style.backgroundSize = 'cover';
            pfpMenuPreview.style.backgroundPosition = 'center';
            pfpMenuPreview.innerHTML = '';
        } else {
            pfpMenuPreview.style.backgroundImage = '';
            pfpMenuPreview.innerHTML = state.currentUser.substring(0,2).toUpperCase();
        }
    }

    // Close on outside click
    setTimeout(() => {
        document.addEventListener('click', closeAccountSettingsOutside);
    }, 0);
}

function closeAccountSettings() {
    const panel = document.getElementById('accountSettingsPanel');
    if (panel) panel.remove();
    document.removeEventListener('click', closeAccountSettingsOutside);
}

function closeAccountSettingsOutside(e) {
    const panel = document.getElementById('accountSettingsPanel');
    const btn = document.getElementById('accountSettingsBtn');
    if (!panel) return;
    if (panel.contains(e.target) || (btn && btn.contains(e.target))) return;
    closeAccountSettings();
}

function closeUserMenu() {
    $('userMenu')?.classList.add('hidden');
}

function closeSettings() {
    $('settingsMenu')?.classList.add('hidden');
}

function openSearch() {
    const modal = document.getElementById('searchModal');
    if (!modal) return;
    showEl('searchModal');
    // Remove stale tab bar so it regenerates with current language
    const staleBar = $('searchTabBar'); if (staleBar) staleBar.remove();
    // Inject tab bar (between header and results)
    if (!$('searchTabBar')) {
        const tabBar = document.createElement('div');
        tabBar.id = 'searchTabBar';
        tabBar.className = 'flex border-b theme-border shrink-0 px-5';
        tabBar.innerHTML = `
            <button id="searchTabEvents" onclick="setSearchTab('events')"
                class="flex-1 py-2.5 text-sm font-medium border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 transition-colors">
                ${state.language==='ar' ? '\u0627\u0644\u0623\u062d\u062f\u0627\u062b' : 'Events'}
            </button>
            <button id="searchTabJournal" onclick="setSearchTab('journal')"
                class="flex-1 py-2.5 text-sm font-medium border-b-2 border-transparent theme-text-secondary transition-colors">
                ${state.language==='ar' ? '\u0627\u0644\u064a\u0648\u0645\u064a\u0629' : 'Journal'}
            </button>`;
        const resultsEl = $('searchResults');
        if (resultsEl) resultsEl.before(tabBar);
    }
    state._searchTab = 'events';
    // Reset tabs to events active
    const ev = $('searchTabEvents'), jn = $('searchTabJournal');
    if (ev) ev.className = 'flex-1 py-2.5 text-sm font-medium border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 transition-colors';
    if (jn) jn.className = 'flex-1 py-2.5 text-sm font-medium border-b-2 border-transparent theme-text-secondary transition-colors';
    const input = $('searchInput');
    if (input) { input.value = ''; setTimeout(() => input.focus(), 50); }
    const results = $('searchResults');
    if (results) results.innerHTML = `<div class="px-5 py-8 text-center theme-text-secondary text-sm">${state.language==='ar' ? '\u0627\u0628\u062f\u0623 \u0627\u0644\u0643\u062a\u0627\u0628\u0629 \u0644\u0644\u0628\u062d\u062b' : 'Start typing to search'}</div>`;
    modal.addEventListener('click', e => { if (e.target === modal) closeSearchModal(); }, { once: true });
}

function closeSearchModal() { hideEl('searchModal'); }

function setSearchTab(tab) {
    state._searchTab = tab;
    const ev = $('searchTabEvents'), jn = $('searchTabJournal');
    const active = 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400';
    const inactive = 'border-b-2 border-transparent theme-text-secondary';
    if (ev) ev.className = `flex-1 py-2.5 text-sm font-medium transition-colors ${tab === 'events' ? active : inactive}`;
    if (jn) jn.className = `flex-1 py-2.5 text-sm font-medium transition-colors ${tab === 'journal' ? active : inactive}`;
    const q = $('searchInput')?.value || '';
    if (q.trim()) performSearch(q);
    else {
        const r = document.getElementById('searchResults');
        if (r) r.innerHTML = `<div class="px-5 py-8 text-center theme-text-secondary text-sm">${state.language==='ar' ? '\u0627\u0628\u062f\u0623 \u0627\u0644\u0643\u062a\u0627\u0628\u0629 \u0644\u0644\u0628\u062d\u062b' : 'Start typing to search'}</div>`;
    }
}

function performSearch(query) {
    const resultsEl = document.getElementById('searchResults');
    if (!resultsEl) return;
    if (!query.trim()) {
        resultsEl.innerHTML = `<div class="px-5 py-8 text-center theme-text-secondary text-sm">${state.language==='ar' ? '\u0627\u0628\u062f\u0623 \u0627\u0644\u0643\u062a\u0627\u0628\u0629 \u0644\u0644\u0628\u062d\u062b' : 'Start typing to search'}</div>`;
        return;
    }
    const q = query.toLowerCase();

    if (state._searchTab === 'journal') {
        // Search journal entries by title and content
        const matches = Object.entries(state.journalEntries)
            .filter(([, j]) => j && (
                (j.title && j.title.toLowerCase().includes(q)) ||
                (j.content && j.content.toLowerCase().includes(q))
            ))
            .sort((a, b) => b[0].localeCompare(a[0])); // newest first

        if (!matches.length) {
            resultsEl.innerHTML = `<div class="px-5 py-8 text-center theme-text-secondary text-sm">${state.language==='ar' ? '\u0644\u0627 \u062a\u0648\u062c\u062f \u064a\u0648\u0645\u064a\u0627\u062a \u062a\u0637\u0627\u0628\u0642' : 'No journal entries found for'} "<strong>${query}</strong>"</div>`;
            return;
        }
        resultsEl.innerHTML = matches.map(([dateStr, j]) => {
            const date = new Date(dateStr + 'T12:00:00');
            const hijri = toHijri(date);
            const snippet = (j.content || '').replace(/</g, '&lt;');
            const highlighted = snippet.replace(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'), '<mark class="bg-yellow-200 dark:bg-yellow-700 rounded px-0.5">$1</mark>');
            const preview = highlighted.length > 120 ? highlighted.slice(0, 120) + '…' : highlighted;
            return `
            <button onclick="searchGoToJournal('${dateStr}')" class="w-full px-5 py-3 flex items-start space-x-3 hover:theme-bg-tertiary transition-colors text-left">
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                        <span class="text-sm font-medium theme-text">${j.title || dateStr}</span>
                        ${j.score ? `<span class="text-xs font-bold text-blue-500">${j.score}${t('pts')}</span>` : ''}
                    </div>
                    <div class="text-xs theme-text-secondary mb-1">${dateStr} · ${hijri.day} ${tHijri(islamicMonths.indexOf(hijri.month)+1).slice(0,4)} ${hijri.year}</div>
                    ${preview ? `<div class="text-xs theme-text-secondary leading-relaxed">${preview}</div>` : ''}
                </div>
                <svg class="w-4 h-4 theme-text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>`;
        }).join('');
        return;
    }

    // Events search
    const windowDays = state.renderWindowDays || 31;
    const windowStart = new Date(state.currentDate);
    windowStart.setDate(windowStart.getDate() - windowDays);
    const windowEnd = new Date(state.currentDate);
    windowEnd.setDate(windowEnd.getDate() + windowDays);

    const searchPool = [];
    const seenKeys = new Set();
    for (const ev of events) {
        if (ev.parentId) continue;
        if (!ev.title.toLowerCase().includes(q) && !(ev.description?.toLowerCase().includes(q))) continue;
        if (!ev.repeat || ev.repeat === 'none') {
            if (!seenKeys.has(ev.id)) { searchPool.push(ev); seenKeys.add(ev.id); }
        } else {
            const baseInWindow = ev.date >= dateToLocalString(windowStart) && ev.date <= dateToLocalString(windowEnd);
            if (baseInWindow && !seenKeys.has(ev.id)) { searchPool.push(ev); seenKeys.add(ev.id); }
            for (const d of getRepeatDatesInWindow(ev, windowStart, windowEnd)) {
                const dStr = dateToLocalString(d), key = ev.id + '_' + dStr;
                if (!seenKeys.has(key)) { searchPool.push({ ...ev, date: dStr, id: key, parentId: ev.id }); seenKeys.add(key); }
            }
        }
    }

    const results = searchPool.sort((a, b) => a.date.localeCompare(b.date));
    if (!results.length) {
        resultsEl.innerHTML = `<div class="px-5 py-8 text-center theme-text-secondary text-sm">${state.language==='ar' ? '\u0644\u0627 \u062a\u0648\u062c\u062f \u0623\u062d\u062f\u0627\u062b \u062a\u0637\u0627\u0628\u0642' : 'No events found for'} "<strong>${query}</strong>"</div>`;
        return;
    }
    resultsEl.innerHTML = results.map(e => {
        const colorObj = CALENDAR_COLORS.find(c => c.id === e.color) || CALENDAR_COLORS[0];
        const timeStr = e.isAllDay ? (state.language==='ar' ? '\u0637\u0648\u0627\u0644 \u0627\u0644\u064a\u0648\u0645' : 'All day') : `${e.startTime} – ${e.endTime}`;
        const cal = state.calendars.find(c => c.id === e.calendar);
        return `
            <button onclick="searchGoToEvent('${e.id}')" class="w-full px-5 py-3 flex items-center space-x-3 hover:theme-bg-tertiary transition-colors text-left">
                <span class="w-3 h-3 rounded-full flex-shrink-0 ${colorObj.bg}"></span>
                <div class="flex-1 min-w-0">
                    <div class="text-sm font-medium theme-text truncate">${e.title}</div>
                    <div class="text-xs theme-text-secondary">${e.date} · ${timeStr}${cal ? ' · ' + cal.name : ''}</div>
                </div>
                <svg class="w-4 h-4 theme-text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>`;
    }).join('');
}

function searchGoToJournal(dateStr) {
    closeSearchModal();
    state.currentDate = new Date(dateStr + 'T12:00:00');
    renderMiniCalendar();
    switchView('day');
    setTimeout(() => openDaySidebar(dateStr), 100);
    setTimeout(() => { state.sidebarView = 'journal'; renderSidebarContent(); }, 150);
}

function searchGoToEvent(eventIdStr) {
    // eventIdStr may be a virtual composite like "12345_2026-05-01"
    let event = events.find(e => e.id === eventIdStr);
    if (!event) {
        // Try resolving virtual instance: find base event and reconstruct
        const parts = String(eventIdStr).split('_');
        const baseId = isNaN(parts[0]) ? eventIdStr : Number(parts[0]);
        const dateStr = parts[1];
        const base = events.find(e => e.id === baseId);
        if (!base) return;
        event = { ...base, date: dateStr || base.date, id: eventIdStr, parentId: base.id };
    }
    closeSearchModal();
    state.currentDate = new Date(event.date + 'T12:00:00');
    renderMiniCalendar();
    switchView('day');
    setTimeout(() => openModal(event), 100);
}

// EXPORT / IMPORT / CLEAR

function exportData() {
    // Build export without the large base64 background image
    const hasBackground = !!state.backgroundImage;
    const data = {
        user: state.currentUser,
        events: events,
        calendars: state.calendars,
        theme: { isDarkMode: state.isDarkMode, currentTheme: state.currentTheme },
        activeCalendars: state.activeCalendars,
        background: {
            imageOmitted: hasBackground,
            opacity: state.backgroundOpacity,
            scope: state.backgroundScope
        },
        location: state.userLocation,
        journal: state.journalEntries,
        variables: state.variables,
        tasks: state.tasks,
        forgottenTasks: state.forgottenTasks,
        hijriMonthOffsets: state.hijriMonthOffsets,
        calendarMode: state.calendarMode,
        renderWindowDays: state.renderWindowDays,
        exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calendar-${state.currentUser}-${todayLocalString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    const note = hasBackground ? '\n\nNote: Your background image was not included in the export to keep the file size small.' : '';
    alert('Data exported successfully!' + note);
}

function exportICS() {
    // Expand all events (including virtual repeat instances) into a flat list for export
    const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//HijriCalendar//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH'
    ];

    const icsDate = (dateStr, timeStr, isAllDay) => {
        if (isAllDay) return `VALUE=DATE:${dateStr.replace(/-/g, '')}`;
        const [h, m] = (timeStr || '00:00').split(':');
        return `${dateStr.replace(/-/g, '')}T${h.padStart(2,'0')}${m.padStart(2,'0')}00`;
    };
    const escText = s => (s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
    const stamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';

    // Build flat list: base events + virtual repeat instances (up to 2 years out)
    const allExport = [];
    const rangeEnd = new Date(); rangeEnd.setFullYear(rangeEnd.getFullYear() + 2);
    const rangeStart = new Date(); rangeStart.setFullYear(rangeStart.getFullYear() - 2);

    for (const ev of events) {
        if (ev.parentId) continue;
        if (!ev.repeat || ev.repeat === 'none') {
            allExport.push(ev);
        } else {
            // Base occurrence
            allExport.push(ev);
            // Virtual occurrences
            for (const d of getRepeatDatesInWindow(ev, rangeStart, rangeEnd)) {
                const dStr = dateToLocalString(d);
                if (ev.deletedDates?.includes(dStr)) continue;
                allExport.push({ ...ev, date: dStr, id: `${ev.id}_${dStr}`, repeat: 'none' });
            }
        }
    }

    for (const ev of allExport) {
        const uid = `${ev.id}@hijri-calendar`;
        const cal = state.calendars.find(c => c.id === ev.calendar);
        lines.push('BEGIN:VEVENT');
        lines.push(`UID:${uid}`);
        lines.push(`DTSTAMP:${stamp}`);
        if (ev.isAllDay) {
            lines.push(`DTSTART;${icsDate(ev.date, null, true)}`);
            // DTEND for all-day is exclusive next day
            const next = new Date(ev.date + 'T12:00:00'); next.setDate(next.getDate() + 1);
            lines.push(`DTEND;${icsDate(dateToLocalString(next), null, true)}`);
        } else {
            lines.push(`DTSTART:${icsDate(ev.date, ev.startTime, false)}`);
            lines.push(`DTEND:${icsDate(ev.date, ev.endTime || ev.startTime, false)}`);
        }
        lines.push(`SUMMARY:${escText(ev.title)}`);
        if (ev.description) lines.push(`DESCRIPTION:${escText(ev.description)}`);
        if (cal) lines.push(`CATEGORIES:${escText(cal.name)}`);
        if (ev.completed) lines.push('STATUS:COMPLETED');
        lines.push('END:VEVENT');
    }
    lines.push('END:VCALENDAR');

    const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calendar-${state.currentUser}-${todayLocalString()}.ics`;
    a.click();
    URL.revokeObjectURL(url);
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                if (data.events)           { events = data.events; saveEvents(); }
                if (data.calendars)        { state.calendars = data.calendars; saveCalendars(); }
                if (data.theme)            { state.isDarkMode = data.theme.isDarkMode; applyTheme(data.theme.currentTheme || 'default', state.isDarkMode ? 'dark' : 'light'); saveTheme(); }
                if (data.activeCalendars)  { state.activeCalendars = data.activeCalendars; saveToStorage(STORAGE_KEYS.CALENDARS(state.currentUser) + '_active', data.activeCalendars); }
                if (data.journal)          { state.journalEntries = data.journal; saveJournal(); }
                if (data.variables)        { state.variables = data.variables; saveVariables(); }
                if (data.location)         { state.userLocation = data.location; saveLocation(); }
                if (data.tasks)            { state.tasks = data.tasks; saveTasks(); }
                if (data.forgottenTasks)   { state.forgottenTasks = data.forgottenTasks; saveForgottenTasks(); }
                if (data.hijriMonthOffsets){ state.hijriMonthOffsets = data.hijriMonthOffsets; saveHijriOffsets(); }
                if (data.calendarMode)     { state.calendarMode = data.calendarMode; saveCalendarMode(); }
                if (data.renderWindowDays) { state.renderWindowDays = data.renderWindowDays; saveRenderWindow(); }
                updateForgottenBadge();
                renderCurrentView(); renderMiniCalendar(); renderCalendarList(); applyBackground(); updateCalendarModeToggleUI();
                alert('Data imported successfully!');
            } catch (err) {
                alert('Error importing data. Please check the file format.');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function clearAllData() {
    closeAccountSettings();
    openClearDataModal();
}

function openClearDataModal() {
    const existing = document.getElementById('clearDataModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'clearDataModal';
    modal.className = 'fixed inset-0 z-[300] flex items-center justify-center modal-backdrop';
    modal.innerHTML = `
        <div class="theme-bg rounded-2xl shadow-2xl w-full max-w-sm mx-4 border theme-border overflow-hidden modal-animate">
            <!-- Header -->
            <div class="px-6 py-5 border-b theme-border">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                        <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </div>
                    <div>
                        <h2 class="font-semibold text-base theme-text">${state.language==='ar' ? '\u0645\u0633\u062d \u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u062d\u0633\u0627\u0628' : 'Clear Account Data'}</h2>
                        <p class="text-xs theme-text-secondary mt-0.5">${state.language==='ar' ? '\u0627\u0644\u062d\u0633\u0627\u0628:' : 'Account:'} <span class="font-medium theme-text">${state.currentUser}</span></p>
                    </div>
                </div>
            </div>

            <!-- What will be deleted -->
            <div class="px-6 py-4 space-y-3">
                <p class="text-sm theme-text-secondary">${state.language==='ar' ? '\u0633\u064a\u062a\u0645 \u062d\u0630\u0641 \u0645\u0627 \u064a\u0644\u064a \u0646\u0647\u0627\u0626\u064a\u0627\u064b:' : 'This will permanently delete:'}</p>
                <div class="grid grid-cols-2 gap-2">
                    ${(state.language==='ar' ? [
                        ['📅','جميع الأحداث'],
                        ['📓','إدخالات اليومية'],
                        ['✅','المهام والأهداف'],
                        ['🌙','إعدادات الصلاة'],
                        ['📁','التقاويم المخصصة'],
                        ['🖼️','صورة الخلفية'],
                        ['📍','بيانات الموقع'],
                        ['⭐','سجل النقاط'],
                    ] : [
                        ['📅','All events'],
                        ['📓','Journal entries'],
                        ['✅','Tasks & goals'],
                        ['🌙','Prayer settings'],
                        ['📁','Custom calendars'],
                        ['🖼️','Background image'],
                        ['📍','Location data'],
                        ['⭐','Score history'],
                    ]).map(([icon, label]) => `
                        <div class="flex items-center space-x-2 text-sm theme-text-secondary">
                            <span>${icon}</span><span>${label}</span>
                        </div>`).join('')}
                </div>

                <!-- Warning box -->
                <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 mt-1">
                    <p class="text-xs text-red-700 dark:text-red-300 font-semibold">⚠ ${state.language==='ar' ? '\u0644\u0627 \u064a\u0645\u0643\u0646 \u0627\u0644\u062a\u0631\u0627\u062c\u0639.' : 'This cannot be undone.'}</p>
                    <p class="text-xs text-red-600 dark:text-red-400 mt-1">${state.language==='ar' ? '\u064a\u064f\u0646\u0635\u062d \u0628\u062a\u0635\u062f\u064a\u0631 \u0628\u064a\u0627\u0646\u0627\u062a\u0643 \u0623\u0648\u0644\u0627\u064b.' : 'Consider exporting your data first.'}</p>
                </div>

                <!-- Confirm input -->
                <div class="pt-1">
                    <label class="block text-xs font-medium theme-text-secondary mb-1.5">
                        ${state.language==='ar' ? '\u0627\u0643\u062a\u0628' : 'Type'} <span class="font-bold theme-text">${state.currentUser}</span> ${state.language==='ar' ? '\u0644\u0644\u062a\u0623\u0643\u064a\u062f' : 'to confirm'}
                    </label>
                    <input type="text" id="clearDataConfirmInput"
                        placeholder="${state.currentUser}"
                        class="w-full theme-bg-tertiary border theme-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 theme-text" dir="ltr"
                        oninput="checkClearDataReady()"
                        onkeydown="if(event.key==='Enter') executeClearData()">
                </div>
            </div>

            <!-- Actions -->
            <div class="px-6 pb-5 flex items-center space-x-3">
                <button onclick="closeClearDataModal()"
                    class="flex-1 py-2.5 rounded-xl border theme-border hover:theme-bg-tertiary transition-colors text-sm font-medium theme-text-secondary">
                    ${state.language==='ar' ? '\u0625\u0644\u063a\u0627\u0621' : 'Cancel'}
                </button>
                <button id="clearDataConfirmBtn" onclick="executeClearData()" disabled
                    class="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium transition-colors opacity-40 cursor-not-allowed">
                    ${state.language==='ar' ? '\u0645\u0633\u062d \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a' : 'Clear Data'}
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => {
        const input = document.getElementById('clearDataConfirmInput');
        if (input) input.focus();
    }, 50);
}

function checkClearDataReady() {
    const input = document.getElementById('clearDataConfirmInput');
    const btn = document.getElementById('clearDataConfirmBtn');
    if (!input || !btn) return;
    const ready = input.value === state.currentUser;
    btn.disabled = !ready;
    btn.classList.toggle('opacity-40', !ready);
    btn.classList.toggle('cursor-not-allowed', !ready);
    btn.classList.toggle('hover:bg-red-700', ready);
}

function closeClearDataModal() {
    const modal = document.getElementById('clearDataModal');
    if (modal) modal.remove();
}

function executeClearData() {
    const input = document.getElementById('clearDataConfirmInput');
    if (!input || input.value !== state.currentUser) return;

    const u = state.currentUser;
    const allKeys = [
        STORAGE_KEYS.EVENTS(u), STORAGE_KEYS.THEME(u), STORAGE_KEYS.BACKGROUND(u),
        STORAGE_KEYS.CALENDARS(u), STORAGE_KEYS.LOCATION(u), STORAGE_KEYS.PRAYER_TIMES_CACHE(u),
        STORAGE_KEYS.JOURNAL(u), STORAGE_KEYS.VARIABLES(u), STORAGE_KEYS.SHOW_PRAYER_TIMES(u),
        STORAGE_KEYS.TASKS(u), STORAGE_KEYS.FORGOTTEN(u), STORAGE_KEYS.RENDER_WINDOW(u),
        STORAGE_KEYS.PFP(u), STORAGE_KEYS.MONTHLY_BG(u), STORAGE_KEYS.CALENDAR_MODE(u),
        STORAGE_KEYS.HIJRI_OFFSETS(u)
    ];
    allKeys.forEach(k => removeFromStorage(k));

    // Reset in-memory state
    events = [];
    state.calendars = [...DEFAULT_CALENDARS];
    state.activeCalendars = DEFAULT_CALENDARS.map(c => c.id);
    state.backgroundImage = null;
    state.userLocation = null;
    state.prayerTimesCache = {};
    state.journalEntries = {};
    state.variables = {};
    state.tasks = { day: {}, week: {}, month: {}, year: {} };
    state.forgottenTasks = [];
    state.pfp = null;
    state.calendarMode = 'gregorian';
    state.hijriMonthOffsets = {};
    state.showPrayerTimesInView = false;

    closeClearDataModal();
    removeBackground();
    applyTheme('default', 'light');
    renderCurrentView();
    renderMiniCalendar();
    renderCalendarList();
    updateHeaderScores();

    // Show a brief success toast
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium px-5 py-3 rounded-full shadow-xl z-[400] transition-all';
    toast.textContent = state.language==='ar' ? '✓ تم مسح بيانات الحساب' : '✓ Account data cleared';
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 2500);
}

// UTILITIES

function formatHour(hour) {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
}

function getDuration(start, end) {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    return (eh * 60 + em) - (sh * 60 + sm);
}

function addMinutes(time, minutes) {
    const [h, m] = time.split(':').map(Number);
    const total = h * 60 + m + minutes;
    const newH = Math.floor(total / 60) % 24;
    const newM = total % 60;
    return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
}

// KEYBOARD SHORTCUTS

function openVariableSettings() {
    let modal = $('variableSettingsModal');
    if (modal) { modal.remove(); return; }
    modal = document.createElement('div');
    modal.id = 'variableSettingsModal';
    modal.className = 'fixed inset-0 modal-backdrop flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="theme-bg rounded-2xl shadow-2xl w-full max-w-md modal-animate overflow-hidden border theme-border">
            <div class="px-6 py-4 border-b theme-border flex items-center justify-between">
                <h3 class="text-lg font-semibold">${t('journalVars')}</h3>
                <button onclick="closeVariableSettings()" class="theme-text-secondary hover:theme-text transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            </div>
            <div class="p-6 space-y-4">
                <p class="text-sm theme-text-secondary">${state.language==='ar' ? 'أنشئ متغيرات لاستخدامها في تعبيرات النقاط مثل:' : 'Create variables to use in score expressions like'} <code class="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded text-xs">work*2 + gym</code></p>
                <div class="space-y-2">
                    <div class="flex space-x-2">
                        <input type="text" id="newVarName" placeholder="${state.language==='ar' ? 'الاسم (مثال: عمل)' : 'Name (e.g. work)'}"
                            class="flex-1 theme-bg-tertiary border theme-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 theme-text">
                        <input type="number" id="newVarValue" placeholder="${state.language==='ar' ? 'القيمة' : 'Value'}" step="any"
                            class="w-24 theme-bg-tertiary border theme-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 theme-text">
                    </div>
                    <button onclick="addVariable()" class="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">${t('add')}</button>
                </div>
                <div id="variableListContainer" class="space-y-2 max-h-60 overflow-y-auto"></div>
                <div class="flex justify-end pt-4 border-t theme-border">
                    <button onclick="closeVariableSettings()" class="px-4 py-2 text-sm font-medium theme-text-secondary hover:theme-bg-tertiary rounded-lg transition-colors">${state.language==='ar' ? 'تم' : 'Done'}</button>
                </div>
            </div>
        </div>`;
    document.body.appendChild(modal);
    renderVariableList();
    modal.addEventListener('click', e => { if (e.target === modal) closeVariableSettings(); });
}

function closeVariableSettings() { $('variableSettingsModal')?.remove(); }

function renderVariableList() {
    const container = $('variableListContainer');
    if (!container) return;
    if (Object.keys(state.variables).length === 0) {
        container.innerHTML = `<p class="text-sm theme-text-secondary text-center py-4">${state.language==='ar' ? 'لا توجد متغيرات بعد. أضف متغيراً أعلاه!' : 'No variables yet. Add one above!'}</p>`;
        return;
    }
    container.innerHTML = Object.entries(state.variables).map(([name, value]) => `
        <div class="flex items-center justify-between p-3 theme-bg-tertiary rounded-lg">
            <div class="flex items-center space-x-3">
                <code class="text-sm font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">${name}</code>
                <span class="text-sm theme-text">= ${value}</span>
            </div>
            <button onclick="deleteVariable('${name}')" class="text-red-500 hover:text-red-600 p-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
        </div>`).join('');
}

function addVariable() {
    const nameInput = $('newVarName'), valueInput = $('newVarValue');
    const name = nameInput?.value?.trim().toLowerCase();
    const value = parseFloat(valueInput?.value);
    if (!name || isNaN(value)) { alert('Please enter both a name and a numeric value'); return; }
    if (!/^[a-z_][a-z0-9_]*$/.test(name)) { alert('Name must start with a letter and contain only letters, numbers, and underscores'); return; }
    state.variables[name] = value;
    saveVariables();
    nameInput.value = ''; valueInput.value = '';
    renderVariableList();
}

function deleteVariable(name) {
    if (!confirm(`Delete variable "${name}"?`)) return;
    delete state.variables[name];
    saveVariables();
    renderVariableList();
}

function handleKeyboardShortcuts(e) {
    if (e.key === 'Escape') {
        document.getElementById('eventDetailsModal')?.remove();
        closeModal(); closeCalendarEditModal(); closeBackgroundSettings();
        closeUserMenu(); closeSettings(); closeLocationSettings(); closeForgottenTasks(); closeEditSeriesModal(); closeRenderWindowSettings();
        const djp = document.getElementById('dateJumpPopover'); if (djp) djp.remove();
        closeThemePicker(); closeVariableSettings();
        closeDeleteSeriesSheet(); closeSearchModal();
        closeAddAccountModal(); closeDeleteAccountModal();
        closeAddCalendarModal();
        $('viewAllTasksModal')?.remove();
        $('clearDataModal')?.remove();
        $('hijriSightingPanel')?.remove();
        closeAccountSettings();
        if (state.currentDaySidebar) closeDaySidebar();
    }

    // Arrow key navigation — only fires when the user isn't typing in a field
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const active = document.activeElement;
        const typing = active && (
            active.tagName === 'INPUT' ||
            active.tagName === 'TEXTAREA' ||
            active.tagName === 'SELECT' ||
            active.isContentEditable
        );
        // Also skip if any modal/sheet is open
        const modalOpen = $('eventModal')?.classList.contains('flex')
            || document.getElementById('deleteSeriesSheet');
        if (!typing && !modalOpen) {
            e.preventDefault();
            e.key === 'ArrowLeft' ? navigatePrev() : navigateNext();
        }
    }
}

// INITIALIZATION

function setupEventListeners() {
    // Modal backdrop close
    document.getElementById('eventModal').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
    document.getElementById('calendarEditModal').addEventListener('click', e => { if (e.target === e.currentTarget) closeCalendarEditModal(); });
    document.getElementById('backgroundModal').addEventListener('click', e => { if (e.target === e.currentTarget) closeBackgroundSettings(); });

    document.addEventListener('keydown', handleKeyboardShortcuts);

    // Form submit
    document.getElementById('eventForm')?.addEventListener('submit', handleFormSubmit);

    // Auto-save
    document.addEventListener('visibilitychange', () => { if (document.hidden) saveAllData(); });
    window.addEventListener('beforeunload', saveAllData);

    // Close dropdowns on outside click
    document.addEventListener('click', (e) => {
        const userMenu = document.getElementById('userMenu');
        const settingsMenu = document.getElementById('settingsMenu');
        const userBtn = document.getElementById('userMenuBtn');
        const settingsBtn = document.getElementById('settingsBtn');
        // legacy menus — safe-guard
        if (userMenu && !userMenu.contains(e.target) && !userBtn?.contains(e.target)) userMenu.classList.add('hidden');
        if (settingsMenu && !settingsMenu.contains(e.target) && !settingsBtn?.contains(e.target)) settingsMenu.classList.add('hidden');
    });

    const dateInput = document.getElementById('eventDate');
    if (dateInput) {
        dateInput.addEventListener('change', async (e) => {
            if (state.userLocation && state.usePrayerTimes) await loadPrayerTimesForDate(e.target.value);
        });
    }

    const prayerToggle = document.getElementById('prayerTimeToggle');
    if (prayerToggle) {
        prayerToggle.addEventListener('click', () => {
            if (!state.userLocation) {
                if (confirm('You need to set your location first to use prayer times. Would you like to set it now?')) {
                    openLocationSettings();
                }
                return;
            }
            togglePrayerTimes(!state.usePrayerTimes);
        });
    }

    ['prayerStartSelect','prayerEndSelect'].forEach(id => {
        const sel = document.getElementById(id);
        if (sel) sel.addEventListener('change', updatePrayerTimeDisplay);
    });

    const startOffset = document.getElementById('prayerStartOffset');
    const endOffset = document.getElementById('prayerEndOffset');
    if (startOffset) { startOffset.addEventListener('change', updatePrayerTimeDisplay); startOffset.addEventListener('input', updatePrayerTimeDisplay); }
    if (endOffset)   { endOffset.addEventListener('change', updatePrayerTimeDisplay);   endOffset.addEventListener('input', updatePrayerTimeDisplay); }

    const repeatSelect = document.getElementById('eventRepeat');
    if (repeatSelect) {
        repeatSelect.addEventListener('change', () => {
            const customRepeatSummary = document.getElementById('customRepeatSummary');
            const monthlyOverflowRow = document.getElementById('monthlyOverflowRow');
            const monthlyTypeRow = document.getElementById('monthlyTypeRow');
            // Show summary line for custom repeat
            if (customRepeatSummary) customRepeatSummary.classList.toggle('hidden', repeatSelect.value !== 'custom');
            // Auto-open sheet when selecting custom
            if (repeatSelect.value === 'custom') {
                updateCustomRepeatSummary();
                openCustomRepeatSheet();
            }
            // Show monthly type row for monthly preset
            if (monthlyTypeRow) monthlyTypeRow.classList.toggle('hidden', repeatSelect.value !== 'monthly');
            // Only show overflow for monthly dayOfMonth mode
            const monthlyType = document.getElementById('monthlyType')?.value || 'dayOfMonth';
            if (monthlyOverflowRow) monthlyOverflowRow.classList.toggle('hidden',
                repeatSelect.value !== 'monthly' || monthlyType === 'nthWeekday');
        });
    }

    const repeatUnit = document.getElementById('repeatUnit');
    if (repeatUnit) {
        repeatUnit.addEventListener('change', () => {
            const repeatOnDays = document.getElementById('repeatOnDays');
            const monthOverflowRow = document.getElementById('monthOverflowRow');
            const customMonthlyTypeRow = document.getElementById('customMonthlyTypeRow');
            if (repeatOnDays) repeatOnDays.style.display = repeatUnit.value === 'weeks' ? 'block' : 'none';
            const monthlyType = document.getElementById('monthlyType')?.value || 'dayOfMonth';
            if (monthOverflowRow) monthOverflowRow.style.display = (repeatUnit.value === 'months' && monthlyType !== 'nthWeekday') ? 'flex' : 'none';
            if (customMonthlyTypeRow) customMonthlyTypeRow.style.display = repeatUnit.value === 'months' ? 'block' : 'none';
        });
    }

    // Update repeat presets when event date changes
    const eventDateInput = document.getElementById('eventDate');
    if (eventDateInput) {
        eventDateInput.addEventListener('change', () => {
            updateRepeatPresets(eventDateInput.value);
        });
    }

    document.querySelectorAll('.repeat-day-btn').forEach(btn => {
        btn.addEventListener('click', () => _toggleDayBtn(btn));
    });

    // All-day toggle
    document.getElementById('allDayToggle')?.addEventListener('click', toggleAllDay);

    initResizeHandlers();

    // ── Touch swipe navigation ────────────────────────────────────────────────
    // Swipe left = next, swipe right = prev
    // Works on all main view containers
    const swipeTargets = ['weekView', 'monthView', 'yearView', 'dayView'];
    swipeTargets.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        let touchStartX = 0;
        let touchStartY = 0;
        let touchStartTime = 0;

        el.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
        }, { passive: true });

        el.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;
            const dt = Date.now() - touchStartTime;

            // Must be: fast enough (<400ms), horizontal dominant, and far enough (>50px)
            const isHorizontal = Math.abs(dx) > Math.abs(dy) * 1.5;
            const isFarEnough  = Math.abs(dx) > 50;
            const isFastEnough = dt < 400;

            if (isHorizontal && isFarEnough && isFastEnough) {
                if (dx < 0) {
                    // Swipe left → go forward
                    navigateNext();
                } else {
                    // Swipe right → go back
                    navigatePrev();
                }
            }
        }, { passive: true });
    });
}



