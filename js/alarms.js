// ALARM MODULE
// Uses AlarmPlugin (native) on Capacitor, falls back to SW notifications on web.
// Settings: difficulty, ringtone, snooze minutes.
// ══════════════════════════════════════════════════════════════════════════

function _getAlarmPlugin() {
    return window.Capacitor?.Plugins?.AlarmPlugin || null;
}

function getAlarmSettings() {
    return {
        difficulty:   localStorage.getItem(STORAGE_KEYS.ALARM_DIFFICULTY)    || 'medium',
        ringtoneUri:  localStorage.getItem(STORAGE_KEYS.ALARM_RINGTONE)      || '',
        ringtoneName: localStorage.getItem(STORAGE_KEYS.ALARM_RINGTONE_NAME) || 'Default',
        snoozeMins:   parseInt(localStorage.getItem(STORAGE_KEYS.ALARM_SNOOZE_MIN) || '5'),
        eqCount:      parseInt(localStorage.getItem(STORAGE_KEYS.ALARM_EQ_COUNT) || '2'),
        gentleWake:   localStorage.getItem(STORAGE_KEYS.ALARM_GENTLE_WAKE) !== 'false',
    };
}

// ── Equation type system ──────────────────────────────────────────────────

const EQ_TYPE_GROUPS = [
    { groupKey: 'eqGroupArith', types: [
        { id: 'add_sub',      nameKey: 'eqAddSub',      diffs: ['easy','medium','hard','veryhard'] },
        { id: 'multiply',     nameKey: 'eqMultiply',    diffs: ['easy','medium','hard','veryhard'] },
        { id: 'divide',       nameKey: 'eqDivide',      diffs: ['medium','hard','veryhard'] },
        { id: 'mixed_chains', nameKey: 'eqMixedChains', diffs: ['medium','hard','veryhard'] },
        { id: 'diff_squares', nameKey: 'eqDiffSquares', diffs: ['hard','veryhard'] },
    ]},
    { groupKey: 'eqGroupAlgebra', types: [
        { id: 'linear_x',    nameKey: 'eqLinearX',     diffs: ['medium','hard','veryhard','expert'] },
        { id: 'ax2',         nameKey: 'eqAx2',         diffs: ['hard','veryhard','expert'] },
        { id: 'quad_roots',  nameKey: 'eqQuadRoots',   diffs: ['expert'] },
        { id: 'quad_vertex', nameKey: 'eqQuadVertex',  diffs: ['expert'] },
        { id: 'expand',      nameKey: 'eqExpand',      diffs: ['expert'] },
        { id: 'cubic',       nameKey: 'eqCubic',       diffs: ['expert'] },
    ]},
    { groupKey: 'eqGroupGeometry', types: [
        { id: 'circle_area', nameKey: 'eqCircleArea',  diffs: ['medium','hard','expert'] },
        { id: 'arc_length',  nameKey: 'eqArcLength',   diffs: ['hard','expert'] },
        { id: 'sector_area', nameKey: 'eqSectorArea',  diffs: ['hard','expert'] },
        { id: 'chord',       nameKey: 'eqChord',       diffs: ['expert'] },
    ]},
    { groupKey: 'eqGroupOther', types: [
        { id: 'percentage',   nameKey: 'eqPercentage',  diffs: ['easy','medium','hard','veryhard','expert'] },
        { id: 'complex_add',  nameKey: 'eqComplexAdd',  diffs: ['expert'] },
        { id: 'complex_mul',  nameKey: 'eqComplexMul',  diffs: ['expert'] },
    ]},
    { groupKey: 'eqGroupPhysics', types: [
        { id: 'phys_motion',      nameKey: 'eqPhysMotion',      diffs: ['easy','medium','hard','veryhard','expert'] },
        { id: 'phys_forces',      nameKey: 'eqPhysForces',      diffs: ['easy','medium','hard','veryhard','expert'] },
        { id: 'phys_energy',      nameKey: 'eqPhysEnergy',      diffs: ['easy','medium','hard','veryhard','expert'] },
        { id: 'phys_electricity', nameKey: 'eqPhysElectricity', diffs: ['easy','medium','hard','veryhard','expert'] },
        { id: 'phys_graphs',     nameKey: 'eqPhysGraphs',      diffs: ['easy','medium','hard','veryhard','expert'] },
        { id: 'phys_pressure',   nameKey: 'eqPhysPressure',    diffs: ['easy','medium','hard','veryhard','expert'] },
    ]},
];

function _diffLabel(d) {
    const map = { easy:'diffEasy', medium:'diffMedium', hard:'diffHard', veryhard:'diffVeryHard', expert:'diffExpert' };
    return t(map[d] || d);
}

function _getEqTypes(key) {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
}
function _saveEqTypes(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
}
function _eqTypesSummary(key, eqCount) {
    const types = _getEqTypes(key);
    if (types.length === 0) return t('alarmNoTypes');
    const n = parseInt(eqCount) || 2;
    const countWord = n === 1 ? t('alarmEqCount') : t('alarmEqCountPl');
    return `${types.length} ${state.language === 'ar' ? 'نوع' : (types.length === 1 ? 'type' : 'types')} · ${n} ${countWord}`;
}

function _openEquationTypePicker(storageKey, eqCountKey, labelElId) {
    const existing = document.getElementById('eqTypePicker');
    if (existing) existing.remove();

    const screen = document.createElement('div');
    screen.id = 'eqTypePicker';
    screen.className = 'fixed inset-0 z-[400] flex flex-col theme-bg';
    screen.innerHTML = `
        <div class="flex items-center justify-between px-4 py-4 border-b theme-border shrink-0" style="padding-top:calc(1rem + 22px)">
            <button onclick="document.getElementById('eqTypePicker').remove()" class="p-2 -ml-2 hover:theme-bg-tertiary rounded-lg">
                <svg class="w-5 h-5 theme-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <h2 class="text-lg font-semibold theme-text">${t('eqTypesTitle')}</h2>
            <button onclick="_closeEqTypePicker('${storageKey}','${eqCountKey}','${labelElId}')" class="text-orange-500 font-semibold text-sm px-2 py-1">${t('save')}</button>
        </div>
        <div class="flex-1 overflow-y-auto" id="eqTypePickerList" style="-webkit-overflow-scrolling:touch;overscroll-behavior:contain;min-height:0">
            ${_renderEqTypeGroups(storageKey)}
        </div>`;
    document.body.appendChild(screen);
}

