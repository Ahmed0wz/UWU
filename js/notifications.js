// ══════════════════════════════════════════════════════════════════════════
// NOTIFICATIONS MODULE
// Two-layer approach:
//   Layer 1 (page-side): setInterval checks every 30s while app is open.
//                        Most reliable — fires even if SW is killed.
//   Layer 2 (SW-side):   On page load, SW is sent all upcoming timers
//                        as a safety net for when app is closed.
// localStorage key: 'uwu_scheduled_notifs' — persists scheduled items.
// ══════════════════════════════════════════════════════════════════════════

const NOTIF_STORAGE_KEY = 'uwu_scheduled_notifs';
let _notifCheckInterval = null;
const _firedNotifs = new Set();

// ─── Detect environment ───────────────────────────────────────────────
function _isCapacitor() {
    return !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
}
function _getLocalNotif() {
    return window.Capacitor?.Plugins?.LocalNotifications || null;
}

function _getScheduled() {
    try { return JSON.parse(localStorage.getItem(NOTIF_STORAGE_KEY) || '[]'); } catch { return []; }
}
function _saveScheduled(arr) {
    localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(arr));
}

async function _postToSW(msg) {
    if (!('serviceWorker' in navigator)) return;
    try {
        const reg = await navigator.serviceWorker.ready;
        let attempts = 0;
        while (!reg.active && attempts++ < 15) {
            await new Promise(r => setTimeout(r, 200));
        }
        if (reg.active) reg.active.postMessage(msg);
    } catch(e) { console.warn('[Notif] SW post failed:', e); }
}

// ─── Native (Capacitor) notification helpers ─────────────────────────

async function _nativeSchedule(entry) {
    const LN = _getLocalNotif();
    if (!LN) return false;
    try {
        // Capacitor requires a small positive integer ID
        const nativeId = Math.abs(entry.id) % 2147483647 || 1;
        await LN.schedule({
            notifications: [{
                id:    nativeId,
                title: entry.title,
                body:  entry.body,
                schedule: { at: new Date(entry.timestamp) },
                sound: 'default',
                extra: { eventId: entry.id },
            }]
        });
        return true;
    } catch(e) { console.warn('[Notif] Native schedule failed:', e); return false; }
}

async function _nativeCancel(eventId) {
    const LN = _getLocalNotif();
    if (!LN) return;
    try {
        const nativeId = Math.abs(eventId) % 2147483647 || 1;
        await LN.cancel({ notifications: [{ id: nativeId }] });
    } catch(e) { console.warn('[Notif] Native cancel failed:', e); }
}

async function _nativeRequestPermission() {
    const LN = _getLocalNotif();
    if (!LN) return false;
    try {
        const result = await LN.requestPermissions();
        return result.display === 'granted';
    } catch(e) { return false; }
}

async function _nativeCheckPermission() {
    const LN = _getLocalNotif();
    if (!LN) return false;
    try {
        const result = await LN.checkPermissions();
        return result.display === 'granted';
    } catch(e) { return false; }
}

// ─── Page-side tick (web only) — runs every 30s ───────────────────────

async function _notifTick() {
    if (_isCapacitor()) return; // native handles its own scheduling
    if (Notification.permission !== 'granted') return;
    const now = Date.now();
    const scheduled = _getScheduled();
    let changed = false;

    for (const entry of scheduled) {
        if (entry.timestamp <= now + 500 && !_firedNotifs.has(entry.id)) {
            _firedNotifs.add(entry.id);
            changed = true;
            try {
                const reg = await navigator.serviceWorker.ready;
                await reg.showNotification(entry.title, {
                    body: entry.body, icon: '/UWU/icon.png',
                    tag: String(entry.id), renotify: false,
                });
            } catch(e) {
                try { new Notification(entry.title, { body: entry.body }); } catch(_) {}
            }
        }
    }
    if (changed) {
        const remaining = scheduled.filter(e => e.timestamp > now - 60000 && !_firedNotifs.has(e.id));
        _saveScheduled(remaining);
    }
}

