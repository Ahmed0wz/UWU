// ============================================
// CALENDAR - APP.JS (FIXED)
// ============================================

// Storage Keys
const STORAGE_KEYS = {
    CURRENT_USER: 'calendar_current_user',
    USERS: 'calendar_users',
    EVENTS: (user) => `calendar_events_${user}`,
    THEME: (user) => `calendar_theme_${user}`,
    BACKGROUND: (user) => `calendar_background_${user}`,
    CALENDARS: (user) => `calendar_calendars_${user}`,
    LOCATION: (user) => `calendar_location_${user}`,
    PRAYER_TIMES_CACHE: (user) => `calendar_prayer_cache_${user}`,
    JOURNAL: (user) => `calendar_journal_${user}`,
    VARIABLES: (user) => `calendar_variables_${user}`,
    SHOW_PRAYER_TIMES: (user) => `calendar_show_prayer_${user}`,
    TODOS:             (user) => `calendar_todos_${user}`
};

// Extended Color Palette
const CALENDAR_COLORS = [
    { id: 'blue',   name: 'Blue',   bg: 'bg-blue-500',   light: 'bg-blue-100',   dark: 'bg-blue-900/30',   text: 'text-blue-800',   darkText: 'text-blue-200',   hex: '#3b82f6' },
    { id: 'purple', name: 'Purple', bg: 'bg-purple-500', light: 'bg-purple-100', dark: 'bg-purple-900/30', text: 'text-purple-800', darkText: 'text-purple-200', hex: '#8b5cf6' },
    { id: 'green',  name: 'Green',  bg: 'bg-green-500',  light: 'bg-green-100',  dark: 'bg-green-900/30',  text: 'text-green-800',  darkText: 'text-green-200',  hex: '#10b981' },
    { id: 'orange', name: 'Orange', bg: 'bg-orange-500', light: 'bg-orange-100', dark: 'bg-orange-900/30', text: 'text-orange-800', darkText: 'text-orange-200', hex: '#f59e0b' },
    { id: 'red',    name: 'Red',    bg: 'bg-red-500',    light: 'bg-red-100',    dark: 'bg-red-900/30',    text: 'text-red-800',    darkText: 'text-red-200',    hex: '#ef4444' },
    { id: 'pink',   name: 'Pink',   bg: 'bg-pink-500',   light: 'bg-pink-100',   dark: 'bg-pink-900/30',   text: 'text-pink-800',   darkText: 'text-pink-200',   hex: '#ec4899' },
    { id: 'yellow', name: 'Yellow', bg: 'bg-yellow-500', light: 'bg-yellow-100', dark: 'bg-yellow-900/30', text: 'text-yellow-800', darkText: 'text-yellow-200', hex: '#eab308' },
    { id: 'teal',   name: 'Teal',   bg: 'bg-teal-500',   light: 'bg-teal-100',   dark: 'bg-teal-900/30',   text: 'text-teal-800',   darkText: 'text-teal-200',   hex: '#14b8a6' },
    { id: 'indigo', name: 'Indigo', bg: 'bg-indigo-500', light: 'bg-indigo-100', dark: 'bg-indigo-900/30', text: 'text-indigo-800', darkText: 'text-indigo-200', hex: '#6366f1' },
    { id: 'cyan',   name: 'Cyan',   bg: 'bg-cyan-500',   light: 'bg-cyan-100',   dark: 'bg-cyan-900/30',   text: 'text-cyan-800',   darkText: 'text-cyan-200',   hex: '#06b6d4' },
    { id: 'lime',   name: 'Lime',   bg: 'bg-lime-500',   light: 'bg-lime-100',   dark: 'bg-lime-900/30',   text: 'text-lime-800',   darkText: 'text-lime-200',   hex: '#84cc16' },
    { id: 'gray',   name: 'Gray',   bg: 'bg-gray-500',   light: 'bg-gray-100',   dark: 'bg-gray-900/30',   text: 'text-gray-800',   darkText: 'text-gray-200',   hex: '#6b7280' }
];

// Default Calendars
const DEFAULT_CALENDARS = [
    { id: 'personal',  name: 'Personal',  color: 'blue'   },
    { id: 'work',      name: 'Work',      color: 'purple' },
    { id: 'birthdays', name: 'Birthdays', color: 'green'  },
    { id: 'reminders', name: 'Reminders', color: 'orange' }
];

// Prayer Names
const PRAYER_NAMES = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

// ============================================
// APPEARANCE THEMES (Discord-style presets)
// Each theme is a set of CSS variable overrides applied to :root / .dark
// ============================================
const THEMES = [
    {
        id: 'default',
        name: 'Default',
        description: 'Clean white & dark',
        preview: ['#ffffff', '#0f0f0f', '#3b82f6'],
        light: {},
        dark: {}
    },
    {
        id: 'discord',
        name: 'Discord',
        description: 'Discord dark blue-grey',
        preview: ['#36393f', '#2f3136', '#5865f2'],
        light: {
            '--bg-primary':   '#ffffff',
            '--bg-secondary': '#f2f3f5',
            '--bg-tertiary':  '#e3e5e8',
            '--text-primary': '#2e3338',
            '--text-secondary': '#747f8d',
            '--border-color': '#dcddde',
            '--accent':       '#5865f2',
            '--bg-panel':           'rgba(255,255,255,0.93)',
            '--bg-panel-secondary': 'rgba(242,243,245,0.93)',
        },
        dark: {
            '--bg-primary':   '#36393f',
            '--bg-secondary': '#2f3136',
            '--bg-tertiary':  '#202225',
            '--text-primary': '#dcddde',
            '--text-secondary': '#96989d',
            '--border-color': '#40444b',
            '--accent':       '#5865f2',
            '--bg-panel':           'rgba(54,57,63,0.93)',
            '--bg-panel-secondary': 'rgba(47,49,54,0.93)',
        }
    },
    {
        id: 'midnight',
        name: 'Midnight',
        description: 'Deep blue darkness',
        preview: ['#0d1117', '#161b22', '#58a6ff'],
        light: {
            '--bg-primary':   '#f0f6ff',
            '--bg-secondary': '#e6f0fa',
            '--bg-tertiary':  '#d0e4f7',
            '--text-primary': '#0d1117',
            '--text-secondary': '#586069',
            '--border-color': '#c8d8e8',
            '--accent':       '#0969da',
            '--bg-panel':           'rgba(240,246,255,0.93)',
            '--bg-panel-secondary': 'rgba(230,240,250,0.93)',
        },
        dark: {
            '--bg-primary':   '#0d1117',
            '--bg-secondary': '#161b22',
            '--bg-tertiary':  '#21262d',
            '--text-primary': '#c9d1d9',
            '--text-secondary': '#8b949e',
            '--border-color': '#30363d',
            '--accent':       '#58a6ff',
            '--bg-panel':           'rgba(13,17,23,0.93)',
            '--bg-panel-secondary': 'rgba(22,27,34,0.93)',
        }
    },
    {
        id: 'forest',
        name: 'Forest',
        description: 'Natural greens',
        preview: ['#1a2e1a', '#243324', '#4caf50'],
        light: {
            '--bg-primary':   '#f1f8f1',
            '--bg-secondary': '#e8f5e9',
            '--bg-tertiary':  '#dcedc8',
            '--text-primary': '#1b2e1b',
            '--text-secondary': '#558b55',
            '--border-color': '#c5e1a5',
            '--accent':       '#388e3c',
            '--bg-panel':           'rgba(241,248,241,0.93)',
            '--bg-panel-secondary': 'rgba(232,245,233,0.93)',
        },
        dark: {
            '--bg-primary':   '#1a2e1a',
            '--bg-secondary': '#1e331e',
            '--bg-tertiary':  '#243824',
            '--text-primary': '#c8e6c9',
            '--text-secondary': '#81c784',
            '--border-color': '#2e4a2e',
            '--accent':       '#66bb6a',
            '--bg-panel':           'rgba(26,46,26,0.93)',
            '--bg-panel-secondary': 'rgba(30,51,30,0.93)',
        }
    },
    {
        id: 'sunset',
        name: 'Sunset',
        description: 'Warm oranges & purples',
        preview: ['#2d1b33', '#3d2040', '#ff6b35'],
        light: {
            '--bg-primary':   '#fff8f3',
            '--bg-secondary': '#fff0e6',
            '--bg-tertiary':  '#fde0cc',
            '--text-primary': '#2d1b00',
            '--text-secondary': '#8b5e3c',
            '--border-color': '#f5c9a0',
            '--accent':       '#e65100',
            '--bg-panel':           'rgba(255,248,243,0.93)',
            '--bg-panel-secondary': 'rgba(255,240,230,0.93)',
        },
        dark: {
            '--bg-primary':   '#2d1b33',
            '--bg-secondary': '#3d2040',
            '--bg-tertiary':  '#4a2550',
            '--text-primary': '#f5d0b5',
            '--text-secondary': '#cc9977',
            '--border-color': '#5a3060',
            '--accent':       '#ff6b35',
            '--bg-panel':           'rgba(45,27,51,0.93)',
            '--bg-panel-secondary': 'rgba(61,32,64,0.93)',
        }
    },
    {
        id: 'rose',
        name: 'Rose',
        description: 'Soft pinks & roses',
        preview: ['#2d1b22', '#3d2030', '#f43f5e'],
        light: {
            '--bg-primary':   '#fff5f7',
            '--bg-secondary': '#ffe4ea',
            '--bg-tertiary':  '#ffd1da',
            '--text-primary': '#2d1b22',
            '--text-secondary': '#9d5065',
            '--border-color': '#fbb6c6',
            '--accent':       '#e11d48',
            '--bg-panel':           'rgba(255,245,247,0.93)',
            '--bg-panel-secondary': 'rgba(255,228,234,0.93)',
        },
        dark: {
            '--bg-primary':   '#1c0f14',
            '--bg-secondary': '#271419',
            '--bg-tertiary':  '#32191f',
            '--text-primary': '#fce7ed',
            '--text-secondary': '#d4899a',
            '--border-color': '#4a1e28',
            '--accent':       '#fb7185',
            '--bg-panel':           'rgba(28,15,20,0.93)',
            '--bg-panel-secondary': 'rgba(39,20,25,0.93)',
        }
    },
    {
        id: 'slate',
        name: 'Slate',
        description: 'Cool slate greys',
        preview: ['#1e293b', '#0f172a', '#94a3b8'],
        light: {
            '--bg-primary':   '#f8fafc',
            '--bg-secondary': '#f1f5f9',
            '--bg-tertiary':  '#e2e8f0',
            '--text-primary': '#0f172a',
            '--text-secondary': '#64748b',
            '--border-color': '#cbd5e1',
            '--accent':       '#3b82f6',
            '--bg-panel':           'rgba(248,250,252,0.93)',
            '--bg-panel-secondary': 'rgba(241,245,249,0.93)',
        },
        dark: {
            '--bg-primary':   '#0f172a',
            '--bg-secondary': '#1e293b',
            '--bg-tertiary':  '#334155',
            '--text-primary': '#e2e8f0',
            '--text-secondary': '#94a3b8',
            '--border-color': '#475569',
            '--accent':       '#38bdf8',
            '--bg-panel':           'rgba(15,23,42,0.93)',
            '--bg-panel-secondary': 'rgba(30,41,59,0.93)',
        }
    }
];

// State Management
const state = {
    currentUser: 'default',
    currentDate: new Date(),
    selectedDate: new Date(),
    currentView: 'week',
    activeCalendars: ['personal', 'work', 'birthdays', 'reminders'],
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
    todos: {}
};

let events = [];

// Global resize tracking — single document-level listener, no accumulation
let _resizeState = null;

// Islamic Month Names
const islamicMonths = [
    "Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-thani",
    "Jumada al-awwal", "Jumada al-thani", "Rajab", "Sha'ban",
    "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
];

// ============================================
// UTILITY: TIMEZONE-SAFE DATE STRING
// FIX: toISOString() is UTC — use local getters instead
// ============================================

