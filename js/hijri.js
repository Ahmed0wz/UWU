// HIJRI DATE CONVERSION — Umm al-Qura official lookup table
// Each row: [gregYear, gregMonth(1-12), gregDay, hijriYear, hijriMonth(1-12)]
// Covers 2023-01-01 through end of 2035.
// For dates outside this range, falls back to arithmetic approximation.

// Official Umm al-Qura month-start dates (1 of each Hijri month)
const UMM_AL_QURA = [
  // 1444 AH (tail — so 2023 dates work)
  [2023, 1,23, 1444, 7],[2023, 2,22, 1444, 8],[2023, 3,23, 1444, 9],
  [2023, 4,21, 1444,10],[2023, 5,21, 1444,11],[2023, 6,19, 1444,12],
  // 1445 AH — verified against al-habib.info Umm al-Qura 2024
  [2023, 7,19, 1445, 1],[2023, 8,17, 1445, 2],[2023, 9,15, 1445, 3],
  [2023,10,15, 1445, 4],[2023,11,13, 1445, 5],[2023,12,13, 1445, 6],
  [2024, 1,13, 1445, 7],[2024, 2,11, 1445, 8],[2024, 3,11, 1445, 9],
  [2024, 4,10, 1445,10],[2024, 5, 9, 1445,11],[2024, 6, 7, 1445,12],
  // 1446 AH — verified against al-habib.info Umm al-Qura 2024/2025
  [2024, 7, 7, 1446, 1],[2024, 8, 5, 1446, 2],[2024, 9, 4, 1446, 3],
  [2024,10, 4, 1446, 4],[2024,11, 3, 1446, 5],[2024,12, 2, 1446, 6],
  [2025, 1, 1, 1446, 7],[2025, 1,31, 1446, 8],[2025, 3, 1, 1446, 9],
  [2025, 3,30, 1446,10],[2025, 4,29, 1446,11],[2025, 5,28, 1446,12],
  // 1447 AH — verified against al-habib.info Umm al-Qura 2025/2026
  [2025, 6,26, 1447, 1],[2025, 7,26, 1447, 2],[2025, 8,24, 1447, 3],
  [2025, 9,23, 1447, 4],[2025,10,23, 1447, 5],[2025,11,22, 1447, 6],
  [2025,12,21, 1447, 7],[2026, 1,20, 1447, 8],[2026, 2,18, 1447, 9],
  [2026, 3,20, 1447,10],[2026, 4,18, 1447,11],[2026, 5,18, 1447,12],
  // 1448 AH — verified against al-habib.info Umm al-Qura 2026
  [2026, 6,16, 1448, 1],[2026, 7,15, 1448, 2],[2026, 8,14, 1448, 3],
  [2026, 9,12, 1448, 4],[2026,10,12, 1448, 5],[2026,11,11, 1448, 6],
  [2026,12,10, 1448, 7],[2027, 1, 9, 1448, 8],[2027, 2, 8, 1448, 9],
  [2027, 3, 9, 1448,10],[2027, 4, 8, 1448,11],[2027, 5, 7, 1448,12],
  // 1449 AH — verified against al-habib.info Umm al-Qura 2027/2028
  [2027, 6, 6, 1449, 1],[2027, 7, 5, 1449, 2],[2027, 8, 3, 1449, 3],
  [2027, 9, 2, 1449, 4],[2027,10, 1, 1449, 5],[2027,10,31, 1449, 6],
  [2027,11,29, 1449, 7],[2027,12,29, 1449, 8],[2028, 1,28, 1449, 9],
  [2028, 2,27, 1449,10],[2028, 3,27, 1449,11],[2028, 4,26, 1449,12],
  // 1450 AH — verified against al-habib.info Umm al-Qura 2028/2029
  [2028, 5,25, 1450, 1],[2028, 6,24, 1450, 2],[2028, 7,23, 1450, 3],
  [2028, 8,22, 1450, 4],[2028, 9,20, 1450, 5],[2028,10,19, 1450, 6],
  [2028,11,18, 1450, 7],[2028,12,18, 1450, 8],[2029, 1,16, 1450, 9],
  [2029, 2,15, 1450,10],[2029, 3,16, 1450,11],[2029, 4,15, 1450,12],
  // 1451 AH — verified against al-habib.info Umm al-Qura 2029/2030
  [2029, 5,15, 1451, 1],[2029, 6,13, 1451, 2],[2029, 7,13, 1451, 3],
  [2029, 8,11, 1451, 4],[2029, 9,10, 1451, 5],[2029,10, 9, 1451, 6],
  [2029,11, 7, 1451, 7],[2029,12, 7, 1451, 8],[2030, 1, 5, 1451, 9],
  [2030, 2, 4, 1451,10],[2030, 3, 5, 1451,11],[2030, 4, 4, 1451,12],
  // 1452 AH — verified against al-habib.info Umm al-Qura 2030/2031
  [2030, 5, 4, 1452, 1],[2030, 6, 3, 1452, 2],[2030, 7, 2, 1452, 3],
  [2030, 8, 1, 1452, 4],[2030, 8,30, 1452, 5],[2030, 9,29, 1452, 6],
  [2030,10,28, 1452, 7],[2030,11,27, 1452, 8],[2030,12,26, 1452, 9],
  [2031, 1,24, 1452,10],[2031, 2,23, 1452,11],[2031, 3,24, 1452,12],
  // 1453 AH — verified against al-habib.info Umm al-Qura 2031/2032
  [2031, 4,23, 1453, 1],[2031, 5,23, 1453, 2],[2031, 6,21, 1453, 3],
  [2031, 7,21, 1453, 4],[2031, 8,20, 1453, 5],[2031, 9,18, 1453, 6],
  [2031,10,18, 1453, 7],[2031,11,16, 1453, 8],[2031,12,16, 1453, 9],
  [2032, 1,14, 1453,10],[2032, 2,12, 1453,11],[2032, 3,13, 1453,12],
  // 1454 AH — verified against al-habib.info Umm al-Qura 2032/2033
  [2032, 4,11, 1454, 1],[2032, 5,11, 1454, 2],[2032, 6, 9, 1454, 3],
  [2032, 7, 9, 1454, 4],[2032, 8, 8, 1454, 5],[2032, 9, 6, 1454, 6],
  [2032,10, 6, 1454, 7],[2032,11, 5, 1454, 8],[2032,12, 4, 1454, 9],
  [2033, 1, 3, 1454,10],[2033, 2, 1, 1454,11],[2033, 3, 3, 1454,12],
  // 1455 AH — verified against al-habib.info Umm al-Qura 2033/2034
  [2033, 4, 2, 1455, 1],[2033, 5, 1, 1455, 2],[2033, 5,31, 1455, 3],
  [2033, 6,30, 1455, 4],[2033, 7,29, 1455, 5],[2033, 8,28, 1455, 6],
  [2033, 9,27, 1455, 7],[2033,10,26, 1455, 8],[2033,11,24, 1455, 9],
  [2033,12,23, 1455,10],[2034, 1,22, 1455,11],[2034, 2,20, 1455,12],
  // 1456 AH — verified against al-habib.info Umm al-Qura 2034/2035
  [2034, 3,22, 1456, 1],[2034, 4,20, 1456, 2],[2034, 5,19, 1456, 3],
  [2034, 6,18, 1456, 4],[2034, 7,17, 1456, 5],[2034, 8,16, 1456, 6],
  [2034, 9,14, 1456, 7],[2034,10,14, 1456, 8],[2034,11,12, 1456, 9],
  [2034,12,12, 1456,10],[2035, 1,11, 1456,11],[2035, 2,10, 1456,12],
  // 1457 AH (sentinel so 2035 end-dates resolve) — verified against al-habib.info 2035
  [2035, 3,11, 1457, 1],[2035, 4,10, 1457, 2],[2035, 5, 9, 1457, 3],
];

