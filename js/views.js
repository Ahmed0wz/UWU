function renderWeekView() {
    const isMobile = window.innerWidth < 768;
    // Clear any stale animation classes before rebuilding to prevent layout bleed
    const wv = document.getElementById('weekView');
    if (wv) wv.classList.remove('nav-anim-next','nav-anim-prev','nav-anim-switch');
    if (isMobile) {
        renderMobileWeekView();
    } else {
        const startOfWeek = new Date(state.currentDate);
        startOfWeek.setDate(state.currentDate.getDate() - state.currentDate.getDay());
        updateHeader(startOfWeek);
        renderWeekHeader(startOfWeek);
        renderWeekAllDayRow(startOfWeek, 7);
        renderWeekBody(startOfWeek);
        updateTimeIndicator();
    }
}

// 3-day view for mobile — shows yesterday, today, tomorrow relative to currentDate
function renderMobileWeekView() {
    // Start from day before currentDate
    const startDay = new Date(state.currentDate);
    startDay.setDate(state.currentDate.getDate() - 1);
    updateHeader(startDay);
    renderMobileWeekHeader(startDay);
    renderWeekAllDayRow(startDay, 3);
    renderMobileWeekBody(startDay);
    updateTimeIndicator();
}

function renderMobileWeekHeader(startDay) {
    const weekHeader = document.querySelector('.week-header');
    if (!weekHeader) return;
    weekHeader.innerHTML = '';

    const cornerCell = document.createElement('div');
    cornerCell.className = 'p-2 border-r theme-border';
    cornerCell.style.width = '44px';
    weekHeader.appendChild(cornerCell);

    const dayNames = t('dayNamesShort');
    for (let i = 0; i < 3; i++) {
        const date = new Date(startDay);
        date.setDate(startDay.getDate() + i);
        const isToday  = dateToLocalString(date) === todayLocalString();
        const hijri    = toHijri(date);
        const dateStr  = dateToLocalString(date);
        const dayEntry = state.journalEntries[dateStr];
        const dayScore = dayEntry?.score ?? null;

        const headerCell = document.createElement('div');
        headerCell.className = `p-2 text-center border-r theme-border last:border-r-0 cursor-pointer ${isToday ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`;
        headerCell.onclick = () => {
            state.currentDate = new Date(date);
            renderMiniCalendar();
            switchView('day');

        };
        const isHijriMode = state.calendarMode === 'hijri';
        const primaryNum = isHijriMode ? hijri.day : date.getDate();
        const secondaryLabel = isHijriMode
            ? date.getDate() + ' ' + t('monthNamesShort')[date.getMonth()]
            : hijri.day + ' ' + tHijri(islamicMonths.indexOf(hijri.month) + 1).substring(0, 4);

        headerCell.innerHTML = `
            <div class="text-xs font-medium theme-text-secondary uppercase tracking-wider">${dayNames[date.getDay()]}</div>
            <div class="text-xl font-semibold ${isToday ? 'text-blue-600 dark:text-blue-400' : 'theme-text'} leading-tight">${primaryNum}</div>
            <div class="text-[10px] theme-text-secondary">${secondaryLabel}</div>
            ${dayScore !== null ? `<div class="text-[10px] font-semibold text-blue-500 mt-0.5">${dayScore}${t('pts')}</div>` : ''}
        `;
        weekHeader.appendChild(headerCell);
    }
}

function renderMobileWeekBody(startDay) {
    const weekBody = document.getElementById('weekBody');
    if (!weekBody) return;
    weekBody.innerHTML = '';

    // Set grid to 3 columns
    const weekHeader = document.querySelector('.week-header');
    if (weekHeader) weekHeader.style.gridTemplateColumns = '44px repeat(3, 1fr)';
    weekBody.style.gridTemplateColumns = '44px repeat(3, 1fr)';

    const timeColumn = document.createElement('div');
    timeColumn.className = 'border-r theme-border relative shrink-0';
    timeColumn.style.width = '44px';
    for (let hour = 0; hour < 24; hour++) {
        const timeLabel = document.createElement('div');
        timeLabel.className = 'h-[60px] border-b theme-border text-[10px] theme-text-secondary flex items-start justify-end pr-1 pt-1';
        timeLabel.textContent = formatHour(hour);
        timeColumn.appendChild(timeLabel);
    }
    weekBody.appendChild(timeColumn);

    for (let i = 0; i < 3; i++) {
        const date = new Date(startDay);
        date.setDate(startDay.getDate() + i);
        const isToday = dateToLocalString(date) === todayLocalString();
        const dateStr = dateToLocalString(date);
        weekBody.appendChild(createDayColumn(dateStr, isToday, i));
    }
}


function updateHeader(startOfWeek) {
    // Always remove the sighting button when not in month view
    const existingSightingBtn = document.getElementById('hijriSightingBtn');
    if (existingSightingBtn) existingSightingBtn.remove();

    const currentMonth = document.getElementById('currentMonth');
    const currentYear = document.getElementById('currentYear');
    if (state.calendarMode === 'hijri') {
        const h = toHijri(state.currentDate);
        const hm = islamicMonths.indexOf(h.month) + 1;
        if (currentMonth) currentMonth.textContent = tHijri(hm);
        if (currentYear) { currentYear.textContent = h.year + ' ' + t('hijriYearSuffix'); }
    } else {
        if (currentMonth) currentMonth.textContent = t('monthNames')[state.currentDate.getMonth()];
        if (currentYear) { currentYear.textContent = state.currentDate.getFullYear(); }
    }
}

