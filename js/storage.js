// STORAGE FUNCTIONS

function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            console.error('localStorage quota exceeded! Data not saved.', key);
            if (!key.includes('background')) {
                alert('Storage quota exceeded. Some data could not be saved. Consider removing the background image to free up space (Settings → Background → Remove).');
            }
        } else {
            console.error('Error saving to localStorage:', e);
        }
        return false;
    }
}

function loadFromStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.error('Error loading from localStorage:', e);
        return defaultValue;
    }
}

function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (e) {
        console.error('Error removing from localStorage:', e);
        return false;
    }
}

function saveJournal() { saveToStorage(STORAGE_KEYS.JOURNAL(state.currentUser), state.journalEntries); syncDebounce(); updateWidgetData(); }
function loadJournal() { state.journalEntries = loadFromStorage(STORAGE_KEYS.JOURNAL(state.currentUser)) || {}; }
function saveVariables() { saveToStorage(STORAGE_KEYS.VARIABLES(state.currentUser), state.variables); }
function loadVariables() { state.variables = loadFromStorage(STORAGE_KEYS.VARIABLES(state.currentUser)) || {}; }

// TASKS — storage, keys, point calculators

function saveTasks() { saveToStorage(STORAGE_KEYS.TASKS(state.currentUser), state.tasks); syncDebounce(); }
function loadTasks() { state.tasks = loadFromStorage(STORAGE_KEYS.TASKS(state.currentUser)) || { day: {}, week: {}, month: {}, year: {} }; }
function saveRenderWindow() { saveToStorage(STORAGE_KEYS.RENDER_WINDOW(state.currentUser), state.renderWindowDays); }
function loadRenderWindow() { state.renderWindowDays = loadFromStorage(STORAGE_KEYS.RENDER_WINDOW(state.currentUser)) || 31; }
function saveForgottenTasks() { saveToStorage(STORAGE_KEYS.FORGOTTEN(state.currentUser), state.forgottenTasks); }
function loadForgottenTasks() { state.forgottenTasks = loadFromStorage(STORAGE_KEYS.FORGOTTEN(state.currentUser)) || []; }

// Period key helpers
function getWeekKey(dateStr) {
    const d = new Date(dateStr + 'T12:00:00'), s = new Date(d);
    s.setDate(d.getDate() - d.getDay());
    return dateToLocalString(s);
}
function getMonthKey(dateStr) { return dateStr.slice(0, 7); }
function getYearKey(dateStr)  { return dateStr.slice(0, 4); }

// Completed points per period
function calcDayTaskPts(dateStr) {
    return (state.tasks.day[dateStr] || []).filter(t => t.completed).reduce((s,t) => s+(t.points||0), 0);
}
function calcWeekTaskPts(weekKey) {
    return (state.tasks.week[weekKey] || []).filter(t => t.completed).reduce((s,t) => s+(t.points||0), 0);
}
function calcMonthTaskPts(monthKey) {
    return (state.tasks.month[monthKey] || []).filter(t => t.completed).reduce((s,t) => s+(t.points||0), 0);
}
function calcYearTaskPts(yearKey) {
    return (state.tasks.year[yearKey] || []).filter(t => t.completed).reduce((s,t) => s+(t.points||0), 0);
}

// Day total = journal score + day task points + completed event points

function fmtScore(n) {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 1_000)     return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    return String(n);
}
function calcDayEventPts(dateStr) {
    return getEventsForDate(dateStr)
        .filter(e => e.completed && e.points && state.activeCalendars.includes(e.calendar))
        .reduce((s, e) => s + (e.points || 0), 0);
}
function calcDayTotal(dateStr) {
    const j = state.journalEntries[dateStr];
    return (j?.score || 0) + calcDayTaskPts(dateStr) + calcDayEventPts(dateStr);
}