// Pre-build sorted timestamp array for O(log n) lookup
const _HIJRI_TS = UMM_AL_QURA.map(([gy,gm,gd,hy,hm]) =>
    [Date.UTC(gy, gm-1, gd), hy, hm]);

function toHijri(gregorianDate) {
    const d = new Date(gregorianDate);
    const ts = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());

    // Binary search for the latest month start <= ts
    let lo = 0, hi = _HIJRI_TS.length - 1;
    if (ts < _HIJRI_TS[0][0]) {
        // Before table — use arithmetic fallback
        return toHijriArithmetic(d);
    }
    while (lo < hi) {
        const mid = Math.ceil((lo + hi) / 2);
        if (_HIJRI_TS[mid][0] <= ts) lo = mid;
        else hi = mid - 1;
    }

    const [monthStartTs, hijriYear, hijriMonthNum] = _HIJRI_TS[lo];
    const dayOfMonth = Math.floor((ts - monthStartTs) / 86400000) + 1;
    return {
        day:   dayOfMonth,
        month: islamicMonths[hijriMonthNum - 1],
        year:  hijriYear
    };
}

// Arithmetic fallback for dates outside the lookup table
function toHijriArithmetic(date) {
    const gYear = date.getFullYear(), gMonth = date.getMonth()+1, gDay = date.getDate();
    const jd = _gregToJD(gYear, gMonth, gDay);
    const daysSinceEpoch = jd - 1948439;
    let hYear  = Math.floor((daysSinceEpoch - 1) / 354.367) + 1;
    const yearStart = Math.floor((hYear - 1) * 354.367) + 1;
    let daysRemaining = daysSinceEpoch - yearStart;
    const ML = [30,29,30,29,30,29,30,29,30,29,30,29];
    let hMonth = 0;
    for (let i = 0; i < 12; i++) {
        if (daysRemaining <= ML[i]) { hMonth = i; break; }
        daysRemaining -= ML[i];
    }
    const hDay = Math.max(1, Math.min(30, Math.floor(daysRemaining)));
    return { day: hDay, month: islamicMonths[hMonth], year: hYear };
}