function renderWeekHeader(startOfWeek) {
    const weekHeader = document.querySelector('.week-header');
    if (!weekHeader) return;
    weekHeader.style.gridTemplateColumns = '60px repeat(7, 1fr)';

    // Calculate week total once
    let weekTotal = 0;
    for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        const entry = state.journalEntries[dateToLocalString(d)];
        if (entry?.score) weekTotal += entry.score;
    }

    weekHeader.innerHTML = '';

    // Time-label corner cell — shows week total
    const cornerCell = document.createElement('div');
    cornerCell.className = 'p-3 border-r theme-border flex flex-col items-center justify-end';
    cornerCell.style.width = '60px';
    cornerCell.innerHTML = weekTotal > 0
        ? `<span class="text-[10px] font-bold text-blue-600 dark:text-blue-400 leading-tight">${weekTotal}</span><span class="text-[9px] theme-text-secondary">${t('pts')}</span>`
        : '';
    weekHeader.appendChild(cornerCell);

    const dayNames = t('dayNamesShort');
    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        const isToday  = dateToLocalString(date) === todayLocalString();
        const hijri    = toHijri(date);
        const dateStr  = dateToLocalString(date);
        const dayEntry = state.journalEntries[dateStr];
        const dayScore = dayEntry?.score ?? null;

        const headerCell = document.createElement('div');
        headerCell.className = `p-3 text-center border-r theme-border last:border-r-0 cursor-pointer ${isToday ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`;
        headerCell.onclick = () => {
            state.currentDate = new Date(date);
            renderMiniCalendar();
            switchView('day');

        };
        const isHijriMode = state.calendarMode === 'hijri';
        const primaryNum = isHijriMode ? hijri.day : date.getDate();
        const secondaryLabel = isHijriMode
            ? date.getDate() + ' ' + t('monthNamesShort')[date.getMonth()]
            : hijri.day + ' ' + tHijri(islamicMonths.indexOf(hijri.month) + 1).substring(0, 4);

        headerCell.innerHTML = `
            <div class="text-xs font-medium theme-text-secondary uppercase tracking-wider mb-1">${dayNames[i]}</div>
            <div class="flex items-center justify-center space-x-2">
                <span class="text-xl font-semibold ${isToday ? 'text-blue-600 dark:text-blue-400' : 'theme-text'}">${primaryNum}</span>
                <span class="islamic-date">(${secondaryLabel})</span>
            </div>
            ${dayScore !== null ? `<div class="text-[10px] font-semibold text-blue-500 dark:text-blue-300 mt-0.5">${dayScore} ${t('pts')}</div>` : ''}
        `;
        weekHeader.appendChild(headerCell);
    }
}

// Render all-day events in a shared row below the week header (Notion-style)
function renderWeekAllDayRow(startOfWeek, numDays) {
    const row = document.getElementById('weekAllDayRow');
    const grid = document.getElementById('weekAllDayGrid');
    if (!row || !grid) return;

    // Check if any day has all-day events
    let hasAny = false;
    const cols = [];
    for (let i = 0; i < numDays; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        const dateStr = dateToLocalString(date);
        const allDayEvts = getEventsForDate(dateStr).filter(e => e.isAllDay && state.activeCalendars.includes(e.calendar));
        if (allDayEvts.length) hasAny = true;
        cols.push({ dateStr, allDayEvts });
    }

    if (!hasAny) { row.classList.add('hidden'); return; }

    const timeColWidth = numDays === 3 ? '44px' : '60px';
    grid.style.gridTemplateColumns = `${timeColWidth} repeat(${numDays}, 1fr)`;

    grid.innerHTML = '';
    // Corner cell
    const corner = document.createElement('div');
    corner.className = 'border-r theme-border bg-gray-50/50 dark:bg-gray-900/20 px-1 py-1 flex items-center justify-end';
    corner.innerHTML = '<span class="text-[9px] theme-text-secondary font-medium leading-none">ALL</span>';
    grid.appendChild(corner);

    cols.forEach(({ allDayEvts }, ci) => {
        const cell = document.createElement('div');
        cell.className = `border-r theme-border last:border-r-0 bg-gray-50/50 dark:bg-gray-900/20 px-1 py-1 min-h-[28px] space-y-0.5`;
        allDayEvts.forEach(ev => {
            const el = document.createElement('div');
            el.className = `event-card ${ev.color} all-day truncate cursor-pointer`;
            el.textContent = ev.title;
            el.onclick = e => { e.stopPropagation(); openEventDetails(ev); };
            cell.appendChild(el);
        });
        grid.appendChild(cell);
    });

    row.classList.remove('hidden');
}


function renderWeekBody(startOfWeek) {
    const weekBody = document.getElementById('weekBody');
    if (!weekBody) return;
    weekBody.style.gridTemplateColumns = '60px repeat(7, 1fr)';
    weekBody.innerHTML = '';

    const timeColumn = document.createElement('div');
    timeColumn.className = 'border-r theme-border relative shrink-0';
    timeColumn.style.width = '60px';
    for (let hour = 0; hour < 24; hour++) {
        const timeLabel = document.createElement('div');
        timeLabel.className = 'h-[60px] border-b theme-border text-xs theme-text-secondary flex items-start justify-end pr-2 pt-1';
        timeLabel.textContent = formatHour(hour);
        timeColumn.appendChild(timeLabel);
    }
    weekBody.appendChild(timeColumn);

    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        const isToday = dateToLocalString(date) === todayLocalString();
        const dateStr = dateToLocalString(date);
        weekBody.appendChild(createDayColumn(dateStr, isToday, i));
    }
}