function saveShowPrayerTimes() { saveToStorage(STORAGE_KEYS.SHOW_PRAYER_TIMES(state.currentUser), state.showPrayerTimesInView); }
function loadShowPrayerTimes() { state.showPrayerTimesInView = loadFromStorage(STORAGE_KEYS.SHOW_PRAYER_TIMES(state.currentUser)) === true; }
function toggleShowPrayerTimesInView() {
    if (!state.userLocation) {
        if (confirm('You need to set your location first to show prayer times. Set it now?')) openLocationSettings();
        return;
    }
    state.showPrayerTimesInView = !state.showPrayerTimesInView;
    saveShowPrayerTimes();
    renderCurrentView();
    const btn = document.getElementById('prayerViewToggleBtn');
    if (btn) {
        const label = btn.querySelector('span');
        if (label) label.textContent = state.showPrayerTimesInView ? t('hidePrayerTimes') : t('prayerTimes');
        btn.classList.toggle('bg-blue-50', state.showPrayerTimesInView);
        btn.classList.toggle('dark:bg-blue-900/20', state.showPrayerTimesInView);
        btn.classList.toggle('border-blue-500', state.showPrayerTimesInView);
    }
    const mobileBtn = document.getElementById('mobilePrayerBtn');
    if (mobileBtn) {
        mobileBtn.classList.toggle('text-amber-500', state.showPrayerTimesInView);
        mobileBtn.style.opacity = state.showPrayerTimesInView ? '1' : '0.6';
    }
}

function loadAllData() {
    loadEvents(); loadTheme(); loadBackground(); loadCalendars();
    loadLocation(); loadPrayerTimesCache(); loadJournal(); loadVariables(); loadShowPrayerTimes(); loadTasks(); loadForgottenTasks(); loadRenderWindow(); loadPfp(); loadMonthlyBg(); loadCalendarMode(); loadHijriOffsets(); loadLanguage();
}

function saveAllData() {
    saveEvents(); saveTheme(); saveBackground(); saveCalendars();
    saveToStorage(STORAGE_KEYS.CALENDARS(state.currentUser) + '_active', state.activeCalendars);
    saveLocation(); savePrayerTimesCache(); saveJournal(); saveVariables(); saveShowPrayerTimes(); saveTasks(); saveForgottenTasks();
}

// USER MANAGEMENT

function loadUsers() {
    const saved = loadFromStorage(STORAGE_KEYS.USERS);
    state.users = saved?.length > 0 ? saved : ['default'];
    if (!saved?.length) saveToStorage(STORAGE_KEYS.USERS, state.users);
    const current = loadFromStorage(STORAGE_KEYS.CURRENT_USER);
    state.currentUser = (current && state.users.includes(current)) ? current : state.users[0];
    if (!current || !state.users.includes(current)) saveToStorage(STORAGE_KEYS.CURRENT_USER, state.currentUser);
    updateUserDisplay();
}

function saveUsers() {
    saveToStorage(STORAGE_KEYS.USERS, state.users);
    saveToStorage(STORAGE_KEYS.CURRENT_USER, state.currentUser);
}

function switchUser(username) {
    if (!state.users.includes(username)) return;
    saveAllData();
    // Disconnect sync before switching — each account manages its own sync config
    if (isSyncEnabled()) disconnectSync();
    state.currentUser = username;
    saveToStorage(STORAGE_KEYS.CURRENT_USER, username);
    loadAllData();
    // Re-init sync for the new account if it has its own config saved
    initSync();
    updateForgottenBadge();
    renderCurrentView(); renderMiniCalendar(); renderCalendarList();
    applyBackground(); updateUserDisplay(); closeUserMenu();
}

function openAddAccountModal() {
    closeAccountSettings();
    const modal = document.getElementById('addAccountModal');
    if (!modal) return;
    const input = document.getElementById('newAccountName');
    const err = document.getElementById('addAccountError');
    if (input) input.value = '';
    if (err) { err.textContent = ''; err.classList.add('hidden'); }
    showEl('addAccountModal');
    setTimeout(() => input?.focus(), 50);
    modal.addEventListener('click', e => { if (e.target === modal) closeAddAccountModal(); }, { once: true });
}

function closeAddAccountModal() { hideEl('addAccountModal'); }

function confirmAddAccount() {
    const input = document.getElementById('newAccountName');
    const err = document.getElementById('addAccountError');
    const username = input?.value?.trim();
    const showErr = (msg) => { if (err) { err.textContent = msg; err.classList.remove('hidden'); } };

    if (!username) { showErr(t('errEmptyName')); return; }
    if (state.users.includes(username)) { showErr(t('errNameExists')); return; }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) { showErr(t('errInvalidChars')); return; }

    closeAddAccountModal();
    state.users.push(username);
    saveUsers();
    switchUser(username);
    events = [];
    state.calendars = [...DEFAULT_CALENDARS];
    state.activeCalendars = DEFAULT_CALENDARS.map(c => c.id);
    state.backgroundImage = null;
    state.userLocation = null;
    state.prayerTimesCache = {};
    saveAllData();
}