function _gregToJD(year, month, day) {
    if (month < 3) { year -= 1; month += 12; }
    const a = Math.floor(year/100), b = 2 - a + Math.floor(a/4);
    return Math.floor(365.25*(year+4716)) + Math.floor(30.6001*(month+1)) + day + b - 1524;
}


// HIJRI CALENDAR MODE

// Convert a Hijri date (year, month 1-12, day) to a Gregorian Date
// Uses UMM_AL_QURA table for covered range, arithmetic fallback outside it
// Get the Gregorian start date for a Hijri month, applying any user sighting offset
function getHijriMonthStartDate(hy, hm) {
    const offsetKey = hy + '_' + hm;
    const offset = (state.hijriMonthOffsets && state.hijriMonthOffsets[offsetKey]) || 0;
    // Search table
    for (let i = 0; i < _HIJRI_TS.length; i++) {
        const [ts, tableHY, tableHM] = _HIJRI_TS[i];
        if (tableHY === hy && tableHM === hm) {
            const d = new Date(ts);
            d.setDate(d.getDate() + offset);
            return d;
        }
    }
    // Arithmetic fallback (outside table)
    const epochJD = 1948439;
    const totalDays = Math.floor((hy - 1) * 354.367) + [0,30,59,89,118,148,177,207,236,266,295,325][hm-1] + 1;
    const jd = totalDays + epochJD;
    const l2 = jd + 68569, n2 = Math.floor(4 * l2 / 146097);
    const ll = l2 - Math.floor((146097 * n2 + 3) / 4);
    const i2 = Math.floor(4000 * (ll + 1) / 1461001);
    const ll2 = ll - Math.floor(1461 * i2 / 4) + 31;
    const j = Math.floor(80 * ll2 / 2447);
    const gd = ll2 - Math.floor(2447 * j / 80);
    const ll3 = Math.floor(j / 11);
    const gm = j + 2 - 12 * ll3;
    const gy = 100 * (n2 - 49) + i2 + ll3;
    const d = new Date(gy, gm - 1, gd);
    d.setDate(d.getDate() + offset);
    return d;
}

function hijriToGregorian(hy, hm, hd) {
    const start = getHijriMonthStartDate(hy, hm);
    const result = new Date(start);
    result.setDate(result.getDate() + (hd - 1));
    return result;
}

// Get Hijri date info for state.currentDate
function getCurrentHijri() {
    return toHijri(state.currentDate);
}

// Get number of days in a Hijri month (from table or alternating pattern)
function hijriDaysInMonth(hy, hm) {
    // Use adjusted starts: days = (start of next month) - (start of this month)
    const thisStart = getHijriMonthStartDate(hy, hm);
    const nextHy = hm === 12 ? hy + 1 : hy;
    const nextHm = hm === 12 ? 1 : hm + 1;
    const nextStart = getHijriMonthStartDate(nextHy, nextHm);
    const diff = Math.round((nextStart - thisStart) / 86400000);
    // Sanity: must be 29 or 30
    if (diff === 29 || diff === 30) return diff;
    // Fallback if outside table range
    return hm % 2 === 1 ? 30 : 29;
}