function _closeEqTypePicker(storageKey, eqCountKey, labelElId) {
    document.getElementById('eqTypePicker')?.remove();
    const el = document.getElementById(labelElId);
    if (el) el.textContent = _eqTypesSummary(storageKey, localStorage.getItem(eqCountKey) || '2');
}

function _renderEqTypeGroups(storageKey) {
    const selected = _getEqTypes(storageKey);
    const selMap = {};
    selected.forEach(s => selMap[s.type] = s.difficulty);

    return EQ_TYPE_GROUPS.map(grp => `
        <div class="pt-2 pb-1">
            <div class="px-5 py-1.5 text-xs font-semibold theme-text-secondary uppercase tracking-wider">${t(grp.groupKey)}</div>
            ${grp.types.map(tp => {
                const isSel = selMap.hasOwnProperty(tp.id);
                const diff  = selMap[tp.id];
                const canChange = tp.diffs.length > 1;
                return `<div class="flex items-center px-5 py-3 border-b theme-border gap-3 ${isSel ? 'bg-orange-500/5' : ''}">
                    <span class="flex-1 text-sm ${isSel ? 'theme-text font-medium' : 'theme-text'}">${t(tp.nameKey)}</span>
                    ${isSel ? `
                        <button onclick="${canChange ? `_openEqDiffPopup('${storageKey}','${tp.id}')` : 'void(0)'}"
                            class="px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-500 text-white flex items-center gap-1 ${canChange ? '' : 'cursor-default'}">
                            ${_diffLabel(diff)}${canChange ? ' ▾' : ''}
                        </button>
                        <button onclick="_removeEqType('${storageKey}','${tp.id}')" class="w-6 h-6 rounded-full flex items-center justify-center text-xs theme-text-secondary hover:bg-red-500/20 hover:text-red-400 transition-colors">✕</button>
                    ` : `
                        <button onclick="_addEqType('${storageKey}','${tp.id}','${tp.diffs[0]}')"
                            class="px-3 py-1 rounded-full text-xs font-semibold border theme-border theme-text-secondary hover:border-orange-500 hover:text-orange-500 transition-colors">
                            ${t('eqAdd')}
                        </button>
                    `}
                </div>`;
            }).join('')}
        </div>`).join('');
}

function _addEqType(storageKey, typeId, defaultDiff) {
    const types = _getEqTypes(storageKey);
    if (!types.find(t => t.type === typeId)) {
        types.push({ type: typeId, difficulty: defaultDiff });
        _saveEqTypes(storageKey, types);
    }
    const list = document.getElementById('eqTypePickerList');
    if (list) list.innerHTML = _renderEqTypeGroups(storageKey);
}

function _removeEqType(storageKey, typeId) {
    _saveEqTypes(storageKey, _getEqTypes(storageKey).filter(t => t.type !== typeId));
    const list = document.getElementById('eqTypePickerList');
    if (list) list.innerHTML = _renderEqTypeGroups(storageKey);
}

function _openEqDiffPopup(storageKey, typeId) {
    let diffs = [];
    for (const grp of EQ_TYPE_GROUPS) {
        const t = grp.types.find(t => t.id === typeId);
        if (t) { diffs = t.diffs; break; }
    }
    const current = (_getEqTypes(storageKey).find(t => t.type === typeId) || {}).difficulty;
    _showPickerPopup(t('eqDiffTitle'), diffs.map(d => [d, _diffLabel(d)]), current, val => {
        const types = _getEqTypes(storageKey);
        const idx = types.findIndex(t => t.type === typeId);
        if (idx >= 0) types[idx].difficulty = val;
        _saveEqTypes(storageKey, types);
        const list = document.getElementById('eqTypePickerList');
        if (list) list.innerHTML = _renderEqTypeGroups(storageKey);
    });
}


async function pickAlarmBackground() {
    const AP = _getAlarmPlugin();
    if (!AP) { alert('Only available in the Android app.'); return; }
    await AP.pickAlarmBackground();
    const checkResult = async () => {
        try {
            const result = await AP.getAlarmBackground();
            if (result.uri) {
                // Update wallpaper label in edit screen if open
                const nameEl = document.getElementById('alarmBgName') ||
                               document.querySelector('#alarmEditScreen [onclick="pickAlarmBackground()"] span');
                if (nameEl) nameEl.textContent = 'Custom image set ✓';
                document.removeEventListener('visibilitychange', onVisible);
            }
        } catch(e) {}
    };
    const onVisible = () => { if (document.visibilityState === 'visible') checkResult(); };
    document.addEventListener('visibilitychange', onVisible);
    setTimeout(checkResult, 1000);
}

async function removeAlarmBackground() {
    const AP = _getAlarmPlugin();
    if (!AP) return;
    await AP.removeAlarmBackground();
    const nameEl = document.getElementById('alarmBgName') ||
                   document.querySelector('#alarmEditScreen [onclick="pickAlarmBackground()"] span');
    if (nameEl) nameEl.textContent = 'Choose image';
}