function createDayColumn(dateStr, isToday, dayIndex) {
    const dayColumn = document.createElement('div');
    dayColumn.dataset.date = dateStr; // used by updateTimeIndicator to find today
    dayColumn.className = `day-column relative ${isToday ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`;
    dayColumn.dataset.date = dateStr;

    const dayEvents = getEventsForDate(dateStr).filter(e => state.activeCalendars.includes(e.calendar));

    for (let hour = 0; hour < 24; hour++) {
        dayColumn.appendChild(createHourRow(hour, dateStr));
    }
    const timedEvts = dayEvents.filter(e => !e.isAllDay);
    const evtLayout = computeEventLayout(timedEvts);
    timedEvts.forEach(event => dayColumn.appendChild(createEventElement(event, evtLayout.get(event.id))));
    // Render prayer time markers asynchronously (won't block layout)
    if (state.showPrayerTimesInView) renderPrayerTimesInColumn(dayColumn, dateStr);
    return dayColumn;
}

function createHourRow(hour, dateStr) {
    const hourRow = document.createElement('div');
    hourRow.className = 'hour-row';
    hourRow.dataset.hour = hour;
    hourRow.addEventListener('click', e => {
            if (e.target === hourRow) openModal(null, dateStr, `${String(hour).padStart(2, '0')}:00`);
    });
    hourRow.addEventListener('dragover', handleDragOver);
    hourRow.addEventListener('dragleave', handleDragLeave);
    hourRow.addEventListener('drop', (e) => handleDrop(e, dateStr, hour));
    return hourRow;
}

// Render prayer time lines into a day column (absolute positioned over hours)
async function renderPrayerTimesInColumn(dayColumn, dateStr) {
    if (!state.showPrayerTimesInView || !state.userLocation) return;
    const timings = await getPrayerTimings(new Date(dateStr + 'T12:00:00'));
    if (!timings) return;

    const prayerColors = {
        Fajr:    '#818cf8', // indigo
        Sunrise: '#fb923c', // orange
        Dhuhr:   '#facc15', // yellow
        Asr:     '#34d399', // green
        Maghrib: '#f87171', // red
        Isha:    '#a78bfa'  // purple
    };

    PRAYER_NAMES.forEach(name => {
        const timeStr = timings[name];
        if (!timeStr) return;
        const [h, m] = timeStr.split(':').map(Number);
        const totalMinutes = h * 60 + m;
        const topPx = (totalMinutes / 60) * 60; // 60px per hour

        const marker = document.createElement('div');
        marker.className = 'prayer-time-marker';
        marker.style.cssText = `
            position: absolute;
            left: 0; right: 0;
            top: ${topPx}px;
            height: 1px;
            background: ${prayerColors[name]};
            opacity: 0.7;
            pointer-events: none;
            z-index: 25;
        `;

        const label = document.createElement('div');
        label.style.cssText = `
            position: absolute;
            left: 2px;
            top: -9px;
            font-size: 9px;
            font-weight: 600;
            color: ${prayerColors[name]};
            white-space: nowrap;
            pointer-events: none;
            z-index: 25;
        `;
        const displayName = (name === 'Dhuhr' && new Date(dateStr + 'T12:00:00').getDay() === 5) ? t('jumuah') : t(name);
        label.textContent = `${displayName} ${timeStr}`;
        marker.appendChild(label);
        dayColumn.appendChild(marker);
    });
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = state.isDarkMode ? '#333' : '#f3f4f6';
}
function handleDragLeave(e) { e.currentTarget.style.backgroundColor = ''; }
function handleDrop(e, dateStr, hour) {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = '';
    if (state.draggedEvent) {
        const duration = getDuration(state.draggedEvent.startTime, state.draggedEvent.endTime);
        const [, oldMin] = state.draggedEvent.startTime.split(':').map(Number);
        const newStartTime = `${String(hour).padStart(2, '0')}:${String(oldMin).padStart(2, '0')}`;
        state.draggedEvent.date = dateStr;
        state.draggedEvent.startTime = newStartTime;
        state.draggedEvent.endTime = addMinutes(newStartTime, duration);
        saveEvents(); renderCurrentView();
    }
}

function updateDayTimeIndicator() {
    const grid = document.getElementById('dayHourGrid');
    if (!grid) return;
    grid.querySelectorAll('.current-time-line').forEach(el => el.remove());
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();
    const topPx = (minutes / 60) * 60;
    const line = document.createElement('div');
    line.className = 'current-time-line';
    line.style.cssText = `top:${topPx}px; position:absolute; left:0; right:0; z-index:10;`;
    grid.appendChild(line);
}

function updateTimeIndicator() {
    if (state.currentView !== 'week') return;
    const weekBody = document.getElementById('weekBody');
    if (!weekBody) return;

    weekBody.querySelectorAll('.current-time-line').forEach(el => el.remove());

    const now = new Date();
    const todayStr = dateToLocalString(now);
    const minutes  = now.getHours() * 60 + now.getMinutes();

    // Find the column whose data-date matches today — works for both
    const dayColumns = weekBody.querySelectorAll('.day-column');
    let todayCol = null;
    dayColumns.forEach(col => {
        if (col.dataset.date === todayStr) todayCol = col;
    });
    if (!todayCol) return;

    const topPx = (minutes / 60) * 60;

    const timeLine = document.createElement('div');
    timeLine.className = 'current-time-line';
    timeLine.style.top = `${topPx}px`;
    todayCol.appendChild(timeLine);
}

// MONTH VIEW