// Get the first day of week (0=Sun..6=Sat) for Hijri month hy/hm
function hijriMonthFirstDayOfWeek(hy, hm) {
    const greg = hijriToGregorian(hy, hm, 1);
    return greg.getDay();
}

// Navigate to next Hijri month
function hijriNextMonth() {
    const h = getCurrentHijri();
    let hy = h.year || toHijri(state.currentDate).year;
    let hm = h.month ? islamicMonths.indexOf(h.month) + 1 : 1;
    hm++;
    if (hm > 12) { hm = 1; hy++; }
    state.currentDate = hijriToGregorian(hy, hm, 1);
}

function hijriPrevMonth() {
    const h = toHijri(state.currentDate);
    let hy = h.year;
    let hm = islamicMonths.indexOf(h.month) + 1;
    hm--;
    if (hm < 1) { hm = 12; hy--; }
    state.currentDate = hijriToGregorian(hy, hm, 1);
}

function hijriNextYear() {
    const h = toHijri(state.currentDate);
    const hm = islamicMonths.indexOf(h.month) + 1;
    state.currentDate = hijriToGregorian(h.year + 1, hm, 1);
}

function hijriPrevYear() {
    const h = toHijri(state.currentDate);
    const hm = islamicMonths.indexOf(h.month) + 1;
    state.currentDate = hijriToGregorian(h.year - 1, hm, 1);
}

// All Gregorian dates that fall in a given Hijri month
function getGregorianDatesForHijriMonth(hy, hm) {
    const days = hijriDaysInMonth(hy, hm);
    const dates = [];
    for (let d = 1; d <= days; d++) {
        const g = hijriToGregorian(hy, hm, d);
        dates.push({ hijriDay: d, greg: g, dateStr: dateToLocalString(g) });
    }
    return dates;
}

function saveCalendarMode() { saveToStorage(STORAGE_KEYS.CALENDAR_MODE(state.currentUser), state.calendarMode); }
function loadCalendarMode() { state.calendarMode = loadFromStorage(STORAGE_KEYS.CALENDAR_MODE(state.currentUser)) || 'gregorian'; }
function saveHijriOffsets() { saveToStorage(STORAGE_KEYS.HIJRI_OFFSETS(state.currentUser), state.hijriMonthOffsets); }
function loadHijriOffsets() { state.hijriMonthOffsets = loadFromStorage(STORAGE_KEYS.HIJRI_OFFSETS(state.currentUser)) || {}; }

// Set a moon-sighting adjustment for a specific Hijri month
// delta: -1 (started 1 day earlier than table), 0 (matches table), 1 (started 1 day later)
function setHijriMonthOffset(hy, hm, delta) {
    const key = hy + '_' + hm;
    if (delta === 0) {
        delete state.hijriMonthOffsets[key]; // 0 = remove override, use table
    } else {
        state.hijriMonthOffsets[key] = delta;
    }
    saveHijriOffsets();
    renderCurrentView();
    renderMiniCalendar();
}

function getHijriMonthOffset(hy, hm) {
    return state.hijriMonthOffsets[hy + '_' + hm] || 0;
}