function createNewUser() { openAddAccountModal(); }

function openDeleteAccountModal() {
    closeAccountSettings();
    const modal = document.getElementById('deleteAccountModal');
    if (!modal) return;
    const listEl = document.getElementById('deleteAccountList');
    const confirmEl = document.getElementById('deleteAccountConfirm');
    const confirmInput = document.getElementById('deleteAccountConfirmInput');
    const confirmBtn = document.getElementById('confirmDeleteAccountBtn');
    if (confirmEl) confirmEl.classList.add('hidden');
    if (confirmInput) confirmInput.value = '';
    if (confirmBtn) { confirmBtn.disabled = true; confirmBtn.classList.add('opacity-50', 'cursor-not-allowed'); }

    // Store selected target
    modal._selectedUser = null;

    if (listEl) {
        listEl.innerHTML = '';
        state.users.forEach(user => {
            const isCurrent = user === state.currentUser;
            const isOnly = state.users.length <= 1;
            const btn = document.createElement('button');
            btn.disabled = isOnly;
            btn.className = `w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors ${isOnly ? 'opacity-40 cursor-not-allowed' : 'hover:theme-bg-tertiary cursor-pointer'}`;
            btn.innerHTML = `
                <div class="w-7 h-7 rounded-full bg-gradient-to-br ${isCurrent ? 'from-blue-400 to-blue-600' : 'from-gray-400 to-gray-600'} flex items-center justify-center text-white text-xs font-bold flex-shrink-0">${user.substring(0,2).toUpperCase()}</div>
                <span class="flex-1 font-medium">${user}</span>
                ${isCurrent ? `<span class="text-xs theme-text-secondary">${t('currentAccount')}</span>` : ''}
                ${isOnly ? `<span class="text-xs text-orange-500">${t('onlyAccount')}</span>` : ''}
            `;
            btn.onclick = () => {
                listEl.querySelectorAll('button').forEach(b => b.classList.remove('bg-red-50', 'dark:bg-red-900/20', 'border', 'border-red-300', 'dark:border-red-700'));
                btn.classList.add('bg-red-50', 'dark:bg-red-900/20', 'border', 'border-red-300', 'dark:border-red-700');
                modal._selectedUser = user;
                document.getElementById('deleteAccountNameDisplay').textContent = `"${user}"`;
                if (confirmEl) confirmEl.classList.remove('hidden');
                if (confirmInput) { confirmInput.value = ''; confirmInput.placeholder = user; confirmInput.focus(); }
                checkDeleteConfirm();
            };
            listEl.appendChild(btn);
        });
    }

    showEl('deleteAccountModal');
    modal.addEventListener('click', e => { if (e.target === modal) closeDeleteAccountModal(); }, { once: true });
}

function closeDeleteAccountModal() { hideEl('deleteAccountModal'); }

function checkDeleteConfirm() {
    const modal = document.getElementById('deleteAccountModal');
    const input = document.getElementById('deleteAccountConfirmInput');
    const btn = document.getElementById('confirmDeleteAccountBtn');
    if (!modal || !input || !btn) return;
    const match = input.value.trim() === modal._selectedUser;
    btn.disabled = !match;
    btn.classList.toggle('opacity-50', !match);
    btn.classList.toggle('cursor-not-allowed', !match);
}

function confirmDeleteAccount() {
    const modal = document.getElementById('deleteAccountModal');
    const toDelete = modal?._selectedUser;
    if (!toDelete) return;
    if (state.users.length <= 1) return;

    state.users = state.users.filter(u => u !== toDelete);
    saveUsers();
    removeFromStorage(STORAGE_KEYS.EVENTS(toDelete));
    removeFromStorage(STORAGE_KEYS.THEME(toDelete));
    removeFromStorage(STORAGE_KEYS.BACKGROUND(toDelete));
    removeFromStorage(STORAGE_KEYS.CALENDARS(toDelete));
    removeFromStorage(STORAGE_KEYS.LOCATION(toDelete));
    removeFromStorage(STORAGE_KEYS.PRAYER_TIMES_CACHE(toDelete));
    removeFromStorage(STORAGE_KEYS.JOURNAL(toDelete));
    removeFromStorage(STORAGE_KEYS.VARIABLES(toDelete));
    removeFromStorage(STORAGE_KEYS.TASKS(toDelete));
    removeFromStorage(STORAGE_KEYS.FORGOTTEN(toDelete));

    closeDeleteAccountModal();
    if (toDelete === state.currentUser) switchUser(state.users[0]);
    renderCurrentView(); renderMiniCalendar(); renderCalendarList();
}

