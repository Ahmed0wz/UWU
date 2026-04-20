// WIDGET DATA MODULE
// Pushes today's data to the Android home screen widget via WidgetPlugin.
// Called after any data change (events, tasks, prayer times).
// ══════════════════════════════════════════════════════════════════════════

function _getWidgetPlugin() {
    return window.Capacitor?.Plugins?.WidgetPlugin || null;
}

async function updateWidgetData() {
    const WP = _getWidgetPlugin();
    if (!WP) return;   // not running as native app

    try {
        const today = todayLocalString();

        // Use getEventsForDate to include repeated/virtual events
        const allTodayEvents = getEventsForDate(today)
            .filter(e => state.activeCalendars.includes(e.calendar));

        const todayEvents = allTodayEvents
            .filter(e => !e.isAllDay)
            .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''))
            .slice(0, 8)
            .map(e => ({
                title:     e.title,
                startTime: e.startTime || '',
                endTime:   e.endTime   || '',
                color:     e.color || 'blue',
            }));

        // Today's all-day events
        const allDayEvents = allTodayEvents
            .filter(e => e.isAllDay)
            .slice(0, 3)
            .map(e => ({ title: e.title, color: e.color || 'blue' }));

        // Gather tasks from all periods
        const weekKey  = getWeekKey(today);
        const monthKey = getMonthKey(today);
        const yearKey  = getYearKey(today);

        const dayTasks   = (state.tasks?.day?.[today])       || [];
        const weekTasks  = (state.tasks?.week?.[weekKey])    || [];
        const monthTasks = (state.tasks?.month?.[monthKey])  || [];
        const yearTasks  = (state.tasks?.year?.[yearKey])    || [];

        const allTasks   = [
            ...dayTasks.map(t   => ({...t, period: 'Day'})),
            ...weekTasks.map(t  => ({...t, period: 'Week'})),
            ...monthTasks.map(t => ({...t, period: 'Month'})),
            ...yearTasks.map(t  => ({...t, period: 'Year'})),
        ];
        const tasksDone  = allTasks.filter(t => t.completed).length;
        const tasksTotal = allTasks.length;

        // Prayer times (from state if loaded)
        let prayerTimes = null;
        if (state.prayerTimesForDate) {
            const pt = state.prayerTimesForDate;
            prayerTimes = {
                Fajr:    pt.Fajr    || '',
                Dhuhr:   pt.Dhuhr   || '',
                Asr:     pt.Asr     || '',
                Maghrib: pt.Maghrib || '',
                Isha:    pt.Isha    || '',
            };
        }

        // Hijri date from the label if visible
        const hijriLabel = document.getElementById('eventDateHijriLabel');
        const hijriDate  = hijriLabel?.textContent?.trim() || '';

        // Formatted date display
        const dateObj     = new Date(today + 'T12:00:00');
        const dateDisplay = dateObj.toLocaleDateString(
            state.language === 'ar' ? 'ar-SA' : 'en-US',
            { weekday: 'long', month: 'short', day: 'numeric' }
        );

        // Task list for widget — all periods, include points and period label
        const taskListForWidget = allTasks
            .map((t, i) => ({
                title:     t.name || t.title || '',
                completed: !!t.completed,
                points:    t.points || 0,
                period:    t.period || 'Day',
                index:     i,
            }));

        // Journal data for widget
        const todayJournal = state.journalEntries?.[today];
        const journalTitle   = todayJournal?.title   || '';
        const journalContent = todayJournal?.content || '';
        const journalScore   = todayJournal?.score   || 0;

        // Journal streak — count consecutive days with entries going back from today
        let journalStreak = 0;
        const checkDate = new Date(today + 'T12:00:00');
        for (let i = 0; i < 365; i++) {
            const ds = dateToLocalString(checkDate);
            const entry = state.journalEntries?.[ds];
            if (entry && (entry.content || entry.title)) {
                journalStreak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else {
                break;
            }
        }

        // Score data
        const scoreDay     = calcDayTotal(today);
        const scoreWeek    = getWeekTotal(today);
        const scoreMonth   = calcMonthTotal(today);
        const scoreYear    = calcYearTotal();
        const scoreAllTime = calcAllTimeTotal();

        // Variables list for score widget
        const variablesList = Object.entries(state.variables || {})
            .map(([name, value]) => ({ name, value: String(value) }));

        const payload = {
            language:    state.language || 'en',
            dateDisplay,
            hijriDate,
            events:      todayEvents,
            allDayEvents,
            tasksTotal,
            tasksDone,
            taskList:    taskListForWidget,
            prayerTimes,
            journalTitle,
            journalContent,
            journalScore,
            journalStreak,
            scoreDay,
            scoreWeek,
            scoreMonth,
            scoreYear,
            scoreAllTime,
            variables:   variablesList,
        };

        await WP.updateData({ data: JSON.stringify(payload) });
    } catch(e) {
        console.warn('[Widget] updateWidgetData failed:', e);
    }
}