function renderMonthView() {
    if (state.calendarMode === 'hijri') { renderHijriMonthView(); return; }
    // Remove stale sighting button when returning to Gregorian
    const existingSightingBtn = document.getElementById('hijriSightingBtn');
    if (existingSightingBtn) existingSightingBtn.remove();

    const grid = document.getElementById('monthGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const year = state.currentDate.getFullYear();
    const month = state.currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const monthNames = t('monthNames');
    const currentMonth = document.getElementById('currentMonth');
    const currentYear = document.getElementById('currentYear');
    if (currentMonth) currentMonth.textContent = monthNames[month];
    if (currentYear) {
        currentYear.textContent = year;
    }

    t('dayNamesShort').forEach(day => {
        const div = document.createElement('div');
        div.className = 'theme-bg-secondary p-2 text-center text-sm font-semibold theme-text-secondary';
        div.textContent = day;
        grid.appendChild(div);
    });

    for (let i = firstDay - 1; i >= 0; i--) {
        const div = document.createElement('div');
        div.className = 'theme-bg p-4 min-h-[100px] theme-text-secondary opacity-50';
        div.textContent = daysInPrevMonth - i;
        grid.appendChild(div);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEvents = getEventsForDate(dateStr).filter(e => state.activeCalendars.includes(e.calendar));
        const isToday = dateStr === todayLocalString();
        const hijri = toHijri(new Date(year, month, day));

        const div = document.createElement('div');
        div.className = `theme-bg p-2 min-h-[100px] border-b border-r theme-border cursor-pointer hover:theme-bg-tertiary transition-colors ${isToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`;
        div.onclick = () => {
            state.currentDate = new Date(year, month, day);
            renderMiniCalendar();
            switchView('day');

        };

        const allDayEvents = dayEvents.filter(e => e.isAllDay);
        const timedEvents = dayEvents.filter(e => !e.isAllDay);
        let eventsHtml = '';
        allDayEvents.slice(0, 2).forEach(e => {
            const colorObj = CALENDAR_COLORS.find(c => c.id === e.color) || CALENDAR_COLORS[0];
            eventsHtml += `<div class="text-xs px-1 py-0.5 rounded mb-1 ${state.isDarkMode ? colorObj.dark : colorObj.light} ${state.isDarkMode ? colorObj.darkText : colorObj.text} truncate">${e.title}</div>`;
        });
        timedEvents.slice(0, allDayEvents.length > 0 ? 2 : 3).forEach(e => {
            const colorObj = CALENDAR_COLORS.find(c => c.id === e.color) || CALENDAR_COLORS[0];
            eventsHtml += `<div class="flex items-center text-xs mb-1"><span class="w-2 h-2 rounded-full ${colorObj.bg} mr-1 flex-shrink-0"></span><span class="truncate theme-text-secondary">${e.startTime} ${e.title}</span></div>`;
        });

        div.innerHTML = `
            <div class="flex items-start justify-between mb-1">
                <span class="text-base font-semibold ${isToday ? 'w-7 h-7 flex items-center justify-center rounded-full bg-blue-600 text-white text-sm' : 'theme-text'}">${day}</span>
                <div class="flex flex-col items-end gap-0.5">
                    <span class="text-[10px] theme-text-secondary">${hijri.day} ${tHijri(islamicMonths.indexOf(hijri.month)+1).substring(0,4)}</span>
                    ${getDayIndicator(dateStr)}
                </div>
            </div>
            <div class="space-y-0.5">
                ${eventsHtml}
                ${dayEvents.length > 3 ? `<div class="text-xs theme-text-secondary">+${dayEvents.length - 3} ${state.language === 'ar' ? 'أخرى' : 'more'}</div>` : ''}
            </div>
        `;
        grid.appendChild(div);
    }

    const remaining = (7 - ((firstDay + daysInMonth) % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
        const div = document.createElement('div');
        div.className = 'theme-bg p-4 min-h-[100px] theme-text-secondary opacity-50';
        div.textContent = i;
        grid.appendChild(div);
    }
}

// YEAR VIEW

function renderYearView() {
    if (state.calendarMode === 'hijri') { renderHijriYearView(); return; }
    const existingSightingBtn = document.getElementById('hijriSightingBtn');
    if (existingSightingBtn) existingSightingBtn.remove();
    const grid = document.getElementById('yearGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const year = state.currentDate.getFullYear();
    const monthNames = t('monthNames');
    const currentMonth = document.getElementById('currentMonth');
    const currentYear = document.getElementById('currentYear');
    if (currentMonth) currentMonth.textContent = t('year');
    if (currentYear) { currentYear.textContent = year; }

    monthNames.forEach((monthName, idx) => {
        const div = document.createElement('div');
        div.className = 'theme-bg-secondary rounded-lg p-4 border theme-border cursor-pointer hover:border-blue-500 transition-colors';
        div.onclick = () => { state.currentDate = new Date(year, idx, 1); switchView('month'); };

        const firstDay = new Date(year, idx, 1).getDay();
        const daysInMonth = new Date(year, idx + 1, 0).getDate();
        let daysHtml = '';
        for (let i = 0; i < firstDay; i++) daysHtml += '<div></div>';
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(idx + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasEvents = events.some(e => e.date === dateStr && state.activeCalendars.includes(e.calendar));
            const isToday = dateStr === todayLocalString();
            daysHtml += `<div class="aspect-square flex items-center justify-center text-xs rounded-full ${isToday ? 'bg-blue-600 text-white' : ''} ${hasEvents && !isToday ? 'font-bold' : ''}">${day}</div>`;
        }

        div.innerHTML = `
            <div class="font-semibold mb-3 flex items-center justify-between">
                <span>${monthName}</span>
                ${(() => { const mTotal = calcMonthTotal(`${year}-${String(idx+1).padStart(2,'0')}-01`); return mTotal > 0 ? `<span class="text-xs font-bold text-blue-600 dark:text-blue-400">${mTotal} pts</span>` : ''; })()}
            </div>
            <div class="grid grid-cols-7 gap-1 text-center text-xs theme-text-secondary mb-2">${t('dayLetters').map(d=>'<div>'+d+'</div>').join('')}</div>
            <div class="grid grid-cols-7 gap-1 text-center text-sm">${daysHtml}</div>
        `;
        grid.appendChild(div);
    });
}

// MINI CALENDAR

function renderMiniCalendar() {
    if (state.calendarMode === 'hijri') { renderHijriMiniCalendar(); return; }
    const miniCalendarMonth = document.getElementById('miniCalendarMonth');
    const miniCalendar = document.getElementById('miniCalendar');
    if (!miniCalendarMonth || !miniCalendar) return;

    // Always show the month of state.currentDate and highlight that exact day
    const year        = state.currentDate.getFullYear();
    const month       = state.currentDate.getMonth();
    const firstDay    = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const currentStr  = dateToLocalString(state.currentDate); // the day to highlight

    miniCalendarMonth.textContent = t('monthNames')[month] + ' ' + year;
    miniCalendar.innerHTML = '';

    t('dayLetters').forEach(d => {
        const div = document.createElement('div');
        div.className = 'theme-text-secondary font-medium py-1 text-center text-xs';
        div.textContent = d;
        miniCalendar.appendChild(div);
    });

    for (let i = 0; i < firstDay; i++) miniCalendar.appendChild(document.createElement('div'));

    for (let day = 1; day <= daysInMonth; day++) {
        const div     = document.createElement('div');
        const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        const isToday    = dateStr === todayLocalString();
        const isSelected = dateStr === currentStr && !isToday;

        let cls = 'py-1 cursor-pointer rounded-full transition-colors text-center text-sm ';
        if (isToday && dateStr === currentStr) {
            // Today AND currently selected — bold blue with a ring
            cls += 'bg-blue-600 text-white font-bold ring-2 ring-offset-1 ring-blue-300';
        } else if (isToday) {
            cls += 'bg-blue-600 text-white font-bold hover:bg-blue-700';
        } else if (isSelected) {
            cls += 'bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-900 font-semibold hover:opacity-80';
        } else {
            cls += 'hover:theme-bg-tertiary theme-text';
        }
        div.className = cls;
        div.textContent = day;
        div.onclick = () => selectDate(new Date(year, month, day));
        miniCalendar.appendChild(div);
    }
}

function selectDate(date) {
    state.selectedDate = date;
    state.currentDate = new Date(date);
    renderMiniCalendar();
    renderCurrentView();
    applyBackground();
}

// DAY VIEW

function renderDayView() {
    // Remove sighting button (only belongs in month view)
    const existingSightingBtn = document.getElementById('hijriSightingBtn');
    if (existingSightingBtn) existingSightingBtn.remove();

    const monthNames = t('monthNames');
    const dayNames = t('dayNamesLong');
    const currentMonth = document.getElementById('currentMonth');
    const currentYear = document.getElementById('currentYear');
    if (state.calendarMode === 'hijri') {
        const h = toHijri(state.currentDate);
        const hm = islamicMonths.indexOf(h.month) + 1;
        const gregShort = state.currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        if (currentMonth) currentMonth.textContent = dayNames[state.currentDate.getDay()];
        if (currentYear) {
            const gregSuffix = state.language==='ar'
                ? t('dayNamesShort')[state.currentDate.getDay()] + ' ' + t('monthNamesShort')[state.currentDate.getMonth()] + ' ' + state.currentDate.getDate()
                : gregShort;
            currentYear.textContent = h.day + ' ' + tHijri(hm) + ' ' + h.year + ' ' + t('hijriYearSuffix') + ' (' + gregSuffix + ')';
        }
    } else {
        if (currentMonth) currentMonth.textContent = dayNames[state.currentDate.getDay()];
        if (currentYear) {
            currentYear.textContent = t('monthNames')[state.currentDate.getMonth()] + ' ' + state.currentDate.getDate() + ', ' + state.currentDate.getFullYear();
        }
    }
    renderDayTimeline();
    // If sidebar was already open, re-render its content for the new date
    if (state.currentDaySidebar) {
        state.currentDaySidebar = dateToLocalString(state.currentDate);
        renderSidebarContent();
    }
}

function renderDayTimeline() {
    const container = document.getElementById('dayTimeline');
    if (!container) return;
    container.innerHTML = '';

    const dateStr = dateToLocalString(state.currentDate);
    const dayEvents = getEventsForDate(dateStr).filter(e => state.activeCalendars.includes(e.calendar));

    // Toolbar row with sidebar toggle button
    const toolbar = document.createElement('div');
    toolbar.className = 'flex items-center justify-between px-4 py-2 border-b theme-border theme-bg-panel sticky top-0 z-10';
    toolbar.innerHTML = `
        <span class="text-sm theme-text-secondary">${dayEvents.length} event${dayEvents.length !== 1 ? 's' : ''}</span>
        <button onclick="toggleDaySidebar()" id="sidebarToggleBtn"
            class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border theme-border hover:theme-bg-tertiary transition-colors text-sm font-medium">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19H6a2 2 0 01-2-2V7a2 2 0 012-2h5m6 0h1a2 2 0 012 2v10a2 2 0 01-2 2h-1m-6-5h6m-3-3v6"></path>
            </svg>
            <span id="sidebarToggleBtnLabel">${state.currentDaySidebar ? t('hideJournal') : t('openJournal')}</span>
        </button>
    `;
    container.appendChild(toolbar);

    // All-day events — only show row if there are any
    const allDayEvts = dayEvents.filter(e => e.isAllDay);
    if (allDayEvts.length > 0) {
        const allDayContainer = document.createElement('div');
        allDayContainer.className = 'border-b theme-border px-2 py-1 bg-gray-50/50 dark:bg-gray-900/20 space-y-0.5';
        allDayEvts.forEach(event => allDayContainer.appendChild(createEventElement(event)));
        container.appendChild(allDayContainer);
    }

    // Wrap hour grid + events in a single relative container so absolute positioning works correctly
    const hourGrid = document.createElement('div');
    hourGrid.id = 'dayHourGrid';
    hourGrid.style.cssText = 'position:relative; flex:1;';

    for (let hour = 0; hour < 24; hour++) {
        const hourRow = document.createElement('div');
        hourRow.className = 'hour-row border-b theme-border relative';
        hourRow.style.height = '60px';
        hourRow.dataset.hour = hour;
        const timeLabel = document.createElement('div');
        timeLabel.className = 'absolute left-2 top-1 text-xs theme-text-secondary';
        timeLabel.textContent = formatHour(hour);
        hourRow.appendChild(timeLabel);
        hourRow.addEventListener('click', () => openModal(null, dateStr, `${String(hour).padStart(2, '0')}:00`));
        hourGrid.appendChild(hourRow);
    }

    const timedDayEvts = dayEvents.filter(e => !e.isAllDay);
    const dayEvtLayout = computeEventLayout(timedDayEvts);
    timedDayEvts.forEach(event => hourGrid.appendChild(createEventElement(event, dayEvtLayout.get(event.id))));
    if (state.showPrayerTimesInView) renderPrayerTimesInColumn(hourGrid, dateStr);

    container.appendChild(hourGrid);

    // Current time line (only if viewing today)
    if (dateStr === todayLocalString()) {
        updateDayTimeIndicator();
    }
}

function openDaySidebar(dateStr) {
    state.currentDaySidebar = dateStr;
    showEl('daySidebar');
    renderSidebarContent();
    applyI18nQuick();
    const label = document.getElementById('sidebarToggleBtnLabel');
    if (label) label.textContent = t('hideJournal');
}

function closeDaySidebar() {
    state.currentDaySidebar = null;
    state.sidebarView = null;
    hideEl('daySidebar');
    const label = document.getElementById('sidebarToggleBtnLabel');
    if (label) label.textContent = t('openJournal');
}

function toggleDaySidebar() {
    if (state.currentDaySidebar) {
        closeDaySidebar();
    } else {
        openDaySidebar(dateToLocalString(state.currentDate));
    }
}

function renderSidebarContent() {
    const dateStr = state.currentDaySidebar;
    if (!dateStr) return;
    const sidebar = document.getElementById('daySidebar');
    if (!sidebar) return;
    const date = new Date(dateStr + 'T12:00:00');
    const hijri = toHijri(date);
    const journal = state.journalEntries[dateStr];
    const dayEvents = getEventsForDate(dateStr).filter(e => state.activeCalendars.includes(e.calendar));

    let autoScore = 0;
    dayEvents.forEach(e => { if (e.completed && e.points) autoScore += e.points; });

    sidebar.innerHTML = `
        <div class="flex flex-col h-full overflow-hidden">

        <!-- Header -->
        <div class="px-4 py-3 border-b theme-border flex items-center justify-between shrink-0">
            <div>
                <h3 class="font-semibold">${(() => {
                    if (state.calendarMode === 'hijri') {
                        const hm = islamicMonths.indexOf(hijri.month) + 1;
                        return `${hijri.day} ${tHijri(hm)} ${hijri.year} ${t('hijriYearSuffix')}`;
                    }
                    const mn = t('monthNamesShort')[date.getMonth()]; const dn = t('dayNamesLong')[date.getDay()]; return `${dn}, ${mn} ${date.getDate()}`;
                })()}</h3>
                <p class="text-xs theme-text-secondary">${state.calendarMode === 'hijri'
                    ? `${t('dayNamesShort')[date.getDay()]} ${t('monthNamesShort')[date.getMonth()]} ${date.getDate()}`
                    : `${hijri.day} ${tHijri(islamicMonths.indexOf(hijri.month)+1).substring(0,4)}`} · <span class="font-semibold text-blue-600 dark:text-blue-400">${journal?.score || 0} ${t('pts')}</span></p>
            </div>
            <button onclick="closeDaySidebar()" class="p-2 hover:theme-bg-tertiary rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>

        <!-- Tab bar -->
        <div class="flex border-b theme-border shrink-0">
            <button onclick="showJournalEditor()" class="flex-1 py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-1.5
                ${state.sidebarView === 'journal' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'theme-text-secondary'}">
                <span>📝</span> ${t('journal')}
            </button>
            <button onclick="showScoreEditor()" class="flex-1 py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-1.5
                ${state.sidebarView === 'score' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'theme-text-secondary'}">
                <span>⭐</span> ${t('score')}
            </button>
            <button onclick="showTasksTab()" class="flex-1 py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-1.5
                ${state.sidebarView === 'tasks' || state.sidebarView === null ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'theme-text-secondary'}">
                ✅ ${t('tasks')}
            </button>
        </div>

        <!-- Scrollable body -->
        <div class="flex-1 overflow-y-auto min-h-0">

            <!-- Journal tab -->
            <div class="p-4 space-y-3 animate-fade-in" style="${state.sidebarView === 'journal' ? '' : 'display:none'}">
                <input type="text" id="journalTitle" placeholder="${t('titlePlaceholder')}" value="${journal?.title || ''}" class="w-full theme-bg-tertiary border theme-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 theme-text">
                <textarea id="journalContent" placeholder="${t('writePlaceholder')}" rows="6"
                    class="w-full theme-bg-tertiary border theme-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 theme-text resize-none">${journal?.content || ''}</textarea>
                ${`<button onclick="saveJournalEntry()" class="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">${t('saveJournal')}</button>`}
            </div>

            <!-- Score tab -->
            <div class="p-4 space-y-3 animate-fade-in" style="${state.sidebarView === 'score' ? '' : 'display:none'}">
                <div class="theme-bg-tertiary rounded-xl p-4">
                    <label class="block text-xs font-medium theme-text-secondary mb-2">${t('expression')}</label>
                    <input type="text" id="scoreExpression" placeholder="${state.language==='ar' ? 'عمل*2 + رياضة + 5' : 'work*2 + gym + 5'}"
                        value="${journal?.expression || (autoScore > 0 ? autoScore.toString() : '')}"
                        class="w-full bg-transparent border-none focus:ring-0 p-0 text-2xl font-mono theme-text placeholder-gray-400 dark:placeholder-gray-600"
                        oninput="updateScorePreview()">
                    <div class="text-xs theme-text-secondary mt-2">${t('variables')}: ${Object.keys(state.variables).join(', ') || t('noneSet')}</div>
                </div>
                <div id="scorePreview" class="text-center py-3">
                    <span class="text-4xl font-bold text-blue-600 dark:text-blue-400">--</span>
                    <span class="text-base theme-text-secondary mx-1">${t('pts')}</span>
                </div>
                ${`<button onclick="saveScoreEntry()" class="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">${t('saveScore')}</button>`}
                <div class="border-t theme-border pt-3 space-y-2">
                    ${renderWeekTotal(dateStr)}
                    ${renderMonthTotal(dateStr)}
                    ${renderAllTimeTotal()}
                </div>
            </div>

            <!-- Tasks tab -->
            <div class="task-tab-body animate-fade-in" style="${state.sidebarView === 'tasks' || state.sidebarView === null ? '' : 'display:none'}">
                <!-- Period pills -->
                <div class="flex gap-1.5 p-3 shrink-0">
                    ${['day','week','month','year'].map(p => {
                        const periodKey = p === 'day' ? dateStr : p === 'week' ? getWeekKey(dateStr) : p === 'month' ? getMonthKey(dateStr) : getYearKey(dateStr);
                        const pts = p === 'day' ? calcDayTaskPts(dateStr) : p === 'week' ? calcWeekTaskPts(getWeekKey(dateStr)) : p === 'month' ? calcMonthTaskPts(getMonthKey(dateStr)) : calcYearTaskPts(getYearKey(dateStr));
                        const total = (state.tasks[p][periodKey] || []).length;
                        const active = state.taskPeriod === p;
                        const label = {day: t('day'), week: t('week'), month: t('month'), year: t('year')}[p] || p;
                        return `<button onclick="setTaskPeriod('${p}')" class="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${active ? 'bg-blue-500 text-white' : 'theme-bg-tertiary theme-text-secondary'}">
                            ${label}${total > 0 ? `<span class="block text-[10px] font-normal opacity-80">${pts}${t('pts')}</span>` : ''}
                        </button>`;
                    }).join('')}
                </div>
                <!-- Task list -->
                <div class="task-list-scroll px-3 pb-2 space-y-1.5">
                    ${renderTaskList(dateStr)}
                </div>
                <!-- Add task -->
                <div class="shrink-0 p-3 border-t theme-border">
                    <div class="flex gap-2">
                        <input type="text" id="newTaskName" placeholder="${t('newTaskPlaceholder')}"
                            class="flex-1 theme-bg-tertiary border theme-border rounded-lg px-3 py-2 text-sm theme-text focus:ring-2 focus:ring-blue-500"
                            onkeydown="if(event.key==='Enter') addTask()">
                        <input type="number" id="newTaskPoints" placeholder="${t('pts')}" min="0"
                            class="w-16 theme-bg-tertiary border theme-border rounded-lg px-2 py-2 text-sm theme-text focus:ring-2 focus:ring-blue-500 text-center"
                            onkeydown="if(event.key==='Enter') addTask()">
                        <button onclick="addTask()" class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-bold transition-colors">+</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="shrink-0 px-4 py-2 border-t theme-border theme-bg-panel grid grid-cols-5 gap-1 text-center" style="${state.sidebarView === 'journal' || state.sidebarView === 'score' ? 'display:none' : ''}">
            <div>
                <div class="text-[10px] theme-text-secondary">${t('today')}</div>
                <div class="font-bold text-blue-600 dark:text-blue-400 text-sm">${fmtScore(calcDayTotal(dateStr))}</div>
            </div>
            <div>
                <div class="text-[10px] theme-text-secondary">${t('week')}</div>
                <div class="font-bold text-sm">${fmtScore(getWeekTotal(dateStr))}</div>
            </div>
            <div>
                <div class="text-[10px] theme-text-secondary">${t('month')}</div>
                <div class="font-bold text-sm">${fmtScore(calcMonthTotal(dateStr))}</div>
            </div>
            <div>
                <div class="text-[10px] theme-text-secondary">${t('year')}</div>
                <div class="font-bold text-sm">${fmtScore(calcYearTotal())}</div>
            </div>
            <div>
                <div class="text-[10px] theme-text-secondary">${t('allTime')}</div>
                <div class="font-bold text-sm">${fmtScore(calcAllTimeTotal())}</div>
            </div>
        </div>

        </div>
    `;


    // Trigger score preview if score tab is active
    if (state.sidebarView === 'score') {
        setTimeout(() => {
            const input = document.getElementById('scoreExpression');
            if (input) updateScorePreview();
        }, 0);
    }
}


function renderSidebarEvents(dayEvents) {
    if (dayEvents.length === 0) return '<p class="text-sm theme-text-secondary">No events today</p>';
    return dayEvents.map(event => {
        const colorObj = CALENDAR_COLORS.find(c => c.id === event.color) || CALENDAR_COLORS[0];
        return `
            <div class="flex items-center space-x-3 p-2 rounded-lg hover:theme-bg-tertiary transition-colors">
                <input type="checkbox" ${event.completed ? 'checked' : ''} onchange="toggleEventComplete(${event.id})"
                    class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                <div class="flex-1 min-w-0">
                    <div class="text-sm font-medium truncate">${event.title}</div>
                    <div class="text-xs theme-text-secondary">${event.isAllDay ? 'All day' : `${event.startTime} - ${event.endTime}`}</div>
                </div>
                ${event.points ? `<span class="text-xs font-medium ${event.completed ? 'text-green-600' : 'theme-text-secondary'}">+${event.points}</span>` : ''}
                <span class="w-2 h-2 rounded-full ${colorObj.bg} flex-shrink-0"></span>
            </div>`;
    }).join('');
}

function renderWeekTotal(dateStr) {
    const label = state.language==='ar' ? 'مجموع الأسبوع' : 'Week Total';
    return `<div class="flex items-center justify-between text-sm"><span class="theme-text-secondary">${label}</span><span class="font-medium">${getWeekTotal(dateStr)} ${t('pts')}</span></div>`;
}

function calcMonthTotal(dateStr) {
    const date = new Date(dateStr + 'T12:00:00');
    const year  = date.getFullYear();
    const month = date.getMonth();
    const days  = new Date(year, month + 1, 0).getDate();
    let total = 0;
    const seenWeeks = new Set();
    for (let d = 1; d <= days; d++) {
        const key = `${year}-${String(month + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        total += calcDayTotal(key);
        const wk = getWeekKey(key);
        if (!seenWeeks.has(wk)) {
            seenWeeks.add(wk);
            const sun = new Date(wk + 'T12:00:00');
            if (sun.getMonth() === month && sun.getFullYear() === year) {
                total += calcWeekTaskPts(wk);
            }
        }
    }
    total += calcMonthTaskPts(`${year}-${String(month + 1).padStart(2,'0')}`);
    return total;
}

// Hijri-aware month total: sums points for all Gregorian days that fall in the Hijri month
function calcHijriMonthTotal(anyDateInMonth) {
    const h = toHijri(anyDateInMonth);
    const hy = h.year;
    const hm = islamicMonths.indexOf(h.month) + 1;
    const gregDates = getGregorianDatesForHijriMonth(hy, hm);
    let total = 0;
    const seenWeeks = new Set();
    gregDates.forEach(({ dateStr }) => {
        total += calcDayTotal(dateStr);
        const wk = getWeekKey(dateStr);
        if (!seenWeeks.has(wk)) {
            seenWeeks.add(wk);
            total += calcWeekTaskPts(wk);
        }
    });
    if (gregDates.length > 0) {
        total += calcMonthTaskPts(gregDates[0].dateStr.substring(0, 7));
    }
    return total;
}

function calcAllTimeTotal() {
    let total = Object.values(state.journalEntries).reduce((s, e) => s + (e?.score || 0), 0);
    for (const scope of ['day','week','month','year'])
        for (const list of Object.values(state.tasks[scope] || {}))
            for (const t of list) if (t.completed) total += t.points || 0;
    return total;
}

function renderMonthTotal(dateStr) {
    let total, label;
    if (state.calendarMode === 'hijri') {
        const date = new Date(dateStr + 'T12:00:00');
        total = calcHijriMonthTotal(date);
        const h = toHijri(date);
        const hm = islamicMonths.indexOf(h.month) + 1;
        label = state.language === 'ar' ? ('\u0645\u062c\u0645\u0648\u0639 ' + tHijri(hm)) : (h.month + ' Total');
    } else {
        total = calcMonthTotal(dateStr);
        const date = new Date(dateStr + 'T12:00:00');
        const monthIdx = date.getMonth();
        label = state.language === 'ar'
            ? ('\u0645\u062c\u0645\u0648\u0639 ' + t('monthNames')[monthIdx])
            : (date.toLocaleDateString('en-US', { month: 'long' }) + ' Total');
    }
    return `<div class="flex items-center justify-between text-sm"><span class="theme-text-secondary">${label}</span><span class="font-medium">${total} ${t('pts')}</span></div>`;
}

function renderAllTimeTotal() {
    const label = state.language==='ar' ? 'المجموع الكلي' : 'All-Time Total';
    return `<div class="flex items-center justify-between text-sm"><span class="theme-text-secondary font-medium">${label}</span><span class="font-bold text-blue-600 dark:text-blue-400">${calcAllTimeTotal()} ${t('pts')}</span></div>`;
}