// ─── Permission prompt ────────────────────────────────────────────────

function requestNotificationPermission() {
    if (!('Notification' in window)) return;
    if (Notification.permission !== 'default') return;   // already granted or denied

    const AR = state.language === 'ar';
    const banner = document.createElement('div');
    banner.id = 'notifPermBanner';
    banner.className = 'fixed bottom-20 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm theme-bg border theme-border rounded-2xl shadow-2xl z-[300] p-4 flex flex-col gap-3';
    banner.innerHTML = `
        <div class="flex items-start gap-3">
            <div class="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
            </div>
            <div class="flex-1">
                <p class="text-sm font-semibold theme-text">${t('notifPermTitle')}</p>
                <p class="text-xs theme-text-secondary mt-0.5 leading-relaxed">${t('notifPermBody')}</p>
            </div>
        </div>
        <div class="flex gap-2">
            <button id="notifPermSkipBtn" class="flex-1 py-2 rounded-xl border theme-border text-sm theme-text-secondary hover:theme-bg-tertiary transition-colors">${t('notifPermSkip')}</button>
            <button id="notifPermAllowBtn" class="flex-1 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors">${t('notifPermAllow')}</button>
        </div>`;

    document.body.appendChild(banner);

    document.getElementById('notifPermSkipBtn').onclick = () => {
        banner.remove();
        localStorage.setItem('uwu_notif_skipped', '1');
    };
    document.getElementById('notifPermAllowBtn').onclick = async () => {
        banner.remove();
        let granted = false;
        if (_isCapacitor()) {
            granted = await _nativeRequestPermission();
        } else {
            granted = (await Notification.requestPermission()) === 'granted';
        }
        if (granted) await _rescheduleAll();
    };
}

// ─── Schedule a notification for a single event ───────────────────────

async function scheduleEventNotification(ev) {
    await cancelEventNotification(ev.id);

    if (ev.reminderMinutes == null || ev.isAllDay) return;
    const isAlarmType = ev.reminderType === 'alarm';

    const eventDateTime = new Date(`${ev.date}T${ev.startTime || '09:00'}:00`);
    const fireAt = eventDateTime.getTime() - (ev.reminderMinutes * 60 * 1000);
    if (fireAt <= Date.now()) return;

    const body = ev.reminderMinutes === 0
        ? (state.language === 'ar' ? 'يبدأ الآن' : 'Starting now')
        : (state.language === 'ar'
            ? `يبدأ خلال ${ev.reminderMinutes < 60 ? ev.reminderMinutes + ' دقيقة' : (ev.reminderMinutes/60) + ' ساعة'}`
            : `Starts in ${ev.reminderMinutes < 60 ? ev.reminderMinutes + ' min' : (ev.reminderMinutes/60) + ' hr'}`);

    const entry = { id: ev.id, title: ev.title, body, timestamp: fireAt };

    const scheduled = _getScheduled().filter(n => n.id !== ev.id);
    scheduled.push(entry);
    _saveScheduled(scheduled);

    if (_isCapacitor()) {
        // ── Native path ──
        let granted = await _nativeCheckPermission();
        if (!granted) granted = await _nativeRequestPermission();
        if (!granted) return;

        const AP = _getAlarmPlugin();
        if (AP && isAlarmType) {
            // Full-screen alarm with per-event settings
            try {
                await AP.scheduleAlarm({
                    eventId:       ev.id,
                    title:         ev.title,
                    time:          ev.startTime || '',
                    timestamp:     fireAt,
                    equationTypes: JSON.stringify(ev.alarmEquationTypes || []),
                    eqCount:       ev.alarmEqCount     || 2,
                    snoozeMins:    ev.alarmSnoozeMins  || 5,
                    ringtoneUri:   ev.alarmRingtoneUri || '',
                    gentleWake:    ev.alarmGentleWake  !== false,
                    wakeUpCheck:   !!ev.alarmWakeUpCheck,
                    eqTimer:       ev.alarmEqTimer || 0,
                });
            } catch(e) {
                console.warn('[Alarm] scheduleAlarm failed, falling back to notification:', e);
                await _nativeSchedule(entry);
            }
        } else {
            // Simple notification (no alarm) or AlarmPlugin unavailable
            await _nativeSchedule(entry);
        }
    } else {
        // ── Web path (browser) ──
        if (Notification.permission === 'default') {
            const result = await Notification.requestPermission();
            if (result !== 'granted') return;
        }
        if (Notification.permission !== 'granted') return;

        const delay = fireAt - Date.now();
        if (delay > 0) {
            setTimeout(async () => {
                if (_firedNotifs.has(ev.id)) return;
                _firedNotifs.add(ev.id);
                try {
                    const reg = await navigator.serviceWorker.ready;
                    await reg.showNotification(ev.title, {
                        body: entry.body, icon: '/UWU/icon.png',
                        tag: String(ev.id), renotify: false,
                    });
                } catch(e) {
                    try { new Notification(ev.title, { body: entry.body }); } catch(_) {}
                }
                const remaining = _getScheduled().filter(e => e.id !== ev.id);
                _saveScheduled(remaining);
            }, delay);
        }
        await _postToSW({ type: 'SCHEDULE', ...entry });
    }
}