// ─── Widget debug helper — call widgetDebug() in console ─────────────
async function widgetDebug() {
    const WP = _getWidgetPlugin();
    const lines = [];
    lines.push('=== Widget Debug ===');
    lines.push('Capacitor detected: ' + _isCapacitor());
    lines.push('WidgetPlugin found: ' + (WP ? 'YES' : 'NO'));

    const today = todayLocalString();
    lines.push('Today: ' + today);

    const todayTasks = (state.tasks?.day?.[today]) || [];
    lines.push('Tasks today: ' + todayTasks.length);
    todayTasks.forEach((t,i) => lines.push('  task' + i + ': ' + JSON.stringify(t)));

    const todayEvents = (events || []).filter(e => e.date === today);
    lines.push('Events today: ' + todayEvents.length);

    lines.push('state.tasks keys: ' + Object.keys(state.tasks || {}));
    const dayKeys = Object.keys(state.tasks?.day || {});
    lines.push('state.tasks.day keys: ' + dayKeys.join(', '));

    // Try to push data right now
    if (WP) {
        try {
            await updateWidgetData();
            lines.push('updateWidgetData() called OK');
        } catch(e) {
            lines.push('updateWidgetData() ERROR: ' + e.message);
        }
    }

    const out = lines.join('\n');
    console.log(out);
    alert(out);
}
window.widgetDebug = widgetDebug;

// ══════════════════════════════════════════════════════════════════════════
// FIREBASE SYNC MODULE
// localStorage is always primary — the app works 100% offline.
// Firebase is a background sync layer. All reads still come from
// localStorage; writes go to localStorage first, then Firebase.
// Conflict resolution: last-write-wins per document.
// ══════════════════════════════════════════════════════════════════════════

let _db              = null;
let _syncListeners   = {};   // { userName: { events: unsub, journal: unsub, ... } }
let _syncDebounceTimer = null;
let _syncInitialized = false;

// The four Firestore documents per user account
const _SYNC_DOCS = ['events', 'journal', 'tasks', 'meta'];

// ─── AES-GCM Encryption (Level-2 privacy) ─────────────────────────────────
// Key is derived from the user's sync code via PBKDF2.
// Google (and anyone reading Firestore) sees only ciphertext.
// Fixed salt is public knowledge — security comes entirely from
// the sync code being secret, not from the salt.

const _CRYPTO_SALT = new TextEncoder().encode('uwu-calendar-v1-salt');
let   _cryptoKey   = null;   // cached CryptoKey; re-derived on connect

async function _deriveCryptoKey(syncCode) {
    const rawKey = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(syncCode),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
    );
    _cryptoKey = await crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt: _CRYPTO_SALT, iterations: 200_000, hash: 'SHA-256' },
        rawKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
    );
}

async function _encrypt(obj) {
    const iv         = crypto.getRandomValues(new Uint8Array(12));
    const plaintext  = new TextEncoder().encode(JSON.stringify(obj));
    const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, _cryptoKey, plaintext);
    // Store as base64 strings so Firestore can hold them
    const toB64 = buf => btoa(String.fromCharCode(...new Uint8Array(buf)));
    return { _enc: 1, iv: toB64(iv), ct: toB64(ciphertext) };
}

async function _decrypt(doc) {
    if (!doc._enc) return doc;           // legacy unencrypted doc — pass through
    const fromB64 = b64 => Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    const plain = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: fromB64(doc.iv) },
        _cryptoKey,
        fromB64(doc.ct)
    );
    return JSON.parse(new TextDecoder().decode(plain));
}

// ─── Helpers ──────────────────────────────────────────────────────────────

function _syncKey(base)         { return base + '_' + (state.currentUser || 'default'); }
function _getSyncConfig()       { return loadFromStorage(_syncKey(STORAGE_KEYS.SYNC_CONFIG)); }
function _saveSyncConfig(cfg)   { saveToStorage(_syncKey(STORAGE_KEYS.SYNC_CONFIG), cfg); }
function _getSyncMeta()         { return loadFromStorage(_syncKey(STORAGE_KEYS.SYNC_META)) || {}; }
function _saveSyncMeta(m)       { saveToStorage(_syncKey(STORAGE_KEYS.SYNC_META), m); }

function getSyncStatus()        { return loadFromStorage(_syncKey(STORAGE_KEYS.SYNC_STATUS)) || 'disconnected'; }
function _setSyncStatus(s) {
    saveToStorage(_syncKey(STORAGE_KEYS.SYNC_STATUS), s);
    const dot = document.getElementById('syncStatusDot');
    if (dot) dot.className = 'w-2 h-2 rounded-full ' + (
        s === 'connected' ? 'bg-green-500' :
        s === 'syncing'   ? 'bg-yellow-500 animate-pulse' :
        s === 'error'     ? 'bg-red-500' : 'bg-gray-400'
    );
    const lbl = document.getElementById('syncStatusLabel');
    if (lbl) {
        const AR = state.language === 'ar';
        lbl.textContent = s === 'connected' ? (AR ? 'متصل'          : 'Connected')     :
                          s === 'syncing'   ? (AR ? 'يتزامن…'        : 'Syncing…')      :
                          s === 'error'     ? (AR ? 'خطأ في الاتصال' : 'Sync error')    :
                                              (AR ? 'غير متصل'       : 'Not connected');
    }
}

function isSyncEnabled() {
    const cfg = _getSyncConfig();
    return !!(cfg?.apiKey && cfg?.projectId && cfg?.syncCode && cfg?.gateCode && _syncInitialized && _db);
}

// Firestore path: /sync/{gateCode}/users/{userName}/data/{docName}
function _docRef(gateCode, userName, docName) {
    return _db
        .collection('sync').doc(gateCode)
        .collection('users').doc(userName)
        .collection('data').doc(docName);
}

// ─── Build payloads from localStorage ─────────────────────────────────────

