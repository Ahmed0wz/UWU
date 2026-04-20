// EVENT MODAL & FORM

// ── Repeat preset helpers ────────────────────────────────────────

const _DAY_NAMES_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const _DAY_NAMES_SHORT_EN = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const _DAY_NAMES_AR = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const _DAY_NAMES_SHORT_AR = ['أحد','إثنين','ثلاثاء','أربعاء','خميس','جمعة','سبت'];
const _MONTH_NAMES_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const _MONTH_NAMES_AR = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
const _ORDINALS_EN = ['','1st','2nd','3rd','4th','5th'];
const _ORDINALS_AR = ['','الأول','الثاني','الثالث','الرابع','الخامس'];

/** Get the Nth-weekday info for a date — e.g. "3rd Wednesday" */
function getNthWeekdayInfo(date) {
    const d = typeof date === 'string' ? new Date(date + 'T12:00:00') : new Date(date);
    const dayOfMonth = d.getDate();
    const weekday = d.getDay();
    const nth = Math.ceil(dayOfMonth / 7);
    const ar = state.language === 'ar';
    const ordinal = ar ? (_ORDINALS_AR[nth] || nth) : (_ORDINALS_EN[nth] || nth + 'th');
    const dayName = ar ? _DAY_NAMES_SHORT_AR[weekday] : _DAY_NAMES_SHORT_EN[weekday];
    const dayNameFull = ar ? _DAY_NAMES_AR[weekday] : _DAY_NAMES_EN[weekday];
    return { nth, weekday, ordinal, dayName, dayNameFull };
}

/** Update the repeat dropdown labels based on the currently selected date */
function updateRepeatPresets(dateStr) {
    if (!dateStr) return;
    const d = new Date(dateStr + 'T12:00:00');
    const ar = state.language === 'ar';
    const dayName = ar ? _DAY_NAMES_AR[d.getDay()] : _DAY_NAMES_EN[d.getDay()];
    const dayNum = d.getDate();
    const monthName = ar ? _MONTH_NAMES_AR[d.getMonth()] : _MONTH_NAMES_EN[d.getMonth()];
    const nthInfo = getNthWeekdayInfo(d);

    const sel = document.getElementById('eventRepeat');
    if (!sel) return;
    const opts = sel.options;
    for (let i = 0; i < opts.length; i++) {
        switch (opts[i].value) {
            case 'weekly':
                opts[i].text = ar ? `أسبوعياً يوم ${dayName}` : `Weekly on ${dayName}`;
                break;
            case 'monthly':
                opts[i].text = ar ? `شهرياً في اليوم ${dayNum}` : `Monthly on day ${dayNum}`;
                break;
            case 'yearly':
                opts[i].text = ar ? `سنوياً في ${dayNum} ${monthName}` : `Annually on ${monthName} ${dayNum}`;
                break;
        }
    }

    // Update monthly type buttons
    _updateMonthlyTypeLabels(d);
}

function _updateMonthlyTypeLabels(date) {
    const d = typeof date === 'string' ? new Date(date + 'T12:00:00') : new Date(date);
    const dayNum = d.getDate();
    const nthInfo = getNthWeekdayInfo(d);
    const ar = state.language === 'ar';

    const dayLabel = ar ? `في اليوم ${dayNum}` : `On day ${dayNum}`;
    const nthLabel = ar ? `في ${nthInfo.ordinal} ${nthInfo.dayName}` : `On the ${nthInfo.ordinal} ${nthInfo.dayName}`;

    // Both the monthly preset row and the custom repeat row
    ['monthlyTypeDayBtn','customMonthlyTypeDayBtn'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = dayLabel;
    });
    ['monthlyTypeNthBtn','customMonthlyTypeNthBtn'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = nthLabel;
    });
}

function setMonthlyType(type) {
    document.getElementById('monthlyType')?.setAttribute('value', type);

    // Update all sets of monthly type buttons
    const dayBtns = ['monthlyTypeDayBtn','customMonthlyTypeDayBtn'];
    const nthBtns = ['monthlyTypeNthBtn','customMonthlyTypeNthBtn'];
    const activeStyle = (btn) => { btn.style.borderColor = '#3b82f6'; btn.style.background = 'rgba(59,130,246,0.12)'; btn.style.color = '#60a5fa'; };
    const inactiveStyle = (btn) => { btn.style.borderColor = '#333'; btn.style.background = 'none'; btn.style.color = '#888'; };

    dayBtns.forEach(id => { const el = document.getElementById(id); if (el) { if (type === 'dayOfMonth') activeStyle(el); else inactiveStyle(el); } });
    nthBtns.forEach(id => { const el = document.getElementById(id); if (el) { if (type === 'nthWeekday') activeStyle(el); else inactiveStyle(el); } });

    // Hide overflow rows when nthWeekday (no overflow issues with "3rd Wednesday")
    const overflowRow = document.getElementById('monthlyOverflowRow');
    if (overflowRow) overflowRow.classList.toggle('hidden', type === 'nthWeekday');
    const sheetOverflowRow = document.getElementById('monthOverflowRow');
    const currentUnit = document.getElementById('repeatUnit')?.value;
    if (sheetOverflowRow) sheetOverflowRow.style.display = (currentUnit === 'months' && type !== 'nthWeekday') ? 'flex' : 'none';
}

function updateModalHijriLabel(gregDateStr) {
    const label = document.getElementById('eventDateHijriLabel');
    if (!label || !gregDateStr) { if (label) label.classList.add('hidden'); return; }
    const d = new Date(gregDateStr + 'T12:00:00');
    const h = toHijri(d);
    label.textContent = `${h.day} ${h.month} ${h.year} AH`;
    label.classList.remove('hidden');
}