async function requestOverlayPermission() {
    const AP = _getAlarmPlugin();
    if (!AP) return;

    const banner = document.createElement('div');
    banner.id = 'overlayPermBanner';
    banner.className = 'fixed bottom-20 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm theme-bg border theme-border rounded-2xl shadow-2xl z-[300] p-4 flex flex-col gap-3';
    banner.innerHTML = `
        <div class="flex items-start gap-3">
            <div class="w-9 h-9 rounded-full bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center shrink-0 text-lg">🔔</div>
            <div class="flex-1">
                <p class="text-sm font-semibold theme-text">Enable Full-Screen Alarms</p>
                <p class="text-xs theme-text-secondary mt-0.5 leading-relaxed">Allow "Display over other apps" so alarms show over your lock screen — just like Alarmy.</p>
            </div>
        </div>
        <div class="flex gap-2">
            <button id="overlaySkipBtn" class="flex-1 py-2 rounded-xl border theme-border text-sm theme-text-secondary hover:theme-bg-tertiary transition-colors">Not now</button>
            <button id="overlayAllowBtn" class="flex-1 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors">Allow</button>
        </div>`;
    document.body.appendChild(banner);

    document.getElementById('overlaySkipBtn').onclick = () => {
        banner.remove();
        localStorage.setItem('uwu_overlay_skipped', '1');
    };
    document.getElementById('overlayAllowBtn').onclick = async () => {
        banner.remove();
        await AP.requestOverlayPermission();
    };
}



// ══════════════════════════════════════════════════════════════════════════
// STANDALONE ALARMS MODULE  (Alarmy-style)
// ══════════════════════════════════════════════════════════════════════════

function getStandaloneAlarms() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.STANDALONE_ALARMS) || '[]'); }
    catch { return []; }
}
function saveStandaloneAlarms(arr) {
    localStorage.setItem(STORAGE_KEYS.STANDALONE_ALARMS, JSON.stringify(arr));
    // Also persist to SharedPreferences so BootReceiver can reschedule after reboot
    const AP = _getAlarmPlugin();
    if (AP && _isCapacitor()) {
        AP.saveAlarmStore({ alarmsJson: JSON.stringify(arr) }).catch(() => {});
    }
}

// ── Helpers ───────────────────────────────────────────────────────────────

function _alarmFmt12(time) {
    const [h, m] = time.split(':').map(Number);
    return { h12: h % 12 || 12, mins: String(m).padStart(2,'0'), ampm: h >= 12 ? 'PM' : 'AM' };
}

function _alarmDayCircles(alarm) {
    const days  = ['S','M','T','W','T','F','S'];
    const repeat = alarm.repeat || 'none';
    const activeIdx = (() => {
        if (repeat === 'daily')    return [0,1,2,3,4,5,6];
        if (repeat === 'weekdays') return [1,2,3,4,5];
        if (repeat === 'weekends') return [0,6];
        if (repeat === 'weekly') {
            const d = new Date(alarm.id);
            return [d.getDay()];
        }
        return [];
    })();
    if (repeat === 'none') return '<span class="text-xs theme-text-secondary">Once</span>';
    return days.map((d, i) => `
        <span class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold transition-colors
            ${activeIdx.includes(i) ? 'bg-orange-500 text-white' : 'theme-bg-tertiary theme-text-secondary'}">${d}</span>
    `).join('');
}

function _alarmSubtitle(alarm) {
    const types  = alarm.equationTypes || [];
    const eqPart = types.length === 0 ? 'No equations' : `${types.length} type${types.length !== 1 ? 's' : ''} · ${alarm.eqCount || 2} eq`;
    const snooze = alarm.snoozeMins > 0 ? `Snooze ${alarm.snoozeMins}m` : 'No snooze';
    const extras = [alarm.gentleWake ? '🌅' : null, alarm.wakeUpCheck ? '✓ Check' : null].filter(Boolean).join('  ');
    return `${eqPart}  ·  ${snooze}${extras ? '  ·  '+extras : ''}`;
}

// ── Main panel (full-screen, Alarmy-style) ────────────────────────────────

function openStandaloneAlarmsPanel() {
    const existing = document.getElementById('standaloneAlarmsPanel');
    if (existing) { existing.remove(); return; }

    const panel = document.createElement('div');
    panel.id = 'standaloneAlarmsPanel';
    panel.className = 'fixed inset-0 flex flex-col theme-bg';
    panel.style.zIndex = '200';
    panel.innerHTML = `
        <div class="flex items-center justify-between px-4 py-4 border-b theme-border shrink-0" style="padding-top: calc(1rem + 22px)">
            <button onclick="document.getElementById('standaloneAlarmsPanel').remove(); document.getElementById('alarmsFab')?.remove();" class="p-2 -ml-2 hover:theme-bg-tertiary rounded-lg transition-colors">
                <svg class="w-5 h-5 theme-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <h2 class="text-lg font-semibold theme-text">${t('alarmsTitle')}</h2>
            <div class="w-9"></div>
        </div>
        <div id="standaloneAlarmsList" class="flex-1 overflow-y-auto" style="padding-bottom: 80px"></div>
        <button id="alarmsFab"
            onclick="openAlarmEditScreen(null)"
            style="position:absolute; bottom:16px; right:24px; width:56px; height:56px; border-radius:50%; background:#f97316; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 16px rgba(0,0,0,0.4); border:none; cursor:pointer; z-index:10;">
            <svg width="28" height="28" fill="none" stroke="white" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
        </button>`;

    document.body.appendChild(panel);
    _renderAlarmList();
}