function _buildPayload(user, docName) {
    if (docName === 'events') {
        return { data: loadFromStorage(STORAGE_KEYS.EVENTS(user)) || [] };
    }
    if (docName === 'journal') {
        return { data: loadFromStorage(STORAGE_KEYS.JOURNAL(user)) || {} };
    }
    if (docName === 'tasks') {
        return { data: loadFromStorage(STORAGE_KEYS.TASKS(user)) || { day:{}, week:{}, month:{}, year:{} } };
    }
    if (docName === 'meta') {
        return {
            calendars:        loadFromStorage(STORAGE_KEYS.CALENDARS(user)) || [],
            activeCalendars:  loadFromStorage(STORAGE_KEYS.CALENDARS(user) + '_active') || [],
            variables:        loadFromStorage(STORAGE_KEYS.VARIABLES(user)) || {},
            forgottenTasks:   loadFromStorage(STORAGE_KEYS.FORGOTTEN(user)) || [],
            hijriOffsets:     loadFromStorage(STORAGE_KEYS.HIJRI_OFFSETS(user)) || {},
            location:         loadFromStorage(STORAGE_KEYS.LOCATION(user)) || null,
            calendarMode:     loadFromStorage(STORAGE_KEYS.CALENDAR_MODE(user)) || 'gregorian',
            renderWindow:     loadFromStorage(STORAGE_KEYS.RENDER_WINDOW(user)) || 31,
            showPrayerTimes:  loadFromStorage(STORAGE_KEYS.SHOW_PRAYER_TIMES(user)) || false,
        };
    }
    return {};
}

// ─── Apply remote data to localStorage ────────────────────────────────────

function _applyRemote(user, docName, remote) {
    if (docName === 'events') {
        const local = loadFromStorage(STORAGE_KEYS.EVENTS(user)) || [];
        saveToStorage(STORAGE_KEYS.EVENTS(user), _mergeEvents(local, remote.data || []));
    } else if (docName === 'journal') {
        const local = loadFromStorage(STORAGE_KEYS.JOURNAL(user)) || {};
        saveToStorage(STORAGE_KEYS.JOURNAL(user), { ...local, ...(remote.data || {}) });
    } else if (docName === 'tasks') {
        const L = loadFromStorage(STORAGE_KEYS.TASKS(user)) || { day:{}, week:{}, month:{}, year:{} };
        const R = remote.data || { day:{}, week:{}, month:{}, year:{} };
        saveToStorage(STORAGE_KEYS.TASKS(user), {
            day:   { ...L.day,   ...R.day },
            week:  { ...L.week,  ...R.week },
            month: { ...L.month, ...R.month },
            year:  { ...L.year,  ...R.year },
        });
    } else if (docName === 'meta') {
        // Only overwrite fields that are present in remote
        const fields = [
            ['calendars',       STORAGE_KEYS.CALENDARS(user)],
            ['activeCalendars', STORAGE_KEYS.CALENDARS(user) + '_active'],
            ['variables',       STORAGE_KEYS.VARIABLES(user)],
            ['forgottenTasks',  STORAGE_KEYS.FORGOTTEN(user)],
            ['hijriOffsets',    STORAGE_KEYS.HIJRI_OFFSETS(user)],
            ['location',        STORAGE_KEYS.LOCATION(user)],
            ['calendarMode',    STORAGE_KEYS.CALENDAR_MODE(user)],
            ['renderWindow',    STORAGE_KEYS.RENDER_WINDOW(user)],
            ['showPrayerTimes', STORAGE_KEYS.SHOW_PRAYER_TIMES(user)],
        ];
        fields.forEach(([key, storageKey]) => {
            if (remote[key] !== undefined) saveToStorage(storageKey, remote[key]);
        });
    }
}

// Merge event arrays by ID (union; remote wins on conflict)
function _mergeEvents(local, remote) {
    const map = {};
    local.forEach(ev  => { if (ev?.id) map[ev.id] = ev; });
    remote.forEach(ev => { if (ev?.id) map[ev.id] = ev; }); // remote overwrites
    return Object.values(map);
}

// ─── Push ─────────────────────────────────────────────────────────────────

async function pushUserData(user) {
    if (!isSyncEnabled()) return;
    const cfg = _getSyncConfig();
    _setSyncStatus('syncing');
    try {
        const now = Date.now();
        const deviceTag = navigator.userAgent.slice(0, 80);
        for (const docName of _SYNC_DOCS) {
            const payload  = _buildPayload(user, docName);
            const envelope = await _encrypt({ ...payload, _syncedAt: now, _device: deviceTag });
            await _docRef(cfg.gateCode, user, docName).set(envelope);
        }
        const meta = _getSyncMeta();
        if (!meta[user]) meta[user] = {};
        meta[user]._lastPush = now;
        _saveSyncMeta(meta);
        _setSyncStatus('connected');
    } catch (e) {
        console.error('[Sync] Push error:', e);
        _setSyncStatus('error');
    }
}

// ─── Pull ─────────────────────────────────────────────────────────────────

async function pullAndMerge(user) {
    if (!isSyncEnabled()) return;
    const cfg = _getSyncConfig();
    _setSyncStatus('syncing');
    let changed = false;
    try {
        for (const docName of _SYNC_DOCS) {
            const snap = await _docRef(cfg.gateCode, user, docName).get();
            if (!snap.exists) continue;
            const raw    = snap.data();
            const remote = await _decrypt(raw);
            const remoteSyncedAt = remote._syncedAt || 0;
            const localMeta = _getSyncMeta();
            const lastPull  = localMeta[user]?.[docName + '_pull'] || 0;
            if (remoteSyncedAt <= lastPull) continue; // already have this version
            _applyRemote(user, docName, remote);
            const m = _getSyncMeta();
            if (!m[user]) m[user] = {};
            m[user][docName + '_pull'] = Date.now();
            _saveSyncMeta(m);
            changed = true;
        }
        _setSyncStatus('connected');
    } catch (e) {
        console.error('[Sync] Pull error:', e);
        _setSyncStatus('error');
    }
    if (changed && user === state.currentUser) {
        loadAllData();
        renderCurrentView();
        renderMiniCalendar();
    }
}