async function openModal(event = null, date = null, time = null) {
    const modal = document.getElementById('eventModal');
    if (!modal) return;
    showEl('eventModal');
    state.usePrayerTimes = false;
    state.prayerTimesForDate = null;

    // Populate calendar select
    const calendarSelect = document.getElementById('eventCalendar');
    if (calendarSelect) {
        calendarSelect.innerHTML = '';
        state.calendars.forEach(cal => {
            const colorObj = CALENDAR_COLORS.find(c => c.id === cal.color) || CALENDAR_COLORS[0];
            const option = document.createElement('option');
            option.value = cal.id;
            option.textContent = `${cal.name} (${colorObj.name})`;
            option.style.color = colorObj.hex;
            calendarSelect.appendChild(option);
        });
    }

    // Reset custom repeat UI
    const customRepeatSummary = document.getElementById('customRepeatSummary');
    if (customRepeatSummary) customRepeatSummary.classList.add('hidden');
    const customRepeatSheet = document.getElementById('customRepeatSheet');
    if (customRepeatSheet) customRepeatSheet.classList.add('hidden');
    const repeatOnDays = document.getElementById('repeatOnDays');
    if (repeatOnDays) repeatOnDays.style.display = 'none';
    const monthOverflowRow = document.getElementById('monthOverflowRow');
    if (monthOverflowRow) monthOverflowRow.style.display = 'none';
    const customMonthlyTypeRow = document.getElementById('customMonthlyTypeRow');
    if (customMonthlyTypeRow) customMonthlyTypeRow.style.display = 'none';
    document.querySelectorAll('.repeat-day-btn').forEach(btn => _setDayBtnActive(btn, false));
    setRepeatEndType('never');
    // Reset monthly type rows
    const monthlyTypeRow = document.getElementById('monthlyTypeRow');
    if (monthlyTypeRow) monthlyTypeRow.classList.add('hidden');
    setMonthlyType('dayOfMonth');

    const eventDate = date || todayLocalString();
    updateRepeatPresets(eventDate);

    if (state.userLocation) await loadPrayerTimesForDate(eventDate);

    if (event) {
        // EDITING existing event
        // Virtual repeat instances have composite ids like 'baseId_dateStr'
        // Resolve to the actual base event id for editing
        const isVirtual = typeof event.id === 'string' && event.id.includes('_');
        const resolvedId = isVirtual
            ? (event.parentId || parseInt(event.id.split('_')[0]))
            : event.id;
        state.editingEventId = resolvedId;
        // Track which specific occurrence date is being edited (for single-delete of virtual instances)
        state.editingEventDate = isVirtual ? event.date : null;
        const modalTitle = document.getElementById('modalTitle');
        const eventTitle = document.getElementById('eventTitle');
        const eventDateInput = document.getElementById('eventDate');
        const eventDescription = document.getElementById('eventDescription');
        const eventCalendar = document.getElementById('eventCalendar');
        const deleteBtn = document.getElementById('deleteBtn');
        const eventPoints = document.getElementById('eventPoints');

        if (modalTitle) modalTitle.textContent = t('editEvent');
        if (eventTitle) eventTitle.value = event.title;
        if (eventDateInput) { eventDateInput.value = event.date; updateModalHijriLabel(event.date); }
        if (eventDescription) eventDescription.value = event.description || '';
        if (eventCalendar) eventCalendar.value = event.calendar;
        if (eventPoints) eventPoints.value = event.points || '';

        if (event.isPrayerBased && event.prayerConfig) {
            togglePrayerTimes(true);
            const cfg = event.prayerConfig;

            // Start anchor
            const startType = cfg.startType || 'prayer';
            setPrayerAnchorType('start', startType);
            if (startType === 'prayer') {
                const startPrayer = cfg.startPrayer || cfg.prayer || 'Fajr';
                const startSel = document.getElementById('prayerStartSelect');
                const startOff = document.getElementById('prayerStartOffset');
                if (startSel) startSel.value = startPrayer;
                if (startOff) startOff.value = cfg.startOffset ?? 0;
            } else {
                const el = document.getElementById('prayerStartFixedTime');
                if (el) el.value = cfg.startFixedTime || event.startTime || '09:00';
            }

            // End anchor
            const endType = cfg.endType || 'prayer';
            setPrayerAnchorType('end', endType);
            if (endType === 'prayer') {
                const endPrayer = cfg.endPrayer || cfg.prayer || 'Fajr';
                const endSel = document.getElementById('prayerEndSelect');
                const endOff = document.getElementById('prayerEndOffset');
                if (endSel) endSel.value = endPrayer;
                if (endOff) endOff.value = cfg.endOffset ?? 0;
            } else {
                const el = document.getElementById('prayerEndFixedTime');
                if (el) el.value = cfg.endFixedTime || event.endTime || '10:00';
            }

            updatePrayerTimeDisplay();
        } else {
            togglePrayerTimes(false);
            if (event.isAllDay) {
                setAllDay(true);
            } else {
                setAllDay(false);
                const eventStartTime = document.getElementById('eventStartTime');
                const eventEndTime = document.getElementById('eventEndTime');
                if (eventStartTime) eventStartTime.value = event.startTime;
                if (eventEndTime) eventEndTime.value = event.endTime;
            }
        }

        const eventRepeat = document.getElementById('eventRepeat');
        if (eventRepeat) {
            eventRepeat.value = (event.repeat && event.repeat !== 'none') ? event.repeat : 'none';
            if (event.repeat === 'custom') showCustomRepeatOptions(event.repeatConfig);
            if (event.repeat === 'monthly') {
                const mTypeRow = document.getElementById('monthlyTypeRow');
                if (mTypeRow) mTypeRow.classList.remove('hidden');
                const cfg = event.repeatConfig || {};
                setMonthlyType(cfg.monthlyType || 'dayOfMonth');
            }
        }
        // Populate reminder field
        const reminderSel = document.getElementById('eventReminder');
        if (reminderSel) {
            reminderSel.value = (event.reminderMinutes != null) ? String(event.reminderMinutes) : 'none';
        }
        // Populate reminder type and alarm options
        localStorage.setItem('_eventAlarmRingtoneUri_tmp',  event.alarmRingtoneUri  || '');
        localStorage.setItem('_eventAlarmRingtoneName_tmp', event.alarmRingtoneName || 'Default alarm sound');
        localStorage.setItem('_eventAlarmDifficulty_tmp',   event.alarmDifficulty   || 'medium');
        localStorage.setItem('_eventAlarmEqCount_tmp',      String(event.alarmEqCount  ?? 2));
        localStorage.setItem('_eventAlarmSnooze_tmp',       String(event.alarmSnoozeMins ?? 5));
        localStorage.setItem('_eventAlarmSnoozeLimit_tmp',  String(event.alarmSnoozeLimit ?? 0));
        localStorage.setItem('_eventAlarmGentleWake_tmp',   String(event.alarmGentleWake !== false));
        localStorage.setItem('_eventAlarmWakeUpCheck_tmp',  String(!!event.alarmWakeUpCheck));
        localStorage.setItem('_eventAlarmSafetyStop_tmp',   String(!!event.alarmSafetyStop));
        _saveEqTypes('_eventAlarmEquationTypes_tmp', event.alarmEquationTypes || []);
        toggleAlarmOptions();
        if (event.reminderType === 'alarm') {
            setReminderType('alarm');
            const diff = document.getElementById('eventAlarmDifficulty');
            const snooze = document.getElementById('eventAlarmSnooze');
            const ringName = document.getElementById('eventAlarmRingtoneName');
            if (diff)     diff.value    = event.alarmDifficulty || 'medium';
            if (snooze)   snooze.value  = String(event.alarmSnoozeMins || 5);
            if (ringName) ringName.textContent = event.alarmRingtoneName || 'Default alarm sound';
        } else {
            setReminderType('notification');
        }
        if (deleteBtn) deleteBtn.classList.remove('hidden');
    } else {
        // NEW event
        state.editingEventId = null;
        const modalTitle = document.getElementById('modalTitle');
        const eventForm = document.getElementById('eventForm');
        const eventDateInput = document.getElementById('eventDate');
        const eventStartTime = document.getElementById('eventStartTime');
        const eventEndTime = document.getElementById('eventEndTime');
        const deleteBtn = document.getElementById('deleteBtn');

        if (modalTitle) modalTitle.textContent = t('newEvent');
        if (eventForm) eventForm.reset();
        if (eventDateInput) { eventDateInput.value = eventDate; updateModalHijriLabel(eventDate); }
        togglePrayerTimes(false);
        setAllDay(false);
        if (eventStartTime) eventStartTime.value = time || '09:00';
        if (eventEndTime) eventEndTime.value = time ? addMinutes(time, 60) : '10:00';

        const eventRepeat = document.getElementById('eventRepeat');
        if (eventRepeat) eventRepeat.value = 'none';
        const reminderSel = document.getElementById('eventReminder');
        if (reminderSel) reminderSel.value = 'none';
        localStorage.removeItem('_eventAlarmRingtoneUri_tmp');
        localStorage.removeItem('_eventAlarmRingtoneName_tmp');
        localStorage.setItem('_eventAlarmDifficulty_tmp',  'medium');
        localStorage.setItem('_eventAlarmEqCount_tmp',     '2');
        localStorage.setItem('_eventAlarmSnooze_tmp',      '5');
        localStorage.setItem('_eventAlarmSnoozeLimit_tmp', '0');
        localStorage.setItem('_eventAlarmGentleWake_tmp',  'true');
        localStorage.setItem('_eventAlarmWakeUpCheck_tmp', 'false');
        localStorage.setItem('_eventAlarmSafetyStop_tmp',  'false');
        _saveEqTypes('_eventAlarmEquationTypes_tmp', []);
        setReminderType('notification');
        toggleAlarmOptions();
        // Pre-fill from defaults
        const defs = getAlarmSettings();
        localStorage.setItem('_eventAlarmRingtoneUri_tmp',  defs.ringtoneUri  || '');
        localStorage.setItem('_eventAlarmRingtoneName_tmp', defs.ringtoneName || 'Default alarm sound');
        localStorage.setItem('_eventAlarmDifficulty_tmp',  defs.difficulty   || 'medium');
        localStorage.setItem('_eventAlarmEqCount_tmp',     String(defs.eqCount  ?? 2));
        localStorage.setItem('_eventAlarmSnooze_tmp',      String(defs.snoozeMins ?? 5));
        localStorage.setItem('_eventAlarmGentleWake_tmp',  String(defs.gentleWake !== false));
        localStorage.setItem('_eventAlarmWakeUpCheck_tmp', 'false');
        if (deleteBtn) deleteBtn.classList.add('hidden');
    }
    updatePrayerTimeVisibility();
}