function _renderAlarmList() {
    const list   = document.getElementById('standaloneAlarmsList');
    if (!list) return;
    const alarms = getStandaloneAlarms();

    if (alarms.length === 0) {
        list.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full gap-4 pb-24">
                <div class="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center text-4xl">⏰</div>
                <p class="theme-text-secondary text-sm">${state.language === 'ar' ? 'لا توجد منبّهات' : 'No alarms yet'}</p>
                <p class="theme-text-secondary text-xs">${state.language === 'ar' ? 'اضغط + لإضافة منبّه' : 'Tap + to add one'}</p>
            </div>`;
        return;
    }

    list.innerHTML = alarms.map((alarm, i) => {
        const { h12, mins, ampm } = _alarmFmt12(alarm.time || '08:00');
        return `
        <div class="alarm-row relative overflow-hidden border-b theme-border" data-index="${i}">
            <!-- swipe-reveal delete -->
            <div class="alarm-delete-bg absolute inset-y-0 right-0 w-24 bg-red-500 flex items-center justify-center translate-x-full transition-transform duration-200">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </div>
            <!-- main content -->
            <div class="alarm-row-content flex items-center px-5 py-4 gap-4 theme-bg cursor-pointer transition-transform duration-200"
                onclick="_onAlarmRowTap(${i}, event)">
                <div class="flex-1 min-w-0" onclick="openAlarmEditScreen(${i}); event.stopPropagation();">
                    <div class="flex items-end gap-1.5 mb-0.5">
                        <span class="text-4xl font-light theme-text leading-none">${h12}:${mins}</span>
                        <span class="text-base theme-text-secondary mb-1">${ampm}</span>
                    </div>
                    <div class="text-sm font-medium theme-text mb-1">${alarm.label || 'Alarm'}</div>
                    <div class="flex items-center gap-1 flex-wrap mb-1.5">${_alarmDayCircles(alarm)}</div>
                    <div class="text-xs theme-text-secondary truncate">${_alarmSubtitle(alarm)}</div>
                </div>
                <button onclick="toggleStandaloneAlarm(${i}); event.stopPropagation();"
                    class="relative w-12 h-7 rounded-full transition-colors shrink-0 ${alarm.enabled ? 'bg-orange-500' : 'bg-gray-400 dark:bg-gray-600'}">
                    <span class="absolute top-0.5 transition-all duration-200 w-6 h-6 bg-white rounded-full shadow ${alarm.enabled ? 'right-0.5' : 'left-0.5'}"></span>
                </button>
            </div>
        </div>`;
    }).join('') + '<div class="h-24"></div>';

    // Attach swipe handlers
    list.querySelectorAll('.alarm-row').forEach(row => {
        const content = row.querySelector('.alarm-row-content');
        const delBg   = row.querySelector('.alarm-delete-bg');
        let startX = 0, dx = 0, swiping = false, revealed = false;

        content.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX; dx = 0; swiping = true;
        }, { passive: true });

        content.addEventListener('touchmove', e => {
            if (!swiping) return;
            dx = e.touches[0].clientX - startX;
            if (dx > 0 && !revealed) return;
            const clamp = Math.max(-96, Math.min(0, dx + (revealed ? -96 : 0)));
            content.style.transform = `translateX(${clamp}px)`;
            delBg.style.transform   = `translateX(${100 + clamp/96*100}%)`;
        }, { passive: true });

        content.addEventListener('touchend', () => {
            swiping = false;
            const threshold = revealed ? -48 : -48;
            if (dx < threshold) {
                // reveal delete
                content.style.transform = 'translateX(-96px)';
                delBg.style.transform   = 'translateX(0)';
                revealed = true;
            } else if (revealed && dx > 48) {
                // hide delete
                content.style.transform = '';
                delBg.style.transform   = 'translateX(100%)';
                revealed = false;
            } else {
                content.style.transform = revealed ? 'translateX(-96px)' : '';
                delBg.style.transform   = revealed ? 'translateX(0)' : 'translateX(100%)';
            }
        });

        delBg.addEventListener('click', () => {
            const idx = parseInt(row.dataset.index);
            deleteStandaloneAlarm(idx);
        });
    });
}

function _onAlarmRowTap(index, event) {
    // Only fires if not tapping the toggle or label (those have their own handlers)
    openAlarmEditScreen(index);
}

// ── Edit / Add screen ─────────────────────────────────────────────────────

function openAlarmEditScreen(index) {
    const existing = document.getElementById('alarmEditScreen');
    if (existing) existing.remove();

    const alarms  = getStandaloneAlarms();
    const alarm   = index !== null ? alarms[index] : null;
    const isNew   = alarm === null;

    const now  = new Date();
    const defTime = alarm?.time || `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

    // Initialise tmp state
    localStorage.setItem('_editAlarmRingtoneUri',  alarm?.ringtoneUri  || '');
    localStorage.setItem('_editAlarmRingtoneName', alarm?.ringtoneName || 'Default');
    localStorage.setItem('_editAlarmEqCount',      String(alarm?.eqCount  ?? 2));
    localStorage.setItem('_editAlarmSnoozeMins',   String(alarm?.snoozeMins ?? 5));
    localStorage.setItem('_editAlarmSnoozeLimit',  String(alarm?.snoozeLimit ?? 0));
    localStorage.setItem('_editAlarmGentleWake',   String(alarm?.gentleWake !== false));
    localStorage.setItem('_editAlarmWakeUpCheck',  String(!!alarm?.wakeUpCheck));
    localStorage.setItem('_editAlarmSafetyStop',   String(!!alarm?.safetyStop));
    localStorage.setItem('_editAlarmEqTimer',      String(alarm?.eqTimer ?? 0));
    // Equation types — init from alarm or empty
    _saveEqTypes('_editAlarmEquationTypes', alarm?.equationTypes || []);

    const screen = document.createElement('div');
    screen.id = 'alarmEditScreen';
    screen.className = 'fixed inset-0 z-[300] flex flex-col theme-bg';

    const eqCount   = alarm?.eqCount ?? 2;
    const eqCountLabel = `${eqCount} ${eqCount !== 1 ? t('alarmEqCountPl') : t('alarmEqCount')}`;
    const eqTypesSummary = _eqTypesSummary('_editAlarmEquationTypes', eqCount);
    const snooze    = alarm?.snoozeMins ?? 5;
    const snoozeLabel = snooze === 0 ? 'Off' : `${snooze} min`;
    const gentleWake  = alarm?.gentleWake !== false;
    const wakeUpCheck = !!alarm?.wakeUpCheck;
    const safetyStop  = !!alarm?.safetyStop;
    const eqTimer     = alarm?.eqTimer ?? 0;
    const eqTimerLabel = eqTimer === 0 ? t('alarmTimerOff') : `${eqTimer}s`;

    const repeatOpts = [
        ['none',     t('alarmOneTime')],
        ['daily',    t('alarmEveryDay')],
        ['weekdays', t('alarmWeekdays')],
        ['weekends', t('alarmWeekends')],
        ['weekly',   t('alarmWeekly')]
    ].map(([v,l]) => `<option value="${v}" ${(alarm?.repeat||'none')===v ? 'selected' : ''}>${l}</option>`).join('');

    screen.innerHTML = `
        <div class="flex items-center justify-between px-4 py-4 border-b theme-border shrink-0" style="padding-top: calc(1rem + 22px)">
            <button onclick="document.getElementById('alarmEditScreen').remove()" class="p-2 -ml-2 hover:theme-bg-tertiary rounded-lg transition-colors">
                <svg class="w-5 h-5 theme-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <h2 class="text-lg font-semibold theme-text">${isNew ? t('alarmNewTitle') : t('alarmEditTitle')}</h2>
            <button onclick="saveAlarmEditScreen(${index})" class="text-orange-500 font-semibold text-sm px-2 py-1">${t('save')}</button>
        </div>

        <!-- Large time display -->
        <div class="flex items-center justify-center py-10 border-b theme-border shrink-0">
            <input type="time" id="editAlarmTime" value="${defTime}"
                class="text-6xl font-light theme-text bg-transparent border-none outline-none text-center w-auto">
        </div>

        <!-- Settings rows -->
        <div class="flex-1 overflow-y-auto">
            <!-- Label -->
            <label class="flex items-center px-5 py-4 border-b theme-border gap-4">
                <span class="text-sm theme-text-secondary w-24 shrink-0">${t('alarmLabel')}</span>
                <input type="text" id="editAlarmLabel" value="${alarm?.label || ''}" placeholder="${t('alarmLabel')}" maxlength="40"
                    class="flex-1 bg-transparent theme-text text-sm outline-none text-right placeholder-gray-400">
            </label>
            <!-- Repeat -->
            <label class="flex items-center px-5 py-4 border-b theme-border gap-4">
                <span class="text-sm theme-text-secondary w-24 shrink-0">${t('alarmRepeat')}</span>
                <select id="editAlarmRepeat" class="flex-1 bg-transparent theme-text text-sm outline-none text-right border-none appearance-none">
                    ${repeatOpts}
                </select>
            </label>
            <!-- Sound -->
            <button onclick="_pickEditAlarmRingtone()" class="w-full flex items-center px-5 py-4 border-b theme-border gap-4">
                <span class="text-sm theme-text-secondary w-24 shrink-0 text-left">${t('alarmSound')}</span>
                <span id="editAlarmRingtoneName" class="flex-1 text-sm theme-text text-right truncate">${alarm?.ringtoneName || t('alarmSound')}</span>
                <svg class="w-4 h-4 theme-text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
            <!-- Snooze -->
            <button onclick="_openSnoozePopup()" class="w-full flex items-center px-5 py-4 border-b theme-border gap-4">
                <span class="text-sm theme-text-secondary w-24 shrink-0 text-left">${t('alarmSnooze')}</span>
                <span id="editAlarmSnoozeLabel" class="flex-1 text-sm theme-text text-right">${snoozeLabel}</span>
                <svg class="w-4 h-4 theme-text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
            <!-- Snooze limit -->
            <button onclick="_openSnoozeLimitPopup()" class="w-full flex items-center px-5 py-4 border-b theme-border gap-4">
                <span class="text-sm theme-text-secondary w-24 shrink-0 text-left">${t('alarmSnoozeLimit')}</span>
                <span id="editAlarmSnoozeLimitLabel" class="flex-1 text-sm theme-text text-right">${_snoozeLimitLabel(parseInt(localStorage.getItem('_editAlarmSnoozeLimit') ?? '0'))}</span>
                <svg class="w-4 h-4 theme-text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
            <!-- Equation Types -->
            <button onclick="_openEquationTypePicker('_editAlarmEquationTypes','_editAlarmEqCount','editAlarmEqLabel')" class="w-full flex items-center px-5 py-4 border-b theme-border gap-4">
                <span class="text-sm theme-text-secondary w-24 shrink-0 text-left">${t('alarmEqTypes')}</span>
                <span id="editAlarmEqLabel" class="flex-1 text-sm theme-text text-right">${eqTypesSummary}</span>
                <svg class="w-4 h-4 theme-text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
            <!-- Equation Count -->
            <button onclick="_openEditEqCountPopup()" class="w-full flex items-center px-5 py-4 border-b theme-border gap-4">
                <span class="text-sm theme-text-secondary w-24 shrink-0 text-left">${t('alarmCount')}</span>
                <span id="editAlarmEqCountLabel" class="flex-1 text-sm theme-text text-right">${eqCountLabel}</span>
                <svg class="w-4 h-4 theme-text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
            <!-- Gentle wake -->
            <div class="flex items-center px-5 py-4 border-b theme-border gap-4">
                <div class="flex-1">
                    <div class="text-sm theme-text">${t('alarmGentleWake')}</div>
                    <div class="text-xs theme-text-secondary mt-0.5">${t('alarmGentleDesc')}</div>
                </div>
                <button id="editGentleWakeBtn" onclick="_toggleEditBool('editGentleWakeBtn','_editAlarmGentleWake')"
                    class="relative w-12 h-7 rounded-full transition-colors shrink-0 ${gentleWake ? 'bg-orange-500' : 'bg-gray-400 dark:bg-gray-600'}">
                    <span class="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-all duration-200 ${gentleWake ? 'right-0.5' : 'left-0.5'}"></span>
                </button>
            </div>
            <!-- Wake up check -->
            <div class="flex items-center px-5 py-4 border-b theme-border gap-4">
                <div class="flex-1">
                    <div class="text-sm theme-text">${t('alarmWakeCheck')}</div>
                    <div class="text-xs theme-text-secondary mt-0.5">${t('alarmWakeDesc')}</div>
                </div>
                <button id="editWakeUpCheckBtn" onclick="_toggleEditBool('editWakeUpCheckBtn','_editAlarmWakeUpCheck')"
                    class="relative w-12 h-7 rounded-full transition-colors shrink-0 ${wakeUpCheck ? 'bg-orange-500' : 'bg-gray-400 dark:bg-gray-600'}">
                    <span class="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-all duration-200 ${wakeUpCheck ? 'right-0.5' : 'left-0.5'}"></span>
                </button>
            </div>
            <!-- Safety stop -->
            <div class="flex items-center px-5 py-4 border-b theme-border gap-4">
                <div class="flex-1">
                    <div class="text-sm theme-text">${t('alarmSafetyStop')}</div>
                    <div class="text-xs theme-text-secondary mt-0.5">${t('alarmSafetyDesc')}</div>
                </div>
                <button id="editSafetyStopBtn" onclick="_toggleEditBool('editSafetyStopBtn','_editAlarmSafetyStop')"
                    class="relative w-12 h-7 rounded-full transition-colors shrink-0 ${safetyStop ? 'bg-orange-500' : 'bg-gray-400 dark:bg-gray-600'}">
                    <span class="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-all duration-200 ${safetyStop ? 'right-0.5' : 'left-0.5'}"></span>
                </button>
            </div>
            <!-- Equation timer -->
            <button onclick="_openEditEqTimerPopup()" class="w-full flex items-center px-5 py-4 border-b theme-border gap-4">
                <div class="flex-1">
                    <div class="text-sm theme-text">${t('alarmEqTimer')}</div>
                    <div class="text-xs theme-text-secondary mt-0.5">${t('alarmEqTimerDesc')}</div>
                </div>
                <span id="editAlarmEqTimerLabel" class="text-sm theme-text text-right">${eqTimerLabel}</span>
                <svg class="w-4 h-4 theme-text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
            <!-- Wallpaper -->
            <button onclick="pickAlarmBackground()" class="w-full flex items-center px-5 py-4 border-b theme-border gap-4">
                <span class="text-sm theme-text-secondary w-24 shrink-0 text-left">${t('alarmWallpaper')}</span>
                <span class="flex-1 text-sm theme-text text-right">${t('alarmCustomImg')}</span>
                <svg class="w-4 h-4 theme-text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
            <!-- Preview -->
            <button onclick="_previewEditAlarm()" class="w-full flex items-center px-5 py-4 border-b theme-border gap-4">
                <svg class="w-4 h-4 theme-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span class="flex-1 text-sm theme-text text-left">${t('alarmPreview')}</span>
            </button>
            ${!isNew ? `
            <button onclick="deleteStandaloneAlarm(${index}); document.getElementById('alarmEditScreen')?.remove();"
                class="w-full flex items-center justify-center px-5 py-4 gap-2 text-red-500 text-sm font-medium mt-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                ${t('alarmDelete')}
            </button>` : ''}
            <div class="h-10"></div>
        </div>`;

    document.body.appendChild(screen);
}

function _toggleEditBool(btnId, storageKey) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const current = localStorage.getItem(storageKey) !== 'false' && localStorage.getItem(storageKey) !== null
        ? localStorage.getItem(storageKey) === 'true' || localStorage.getItem(storageKey) !== 'false'
        : false;
    // Actually check the button's current state from its color class
    const isOn = btn.classList.contains('bg-orange-500');
    const newVal = !isOn;
    localStorage.setItem(storageKey, String(newVal));
    btn.classList.toggle('bg-orange-500', newVal);
    btn.classList.toggle('bg-gray-400', !newVal);
    btn.classList.toggle('dark:bg-gray-600', !newVal);
    const dot = btn.querySelector('span');
    if (dot) { dot.classList.toggle('right-0.5', newVal); dot.classList.toggle('left-0.5', !newVal); }
}