// ─── Real-time listeners ───────────────────────────────────────────────────

function startRealtimeListeners(user) {
    if (!isSyncEnabled()) return;
    stopRealtimeListeners(user);
    const cfg = _getSyncConfig();
    const unsubs = {};
    _SYNC_DOCS.forEach(docName => {
        try {
            unsubs[docName] = _docRef(cfg.gateCode, user, docName).onSnapshot(async snap => {
                // hasPendingWrites = true means this is our own write echoing back — skip
                if (!snap.exists || snap.metadata.hasPendingWrites) return;
                const raw = snap.data();
                if (!raw) return;
                let remote;
                try { remote = await _decrypt(raw); } catch(e) { console.warn('[Sync] Decrypt failed:', e); return; }
                const remoteSyncedAt = remote._syncedAt || 0;
                const meta      = _getSyncMeta();
                const lastPull  = meta[user]?.[docName + '_pull'] || 0;
                if (remoteSyncedAt <= lastPull) return;
                _applyRemote(user, docName, remote);
                const m = _getSyncMeta();
                if (!m[user]) m[user] = {};
                m[user][docName + '_pull'] = Date.now();
                _saveSyncMeta(m);
                if (user === state.currentUser) {
                    loadAllData();
                    renderCurrentView();
                    renderMiniCalendar();
                    _setSyncStatus('connected');
                }
            }, err => console.warn('[Sync] Listener error:', err));
        } catch (e) {
            console.warn('[Sync] Could not start listener for', docName, e);
        }
    });
    _syncListeners[user] = unsubs;
}

function stopRealtimeListeners(user) {
    if (_syncListeners[user]) {
        Object.values(_syncListeners[user]).forEach(u => { try { u(); } catch(e) {} });
        delete _syncListeners[user];
    }
}

// ─── Debounce ─────────────────────────────────────────────────────────────

function syncDebounce(user) {
    if (!isSyncEnabled()) return;
    if (_syncDebounceTimer) clearTimeout(_syncDebounceTimer);
    _syncDebounceTimer = setTimeout(() => pushUserData(user || state.currentUser), 2500);
}

// ─── Init ─────────────────────────────────────────────────────────────────

async function initSync() {
    if (typeof firebase === 'undefined') return; // SDK not loaded — graceful no-op
    const cfg = _getSyncConfig();
    if (!cfg?.apiKey || !cfg?.projectId || !cfg?.syncCode || !cfg?.gateCode) return;
    // Always re-derive key on page load
    await _deriveCryptoKey(cfg.syncCode);
    try {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey:            cfg.apiKey,
                projectId:         cfg.projectId,
                authDomain:        cfg.projectId + '.firebaseapp.com',
                storageBucket:     cfg.projectId + '.appspot.com',
                messagingSenderId: cfg.messagingSenderId || '',
                appId:             cfg.appId || '',
            });
        }
        _db = firebase.firestore();
        _syncInitialized = true;
        _setSyncStatus('connected');
        await pullAndMerge(state.currentUser);
        await pushUserData(state.currentUser);   // upload local data so other devices get it
        startRealtimeListeners(state.currentUser);
    } catch (e) {
        console.error('[Sync] Init error:', e);
        _setSyncStatus('error');
    }
}

async function connectSync(apiKey, projectId, syncCode, gateCode) {
    _saveSyncConfig({ apiKey, projectId, syncCode, gateCode });
    // Derive encryption key from sync code only
    await _deriveCryptoKey(syncCode);
    // Teardown any existing connection
    _syncInitialized = false;
    _db = null;
    Object.keys(_syncListeners).forEach(u => stopRealtimeListeners(u));
    if (firebase.apps.length) {
        // Firebase doesn't let you re-init cleanly in compat mode,
        // so reuse the existing app but swap the db reference
        firebase.app().options.apiKey !== apiKey
            ? console.warn('[Sync] API key changed — reload may be needed')
            : null;
    }
    await initSync();
    if (!isSyncEnabled()) throw new Error('Init failed after config save');
}

async function disconnectSync() {
    Object.keys(_syncListeners).forEach(u => stopRealtimeListeners(u));
    _syncInitialized = false;
    _db = null;
    _saveSyncConfig(null);
    saveToStorage(_syncKey(STORAGE_KEYS.SYNC_META), null);
    _setSyncStatus('disconnected');
}

// ─── Sync Modal UI ────────────────────────────────────────────────────────