async function loadPrayerTimesForDate(dateStr) {
    const timings = await getPrayerTimings(new Date(dateStr + 'T12:00:00'));
    if (timings) { state.prayerTimesForDate = timings; updatePrayerTimeDisplay(); }
}

function togglePrayerTimes(enabled) {
    state.usePrayerTimes = enabled;
    const prayerToggle = document.getElementById('prayerTimeToggle');
    const prayerCheckbox = document.getElementById('prayerTimeCheckbox');
    const timeInputs = document.getElementById('timeInputs');
    const prayerTimeSelector = document.getElementById('prayerTimeSelector');

    if (prayerCheckbox) {
        const svg = prayerCheckbox.querySelector('svg');
        if (enabled) {
            prayerCheckbox.classList.add('bg-blue-500', 'border-blue-500', 'text-white');
            prayerCheckbox.classList.remove('theme-border');
            if (svg) svg.classList.remove('hidden');
        } else {
            prayerCheckbox.classList.remove('bg-blue-500', 'border-blue-500', 'text-white');
            prayerCheckbox.classList.add('theme-border');
            if (svg) svg.classList.add('hidden');
        }
    }
    if (prayerToggle) {
        prayerToggle.classList.toggle('border-blue-500', enabled);
        prayerToggle.classList.toggle('bg-blue-50', enabled);
        prayerToggle.classList.toggle('dark:bg-blue-900/20', enabled);
    }
    if (timeInputs) timeInputs.classList.toggle('hidden', enabled);
    if (prayerTimeSelector) prayerTimeSelector.classList.toggle('hidden', !enabled);

    if (enabled) {
        const dateInput = document.getElementById('eventDate');
        if (dateInput && dateInput.value) {
            loadPrayerTimesForDate(dateInput.value).then(() => updatePrayerTimeDisplay());
        }
    }
}

function setPrayerAnchorType(anchor, type) {
    // anchor: 'start' | 'end',  type: 'prayer' | 'time'
    const cap = anchor === 'start' ? 'Start' : 'End';
    const prayerMode = document.getElementById('prayer' + cap + 'PrayerMode');
    const timeMode   = document.getElementById('prayer' + cap + 'TimeMode');
    const btnPrayer  = document.getElementById('prayer' + cap + 'TypePrayer');
    const btnTime    = document.getElementById('prayer' + cap + 'TypeTime');
    if (!prayerMode || !timeMode) return;

    const isPrayer = type === 'prayer';
    prayerMode.classList.toggle('hidden', !isPrayer);
    timeMode.classList.toggle('hidden', isPrayer);

    // Active button styling
    btnPrayer?.classList.toggle('bg-blue-500', isPrayer);
    btnPrayer?.classList.toggle('text-white', isPrayer);
    btnPrayer?.classList.toggle('font-medium', isPrayer);
    btnPrayer?.classList.toggle('theme-bg-tertiary', !isPrayer);
    btnPrayer?.classList.toggle('theme-text', !isPrayer);

    btnTime?.classList.toggle('bg-blue-500', !isPrayer);
    btnTime?.classList.toggle('text-white', !isPrayer);
    btnTime?.classList.toggle('font-medium', !isPrayer);
    btnTime?.classList.toggle('theme-bg-tertiary', isPrayer);
    btnTime?.classList.toggle('theme-text', isPrayer);

    updatePrayerTimeDisplay();
}

function _getPrayerAnchorType(anchor) {
    // Returns 'prayer' or 'time' based on which mode is active
    const cap = anchor === 'start' ? 'Start' : 'End';
    const timeMode = document.getElementById('prayer' + cap + 'TimeMode');
    return (timeMode && !timeMode.classList.contains('hidden')) ? 'time' : 'prayer';
}