async function cancelEventNotification(eventId) {
    const scheduled = _getScheduled().filter(n => n.id !== eventId);
    _saveScheduled(scheduled);
    if (_isCapacitor()) {
        const AP = _getAlarmPlugin();
        if (AP) await AP.cancelAlarm({ eventId });
        await _nativeCancel(eventId);
    } else {
        await _postToSW({ type: 'CANCEL', id: eventId });
    }
}

// ─── Re-send all pending notifications to SW (backup layer) ──────────

async function _rescheduleAll() {
    const now = Date.now();
    const scheduled = _getScheduled().filter(n => n.timestamp > now);
    _saveScheduled(scheduled);
    if (_isCapacitor()) {
        for (const entry of scheduled) await _nativeSchedule(entry);
    } else {
        if (Notification.permission !== 'granted') return;
        for (const entry of scheduled) await _postToSW({ type: 'SCHEDULE', ...entry });
    }
}

// ─── Init (called on DOMContentLoaded) ───────────────────────────────

function initNotifications() {
    if (_isCapacitor()) {
        _rescheduleAll();
        const skipped = localStorage.getItem('uwu_notif_skipped');
        if (!skipped) {
            _nativeCheckPermission().then(granted => {
                if (!granted) setTimeout(requestNotificationPermission, 4000);
            });
        }
        // Reschedule all enabled standalone alarms on app open (covers boot scenario)
        setTimeout(async () => {
            const AP = _getAlarmPlugin();
            if (!AP) return;
            const alarms = getStandaloneAlarms();
            for (const alarm of alarms) {
                if (alarm.enabled) {
                    await scheduleStandaloneAlarm(alarm);
                }
            }
        }, 2000);
        // Request "Draw over other apps" permission for full-screen alarm
        const AP = _getAlarmPlugin();
        if (AP) {
            AP.checkOverlayPermission().then(result => {
                if (!result.granted && !localStorage.getItem('uwu_overlay_skipped')) {
                    setTimeout(requestOverlayPermission, 5000);
                }
            }).catch(() => {});
        }
        return;
    }

    if (!('Notification' in window)) return;

    // Web: page-side tick as primary layer
    if (_notifCheckInterval) clearInterval(_notifCheckInterval);
    _notifCheckInterval = setInterval(_notifTick, 30_000);
    setTimeout(_notifTick, 1000);

    if (Notification.permission === 'granted') _rescheduleAll();

    const skipped = localStorage.getItem('uwu_notif_skipped');
    if (Notification.permission === 'default' && !skipped) {
        setTimeout(requestNotificationPermission, 4000);
    }
}


