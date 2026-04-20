
// EVENT DETAILS PANEL

function openEventDetails(event) {
    _pendingDetailsEvent = event;
    document.getElementById('eventDetailsModal')?.remove();

    const cal       = state.calendars.find(c => c.id === event.calendar);
    const colorObj  = CALENDAR_COLORS.find(c => c.id === event.color) || CALENDAR_COLORS[0];
    const date      = new Date(event.date + 'T12:00:00');
    const dateLabel = state.language === 'ar'
        ? t('dayNamesLong')[date.getDay()] + '، ' + date.getDate() + ' ' + t('monthNames')[date.getMonth()] + ' ' + date.getFullYear()
        : date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    const hijri     = toHijri(date);
    const _hm = islamicMonths.indexOf(hijri.month) + 1;
    const hijriLabel = `${hijri.day} ${tHijri(_hm)} ${hijri.year} ${t('hijriYearSuffix')}`;

    let timeLabel;
    if (event.isAllDay) {
        timeLabel = t('allDay');
    } else {
        const fmt = t => {
            const [h, m] = t.split(':').map(Number);
            const ampm = state.language==='ar' ? (h >= 12 ? 'م' : 'ص') : (h >= 12 ? 'PM' : 'AM');
            return `${h % 12 || 12}:${String(m).padStart(2,'0')} ${ampm}`;
        };
        timeLabel = `${fmt(event.startTime)} – ${fmt(event.endTime)}`;
    }

    const _repeatKeyMap = { daily: 'daily', weekly: 'weekly', monthly: 'monthly', yearly: 'yearly' };
    const _repeatTrans = { daily: state.language==='ar'?'يومياً':'Daily', weekly: state.language==='ar'?'أسبوعياً':'Weekly', monthly: state.language==='ar'?'شهرياً':'Monthly', yearly: state.language==='ar'?'سنوياً':'Yearly' };
    const repeatLabel = event.repeat && event.repeat !== 'none'
        ? `<div class="flex items-center gap-3 text-sm theme-text-secondary">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            <span>${_repeatTrans[event.repeat] || event.repeat}</span>
           </div>` : '';

    const descLabel = event.description
        ? `<div class="flex items-start gap-3 text-sm">
            <svg class="w-4 h-4 theme-text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
            <span class="theme-text leading-relaxed">${event.description.replace(/</g,'&lt;')}</span>
           </div>` : '';

    const pointsLabel = event.points
        ? `<div class="flex items-center gap-3 text-sm">
            <svg class="w-4 h-4 theme-text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
            <span class="text-blue-600 dark:text-blue-400 font-semibold">${event.points} ${t('pts')}</span>
           </div>` : '';

    const modal = document.createElement('div');
    modal.id = 'eventDetailsModal';
    modal.className = 'fixed inset-0 modal-backdrop flex items-center justify-center z-50 px-4';
    modal.innerHTML = `
        <div class="theme-bg rounded-2xl shadow-2xl w-full max-w-sm modal-animate border theme-border overflow-hidden">
            <div class="h-1.5 w-full ${colorObj.bg}"></div>
            <div class="p-5">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex-1 pr-3">
                        <h3 class="text-lg font-semibold theme-text leading-tight">${event.title}</h3>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="w-2 h-2 rounded-full ${colorObj.bg} flex-shrink-0"></span>
                            <span class="text-xs theme-text-secondary">${cal?.name || 'Calendar'}</span>
                        </div>
                    </div>
                    <button onclick="document.getElementById('eventDetailsModal').remove()" class="shrink-0 p-1.5 rounded-lg hover:theme-bg-tertiary transition-colors theme-text-secondary">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>

                <div class="space-y-2.5 mb-5">
                    <div class="flex items-start gap-3 text-sm">
                        <svg class="w-4 h-4 theme-text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        <div>
                            <div class="theme-text">${dateLabel}</div>
                            <div class="text-xs theme-text-secondary mt-0.5">${hijriLabel}</div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 text-sm">
                        <svg class="w-4 h-4 theme-text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <span class="theme-text">${timeLabel}</span>
                    </div>
                    ${descLabel}
                    ${pointsLabel}
                    ${repeatLabel}
                </div>

                <div class="flex gap-2">
                    <button onclick="document.getElementById('eventDetailsModal').remove()" class="flex-1 py-2.5 rounded-xl border theme-border text-sm font-medium theme-text-secondary hover:theme-bg-tertiary transition-colors">
                        ${t('close')}
                    </button>
                    <button onclick="editFromDetails()" class="flex-1 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors flex items-center justify-center gap-1.5">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        ${t('edit')}
                    </button>
                </div>
            </div>
        </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
}

function editFromDetails() {
    const ev = _pendingDetailsEvent;
    document.getElementById('eventDetailsModal')?.remove();
    if (ev) openModal(ev);
}

// CLOSE MODAL

function closeModal() {
    hideEl('eventModal');
    state.editingEventId = null;
    state.editingEventDate = null;
    state.usePrayerTimes = false;
    state.prayerTimesForDate = null;
}


// EDIT SERIES MODAL

function openEditSeriesModal() { showEl('editSeriesModal'); }

function closeEditSeriesModal() {
    hideEl('editSeriesModal');
    state._pendingEditData = null;
}

function confirmEditSeries(editAll) {
    const pending = state._pendingEditData;
    if (!pending) return;
    const { eventData } = pending;

    if (editAll) {
        const idx = events.findIndex(ev => ev.id === state.editingEventId);
        if (idx !== -1) events[idx] = { ...eventData, deletedDates: events[idx].deletedDates };
    } else {
        // Editing only this occurrence: mark the original date deleted, add a one-off event
        const baseEvent = events.find(ev => ev.id === state.editingEventId);
        const targetDate = state.editingEventDate || eventData.date;
        if (baseEvent && state.editingEventDate) {
            if (!baseEvent.deletedDates) baseEvent.deletedDates = [];
            if (!baseEvent.deletedDates.includes(targetDate)) baseEvent.deletedDates.push(targetDate);
        }
        // Push a standalone copy for this specific date
        events.push({ ...eventData, id: Date.now(), repeat: 'none', repeatConfig: undefined, deletedDates: undefined });
    }
    saveEvents();
    renderCurrentView();
    closeEditSeriesModal();
    closeModal();
}

function deleteEvent() {
    if (!state.editingEventId) return;
    cancelEventNotification(state.editingEventId);
    const eventToDelete = events.find(e => e.id === state.editingEventId);
    const isRepeating = eventToDelete && eventToDelete.repeat && eventToDelete.repeat !== 'none';

    if (!isRepeating) {
        events = events.filter(e => e.id !== state.editingEventId);
        saveEvents(); renderCurrentView(); closeModal();
        return;
    }
    openDeleteSeriesSheet(eventToDelete);
}

function openDeleteSeriesSheet(eventToDelete) {
    $('deleteSeriesSheet')?.remove();
    const sheet = document.createElement('div');
    sheet.id = 'deleteSeriesSheet';
    sheet.className = 'fixed inset-0 flex items-end sm:items-center justify-center z-[70]';
    sheet.style.background = 'rgba(0,0,0,0.5)';
    sheet.innerHTML = `
        <div class="theme-bg w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl shadow-2xl border theme-border overflow-hidden modal-animate">
            <div class="px-5 pt-5 pb-2 border-b theme-border">
                <h3 class="font-semibold">${state.language==='ar' ? 'حدث متكرر' : 'Recurring event'}</h3>
                <p class="text-xs theme-text-secondary mt-0.5 truncate">${eventToDelete.title}</p>
            </div>
            <div class="divide-y theme-border">
                <button onclick="confirmDeleteSeries('one')" class="w-full flex items-center gap-3 px-5 py-3.5 hover:theme-bg-tertiary transition-colors text-left">
                    <span class="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 text-sm font-medium">1</span>
                    <div>
                        <div class="text-sm font-medium">${state.language==='ar' ? 'حذف هذا الحدث فقط' : 'Delete this event only'}</div>
                        <div class="text-xs theme-text-secondary">${state.language==='ar' ? 'إزالة هذا التكرار فقط نهائياً' : 'Permanently remove just this occurrence'}</div>
                    </div>
                </button>
                <button onclick="confirmDeleteSeries('following')" class="w-full flex items-center gap-3 px-5 py-3.5 hover:theme-bg-tertiary transition-colors text-left">
                    <span class="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0 text-orange-600 dark:text-orange-400">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
                    </span>
                    <div>
                        <div class="text-sm font-medium">${state.language==='ar' ? 'هذا والأحداث التالية' : 'This and following events'}</div>
                        <div class="text-xs theme-text-secondary">${state.language==='ar' ? 'حذف من هنا حتى نهاية السلسلة' : 'Delete from here to end of series'}</div>
                    </div>
                </button>
                <button onclick="confirmDeleteSeries('all')" class="w-full flex items-center gap-3 px-5 py-3.5 hover:theme-bg-tertiary transition-colors text-left">
                    <span class="w-7 h-7 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0 text-red-600">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </span>
                    <div>
                        <div class="text-sm font-medium text-red-600 dark:text-red-400">${state.language==='ar' ? 'جميع أحداث السلسلة' : 'All events in the series'}</div>
                        <div class="text-xs theme-text-secondary">${state.language==='ar' ? 'إزالة كل تكرار' : 'Remove every occurrence'}</div>
                    </div>
                </button>
            </div>
            <div class="p-3">
                <button onclick="closeDeleteSeriesSheet()" class="w-full py-2.5 text-sm font-medium rounded-xl theme-bg-tertiary hover:opacity-80 transition-colors">
                    ${t('cancel')}
                </button>
            </div>
        </div>`;
    sheet.addEventListener('click', e => { if (e.target === sheet) closeDeleteSeriesSheet(); });
    document.body.appendChild(sheet);
}

function closeDeleteSeriesSheet() {
    $('deleteSeriesSheet')?.remove();
}

function confirmDeleteSeries(scope) {
    const baseEvent = events.find(e => e.id === state.editingEventId);
    if (!baseEvent) { closeDeleteSeriesSheet(); return; }

    if (scope === 'one') {
        // For virtual occurrences: store the date as an exception on the base event
        // For the base event date itself: shift the series start forward to next occurrence
        const targetDate = state.editingEventDate || baseEvent.date;
        if (targetDate === baseEvent.date) {
            // Deleting the very first occurrence — find next and make it the new base
            const nextWindow = new Date(baseEvent.date + 'T12:00:00');
            nextWindow.setDate(nextWindow.getDate() + 1);
            const far = new Date(nextWindow); far.setFullYear(far.getFullYear() + 10);
            const nexts = getRepeatDatesInWindow(baseEvent, nextWindow, far);
            if (nexts.length) {
                baseEvent.date = dateToLocalString(nexts[0]);
            } else {
                // No more occurrences — delete whole series
                events = events.filter(e => e.id !== baseEvent.id);
            }
        } else {
            // Virtual occurrence — add to deletedDates set on the base event
            if (!baseEvent.deletedDates) baseEvent.deletedDates = [];
            if (!baseEvent.deletedDates.includes(targetDate)) baseEvent.deletedDates.push(targetDate);
        }
    } else if (scope === 'following') {
        const cutDate = state.editingEventDate || baseEvent.date;
        if (cutDate === baseEvent.date) {
            events = events.filter(e => e.id !== baseEvent.id);
        } else {
            // Truncate series: set endDate to one day before cut
            const d = new Date(cutDate + 'T12:00:00'); d.setDate(d.getDate() - 1);
            if (!baseEvent.repeatConfig) baseEvent.repeatConfig = {};
            baseEvent.repeatConfig.endType = 'on';
            baseEvent.repeatConfig.endDate = dateToLocalString(d);
        }
    } else {
        events = events.filter(e => e.id !== baseEvent.id);
    }

    saveEvents(); renderCurrentView();
    closeDeleteSeriesSheet();
    closeModal();
}

// EVENT RENDERING

// OVERLAP LAYOUT — assigns column slots to concurrent timed events
function computeEventLayout(timedEvents) {
    const layout = new Map();
    if (!timedEvents.length) return layout;

    const toMin = ev => {
        const [h, m] = ev.startTime.split(':').map(Number);
        return h * 60 + m;
    };
    const toEnd = ev => {
        const [h, m] = ev.endTime.split(':').map(Number);
        return Math.max(h * 60 + m, toMin(ev) + 1);
    };

    timedEvents.forEach(ev => layout.set(ev.id, { col: 0, total: 1 }));
    const sorted = [...timedEvents].sort((a, b) => toMin(a) - toMin(b));

    // Greedy column assignment
    const colEnds = [];
    for (const ev of sorted) {
        const start = toMin(ev), end = toEnd(ev);
        let col = colEnds.findIndex(e => e <= start);
        if (col === -1) { col = colEnds.length; colEnds.push(end); }
        else colEnds[col] = end;
        layout.get(ev.id).col = col;
    }

    // For each event, total = max (col index + 1) among all overlapping peers
    for (const ev of sorted) {
        const start = toMin(ev), end = toEnd(ev);
        let maxCol = layout.get(ev.id).col;
        for (const other of sorted) {
            if (other.id === ev.id) continue;
            if (toMin(other) < end && toEnd(other) > start)
                maxCol = Math.max(maxCol, layout.get(other.id).col);
        }
        layout.get(ev.id).total = maxCol + 1;
    }

    return layout;
}

function createEventElement(event, layout = {col:0, total:1}) {
    if (event.isAllDay) {
        const el = document.createElement('div');
        el.className = `event-card ${event.color} all-day`;
        el.innerHTML = `
            <div class="font-semibold truncate text-xs flex items-center">
                <span class="w-2 h-2 rounded-full bg-white/50 mr-1"></span>
                ${event.title}
            </div>
        `;
        el.addEventListener('click', e => { e.stopPropagation(); openEventDetails(event); });
        return el;
    }

    const [startHour, startMin] = event.startTime.split(':').map(Number);
    const [endHour, endMin] = event.endTime.split(':').map(Number);
    const startMinutes = startHour * 60 + startMin;
    const endMinutes   = endHour   * 60 + endMin;
    // An event crosses midnight when endTime < startTime (and it's not a continuation itself)
    const crossesMidnight = !event.isContinuation && endMinutes < startMinutes;
    // Effective end: for cross-midnight events, draw to bottom of the column (24 h)
    const effectiveEnd = crossesMidnight ? 1440 : endMinutes;
    const duration = effectiveEnd - startMinutes;

    const el = document.createElement('div');
    // Continuation events get a dashed top-border to signal they started the day before
    el.className = `event-card ${event.color}${event.isContinuation ? ' event-continuation' : ''}`;
    el.style.top = `${(startMinutes / 60) * 60}px`;
    el.style.height = `${Math.max((duration / 60) * 60 - 2, 20)}px`;
    if (layout.total > 1) {
        const pct = 100 / layout.total;
        el.style.left  = `calc(${layout.col * pct}% + 2px)`;
        el.style.width = `calc(${pct}% - 4px)`;
        el.style.right = 'auto';
    }
    el.draggable = true;

    const prayerIndicator = event.isPrayerBased ? `
        <div class="absolute top-1 right-1 opacity-75" title="${(() => { const cfg = event.prayerConfig; if (!cfg) return 'prayer'; const s = cfg.startType === 'time' ? cfg.startFixedTime : (cfg.startPrayer || cfg.prayer || 'prayer'); const e = cfg.endType === 'time' ? cfg.endFixedTime : (cfg.endPrayer || cfg.prayer || 'prayer'); return s + ' → ' + e; })()} ">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
        </div>` : '';

    const repeatIcon = (event.repeat && event.repeat !== 'none' && !event.isPrayerBased) ? `
        <div class="absolute top-1 right-1 opacity-75">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        </div>` : '';

    el.innerHTML = `
        <div class="font-semibold truncate text-xs">${event.title}</div>
        <div class="opacity-90 truncate text-[10px]">${
            event.isContinuation
                ? '↩ cont\u2019d → ' + event.endTime
                : crossesMidnight
                    ? event.startTime + ' – ' + event.endTime + ' +1'
                    : event.startTime + ' – ' + event.endTime
        }</div>
        ${repeatIcon}${prayerIndicator}
        <div class="resize-handle"></div>
    `;

    el.addEventListener('click', e => { e.stopPropagation(); openEventDetails(event); });
    el.addEventListener('dragstart', (e) => {
        state.draggedEvent = event;
        el.style.opacity = '0.5';
        e.dataTransfer.effectAllowed = 'move';
    });
    el.addEventListener('dragend', () => {
        el.style.opacity = '1';
        state.draggedEvent = null;
    });

    if (!event.isContinuation) setupResizeHandler(el, event, startHour, startMin);
    return el;
}

// Global mousemove/mouseup are set up ONCE in initResizeHandlers(), preventing accumulation.
function setupResizeHandler(el, event, startHour, startMin) {
    const handle = el.querySelector('.resize-handle');
    if (!handle) return;
    handle.addEventListener('mousedown', (e) => {
        _resizeState = { event, startY: e.clientY, startHeight: el.offsetHeight, startHour, startMin };
        e.stopPropagation();
        e.preventDefault();
    });
}

// Called ONCE at init — no accumulation
function initResizeHandlers() {
    document.addEventListener('mousemove', (e) => {
        if (!_resizeState) return;
        const { event, startY, startHeight, startHour, startMin } = _resizeState;
        const diff = e.clientY - startY;
        const newHeight = startHeight + diff;
        const slots = Math.round(newHeight / 60);
        if (slots >= 1) {
            const newEndMinutes = (startHour * 60 + startMin) + (slots * 60);
            const newEndHour = Math.floor(newEndMinutes / 60) % 24;
            const newEndMin = newEndMinutes % 60;
            event.endTime = `${String(newEndHour).padStart(2, '0')}:${String(newEndMin).padStart(2, '0')}`;
            renderWeekView();
        }
    });
    document.addEventListener('mouseup', () => {
        if (_resizeState) { _resizeState = null; saveEvents(); }
    });
}

// WEEK VIEW