function updatePrayerTimeDisplay() {
    if (!state.prayerTimesForDate || !state.usePrayerTimes) return;
    // Update Dhuhr label to Jumu'ah on Fridays
    const dateInput = document.getElementById('eventDate');
    if (dateInput && dateInput.value) {
        const dow = new Date(dateInput.value + 'T12:00:00').getDay();
        ['prayerStartSelect','prayerEndSelect'].forEach(id => {
            const sel = document.getElementById(id);
            if (sel) {
                const opt = sel.querySelector('option[value="Dhuhr"]');
                if (opt) opt.textContent = dow === 5 ? "Jumu'ah" : "Dhuhr";
            }
        });
    }

    const startType = _getPrayerAnchorType('start');
    const endType   = _getPrayerAnchorType('end');

    let startMinutes = null, endMinutes = null;

    if (startType === 'prayer') {
        const startSel = document.getElementById('prayerStartSelect');
        const startOff = (v => isNaN(v) ? 0 : v)(parseInt(document.getElementById('prayerStartOffset')?.value));
        const startPrayer = startSel?.value || 'Fajr';
        const startTime = state.prayerTimesForDate[startPrayer];
        if (startTime) startMinutes = getPrayerTimeInMinutes(startTime) + startOff;
    } else {
        const val = document.getElementById('prayerStartFixedTime')?.value;
        if (val) { const [h,m] = val.split(':').map(Number); startMinutes = h*60+m; }
    }

    if (endType === 'prayer') {
        const endSel = document.getElementById('prayerEndSelect');
        const endOff = (v => isNaN(v) ? 0 : v)(parseInt(document.getElementById('prayerEndOffset')?.value));
        const endPrayer = endSel?.value || 'Fajr';
        const endTime = state.prayerTimesForDate[endPrayer];
        if (endTime) endMinutes = getPrayerTimeInMinutes(endTime) + endOff;
    } else {
        const val = document.getElementById('prayerEndFixedTime')?.value;
        if (val) { const [h,m] = val.split(':').map(Number); endMinutes = h*60+m; }
    }

    const startDisplay = document.getElementById('prayerStartTimeDisplay');
    const endDisplay   = document.getElementById('prayerEndTimeDisplay');
    if (startDisplay) startDisplay.textContent = startMinutes !== null ? minutesToTimeString(startMinutes) : '--:--';
    if (endDisplay)   endDisplay.textContent   = endMinutes   !== null ? minutesToTimeString(endMinutes)   : '--:--';
}

function updatePrayerTimeVisibility() {
    const prayerSection = document.getElementById('prayerTimeSection');
    if (prayerSection) prayerSection.classList.toggle('hidden', !state.userLocation);
}

function toggleAllDay() {
    const checkbox = document.getElementById('allDayCheckbox');
    const isChecked = checkbox && !checkbox.querySelector('svg').classList.contains('hidden');
    setAllDay(!isChecked);
}

function setAllDay(isAllDay) {
    const checkbox = document.getElementById('allDayCheckbox');
    const timeInputs = document.getElementById('timeInputs');
    const prayerSection = document.getElementById('prayerTimeSection');
    if (!checkbox) return;
    const svg = checkbox.querySelector('svg');
    if (isAllDay) {
        if (svg) svg.classList.remove('hidden');
        checkbox.classList.add('bg-blue-500', 'border-blue-500', 'text-white');
        checkbox.classList.remove('theme-border');
        if (timeInputs) timeInputs.classList.add('hidden');
        if (prayerSection) prayerSection.classList.add('hidden');
        if (state.usePrayerTimes) togglePrayerTimes(false);
    } else {
        if (svg) svg.classList.add('hidden');
        checkbox.classList.remove('bg-blue-500', 'border-blue-500', 'text-white');
        checkbox.classList.add('theme-border');
        if (timeInputs) timeInputs.classList.remove('hidden');
        if (prayerSection && state.userLocation) prayerSection.classList.remove('hidden');
    }
}

function showCustomRepeatOptions(config = {}) {
    const repeatInterval = document.getElementById('repeatInterval');
    const repeatUnit = document.getElementById('repeatUnit');
    const repeatEndDate = document.getElementById('repeatEndDate');
    const repeatCountInput = document.getElementById('repeatCountInput');
    const repeatOnDays = document.getElementById('repeatOnDays');

    if (config.interval && repeatInterval) repeatInterval.value = config.interval;
    if (config.unit && repeatUnit) {
        repeatUnit.value = config.unit;
        if (repeatOnDays) repeatOnDays.style.display = config.unit === 'weeks' ? 'block' : 'none';
        const customMonthlyTypeRow = document.getElementById('customMonthlyTypeRow');
        if (customMonthlyTypeRow) customMonthlyTypeRow.style.display = config.unit === 'months' ? 'block' : 'none';
        const monthOverflowRow = document.getElementById('monthOverflowRow');
        if (monthOverflowRow) monthOverflowRow.style.display = config.unit === 'months' ? 'flex' : 'none';
    }
    if (config.days) {
        document.querySelectorAll('.repeat-day-btn').forEach(btn => {
            if (config.days.includes(parseInt(btn.dataset.day))) {
                _setDayBtnActive(btn, true);
            }
        });
    }
    setRepeatEndType(config.endType || 'never');
    if (config.endCount && repeatCountInput) repeatCountInput.value = config.endCount;
    if (config.endDate && repeatEndDate) repeatEndDate.value = config.endDate;
    if (config.monthlyType) setMonthlyType(config.monthlyType);
    // Show summary line
    updateCustomRepeatSummary();
    const summary = document.getElementById('customRepeatSummary');
    if (summary) summary.classList.remove('hidden');
}

function openCustomRepeatSheet() {
    const sheet = document.getElementById('customRepeatSheet');
    if (!sheet) return;
    const ar = state.language === 'ar';
    const titleEl = document.getElementById('repeatSheetTitle');
    const doneEl = document.getElementById('repeatSheetDone');
    if (titleEl) titleEl.textContent = ar ? 'تكرار' : 'Repeat';
    if (doneEl) doneEl.textContent = ar ? 'تم' : 'Done';
    sheet.classList.remove('hidden');
    const content = document.getElementById('customRepeatSheetContent');
    if (content) {
        content.style.transform = 'translateY(100%)';
        content.style.transition = 'transform 0.3s ease-out';
        requestAnimationFrame(() => { content.style.transform = 'translateY(0)'; });
    }
}

function closeCustomRepeatSheet() {
    const sheet = document.getElementById('customRepeatSheet');
    if (!sheet) return;
    const content = document.getElementById('customRepeatSheetContent');
    if (content) {
        content.style.transition = 'transform 0.25s ease-in';
        content.style.transform = 'translateY(100%)';
        setTimeout(() => { sheet.classList.add('hidden'); }, 260);
    } else {
        sheet.classList.add('hidden');
    }
    updateCustomRepeatSummary();
}

function updateCustomRepeatSummary() {
    const interval = document.getElementById('repeatInterval')?.value || '1';
    const unit = document.getElementById('repeatUnit')?.value || 'days';
    const ar = state.language === 'ar';
    const unitLabels = {
        days:   ar ? 'أيام'    : (interval === '1' ? 'day'   : 'days'),
        weeks:  ar ? 'أسابيع'  : (interval === '1' ? 'week'  : 'weeks'),
        months: ar ? 'أشهر'    : (interval === '1' ? 'month' : 'months'),
        years:  ar ? 'سنوات'   : (interval === '1' ? 'year'  : 'years'),
    };
    let text = ar ? `كل ${interval} ${unitLabels[unit]}` : `Every ${interval} ${unitLabels[unit]}`;
    if (unit === 'weeks') {
        const selectedDays = [];
        document.querySelectorAll('.repeat-day-btn').forEach(btn => {
            if (btn.style.background === 'rgb(59, 130, 246)') {
                const dayIdx = parseInt(btn.dataset.day);
                selectedDays.push(ar ? _DAY_NAMES_SHORT_AR[dayIdx] : _DAY_NAMES_SHORT_EN[dayIdx]);
            }
        });
        if (selectedDays.length > 0) text += ar ? ` في ${selectedDays.join('، ')}` : ` on ${selectedDays.join(', ')}`;
    }
    const endType = document.getElementById('repeatEndType')?.value || 'never';
    if (endType === 'on') {
        const endDate = document.getElementById('repeatEndDate')?.value;
        if (endDate) text += ar ? ` حتى ${endDate}` : ` until ${endDate}`;
    } else if (endType === 'after') {
        const count = document.getElementById('repeatCountInput')?.value || '4';
        text += ar ? `، ${count} مرات` : `, ${count} times`;
    }
    const summaryText = document.getElementById('customRepeatSummaryText');
    if (summaryText) summaryText.textContent = text;
}