// ─── Notification debug helper (call notifDebug() in console) ────────
async function notifDebug() {
    const lines = [];
    lines.push('=== Notification Debug ===');
    lines.push('Notification API: ' + ('Notification' in window ? 'YES' : 'NO'));
    lines.push('Permission: ' + (('Notification' in window) ? Notification.permission : 'N/A'));
    lines.push('ServiceWorker API: ' + ('serviceWorker' in navigator ? 'YES' : 'NO'));

    if ('serviceWorker' in navigator) {
        try {
            const reg = await navigator.serviceWorker.getRegistration();
            lines.push('SW registered: ' + (reg ? 'YES' : 'NO'));
            if (reg) {
                lines.push('SW active: '  + (reg.active  ? reg.active.state  : 'none'));
                lines.push('SW waiting: ' + (reg.waiting ? reg.waiting.state : 'none'));
                lines.push('SW scope: '   + reg.scope);
            }
        } catch(e) { lines.push('SW check error: ' + e.message); }
    }

    const scheduled = _getScheduled();
    lines.push('Scheduled notifs in storage: ' + scheduled.length);
    scheduled.forEach(n => {
        const inMs = n.timestamp - Date.now();
        lines.push('  [' + n.id + '] "' + n.title + '" fires in ' + Math.round(inMs/1000) + 's  (timestamp=' + n.timestamp + ')');
    });

    lines.push('_firedNotifs this session: ' + [..._firedNotifs].join(', '));
    lines.push('Tick interval running: ' + (_notifCheckInterval ? 'YES' : 'NO'));

    // Test if Notification constructor works right now
    if (Notification.permission === 'granted') {
        lines.push('--- Firing a TEST notification now ---');
        lines.push('Running as Capacitor: ' + _isCapacitor());
        if (_isCapacitor()) {
            try {
                const LN = _getLocalNotif();
                await LN.schedule({ notifications: [{
                    id: 999999, title: 'Test ✓', body: 'Native notifications working!',
                    schedule: { at: new Date(Date.now() + 3000) },
                }]});
                lines.push('Native notification scheduled (fires in 3s)');
            } catch(e) { lines.push('Native notification FAILED: ' + e.message); }
        } else {
            try {
                const reg = await navigator.serviceWorker.ready;
                await reg.showNotification('Test ✓', { body: 'Notifications are working!', icon: '/UWU/icon.png' });
                lines.push('Test notification fired OK (via SW)');
            } catch(e) {
                lines.push('SW showNotification failed: ' + e.message);
                try { new Notification('Test ✓', { body: 'Fallback test' }); lines.push('Fallback OK'); }
                catch(e2) { lines.push('FAILED: ' + e2.message); }
            }
        }
    }

    const out = lines.join('\n');
    console.log(out);
    alert(out);
    return out;
}
window.notifDebug = notifDebug;




// ─── Per-event reminder UI helpers ───────────────────────────────────

function toggleAlarmOptions() {
    const reminderVal = document.getElementById('eventReminder')?.value;
    const typeRow     = document.getElementById('reminderTypeRow');
    const alarmRow    = document.getElementById('alarmOptionsRow');
    const hasReminder = reminderVal && reminderVal !== 'none';
    if (typeRow) typeRow.classList.toggle('hidden', !hasReminder);
    if (!hasReminder && alarmRow) alarmRow.classList.add('hidden');
}