function openSyncModal() {
    document.getElementById('syncModal')?.remove();
    const cfg         = _getSyncConfig();
    const connected   = isSyncEnabled();
    const AR          = state.language === 'ar';

    const modal = document.createElement('div');
    modal.id = 'syncModal';
    modal.className = 'fixed inset-0 modal-backdrop flex items-center justify-center z-[200] px-4';

    modal.innerHTML = `
    <div class="theme-bg rounded-2xl shadow-2xl w-full max-w-md modal-animate border theme-border flex flex-col max-h-[85vh]">
        <div class="px-5 py-4 border-b theme-border flex items-center justify-between shrink-0">
            <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>
                <h2 class="font-semibold">${AR ? 'مزامنة البيانات' : 'Data Sync'}</h2>
            </div>
            <button onclick="document.getElementById('syncModal').remove()" class="theme-text-secondary hover:theme-text p-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
        </div>

        <div class="p-5 space-y-4 overflow-y-auto flex-1">
        ${connected ? `
            <!-- ── Connected state ── -->
            <div class="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <div class="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0"></div>
                <div class="flex-1 text-sm text-green-800 dark:text-green-300 font-medium">${AR ? 'المزامنة نشطة' : 'Sync is active'}</div>
            </div>
            <div class="theme-bg-tertiary rounded-xl p-4 space-y-1.5 text-sm">
                <div class="flex justify-between">
                    <span class="theme-text-secondary">${AR ? 'رمز البوابة' : 'Gate code'}</span>
                    <span class="font-mono font-medium" dir="ltr">${cfg?.gateCode}</span>
                </div>
                <div class="flex justify-between">
                    <span class="theme-text-secondary">${AR ? 'رمز المزامنة' : 'Sync code'}</span>
                    <span class="font-mono font-medium" dir="ltr">${cfg?.syncCode}</span>
                </div>
                <div class="flex justify-between">
                    <span class="theme-text-secondary">${AR ? 'المشروع' : 'Project'}</span>
                    <span class="font-mono text-xs theme-text-secondary" dir="ltr">${cfg?.projectId}</span>
                </div>
                <div class="flex justify-between pt-1 border-t theme-border">
                    <span class="theme-text-secondary">${AR ? 'التشفير' : 'Encryption'}</span>
                    <span class="flex items-center gap-1.5 text-green-600 dark:text-green-400 font-medium">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                        AES-256-GCM
                    </span>
                </div>
            </div>
            <p class="text-xs theme-text-secondary leading-relaxed">
                ${AR ? 'البيانات تتزامن تلقائياً عند كل تغيير. يمكنك المزامنة اليدوية أدناه.' : 'Data syncs automatically on every change. You can also force a manual sync below.'}
            </p>
            <button onclick="syncNow()" class="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                ${AR ? 'مزامنة الآن' : 'Sync Now'}
            </button>
            <button onclick="disconnectSync().then(()=>{ document.getElementById('syncModal')?.remove(); openSyncModal(); })"
                class="w-full py-2 rounded-xl border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                ${AR ? 'قطع الاتصال' : 'Disconnect'}
            </button>

        ` : `
            <!-- ── Setup state ── -->
            <p class="text-sm theme-text-secondary leading-relaxed">
                ${AR
                    ? 'المزامنة تتيح مشاركة بياناتك (الأحداث، المهام، اليومية) بين أجهزة متعددة في الوقت الفعلي.'
                    : 'Sync shares your data (events, tasks, journal) across devices in real time. Requires a free Firebase project.'}
            </p>

            <!-- Setup instructions -->
            <div class="theme-bg-tertiary rounded-xl p-4 space-y-2.5">
                <p class="text-xs font-semibold theme-text mb-1">${AR ? 'الإعداد (مرة واحدة فقط):' : 'One-time setup:'}</p>
                <div class="flex gap-2.5 text-xs theme-text-secondary">
                    <span class="text-blue-500 font-bold shrink-0">1</span>
                    <span>${AR ? 'افتح' : 'Open'} <a href="https://console.firebase.google.com" target="_blank" rel="noopener" class="text-blue-500 underline">console.firebase.google.com</a></span>
                </div>
                <div class="flex gap-2.5 text-xs theme-text-secondary">
                    <span class="text-blue-500 font-bold shrink-0">2</span>
                    <span>${AR ? 'أنشئ مشروعاً → أضف تطبيق ويب &lt;/&gt; → انسخ apiKey و projectId' : 'Create project → Add Web app &lt;/&gt; → copy apiKey & projectId'}</span>
                </div>
                <div class="flex gap-2.5 text-xs theme-text-secondary">
                    <span class="text-blue-500 font-bold shrink-0">3</span>
                    <span>${AR ? 'فعّل Firestore Database بوضع Test Mode' : 'Enable Firestore Database → start in Test Mode'}</span>
                </div>
                <div class="flex gap-2.5 text-xs theme-text-secondary">
                    <span class="text-blue-500 font-bold shrink-0">4</span>
                    <span>${AR ? 'أدخل رمز البوابة ورمز المزامنة أدناه — استخدمهما على كل أجهزتك' : 'Enter both codes below and use the same codes on all your devices'}</span>
                </div>
            </div>

            <!-- Input fields -->
            <div class="space-y-3">
                <div>
                    <label class="block text-xs font-medium theme-text-secondary mb-1">API Key</label>
                    <input id="syncApiKey" type="text" value="${cfg?.apiKey || ''}"
                        placeholder="AIzaSy…" dir="ltr" autocomplete="off" autocorrect="off" spellcheck="false"
                        class="w-full theme-bg-tertiary border theme-border rounded-xl px-3 py-2.5 text-sm theme-text focus:ring-2 focus:ring-blue-500 font-mono">
                </div>
                <div>
                    <label class="block text-xs font-medium theme-text-secondary mb-1">Project ID</label>
                    <input id="syncProjectId" type="text" value="${cfg?.projectId || ''}"
                        placeholder="my-project-abc123" dir="ltr" autocomplete="off" autocorrect="off" spellcheck="false"
                        class="w-full theme-bg-tertiary border theme-border rounded-xl px-3 py-2.5 text-sm theme-text focus:ring-2 focus:ring-blue-500 font-mono">
                </div>
                <div>
                    <label class="block text-xs font-medium theme-text-secondary mb-1">
                        ${AR ? 'رمز البوابة' : 'Gate Code'}
                        <span class="font-normal opacity-60 ml-1">${AR ? '(مسار Firestore)' : '(Firestore path lock)'}</span>
                    </label>
                    <input id="gateCodeInput" type="text" value="${cfg?.gateCode || ''}"
                        placeholder="${AR ? 'مثال: my-secret-gate' : 'e.g. my-secret-gate'}" dir="ltr"
                        class="w-full theme-bg-tertiary border theme-border rounded-xl px-3 py-2.5 text-sm theme-text focus:ring-2 focus:ring-blue-500">
                    <p class="text-xs theme-text-secondary mt-1.5 leading-relaxed">
                        ${AR ? 'يُستخدم كمسار في Firestore. ضعه في قواعد Firestore لمنع وصول غير المصرح لهم.' : 'Used as the Firestore path. Put this in your Firestore rules to block unauthorised access.'}
                    </p>
                </div>
                <div>
                    <label class="block text-xs font-medium theme-text-secondary mb-1">
                        ${AR ? 'رمز المزامنة' : 'Sync Code'}
                        <span class="font-normal opacity-60 ml-1">${AR ? '(مفتاح التشفير)' : '(encryption key)'}</span>
                    </label>
                    <input id="syncCodeInput" type="text" value="${cfg?.syncCode || ''}"
                        placeholder="${AR ? 'مثال: ahmed-cal-2025' : 'e.g. ahmed-cal-2025'}" dir="ltr"
                        class="w-full theme-bg-tertiary border theme-border rounded-xl px-3 py-2.5 text-sm theme-text focus:ring-2 focus:ring-blue-500">
                    <p class="text-xs theme-text-secondary mt-1.5 leading-relaxed">
                        ${AR ? 'يُستخدم لتشفير البيانات. حتى لو وصل أحد لـ Firestore يرى نصاً مشفراً فقط.' : 'Used to encrypt your data. Even with Firestore access, all anyone sees is ciphertext.'}
                    </p>
                </div>
            </div>

            <div id="syncConnectError" class="hidden text-sm text-red-500 px-1 py-2 bg-red-50 dark:bg-red-900/20 rounded-lg"></div>

            <button onclick="handleConnectSync()"
                class="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                ${AR ? 'اتصال' : 'Connect'}
            </button>
        `}
        </div>
    </div>`;

    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
}