function deleteUser() { openDeleteAccountModal(); }

function updateUserDisplay() {
    const d = $('userDisplay');
    if (d) d.textContent = state.currentUser;
    updateAvatarDisplay();
}

// LOCATION & PRAYER SETTINGS

function loadLocation() {
    const saved = loadFromStorage(STORAGE_KEYS.LOCATION(state.currentUser));
    if (saved) state.userLocation = saved;
    const savedMethod = loadFromStorage(STORAGE_KEYS.LOCATION(state.currentUser) + '_method');
    if (savedMethod !== null) state.prayerMethod = savedMethod;
}
function saveLocation() {
    saveToStorage(STORAGE_KEYS.LOCATION(state.currentUser), state.userLocation);
    saveToStorage(STORAGE_KEYS.LOCATION(state.currentUser) + '_method', state.prayerMethod ?? 4);
}

function openLocationSettings() {
    const modal = document.getElementById('locationModal');
    if (!modal) { createLocationModal(); return; }
    if (state.userLocation) {
        const c = document.getElementById('locationCity');
        const cn = document.getElementById('locationCountry');
        const la = document.getElementById('locationLat');
        const ln = document.getElementById('locationLng');
        if (c && state.userLocation.city) c.value = state.userLocation.city;
        if (cn && state.userLocation.country) cn.value = state.userLocation.country;
        if (la && state.userLocation.lat) la.value = state.userLocation.lat;
        if (ln && state.userLocation.lng) ln.value = state.userLocation.lng;
    }
    const methodEl = document.getElementById('prayerMethodSelect');
    if (methodEl) methodEl.value = state.prayerMethod ?? 4;
    modal.classList.remove('hidden'); modal.classList.add('flex');
}

async function detectUserLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) { reject(new Error('Geolocation not supported')); return; }
        navigator.geolocation.getCurrentPosition(
            (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude, city: null, country: null }),
            (err) => reject(err),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    });
}