function setReminderType(type) {
    const notifBtn = document.getElementById('typeNotifBtn');
    const alarmBtn = document.getElementById('typeAlarmBtn');
    const alarmRow = document.getElementById('alarmOptionsRow');
    if (!notifBtn || !alarmBtn) return;
    if (type === 'alarm') {
        alarmBtn.classList.add('bg-orange-500', 'text-white');
        alarmBtn.classList.remove('theme-text-secondary');
        notifBtn.classList.remove('bg-blue-500', 'text-white');
        notifBtn.classList.add('theme-text-secondary');
        if (alarmRow) alarmRow.classList.remove('hidden');
    } else {
        notifBtn.classList.add('bg-blue-500', 'text-white');
        notifBtn.classList.remove('theme-text-secondary');
        alarmBtn.classList.remove('bg-orange-500', 'text-white');
        alarmBtn.classList.add('theme-text-secondary');
        if (alarmRow) alarmRow.classList.add('hidden');
    }
}

// ── Event alarm popup (replaces inline alarmOptionsRow) ───────────────────

function openEventAlarmPopup() {
    const existing = document.getElementById('eventAlarmPopup');
    if (existing) { existing.remove(); return; }

    const ringtoneUri  = localStorage.getItem('_eventAlarmRingtoneUri_tmp')  || '';
    const ringtoneName = localStorage.getItem('_eventAlarmRingtoneName_tmp') || 'Default alarm sound';
    const snooze       = parseInt(localStorage.getItem('_eventAlarmSnooze_tmp')    || '5');
    const snoozeLimit  = parseInt(localStorage.getItem('_eventAlarmSnoozeLimit_tmp') ?? '0');
    const eqCount      = localStorage.getItem('_eventAlarmEqCount_tmp')             || '2';
    const gentleWake   = localStorage.getItem('_eventAlarmGentleWake_tmp')  !== 'false';
    const wakeUpCheck  = localStorage.getItem('_eventAlarmWakeUpCheck_tmp') === 'true';
    const safetyStop   = localStorage.getItem('_eventAlarmSafetyStop_tmp')  === 'true';

    const snoozeLabel      = snooze === 0 ? t('alarmSnoozeOff') : `${snooze} ${t('alarmSnoozeMin')}`;
    const snoozeLimitLabel = _snoozeLimitLabel(snoozeLimit);
    const eqTypesSummary   = _eqTypesSummary('_eventAlarmEquationTypes_tmp', eqCount);
    const eqCountLabel     = `${eqCount} ${parseInt(eqCount) !== 1 ? t('alarmEqCountPl') : t('alarmEqCount')}`;

    const sheet = document.createElement('div');
    sheet.id = 'eventAlarmPopup';
    sheet.className = 'fixed inset-0 modal-backdrop flex items-end justify-center z-[250]';
    sheet.innerHTML = `
        <div class="theme-bg border theme-border rounded-t-2xl w-full max-w-sm">
            <div class="flex items-center justify-between px-5 py-4 border-b theme-border">
                <h3 class="font-semibold text-sm theme-text">${state.language === 'ar' ? 'إعدادات المنبّه' : 'Alarm Settings'}</h3>
                <button onclick="document.getElementById('eventAlarmPopup').remove()" class="theme-text-secondary hover:theme-text">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            </div>

            <!-- Ringtone -->
            <button onclick="pickEventAlarmRingtone()" class="w-full flex items-center px-5 py-3.5 border-b theme-border gap-3">
                <span class="text-sm theme-text-secondary w-28 shrink-0 text-left">${t('alarmSound')}</span>
                <span id="evAlarmRingtoneName" class="flex-1 text-sm theme-text text-right truncate">${ringtoneName}</span>
                <svg class="w-4 h-4 theme-text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>

            <!-- Snooze -->
            <button onclick="_evAlarmSnoozePopup()" class="w-full flex items-center px-5 py-3.5 border-b theme-border gap-3">
                <span class="text-sm theme-text-secondary w-28 shrink-0 text-left">${t('alarmSnooze')}</span>
                <span id="evAlarmSnoozeLabel" class="flex-1 text-sm theme-text text-right">${snoozeLabel}</span>
                <svg class="w-4 h-4 theme-text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>

            <!-- Snooze limit -->
            <button onclick="_evAlarmSnoozeLimitPopup()" class="w-full flex items-center px-5 py-3.5 border-b theme-border gap-3">
                <span class="text-sm theme-text-secondary w-28 shrink-0 text-left">${t('alarmSnoozeLimit')}</span>
                <span id="evAlarmSnoozeLimitLabel" class="flex-1 text-sm theme-text text-right">${snoozeLimitLabel}</span>
                <svg class="w-4 h-4 theme-text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>

            <!-- Equation Types -->
            <button onclick="_openEquationTypePicker('_eventAlarmEquationTypes_tmp','_eventAlarmEqCount_tmp','evAlarmEqLabel')" class="w-full flex items-center px-5 py-3.5 border-b theme-border gap-3">
                <span class="text-sm theme-text-secondary w-28 shrink-0 text-left">${t('alarmEqTypes')}</span>
                <span id="evAlarmEqLabel" class="flex-1 text-sm theme-text text-right">${eqTypesSummary}</span>
                <svg class="w-4 h-4 theme-text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>

            <!-- Equation Count -->
            <button onclick="_evAlarmCountPopup()" class="w-full flex items-center px-5 py-3.5 border-b theme-border gap-3">
                <span class="text-sm theme-text-secondary w-28 shrink-0 text-left">${t('alarmCount')}</span>
                <span id="evAlarmCountLabel" class="flex-1 text-sm theme-text text-right">${eqCountLabel}</span>
                <svg class="w-4 h-4 theme-text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>

            <!-- Gentle wake -->
            <div class="flex items-center px-5 py-3.5 border-b theme-border gap-3">
                <span class="text-sm theme-text-secondary w-28 shrink-0">${t('alarmGentleWake')}</span>
                <span class="flex-1 text-xs theme-text-secondary">${t('alarmGentleDesc')}</span>
                <button id="evGentleWakeBtn" onclick="_toggleEvAlarmBool('evGentleWakeBtn','_eventAlarmGentleWake_tmp')"
                    class="relative w-10 h-6 rounded-full transition-colors shrink-0 ${gentleWake ? 'bg-orange-500' : 'bg-gray-400 dark:bg-gray-600'}">
                    <span class="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${gentleWake ? 'right-0.5' : 'left-0.5'}"></span>
                </button>
            </div>

            <!-- Wake up check -->
            <div class="flex items-center px-5 py-3.5 border-b theme-border gap-3">
                <span class="text-sm theme-text-secondary w-28 shrink-0">${t('alarmWakeCheck')}</span>
                <span class="flex-1 text-xs theme-text-secondary">${t('alarmWakeDesc')}</span>
                <button id="evWakeUpCheckBtn" onclick="_toggleEvAlarmBool('evWakeUpCheckBtn','_eventAlarmWakeUpCheck_tmp')"
                    class="relative w-10 h-6 rounded-full transition-colors shrink-0 ${wakeUpCheck ? 'bg-orange-500' : 'bg-gray-400 dark:bg-gray-600'}">
                    <span class="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${wakeUpCheck ? 'right-0.5' : 'left-0.5'}"></span>
                </button>
            </div>

            <!-- Safety stop -->
            <div class="flex items-center px-5 py-3.5 border-b theme-border gap-3">
                <span class="text-sm theme-text-secondary w-28 shrink-0">${t('alarmSafetyStop')}</span>
                <span class="flex-1 text-xs theme-text-secondary">${t('alarmSafetyDesc')}</span>
                <button id="evSafetyStopBtn" onclick="_toggleEvAlarmBool('evSafetyStopBtn','_eventAlarmSafetyStop_tmp')"
                    class="relative w-10 h-6 rounded-full transition-colors shrink-0 ${safetyStop ? 'bg-orange-500' : 'bg-gray-400 dark:bg-gray-600'}">
                    <span class="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${safetyStop ? 'right-0.5' : 'left-0.5'}"></span>
                </button>
            </div>

            <div class="px-5 py-4">
                <button onclick="document.getElementById('eventAlarmPopup').remove()"
                    class="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors">${t('save')}</button>
            </div>
        </div>`;
    document.body.appendChild(sheet);
    sheet.addEventListener('click', e => { if (e.target === sheet) sheet.remove(); });
}