function _snoozeLimitLabel(n) {
    if (!n || n === 0) return t('alarmSnoozeLimitUnlimited');
    return `${n} ${n === 1 ? t('alarmSnoozeLimitTimes') : t('alarmSnoozeLimitTimespl')}`;
}

function _openSnoozeLimitPopup() {
    const current = parseInt(localStorage.getItem('_editAlarmSnoozeLimit') ?? '0');
    const opts = [
        [0, t('alarmSnoozeLimitUnlimited')],
        ...[1,2,3,5].map(n => [n, `${n} ${n === 1 ? t('alarmSnoozeLimitTimes') : t('alarmSnoozeLimitTimespl')}`])
    ];
    _showPickerPopup(t('alarmSnoozeLimit'), opts, current, val => {
        localStorage.setItem('_editAlarmSnoozeLimit', String(val));
        const el = document.getElementById('editAlarmSnoozeLimitLabel');
        if (el) el.textContent = _snoozeLimitLabel(parseInt(val));
    });
}

function _evAlarmSnoozeLimitPopup() {
    const current = parseInt(localStorage.getItem('_eventAlarmSnoozeLimit_tmp') ?? '0');
    const opts = [
        [0, t('alarmSnoozeLimitUnlimited')],
        ...[1,2,3,5].map(n => [n, `${n} ${n === 1 ? t('alarmSnoozeLimitTimes') : t('alarmSnoozeLimitTimespl')}`])
    ];
    _showPickerPopup(t('alarmSnoozeLimit'), opts, current, val => {
        localStorage.setItem('_eventAlarmSnoozeLimit_tmp', String(val));
        const el = document.getElementById('evAlarmSnoozeLimitLabel');
        if (el) el.textContent = _snoozeLimitLabel(parseInt(val));
    });
}