// Notion-style radio button end type selector
function setRepeatEndType(type) {
    const hiddenSelect = document.getElementById('repeatEndType');
    if (hiddenSelect) hiddenSelect.value = type;

    const radioMap = { never: 'repeatEndNeverRadio', on: 'repeatEndOnRadio', after: 'repeatEndAfterRadio' };
    Object.entries(radioMap).forEach(([key, id]) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (key === type) {
            el.style.borderColor = '#3b82f6';
            el.innerHTML = '<span style="width:13px;height:13px;border-radius:50%;background:#3b82f6;"></span>';
        } else {
            el.style.borderColor = '#555';
            el.innerHTML = '';
        }
    });
}

// Day circle toggle (Notion style — filled blue when active)
function _setDayBtnActive(btn, active) {
    if (active) {
        btn.style.background = '#3b82f6';
        btn.style.borderColor = '#3b82f6';
        btn.style.color = '#fff';
    } else {
        btn.style.background = 'transparent';
        btn.style.borderColor = '#555';
        btn.style.color = '#999';
    }
}

function _toggleDayBtn(btn) {
    const isActive = btn.style.background === 'rgb(59, 130, 246)';
    _setDayBtnActive(btn, !isActive);
}

// HANDLE FORM SUBMIT

async function handleFormSubmit(e) {
    e.preventDefault();
    const calendarSelect = document.getElementById('eventCalendar');
    const calendarId = calendarSelect ? calendarSelect.value : 'personal';
    const allDayCheckbox = document.getElementById('allDayCheckbox');
    const isAllDay = allDayCheckbox && !allDayCheckbox.querySelector('svg').classList.contains('hidden');
    const calendar = state.calendars.find(c => c.id === calendarId);
    if (!calendar) { alert('Please select a valid calendar'); return; }

    const eventTitle = document.getElementById('eventTitle');
    const eventDate = document.getElementById('eventDate');
    const eventDescription = document.getElementById('eventDescription');
    const eventRepeat = document.getElementById('eventRepeat');
    const eventPoints = document.getElementById('eventPoints');

    const eventData = {
        id: state.editingEventId || Date.now(),
        title: eventTitle ? eventTitle.value : 'Untitled',
        date: eventDate ? eventDate.value : todayLocalString(),
        isAllDay,
        calendar: calendarId,
        color: calendar.color,
        description: eventDescription ? eventDescription.value : '',
        repeat: eventRepeat ? eventRepeat.value : 'none',
        points: eventPoints ? parseInt(eventPoints.value) || 0 : 0,
        completed: false,
        reminderMinutes: (() => {
            const r = document.getElementById('eventReminder')?.value;
            return (!r || r === 'none') ? null : parseInt(r);
        })(),
        reminderType: document.getElementById('typeAlarmBtn')?.classList.contains('bg-orange-500') ? 'alarm' : 'notification',
        alarmEquationTypes: _getEqTypes('_eventAlarmEquationTypes_tmp'),
        alarmDifficulty: localStorage.getItem('_eventAlarmDifficulty_tmp') || 'medium',
        alarmEqCount:    parseInt(localStorage.getItem('_eventAlarmEqCount_tmp')    || '2'),
        alarmSnoozeMins: parseInt(localStorage.getItem('_eventAlarmSnooze_tmp')     || '5'),
        alarmSnoozeLimit: parseInt(localStorage.getItem('_eventAlarmSnoozeLimit_tmp') ?? '0'),
        alarmRingtoneUri:  localStorage.getItem('_eventAlarmRingtoneUri_tmp')  || '',
        alarmRingtoneName: localStorage.getItem('_eventAlarmRingtoneName_tmp') || 'Default alarm sound',
        alarmGentleWake:   localStorage.getItem('_eventAlarmGentleWake_tmp')  !== 'false',
        alarmWakeUpCheck:  localStorage.getItem('_eventAlarmWakeUpCheck_tmp') === 'true',
        alarmSafetyStop:   localStorage.getItem('_eventAlarmSafetyStop_tmp')  === 'true',
    };

    if (!isAllDay) {
        if (state.usePrayerTimes) {
            const startType = _getPrayerAnchorType('start');
            const endType   = _getPrayerAnchorType('end');

            // Resolve start
            let startMinutes = null;
            let startAnchor = {};
            if (startType === 'prayer') {
                const startPrayer = document.getElementById('prayerStartSelect')?.value || 'Fajr';
                const startOff = (v => isNaN(v) ? 0 : v)(parseInt(document.getElementById('prayerStartOffset')?.value));
                const startTime = state.prayerTimesForDate?.[startPrayer];
                if (startTime) startMinutes = getPrayerTimeInMinutes(startTime) + startOff;
                startAnchor = { type: 'prayer', prayer: startPrayer, offset: startOff };
            } else {
                const val = document.getElementById('prayerStartFixedTime')?.value || '09:00';
                const [h, m] = val.split(':').map(Number);
                startMinutes = h * 60 + m;
                startAnchor = { type: 'time', fixedTime: val };
            }

            // Resolve end
            let endMinutes = null;
            let endAnchor = {};
            if (endType === 'prayer') {
                const endPrayer = document.getElementById('prayerEndSelect')?.value || 'Fajr';
                const endOff = (v => isNaN(v) ? 0 : v)(parseInt(document.getElementById('prayerEndOffset')?.value));
                const endTime = state.prayerTimesForDate?.[endPrayer];
                if (endTime) endMinutes = getPrayerTimeInMinutes(endTime) + endOff;
                endAnchor = { type: 'prayer', prayer: endPrayer, offset: endOff };
            } else {
                const val = document.getElementById('prayerEndFixedTime')?.value || '10:00';
                const [h, m] = val.split(':').map(Number);
                endMinutes = h * 60 + m;
                endAnchor = { type: 'time', fixedTime: val };
            }

            if (startMinutes !== null && endMinutes !== null) {
                eventData.startTime = minutesToTimeString(startMinutes);
                eventData.endTime   = minutesToTimeString(endMinutes);
                eventData.isPrayerBased = true;
                // Store in new unified format — startPrayer/endPrayer for backwards compat
                eventData.prayerConfig = {
                    startType: startAnchor.type,
                    startPrayer: startAnchor.prayer || null,
                    startOffset: startAnchor.offset ?? 0,
                    startFixedTime: startAnchor.fixedTime || null,
                    endType: endAnchor.type,
                    endPrayer: endAnchor.prayer || null,
                    endOffset: endAnchor.offset ?? 0,
                    endFixedTime: endAnchor.fixedTime || null,
                };
            }
            if (!eventData.startTime) {
                eventData.startTime = document.getElementById('eventStartTime')?.value || '09:00';
                eventData.endTime = document.getElementById('eventEndTime')?.value || '10:00';
            }
        } else {
            eventData.startTime = document.getElementById('eventStartTime')?.value || '09:00';
            eventData.endTime = document.getElementById('eventEndTime')?.value || '10:00';
        }
    }

    if (eventData.repeat === 'custom') {
        const selectedDays = [];
        document.querySelectorAll('.repeat-day-btn').forEach(btn => {
            if (btn.style.background === 'rgb(59, 130, 246)') selectedDays.push(parseInt(btn.dataset.day));
        });
        const repeatInterval = document.getElementById('repeatInterval');
        const repeatUnit = document.getElementById('repeatUnit');
        const repeatEndType = document.getElementById('repeatEndType');
        const repeatCountInput = document.getElementById('repeatCountInput');
        const repeatEndDateEl = document.getElementById('repeatEndDate');
        const monthOverflow = document.getElementById('monthOverflow');
        eventData.repeatConfig = {
            interval: parseInt(repeatInterval ? repeatInterval.value : 1) || 1,
            unit: repeatUnit ? repeatUnit.value : 'days',
            days: selectedDays,
            endType: repeatEndType ? repeatEndType.value : 'never',
            endCount: repeatCountInput ? repeatCountInput.value : '4',
            endDate: repeatEndDateEl ? repeatEndDateEl.value : '',
            monthOverflow: monthOverflow ? monthOverflow.value : 'snap',
            monthlyType: document.getElementById('monthlyType')?.value || 'dayOfMonth'
        };
        // Save nth-weekday info if applicable
        if (eventData.repeatConfig.monthlyType === 'nthWeekday' && eventData.repeatConfig.unit === 'months') {
            const nthInfo = getNthWeekdayInfo(eventData.date);
            eventData.repeatConfig.nthWeek = nthInfo.nth;
            eventData.repeatConfig.nthWeekday = nthInfo.weekday;
        }
    }

    if (eventData.repeat === 'monthly') {
        const monthlyOverflow = document.getElementById('monthlyOverflow');
        if (!eventData.repeatConfig) eventData.repeatConfig = {};
        eventData.repeatConfig.monthOverflow = monthlyOverflow ? monthlyOverflow.value : 'snap';
        eventData.repeatConfig.monthlyType = document.getElementById('monthlyType')?.value || 'dayOfMonth';
        if (eventData.repeatConfig.monthlyType === 'nthWeekday') {
            const nthInfo = getNthWeekdayInfo(eventData.date);
            eventData.repeatConfig.nthWeek = nthInfo.nth;
            eventData.repeatConfig.nthWeekday = nthInfo.weekday;
        }
    }

    if (state.editingEventId) {
        const existingEvent = events.find(ev => ev.id === state.editingEventId);
        const isPartOfSeries = existingEvent &&
            existingEvent.repeat && existingEvent.repeat !== 'none';

        if (isPartOfSeries) {
            // Store eventData for the modal to use
            state._pendingEditData = { eventData, existingEvent };
            openEditSeriesModal();
            return; // modal handles saving
        } else {
            const index = events.findIndex(ev => ev.id === state.editingEventId);
            if (index !== -1) events[index] = eventData;
        }
    } else {
        events.push(eventData);
        if (eventData.repeat && eventData.repeat !== 'none') {
            generateRepeatEvents(eventData);
        }
    }

    saveEvents();
    scheduleEventNotification(eventData);
    renderCurrentView();
    closeModal();
}