function createLocationModal() {
    const old = document.getElementById('locationModal');
    if (old) old.remove();
    const modal = document.createElement('div');
    modal.id = 'locationModal';
    modal.className = 'fixed inset-0 modal-backdrop hidden items-center justify-center z-50';
    modal.innerHTML = `
        <div class="theme-bg rounded-2xl shadow-2xl w-full max-w-md modal-animate overflow-hidden border theme-border">
            <div class="px-6 py-4 border-b theme-border flex items-center justify-between">
                <h3 class="text-lg font-semibold">${t('locationSettings')}</h3>
                <button onclick="closeLocationSettings()" class="theme-text-secondary hover:theme-text transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div class="p-6 space-y-4">
                <button onclick="autoDetectLocation()" id="autoDetectBtn" class="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span>${state.language==='ar' ? 'تحديد موقعي تلقائياً' : 'Auto-Detect My Location'}</span>
                </button>
                <div id="detectStatus" class="text-xs text-center theme-text-secondary hidden">Detecting...</div>
                <div class="relative flex items-center justify-center">
                    <div class="absolute border-t theme-border w-full"></div>
                    <span class="relative theme-bg px-2 text-xs theme-text-secondary">${state.language==='ar' ? 'أو أدخل يدوياً' : 'OR enter manually'}</span>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">${state.language==='ar' ? 'المدينة' : 'City'}</label>
                    <input type="text" id="locationCity" placeholder="${state.language==='ar' ? 'مثال: الرياض' : 'e.g., Dubai'}" class="w-full theme-bg-tertiary border theme-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 theme-text">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">${state.language==='ar' ? 'الدولة' : 'Country'}</label>
                    <input type="text" id="locationCountry" placeholder="${state.language==='ar' ? 'مثال: السعودية' : 'e.g., UAE'}" class="w-full theme-bg-tertiary border theme-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 theme-text">
                </div>
                <div class="border-t theme-border pt-4">
                    <div class="text-xs font-medium theme-text-secondary uppercase tracking-wider mb-2">${state.language==='ar' ? 'أو استخدم الإحداثيات' : 'Or use coordinates'}</div>
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-sm font-medium mb-1">${state.language==='ar' ? 'خط العرض' : 'Latitude'}</label>
                            <input type="number" id="locationLat" placeholder="25.2048" step="any" class="w-full theme-bg-tertiary border theme-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 theme-text">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">${state.language==='ar' ? 'خط الطول' : 'Longitude'}</label>
                            <input type="number" id="locationLng" placeholder="55.2708" step="any" class="w-full theme-bg-tertiary border theme-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 theme-text">
                        </div>
                    </div>
                </div>
                <div class="border-t theme-border pt-4">
                    <label class="block text-sm font-medium mb-1">${state.language==='ar' ? 'طريقة حساب أوقات الصلاة' : 'Prayer Calculation Method'}</label>
                    <select id="prayerMethodSelect" class="w-full theme-bg-tertiary border theme-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 theme-text">
                        <option value="1">Muslim World League (MWL)</option>
                        <option value="2">ISNA — North America</option>
                        <option value="3">Egyptian General Authority</option>
                        <option value="4" selected>Umm al-Qura — Makkah (recommended)</option>
                        <option value="5">University of Islamic Sciences, Karachi</option>
                        <option value="7">Institute of Geophysics, Tehran</option>
                        <option value="8">Gulf Region</option>
                        <option value="9">Kuwait</option>
                        <option value="10">Qatar</option>
                        <option value="11">Majlis Ugama Islam Singapura</option>
                        <option value="12">Union Organization Islamic de France</option>
                        <option value="13">Diyanet İşleri Başkanlığı, Turkey</option>
                        <option value="15">Spiritual Administration of Muslims of Russia</option>
                    </select>
                    <p class="text-xs theme-text-secondary mt-1">${state.language==='ar' ? 'يؤثر على حساب زوايا الفجر والعشاء' : 'This affects Fajr and Isha calculation angles'}</p>
                </div>
                <div class="flex items-center justify-end space-x-3 pt-4 border-t theme-border">
                    <button onclick="closeLocationSettings()" class="px-4 py-2 text-sm font-medium theme-text-secondary hover:theme-bg-tertiary rounded-lg transition-colors">${t('cancel')}</button>
                    <button onclick="saveLocationSettings()" class="px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-lg transition-colors">${state.language==='ar' ? 'حفظ الموقع' : 'Save Location'}</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) closeLocationSettings(); });
    showEl('locationModal');
}

async function autoDetectLocation() {
    const btn = document.getElementById('autoDetectBtn');
    const status = document.getElementById('detectStatus');
    const latInput = document.getElementById('locationLat');
    const lngInput = document.getElementById('locationLng');
    btn.disabled = true; btn.classList.add('opacity-50');
    status.classList.remove('hidden'); status.textContent = 'Detecting your location...';
    try {
        const location = await detectUserLocation();
        if (latInput) latInput.value = location.lat.toFixed(4);
        if (lngInput) lngInput.value = location.lng.toFixed(4);
        status.textContent = 'Location detected! Saving...';
        status.classList.add('text-green-600');
        setTimeout(() => saveLocationSettings(), 800);
    } catch (error) {
        status.textContent = 'Detection failed. Please enter manually.';
        status.classList.add('text-red-600');
        btn.disabled = false; btn.classList.remove('opacity-50');
    }
}

async function initLocation() {
    const saved = loadFromStorage(STORAGE_KEYS.LOCATION(state.currentUser));
    if (!saved) {
        try {
            const location = await detectUserLocation();
            state.userLocation = location;
            saveLocation();
        } catch (e) { /* user will set manually */ }
    }
}

function closeLocationSettings() { hideEl('locationModal'); }

function saveLocationSettings() {
    const city = document.getElementById('locationCity')?.value?.trim();
    const country = document.getElementById('locationCountry')?.value?.trim();
    const lat = document.getElementById('locationLat')?.value;
    const lng = document.getElementById('locationLng')?.value;
    if (!city && !country && (!lat || !lng)) {
        alert('Please enter either city/country or coordinates'); return;
    }
    const methodEl = document.getElementById('prayerMethodSelect');
    state.prayerMethod = methodEl ? parseInt(methodEl.value) : 4;
    state.userLocation = { city: city || null, country: country || null, lat: lat ? parseFloat(lat) : null, lng: lng ? parseFloat(lng) : null };
    // Clear prayer cache so fresh times load with new method
    state.prayerTimesCache = {};
    saveLocation();
    closeLocationSettings();
    alert('Location saved! Prayer times will now be available when creating events.');
}