async function handleConnectSync() {
    const apiKey    = document.getElementById('syncApiKey')?.value?.trim();
    const projectId = document.getElementById('syncProjectId')?.value?.trim();
    const gateCode  = document.getElementById('gateCodeInput')?.value?.trim();
    const syncCode  = document.getElementById('syncCodeInput')?.value?.trim();
    const errEl     = document.getElementById('syncConnectError');
    const AR        = state.language === 'ar';

    const showErr = msg => {
        if (errEl) { errEl.textContent = msg; errEl.classList.remove('hidden'); }
    };

    if (!apiKey)    return showErr(AR ? 'يرجى إدخال API Key.'                         : 'Please enter your API Key.');
    if (!projectId) return showErr(AR ? 'يرجى إدخال Project ID.'                      : 'Please enter your Project ID.');
    if (!gateCode)  return showErr(AR ? 'يرجى إدخال رمز البوابة.'                     : 'Please enter a gate code.');
    if (gateCode.length < 6)  return showErr(AR ? 'رمز البوابة يجب أن يكون 6 أحرف على الأقل.'  : 'Gate code must be at least 6 characters.');
    if (!syncCode)  return showErr(AR ? 'يرجى إدخال رمز المزامنة.'                    : 'Please enter a sync code.');
    if (syncCode.length < 6)  return showErr(AR ? 'رمز المزامنة يجب أن يكون 6 أحرف على الأقل.' : 'Sync code must be at least 6 characters.');
    if (gateCode === syncCode) return showErr(AR ? 'يجب أن يكون الرمزان مختلفَين.'    : 'Gate code and sync code must be different.');

    const btn = document.querySelector('#syncModal button[onclick="handleConnectSync()"]');
    if (btn) { btn.disabled = true; btn.textContent = AR ? 'جارٍ الاتصال…' : 'Connecting…'; }
    if (errEl) errEl.classList.add('hidden');

    try {
        await connectSync(apiKey, projectId, syncCode, gateCode);
        document.getElementById('syncModal')?.remove();
        const toast = document.createElement('div');
        toast.className = 'fixed top-20 left-1/2 -translate-x-1/2 bg-green-600 text-white text-sm font-medium px-5 py-3 rounded-full shadow-xl z-[400] flex items-center gap-2 pointer-events-none';
        toast.innerHTML = `<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg><span>${AR ? 'تم الاتصال بالمزامنة ✓' : 'Sync connected ✓'}</span>`;
        document.body.appendChild(toast);
        setTimeout(() => { toast.style.transition='opacity 0.4s'; toast.style.opacity='0'; setTimeout(()=>toast.remove(),400); }, 3000);
    } catch (e) {
        const msg = e?.message?.includes('invalid') || e?.code === 'auth/invalid-api-key'
            ? (AR ? 'API Key غير صحيح.' : 'Invalid API Key.')
            : (AR ? 'فشل الاتصال. تحقق من البيانات وأن Firestore مفعّل.' : 'Connection failed. Check your credentials and that Firestore is enabled.');
        showErr(msg);
        if (btn) { btn.disabled = false; btn.textContent = AR ? 'اتصال' : 'Connect'; }
    }
}

async function syncNow() {
    if (!isSyncEnabled()) { openSyncModal(); return; }
    document.getElementById('syncModal')?.remove();
    await pullAndMerge(state.currentUser);
    await pushUserData(state.currentUser);
    const AR = state.language === 'ar';
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium px-5 py-3 rounded-full shadow-xl z-[400] pointer-events-none';
    toast.textContent = AR ? '✓ تمت المزامنة' : '✓ Synced';
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.transition='opacity 0.4s'; toast.style.opacity='0'; setTimeout(()=>toast.remove(),400); }, 2000);
}