function _toggleEvAlarmBool(btnId, storageKey) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const isOn = btn.classList.contains('bg-orange-500');
    const newVal = !isOn;
    localStorage.setItem(storageKey, String(newVal));
    btn.classList.toggle('bg-orange-500', newVal);
    btn.classList.toggle('bg-gray-400', !newVal);
    const dot = btn.querySelector('span');
    if (dot) { dot.classList.toggle('right-0.5', newVal); dot.classList.toggle('left-0.5', !newVal); }
}

function _evAlarmSnoozePopup() {
    const current = parseInt(localStorage.getItem('_eventAlarmSnooze_tmp') || '5');
    const opts = [[0,t('alarmSnoozeOff')],[1,`1 ${t('alarmSnoozeMin')}`],[5,`5 ${t('alarmSnoozeMin')}`],
                  [10,`10 ${t('alarmSnoozeMin')}`],[15,`15 ${t('alarmSnoozeMin')}`],[30,`30 ${t('alarmSnoozeMin')}`]];
    _showPickerPopup(t('alarmSnooze'), opts, current, val => {
        localStorage.setItem('_eventAlarmSnooze_tmp', String(val));
        const el = document.getElementById('evAlarmSnoozeLabel');
        if (el) el.textContent = parseInt(val) === 0 ? t('alarmSnoozeOff') : `${val} ${t('alarmSnoozeMin')}`;
    });
}