function _openSnoozePopup() {
    const current = parseInt(localStorage.getItem('_editAlarmSnoozeMins') ?? '5');
    const opts = [[0,t('alarmSnoozeOff')],[1,`1 ${t('alarmSnoozeMin')}`],[5,`5 ${t('alarmSnoozeMin')}`],
                  [10,`10 ${t('alarmSnoozeMin')}`],[15,`15 ${t('alarmSnoozeMin')}`],[30,`30 ${t('alarmSnoozeMin')}`]];
    _showPickerPopup(t('alarmSnooze'), opts, current, val => {
        localStorage.setItem('_editAlarmSnoozeMins', String(val));
        const lbl = parseInt(val) === 0 ? t('alarmSnoozeOff') : `${val} ${t('alarmSnoozeMin')}`;
        const el = document.getElementById('editAlarmSnoozeLabel');
        if (el) el.textContent = lbl;
    });
}

function _openEditEqCountPopup() {
    const current = parseInt(localStorage.getItem('_editAlarmEqCount') || '2');
    _showPickerPopup(t('alarmCount'),
        [1,2,3,5,7,10].map(n => [n, `${n} ${n !== 1 ? t('alarmEqCountPl') : t('alarmEqCount')}`]),
        current, val => {
            localStorage.setItem('_editAlarmEqCount', String(val));
            const el = document.getElementById('editAlarmEqCountLabel');
            if (el) el.textContent = `${val} ${val !== 1 ? t('alarmEqCountPl') : t('alarmEqCount')}`;
            const el2 = document.getElementById('editAlarmEqLabel');
            if (el2) el2.textContent = _eqTypesSummary('_editAlarmEquationTypes', val);
        });
}

