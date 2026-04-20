const state = {
    currentUser: 'default',
    currentDate: new Date(),
    selectedDate: new Date(),
    currentView: 'week',
    activeCalendars: ['personal', 'work', 'reminders'],
    isDarkMode: false,
    currentTheme: 'default',
    showPrayerTimesInView: false,
    backgroundImage: null,
    backgroundOpacity: 0.5,
    backgroundScope: 'month',
    editingEventId: null,
    editingCalendarId: null,
    draggedEvent: null,
    users: ['default'],
    calendars: [...DEFAULT_CALENDARS],
    userLocation: null,
    prayerMethod: 4,
    prayerTimesCache: {},
    usePrayerTimes: false,
    selectedPrayer: 'Fajr',
    prayerTimesForDate: null,
    journalEntries: {},
    variables: {},
    currentDaySidebar: null,
    sidebarView: null,
    taskPeriod: 'day',
    tasks: { day: {}, week: {}, month: {}, year: {} },
    forgottenTasks: [],
    renderWindowDays: 31,
    pfp: null,
    monthlyBackgrounds: {},
    calendarMode: 'gregorian', // 'gregorian' | 'hijri'
    hijriMonthOffsets: {},
    language: 'en' // key: 'hy_hm', value: -1|0|1 — user moon sighting adjustment // key: 'YYYY-MM', value: {image, opacity}  // default: ~1 month forward+back
};

let events = [];
let _pendingDetailsEvent = null;

// Helpers
const $ = id => document.getElementById(id);
function showEl(id) { const e = $(id); if (!e) return; e.classList.remove('hidden'); e.classList.add('flex'); }
function hideEl(id) { const e = $(id); if (!e) return; e.classList.add('hidden'); e.classList.remove('flex'); }


// Global resize tracking — single document-level listener, no accumulation
let _resizeState = null;

// Islamic Month Names
const islamicMonths = [
    "Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-thani",
    "Jumada al-awwal", "Jumada al-thani", "Rajab", "Sha'ban",
    "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
];

// UTILITY: TIMEZONE-SAFE DATE STRING

function dateToLocalString(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function todayLocalString() {
    return dateToLocalString(new Date());
}

// PRAYER TIMES API

async function fetchPrayerTimings(date, loc) {
    const m = state.prayerMethod ?? 4;
    const dateStr = dateToLocalString(date);
    const byCity = loc.city && loc.country;
    const cacheKey = byCity
        ? `${dateStr}_${loc.city}_${loc.country}_m${m}`
        : `${dateStr}_${loc.lat}_${loc.lng}_m${m}`;
    if (state.prayerTimesCache[cacheKey]) return state.prayerTimesCache[cacheKey];
    const url = byCity
        ? `https://api.aladhan.com/v1/timingsByCity/${dateStr}?city=${encodeURIComponent(loc.city)}&country=${encodeURIComponent(loc.country)}&method=${m}`
        : `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${loc.lat}&longitude=${loc.lng}&method=${m}`;
    try {
        const data = await (await fetch(url)).json();
        if (data.code === 200) {
            state.prayerTimesCache[cacheKey] = data.data.timings;
            savePrayerTimesCache();
            return data.data.timings;
        }
    } catch(err) { console.error('Prayer fetch error:', err); }
    return null;
}

// Convenience wrapper using state.userLocation
async function getPrayerTimings(date) {
    return state.userLocation ? fetchPrayerTimings(date, state.userLocation) : null;
}

function savePrayerTimesCache() {
    // Trim cache to last 90 days to prevent localStorage bloat
    const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 90);
    const cutStr = cutoff.toISOString().slice(0, 10);
    const trimmed = {};
    for (const [k, v] of Object.entries(state.prayerTimesCache)) {
        const dateStr = k.slice(0, 10);
        if (dateStr >= cutStr) trimmed[k] = v;
    }
    state.prayerTimesCache = trimmed;
    saveToStorage(STORAGE_KEYS.PRAYER_TIMES_CACHE(state.currentUser), trimmed);
}
function loadPrayerTimesCache() { state.prayerTimesCache = loadFromStorage(STORAGE_KEYS.PRAYER_TIMES_CACHE(state.currentUser)) || {}; }

function getPrayerTimeInMinutes(prayerTimeStr) {
    if (!prayerTimeStr) return null;
    const [hours, minutes] = prayerTimeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

function minutesToTimeString(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60) % 24;
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