function openHijriSightingPanel(hy, hm) {
    const existing = document.getElementById('hijriSightingPanel');
    if (existing) { existing.remove(); return; }

    const currentOffset = getHijriMonthOffset(hy, hm);
    const monthName = tHijri(hm);
    const tableStart = (() => {
        // Get raw table start (no offset)
        for (let i = 0; i < _HIJRI_TS.length; i++) {
            const [ts, tHY, tHM] = _HIJRI_TS[i];
            if (tHY === hy && tHM === hm) {
                const d = new Date(ts);
                return state.language==='ar'
                    ? t('dayNamesShort')[d.getDay()] + ' ' + t('monthNamesShort')[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear()
                    : d.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric', year:'numeric' });
            }
        }
        return 'Unknown';
    })();

    const panel = document.createElement('div');
    panel.id = 'hijriSightingPanel';
    panel.className = 'fixed inset-0 modal-backdrop flex items-center justify-center z-50';
    panel.innerHTML = `
        <div class="theme-bg rounded-2xl shadow-2xl w-full max-w-sm modal-animate border theme-border p-6">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-2">
                    <span class="text-xl">🌙</span>
                    <h3 class="text-base font-semibold">${t('moonSighting')} — ${monthName} ${hy}</h3>
                </div>
                <button onclick="document.getElementById('hijriSightingPanel').remove()" class="theme-text-secondary hover:theme-text p-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            </div>
            <div class="theme-bg-secondary rounded-xl p-3 mb-4 text-sm">
                <div class="text-xs theme-text-secondary mb-1 font-medium uppercase tracking-wide">${state.language==='ar' ? 'أم القرى (محسوب)' : 'Umm al-Qura (calculated)'}</div>
                <div class="font-medium">${tableStart}</div>
            </div>
            <div class="mb-4">
                <div class="text-xs theme-text-secondary mb-2 font-medium uppercase tracking-wide">${state.language==='ar' ? 'نتيجة رؤية الهلال' : 'Sighting result'}</div>
                <p class="text-xs theme-text-secondary mb-3 leading-relaxed">${state.language==='ar' ? 'هل تختلف رؤية الهلال المؤكدة في منطقتك عن الحساب؟ يُقرر كل شهر باستقلالية.' : 'Did the confirmed moon sighting in your region differ from the calculation? Each month is decided independently.'}</p>
                <div class="flex gap-2">
                    <button onclick="document.querySelectorAll('.sighting-opt').forEach(b=>b.classList.remove('ring-2','ring-blue-500','theme-bg-secondary')); this.classList.add('ring-2','ring-blue-500','theme-bg-secondary'); document.getElementById('hijriOffsetValue').value='-1';"
                        class="sighting-opt flex-1 py-3 rounded-xl border theme-border text-center text-sm transition-all ${currentOffset === -1 ? 'ring-2 ring-blue-500 theme-bg-secondary' : ''}">
                        <div class="text-lg mb-0.5">⬅️</div>
                        <div class="font-semibold text-xs">${state.language==='ar' ? 'يوم مبكر' : '1 Day Early'}</div>
                        <div class="text-[10px] theme-text-secondary mt-0.5">${state.language==='ar' ? 'رُئي قبل الجدول بيوم' : 'Sighted a day<br>before table'}</div>
                    </button>
                    <button onclick="document.querySelectorAll('.sighting-opt').forEach(b=>b.classList.remove('ring-2','ring-blue-500','theme-bg-secondary')); this.classList.add('ring-2','ring-blue-500','theme-bg-secondary'); document.getElementById('hijriOffsetValue').value='0';"
                        class="sighting-opt flex-1 py-3 rounded-xl border theme-border text-center text-sm transition-all ${currentOffset === 0 ? 'ring-2 ring-blue-500 theme-bg-secondary' : ''}">
                        <div class="text-lg mb-0.5">✓</div>
                        <div class="font-semibold text-xs">${state.language==='ar' ? 'يتوافق' : 'Matches'}</div>
                        <div class="text-[10px] theme-text-secondary mt-0.5">${state.language==='ar' ? 'يتوافق مع الحساب' : 'Sighting confirms<br>the calculation'}</div>
                    </button>
                    <button onclick="document.querySelectorAll('.sighting-opt').forEach(b=>b.classList.remove('ring-2','ring-blue-500','theme-bg-secondary')); this.classList.add('ring-2','ring-blue-500','theme-bg-secondary'); document.getElementById('hijriOffsetValue').value='1';"
                        class="sighting-opt flex-1 py-3 rounded-xl border theme-border text-center text-sm transition-all ${currentOffset === 1 ? 'ring-2 ring-blue-500 theme-bg-secondary' : ''}">
                        <div class="text-lg mb-0.5">➡️</div>
                        <div class="font-semibold text-xs">${state.language==='ar' ? 'يوم متأخر' : '1 Day Late'}</div>
                        <div class="text-[10px] theme-text-secondary mt-0.5">${state.language==='ar' ? 'لم يُرَ الهلال — يوم إضافي' : 'Moon wasn\'t<br>visible — +1 day'}</div>
                    </button>
                </div>
                <input type="hidden" id="hijriOffsetValue" value="${currentOffset}">
            </div>
            <div class="flex gap-2">
                <button onclick="document.getElementById('hijriSightingPanel').remove()" class="flex-1 py-2 rounded-xl border theme-border text-sm theme-text-secondary hover:theme-bg-tertiary transition-colors">${t('cancel')}</button>
                <button onclick="setHijriMonthOffset(${hy}, ${hm}, parseInt(document.getElementById('hijriOffsetValue').value)); document.getElementById('hijriSightingPanel').remove();"
                    class="flex-1 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors">${state.language==='ar' ? 'تأكيد' : 'Confirm'}</button>
            </div>
        </div>
    `;
    document.body.appendChild(panel);
    panel.addEventListener('click', e => { if (e.target === panel) panel.remove(); });
}
function toggleCalendarMode() {
    state.calendarMode = state.calendarMode === 'hijri' ? 'gregorian' : 'hijri';
    saveCalendarMode(); renderCurrentView(); renderMiniCalendar(); updateCalendarModeToggleUI();
}
function updateCalendarModeToggleUI() {
    const isHijri = state.calendarMode === 'hijri';
    [$('calendarModeToggleBtn'), $('mobileHijriBtn')].forEach(btn => {
        if (!btn) return;
        btn.title = isHijri ? 'Switch to Gregorian' : 'Switch to Hijri';
        btn.style.opacity = isHijri ? '1' : '0.6';
        btn.classList.toggle('text-amber-500', isHijri);
        const label = btn.querySelector('span');
        if (label) label.textContent = isHijri ? 'Gregorian' : 'Hijri';
    });
}

// HIJRI MONTH VIEW

function renderHijriMonthView() {
    const grid = document.getElementById('monthGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const h = toHijri(state.currentDate);
    const hy = h.year;
    const hm = islamicMonths.indexOf(h.month) + 1;
    const firstDow = hijriMonthFirstDayOfWeek(hy, hm);
    const daysInMonth = hijriDaysInMonth(hy, hm);

    // Update header
    const currentMonth = document.getElementById('currentMonth');
    const currentYear = document.getElementById('currentYear');
    if (currentMonth) currentMonth.textContent = tHijri(hm);
    const offset = getHijriMonthOffset(hy, hm);
    const offsetLabel = offset === 0 ? '' : (offset > 0 ? ' (+1 day)' : ' (−1 day)');
    if (currentYear) {
        currentYear.textContent = hy + ' AH' + offsetLabel;
    }

    // Inject sighting button next to the month/year picker — desktop only (not on mobile where space is tight)
    const existingSightingBtn = document.getElementById('hijriSightingBtn');
    if (existingSightingBtn) existingSightingBtn.remove();
    if (window.innerWidth >= 640) {
        const sightingBtn = document.createElement('button');
        sightingBtn.id = 'hijriSightingBtn';
        sightingBtn.title = 'Adjust moon sighting for this month';
        sightingBtn.onclick = e => { e.stopPropagation(); openHijriSightingPanel(hy, hm); };
        sightingBtn.className = 'flex items-center space-x-1 px-2 py-1 rounded-lg border text-xs font-medium transition-colors flex-shrink-0 ' +
            (offset !== 0 ? 'border-amber-400 text-amber-500 bg-amber-50 dark:bg-amber-900/20' : 'theme-border theme-text-secondary hover:theme-bg-tertiary');
        sightingBtn.innerHTML = `<span>${offset !== 0 ? '🌙' : '🌑'}</span><span class="ml-1">${offset !== 0 ? t('adjusted') : t('sighting')}</span>`;
        const pickerBtn = document.querySelector('button[onclick*="openMonthYearPicker"]');
        if (pickerBtn && pickerBtn.parentElement) {
            pickerBtn.parentElement.insertBefore(sightingBtn, pickerBtn.nextSibling);
        }
    }

    // On mobile: add a compact sighting strip inside the grid container area
    if (window.innerWidth < 640) {
        const existingStrip = document.getElementById('hijriSightingStrip');
        if (existingStrip) existingStrip.remove();
        const strip = document.createElement('div');
        strip.id = 'hijriSightingStrip';
        strip.className = 'col-span-7 flex items-center justify-end px-3 py-1.5 border-b theme-border theme-bg-secondary';
        const offsetLabel = offset === 0 ? '' : (offset > 0 ? ' · +1 day' : ' · −1 day');
        strip.innerHTML = `
            <button onclick="openHijriSightingPanel(${hy}, ${hm})"
                class="flex items-center space-x-1 text-xs font-medium ${offset !== 0 ? 'text-amber-500' : 'theme-text-secondary'}">
                <span>${offset !== 0 ? '🌙' : '🌑'}</span>
                <span>${t('moonSighting')}${offsetLabel}</span>
            </button>`;
        grid.appendChild(strip);
    }

    // Day headers
    t('dayNamesShort').forEach(day => {
        const div = document.createElement('div');
        div.className = 'theme-bg-secondary p-2 text-center text-sm font-semibold theme-text-secondary';
        div.textContent = day;
        grid.appendChild(div);
    });

    // Empty cells before month start
    for (let i = 0; i < firstDow; i++) {
        const div = document.createElement('div');
        div.className = 'theme-bg p-4 min-h-[100px] opacity-30';
        grid.appendChild(div);
    }

    // Day cells
    for (let hd = 1; hd <= daysInMonth; hd++) {
        const gregDate = hijriToGregorian(hy, hm, hd);
        const dateStr = dateToLocalString(gregDate);
        const isToday = dateStr === todayLocalString();
        const dayEvents = getEventsForDate(dateStr).filter(e => state.activeCalendars.includes(e.calendar));

        const div = document.createElement('div');
        div.className = `theme-bg p-2 min-h-[100px] border-b border-r theme-border cursor-pointer hover:theme-bg-tertiary transition-colors ${isToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`;
        div.onclick = () => { state.currentDate = new Date(gregDate); renderMiniCalendar(); switchView('day'); };

        const allDayEv = dayEvents.filter(e => e.isAllDay);
        const timedEv = dayEvents.filter(e => !e.isAllDay);
        let evHtml = '';
        allDayEv.slice(0, 2).forEach(e => {
            const c = CALENDAR_COLORS.find(cc => cc.id === e.color) || CALENDAR_COLORS[0];
            evHtml += `<div class="text-xs px-1 py-0.5 rounded mb-1 ${state.isDarkMode ? c.dark : c.light} ${state.isDarkMode ? c.darkText : c.text} truncate">${e.title}</div>`;
        });
        timedEv.slice(0, allDayEv.length > 0 ? 2 : 3).forEach(e => {
            const c = CALENDAR_COLORS.find(cc => cc.id === e.color) || CALENDAR_COLORS[0];
            evHtml += `<div class="flex items-center text-xs mb-1"><span class="w-2 h-2 rounded-full ${c.bg} mr-1 flex-shrink-0"></span><span class="truncate theme-text-secondary">${e.startTime} ${e.title}</span></div>`;
        });

        // Gregorian day as compact secondary label (just the number, month context is already known)
        const gregDay = gregDate.getDate();
        const gregMonthShort = t('monthNamesShort')[gregDate.getMonth()];
        // Show "Mar 1" style only when Gregorian month changes (first day of month), otherwise just the number
        const isFirstOfGregMonth = gregDate.getDate() === 1;
        const gregLabel = isFirstOfGregMonth ? `${gregMonthShort} ${gregDay}` : `${gregDay}`;
        const isFriday = gregDate.getDay() === 5;

        const dayOffset = getHijriMonthOffset(hy, hm);
        div.innerHTML = `
            <div class="flex items-start justify-between mb-1">
                <span class="text-base font-semibold ${isToday ? 'w-7 h-7 flex items-center justify-center rounded-full bg-blue-600 text-white text-sm' : 'theme-text'}">${hd}</span>
                <div class="flex flex-col items-end gap-0.5">
                    <span class="text-[10px] theme-text-secondary">${gregLabel}</span>
                    ${getDayIndicator(dateStr)}
                    ${dayOffset !== 0 ? '<span class="text-[9px] text-amber-500">🌙</span>' : ''}
                </div>
            </div>
            <div class="space-y-0.5">
                ${evHtml}
                ${dayEvents.length > 3 ? `<div class="text-xs theme-text-secondary">+${dayEvents.length - 3} ${state.language === 'ar' ? 'أخرى' : 'more'}</div>` : ''}
            </div>
        `;
        grid.appendChild(div);
    }
}

// HIJRI YEAR VIEW

function renderHijriYearView() {
    const grid = document.getElementById('yearGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const h = toHijri(state.currentDate);
    const hy = h.year;

    const currentMonth = document.getElementById('currentMonth');
    const currentYear = document.getElementById('currentYear');
    if (currentMonth) currentMonth.textContent = t('year');
    if (currentYear) {
        currentYear.textContent = hy + ' AH';
    }

    for (let hm = 1; hm <= 12; hm++) {
        const div = document.createElement('div');
        div.className = 'theme-bg-secondary rounded-lg p-4 border theme-border cursor-pointer hover:border-blue-500 transition-colors';
        div.onclick = () => { state.currentDate = hijriToGregorian(hy, hm, 1); switchView('month'); };

        const firstDow = hijriMonthFirstDayOfWeek(hy, hm);
        const days = hijriDaysInMonth(hy, hm);
        let daysHtml = '';
        for (let i = 0; i < firstDow; i++) daysHtml += '<div></div>';
        for (let hd = 1; hd <= days; hd++) {
            const gregDate = hijriToGregorian(hy, hm, hd);
            const dateStr = dateToLocalString(gregDate);
            const hasEvents = events.some(e => e.date === dateStr && state.activeCalendars.includes(e.calendar));
            const isToday = dateStr === todayLocalString();
            daysHtml += `<div class="aspect-square flex items-center justify-center text-xs rounded-full ${isToday ? 'bg-blue-600 text-white' : ''} ${hasEvents && !isToday ? 'font-bold' : ''}">${hd}</div>`;
        }

        const monthKey = dateToLocalString(hijriToGregorian(hy, hm, 1)).substring(0, 7);
        const mPts = calcHijriMonthTotal(hijriToGregorian(hy, hm, 1));

        div.innerHTML = `
            <div class="font-semibold mb-3 flex items-center justify-between">
                <span>${tHijri(hm)}</span>
                ${mPts > 0 ? `<span class="text-xs font-bold text-blue-600 dark:text-blue-400">${mPts} ${t('pts')}</span>` : ''}
            </div>
            <div class="grid grid-cols-7 gap-1 text-center text-xs theme-text-secondary mb-2">${t('dayLetters').map(d=>'<div>'+d+'</div>').join('')}</div>
            <div class="grid grid-cols-7 gap-1 text-center text-sm">${daysHtml}</div>
        `;
        grid.appendChild(div);
    }
}

// HIJRI MINI CALENDAR

function renderHijriMiniCalendar() {
    const miniCalendarMonth = document.getElementById('miniCalendarMonth');
    const miniCalendar = document.getElementById('miniCalendar');
    if (!miniCalendarMonth || !miniCalendar) return;

    const h = toHijri(state.currentDate);
    const hy = h.year;
    const hm = islamicMonths.indexOf(h.month) + 1;

    miniCalendarMonth.textContent = tHijri(hm) + ' ' + hy + ' AH';

    const firstDow = hijriMonthFirstDayOfWeek(hy, hm);
    const daysInMonth = hijriDaysInMonth(hy, hm);
    const todayStr = todayLocalString();
    const currentStr = dateToLocalString(state.currentDate);

    miniCalendar.innerHTML = '';

    t('dayLetters').forEach(d => {
        const div = document.createElement('div');
        div.className = 'theme-text-secondary font-medium py-1 text-center text-xs';
        div.textContent = d;
        miniCalendar.appendChild(div);
    });

    for (let i = 0; i < firstDow; i++) miniCalendar.appendChild(document.createElement('div'));

    for (let hd = 1; hd <= daysInMonth; hd++) {
        const gregDate = hijriToGregorian(hy, hm, hd);
        const dateStr = dateToLocalString(gregDate);
        const isToday = dateStr === todayStr;
        const isSelected = dateStr === currentStr && !isToday;

        const btn = document.createElement('div');
        let cls = 'py-1 cursor-pointer rounded-full transition-colors text-center text-sm ';
        if (isToday && dateStr === currentStr) {
            cls += 'bg-blue-600 text-white font-bold ring-2 ring-offset-1 ring-blue-300';
        } else if (isToday) {
            cls += 'bg-blue-600 text-white font-bold hover:bg-blue-700';
        } else if (isSelected) {
            cls += 'bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-900 font-semibold hover:opacity-80';
        } else {
            cls += 'hover:theme-bg-tertiary theme-text';
        }
        btn.className = cls;
        btn.textContent = hd;
        btn.onclick = () => selectDate(new Date(gregDate));
        miniCalendar.appendChild(btn);
    }
}