function _openEditEqTimerPopup() {
    const current = parseInt(localStorage.getItem('_editAlarmEqTimer') || '0');
    _showPickerPopup(t('alarmEqTimer'),
        [[0, t('alarmTimerOff')], [30, '30s'], [45, '45s'], [60, '60s'], [90, '90s'], [120, '120s']],
        current, val => {
            localStorage.setItem('_editAlarmEqTimer', String(val));
            const el = document.getElementById('editAlarmEqTimerLabel');
            if (el) el.textContent = val === 0 ? t('alarmTimerOff') : `${val}s`;
        });
}

function _showPickerPopup(title, options, current, onSelect) {
    const existing = document.getElementById('pickerPopup');
    if (existing) existing.remove();

    const sheet = document.createElement('div');
    sheet.id = 'pickerPopup';
    sheet.className = 'fixed inset-0 modal-backdrop flex items-end justify-center z-[400]';

    const inner = document.createElement('div');
    inner.className = 'theme-bg border theme-border rounded-t-2xl w-full max-w-sm p-5 flex flex-col';
    inner.style.cssText = 'max-height:70vh';

    const heading = document.createElement('h3');
    heading.className = 'font-semibold text-sm theme-text mb-3 shrink-0';
    heading.textContent = title;
    inner.appendChild(heading);

    const list = document.createElement('div');
    list.style.cssText = 'overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;flex:1;min-height:0';

    options.forEach(([v, l]) => {
        const btn = document.createElement('button');
        btn.className = 'w-full flex items-center justify-between px-3 py-3 rounded-xl hover:theme-bg-tertiary transition-colors text-sm theme-text' + (v === current ? ' font-semibold text-orange-500' : '');
        btn.innerHTML = `<span>${l}</span>` + (v === current ? '<svg class="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>' : '');
        btn.addEventListener('click', e => {
            e.stopPropagation();
            sheet.remove();
            onSelect(v);
        });
        list.appendChild(btn);
    });

    inner.appendChild(list);
    sheet.appendChild(inner);
    document.body.appendChild(sheet);
    sheet.addEventListener('click', e => { if (e.target === sheet) sheet.remove(); });
}

async function _pickEditAlarmRingtone() {
    const AP = _getAlarmPlugin();
    if (!AP) { alert('Ringtone picker only available in the Android app.'); return; }
    const currentUri = localStorage.getItem('_editAlarmRingtoneUri') || '';
    await AP.pickRingtone({ currentUri });
    const check = async () => {
        try {
            const r = await AP.getRingtoneResult();
            if (r.ready) {
                localStorage.setItem('_editAlarmRingtoneUri',  r.uri  || '');
                localStorage.setItem('_editAlarmRingtoneName', r.name || 'Default');
                const el = document.getElementById('editAlarmRingtoneName');
                if (el) el.textContent = r.name || 'Default';
                document.removeEventListener('visibilitychange', onV);
            }
        } catch(e) {}
    };
    const onV = () => { if (document.visibilityState === 'visible') check(); };
    document.addEventListener('visibilitychange', onV);
    setTimeout(check, 1000);
}

async function _previewEditAlarm() {
    const AP = _getAlarmPlugin();
    if (!AP) { alert('Preview only available in the Android app.'); return; }
    try {
        await AP.previewAlarm({
            equationTypes: JSON.stringify(_getEqTypes('_editAlarmEquationTypes')),
            eqCount:      parseInt(localStorage.getItem('_editAlarmEqCount') || '2'),
            snoozeMins:   parseInt(localStorage.getItem('_editAlarmSnoozeMins') || '5'),
            ringtoneUri:  localStorage.getItem('_editAlarmRingtoneUri') || '',
            gentleWake:   localStorage.getItem('_editAlarmGentleWake') !== 'false',
            eqTimer:      parseInt(localStorage.getItem('_editAlarmEqTimer') || '0'),
        });
    } catch(e) { console.warn('[Alarm] previewAlarm failed:', e); }
}