function _evAlarmCountPopup() {
    const current = parseInt(localStorage.getItem('_eventAlarmEqCount_tmp') || '2');
    _showPickerPopup(t('alarmCount'),
        [1,2,3,5,7,10].map(n => [n, `${n} ${n !== 1 ? t('alarmEqCountPl') : t('alarmEqCount')}`]),
        current, val => {
            localStorage.setItem('_eventAlarmEqCount_tmp', String(val));
            const el = document.getElementById('evAlarmCountLabel');
            if (el) el.textContent = `${val} ${val !== 1 ? t('alarmEqCountPl') : t('alarmEqCount')}`;
            const el2 = document.getElementById('evAlarmEqLabel');
            if (el2) el2.textContent = _eqTypesSummary('_eventAlarmEquationTypes_tmp', val);
        });
}

async function pickEventAlarmRingtone() {
    const AP = _getAlarmPlugin();
    if (!AP) { alert('Ringtone picker only available in the Android app.'); return; }
    const currentUri = localStorage.getItem('_eventAlarmRingtoneUri_tmp') || '';
    await AP.pickRingtone({ currentUri });
    const checkResult = async () => {
        try {
            const result = await AP.getRingtoneResult();
            if (result.ready) {
                localStorage.setItem('_eventAlarmRingtoneUri_tmp',  result.uri  || '');
                localStorage.setItem('_eventAlarmRingtoneName_tmp', result.name || 'Default alarm sound');
                // Update the name label inside the event alarm popup if it's open
                const nameEl = document.getElementById('evAlarmRingtoneName');
                if (nameEl) nameEl.textContent = result.name || 'Default alarm sound';
                document.removeEventListener('visibilitychange', onVisible);
            }
        } catch(e) {}
    };
    const onVisible = () => { if (document.visibilityState === 'visible') checkResult(); };
    document.addEventListener('visibilitychange', onVisible);
    setTimeout(checkResult, 1000);
}

// ══════════════════════════════════════════════════════════════════════════