// GENERATE REPEAT EVENTS

/**
 * Add N months to a date, snapping to the last day of the target month
 * if the base day doesn't exist. Pass snap=false to skip that month.
 */
function addMonthsSafe(baseDate, months, snap = true) {
    const targetYear  = baseDate.getFullYear();
    const targetMonth = baseDate.getMonth() + months;
    const baseDay     = baseDate.getDate();
    const daysInTarget = new Date(targetYear, targetMonth + 1, 0).getDate();
    if (baseDay > daysInTarget) {
        if (!snap) return null;
        return new Date(targetYear, targetMonth, daysInTarget, 12, 0, 0);
    }
    return new Date(targetYear, targetMonth, baseDay, 12, 0, 0);
}

/**
 * Get the Nth occurrence of a specific weekday in a given month.
 * e.g. getNthWeekdayOfMonth(2026, 3, 3, 3) = 3rd Wednesday of April 2026
 * Returns null if the Nth occurrence doesn't exist (e.g. 5th Monday in a short month).
 */
function getNthWeekdayOfMonth(year, month, nth, weekday) {
    // Find the first occurrence of this weekday
    const first = new Date(year, month, 1, 12, 0, 0);
    let dayOfFirst = first.getDay();
    let offset = (weekday - dayOfFirst + 7) % 7;
    let day = 1 + offset + (nth - 1) * 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    if (day > daysInMonth) return null;
    return new Date(year, month, day, 12, 0, 0);
}

// VIRTUAL REPEAT EVENTS — computed on demand, never stored
// Instances are generated within the current render window around state.currentDate
// Prayer-based events recalculate their time per-occurrence from cached prayer times