async function saveAlarmEditScreen(index) {
    const time         = document.getElementById('editAlarmTime')?.value || '08:00';
    const label        = document.getElementById('editAlarmLabel')?.value?.trim() || 'Alarm';
    const repeat       = document.getElementById('editAlarmRepeat')?.value || 'none';
    const equationTypes = _getEqTypes('_editAlarmEquationTypes');
    const eqCount      = parseInt(localStorage.getItem('_editAlarmEqCount')    || '2');
    const snoozeMins   = parseInt(localStorage.getItem('_editAlarmSnoozeMins') || '5');
    const snoozeLimit  = parseInt(localStorage.getItem('_editAlarmSnoozeLimit') ?? '0');
    const ringtoneUri  = localStorage.getItem('_editAlarmRingtoneUri')  || '';
    const ringtoneName = localStorage.getItem('_editAlarmRingtoneName') || 'Default';
    const gentleWake   = localStorage.getItem('_editAlarmGentleWake')  !== 'false';
    const wakeUpCheck  = localStorage.getItem('_editAlarmWakeUpCheck') === 'true';
    const safetyStop   = localStorage.getItem('_editAlarmSafetyStop')  === 'true';
    const eqTimer      = parseInt(localStorage.getItem('_editAlarmEqTimer') || '0');

    if (equationTypes.length === 0) {
        // No types = tap-to-dismiss mode, that's OK
    }

    const alarms = getStandaloneAlarms();

    if (index !== null && alarms[index]) {
        const AP = _getAlarmPlugin();
        if (AP && _isCapacitor()) await AP.cancelAlarm({ eventId: alarms[index].id });
        alarms[index] = { ...alarms[index], time, label, repeat, equationTypes, eqCount, snoozeMins, snoozeLimit, ringtoneUri, ringtoneName, gentleWake, wakeUpCheck, safetyStop, eqTimer };
        saveStandaloneAlarms(alarms);
        await scheduleStandaloneAlarm(alarms[index]);
    } else {
        const alarm = { id: Date.now(), time, label, repeat, equationTypes, eqCount, snoozeMins, snoozeLimit, ringtoneUri, ringtoneName, gentleWake, wakeUpCheck, safetyStop, eqTimer, enabled: true };
        alarms.push(alarm);
        saveStandaloneAlarms(alarms);
        await scheduleStandaloneAlarm(alarm);
    }

    document.getElementById('alarmEditScreen')?.remove();
    _renderAlarmList();
}

function getNextAlarmFire(alarm) {
    const [h, m] = alarm.time.split(':').map(Number);
    const now  = new Date();
    const fire = new Date();
    fire.setHours(h, m, 0, 0);

    const repeat = alarm.repeat || 'none';
    if (repeat === 'none') {
        if (fire.getTime() <= now.getTime()) fire.setDate(fire.getDate() + 1);
        return fire;
    }

    for (let i = 0; i < 8; i++) {
        const candidate = new Date(fire);
        candidate.setDate(fire.getDate() + i);
        if (i === 0 && candidate.getTime() <= now.getTime()) continue;
        const day = candidate.getDay();
        if (repeat === 'daily')    return candidate;
        if (repeat === 'weekdays' && day >= 1 && day <= 5) return candidate;
        if (repeat === 'weekends' && (day === 0 || day === 6)) return candidate;
        if (repeat === 'weekly') {
            const created = new Date(alarm.id);
            if (day === created.getDay()) return candidate;
        }
    }
    if (fire.getTime() <= now.getTime()) fire.setDate(fire.getDate() + 1);
    return fire;
}

async function scheduleStandaloneAlarm(alarm) {
    if (!alarm.enabled) return;
    const AP = _getAlarmPlugin();
    if (!AP || !_isCapacitor()) return;
    const fire = getNextAlarmFire(alarm);

    // Stamp nextTimestamp onto the alarm object before persisting
    alarm.nextTimestamp = fire.getTime();

    // Re-persist the full alarm list with the updated nextTimestamp
    // so BootReceiver can reschedule directly from SharedPreferences on reboot
    const allAlarms = getStandaloneAlarms();
    const idx = allAlarms.findIndex(a => a.id === alarm.id);
    if (idx !== -1) { allAlarms[idx] = alarm; saveStandaloneAlarms(allAlarms); }

    try {
        await AP.scheduleAlarm({
            eventId:       alarm.id,
            title:         alarm.label,
            time:          alarm.time,
            timestamp:     fire.getTime(),
            equationTypes: JSON.stringify(alarm.equationTypes || []),
            eqCount:       alarm.eqCount || 2,
            snoozeMins:    alarm.snoozeMins,
            snoozeLimit:   alarm.snoozeLimit ?? 0,
            ringtoneUri:   alarm.ringtoneUri || '',
            gentleWake:    alarm.gentleWake !== false,
            wakeUpCheck:   !!alarm.wakeUpCheck,
            safetyStop:    !!alarm.safetyStop,
            eqTimer:       alarm.eqTimer || 0,
        });
    } catch(e) { console.warn('[Alarm] scheduleStandaloneAlarm failed:', e); }
}

async function toggleStandaloneAlarm(index) {
    const alarms = getStandaloneAlarms();
    if (!alarms[index]) return;
    alarms[index].enabled = !alarms[index].enabled;
    saveStandaloneAlarms(alarms);

    const AP = _getAlarmPlugin();
    if (AP && _isCapacitor()) {
        if (alarms[index].enabled) await scheduleStandaloneAlarm(alarms[index]);
        else await AP.cancelAlarm({ eventId: alarms[index].id });
    }
    _renderAlarmList();
}

async function deleteStandaloneAlarm(index) {
    const alarms = getStandaloneAlarms();
    const alarm  = alarms[index];
    if (!alarm) return;
    const AP = _getAlarmPlugin();
    if (AP && _isCapacitor()) await AP.cancelAlarm({ eventId: alarm.id });
    alarms.splice(index, 1);
    saveStandaloneAlarms(alarms);
    _renderAlarmList();
}

// ══════════════════════════════════════════════════════════════════════════