function dateToLocalString(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function todayLocalString() {
    return dateToLocalString(new Date());
}

// ============================================
// PRAYER TIMES API
// ============================================

async function fetchPrayerTimes(date, lat, lng, method) {
    const m = method ?? state.prayerMethod ?? 4;
    const dateStr = dateToLocalString(date);
    const cacheKey = `${dateStr}_${lat}_${lng}_m${m}`;
    if (state.prayerTimesCache[cacheKey]) return state.prayerTimesCache[cacheKey];
    try {
        const response = await fetch(`https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=${m}`);
        const data = await response.json();
        if (data.code === 200) {
            state.prayerTimesCache[cacheKey] = data.data.timings;
            savePrayerTimesCache();
            return data.data.timings;
        }
    } catch (error) {
        console.error('Error fetching prayer times:', error);
    }
    return null;
}

async function fetchPrayerTimesByCity(date, city, country, method) {
    const m = method ?? state.prayerMethod ?? 4;
    const dateStr = dateToLocalString(date);
    const cacheKey = `${dateStr}_${city}_${country}_m${m}`;
    if (state.prayerTimesCache[cacheKey]) return state.prayerTimesCache[cacheKey];
    try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/${dateStr}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${m}`);
        const data = await response.json();
        if (data.code === 200) {
            state.prayerTimesCache[cacheKey] = data.data.timings;
            savePrayerTimesCache();
            return data.data.timings;
        }
    } catch (error) {
        console.error('Error fetching prayer times:', error);
    }
    return null;
}

function savePrayerTimesCache() {
    saveToStorage(STORAGE_KEYS.PRAYER_TIMES_CACHE(state.currentUser), state.prayerTimesCache);
}

function loadPrayerTimesCache() {
    const saved = loadFromStorage(STORAGE_KEYS.PRAYER_TIMES_CACHE(state.currentUser));
    if (saved) state.prayerTimesCache = saved;
}

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

// ============================================
// ============================================
// HIJRI DATE CONVERSION — Umm al-Qura official lookup table
// Each row: [gregYear, gregMonth(1-12), gregDay, hijriYear, hijriMonth(1-12)]
// Covers 2023-01-01 through end of 2035.
// For dates outside this range, falls back to arithmetic approximation.
// ============================================

// Official Umm al-Qura month-start dates (1 of each Hijri month)
const UMM_AL_QURA = [
  // 1444 AH (tail — so 2023 dates work)
  [2023, 1,23, 1444, 7],[2023, 2,22, 1444, 8],[2023, 3,23, 1444, 9],
  [2023, 4,21, 1444,10],[2023, 5,21, 1444,11],[2023, 6,19, 1444,12],
  // 1445 AH
  [2023, 7,19, 1445, 1],[2023, 8,17, 1445, 2],[2023, 9,15, 1445, 3],
  [2023,10,15, 1445, 4],[2023,11,13, 1445, 5],[2023,12,13, 1445, 6],
  [2024, 1,11, 1445, 7],[2024, 2,10, 1445, 8],[2024, 3,11, 1445, 9],
  [2024, 4, 9, 1445,10],[2024, 5, 9, 1445,11],[2024, 6, 7, 1445,12],
  // 1446 AH
  [2024, 7, 7, 1446, 1],[2024, 8, 5, 1446, 2],[2024, 9, 4, 1446, 3],
  [2024,10, 3, 1446, 4],[2024,11, 2, 1446, 5],[2024,12, 1, 1446, 6],
  [2024,12,31, 1446, 7],[2025, 1,30, 1446, 8],[2025, 3, 1, 1446, 9],
  [2025, 3,30, 1446,10],[2025, 4,29, 1446,11],[2025, 5,28, 1446,12],
  // 1447 AH
  [2025, 6,26, 1447, 1],[2025, 7,26, 1447, 2],[2025, 8,24, 1447, 3],
  [2025, 9,22, 1447, 4],[2025,10,22, 1447, 5],[2025,11,20, 1447, 6],
  [2025,12,20, 1447, 7],[2026, 1,18, 1447, 8],[2026, 2,17, 1447, 9],
  [2026, 3,19, 1447,10],[2026, 4,17, 1447,11],[2026, 5,17, 1447,12],
  // 1448 AH
  [2026, 6,15, 1448, 1],[2026, 7,15, 1448, 2],[2026, 8,13, 1448, 3],
  [2026, 9,12, 1448, 4],[2026,10,11, 1448, 5],[2026,11,10, 1448, 6],
  [2026,12, 9, 1448, 7],[2027, 1, 7, 1448, 8],[2027, 2, 6, 1448, 9],
  [2027, 3, 7, 1448,10],[2027, 4, 5, 1448,11],[2027, 5, 5, 1448,12],
  // 1449 AH
  [2027, 6, 3, 1449, 1],[2027, 7, 3, 1449, 2],[2027, 8, 1, 1449, 3],
  [2027, 8,31, 1449, 4],[2027, 9,29, 1449, 5],[2027,10,29, 1449, 6],
  [2027,11,27, 1449, 7],[2027,12,27, 1449, 8],[2028, 1,25, 1449, 9],
  [2028, 2,23, 1449,10],[2028, 3,24, 1449,11],[2028, 4,22, 1449,12],
  // 1450 AH
  [2028, 5,22, 1450, 1],[2028, 6,20, 1450, 2],[2028, 7,19, 1450, 3],
  [2028, 8,18, 1450, 4],[2028, 9,16, 1450, 5],[2028,10,16, 1450, 6],
  [2028,11,14, 1450, 7],[2028,12,14, 1450, 8],[2029, 1,12, 1450, 9],
  [2029, 2,10, 1450,10],[2029, 3,12, 1450,11],[2029, 4,10, 1450,12],
  // 1451 AH
  [2029, 5,10, 1451, 1],[2029, 6, 8, 1451, 2],[2029, 7, 8, 1451, 3],
  [2029, 8, 6, 1451, 4],[2029, 9, 5, 1451, 5],[2029,10, 4, 1451, 6],
  [2029,11, 2, 1451, 7],[2029,12, 2, 1451, 8],[2029,12,31, 1451, 9],
  [2030, 1,29, 1451,10],[2030, 2,28, 1451,11],[2030, 3,29, 1451,12],
  // 1452 AH
  [2030, 4,28, 1452, 1],[2030, 5,27, 1452, 2],[2030, 6,26, 1452, 3],
  [2030, 7,25, 1452, 4],[2030, 8,24, 1452, 5],[2030, 9,22, 1452, 6],
  [2030,10,22, 1452, 7],[2030,11,20, 1452, 8],[2030,12,20, 1452, 9],
  [2031, 1,18, 1452,10],[2031, 2,17, 1452,11],[2031, 3,18, 1452,12],
  // 1453 AH
  [2031, 4,17, 1453, 1],[2031, 5,16, 1453, 2],[2031, 6,15, 1453, 3],
  [2031, 7,14, 1453, 4],[2031, 8,13, 1453, 5],[2031, 9,11, 1453, 6],
  [2031,10,11, 1453, 7],[2031,11, 9, 1453, 8],[2031,12, 9, 1453, 9],
  [2032, 1, 7, 1453,10],[2032, 2, 5, 1453,11],[2032, 3, 6, 1453,12],
  // 1454 AH
  [2032, 4, 4, 1454, 1],[2032, 5, 4, 1454, 2],[2032, 6, 2, 1454, 3],
  [2032, 7, 2, 1454, 4],[2032, 7,31, 1454, 5],[2032, 8,30, 1454, 6],
  [2032, 9,28, 1454, 7],[2032,10,27, 1454, 8],[2032,11,26, 1454, 9],
  [2032,12,25, 1454,10],[2033, 1,23, 1454,11],[2033, 2,22, 1454,12],
  // 1455 AH
  [2033, 3,23, 1455, 1],[2033, 4,21, 1455, 2],[2033, 5,21, 1455, 3],
  [2033, 6,19, 1455, 4],[2033, 7,19, 1455, 5],[2033, 8,17, 1455, 6],
  [2033, 9,16, 1455, 7],[2033,10,15, 1455, 8],[2033,11,14, 1455, 9],
  [2033,12,13, 1455,10],[2034, 1,11, 1455,11],[2034, 2,10, 1455,12],
  // 1456 AH
  [2034, 3,12, 1456, 1],[2034, 4,10, 1456, 2],[2034, 5,10, 1456, 3],
  [2034, 6, 8, 1456, 4],[2034, 7, 8, 1456, 5],[2034, 8, 6, 1456, 6],
  [2034, 9, 5, 1456, 7],[2034,10, 4, 1456, 8],[2034,11, 3, 1456, 9],
  [2034,12, 2, 1456,10],[2035, 1, 1, 1456,11],[2035, 1,31, 1456,12],
  // 1457 AH (sentinel so 2035 end-dates resolve)
  [2035, 3, 1, 1457, 1],[2035, 3,30, 1457, 2],[2035, 4,29, 1457, 3],
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

// ============================================
// STORAGE FUNCTIONS
// FIX: Better error handling — warn on quota errors
// ============================================

// ============================================
// FILE-BASED STORAGE
// Primary: File System Access API (Chrome/Samsung Internet)
//   — reads/writes the same file handle without dialogs
// Fallback: in-memory DB + auto-download on save
// ============================================

const DB = {};                    // in-memory key-value store
let _fileHandle = null;           // FileSystemFileHandle (if API available)
let _savePending = false;
let _saveTimer   = null;
const SAVE_DEBOUNCE_MS = 1200;    // write file at most once per 1.2s

function saveToStorage(key, data) {
    DB[key] = data;
    _scheduleSave();
    return true;
}

function loadFromStorage(key, defaultValue = null) {
    return (key in DB) ? DB[key] : defaultValue;
}

function removeFromStorage(key) {
    delete DB[key];
    _scheduleSave();
    return true;
}

// Debounce: avoid writing on every keystroke
function _scheduleSave() {
    _savePending = true;
    clearTimeout(_saveTimer);
    _saveTimer = setTimeout(_flushSave, SAVE_DEBOUNCE_MS);
}

async function _flushSave() {
    if (!_savePending) return;
    _savePending = false;
    const json = JSON.stringify(DB, null, 2);
    if (_fileHandle) {
        try {
            const writable = await _fileHandle.createWritable();
            await writable.write(json);
            await writable.close();
            return;
        } catch (e) {
            console.warn('File write failed, falling back to download:', e);
            _fileHandle = null;
        }
    }
    // Fallback: silent auto-download (only if data exists)
    if (Object.keys(DB).length > 0) {
        _silentDownload(json);
    }
}

function _silentDownload(json) {
    const blob = new Blob([json], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'calendar-data.json';
    a.click();
    URL.revokeObjectURL(url);
}

// ── PUBLIC: Load data from a file into DB ────────────────────
async function loadDataFile(showPicker = true) {
    const hasAPI = typeof window.showOpenFilePicker === 'function';

    if (hasAPI) {
        try {
            const [handle] = await window.showOpenFilePicker({
                types: [{ description: 'Calendar Data', accept: { 'application/json': ['.json'] } }],
                multiple: false
            });
            _fileHandle = handle;
            const file = await handle.getFile();
            const text = await file.text();
            _loadDBFromJSON(text);
            // Re-init app with loaded data
            loadAllData();
            renderCurrentView(); renderMiniCalendar(); renderCalendarList();
            applyBackground(); updateHeaderScores();
            _showStorageBadge('✓ File loaded — auto-saving');
            return true;
        } catch (e) {
            if (e.name !== 'AbortError') console.error('File open error:', e);
            return false;
        }
    } else {
        // Fallback: plain file input
        return new Promise(resolve => {
            const input = document.createElement('input');
            input.type = 'file'; input.accept = '.json';
            input.onchange = async (ev) => {
                const file = ev.target.files[0];
                if (!file) { resolve(false); return; }
                const text = await file.text();
                _loadDBFromJSON(text);
                loadAllData();
                renderCurrentView(); renderMiniCalendar(); renderCalendarList();
                applyBackground(); updateHeaderScores();
                _showStorageBadge('✓ File loaded — save to download');
                resolve(true);
            };
            input.click();
        });
    }
}

// ── PUBLIC: Save/download data now ─────────────────────────── 
async function saveDataFileNow() {
    const hasAPI = typeof window.showSaveFilePicker === 'function';
    saveAllData(); // flush state → DB first
    const json = JSON.stringify(DB, null, 2);

    if (hasAPI && !_fileHandle) {
        try {
            _fileHandle = await window.showSaveFilePicker({
                suggestedName: 'calendar-data.json',
                types: [{ description: 'Calendar Data', accept: { 'application/json': ['.json'] } }]
            });
        } catch (e) {
            if (e.name !== 'AbortError') _silentDownload(json);
            return;
        }
    }

    if (_fileHandle) {
        try {
            const writable = await _fileHandle.createWritable();
            await writable.write(json);
            await writable.close();
            _showStorageBadge('✓ Saved to file');
            return;
        } catch (e) {
            _fileHandle = null;
        }
    }
    _silentDownload(json);
    _showStorageBadge('✓ Downloaded');
}

function _loadDBFromJSON(text) {
    try {
        const parsed = JSON.parse(text);
        Object.assign(DB, parsed);
    } catch (e) {
        alert('Could not read data file — it may be corrupted.');
    }
}

// Small toast badge showing save status
function _showStorageBadge(msg) {
    let badge = document.getElementById('storageBadge');
    if (!badge) {
        badge = document.createElement('div');
        badge.id = 'storageBadge';
        badge.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.75);color:#fff;padding:6px 14px;border-radius:20px;font-size:12px;z-index:9999;pointer-events:none;transition:opacity 0.4s';
        document.body.appendChild(badge);
    }
    badge.textContent = msg;
    badge.style.opacity = '1';
    clearTimeout(badge._t);
    badge._t = setTimeout(() => badge.style.opacity = '0', 2500);
}

// Flush on page close
window.addEventListener('beforeunload', () => {
    if (_savePending) {
        clearTimeout(_saveTimer);
        // Synchronous fallback — just trigger the download attempt
        const json = JSON.stringify(DB, null, 2);
        if (!_fileHandle && Object.keys(DB).length > 0) {
            _silentDownload(json);
        }
    }
});

function saveJournal() {
    saveToStorage(STORAGE_KEYS.JOURNAL(state.currentUser), state.journalEntries);
}
function loadJournal() {
    const saved = loadFromStorage(STORAGE_KEYS.JOURNAL(state.currentUser));
    state.journalEntries = saved || {};
}
function saveVariables() {
    saveToStorage(STORAGE_KEYS.VARIABLES(state.currentUser), state.variables);
}
function loadVariables() {
    const saved = loadFromStorage(STORAGE_KEYS.VARIABLES(state.currentUser));
    state.variables = saved || {};
}

function saveShowPrayerTimes() {
    saveToStorage(STORAGE_KEYS.SHOW_PRAYER_TIMES(state.currentUser), state.showPrayerTimesInView);
}
function loadShowPrayerTimes() {
    const saved = loadFromStorage(STORAGE_KEYS.SHOW_PRAYER_TIMES(state.currentUser));
    state.showPrayerTimesInView = saved === true;
}
function toggleShowPrayerTimesInView() {
    if (!state.userLocation) {
        if (confirm('You need to set your location first to show prayer times. Set it now?')) openLocationSettings();
        return;
    }
    state.showPrayerTimesInView = !state.showPrayerTimesInView;
    saveShowPrayerTimes();
    renderCurrentView();
    // Update button label
    const btn = document.getElementById('prayerViewToggleBtn');
    if (btn) {
        const label = btn.querySelector('span');
        if (label) label.textContent = state.showPrayerTimesInView ? 'Hide Prayer Times' : 'Show Prayer Times';
        btn.classList.toggle('bg-blue-50', state.showPrayerTimesInView);
        btn.classList.toggle('dark:bg-blue-900/20', state.showPrayerTimesInView);
        btn.classList.toggle('border-blue-500', state.showPrayerTimesInView);
    }
}


// ============================================
// TODO LIST — STORAGE & CRUD
// Todos are scoped: day / week / month / year
// Points cascade: day→all, week→month+all,
//                 month→all, year→all
// ============================================

function saveTodos() {
    saveToStorage(STORAGE_KEYS.TODOS(state.currentUser), state.todos);
}
function loadTodos() {
    const saved = loadFromStorage(STORAGE_KEYS.TODOS(state.currentUser));
    state.todos = saved || {};
}

function getTodoKey(scope, dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    if (scope === 'day')   return 'day_'   + dateStr;
    if (scope === 'week')  {
        const s = new Date(d); s.setDate(d.getDate() - d.getDay());
        return 'week_' + dateToLocalString(s);
    }
    if (scope === 'month') return 'month_' + dateStr.slice(0, 7);
    if (scope === 'year')  return 'year_'  + d.getFullYear();
    return 'day_' + dateStr;
}

function getTodos(scope, dateStr) {
    return state.todos[getTodoKey(scope, dateStr)] || [];
}

function addTodo(scope, dateStr, text, points) {
    const key = getTodoKey(scope, dateStr);
    if (!state.todos[key]) state.todos[key] = [];
    state.todos[key].push({ id: Date.now(), text, points: points || 0, completed: false });
    saveTodos();
}

function toggleTodo(scope, dateStr, id) {
    const list = state.todos[getTodoKey(scope, dateStr)];
    if (!list) return;
    const t = list.find(t => t.id == id);
    if (t) { t.completed = !t.completed; saveTodos(); }
}

function deleteTodo(scope, dateStr, id) {
    const key = getTodoKey(scope, dateStr);
    if (!state.todos[key]) return;
    state.todos[key] = state.todos[key].filter(t => t.id != id);
    saveTodos();
}

// ── POINT HELPERS (cascade rules) ───────────────────────────
// completed points only
function _todoPts(scope, dateStr) {
    return getTodos(scope, dateStr)
        .filter(t => t.completed && t.points)
        .reduce((s, t) => s + t.points, 0);
}

// Day scope: only day tasks for that date
function getTodoDayPoints(dateStr) {
    return _todoPts('day', dateStr);
}

// Week scope: day tasks for all 7 days + week-scoped tasks
function getTodoWeekPoints(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    const start = new Date(d); start.setDate(d.getDate() - d.getDay());
    let total = _todoPts('week', dateStr);            // week-scoped tasks
    for (let i = 0; i < 7; i++) {
        const day = new Date(start); day.setDate(start.getDate() + i);
        total += getTodoDayPoints(dateToLocalString(day));
    }
    return total;
}

// Month scope: day tasks for all days + week tasks for all weeks + month-scoped tasks
function getTodoMonthPoints(dateStr) {
    const d     = new Date(dateStr + 'T12:00:00');
    const year  = d.getFullYear(), month = d.getMonth();
    const days  = new Date(year, month + 1, 0).getDate();
    let total   = _todoPts('month', dateStr);         // month-scoped tasks
    const seenWeeks = new Set();
    for (let i = 1; i <= days; i++) {
        const key = `${year}-${String(month+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;
        total += getTodoDayPoints(key);               // day tasks
        const wk = getTodoKey('week', key);
        if (!seenWeeks.has(wk)) { seenWeeks.add(wk); total += _todoPts('week', key); } // week tasks
    }
    return total;
}

// Year scope: all day/week/month tasks + year-scoped tasks
function getTodoYearPoints(year) {
    let total = (state.todos['year_' + year] || [])
        .filter(t => t.completed && t.points).reduce((s, t) => s + t.points, 0);
    const seenMonths = new Set(), seenWeeks = new Set();
    for (let m = 0; m < 12; m++) {
        const mStr = `${year}-${String(m+1).padStart(2,'0')}-01`;
        const mk   = getTodoKey('month', mStr);
        if (!seenMonths.has(mk)) { seenMonths.add(mk); total += _todoPts('month', mStr); }
        const days = new Date(year, m + 1, 0).getDate();
        for (let d = 1; d <= days; d++) {
            const dStr = `${year}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
            total += getTodoDayPoints(dStr);
            const wk = getTodoKey('week', dStr);
            if (!seenWeeks.has(wk)) { seenWeeks.add(wk); total += _todoPts('week', dStr); }
        }
    }
    return total;
}

// All-time: every year in journal + every year in todos
function getTodoAllTimePoints() {
    const years = new Set();
    Object.keys(state.journalEntries).forEach(k => years.add(parseInt(k.slice(0,4))));
    Object.keys(state.todos).forEach(k => {
        const m = k.match(/^(?:day|week|month|year)_(\d{4})/);
        if (m) years.add(parseInt(m[1]));
    });
    let total = 0;
    years.forEach(y => { total += getTodoYearPoints(y); });
    return total;
}

// ── TODO SIDEBAR UI ──────────────────────────────────────────
function showTodosEditor(dateStr) {
    state.sidebarView = 'todos';
    state.currentDaySidebar = dateStr;
    renderSidebarContent();
}

function addTodoFromInput(scope, dateStr) {
    const textEl = document.getElementById('newTodoText');
    const ptsEl  = document.getElementById('newTodoPts');
    const text   = textEl?.value?.trim();
    if (!text) return;
    const pts = parseInt(ptsEl?.value) || 0;
    addTodo(scope, dateStr, text, pts);
    renderSidebarContent();
}

function renderTodosEditor(dateStr) {
    const scopes = [
        { id: 'day',   label: 'Today' },
        { id: 'week',  label: 'Week'  },
        { id: 'month', label: 'Month' },
        { id: 'year',  label: 'Year'  }
    ];
    const active = state.todoScope || 'day';
    const todos  = getTodos(active, dateStr);
    const donePts = todos.filter(t => t.completed && t.points).reduce((s,t) => s+t.points, 0);

    return `<div class="space-y-3 animate-fade-in">
        <div class="flex rounded-lg overflow-hidden border theme-border text-xs">
            ${scopes.map(s => `
            <button onclick="state.todoScope='${s.id}'; renderSidebarContent();"
                class="flex-1 py-1.5 transition-colors ${active===s.id ? 'bg-blue-500 text-white' : 'hover:theme-bg-tertiary theme-text-secondary'}">
                ${s.label}
            </button>`).join('')}
        </div>
        <div class="space-y-1 max-h-52 overflow-y-auto" id="todoList">
            ${todos.length === 0
                ? '<p class="text-sm theme-text-secondary text-center py-4">No tasks yet</p>'
                : todos.map(t => `
                <div class="flex items-center space-x-2 p-2 rounded-lg hover:theme-bg-tertiary group">
                    <input type="checkbox" ${t.completed ? 'checked' : ''}
                        onchange="toggleTodo('${active}','${dateStr}',${t.id}); renderSidebarContent();"
                        class="w-4 h-4 rounded border-gray-300 text-blue-500 flex-shrink-0">
                    <span class="flex-1 text-sm ${t.completed ? 'line-through theme-text-secondary' : ''}">${t.text}</span>
                    ${t.points ? `<span class="text-xs font-medium ${t.completed ? 'text-green-500' : 'theme-text-secondary'}">+${t.points}</span>` : ''}
                    <button onclick="deleteTodo('${active}','${dateStr}',${t.id}); renderSidebarContent();"
                        class="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 text-xs px-1">✕</button>
                </div>`).join('')}
        </div>
        ${donePts > 0 ? `<div class="text-xs text-center theme-text-secondary">+${donePts} pts from completed tasks</div>` : ''}
        <div class="flex space-x-2 pt-1 border-t theme-border">
            <input type="text" id="newTodoText" placeholder="New task…"
                onkeydown="if(event.key==='Enter') addTodoFromInput('${active}','${dateStr}');"
                class="flex-1 theme-bg-tertiary border theme-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 theme-text">
            <input type="number" id="newTodoPts" placeholder="pts" min="0"
                class="w-16 theme-bg-tertiary border theme-border rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500 theme-text">
            <button onclick="addTodoFromInput('${active}','${dateStr}');"
                class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">+</button>
        </div>
    </div>`;
}

function loadAllData() {
    loadEvents(); loadTheme(); loadBackground(); loadCalendars();
    loadLocation(); loadPrayerTimesCache(); loadJournal(); loadVariables(); loadShowPrayerTimes(); loadTodos();
}

function saveAllData() {
    saveEvents(); saveTheme(); saveBackground(); saveCalendars();
    saveToStorage(STORAGE_KEYS.CALENDARS(state.currentUser) + '_active', state.activeCalendars);
    saveLocation(); savePrayerTimesCache(); saveJournal(); saveVariables(); saveShowPrayerTimes(); saveTodos();
}

// ============================================
// USER MANAGEMENT
// ============================================

function loadUsers() {
    const saved = loadFromStorage(STORAGE_KEYS.USERS);
    if (saved && saved.length > 0) {
        state.users = saved;
    } else {
        state.users = ['default'];
        saveToStorage(STORAGE_KEYS.USERS, state.users);
    }
    const current = loadFromStorage(STORAGE_KEYS.CURRENT_USER);
    if (current && state.users.includes(current)) {
        state.currentUser = current;
    } else {
        state.currentUser = state.users[0];
        saveToStorage(STORAGE_KEYS.CURRENT_USER, state.currentUser);
    }
    updateUserDisplay();
}

function saveUsers() {
    saveToStorage(STORAGE_KEYS.USERS, state.users);
    saveToStorage(STORAGE_KEYS.CURRENT_USER, state.currentUser);
}

function switchUser(username) {
    if (!state.users.includes(username)) return;
    saveAllData();
    state.currentUser = username;
    saveToStorage(STORAGE_KEYS.CURRENT_USER, username);
    loadAllData();
    renderCurrentView(); renderMiniCalendar(); renderCalendarList();
    applyBackground(); updateUserDisplay(); closeUserMenu();
}

function createNewUser() {
    const username = prompt('Enter new account name:');
    if (!username) return;
    if (state.users.includes(username)) { alert('Account already exists!'); return; }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
        alert('Use only letters, numbers, hyphens, and underscores'); return;
    }
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
    alert(`Account "${username}" created and switched!`);
}

function deleteUser() {
    if (state.users.length <= 1) { alert('Cannot delete the only account!'); return; }
    const toDelete = prompt(`Enter account name to delete (current: ${state.currentUser}):\nAvailable: ${state.users.join(', ')}`);
    if (!toDelete) return;
    if (!state.users.includes(toDelete)) { alert('Account not found!'); return; }
    if (!confirm(`Delete account "${toDelete}" and ALL its data? This cannot be undone!`)) return;

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

    if (toDelete === state.currentUser) switchUser(state.users[0]);
    alert(`Account "${toDelete}" deleted!`);
    closeUserMenu();
}

function updateUserDisplay() {
    const display = document.getElementById('userDisplay');
    if (display) display.textContent = state.currentUser;
    const avatar = document.getElementById('userAvatar');
    if (avatar) avatar.textContent = state.currentUser.substring(0, 2).toUpperCase();
}

// ============================================
// LOCATION & PRAYER SETTINGS
// ============================================

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
                <h3 class="text-lg font-semibold">Location Settings</h3>
                <button onclick="closeLocationSettings()" class="theme-text-secondary hover:theme-text transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div class="p-6 space-y-4">
                <button onclick="autoDetectLocation()" id="autoDetectBtn" class="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span>Auto-Detect My Location</span>
                </button>
                <div id="detectStatus" class="text-xs text-center theme-text-secondary hidden">Detecting...</div>
                <div class="relative flex items-center justify-center">
                    <div class="absolute border-t theme-border w-full"></div>
                    <span class="relative theme-bg px-2 text-xs theme-text-secondary">OR enter manually</span>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">City</label>
                    <input type="text" id="locationCity" placeholder="e.g., Dubai" class="w-full theme-bg-tertiary border theme-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 theme-text">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Country</label>
                    <input type="text" id="locationCountry" placeholder="e.g., UAE" class="w-full theme-bg-tertiary border theme-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 theme-text">
                </div>
                <div class="border-t theme-border pt-4">
                    <div class="text-xs font-medium theme-text-secondary uppercase tracking-wider mb-2">Or use coordinates</div>
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-sm font-medium mb-1">Latitude</label>
                            <input type="number" id="locationLat" placeholder="25.2048" step="any" class="w-full theme-bg-tertiary border theme-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 theme-text">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Longitude</label>
                            <input type="number" id="locationLng" placeholder="55.2708" step="any" class="w-full theme-bg-tertiary border theme-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 theme-text">
                        </div>
                    </div>
                </div>
                <div class="border-t theme-border pt-4">
                    <label class="block text-sm font-medium mb-1">Prayer Calculation Method</label>
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
                    <p class="text-xs theme-text-secondary mt-1">This affects Fajr and Isha calculation angles</p>
                </div>
                <div class="flex items-center justify-end space-x-3 pt-4 border-t theme-border">
                    <button onclick="closeLocationSettings()" class="px-4 py-2 text-sm font-medium theme-text-secondary hover:theme-bg-tertiary rounded-lg transition-colors">Cancel</button>
                    <button onclick="saveLocationSettings()" class="px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-lg transition-colors">Save Location</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeLocationSettings(); });
    modal.classList.remove('hidden'); modal.classList.add('flex');
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

function closeLocationSettings() {
    const modal = document.getElementById('locationModal');
    if (modal) { modal.classList.add('hidden'); modal.classList.remove('flex'); }
}

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

// ============================================
// DATA PERSISTENCE
// ============================================

function saveEvents() { saveToStorage(STORAGE_KEYS.EVENTS(state.currentUser), events); }
function loadEvents() {
    const saved = loadFromStorage(STORAGE_KEYS.EVENTS(state.currentUser));
    events = (saved && saved.length > 0) ? saved : [];
    if (!saved || saved.length === 0) saveEvents();
}

function saveTheme() {
    saveToStorage(STORAGE_KEYS.THEME(state.currentUser), {
        isDarkMode: state.isDarkMode,
        currentTheme: state.currentTheme
    });
}
function loadTheme() {
    const saved = loadFromStorage(STORAGE_KEYS.THEME(state.currentUser));
    if (saved) {
        state.isDarkMode = saved.isDarkMode || false;
        state.currentTheme = saved.currentTheme || 'default';
        applyTheme(state.currentTheme, state.isDarkMode ? 'dark' : 'light');
    } else {
        checkSystemTheme();
    }
}

function applyTheme(themeId, mode) {
    const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
    const vars = mode === 'dark' ? theme.dark : theme.light;
    const root = document.documentElement;

    // Reset all CSS vars to defaults first, then override
    const defaults = THEMES[0];
    const defaultVars = mode === 'dark' ? defaults.dark : defaults.light;
    Object.keys(defaultVars).forEach(k => root.style.removeProperty(k));

    // Apply theme vars
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));

    // Apply dark class
    if (mode === 'dark') root.classList.add('dark');
    else                 root.classList.remove('dark');

    state.isDarkMode   = mode === 'dark';
    state.currentTheme = themeId;
    updateThemeToggleUI();
}

function updateThemeToggleUI() {
    const dot  = document.getElementById('themeToggleDot');
    const text = document.getElementById('themeText');
    const icon = document.getElementById('themeIcon');
    if (state.isDarkMode) {
        if (dot)  dot.style.transform = 'translateX(16px)';
        if (text) text.textContent = 'Light Mode';
        if (icon) icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
    } else {
        if (dot)  dot.style.transform = 'translateX(0)';
        if (text) text.textContent = 'Dark Mode';
        if (icon) icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
    }
}

function setTheme(mode) {
    applyTheme(state.currentTheme || 'default', mode);
    saveTheme();
}

function saveBackground() {
    // FIX: Warn user if image is large before trying to save
    if (state.backgroundImage) {
        const sizeEstimate = Math.ceil(state.backgroundImage.length * 3 / 4 / 1024);
        if (sizeEstimate > 3000) {
            console.warn(`Background image is large (~${sizeEstimate}KB). This may slow file saves.`);
        }
    }
    saveToStorage(STORAGE_KEYS.BACKGROUND(state.currentUser), {
        image: state.backgroundImage,
        opacity: state.backgroundOpacity,
        scope: state.backgroundScope
    });
}
function loadBackground() {
    const saved = loadFromStorage(STORAGE_KEYS.BACKGROUND(state.currentUser));
    if (saved && saved.image) {
        state.backgroundImage = saved.image;
        state.backgroundOpacity = saved.opacity || 0.5;
        state.backgroundScope = saved.scope || 'month';
        const bgControls = document.getElementById('bgControls');
        const bgPreview = document.getElementById('bgPreview');
        const opacitySlider = document.querySelector('.opacity-slider');
        const opacityValue = document.getElementById('opacityValue');
        if (bgControls) bgControls.classList.remove('hidden');
        if (bgPreview) { bgPreview.classList.remove('hidden'); bgPreview.style.backgroundImage = `url(${state.backgroundImage})`; }
        if (opacitySlider) opacitySlider.value = state.backgroundOpacity * 100;
        if (opacityValue) opacityValue.textContent = `${Math.round(state.backgroundOpacity * 100)}%`;
        setBackgroundScope(state.backgroundScope);
        applyBackground();
    }
}

function saveCalendars() { saveToStorage(STORAGE_KEYS.CALENDARS(state.currentUser), state.calendars); }
function loadCalendars() {
    const saved = loadFromStorage(STORAGE_KEYS.CALENDARS(state.currentUser));
    state.calendars = (saved && saved.length > 0) ? saved : [...DEFAULT_CALENDARS];
    if (!saved || saved.length === 0) saveCalendars();
    const savedActive = loadFromStorage(STORAGE_KEYS.CALENDARS(state.currentUser) + '_active');
    state.activeCalendars = savedActive || state.calendars.map(c => c.id);
    renderCalendarList();
}

// ============================================
// THEME MANAGEMENT
// ============================================

function openThemePicker() {
    closeSettings();
    let modal = document.getElementById('themePickerModal');
    if (modal) modal.remove();
    modal = document.createElement('div');
    modal.id = 'themePickerModal';
    modal.className = 'fixed inset-0 modal-backdrop flex items-center justify-center z-50';

    const grid = THEMES.map(t => {
        const isActive = t.id === state.currentTheme;
        const [c1, c2, c3] = t.preview;
        return `
            <button onclick="selectTheme('${t.id}')" id="theme-btn-${t.id}"
                class="relative p-3 rounded-xl border-2 text-left transition-all hover:scale-105 ${isActive ? 'border-blue-500' : 'theme-border hover:border-gray-400'}">
                <div class="flex space-x-1 mb-2">
                    <div class="w-8 h-8 rounded-md" style="background:${c1}"></div>
                    <div class="w-8 h-8 rounded-md" style="background:${c2}"></div>
                    <div class="w-8 h-8 rounded-md" style="background:${c3}"></div>
                </div>
                <div class="font-semibold text-sm">${t.name}</div>
                <div class="text-xs theme-text-secondary mt-0.5">${t.description}</div>
                ${isActive ? '<div class="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"><svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></div>' : ''}
            </button>`;
    }).join('');

    modal.innerHTML = `
        <div class="theme-bg rounded-2xl shadow-2xl w-full max-w-xl modal-animate overflow-hidden border theme-border">
            <div class="px-6 py-4 border-b theme-border flex items-center justify-between">
                <div>
                    <h3 class="text-lg font-semibold">Appearance</h3>
                    <p class="text-xs theme-text-secondary mt-0.5">Choose a theme for your calendar</p>
                </div>
                <button onclick="closeThemePicker()" class="theme-text-secondary hover:theme-text transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div class="p-6">
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6" id="themeGrid">${grid}</div>
                <div class="border-t theme-border pt-4 flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <span class="text-sm font-medium">Mode</span>
                        <button onclick="toggleTheme()" class="flex items-center space-x-2 px-3 py-1.5 rounded-lg border theme-border hover:theme-bg-tertiary transition-colors">
                            <div class="w-8 h-4 bg-gray-200 dark:bg-gray-700 rounded-full relative">
                                <div id="themeToggleDot" class="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${state.isDarkMode ? 'translate-x-4' : 'translate-x-0'}"></div>
                            </div>
                            <span class="text-sm" id="themeText">${state.isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                        </button>
                    </div>
                    <button onclick="closeThemePicker()" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">Done</button>
                </div>
            </div>
        </div>`;

    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeThemePicker(); });
}

function selectTheme(themeId) {
    const mode = state.isDarkMode ? 'dark' : 'light';
    applyTheme(themeId, mode);
    saveTheme();
    renderCurrentView();
    // Update the picker UI without closing it
    document.querySelectorAll('[id^="theme-btn-"]').forEach(btn => {
        const id = btn.id.replace('theme-btn-', '');
        btn.classList.toggle('border-blue-500', id === themeId);
        btn.classList.toggle('theme-border', id !== themeId);
        // Update checkmark
        const check = btn.querySelector('.bg-blue-500.rounded-full');
        if (id === themeId && !check) {
            const chk = document.createElement('div');
            chk.className = 'absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center';
            chk.innerHTML = '<svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>';
            btn.appendChild(chk);
        } else if (id !== themeId && check) {
            check.remove();
        }
    });
}

function closeThemePicker() {
    document.getElementById('themePickerModal')?.remove();
}

function checkSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('default', 'dark');
    }
}

function toggleTheme() {
    const newMode = state.isDarkMode ? 'light' : 'dark';
    applyTheme(state.currentTheme || 'default', newMode);
    saveTheme();
}

// ============================================
// CALENDAR MANAGEMENT
// ============================================

function renderCalendarList() {
    const list = document.getElementById('calendarList');
    if (!list) return;
    list.innerHTML = '';
    state.calendars.forEach(calendar => {
        const isActive = state.activeCalendars.includes(calendar.id);
        const colorObj = CALENDAR_COLORS.find(c => c.id === calendar.color) || CALENDAR_COLORS[0];
        const div = document.createElement('div');
        div.className = `sidebar-item group flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all ${isActive ? 'active' : ''}`;
        div.dataset.calendarId = calendar.id;
        div.addEventListener('contextmenu', (e) => { e.preventDefault(); openCalendarEditModal(calendar.id); });
        div.onclick = (e) => { if (!e.target.closest('.calendar-actions')) toggleCalendar(calendar.id); };
        div.innerHTML = `
            <span class="color-dot ${colorObj.bg}" title="${colorObj.name}"></span>
            <span class="text-sm flex-1 truncate">${calendar.name}</span>
            <div class="calendar-actions opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 ml-2">
                <button onclick="event.stopPropagation(); openCalendarEditModal('${calendar.id}')" class="p-1 hover:theme-bg-tertiary rounded transition-colors" title="Edit ${calendar.name}">
                    <svg class="w-3 h-3 theme-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
            </div>
            <svg class="w-4 h-4 ml-auto check-icon ${isActive ? 'opacity-100' : 'opacity-0'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        `;
        list.appendChild(div);
    });
}

function toggleCalendar(calendarId) {
    const index = state.activeCalendars.indexOf(calendarId);
    if (index > -1) {
        if (state.activeCalendars.length > 1) state.activeCalendars.splice(index, 1);
    } else {
        state.activeCalendars.push(calendarId);
    }
    saveToStorage(STORAGE_KEYS.CALENDARS(state.currentUser) + '_active', state.activeCalendars);
    renderCalendarList();
    renderCurrentView();
}

function addNewCalendar() {
    const name = prompt('Enter calendar name:');
    if (!name || !name.trim()) return;
    const id = 'cal_' + Date.now();
    const randomColor = CALENDAR_COLORS[Math.floor(Math.random() * CALENDAR_COLORS.length)].id;
    const newCalendar = { id, name: name.trim(), color: randomColor };
    state.calendars.push(newCalendar);
    state.activeCalendars.push(id);
    saveCalendars();
    saveToStorage(STORAGE_KEYS.CALENDARS(state.currentUser) + '_active', state.activeCalendars);
    renderCalendarList();
    renderCurrentView();
}

function openCalendarEditModal(calendarId) {
    const calendar = state.calendars.find(c => c.id === calendarId);
    if (!calendar) return;
    state.editingCalendarId = calendarId;
    const nameInput = document.getElementById('editCalendarName');
    if (nameInput) nameInput.value = calendar.name;
    const colorPicker = document.getElementById('colorPicker');
    if (colorPicker) {
        colorPicker.innerHTML = '';
        CALENDAR_COLORS.forEach(color => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `w-8 h-8 rounded-full ${color.bg} ${calendar.color === color.id ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600' : ''} transition-transform hover:scale-110`;
            btn.title = color.name;
            btn.dataset.colorId = color.id;
            btn.onclick = () => selectCalendarColor(color.id);
            colorPicker.appendChild(btn);
        });
    }
    const modal = document.getElementById('calendarEditModal');
    if (modal) { modal.classList.remove('hidden'); modal.classList.add('flex'); }
}

function selectCalendarColor(colorId) {
    document.querySelectorAll('#colorPicker button').forEach(btn => {
        btn.classList.toggle('ring-2', btn.dataset.colorId === colorId);
        btn.classList.toggle('ring-offset-2', btn.dataset.colorId === colorId);
        btn.classList.toggle('ring-gray-400', btn.dataset.colorId === colorId);
        btn.classList.toggle('dark:ring-gray-600', btn.dataset.colorId === colorId);
    });
}

function saveCalendarEdit() {
    const calendar = state.calendars.find(c => c.id === state.editingCalendarId);
    if (!calendar) return;
    const newName = document.getElementById('editCalendarName')?.value?.trim();
    if (!newName) { alert('Calendar name cannot be empty'); return; }
    const selectedColorBtn = document.querySelector('#colorPicker button.ring-2');
    calendar.name = newName;
    calendar.color = selectedColorBtn ? selectedColorBtn.dataset.colorId : calendar.color;
    saveCalendars(); renderCalendarList(); renderCurrentView(); closeCalendarEditModal();
}

function deleteCalendar() {
    const calendar = state.calendars.find(c => c.id === state.editingCalendarId);
    if (!calendar) return;
    const defaultIds = ['personal', 'work', 'birthdays', 'reminders'];
    if (defaultIds.includes(calendar.id)) {
        alert(`Cannot delete the "${calendar.name}" calendar. You can rename it or change its color instead.`); return;
    }
    if (!confirm(`Delete "${calendar.name}" calendar? All events in this calendar will also be deleted. This cannot be undone.`)) return;
    state.calendars = state.calendars.filter(c => c.id !== state.editingCalendarId);
    state.activeCalendars = state.activeCalendars.filter(id => id !== state.editingCalendarId);
    events = events.filter(e => e.calendar !== state.editingCalendarId);
    saveCalendars(); saveEvents();
    saveToStorage(STORAGE_KEYS.CALENDARS(state.currentUser) + '_active', state.activeCalendars);
    renderCalendarList(); renderCurrentView(); closeCalendarEditModal();
}

function closeCalendarEditModal() {
    const modal = document.getElementById('calendarEditModal');
    if (modal) { modal.classList.add('hidden'); modal.classList.remove('flex'); }
    state.editingCalendarId = null;
}

// ============================================
// EVENT MODAL & FORM
// FIX: Removed setupRepeatOptions/setupPrayerTimeOptions calls (listeners set up once)
// FIX: editingEventId is properly managed
// ============================================

async function openModal(event = null, date = null, time = null) {
    const modal = document.getElementById('eventModal');
    if (!modal) return;
    modal.classList.remove('hidden'); modal.classList.add('flex');
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
    const customOptions = document.getElementById('customRepeatOptions');
    if (customOptions) customOptions.classList.add('hidden');
    const repeatOnDays = document.getElementById('repeatOnDays');
    if (repeatOnDays) repeatOnDays.classList.add('hidden');
    const repeatCount = document.getElementById('repeatCount');
    if (repeatCount) repeatCount.classList.add('hidden');
    const repeatEndDate = document.getElementById('repeatEndDate');
    if (repeatEndDate) repeatEndDate.classList.add('hidden');
    document.querySelectorAll('.repeat-day-btn').forEach(btn => {
        btn.classList.remove('bg-blue-500', 'text-white', 'border-blue-500');
    });

    const eventDate = date || todayLocalString();

    if (state.userLocation) await loadPrayerTimesForDate(eventDate);

    if (event) {
        // EDITING existing event
        state.editingEventId = event.id;
        const modalTitle = document.getElementById('modalTitle');
        const eventTitle = document.getElementById('eventTitle');
        const eventDateInput = document.getElementById('eventDate');
        const eventLocation = document.getElementById('eventLocation');
        const eventDescription = document.getElementById('eventDescription');
        const eventCalendar = document.getElementById('eventCalendar');
        const deleteBtn = document.getElementById('deleteBtn');
        const eventPoints = document.getElementById('eventPoints');

        if (modalTitle) modalTitle.textContent = 'Edit Event';
        if (eventTitle) eventTitle.value = event.title;
        if (eventDateInput) eventDateInput.value = event.date;
        if (eventLocation) eventLocation.value = event.location || '';
        if (eventDescription) eventDescription.value = event.description || '';
        if (eventCalendar) eventCalendar.value = event.calendar;
        if (eventPoints) eventPoints.value = event.points || '';

        if (event.isPrayerBased && event.prayerConfig) {
            togglePrayerTimes(true);
            const prayerSelect = document.getElementById('prayerTimeSelect');
            const startOffset = document.getElementById('prayerStartOffset');
            const endOffset = document.getElementById('prayerEndOffset');
            if (prayerSelect) prayerSelect.value = event.prayerConfig.prayer;
            if (startOffset) startOffset.value = event.prayerConfig.startOffset;
            if (endOffset) endOffset.value = event.prayerConfig.endOffset;
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

        if (modalTitle) modalTitle.textContent = 'New Event';
        if (eventForm) eventForm.reset();
        if (eventDateInput) eventDateInput.value = eventDate;
        togglePrayerTimes(false);
        setAllDay(false);
        if (eventStartTime) eventStartTime.value = time || '09:00';
        if (eventEndTime) eventEndTime.value = time ? addMinutes(time, 60) : '10:00';

        const eventRepeat = document.getElementById('eventRepeat');
        if (eventRepeat) eventRepeat.value = 'none';
        if (deleteBtn) deleteBtn.classList.add('hidden');
    }
    updatePrayerTimeVisibility();
}

async function loadPrayerTimesForDate(dateStr) {
    if (!state.userLocation) return;
    let timings = null;
    if (state.userLocation.city && state.userLocation.country) {
        timings = await fetchPrayerTimesByCity(new Date(dateStr + 'T12:00:00'), state.userLocation.city, state.userLocation.country);
    } else if (state.userLocation.lat && state.userLocation.lng) {
        timings = await fetchPrayerTimes(new Date(dateStr + 'T12:00:00'), state.userLocation.lat, state.userLocation.lng);
    }
    if (timings) {
        state.prayerTimesForDate = timings;
        updatePrayerTimeDisplay();
    }
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

function updatePrayerTimeDisplay() {
    if (!state.prayerTimesForDate || !state.usePrayerTimes) return;
    const prayerSelect = document.getElementById('prayerTimeSelect');
    const startOffset = document.getElementById('prayerStartOffset');
    const endOffset = document.getElementById('prayerEndOffset');
    const startTimeDisplay = document.getElementById('prayerStartTimeDisplay');
    const endTimeDisplay = document.getElementById('prayerEndTimeDisplay');
    const prayer = prayerSelect ? prayerSelect.value : state.selectedPrayer;
    // FIX: parseInt(x) || fallback treats 0 as falsy — use explicit NaN check instead
    const startOff = startOffset ? (v => isNaN(v) ? 0  : v)(parseInt(startOffset.value)) : 0;
    const endOff   = endOffset   ? (v => isNaN(v) ? 30 : v)(parseInt(endOffset.value))   : 30;
    const prayerTime = state.prayerTimesForDate[prayer];
    if (!prayerTime) return;
    const prayerMinutes = getPrayerTimeInMinutes(prayerTime);
    if (startTimeDisplay) startTimeDisplay.textContent = minutesToTimeString(prayerMinutes + startOff);
    if (endTimeDisplay) endTimeDisplay.textContent = minutesToTimeString(prayerMinutes + endOff);
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
    const customOptions = document.getElementById('customRepeatOptions');
    if (customOptions) customOptions.classList.remove('hidden');
    const repeatInterval = document.getElementById('repeatInterval');
    const repeatUnit = document.getElementById('repeatUnit');
    const repeatEndType = document.getElementById('repeatEndType');
    const repeatCount = document.getElementById('repeatCount');
    const repeatEndDate = document.getElementById('repeatEndDate');
    const repeatOnDays = document.getElementById('repeatOnDays');

    if (config.interval && repeatInterval) repeatInterval.value = config.interval;
    if (config.unit && repeatUnit) {
        repeatUnit.value = config.unit;
        if (config.unit === 'weeks' && repeatOnDays) repeatOnDays.classList.remove('hidden');
    }
    if (config.days) {
        document.querySelectorAll('.repeat-day-btn').forEach(btn => {
            if (config.days.includes(parseInt(btn.dataset.day))) {
                btn.classList.add('bg-blue-500', 'text-white', 'border-blue-500');
            }
        });
    }
    if (config.endType && repeatEndType) {
        repeatEndType.value = config.endType;
        if (config.endType === 'after' && repeatCount) repeatCount.classList.remove('hidden');
        if (config.endType === 'on' && repeatEndDate) repeatEndDate.classList.remove('hidden');
    }
    if (config.endCount && repeatCount) repeatCount.value = config.endCount;
    if (config.endDate && repeatEndDate) repeatEndDate.value = config.endDate;
}

// ============================================
// HANDLE FORM SUBMIT
// FIX: Timezone-safe dates; series propagation prompt when editing repeating events
// ============================================

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
    const eventLocation = document.getElementById('eventLocation');
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
        location: eventLocation ? eventLocation.value : '',
        description: eventDescription ? eventDescription.value : '',
        repeat: eventRepeat ? eventRepeat.value : 'none',
        points: eventPoints ? parseInt(eventPoints.value) || 0 : 0,
        completed: false
    };

    if (!isAllDay) {
        if (state.usePrayerTimes) {
            const prayerSelect = document.getElementById('prayerTimeSelect');
            const startOffset = document.getElementById('prayerStartOffset');
            const endOffset = document.getElementById('prayerEndOffset');
            const prayer = prayerSelect ? prayerSelect.value : 'Fajr';
            const startOff = startOffset ? (v => isNaN(v) ? 0  : v)(parseInt(startOffset.value)) : 0;
            const endOff   = endOffset   ? (v => isNaN(v) ? 30 : v)(parseInt(endOffset.value))   : 30;
            if (state.prayerTimesForDate) {
                const prayerTime = state.prayerTimesForDate[prayer];
                if (prayerTime) {
                    const prayerMinutes = getPrayerTimeInMinutes(prayerTime);
                    eventData.startTime = minutesToTimeString(prayerMinutes + startOff);
                    eventData.endTime = minutesToTimeString(prayerMinutes + endOff);
                    eventData.isPrayerBased = true;
                    eventData.prayerConfig = { prayer, startOffset: startOff, endOffset: endOff };
                }
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
        document.querySelectorAll('.repeat-day-btn.bg-blue-500').forEach(btn => selectedDays.push(parseInt(btn.dataset.day)));
        const repeatInterval = document.getElementById('repeatInterval');
        const repeatUnit = document.getElementById('repeatUnit');
        const repeatEndType = document.getElementById('repeatEndType');
        const repeatCountEl = document.getElementById('repeatCount');
        const repeatEndDateEl = document.getElementById('repeatEndDate');
        const monthOverflow = document.getElementById('monthOverflow');
        eventData.repeatConfig = {
            interval: parseInt(repeatInterval ? repeatInterval.value : 1) || 1,
            unit: repeatUnit ? repeatUnit.value : 'days',
            days: selectedDays,
            endType: repeatEndType ? repeatEndType.value : 'never',
            endCount: repeatCountEl ? repeatCountEl.value : '10',
            endDate: repeatEndDateEl ? repeatEndDateEl.value : '',
            monthOverflow: monthOverflow ? monthOverflow.value : 'snap'
        };
    }

    if (eventData.repeat === 'monthly') {
        const monthlyOverflow = document.getElementById('monthlyOverflow');
        if (!eventData.repeatConfig) eventData.repeatConfig = {};
        eventData.repeatConfig.monthOverflow = monthlyOverflow ? monthlyOverflow.value : 'snap';
    }

    if (state.editingEventId) {
        // FIX: ask whether to update just this or the whole series
        const existingEvent = events.find(ev => ev.id === state.editingEventId);
        const isPartOfSeries = existingEvent &&
            (existingEvent.parentId || events.some(ev => ev.parentId === state.editingEventId));

        if (isPartOfSeries) {
            const editAll = confirm(
                'This event is part of a repeating series.\n\n' +
                'Click OK to update ALL events in the series (same title, time, calendar, etc. — dates are preserved).\n\n' +
                'Click Cancel to update only this single event.'
            );
            if (editAll) {
                const parentId = existingEvent.parentId || state.editingEventId;
                events = events.map(ev => {
                    if (ev.id === state.editingEventId || ev.parentId === parentId || ev.id === parentId) {
                        return { ...eventData, id: ev.id, date: ev.date, parentId: ev.parentId };
                    }
                    return ev;
                });
            } else {
                const index = events.findIndex(ev => ev.id === state.editingEventId);
                if (index !== -1) {
                    // Detach from series when editing alone
                    events[index] = { ...eventData, parentId: undefined };
                }
            }
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
    renderCurrentView();
    closeModal();
}

// ============================================
// GENERATE REPEAT EVENTS
// FIX: Respects end conditions for all repeat types
// FIX: Monthly 31st snaps to last day of shorter months (or skips)
// FIX: Timezone-safe date strings
// ============================================

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

function generateRepeatEvents(baseEvent) {
    const instances = [];
    const SAFETY_MAX = 365;
    const baseDate = new Date(baseEvent.date + 'T12:00:00');

    const config = baseEvent.repeatConfig || {};
    const endType  = config.endType  || 'never';
    const endCount = parseInt(config.endCount) || 52;
    const endDate  = config.endDate ? new Date(config.endDate + 'T12:00:00') : null;
    const monthOverflow = config.monthOverflow || 'snap';
    const snap = monthOverflow !== 'skip';

    let occurrenceIndex = 0;

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
                nextDate = addMonthsSafe(baseDate, occurrenceIndex, snap);
                if (!nextDate) continue;
                break;
            case 'yearly': {
                const ty = baseDate.getFullYear() + occurrenceIndex;
                const dim = new Date(ty, baseDate.getMonth() + 1, 0).getDate();
                nextDate = new Date(ty, baseDate.getMonth(), Math.min(baseDate.getDate(), dim), 12, 0, 0);
                break;
            }
            case 'weekdays': {
                nextDate = new Date(baseDate);
                let weekdaysAdded = 0;
                while (weekdaysAdded < occurrenceIndex) {
                    nextDate.setDate(nextDate.getDate() + 1);
                    if (nextDate.getDay() !== 0 && nextDate.getDay() !== 6) weekdaysAdded++;
                }
                break;
            }
            case 'custom': {
                const interval = parseInt(config.interval) || 1;
                const unit = config.unit || 'days';
                const specificDays = config.days && config.days.length > 0 ? config.days : null;

                if (unit === 'weeks' && specificDays) {
                    nextDate = new Date(baseDate);
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
                        case 'days':
                            nextDate = new Date(baseDate);
                            nextDate.setDate(baseDate.getDate() + interval * occurrenceIndex);
                            break;
                        case 'weeks':
                            nextDate = new Date(baseDate);
                            nextDate.setDate(baseDate.getDate() + interval * 7 * occurrenceIndex);
                            break;
                        case 'months':
                            nextDate = addMonthsSafe(baseDate, interval * occurrenceIndex, snap);
                            if (!nextDate) continue;
                            break;
                        case 'years': {
                            const ty = baseDate.getFullYear() + interval * occurrenceIndex;
                            const dim = new Date(ty, baseDate.getMonth() + 1, 0).getDate();
                            nextDate = new Date(ty, baseDate.getMonth(), Math.min(baseDate.getDate(), dim), 12, 0, 0);
                            break;
                        }
                    }
                }
                break;
            }
            default:
                return;
        }

        if (!nextDate) break;

        if (endType === 'after' && occurrenceIndex > endCount - 1) break;
        if (endType === 'on' && endDate && nextDate > endDate) break;

        const instance = { ...baseEvent };
        instance.id = Date.now() + occurrenceIndex;
        instance.date = dateToLocalString(nextDate);
        instance.parentId = baseEvent.id;
        instance.completed = false;
        instances.push(instance);
    }

    events.push(...instances);
}

// ============================================
// CLOSE MODAL
// FIX: Now clears editingEventId to prevent accidental overwrites
// ============================================

function closeModal() {
    const modal = document.getElementById('eventModal');
    if (modal) { modal.classList.add('hidden'); modal.classList.remove('flex'); }
    state.editingEventId = null; // FIX: was missing
    state.usePrayerTimes = false;
    state.prayerTimesForDate = null;
}

function deleteEvent() {
    if (!state.editingEventId) return;
    const eventToDelete = events.find(e => e.id === state.editingEventId);
    const isPartOfSeries = eventToDelete &&
        (eventToDelete.parentId || events.some(e => e.parentId === state.editingEventId));

    if (!isPartOfSeries) {
        events = events.filter(e => e.id !== state.editingEventId);
        saveEvents(); renderCurrentView(); closeModal();
        return;
    }
    openDeleteSeriesSheet(eventToDelete);
}

function openDeleteSeriesSheet(eventToDelete) {
    document.getElementById('deleteSeriesSheet')?.remove();
    const sheet = document.createElement('div');
    sheet.id = 'deleteSeriesSheet';
    sheet.className = 'fixed inset-0 flex items-end sm:items-center justify-center z-[70]';
    sheet.style.background = 'rgba(0,0,0,0.5)';
    sheet.innerHTML = `
        <div class="theme-bg w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl shadow-2xl border theme-border overflow-hidden modal-animate">
            <div class="px-5 pt-5 pb-2 border-b theme-border">
                <h3 class="font-semibold">Delete recurring event</h3>
                <p class="text-xs theme-text-secondary mt-0.5 truncate">${eventToDelete.title}</p>
            </div>
            <div class="divide-y theme-border">
                <button onclick="confirmDeleteSeries('one')" class="w-full flex items-center gap-3 px-5 py-3.5 hover:theme-bg-tertiary transition-colors text-left">
                    <span class="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 text-sm font-medium">1</span>
                    <div>
                        <div class="text-sm font-medium">This event only</div>
                        <div class="text-xs theme-text-secondary">Remove just this occurrence</div>
                    </div>
                </button>
                <button onclick="confirmDeleteSeries('following')" class="w-full flex items-center gap-3 px-5 py-3.5 hover:theme-bg-tertiary transition-colors text-left">
                    <span class="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0 text-orange-600 dark:text-orange-400">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
                    </span>
                    <div>
                        <div class="text-sm font-medium">This and following events</div>
                        <div class="text-xs theme-text-secondary">Delete from here to end of series</div>
                    </div>
                </button>
                <button onclick="confirmDeleteSeries('all')" class="w-full flex items-center gap-3 px-5 py-3.5 hover:theme-bg-tertiary transition-colors text-left">
                    <span class="w-7 h-7 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0 text-red-600">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </span>
                    <div>
                        <div class="text-sm font-medium text-red-600 dark:text-red-400">All events in the series</div>
                        <div class="text-xs theme-text-secondary">Remove every occurrence</div>
                    </div>
                </button>
            </div>
            <div class="p-3">
                <button onclick="closeDeleteSeriesSheet()" class="w-full py-2.5 text-sm font-medium rounded-xl theme-bg-tertiary hover:opacity-80 transition-colors">
                    Cancel
                </button>
            </div>
        </div>`;
    sheet.addEventListener('click', e => { if (e.target === sheet) closeDeleteSeriesSheet(); });
    document.body.appendChild(sheet);
}

function closeDeleteSeriesSheet() {
    document.getElementById('deleteSeriesSheet')?.remove();
}

function confirmDeleteSeries(scope) {
    const eventToDelete = events.find(e => e.id === state.editingEventId);
    if (!eventToDelete) { closeDeleteSeriesSheet(); return; }

    const parentId = eventToDelete.parentId || state.editingEventId;

    if (scope === 'one') {
        events = events.filter(e => e.id !== state.editingEventId);
    } else if (scope === 'following') {
        const cutDate = eventToDelete.date;
        events = events.filter(e => {
            const inSeries = (e.id === parentId || e.parentId === parentId);
            return !(inSeries && e.date >= cutDate);
        });
    } else {
        events = events.filter(e => e.id !== parentId && e.parentId !== parentId);
    }

    saveEvents(); renderCurrentView();
    closeDeleteSeriesSheet();
    closeModal();
}

// ============================================
// EVENT RENDERING
// ============================================

function createEventElement(event) {
    if (event.isAllDay) {
        const el = document.createElement('div');
        el.className = `event-card ${event.color} all-day`;
        el.innerHTML = `
            <div class="font-semibold truncate text-xs flex items-center">
                <span class="w-2 h-2 rounded-full bg-white/50 mr-1"></span>
                ${event.title}
            </div>
        `;
        el.addEventListener('click', (e) => { e.stopPropagation(); openModal(event); });
        return el;
    }

    const [startHour, startMin] = event.startTime.split(':').map(Number);
    const [endHour, endMin] = event.endTime.split(':').map(Number);
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    const duration = endMinutes - startMinutes;

    const el = document.createElement('div');
    el.className = `event-card ${event.color}`;
    el.style.top = `${(startMinutes / 60) * 60}px`;
    el.style.height = `${Math.max((duration / 60) * 60 - 2, 20)}px`;
    el.draggable = true;

    const prayerIndicator = event.isPrayerBased ? `
        <div class="absolute top-1 right-1 opacity-75" title="Based on ${event.prayerConfig.prayer}">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
        </div>` : '';

    const repeatIcon = (event.repeat && event.repeat !== 'none' && !event.isPrayerBased) ? `
        <div class="absolute top-1 right-1 opacity-75">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        </div>` : '';

    el.innerHTML = `
        <div class="font-semibold truncate text-xs">${event.title}</div>
        <div class="opacity-90 truncate text-[10px]">${event.startTime} - ${event.endTime}</div>
        ${event.location ? `<div class="opacity-75 truncate text-[10px] flex items-center mt-0.5">
            <svg class="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>${event.location}</div>` : ''}
        ${repeatIcon}${prayerIndicator}
        <div class="resize-handle"></div>
    `;

    el.addEventListener('click', (e) => { e.stopPropagation(); openModal(event); });
    el.addEventListener('dragstart', (e) => {
        state.draggedEvent = event;
        el.style.opacity = '0.5';
        e.dataTransfer.effectAllowed = 'move';
    });
    el.addEventListener('dragend', () => {
        el.style.opacity = '1';
        state.draggedEvent = null;
    });

    // FIX: only attach mousedown on the resize handle; global mousemove/mouseup set up once
    setupResizeHandler(el, event, startHour, startMin);
    return el;
}

// FIX: Resize handler — only adds mousedown to the handle element.
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

// ============================================
// WEEK VIEW
// FIX: Timezone-safe date strings throughout
// ============================================

function renderWeekView() {
    const startOfWeek = new Date(state.currentDate);
    startOfWeek.setDate(state.currentDate.getDate() - state.currentDate.getDay());
    updateHeader(startOfWeek);
    renderWeekHeader(startOfWeek);
    renderWeekBody(startOfWeek);
    updateTimeIndicator();
}

function updateHeader(startOfWeek) {
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const currentMonth = document.getElementById('currentMonth');
    const currentYear = document.getElementById('currentYear');
    if (currentMonth) currentMonth.textContent = monthNames[state.currentDate.getMonth()];
    if (currentYear) currentYear.textContent = state.currentDate.getFullYear();
}

function renderWeekHeader(startOfWeek) {
    const weekHeader = document.querySelector('.week-header');
    if (!weekHeader) return;

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
        ? `<span class="text-[10px] font-bold text-blue-600 dark:text-blue-400 leading-tight">${weekTotal}</span><span class="text-[9px] theme-text-secondary">pts</span>`
        : '';
    weekHeader.appendChild(cornerCell);

    const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
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
            state.currentDaySidebar = dateStr;
        };
        headerCell.innerHTML = `
            <div class="text-xs font-medium theme-text-secondary uppercase tracking-wider mb-1">${dayNames[i]}</div>
            <div class="flex items-center justify-center space-x-2">
                <span class="text-xl font-semibold ${isToday ? 'text-blue-600 dark:text-blue-400' : 'theme-text'}">${date.getDate()}</span>
                <span class="islamic-date">(${hijri.day} ${hijri.month.substring(0, 3)})</span>
            </div>
            ${dayScore !== null ? `<div class="text-[10px] font-semibold text-blue-500 dark:text-blue-300 mt-0.5">${dayScore} pts</div>` : ''}
        `;
        weekHeader.appendChild(headerCell);
    }
}

function renderWeekBody(startOfWeek) {
    const weekBody = document.getElementById('weekBody');
    if (!weekBody) return;
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
        const isToday = dateToLocalString(date) === todayLocalString(); // FIX: timezone-safe
        const dateStr = dateToLocalString(date); // FIX: timezone-safe
        weekBody.appendChild(createDayColumn(dateStr, isToday, i));
    }
}

function createDayColumn(dateStr, isToday, dayIndex) {
    const dayColumn = document.createElement('div');
    dayColumn.className = `day-column relative ${isToday ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`;
    dayColumn.dataset.date = dateStr;

    const allDayContainer = document.createElement('div');
    allDayContainer.className = 'all-day-container border-b theme-border bg-gray-50/50 dark:bg-gray-900/20 p-1';
    allDayContainer.style.minHeight = '28px';

    const dayEvents = events.filter(e => e.date === dateStr && state.activeCalendars.includes(e.calendar));
    dayEvents.filter(e => e.isAllDay).forEach(event => allDayContainer.appendChild(createEventElement(event)));
    dayColumn.appendChild(allDayContainer);

    for (let hour = 0; hour < 24; hour++) {
        dayColumn.appendChild(createHourRow(hour, dateStr));
    }
    dayEvents.filter(e => !e.isAllDay).forEach(event => dayColumn.appendChild(createEventElement(event)));
    // Render prayer time markers asynchronously (won't block layout)
    if (state.showPrayerTimesInView) renderPrayerTimesInColumn(dayColumn, dateStr);
    return dayColumn;
}

function createHourRow(hour, dateStr) {
    const hourRow = document.createElement('div');
    hourRow.className = 'hour-row';
    hourRow.dataset.hour = hour;
    hourRow.addEventListener('click', (e) => {
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
    let timings = null;
    if (state.userLocation.city && state.userLocation.country) {
        timings = await fetchPrayerTimesByCity(new Date(dateStr + 'T12:00:00'), state.userLocation.city, state.userLocation.country);
    } else if (state.userLocation.lat && state.userLocation.lng) {
        timings = await fetchPrayerTimes(new Date(dateStr + 'T12:00:00'), state.userLocation.lat, state.userLocation.lng);
    }
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
            z-index: 2;
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
        `;
        label.textContent = `${name} ${timeStr}`;
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

function updateTimeIndicator() {
    if (state.currentView !== 'week') return;
    const weekBody = document.getElementById('weekBody');
    if (!weekBody) return;

    // Remove any previous indicators from all day columns
    weekBody.querySelectorAll('.current-time-line').forEach(el => el.remove());

    const now = new Date();
    const startOfWeek = new Date(state.currentDate);
    startOfWeek.setDate(state.currentDate.getDate() - state.currentDate.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    if (now < startOfWeek || now > endOfWeek) return;

    const dayIndex = now.getDay(); // 0 = Sun
    const minutes  = now.getHours() * 60 + now.getMinutes();

    // Place indicator inside the specific today column (skip time-label column)
    const dayColumns = weekBody.querySelectorAll('.day-column');
    const todayCol   = dayColumns[dayIndex];
    if (!todayCol) return;

    // Offset past the all-day row at the top of each column
    const allDayRow   = todayCol.querySelector('.all-day-container');
    const allDayHeight = allDayRow ? allDayRow.offsetHeight : 28;
    const topPx = allDayHeight + (minutes / 60) * 60;

    const timeLine = document.createElement('div');
    timeLine.className = 'current-time-line';
    timeLine.style.top = `${topPx}px`;
    todayCol.appendChild(timeLine);
}

// ============================================
// MONTH VIEW
// FIX: Timezone-safe date strings; clicking a day opens day view
// ============================================

function renderMonthView() {
    const grid = document.getElementById('monthGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const year = state.currentDate.getFullYear();
    const month = state.currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const currentMonth = document.getElementById('currentMonth');
    const currentYear = document.getElementById('currentYear');
    if (currentMonth) currentMonth.textContent = monthNames[month];
    if (currentYear) currentYear.textContent = year;

    ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(day => {
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
        const dayEvents = events.filter(e => e.date === dateStr && state.activeCalendars.includes(e.calendar));
        const isToday = dateStr === todayLocalString(); // FIX: timezone-safe
        const hijri = toHijri(new Date(year, month, day));

        const div = document.createElement('div');
        div.className = `theme-bg p-2 min-h-[100px] border-b border-r theme-border cursor-pointer hover:theme-bg-tertiary transition-colors ${isToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`;
        // FIX: clicking a day in month view goes to day view
        div.onclick = () => {
            state.currentDate = new Date(year, month, day);
            renderMiniCalendar();
            switchView('day');
            state.currentDaySidebar = dateStr;
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
            <div class="flex justify-between items-start mb-1">
                <span class="font-semibold ${isToday ? 'text-blue-600 dark:text-blue-400' : ''}">${day}</span>
                <div class="flex flex-col items-end gap-0.5">
                    <span class="text-[10px] theme-text-secondary">${hijri.day} ${hijri.month.substring(0, 3)}</span>
                    ${getDayIndicator(dateStr)}
                </div>
            </div>
            <div class="space-y-0.5">
                ${eventsHtml}
                ${dayEvents.length > 3 ? `<div class="text-xs theme-text-secondary">+${dayEvents.length - 3} more</div>` : ''}
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

// ============================================
// YEAR VIEW
// ============================================

function renderYearView() {
    const grid = document.getElementById('yearGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const year = state.currentDate.getFullYear();
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const currentMonth = document.getElementById('currentMonth');
    const currentYear = document.getElementById('currentYear');
    if (currentMonth) currentMonth.textContent = 'Year';
    if (currentYear) currentYear.textContent = year;

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
            const isToday = dateStr === todayLocalString(); // FIX: timezone-safe
            daysHtml += `<div class="aspect-square flex items-center justify-center text-xs rounded-full ${isToday ? 'bg-blue-600 text-white' : ''} ${hasEvents && !isToday ? 'font-bold' : ''}">${day}</div>`;
        }

        div.innerHTML = `
            <div class="font-semibold mb-3 flex items-center justify-between">
                <span>${monthName}</span>
                ${(() => { const mTotal = calcMonthTotal(`${year}-${String(idx+1).padStart(2,'0')}-01`); return mTotal > 0 ? `<span class="text-xs font-bold text-blue-600 dark:text-blue-400">${mTotal} pts</span>` : ''; })()}
            </div>
            <div class="grid grid-cols-7 gap-1 text-center text-xs theme-text-secondary mb-2"><div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div></div>
            <div class="grid grid-cols-7 gap-1 text-center text-sm">${daysHtml}</div>
        `;
        grid.appendChild(div);
    });
}

// ============================================
// MINI CALENDAR
// ============================================

function renderMiniCalendar() {
    const miniCalendarMonth = document.getElementById('miniCalendarMonth');
    const miniCalendar = document.getElementById('miniCalendar');
    if (!miniCalendarMonth || !miniCalendar) return;

    // Always show the month of state.currentDate and highlight that exact day
    const year        = state.currentDate.getFullYear();
    const month       = state.currentDate.getMonth();
    const firstDay    = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const currentStr  = dateToLocalString(state.currentDate); // the day to highlight

    miniCalendarMonth.textContent = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    miniCalendar.innerHTML = '';

    ['S','M','T','W','T','F','S'].forEach(d => {
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

// ============================================
// DAY VIEW
// FIX: Timezone-safe; sidebar shown on load if currentDaySidebar set
// ============================================

function renderDayView() {
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const currentMonth = document.getElementById('currentMonth');
    const currentYear = document.getElementById('currentYear');
    if (currentMonth) currentMonth.textContent = dayNames[state.currentDate.getDay()];
    if (currentYear) currentYear.textContent = state.currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    renderDayTimeline();
    if (state.currentDaySidebar) openDaySidebar(state.currentDaySidebar);
}

function renderDayTimeline() {
    const container = document.getElementById('dayTimeline');
    if (!container) return;
    container.innerHTML = '';

    const dateStr = dateToLocalString(state.currentDate); // FIX: timezone-safe
    const dayEvents = events.filter(e => e.date === dateStr && state.activeCalendars.includes(e.calendar));

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
            <span id="sidebarToggleBtnLabel">${state.currentDaySidebar ? 'Hide Journal' : 'Open Journal'}</span>
        </button>
    `;
    container.appendChild(toolbar);

    // All-day events at top
    const allDayContainer = document.createElement('div');
    allDayContainer.className = 'border-b theme-border p-2';
    dayEvents.filter(e => e.isAllDay).forEach(event => allDayContainer.appendChild(createEventElement(event)));
    container.appendChild(allDayContainer);

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
        container.appendChild(hourRow);
    }
    dayEvents.filter(e => !e.isAllDay).forEach(event => container.appendChild(createEventElement(event)));
    if (state.showPrayerTimesInView) renderPrayerTimesInColumn(container, dateStr);
}

function openDaySidebar(dateStr) {
    state.currentDaySidebar = dateStr;
    const sidebar = document.getElementById('daySidebar');
    if (!sidebar) return;
    sidebar.classList.remove('hidden'); sidebar.classList.add('flex');
    renderSidebarContent();
    // Update toggle button label
    const label = document.getElementById('sidebarToggleBtnLabel');
    if (label) label.textContent = 'Hide Journal';
}

function closeDaySidebar() {
    state.currentDaySidebar = null;
    state.sidebarView = null;
    const sidebar = document.getElementById('daySidebar');
    if (sidebar) { sidebar.classList.add('hidden'); sidebar.classList.remove('flex'); }
    // Update toggle button label
    const label = document.getElementById('sidebarToggleBtnLabel');
    if (label) label.textContent = 'Open Journal';
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
    const dayEvents = events.filter(e => e.date === dateStr && state.activeCalendars.includes(e.calendar));

    let autoScore = 0;
    dayEvents.forEach(e => { if (e.completed && e.points) autoScore += e.points; });

    sidebar.innerHTML = `
        <div class="flex flex-col h-full overflow-hidden">
        <div class="p-4 border-b theme-border flex items-center justify-between shrink-0">
            <div>
                <h3 class="font-semibold text-lg">${date.toLocaleDateString('en-US', { weekday: 'long' })}</h3>
                <p class="text-sm theme-text-secondary">${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · ${hijri.day} ${hijri.month.substring(0, 3)}</p>
            </div>
            <button onclick="closeDaySidebar()" class="p-2 hover:theme-bg-tertiary rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
        <div class="p-4 space-y-3 shrink-0">
            <div class="flex space-x-2">
                <button onclick="showJournalEditor()" class="flex-1 py-2 px-3 rounded-lg border theme-border hover:theme-bg-tertiary transition-colors flex items-center justify-center space-x-1 ${state.sidebarView === 'journal' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500' : ''}">
                    <span>📝</span><span class="text-sm font-medium">Journal</span>
                </button>
                <button onclick="showScoreEditor()" class="flex-1 py-2 px-3 rounded-lg border theme-border hover:theme-bg-tertiary transition-colors flex items-center justify-center space-x-1 ${state.sidebarView === 'score' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500' : ''}">
                    <span>⭐</span><span class="text-sm font-medium">Score</span>
                </button>
                <button onclick="showTodosEditor('${dateStr}')" class="flex-1 py-2 px-3 rounded-lg border theme-border hover:theme-bg-tertiary transition-colors flex items-center justify-center space-x-1 ${state.sidebarView === 'todos' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500' : ''}">
                    <span>✅</span><span class="text-sm font-medium">Tasks</span>
                </button>
            </div>
            <div id="sidebarEditor" class="min-h-[120px]">${renderEditorContent(journal, autoScore)}</div>
        </div>
        <div class="flex-1 overflow-y-auto p-4 border-t theme-border">
            <h4 class="text-xs font-semibold theme-text-secondary uppercase tracking-wider mb-3">Events</h4>
            <div class="space-y-2">${renderSidebarEvents(dayEvents)}</div>
        </div>
        <div class="p-4 border-t theme-border bg-blue-50/50 dark:bg-blue-900/10 shrink-0">
            <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-medium">Day Score</span>
                <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">${journal?.score || 0} pts</span>
            </div>
            ${renderWeekTotal(dateStr)}
            ${renderMonthTotal(dateStr)}
            ${renderAllTimeTotal()}
        </div>
        </div>
    `;
}

function renderEditorContent(journal, autoScore) {
    if (state.sidebarView === 'todos') {
        return renderTodosEditor(state.currentDaySidebar || dateToLocalString(state.currentDate));
    }
    if (state.sidebarView === 'journal') {
        return `
            <div class="space-y-3 animate-fade-in">
                <input type="text" id="journalTitle" placeholder="Title (optional)" value="${journal?.title || ''}"
                    class="w-full theme-bg-tertiary border theme-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 theme-text">
                <textarea id="journalContent" placeholder="Write about your day..." rows="6"
                    class="w-full theme-bg-tertiary border theme-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 theme-text resize-none">${journal?.content || ''}</textarea>
                <button onclick="saveJournalEntry()" class="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">Save Journal</button>
            </div>`;
    }
    if (state.sidebarView === 'score') {
        const suggestedExpr = autoScore > 0 ? autoScore.toString() : '';
        return `
            <div class="space-y-3 animate-fade-in">
                <div class="theme-bg-tertiary rounded-lg p-3">
                    <label class="block text-xs font-medium theme-text-secondary mb-1">Expression</label>
                    <input type="text" id="scoreExpression" placeholder="work*2 + gym + 5" value="${journal?.expression || suggestedExpr}"
                        class="w-full bg-transparent border-none focus:ring-0 p-0 text-lg font-mono theme-text placeholder-gray-400">
                    <div class="text-xs theme-text-secondary mt-1">Available variables: ${Object.keys(state.variables).join(', ') || 'none'}</div>
                </div>
                <div id="scorePreview" class="text-center py-2">
                    <span class="text-3xl font-bold text-blue-600 dark:text-blue-400">--</span>
                    <span class="text-sm theme-text-secondary">pts</span>
                </div>
                <button onclick="saveScoreEntry()" class="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">Save Score</button>
            </div>`;
    }
    if (journal) {
        return `
            <div class="space-y-3">
                ${(journal.title || journal.content) ? `
                    <div class="theme-bg-tertiary rounded-lg p-3">
                        <div class="flex items-center justify-between mb-1">
                            <span class="text-xs font-medium theme-text-secondary">📝 Journal</span>
                            <button onclick="showJournalEditor()" class="text-xs text-blue-600 hover:underline">Edit</button>
                        </div>
                        ${journal.title ? `<h4 class="font-medium text-sm mb-1">${journal.title}</h4>` : ''}
                        ${journal.content ? `<p class="text-sm theme-text-secondary line-clamp-3">${journal.content}</p>` : ''}
                    </div>` : ''}
                ${journal.score !== undefined ? `
                    <div class="theme-bg-tertiary rounded-lg p-3 flex items-center justify-between">
                        <span class="text-xs font-medium theme-text-secondary">⭐ Score</span>
                        <div class="flex items-center space-x-2">
                            <span class="text-xl font-bold text-blue-600 dark:text-blue-400">${journal.score} pts</span>
                            <button onclick="showScoreEditor()" class="text-xs text-blue-600 hover:underline">Edit</button>
                        </div>
                    </div>` : ''}
            </div>`;
    }
    return `<div class="text-center py-8 theme-text-secondary"><p class="text-sm">Click Journal or Score to add your first entry</p></div>`;
}

// FIX: Event IDs passed as numbers (no quotes in template literal)
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
    const date = new Date(dateStr + 'T12:00:00');
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    let weekTotal = 0;
    for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        const entry = state.journalEntries[dateToLocalString(d)];
        if (entry?.score) weekTotal += entry.score;
    }
    // Add day todos for every day + week-scoped todos
    weekTotal += getTodoWeekPoints(dateStr);
    return `<div class="flex items-center justify-between mt-2 pt-2 border-t theme-border"><span class="text-xs theme-text-secondary">Week Total</span><span class="text-sm font-medium">${weekTotal} pts</span></div>`;
}

function calcMonthTotal(dateStr) {
    const date = new Date(dateStr + 'T12:00:00');
    const year  = date.getFullYear();
    const month = date.getMonth();
    const days  = new Date(year, month + 1, 0).getDate();
    let total = 0;
    for (let d = 1; d <= days; d++) {
        const key = `${year}-${String(month + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const entry = state.journalEntries[key];
        if (entry?.score) total += entry.score;
    }
    // Add day + week + month-scoped todo points for this month
    total += getTodoMonthPoints(dateStr);
    return total;
}

function calcAllTimeTotal() {
    const journal = Object.values(state.journalEntries).reduce((sum, e) => sum + (e?.score || 0), 0);
    return journal + getTodoAllTimePoints();
}

function renderMonthTotal(dateStr) {
    const total = calcMonthTotal(dateStr);
    const date = new Date(dateStr + 'T12:00:00');
    const monthName = date.toLocaleDateString('en-US', { month: 'long' });
    return `<div class="flex items-center justify-between mt-2 pt-2 border-t theme-border"><span class="text-xs theme-text-secondary">${monthName} Total</span><span class="text-sm font-medium">${total} pts</span></div>`;
}

function renderAllTimeTotal() {
    const total = calcAllTimeTotal();
    return `<div class="flex items-center justify-between mt-2 pt-2 border-t theme-border"><span class="text-xs theme-text-secondary font-medium">All-Time Total</span><span class="text-sm font-bold text-blue-600 dark:text-blue-400">${total} pts</span></div>`;
}

// ============================================
// HEADER SCORE BADGES
// Month total shown on month/year views; all-time always shown
// ============================================

function updateHeaderScores() {
    const container = document.getElementById('headerScores');
    if (!container) return;

    const allTime = calcAllTimeTotal();
    const dateStr = dateToLocalString(state.currentDate);
    const monthTotal = calcMonthTotal(dateStr);
    const monthName = state.currentDate.toLocaleDateString('en-US', { month: 'short' });
    const year = state.currentDate.getFullYear();

    const showMonthScore = state.currentView === 'month' || state.currentView === 'year';

    container.innerHTML = `
        ${showMonthScore ? `
        <div class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg theme-bg-tertiary border theme-border text-sm">
            <span class="text-[11px] theme-text-secondary font-medium">${state.currentView === 'year' ? year : monthName}</span>
            <span class="font-bold text-blue-600 dark:text-blue-400">${state.currentView === 'year' ? calcYearTotal() : monthTotal} pts</span>
        </div>` : ''}
        <div class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg theme-bg-tertiary border theme-border text-sm" title="All-time score">
            <svg class="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
            <span class="text-[11px] theme-text-secondary font-medium">All-time</span>
            <span class="font-bold text-blue-600 dark:text-blue-400">${allTime} pts</span>
        </div>
    `;
}

function calcYearTotal() {
    const year = state.currentDate.getFullYear();
    let total = 0;
    for (let m = 0; m < 12; m++) {
        const days = new Date(year, m + 1, 0).getDate();
        for (let d = 1; d <= days; d++) {
            const key = `${year}-${String(m + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
            const entry = state.journalEntries[key];
            if (entry?.score) total += entry.score;
        }
    }
    // Add all todo points for this year (day+week+month+year cascade)
    total += getTodoYearPoints(year);
    return total;
}

function showJournalEditor() {
    state.sidebarView = 'journal';
    renderSidebarContent();
}

function showScoreEditor() {
    state.sidebarView = 'score';
    renderSidebarContent();
    setTimeout(() => {
        const input = document.getElementById('scoreExpression');
        if (input) {
            input.addEventListener('input', updateScorePreview);
            updateScorePreview();
        }
    }, 0);
}

// ============================================
// SCORE EXPRESSION EVALUATOR
// FIX: Sanitizes expression — only allows numbers, basic operators, parens.
// Prevents arbitrary code execution.
// ============================================

function evaluateScoreExpression(expression) {
    let expr = expression.trim();
    // Replace variable names with their numeric values
    for (const [key, value] of Object.entries(state.variables)) {
        const regex = new RegExp(`\\b${key}\\b`, 'g');
        expr = expr.replace(regex, String(value));
    }
    // Whitelist: only digits, decimal point, +, -, *, /, (, ), spaces, %
    if (!/^[\d\s\+\-\*\/\(\)\.\%]+$/.test(expr)) {
        throw new Error('Expression contains invalid characters. Only numbers and operators (+, -, *, /, %, parentheses) are allowed.');
    }
    // Safety: no consecutive operators that could be sneaky
    const result = Function('"use strict"; return (' + expr + ')')();
    if (typeof result !== 'number' || !isFinite(result)) throw new Error('Expression did not produce a valid number.');
    return result;
}

function updateScorePreview() {
    const input = document.getElementById('scoreExpression');
    const preview = document.getElementById('scorePreview');
    if (!input || !preview) return;
    if (!input.value.trim()) {
        preview.innerHTML = '<span class="text-3xl font-bold text-blue-600 dark:text-blue-400">--</span><span class="text-sm theme-text-secondary">pts</span>';
        return;
    }
    try {
        const result = evaluateScoreExpression(input.value);
        preview.innerHTML = `<span class="text-3xl font-bold text-blue-600 dark:text-blue-400">${result}</span><span class="text-sm theme-text-secondary">pts</span>`;
    } catch {
        preview.innerHTML = '<span class="text-sm text-red-500">Invalid expression</span>';
    }
}

function saveJournalEntry() {
    const dateStr = state.currentDaySidebar;
    if (!dateStr) return;
    const title = document.getElementById('journalTitle')?.value?.trim() || '';
    const content = document.getElementById('journalContent')?.value?.trim() || '';
    if (!title && !content) { alert('Please enter a title or content'); return; }
    if (!state.journalEntries[dateStr]) state.journalEntries[dateStr] = {};
    state.journalEntries[dateStr].title = title;
    state.journalEntries[dateStr].content = content;
    state.journalEntries[dateStr].timestamp = Date.now();
    saveJournal();
    state.sidebarView = null;
    renderSidebarContent();
    updateHeatMapIndicators();
    updateHeaderScores();
}

function saveScoreEntry() {
    const dateStr = state.currentDaySidebar;
    if (!dateStr) return;
    const expression = document.getElementById('scoreExpression')?.value?.trim();
    if (!expression) { alert('Please enter a score expression'); return; }
    let score;
    try {
        score = evaluateScoreExpression(expression);
    } catch (err) {
        alert('Invalid expression: ' + err.message); return;
    }
    if (!state.journalEntries[dateStr]) state.journalEntries[dateStr] = {};
    state.journalEntries[dateStr].expression = expression;
    state.journalEntries[dateStr].score = score;
    state.journalEntries[dateStr].timestamp = Date.now();
    saveJournal();
    state.sidebarView = null;
    renderSidebarContent();
    updateHeatMapIndicators();
    updateHeaderScores();
}

// FIX: Event ID is now passed as a number from the template, strict equality works correctly
function toggleEventComplete(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    event.completed = !event.completed;
    saveEvents();
    if (state.currentDaySidebar) renderSidebarContent();
}

// ============================================
// VIEW MANAGEMENT
// ============================================

function renderCurrentView() {
    if (state.currentView === 'day')   renderDayView();
    if (state.currentView === 'week')  renderWeekView();
    if (state.currentView === 'month') renderMonthView();
    if (state.currentView === 'year')  renderYearView();
    updateHeaderScores();
}

function switchView(view) {
    state.currentView = view;
    ['day','week','month','year'].forEach(v => {
        const btn = document.getElementById(`view-${v}`);
        if (!btn) return;
        if (v === view) { btn.classList.remove('theme-text-secondary'); btn.classList.add('theme-bg', 'shadow-sm'); }
        else            { btn.classList.add('theme-text-secondary'); btn.classList.remove('theme-bg', 'shadow-sm'); }
    });

    document.getElementById('dayView')?.classList.toggle('hidden', view !== 'day');
    document.getElementById('weekView')?.classList.toggle('hidden', view !== 'week');
    document.getElementById('monthView')?.classList.toggle('hidden', view !== 'month');
    document.getElementById('yearView')?.classList.toggle('hidden', view !== 'year');

    // FIX: daySidebar is inside dayView, so it hides naturally when dayView hides
    if (view !== 'day') {
        state.currentDaySidebar = null;
        state.sidebarView = null;
    }
    renderCurrentView();
}

function updateHeatMapIndicators() {
    if (state.currentView === 'month') renderMonthView();
    if (state.currentView === 'week') renderWeekView();
    renderMiniCalendar();
}

function getDayScoreColor(score) {
    if (!score) return '';
    if (score < 30) return 'bg-red-100 dark:bg-red-900/20';
    if (score < 70) return 'bg-yellow-100 dark:bg-yellow-900/20';
    if (score < 120) return 'bg-green-100 dark:bg-green-900/20';
    return 'bg-emerald-200 dark:bg-emerald-800/40';
}

function getDayIndicator(dateStr) {
    const journal = state.journalEntries[dateStr];
    if (!journal) return '<span class="w-2 h-2 rounded-full bg-red-400 inline-block"></span>';
    if (journal.score) return `<span class="text-[10px] font-bold text-blue-600 dark:text-blue-400 leading-none">${journal.score}pts</span>`;
    return '<span class="w-2 h-2 rounded-full bg-green-400 inline-block"></span>';
}

// ============================================
// NAVIGATION
// FIX: navigatePrev/navigateNext are view-aware
// Day view: ±1 day | Week view: ±7 days | Month view: ±1 month | Year view: ±1 year
// ============================================

function navigatePrev() {
    switch (state.currentView) {
        case 'day':
            state.currentDate.setDate(state.currentDate.getDate() - 1);
            if (state.currentDaySidebar) {
                state.currentDaySidebar = dateToLocalString(state.currentDate);
            }
            break;
        case 'week':
            state.currentDate.setDate(state.currentDate.getDate() - 7);
            break;
        case 'month': {
            const m = state.currentDate.getMonth();
            const y = state.currentDate.getFullYear();
            state.currentDate = new Date(m === 0 ? y - 1 : y, m === 0 ? 11 : m - 1, 1);
            break;
        }
        case 'year':
            state.currentDate.setFullYear(state.currentDate.getFullYear() - 1);
            break;
    }
    renderCurrentView();
    renderMiniCalendar();
    applyBackground();
}

function navigateNext() {
    switch (state.currentView) {
        case 'day':
            state.currentDate.setDate(state.currentDate.getDate() + 1);
            if (state.currentDaySidebar) {
                state.currentDaySidebar = dateToLocalString(state.currentDate);
            }
            break;
        case 'week':
            state.currentDate.setDate(state.currentDate.getDate() + 7);
            break;
        case 'month': {
            const m = state.currentDate.getMonth();
            const y = state.currentDate.getFullYear();
            state.currentDate = new Date(m === 11 ? y + 1 : y, m === 11 ? 0 : m + 1, 1);
            break;
        }
        case 'year':
            state.currentDate.setFullYear(state.currentDate.getFullYear() + 1);
            break;
    }
    renderCurrentView();
    renderMiniCalendar();
    applyBackground();
}

// Mini calendar still uses these for its own prev/next arrows (month-only)
function changeMonth(delta) {
    const m = state.currentDate.getMonth();
    const y = state.currentDate.getFullYear();
    let newMonth = m + delta;
    let newYear = y;
    while (newMonth > 11) { newMonth -= 12; newYear++; }
    while (newMonth < 0)  { newMonth += 12; newYear--; }
    state.currentDate = new Date(newYear, newMonth, 1);
    renderMiniCalendar();
    if (state.currentView === 'month') renderMonthView();
    if (state.currentView === 'year') renderYearView();
    applyBackground();
}

function goToToday() {
    state.currentDate = new Date();
    state.selectedDate = new Date();
    renderCurrentView();
    renderMiniCalendar();
    applyBackground();
}

function openMonthPicker() { switchView('month'); }

function openMonthYearPicker() {
    const choice = prompt('Select option:\n1. Go to Date\n2. Today\n3. Month View\n4. Year View');
    if (choice === '1' || choice === 'Go to Date') {
        const date = prompt('Enter date (YYYY-MM-DD):');
        if (date) { state.currentDate = new Date(date + 'T12:00:00'); renderCurrentView(); renderMiniCalendar(); }
    } else if (choice === '2' || choice === 'Today') {
        goToToday();
    } else if (choice === '3' || choice === 'Month View') {
        switchView('month');
    } else if (choice === '4' || choice === 'Year View') {
        switchView('year');
    }
}

// ============================================
// BACKGROUND SETTINGS
// ============================================

function openBackgroundSettings() {
    const modal = document.getElementById('backgroundModal');
    if (modal) { modal.classList.remove('hidden'); modal.classList.add('flex'); }
    if (state.backgroundImage) {
        document.getElementById('bgControls')?.classList.remove('hidden');
        const bgPreview = document.getElementById('bgPreview');
        if (bgPreview) { bgPreview.classList.remove('hidden'); bgPreview.style.backgroundImage = `url(${state.backgroundImage})`; }
    }
}

function closeBackgroundSettings() {
    const modal = document.getElementById('backgroundModal');
    if (modal) { modal.classList.add('hidden'); modal.classList.remove('flex'); }
}

function handleBackgroundUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
        alert(`Image too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Maximum size is 5MB.\n\nNote: Large images are stored in browser storage and can fill it quickly. Use images under 1MB for best results.`);
        return;
    }
    if (!file.type.startsWith('image/')) { alert('Please select a valid image file (PNG, JPG, GIF)'); return; }

    const estimatedStorageMB = (file.size * 1.37 / 1024 / 1024).toFixed(1);
    if (file.size > 2 * 1024 * 1024) {
        if (!confirm(`This image will use about ${estimatedStorageMB}MB of browser storage, which may cause issues if storage is nearly full.\n\nContinue anyway?`)) return;
    }

    const reader = new FileReader();
    reader.onerror = () => alert('Error reading file. Please try another image.');
    reader.onload = (e) => {
        state.backgroundImage = e.target.result;
        state.backgroundOpacity = 0.5;
        document.getElementById('bgControls')?.classList.remove('hidden');
        const bgPreview = document.getElementById('bgPreview');
        if (bgPreview) { bgPreview.classList.remove('hidden'); bgPreview.style.backgroundImage = `url(${state.backgroundImage})`; }
        const opacitySlider = document.querySelector('.opacity-slider');
        const opacityValue = document.getElementById('opacityValue');
        if (opacitySlider) opacitySlider.value = 50;
        if (opacityValue) opacityValue.textContent = '50%';
        const saved = saveBackground();
        if (saved !== false) applyBackground();
    };
    reader.readAsDataURL(file);
}

function updateBackgroundOpacity(value) {
    state.backgroundOpacity = value / 100;
    const opacityValue = document.getElementById('opacityValue');
    if (opacityValue) opacityValue.textContent = `${value}%`;
    saveBackground(); applyBackground();
}

function setBackgroundScope(scope) {
    state.backgroundScope = scope;
    ['month','year','all'].forEach(s => {
        const btn = document.getElementById(`scope-${s}`);
        if (!btn) return;
        if (s === scope) { btn.classList.add('bg-blue-500','text-white','border-blue-500'); btn.classList.remove('theme-border'); }
        else             { btn.classList.remove('bg-blue-500','text-white','border-blue-500'); btn.classList.add('theme-border'); }
    });
    saveBackground(); applyBackground();
}

function applyBackground() {
    const bgLayer = document.getElementById('backgroundLayer');
    if (!bgLayer) return;
    bgLayer.style.position = 'fixed';
    bgLayer.style.top = '0'; bgLayer.style.left = '0';
    bgLayer.style.right = '0'; bgLayer.style.bottom = '0';
    bgLayer.style.zIndex = '0'; bgLayer.style.pointerEvents = 'none';
    bgLayer.style.backgroundSize = 'cover'; bgLayer.style.backgroundPosition = 'center';
    bgLayer.style.backgroundRepeat = 'no-repeat'; bgLayer.style.transition = 'opacity 0.3s ease';

    if (!state.backgroundImage) { bgLayer.style.backgroundImage = ''; bgLayer.style.opacity = '0'; bgLayer.classList.remove('active'); return; }
    if (checkBackgroundScope()) {
        bgLayer.style.backgroundImage = `url(${state.backgroundImage})`;
        bgLayer.style.opacity = state.backgroundOpacity.toString();
        bgLayer.classList.add('active');
    } else {
        bgLayer.style.opacity = '0'; bgLayer.classList.remove('active');
    }
}

function checkBackgroundScope() {
    if (state.backgroundScope === 'all') return true;
    const now = new Date();
    if (state.backgroundScope === 'month') return now.getMonth() === state.currentDate.getMonth() && now.getFullYear() === state.currentDate.getFullYear();
    if (state.backgroundScope === 'year') return now.getFullYear() === state.currentDate.getFullYear();
    return true;
}

function removeBackground() {
    state.backgroundImage = null; state.backgroundOpacity = 0.5; state.backgroundScope = 'month';
    document.getElementById('bgControls')?.classList.add('hidden');
    const bgPreview = document.getElementById('bgPreview');
    if (bgPreview) bgPreview.classList.add('hidden');
    const bgLayer = document.getElementById('backgroundLayer');
    if (bgLayer) { bgLayer.classList.remove('active'); bgLayer.style.opacity = '0'; }
    const bgImageInput = document.getElementById('bgImageInput');
    if (bgImageInput) bgImageInput.value = '';
    const opacitySlider = document.querySelector('.opacity-slider');
    if (opacitySlider) opacitySlider.value = 50;
    const opacityValue = document.getElementById('opacityValue');
    if (opacityValue) opacityValue.textContent = '50%';
    removeFromStorage(STORAGE_KEYS.BACKGROUND(state.currentUser));
}

// ============================================
// USER MENU & SETTINGS
// ============================================

function openUserMenu() {
    const menu = document.getElementById('userMenu');
    if (!menu) return;
    document.getElementById('settingsMenu')?.classList.add('hidden');
    if (menu.classList.contains('hidden')) {
        const userList = document.getElementById('userList');
        if (userList) {
            userList.innerHTML = '';
            state.users.forEach(user => {
                const isActive = user === state.currentUser;
                const item = document.createElement('button');
                item.className = `w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-sm transition-colors ${isActive ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'hover:theme-bg-tertiary'}`;
                item.onclick = () => switchUser(user);
                item.innerHTML = `
                    <div class="w-6 h-6 rounded-full bg-gradient-to-br ${isActive ? 'from-blue-400 to-blue-600' : 'from-gray-400 to-gray-600'} flex items-center justify-center text-white text-xs font-bold">${user.substring(0, 2).toUpperCase()}</div>
                    <span class="flex-1">${user}</span>
                    ${isActive ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' : ''}
                `;
                userList.appendChild(item);
            });
        }
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
}

function closeUserMenu() {
    document.getElementById('userMenu')?.classList.add('hidden');
}

function openSettings() {
    const menu = document.getElementById('settingsMenu');
    if (!menu) { createSettingsMenu(); return; }
    document.getElementById('userMenu')?.classList.add('hidden');
    menu.classList.toggle('hidden');
}

function createSettingsMenu() {
    const menu = document.createElement('div');
    menu.id = 'settingsMenu';
    menu.className = 'hidden absolute bottom-full left-0 right-0 mb-2 theme-bg rounded-xl shadow-2xl border theme-border overflow-hidden z-50';
    menu.innerHTML = `
        <div class="p-2 space-y-1">
            <button onclick="openThemePicker()" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                <span>Appearance & Themes</span>
            </button>
            <div class="border-t theme-border my-1"></div>
            <button onclick="openVariableSettings()" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm text-blue-600 dark:text-blue-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path></svg>
                <span>Journal Variables</span>
            </button>
            <button onclick="openLocationSettings()" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>Location Settings</span>
            </button>
            <div class="border-t theme-border my-1"></div>
            <button onclick="exportData()" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                <span>Export Data</span>
            </button>
            <button onclick="importData()" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                <span>Import Data</span>
            </button>
            <button onclick="clearAllData()" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm text-red-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                <span>Clear All Data</span>
            </button>
        </div>
    `;
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn?.parentNode) settingsBtn.parentNode.appendChild(menu);
    menu.classList.remove('hidden');
}

// ============================================
// VARIABLE SETTINGS
// FIX: parseFloat so decimal values like 1.5 are kept
// ============================================

function openVariableSettings() {
    closeSettings();
    let modal = document.getElementById('variableSettingsModal');
    if (modal) modal.remove();
    modal = document.createElement('div');
    modal.id = 'variableSettingsModal';
    modal.className = 'fixed inset-0 modal-backdrop flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="theme-bg rounded-2xl shadow-2xl w-full max-w-md modal-animate overflow-hidden border theme-border">
            <div class="px-6 py-4 border-b theme-border flex items-center justify-between">
                <h3 class="text-lg font-semibold">Journal Variables</h3>
                <button onclick="closeVariableSettings()" class="theme-text-secondary hover:theme-text transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div class="p-6 space-y-4">
                <p class="text-sm theme-text-secondary">Create variables to speed up score calculation. Use them in expressions like <code>work*2 + gym</code></p>
                <div class="flex space-x-2">
                    <input type="text" id="newVarName" placeholder="Variable name (e.g., work)" class="flex-1 theme-bg-tertiary border theme-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 theme-text">
                    <input type="number" id="newVarValue" placeholder="Value" step="any" class="w-24 theme-bg-tertiary border theme-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 theme-text">
                    <button onclick="addVariable()" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">Add</button>
                </div>
                <div id="variableListContainer" class="space-y-2 max-h-60 overflow-y-auto"></div>
                <div class="flex justify-end pt-4 border-t theme-border">
                    <button onclick="closeVariableSettings()" class="px-4 py-2 text-sm font-medium theme-text-secondary hover:theme-bg-tertiary rounded-lg transition-colors">Done</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    renderVariableList();
    modal.addEventListener('click', (e) => { if (e.target === modal) closeVariableSettings(); });
}

function closeVariableSettings() {
    document.getElementById('variableSettingsModal')?.remove();
}

function renderVariableList() {
    const container = document.getElementById('variableListContainer');
    if (!container) return;
    container.innerHTML = '';
    if (Object.keys(state.variables).length === 0) {
        container.innerHTML = '<p class="text-sm theme-text-secondary text-center py-4">No variables yet. Add one above!</p>';
        return;
    }
    Object.entries(state.variables).forEach(([name, value]) => {
        const div = document.createElement('div');
        div.className = 'flex items-center justify-between p-3 theme-bg-tertiary rounded-lg';
        div.innerHTML = `
            <div class="flex items-center space-x-3">
                <code class="text-sm font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">${name}</code>
                <span class="text-sm theme-text">= ${value}</span>
            </div>
            <button onclick="deleteVariable('${name}')" class="text-red-500 hover:text-red-600 p-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
        `;
        container.appendChild(div);
    });
}

function addVariable() {
    const nameInput = document.getElementById('newVarName');
    const valueInput = document.getElementById('newVarValue');
    const name = nameInput?.value?.trim().toLowerCase();
    // FIX: parseFloat instead of parseInt so decimals like 1.5 are preserved
    const value = parseFloat(valueInput?.value);
    if (!name || isNaN(value)) { alert('Please enter both name and numeric value'); return; }
    if (!/^[a-z_][a-z0-9_]*$/.test(name)) {
        alert('Variable name must start with a letter and contain only letters, numbers, and underscores'); return;
    }
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

function closeSettings() {
    document.getElementById('settingsMenu')?.classList.add('hidden');
}

function openSearch() {
    const query = prompt('Search events:');
    if (!query) return;
    const results = events.filter(e =>
        e.title.toLowerCase().includes(query.toLowerCase()) ||
        (e.location && e.location.toLowerCase().includes(query.toLowerCase())) ||
        (e.description && e.description.toLowerCase().includes(query.toLowerCase()))
    );
    if (results.length === 0) {
        alert(`No events found for "${query}"`);
    } else {
        const resultList = results.map(e => `• ${e.title} (${e.date}${e.isAllDay ? '' : ' ' + e.startTime})`).join('\n');
        alert(`Found ${results.length} event(s):\n\n${resultList}`);
    }
}

// ============================================
// EXPORT / IMPORT / CLEAR
// ============================================

function exportData() {
    saveDataFileNow();
}

function importData() {
    loadDataFile(true);
}

function clearAllData() {
    if (!confirm(`WARNING: This will delete ALL data for account "${state.currentUser}". This cannot be undone!`)) return;
    if (prompt(`Type "${state.currentUser}" to confirm deletion:`) !== state.currentUser) return;
    removeFromStorage(STORAGE_KEYS.EVENTS(state.currentUser));
    removeFromStorage(STORAGE_KEYS.THEME(state.currentUser));
    removeFromStorage(STORAGE_KEYS.BACKGROUND(state.currentUser));
    removeFromStorage(STORAGE_KEYS.CALENDARS(state.currentUser));
    removeFromStorage(STORAGE_KEYS.LOCATION(state.currentUser));
    removeFromStorage(STORAGE_KEYS.PRAYER_TIMES_CACHE(state.currentUser));
    removeFromStorage(STORAGE_KEYS.JOURNAL(state.currentUser));
    removeFromStorage(STORAGE_KEYS.VARIABLES(state.currentUser));
    events = []; state.calendars = [...DEFAULT_CALENDARS];
    state.activeCalendars = DEFAULT_CALENDARS.map(c => c.id);
    state.backgroundImage = null; state.userLocation = null;
    state.prayerTimesCache = {}; state.journalEntries = {}; state.variables = {};
    state.todos = {};
    // Also wipe DB keys for this user
    Object.keys(DB).forEach(k => { if (k.includes(state.currentUser)) delete DB[k]; });
    removeBackground(); applyTheme('default', 'light');
    renderCurrentView(); renderMiniCalendar(); renderCalendarList();
    alert('All data cleared for this account.');
}

// ============================================
// UTILITIES
// ============================================

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

// ============================================
// KEYBOARD SHORTCUTS
// FIX: Arrow keys now use navigatePrev/Next (view-aware)
// ============================================

function handleKeyboardShortcuts(e) {
    if (e.key === 'Escape') {
        closeModal(); closeCalendarEditModal(); closeBackgroundSettings();
        closeUserMenu(); closeSettings(); closeLocationSettings();
        closeThemePicker(); closeVariableSettings();
        closeDeleteSeriesSheet();
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
        const modalOpen = document.getElementById('eventModal')?.classList.contains('flex')
            || document.getElementById('deleteSeriesSheet');
        if (!typing && !modalOpen) {
            e.preventDefault();
            e.key === 'ArrowLeft' ? navigatePrev() : navigateNext();
        }
    }
}

// ============================================
// INITIALIZATION
// FIX: Prayer/repeat listeners set up ONCE here, not on every modal open
// FIX: Global resize handlers set up once via initResizeHandlers()
// ============================================

function setupEventListeners() {
    // Modal backdrop close
    document.getElementById('eventModal').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal(); });
    document.getElementById('calendarEditModal').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeCalendarEditModal(); });
    document.getElementById('backgroundModal').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeBackgroundSettings(); });

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
        if (userMenu && !userMenu.contains(e.target) && !userBtn?.contains(e.target)) userMenu.classList.add('hidden');
        if (settingsMenu && !settingsMenu.contains(e.target) && !settingsBtn?.contains(e.target)) settingsMenu.classList.add('hidden');
    });

    // FIX: Prayer time listeners — set up ONCE, no longer called inside openModal
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

    const prayerSelect = document.getElementById('prayerTimeSelect');
    if (prayerSelect) {
        prayerSelect.addEventListener('change', (e) => {
            state.selectedPrayer = e.target.value;
            updatePrayerTimeDisplay();
        });
    }

    const startOffset = document.getElementById('prayerStartOffset');
    const endOffset = document.getElementById('prayerEndOffset');
    if (startOffset) { startOffset.addEventListener('change', updatePrayerTimeDisplay); startOffset.addEventListener('input', updatePrayerTimeDisplay); }
    if (endOffset)   { endOffset.addEventListener('change', updatePrayerTimeDisplay);   endOffset.addEventListener('input', updatePrayerTimeDisplay); }

    // FIX: Repeat listeners — set up ONCE
    const repeatSelect = document.getElementById('eventRepeat');
    if (repeatSelect) {
        repeatSelect.addEventListener('change', () => {
            const customOptions = document.getElementById('customRepeatOptions');
            const monthlyOverflowRow = document.getElementById('monthlyOverflowRow');
            if (customOptions) customOptions.classList.toggle('hidden', repeatSelect.value !== 'custom');
            if (monthlyOverflowRow) monthlyOverflowRow.classList.toggle('hidden', repeatSelect.value !== 'monthly');
        });
    }

    const repeatUnit = document.getElementById('repeatUnit');
    if (repeatUnit) {
        repeatUnit.addEventListener('change', () => {
            const repeatOnDays = document.getElementById('repeatOnDays');
            const monthOverflowRow = document.getElementById('monthOverflowRow');
            if (repeatOnDays) repeatOnDays.classList.toggle('hidden', repeatUnit.value !== 'weeks');
            if (monthOverflowRow) monthOverflowRow.classList.toggle('hidden', repeatUnit.value !== 'months');
        });
    }

    const repeatEndType = document.getElementById('repeatEndType');
    if (repeatEndType) {
        repeatEndType.addEventListener('change', (e) => {
            document.getElementById('repeatCount')?.classList.toggle('hidden', e.target.value !== 'after');
            document.getElementById('repeatEndDate')?.classList.toggle('hidden', e.target.value !== 'on');
        });
    }

    // FIX: Repeat day buttons — set up ONCE
    document.querySelectorAll('.repeat-day-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('bg-blue-500');
            btn.classList.toggle('text-white');
            btn.classList.toggle('border-blue-500');
        });
    });

    // All-day toggle
    document.getElementById('allDayToggle')?.addEventListener('click', toggleAllDay);

    // FIX: Single global resize handler — no listener leak
    initResizeHandlers();
}

document.addEventListener('DOMContentLoaded', async () => {
    // Show data-load screen before rendering anything
    _showDataLoadScreen();
});

function _showDataLoadScreen() {
    const overlay = document.createElement('div');
    overlay.id = 'dataLoadOverlay';
    // Use hardcoded colours — CSS variables aren't loaded yet
    overlay.style.cssText = [
        'position:fixed;inset:0;z-index:9999',
        'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px',
        'background:#111;color:#f1f1f1;font-family:system-ui,sans-serif;padding:24px;text-align:center'
    ].join(';');

    const hasFileAPI = typeof window.showOpenFilePicker === 'function';
    overlay.innerHTML = `
        <div style="font-size:2.8rem;line-height:1">📅</div>
        <div style="font-size:1.4rem;font-weight:700;letter-spacing:-0.5px">Calendar</div>
        <div style="font-size:0.85rem;color:#aaa;max-width:280px;line-height:1.5">
            Your data lives in a file on your device.<br>Nothing is ever sent to a server.
        </div>
        <button id="loadFileBtn"
            style="padding:13px 32px;background:#2563eb;color:#fff;border:none;border-radius:14px;font-size:1rem;font-weight:600;cursor:pointer;width:240px;margin-top:4px">
            📂 Load my data file
        </button>
        <button id="startFreshBtn"
            style="padding:10px 24px;background:transparent;border:1px solid #444;border-radius:10px;font-size:0.875rem;cursor:pointer;color:#aaa;width:240px">
            Start fresh
        </button>
        <div style="font-size:0.7rem;color:#555;margin-top:8px">
            ${hasFileAPI ? '✓ Auto-save supported on this browser' : '⚠ This browser will prompt a download on each save'}
        </div>`;
    document.body.appendChild(overlay);

    document.getElementById('loadFileBtn').onclick = async () => {
        const loaded = await loadDataFile(true);
        if (loaded) { overlay.remove(); _finishInit(); }
    };
    document.getElementById('startFreshBtn').onclick = () => {
        overlay.remove();
        _finishInit();
    };
}

async function _finishInit() {
    loadUsers();
    loadAllData();
    await initLocation();
    renderWeekView();
    renderMiniCalendar();
    updateTimeIndicator();
    setInterval(updateTimeIndicator, 60000);
    setupEventListeners();
    updateHeaderScores();
    if (state.showPrayerTimesInView) {
        const btn = document.getElementById('prayerViewToggleBtn');
        if (btn) {
            btn.classList.add('bg-blue-50', 'dark:bg-blue-900/20', 'border-blue-500');
            const label = btn.querySelector('span');
            if (label) label.textContent = 'Hide Prayer Times';
        }
    }
}