// Generate the date sequence for a base event between windowStart and windowEnd (Date objects).
// Returns array of Date objects (not including the base event date itself).
function getRepeatDatesInWindow(baseEvent, windowStart, windowEnd) {
    const baseDate = new Date(baseEvent.date + 'T12:00:00');
    const config = baseEvent.repeatConfig || {};
    const endType  = config.endType  || 'never';
    const endCount = parseInt(config.endCount) || 52;
    const endDate  = config.endDate ? new Date(config.endDate + 'T12:00:00') : null;
    const snap = (config.monthOverflow || 'snap') !== 'skip';
    const dates = [];
    let occurrenceIndex = 0;
    const SAFETY_MAX = 3650; // never loop beyond 10 years regardless of window

    while (occurrenceIndex < SAFETY_MAX) {
        occurrenceIndex++;
        let nextDate = null;

        switch (baseEvent.repeat) {
            case 'daily':
                nextDate = new Date(baseDate);
                nextDate.setDate(baseDate.getDate() + occurrenceIndex);
                break;
            case 'weekly':
                nextDate = new Date(baseDate);
                nextDate.setDate(baseDate.getDate() + occurrenceIndex * 7);
                break;
            case 'monthly':
                if (config.monthlyType === 'nthWeekday' && config.nthWeek && config.nthWeekday != null) {
                    const targetMonth = baseDate.getMonth() + occurrenceIndex;
                    const targetYear = baseDate.getFullYear() + Math.floor(targetMonth / 12);
                    const m = ((targetMonth % 12) + 12) % 12;
                    nextDate = getNthWeekdayOfMonth(targetYear, m, config.nthWeek, config.nthWeekday);
                    if (!nextDate) { continue; }
                } else {
                    nextDate = addMonthsSafe(baseDate, occurrenceIndex, snap);
                    if (!nextDate) { continue; }
                }
                break;
            case 'yearly': {
                const ty = baseDate.getFullYear() + occurrenceIndex;
                const dim = new Date(ty, baseDate.getMonth() + 1, 0).getDate();
                nextDate = new Date(ty, baseDate.getMonth(), Math.min(baseDate.getDate(), dim), 12, 0, 0);
                break;
            }
            case 'weekdays': {
                nextDate = new Date(baseDate);
                let wd = 0;
                const tmp = new Date(baseDate);
                while (wd < occurrenceIndex) {
                    tmp.setDate(tmp.getDate() + 1);
                    if (tmp.getDay() !== 0 && tmp.getDay() !== 6) wd++;
                }
                nextDate = new Date(tmp);
                break;
            }
            case 'custom': {
                const interval = parseInt(config.interval) || 1;
                const unit = config.unit || 'days';
                const specificDays = config.days && config.days.length > 0 ? config.days : null;
                if (unit === 'weeks' && specificDays) {
                    let found = 0;
                    const searchDate = new Date(baseDate);
                    while (found < occurrenceIndex) {
                        searchDate.setDate(searchDate.getDate() + 1);
                        const weeksDiff = Math.floor((searchDate - baseDate) / (7 * 86400000));
                        if (weeksDiff % interval === 0 && specificDays.includes(searchDate.getDay())) {
                            found++;
                            nextDate = new Date(searchDate);
                        }
                    }
                } else {
                    switch (unit) {
                        case 'days': nextDate = new Date(baseDate); nextDate.setDate(baseDate.getDate() + interval * occurrenceIndex); break;
                        case 'weeks': nextDate = new Date(baseDate); nextDate.setDate(baseDate.getDate() + interval * 7 * occurrenceIndex); break;
                        case 'months':
                            if (config.monthlyType === 'nthWeekday' && config.nthWeek && config.nthWeekday != null) {
                                const tm = baseDate.getMonth() + interval * occurrenceIndex;
                                const ty2 = baseDate.getFullYear() + Math.floor(tm / 12);
                                const m2 = ((tm % 12) + 12) % 12;
                                nextDate = getNthWeekdayOfMonth(ty2, m2, config.nthWeek, config.nthWeekday);
                                if (!nextDate) { occurrenceIndex++; continue; }
                            } else {
                                nextDate = addMonthsSafe(baseDate, interval * occurrenceIndex, snap);
                                if (!nextDate) { occurrenceIndex++; continue; }
                            }
                            break;
                        case 'years': { const ty = baseDate.getFullYear() + interval * occurrenceIndex; const dim = new Date(ty, baseDate.getMonth() + 1, 0).getDate(); nextDate = new Date(ty, baseDate.getMonth(), Math.min(baseDate.getDate(), dim), 12, 0, 0); break; }
                    }
                }
                break;
            }
            default: return dates;
        }

        if (!nextDate) break;
        if (endType === 'after' && occurrenceIndex > endCount - 1) break;
        if (endType === 'on' && endDate && nextDate > endDate) break;
        // Past the window — stop (dates are monotonically increasing)
        if (nextDate > windowEnd) break;
        if (nextDate >= windowStart) dates.push(new Date(nextDate));
    }
    return dates;
}

// Resolve a prayer-based event's start/end times for a specific date string, using cached times.
// Falls back to the stored times if no cache entry exists.

function getEventsForDate(dateStr) {
    const result = [];
    const target = new Date(dateStr + 'T12:00:00');

    for (const ev of events) {
        if (ev.parentId) continue; // skip stored instances (legacy data compat)

        // Base event matches
        if (ev.date === dateStr) {
            if (ev.isPrayerBased && ev.prayerConfig) {
                result.push(resolvePrayerTimesSync(ev, dateStr));
            } else {
                result.push(ev);
            }
            continue;
        }

        // Generate virtual instances for repeating events
        if (!ev.repeat || ev.repeat === 'none') continue;

        const baseDate = new Date(ev.date + 'T12:00:00');
        if (target < baseDate) continue; // before the series starts

        // Check if target date is a valid occurrence
        if (isRepeatOccurrence(ev, dateStr)) {
            const instance = { ...ev, date: dateStr, id: ev.id + '_' + dateStr, parentId: ev.id };
            if (instance.isPrayerBased && instance.prayerConfig) {
                result.push(resolvePrayerTimesSync(instance, dateStr));
            } else {
                result.push(instance);
            }
        }
    }
    // ── Cross-midnight continuations ─────────────────────────────────────────
    // If an event on the PREVIOUS day has endTime < startTime (crosses midnight),
    // synthesise a continuation segment that starts at 00:00 on dateStr.
    const prevDate = new Date(target);
    prevDate.setDate(prevDate.getDate() - 1);
    const prevDateStr = dateToLocalString(prevDate);

    // Helper: does a resolved event cross midnight?
    const crossesMidnight = ev => {
        if (ev.isAllDay || !ev.startTime || !ev.endTime) return false;
        const sm = ev.startTime.split(':').map(Number);
        const em = ev.endTime.split(':').map(Number);
        const startM = sm[0] * 60 + sm[1];
        const endM   = em[0] * 60 + em[1];
        return endM < startM; // strictly less — endM === 0 (midnight) counts too
    };

    const makeContinuation = (ev, originalDateStr) => ({
        ...ev,
        date:           dateStr,
        startTime:      '00:00',
        isContinuation: true,
        originalDate:   originalDateStr,
        // give it a stable unique id so the layout map doesn't collide
        id: ev.id + '_cont_' + dateStr,
        parentId:       ev.parentId || ev.id,
    });

    for (const ev of events) {
        if (ev.parentId || ev.isAllDay) continue;

        // Check whether the *base* event on prevDateStr crosses midnight
        if (ev.date === prevDateStr) {
            const resolved = ev.isPrayerBased ? resolvePrayerTimesSync(ev, prevDateStr) : ev;
            if (crossesMidnight(resolved)) {
                result.push(makeContinuation(resolved, prevDateStr));
            }
            continue;
        }

        // Check whether a *virtual repeat* occurrence on prevDateStr crosses midnight
        if (!ev.repeat || ev.repeat === 'none') continue;
        if (new Date(prevDateStr + 'T12:00:00') < new Date(ev.date + 'T12:00:00')) continue;
        if (!isRepeatOccurrence(ev, prevDateStr)) continue;
        const instance = { ...ev, date: prevDateStr, id: ev.id + '_' + prevDateStr, parentId: ev.id };
        const resolved = instance.isPrayerBased ? resolvePrayerTimesSync(instance, prevDateStr) : instance;
        if (crossesMidnight(resolved)) {
            result.push(makeContinuation(resolved, prevDateStr));
        }
    }

    return result;
}
// Cache keys are like: "2025-03-15_lat_lng_mMethod" (exact date) or "2025-03_city_..." (month)
function resolvePrayerTimesSync(ev, dateStr) {
    if (!ev.isPrayerBased || !ev.prayerConfig) return ev;
    const cfg = ev.prayerConfig;
    const cacheKeys = Object.keys(state.prayerTimesCache);
    const exactKey = cacheKeys.find(k => k.startsWith(dateStr + '_'));
    const fallbackKey = exactKey || cacheKeys.find(k => k.startsWith(dateStr.substring(0, 7)));
    const timings = fallbackKey ? state.prayerTimesCache[fallbackKey] : null;
    if (!timings) return ev;

    // New format: supports mixed prayer/time anchors
    if (cfg.startPrayer !== undefined || cfg.startType !== undefined || cfg.startFixedTime !== undefined) {
        let startMinutes = null, endMinutes = null;

        // Resolve start
        if ((cfg.startType || 'prayer') === 'time' && cfg.startFixedTime) {
            const [h, m] = cfg.startFixedTime.split(':').map(Number);
            startMinutes = h * 60 + m;
        } else {
            const sp = cfg.startPrayer || cfg.prayer || 'Fajr';
            if (timings[sp]) startMinutes = getPrayerTimeInMinutes(timings[sp]) + (cfg.startOffset || 0);
        }

        // Resolve end
        if ((cfg.endType || 'prayer') === 'time' && cfg.endFixedTime) {
            const [h, m] = cfg.endFixedTime.split(':').map(Number);
            endMinutes = h * 60 + m;
        } else {
            const ep = cfg.endPrayer || cfg.prayer || 'Fajr';
            if (timings[ep]) endMinutes = getPrayerTimeInMinutes(timings[ep]) + (cfg.endOffset || 0);
        }

        if (startMinutes !== null && endMinutes !== null) {
            return { ...ev,
                startTime: minutesToTimeString(startMinutes),
                endTime:   minutesToTimeString(endMinutes) };
        }
    }
    // Legacy format: single prayer field
    if (cfg.prayer && timings[cfg.prayer]) {
        const base = getPrayerTimeInMinutes(timings[cfg.prayer]);
        if (base !== null) {
            return { ...ev,
                startTime: minutesToTimeString(base + (cfg.startOffset || 0)),
                endTime:   minutesToTimeString(base + (cfg.endOffset   || 0)) };
        }
    }
    return ev;
}