// DOUBLE-BACK TO EXIT (mobile)
let _backPressCount = 0;
let _backPressTimer = null;
let _exitToast = null;

function showExitToast() {
    if (_exitToast) _exitToast.remove();
    _exitToast = document.createElement('div');
    _exitToast.textContent = 'Press back again to exit';
    _exitToast.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.75);color:#fff;padding:10px 20px;border-radius:24px;font-size:14px;z-index:9999;pointer-events:none;transition:opacity 0.3s';
    document.body.appendChild(_exitToast);
    setTimeout(() => { if (_exitToast) { _exitToast.style.opacity = '0'; setTimeout(() => _exitToast?.remove(), 300); _exitToast = null; } }, 2000);
}

// Push a dummy history state so we can intercept popstate (back button)
function handleAndroidBack() {
    // Close the topmost open item only — one per back press, highest z-index first

    // Sub-popups (highest layer)
    if (document.getElementById('customRepeatSheet') && !document.getElementById('customRepeatSheet').classList.contains('hidden')) { closeCustomRepeatSheet(); return true; }
    if (document.getElementById('pickerPopup'))           { document.getElementById('pickerPopup').remove(); return true; }

    // Equation type picker
    if (document.getElementById('eqTypePicker'))          { document.getElementById('eqTypePicker').remove(); return true; }

    // Event alarm popup
    if (document.getElementById('eventAlarmPopup'))       { document.getElementById('eventAlarmPopup').remove(); return true; }

    // Alarm edit screen
    if (document.getElementById('alarmEditScreen'))       { document.getElementById('alarmEditScreen').remove(); return true; }

    // Standalone alarms panel
    if (document.getElementById('standaloneAlarmsPanel')) { document.getElementById('standaloneAlarmsPanel').remove(); return true; }

    // Event details modal
    if (document.getElementById('eventDetailsModal'))     { document.getElementById('eventDetailsModal').remove(); return true; }

    // Day sidebar (journal panel)
    if ($('daySidebar')?.classList.contains('hidden') === false) { closeDaySidebar(); return true; }

    // Date jump popover
    if (document.getElementById('dateJumpPopover'))       { document.getElementById('dateJumpPopover').remove(); return true; }

    // Account settings panel
    if (document.getElementById('accountSettingsPanel'))  { closeAccountSettings(); return true; }

    // Theme picker
    if (document.getElementById('themePickerModal'))      { closeThemePicker(); return true; }

    // Dynamic modals (created on demand, removed on close)
    if (document.getElementById('variableSettingsModal')) { closeVariableSettings(); return true; }
    if (document.getElementById('viewAllTasksModal'))     { document.getElementById('viewAllTasksModal').remove(); return true; }
    if (document.getElementById('syncModal'))             { document.getElementById('syncModal').remove(); return true; }
    if (document.getElementById('clearDataModal'))        { closeClearDataModal(); return true; }

    // Static modals (hidden/shown via class)
    if ($('eventModal')?.classList.contains('hidden') === false)          { closeModal(); return true; }
    if ($('editSeriesModal')?.classList.contains('hidden') === false)     { closeEditSeriesModal(); return true; }
    if ($('calendarEditModal')?.classList.contains('hidden') === false)   { closeCalendarEditModal(); return true; }
    if ($('addCalendarModal')?.classList.contains('hidden') === false)    { closeAddCalendarModal(); return true; }
    if ($('addAccountModal')?.classList.contains('hidden') === false)     { closeAddAccountModal(); return true; }
    if ($('deleteAccountModal')?.classList.contains('hidden') === false)  { closeDeleteAccountModal(); return true; }
    if ($('forgottenTasksModal')?.classList.contains('hidden') === false) { closeForgottenTasks(); return true; }
    if ($('renderWindowModal')?.classList.contains('hidden') === false)   { closeRenderWindowSettings(); return true; }
    if ($('locationModal')?.classList.contains('hidden') === false)       { closeLocationSettings(); return true; }
    if ($('backgroundModal')?.classList.contains('hidden') === false)     { closeBackgroundSettings(); return true; }
    if ($('searchModal')?.classList.contains('hidden') === false)         { closeSearchModal(); return true; }

    // Left sidebar (mobile — open when it has mobile-open class)
    if (document.getElementById('mainSidebar')?.classList.contains('mobile-open')) {
        document.getElementById('mainSidebar').classList.remove('mobile-open');
        document.getElementById('sidebarOverlay')?.classList.add('hidden');
        return true;
    }

    // View navigation — day/month → back to 3-day (week) view
    if (state.currentView === 'day' || state.currentView === 'month') {
        switchView('week');
        return true;
    }

    return false; // nothing was open
}

/** Close every overlay/modal/sidebar at once — used by widget deep links */
function closeAllOverlays() {
    // Dynamic elements (remove from DOM)
    ['pickerPopup','eqTypePicker','eventAlarmPopup','alarmEditScreen',
     'standaloneAlarmsPanel','eventDetailsModal','dateJumpPopover',
     'viewAllTasksModal','syncModal'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
    });

    // Panels with dedicated close functions
    if (document.getElementById('customRepeatSheet') && !document.getElementById('customRepeatSheet').classList.contains('hidden')) try { closeCustomRepeatSheet(); } catch(e) {}
    if (document.getElementById('accountSettingsPanel')) try { closeAccountSettings(); } catch(e) {}
    if (document.getElementById('themePickerModal'))     try { closeThemePicker(); } catch(e) {}
    if (document.getElementById('variableSettingsModal'))try { closeVariableSettings(); } catch(e) {}
    if (document.getElementById('clearDataModal'))       try { closeClearDataModal(); } catch(e) {}

    // Day sidebar
    if ($('daySidebar') && !$('daySidebar').classList.contains('hidden')) try { closeDaySidebar(); } catch(e) {}

    // Static modals (hidden/shown via class)
    if ($('eventModal') && !$('eventModal').classList.contains('hidden'))          try { closeModal(); } catch(e) {}
    if ($('editSeriesModal') && !$('editSeriesModal').classList.contains('hidden'))try { closeEditSeriesModal(); } catch(e) {}
    if ($('calendarEditModal') && !$('calendarEditModal').classList.contains('hidden')) try { closeCalendarEditModal(); } catch(e) {}
    if ($('addCalendarModal') && !$('addCalendarModal').classList.contains('hidden'))   try { closeAddCalendarModal(); } catch(e) {}
    if ($('addAccountModal') && !$('addAccountModal').classList.contains('hidden'))     try { closeAddAccountModal(); } catch(e) {}
    if ($('deleteAccountModal') && !$('deleteAccountModal').classList.contains('hidden'))try { closeDeleteAccountModal(); } catch(e) {}
    if ($('forgottenTasksModal') && !$('forgottenTasksModal').classList.contains('hidden')) try { closeForgottenTasks(); } catch(e) {}
    if ($('renderWindowModal') && !$('renderWindowModal').classList.contains('hidden'))     try { closeRenderWindowSettings(); } catch(e) {}
    if ($('locationModal') && !$('locationModal').classList.contains('hidden'))   try { closeLocationSettings(); } catch(e) {}
    if ($('backgroundModal') && !$('backgroundModal').classList.contains('hidden'))try { closeBackgroundSettings(); } catch(e) {}
    if ($('searchModal') && !$('searchModal').classList.contains('hidden'))       try { closeSearchModal(); } catch(e) {}

    // Mobile sidebar
    const sidebar = document.getElementById('mainSidebar');
    if (sidebar && sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
        document.getElementById('sidebarOverlay')?.classList.add('hidden');
    }
}

function initBackHandler() {
    if (_isCapacitor() && window.Capacitor?.Plugins?.App) {
        // Capacitor native: use the App plugin's backButton event
        // This fires BEFORE Java's onBackPressed and can prevent app exit
        window.Capacitor.Plugins.App.addListener('backButton', () => {
            const consumed = handleAndroidBack();
            if (!consumed) {
                // Nothing open — minimize the app (go to background)
                window.Capacitor.Plugins.App.minimizeApp?.();
            }
        });
    } else {
        // Web/PWA fallback: use popstate
        history.pushState({ uwuApp: true }, '');
        window.addEventListener('popstate', function(e) {
            const consumed = handleAndroidBack();
            if (consumed) {
                history.pushState({ uwuApp: true }, '');
                return;
            }
            // No modal open — double-back to exit
            _backPressCount++;
            if (_backPressCount === 1) {
                showExitToast();
                history.pushState({ uwuApp: true }, '');
                if (_backPressTimer) clearTimeout(_backPressTimer);
                _backPressTimer = setTimeout(() => { _backPressCount = 0; }, 2200);
            } else {
                _backPressCount = 0;
                history.back();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    loadUsers();
    loadAllData();
    if (state.language === 'ar') applyLanguage();
    initSync();
    initNotifications();
    setTimeout(updateWidgetData, 2000);

    // Listen for app coming back to foreground — apply any widget +/- score adjustments
    if (_isCapacitor()) {
        document.addEventListener('visibilitychange', async () => {
            if (document.visibilityState !== 'visible') return;
            try {
                const AP = _getAlarmPlugin();
                if (!AP) return;
                const padj = await AP.getPendingScoreAdjustment();
                if (!padj || !padj.adjustment || padj.adjustment === 0) return;
                const todayKey = dateToLocalString(new Date());
                if (!state.journalEntries[todayKey]) {
                    state.journalEntries[todayKey] = { score: 0, title: '', content: '', expression: '0' };
                }
                const currentScore = state.journalEntries[todayKey].score || 0;
                const newScore = Math.max(0, currentScore + padj.adjustment);
                state.journalEntries[todayKey].score      = newScore;
                state.journalEntries[todayKey].expression = String(newScore);
                state.journalEntries[todayKey].timestamp  = Date.now();
                saveJournal();
                updateHeaderScores();
                updateWidgetData();
                renderSidebarContent();
            } catch(e) {}
        });
    }

    await initLocation();
    renderWeekView();
    renderMiniCalendar();
    updateTimeIndicator();
    setInterval(() => { updateTimeIndicator(); if (state.currentView === 'day') updateDayTimeIndicator(); }, 60000);
    setupEventListeners();
    updateHeaderScores();
    initBackHandler(); // double-back to exit on mobile
    updateCalendarModeToggleUI();
    if (state.showPrayerTimesInView) {
        const btn = document.getElementById('prayerViewToggleBtn');
        if (btn) {
            btn.classList.add('bg-blue-50', 'dark:bg-blue-900/20', 'border-blue-500');
            const label = btn.querySelector('span');
            if (label) label.textContent = t('hidePrayerTimes');
        }
        const mobileBtn = document.getElementById('mobilePrayerBtn');
        if (mobileBtn) { mobileBtn.classList.add('text-amber-500'); mobileBtn.style.opacity = '1'; }
    }
});