// Check if a given dateStr is a valid repeat occurrence for baseEvent
function isRepeatOccurrence(baseEvent, dateStr) {
    const target = new Date(dateStr + 'T12:00:00');
    const baseDate = new Date(baseEvent.date + 'T12:00:00');
    if (target <= baseDate) return false;

    // Skip explicitly deleted occurrences
    if (baseEvent.deletedDates?.includes(dateStr)) return false;

    const config = baseEvent.repeatConfig || {};
    const endType = config.endType || 'never';
    const endCount = parseInt(config.endCount) || 52;
    const endDate = config.endDate ? new Date(config.endDate + 'T12:00:00') : null;
    const snap = (config.monthOverflow || 'snap') !== 'skip';

    if (endType === 'on' && endDate && target > endDate) return false;
    if (endType === 'after') {
        // Count which occurrence number this date would be
        const windowStart = new Date(baseDate);
        windowStart.setDate(windowStart.getDate() + 1);
        const occurrences = getRepeatDatesInWindow(baseEvent, windowStart, target);
        const lastOccurrence = occurrences[occurrences.length - 1];
        if (!lastOccurrence || dateToLocalString(lastOccurrence) !== dateStr) return false;
        if (occurrences.length > endCount) return false;
    }

    const daysDiff = Math.round((target - baseDate) / 86400000);

    switch (baseEvent.repeat) {
        case 'daily': return daysDiff > 0;
        case 'weekly': return daysDiff > 0 && daysDiff % 7 === 0;
        case 'weekdays': {
            if (target.getDay() === 0 || target.getDay() === 6) return false;
            // Count weekdays from base to target
            let count = 0;
            const d = new Date(baseDate);
            while (d < target) {
                d.setDate(d.getDate() + 1);
                if (d.getDay() !== 0 && d.getDay() !== 6) count++;
            }
            return dateToLocalString(d) === dateStr;
        }
        case 'monthly': {
            if (config.monthlyType === 'nthWeekday' && config.nthWeek && config.nthWeekday != null) {
                if (target.getDay() !== config.nthWeekday) return false;
                const nth = Math.ceil(target.getDate() / 7);
                return nth === config.nthWeek &&
                    (target.getMonth() - baseDate.getMonth() + (target.getFullYear() - baseDate.getFullYear()) * 12) > 0;
            }
            if (target.getDate() !== baseDate.getDate()) {
                // Handle snap: last day of month
                if (!snap) return false;
                const daysInMonth = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
                if (!(baseDate.getDate() > daysInMonth && target.getDate() === daysInMonth)) return false;
            }
            return (target.getMonth() - baseDate.getMonth() + (target.getFullYear() - baseDate.getFullYear()) * 12) > 0;
        }
        case 'yearly':
            return target.getMonth() === baseDate.getMonth() &&
                   target.getDate() === baseDate.getDate() &&
                   target.getFullYear() > baseDate.getFullYear();
        case 'custom': {
            const interval = parseInt(config.interval) || 1;
            const unit = config.unit || 'days';
            const specificDays = config.days && config.days.length > 0 ? config.days : null;
            switch (unit) {
                case 'days': return daysDiff > 0 && daysDiff % interval === 0;
                case 'weeks':
                    if (specificDays) {
                        if (!specificDays.includes(target.getDay())) return false;
                        const weeksDiff = Math.floor(daysDiff / 7);
                        return weeksDiff > 0 && weeksDiff % interval === 0;
                    }
                    return daysDiff > 0 && (daysDiff / 7) % interval === 0;
                case 'months': {
                    const monthsDiff = (target.getMonth() - baseDate.getMonth()) + (target.getFullYear() - baseDate.getFullYear()) * 12;
                    if (monthsDiff <= 0 || monthsDiff % interval !== 0) return false;
                    if (config.monthlyType === 'nthWeekday' && config.nthWeek && config.nthWeekday != null) {
                        if (target.getDay() !== config.nthWeekday) return false;
                        return Math.ceil(target.getDate() / 7) === config.nthWeek;
                    }
                    if (target.getDate() !== baseDate.getDate()) {
                        if (!snap) return false;
                        const daysInMonth = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
                        return baseDate.getDate() > daysInMonth && target.getDate() === daysInMonth;
                    }
                    return true;
                }
                case 'years': {
                    const yearsDiff = target.getFullYear() - baseDate.getFullYear();
                    return yearsDiff > 0 && yearsDiff % interval === 0 &&
                           target.getMonth() === baseDate.getMonth() && target.getDate() === baseDate.getDate();
                }
            }
        }
        default: return false;
    }
}

// Virtual repeat system: instances computed on-demand by getEventsForDate().
// generateRepeatEvents kept as no-op for compatibility.
function generateRepeatEvents() {}
