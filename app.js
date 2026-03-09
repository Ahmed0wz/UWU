
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
    TASKS: (user) => `calendar_tasks_${user}`,
    FORGOTTEN: (user) => `calendar_forgotten_${user}`,
    RENDER_WINDOW: (user) => `calendar_render_window_${user}`,
    PFP: (user) => `calendar_pfp_${user}`,
    MONTHLY_BG: (user) => `calendar_monthly_bg_${user}`,
    CALENDAR_MODE: (user) => `calendar_mode_${user}`,
    HIJRI_OFFSETS: (user) => `calendar_hijri_offsets_${user}`,
    LANGUAGE: 'calendar_language'
};

// ═══════════════════════════════════════════
//  INTERNATIONALISATION  (English / Arabic)
// ═══════════════════════════════════════════
const TRANSLATIONS = {
  en: {
    monthNames:      ['January','February','March','April','May','June','July','August','September','October','November','December'],
    monthNamesShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    dayNamesLong:    ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    dayNamesShort:   ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    dayLetters:      ['S','M','T','W','T','F','S'],
    newEvent:        'New Event',
    addCalendar:     'Add Calendar',
    myCalendars:     'My Calendars',
    accountSettings: 'Account & Settings',
    today:           'Today',
    openJournal:     'Open Journal',
    hideJournal:     'Hide Journal',
    journal:         'Journal',
    score:           'Score',
    tasks:           'Tasks',
    day:             'Day',
    week:            'Week',
    threeDays:       '3 Days',
    month:           'Month',
    year:            'Year',
    allTime:         'All-time',
    prayerTimes:     'Prayer Times',
    hidePrayerTimes: 'Hide Prayer Times',
    saveJournal:     'Save Journal',
    saveScore:       'Save Score',
    save:            'Save',
    cancel:          'Cancel',
    delete:          'Delete',
    newTaskPlaceholder: 'New task…',
    allDay:          'All day',
    doesNotRepeat:   'Does not repeat',
    daily:           'Daily',
    weekly:          'Weekly',
    monthly:         'Monthly',
    yearly:          'Yearly',
    weekdays:        'Every weekday (Mon–Fri)',
    custom:          'Custom...',
    add:             'Add',
    profilePicture:  'Profile Picture',
    appearance:      'Appearance & Themes',
    journalVars:     'Journal Variables',
    locationSettings:'Location Settings',
    backgroundImage: 'Background Image',
    renderWindow:    'Event Render Window',
    viewAllTasks:    'View All Tasks',
    forgottenTasks:  'Forgotten Tasks',
    exportJson:      'Export Data (JSON)',
    exportIcs:       'Export to Calendar (.ics)',
    importData:      'Import Data',
    clearData:       'Clear All Data',
    accounts:        'Accounts',
    settings:        'Settings',
    toHijri:         'Switch to Hijri Calendar',
    toGregorian:     'Switch to Gregorian',
    pts:             'pts',
    writePlaceholder:'Write about your day…',
    titlePlaceholder:'Title (optional)',
    addTitle:        'Add title',
    pointsPlaceholder:'Points (optional)',
    addDescription:  'Add description',
    timeTo:          'to',
    edit:            'Edit',
    close:           'Close',
    contd:           "cont’d",
    usePrayerTimes:  'Use Prayer Times',
    prayerTime:      'Prayer Time',
    startOffset:     'Start Offset (minutes)',
    endOffset:       'End Offset (minutes)',
    switchToArabic:  'العربية',
    switchToEnglish: 'English',
    newCalendar:     'New Calendar',
    editCalendar:    'Edit Calendar',
    editEvent:       'Edit Event',
    deleteCalendar:  'Delete Calendar',
    jumuah:          "Jumu'ah",
    adjusted:        'Adjusted',
    sighting:        'Sighting',
    moonSighting:    'Moon Sighting',
    addAccount:      'Add Account',
    deleteAccount:   'Delete Account',
    upload:          'Upload',
    remove:          'Remove',
    search:          'Search events…',
    variables:       'Variables',
    noneSet:         'none set',
    expression:      'Expression',
    never:           'Never',
    after:           'After',
    onDate:          'On date',
    occurrences:     'occurrences',
    days:            'days',
    weeks:           'weeks',
    months:          'months',
    years:           'years',
    ends:            'Ends',
    every:           'Every',
    repeatOn:        'Repeat on:',
    whenShort:       'When month is too short:',
    lastDay:         'Use last day of month',
    skipMonth:       'Skip that month',
    currentAccount:  'current',
    onlyAccount:     'only account',
    errEmptyName:    'Please enter an account name.',
    errNameExists:   'An account with this name already exists.',
    errInvalidChars: 'Use only letters, numbers, hyphens, and underscores.',
    hijriYearSuffix: 'AH',
    Fajr: 'Fajr', Sunrise: 'Sunrise', Dhuhr: 'Dhuhr',
    Asr: 'Asr', Maghrib: 'Maghrib', Isha: 'Isha',
    hijriMonths: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    hijriMonthNames: ['Muharram','Safar',"Rabi' al-awwal","Rabi' al-thani","Jumada al-awwal","Jumada al-thani",'Rajab',"Sha'ban",'Ramadan','Shawwal',"Dhu al-Qi'dah",'Dhu al-Hijjah'],
  },
  ar: {
    monthNames:      ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],
    monthNamesShort: ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],
    dayNamesLong:    ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'],
    dayNamesShort:   ['أحد','اثنين','ثلاثاء','أربعاء','خميس','جمعة','سبت'],
    dayLetters:      ['ح','ن','ث','ر','خ','ج','س'],
    newEvent:        'حدث جديد',
    addCalendar:     'إضافة تقويم',
    myCalendars:     'تقاويمي',
    accountSettings: 'الحساب والإعدادات',
    today:           'اليوم',
    openJournal:     'فتح اليومية',
    hideJournal:     'إخفاء اليومية',
    journal:         'اليومية',
    score:           'النقاط',
    tasks:           'المهام',
    day:             'يوم',
    week:            'أسبوع',
    threeDays:       '٣ أيام',
    month:           'شهر',
    year:            'سنة',
    allTime:         'الكل',
    prayerTimes:     'أوقات الصلاة',
    hidePrayerTimes: 'إخفاء أوقات الصلاة',
    saveJournal:     'حفظ اليومية',
    saveScore:       'حفظ النقاط',
    save:            'حفظ',
    cancel:          'إلغاء',
    delete:          'حذف',
    newTaskPlaceholder: 'مهمة جديدة…',
    allDay:          'طوال اليوم',
    doesNotRepeat:   'لا تتكرر',
    daily:           'يومياً',
    weekly:          'أسبوعياً',
    monthly:         'شهرياً',
    yearly:          'سنوياً',
    weekdays:        'كل يوم عمل',
    custom:          'مخصص...',
    add:             'إضافة',
    profilePicture:  'الصورة الشخصية',
    appearance:      'المظهر والثيمات',
    journalVars:     'متغيرات اليومية',
    locationSettings:'إعدادات الموقع',
    backgroundImage: 'صورة الخلفية',
    renderWindow:    'نافذة عرض الأحداث',
    viewAllTasks:    'عرض جميع المهام',
    forgottenTasks:  'المهام المنسية',
    exportJson:      'تصدير البيانات (JSON)',
    exportIcs:       'تصدير للتقويم (.ics)',
    importData:      'استيراد البيانات',
    clearData:       'مسح جميع البيانات',
    accounts:        'الحسابات',
    settings:        'الإعدادات',
    toHijri:         'التحويل للتقويم الهجري',
    toGregorian:     'التحويل للتقويم الميلادي',
    pts:             'نقطة',
    writePlaceholder:'اكتب عن يومك…',
    titlePlaceholder:'العنوان (اختياري)',
    addTitle:        'أضف عنواناً',
    pointsPlaceholder:'النقاط (اختياري)',
    addDescription:  'أضف وصفاً',
    timeTo:          'إلى',
    edit:            'تعديل',
    close:           'إغلاق',
    contd:           'تابع',
    usePrayerTimes:  'استخدام أوقات الصلاة',
    prayerTime:      'وقت الصلاة',
    startOffset:     'إزاحة البداية (دقائق)',
    endOffset:       'إزاحة النهاية (دقائق)',
    switchToArabic:  'العربية',
    switchToEnglish: 'English',
    newCalendar:     'تقويم جديد',
    editCalendar:    'تعديل التقويم',
    editEvent:       'تعديل الحدث',
    deleteCalendar:  'حذف التقويم',
    jumuah:          'الجمعة',
    adjusted:        'معدّل',
    sighting:        'رؤية الهلال',
    moonSighting:    'رؤية الهلال',
    addAccount:      'إضافة حساب',
    deleteAccount:   'حذف حساب',
    upload:          'رفع',
    remove:          'إزالة',
    search:          'ابحث عن أحداث…',
    variables:       'المتغيرات',
    noneSet:         'لا يوجد',
    expression:      'التعبير',
    never:           'أبداً',
    after:           'بعد',
    onDate:          'في تاريخ',
    occurrences:     'مرات',
    days:            'أيام',
    weeks:           'أسابيع',
    months:          'أشهر',
    years:           'سنوات',
    ends:            'تنتهي',
    every:           'كل',
    repeatOn:        'تكرار في:',
    whenShort:       'عند قِصَر الشهر:',
    lastDay:         'استخدم آخر يوم',
    skipMonth:       'تخطَّ الشهر',
    currentAccount:  'الحالي',
    onlyAccount:     'حساب وحيد',
    errEmptyName:    'يرجى إدخال اسم الحساب.',
    errNameExists:   'يوجد حساب بهذا الاسم بالفعل.',
    errInvalidChars: 'استخدم حروفاً وأرقاماً وشرطات فقط.',
    hijriYearSuffix: 'هـ',
    Fajr: 'الفجر', Sunrise: 'الشروق', Dhuhr: 'الظهر',
    Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء',
    hijriMonthNames: ['محرم','صفر','ربيع الأول','ربيع الآخر','جمادى الأولى','جمادى الآخرة','رجب','شعبان','رمضان','شوال','ذو القعدة','ذو الحجة'],
    monthNamesShort: ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],
  }
};

function tHijri(hm) {
    // hm is 1-based Hijri month index
    const names = (TRANSLATIONS[state.language] || TRANSLATIONS.en).hijriMonthNames;
    return names ? names[hm - 1] : (TRANSLATIONS.en.hijriMonthNames[hm - 1]);
}

function t(key) {
    return (TRANSLATIONS[state.language] || TRANSLATIONS.en)[key] || key;
}

function saveLanguage() { localStorage.setItem(STORAGE_KEYS.LANGUAGE, state.language); }
function loadLanguage() { state.language = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'en'; }

function toggleLanguage() {
    state.language = state.language === 'en' ? 'ar' : 'en';
    saveLanguage();
    applyLanguage();
    closeAccountSettings();
}

function applyLanguage() {
    const isAr = state.language === 'ar';
    const html = document.documentElement;
    html.setAttribute('lang', isAr ? 'ar' : 'en');
    // We do NOT set dir=rtl on html — that would flip flex layouts.
    // Instead we use a body class and apply RTL only to text content.
    if (isAr) {
        document.body.classList.add('lang-ar');
        document.body.classList.remove('lang-en');
    } else {
        document.body.classList.remove('lang-ar');
        document.body.classList.add('lang-en');
    }

    // Load Arabic font once
    const fontId = 'arabic-font-link';
    if (isAr && !document.getElementById(fontId)) {
        const link = document.createElement('link');
        link.id = fontId;
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap';
        document.head.appendChild(link);
    }

    // Close any open dynamically-created modals so they re-render with correct language
    // NOTE: renderWindowModal and forgottenTasksModal are static HTML — only hide them, don't remove!
    ['locationModal','themePickerModal','variableSettingsModal','accountSettingsPanel',
     'viewAllTasksModal','hijriSightingPanel']
        .forEach(id => document.getElementById(id)?.remove());
    hideEl('renderWindowModal');
    hideEl('forgottenTasksModal');

    // Patch static HTML elements via data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = t(key);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = val;
        } else {
            el.textContent = val;
        }
    });

    // Re-render everything
    renderCurrentView();
    renderMiniCalendar();
    renderCalendarList();
}


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
    { id: 'reminders', name: 'Reminders', color: 'orange' }
];

// Prayer Names
const PRAYER_NAMES = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

// APPEARANCE THEMES (Discord-style presets)
// Each theme is a set of CSS variable overrides applied to :root / .dark
const THEME_NAMES_AR = {
    'default':      { name: '\u0627\u0641\u062a\u0631\u0627\u0636\u064a',      description: '\u0623\u0628\u064a\u0636 \u0646\u0638\u064a\u0641 \u0648\u062f\u0627\u0643\u0646' },
    'discord':      { name: '\u062f\u064a\u0633\u0643\u0648\u0631\u062f',      description: '\u0631\u0645\u0627\u062f\u064a-\u0623\u0632\u0631\u0642 \u062f\u0627\u0643\u0646' },
    'midnight':     { name: '\u0645\u0646\u062a\u0635\u0641 \u0627\u0644\u0644\u064a\u0644',  description: '\u0632\u0631\u0642\u0629 \u062f\u0627\u0643\u0646\u0629 \u0639\u0645\u064a\u0642\u0629' },
    'forest':       { name: '\u0627\u0644\u063a\u0627\u0628\u0629',       description: '\u0623\u0644\u0648\u0627\u0646 \u062e\u0636\u0631\u0627\u0621 \u0637\u0628\u064a\u0639\u064a\u0629' },
    'sunset':       { name: '\u0627\u0644\u063a\u0631\u0648\u0628',       description: '\u0628\u0631\u062a\u0642\u0627\u0644\u064a \u0648\u0628\u0646\u0641\u0633\u062c\u064a \u062f\u0627\u0641\u0626' },
    'rose':         { name: '\u0627\u0644\u0648\u0631\u062f',        description: '\u0648\u0631\u062f\u064a \u0646\u0627\u0639\u0645' },
    'slate':        { name: '\u0627\u0644\u0635\u062e\u0631',        description: '\u0631\u0645\u0627\u062f\u064a \u0628\u0627\u0631\u062f' },
    'crimson_moon': { name: '\u0627\u0644\u0642\u0645\u0631 \u0627\u0644\u0642\u0631\u0645\u0632\u064a', description: '\u0623\u062d\u0645\u0631 \u063a\u0627\u0645\u0642 \u0648\u0628\u0646\u0641\u0633\u062c\u064a \u062f\u0627\u0643\u0646' },
    'chroma_glow':  { name: '\u0648\u0647\u062c \u0627\u0644\u0623\u0644\u0648\u0627\u0646',  description: '\u062a\u062f\u0631\u062c \u0646\u064a\u0648\u0646 \u0643\u0647\u0631\u0628\u0627\u0626\u064a' },
    'sakura':       { name: '\u0632\u0647\u0631 \u0627\u0644\u0643\u0631\u0632',    description: '\u0648\u0631\u062f\u064a \u0632\u0647\u0631\u064a \u0646\u0627\u0639\u0645' },
    'aurora':       { name: '\u0627\u0644\u0623\u0648\u0631\u0648\u0631\u0627',     description: '\u0623\u062e\u0636\u0631 \u0648\u0632\u0645\u0631\u062f\u064a \u0634\u0645\u0627\u0644\u064a' },
    'golden_hour':  { name: '\u0627\u0644\u0633\u0627\u0639\u0629 \u0627\u0644\u0630\u0647\u0628\u064a\u0629', description: '\u0639\u0646\u0628\u0631 \u0648\u0630\u0647\u0628 \u0648\u0628\u0646\u064a \u0639\u0645\u064a\u0642' },
};

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
    },
    {
        id: 'crimson_moon',
        name: 'Crimson Moon',
        description: 'Deep red & dark purple',
        gradient: true,
        preview: ['#1a0a1e', '#3d0c1a', '#ff2d55'],
        light: {
            '--bg-primary':   '#1a0a1e',
            '--bg-secondary': '#26102a',
            '--bg-tertiary':  '#32153a',
            '--text-primary': '#fce4ec',
            '--text-secondary': '#f48fb1',
            '--border-color': '#4a1040',
            '--accent':       '#ff2d55',
            '--bg-panel':           'rgba(26,10,30,0.92)',
            '--bg-panel-secondary': 'rgba(38,16,42,0.92)',
            '--sidebar-gradient':   'linear-gradient(160deg,#1a0a1e 0%,#2d0a2a 50%,#3d0c1a 100%)',
            '--header-gradient':    'linear-gradient(90deg,#1a0a1e 0%,#2d0c28 100%)',
            '--accent-gradient':    'linear-gradient(90deg,#ff2d55,#bf0a5e)',
        },
        dark: {
            '--bg-primary':   '#0f0612',
            '--bg-secondary': '#1a0a1e',
            '--bg-tertiary':  '#26102a',
            '--text-primary': '#fce4ec',
            '--text-secondary': '#f48fb1',
            '--border-color': '#3d0c30',
            '--accent':       '#ff2d55',
            '--bg-panel':           'rgba(15,6,18,0.92)',
            '--bg-panel-secondary': 'rgba(26,10,30,0.92)',
            '--sidebar-gradient':   'linear-gradient(160deg,#0f0612 0%,#1e082a 50%,#2d0a1e 100%)',
            '--header-gradient':    'linear-gradient(90deg,#0f0612 0%,#1e0a1e 100%)',
            '--accent-gradient':    'linear-gradient(90deg,#ff2d55,#ff6b9d)',
        }
    },
    {
        id: 'chroma_glow',
        name: 'Chroma Glow',
        description: 'Electric neon gradient',
        gradient: true,
        preview: ['#0a0a1a', '#1a0a3a', '#00d4ff'],
        light: {
            '--bg-primary':   '#0a0a1a',
            '--bg-secondary': '#0f0f28',
            '--bg-tertiary':  '#161635',
            '--text-primary': '#e0f7ff',
            '--text-secondary': '#7dd3fc',
            '--border-color': '#1e2048',
            '--accent':       '#00d4ff',
            '--bg-panel':           'rgba(10,10,26,0.92)',
            '--bg-panel-secondary': 'rgba(15,15,40,0.92)',
            '--sidebar-gradient':   'linear-gradient(160deg,#0a0a1a 0%,#0d0a2e 40%,#1a0a3a 100%)',
            '--header-gradient':    'linear-gradient(90deg,#0a0a1a 0%,#100a2e 100%)',
            '--accent-gradient':    'linear-gradient(90deg,#00d4ff,#a855f7,#ff2d55)',
        },
        dark: {
            '--bg-primary':   '#06060f',
            '--bg-secondary': '#0a0a1a',
            '--bg-tertiary':  '#0f0f28',
            '--text-primary': '#e0f7ff',
            '--text-secondary': '#7dd3fc',
            '--border-color': '#151535',
            '--accent':       '#00d4ff',
            '--bg-panel':           'rgba(6,6,15,0.92)',
            '--bg-panel-secondary': 'rgba(10,10,26,0.92)',
            '--sidebar-gradient':   'linear-gradient(160deg,#06060f 0%,#0a0620 40%,#10062e 100%)',
            '--header-gradient':    'linear-gradient(90deg,#06060f 0%,#0a0820 100%)',
            '--accent-gradient':    'linear-gradient(90deg,#00d4ff,#a855f7,#ff2d55)',
        }
    },
    {
        id: 'sakura',
        name: 'Sakura',
        description: 'Soft cherry blossom pinks',
        gradient: true,
        preview: ['#1a0a14', '#2d1020', '#ff8fab'],
        light: {
            '--bg-primary':   '#fff0f5',
            '--bg-secondary': '#ffe4ef',
            '--bg-tertiary':  '#ffd6e8',
            '--text-primary': '#2d0a1e',
            '--text-secondary': '#9d4067',
            '--border-color': '#fbb6ce',
            '--accent':       '#e91e8c',
            '--bg-panel':           'rgba(255,240,245,0.93)',
            '--bg-panel-secondary': 'rgba(255,228,239,0.93)',
            '--sidebar-gradient':   'linear-gradient(160deg,#fff0f5 0%,#ffe0ee 60%,#ffd0e8 100%)',
            '--header-gradient':    'linear-gradient(90deg,#fff0f5 0%,#ffe8f2 100%)',
            '--accent-gradient':    'linear-gradient(90deg,#e91e8c,#f06292)',
        },
        dark: {
            '--bg-primary':   '#1a0a14',
            '--bg-secondary': '#240e1c',
            '--bg-tertiary':  '#2e1226',
            '--text-primary': '#fce4ec',
            '--text-secondary': '#f48fb1',
            '--border-color': '#4a1436',
            '--accent':       '#ff8fab',
            '--bg-panel':           'rgba(26,10,20,0.92)',
            '--bg-panel-secondary': 'rgba(36,14,28,0.92)',
            '--sidebar-gradient':   'linear-gradient(160deg,#1a0a14 0%,#220c1a 50%,#2d1020 100%)',
            '--header-gradient':    'linear-gradient(90deg,#1a0a14 0%,#220e18 100%)',
            '--accent-gradient':    'linear-gradient(90deg,#ff8fab,#f48fb1)',
        }
    },
    {
        id: 'aurora',
        name: 'Aurora',
        description: 'Northern lights greens & teals',
        gradient: true,
        preview: ['#061a12', '#0a2a1e', '#00e5a0'],
        light: {
            '--bg-primary':   '#f0faf5',
            '--bg-secondary': '#e0f5ec',
            '--bg-tertiary':  '#c8eedd',
            '--text-primary': '#062012',
            '--text-secondary': '#2e7d55',
            '--border-color': '#a8d8be',
            '--accent':       '#00897b',
            '--bg-panel':           'rgba(240,250,245,0.93)',
            '--bg-panel-secondary': 'rgba(224,245,236,0.93)',
            '--sidebar-gradient':   'linear-gradient(160deg,#f0faf5 0%,#e0f7ee 60%,#c8f0de 100%)',
            '--header-gradient':    'linear-gradient(90deg,#f0faf5 0%,#dff5ea 100%)',
            '--accent-gradient':    'linear-gradient(90deg,#00897b,#26c6da)',
        },
        dark: {
            '--bg-primary':   '#061a12',
            '--bg-secondary': '#0a2a1e',
            '--bg-tertiary':  '#0e3a28',
            '--text-primary': '#ccf2e0',
            '--text-secondary': '#52c792',
            '--border-color': '#144a28',
            '--accent':       '#00e5a0',
            '--bg-panel':           'rgba(6,26,18,0.92)',
            '--bg-panel-secondary': 'rgba(10,42,30,0.92)',
            '--sidebar-gradient':   'linear-gradient(160deg,#061a12 0%,#082a18 50%,#0a3020 100%)',
            '--header-gradient':    'linear-gradient(90deg,#061a12 0%,#082018 100%)',
            '--accent-gradient':    'linear-gradient(90deg,#00e5a0,#00bcd4)',
        }
    },
    {
        id: 'golden_hour',
        name: 'Golden Hour',
        description: 'Warm amber, gold & deep brown',
        gradient: true,
        preview: ['#1a1000', '#2e1a00', '#ffa000'],
        light: {
            '--bg-primary':   '#fffbf0',
            '--bg-secondary': '#fff3d6',
            '--bg-tertiary':  '#ffe8b0',
            '--text-primary': '#1a1000',
            '--text-secondary': '#8a6000',
            '--border-color': '#f5d060',
            '--accent':       '#f59e0b',
            '--bg-panel':           'rgba(255,251,240,0.93)',
            '--bg-panel-secondary': 'rgba(255,243,214,0.93)',
            '--sidebar-gradient':   'linear-gradient(160deg,#fffbf0 0%,#fff3d0 60%,#ffe8a8 100%)',
            '--header-gradient':    'linear-gradient(90deg,#fffbf0 0%,#fff0c8 100%)',
            '--accent-gradient':    'linear-gradient(90deg,#f59e0b,#ef4444)',
        },
        dark: {
            '--bg-primary':   '#1a1000',
            '--bg-secondary': '#261800',
            '--bg-tertiary':  '#332000',
            '--text-primary': '#fef3c7',
            '--text-secondary': '#fbbf24',
            '--border-color': '#3d2800',
            '--accent':       '#ffa000',
            '--bg-panel':           'rgba(26,16,0,0.92)',
            '--bg-panel-secondary': 'rgba(38,24,0,0.92)',
            '--sidebar-gradient':   'linear-gradient(160deg,#1a1000 0%,#221400 50%,#2e1a00 100%)',
            '--header-gradient':    'linear-gradient(90deg,#1a1000 0%,#221600 100%)',
            '--accent-gradient':    'linear-gradient(90deg,#ffa000,#ff6f00)',
        }
    }
];

// State Management
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
                <div class="flex flex-col items-end">
                    <span class="text-[10px] theme-text-secondary">${gregLabel}</span>
                    ${dayOffset !== 0 ? '<span class="text-[9px] text-amber-500">🌙</span>' : ''}
                </div>
            </div>
            ${isFriday ? `<div class="text-[9px] text-green-500 font-semibold mb-1">${t('jumuah')}</div>` : ''}
            <div class="space-y-0.5">${evHtml}</div>
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

function saveJournal() { saveToStorage(STORAGE_KEYS.JOURNAL(state.currentUser), state.journalEntries); }
function loadJournal() { state.journalEntries = loadFromStorage(STORAGE_KEYS.JOURNAL(state.currentUser)) || {}; }
function saveVariables() { saveToStorage(STORAGE_KEYS.VARIABLES(state.currentUser), state.variables); }
function loadVariables() { state.variables = loadFromStorage(STORAGE_KEYS.VARIABLES(state.currentUser)) || {}; }

// TASKS — storage, keys, point calculators

function saveTasks() { saveToStorage(STORAGE_KEYS.TASKS(state.currentUser), state.tasks); }
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

// Day total = journal score + day task points
function calcDayTotal(dateStr) {
    const j = state.journalEntries[dateStr];
    return (j?.score || 0) + calcDayTaskPts(dateStr);
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
    state.currentUser = username;
    saveToStorage(STORAGE_KEYS.CURRENT_USER, username);
    loadAllData();
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

// DATA PERSISTENCE

function saveEvents() { saveToStorage(STORAGE_KEYS.EVENTS(state.currentUser), events); }
function loadEvents() {
    const saved = loadFromStorage(STORAGE_KEYS.EVENTS(state.currentUser)) || [];
    const hadInstances = saved.some(e => e.parentId);
    events = saved.filter(e => !e.parentId);
    if (!saved.length || hadInstances) saveEvents();
}

function saveTheme() { saveToStorage(STORAGE_KEYS.THEME(state.currentUser), { isDarkMode: state.isDarkMode, currentTheme: state.currentTheme }); }
function loadTheme() {
    const saved = loadFromStorage(STORAGE_KEYS.THEME(state.currentUser));
    if (saved) {
        state.isDarkMode = saved.isDarkMode || false;
        state.currentTheme = saved.currentTheme || 'default';
        applyTheme(state.currentTheme, state.isDarkMode ? 'dark' : 'light');
    } else { checkSystemTheme(); }
}

function applyTheme(themeId, mode) {
    const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
    // Gradient themes are dark-only — use dark vars regardless of mode toggle
    const effectiveMode = theme.gradient ? 'dark' : mode;
    const vars = effectiveMode === 'dark' ? theme.dark : theme.light;
    const root = document.documentElement;

    // Reset all vars from previous theme (including gradient vars)
    const gradientVars = ['--sidebar-gradient','--header-gradient','--accent-gradient','--accent-2'];
    const defaults = THEMES[0];
    const defaultVars = effectiveMode === 'dark' ? defaults.dark : defaults.light;
    [...Object.keys(defaultVars), ...gradientVars].forEach(k => root.style.removeProperty(k));

    // Apply theme vars
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));

    // Apply dark class
    if (effectiveMode === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');

    // Toggle gradient-theme class for any gradient-specific CSS
    root.classList.toggle('gradient-theme', !!theme.gradient);

    state.isDarkMode   = effectiveMode === 'dark';
    state.currentTheme = themeId;
    updateThemeToggleUI();
}

function updateThemeToggleUI() {
    const dot = $('themeToggleDot'), text = $('themeText'), icon = $('themeIcon');
    const dark = state.isDarkMode;
    if (dot)  dot.style.transform = dark ? 'translateX(16px)' : 'translateX(0)';
    if (text) text.textContent = dark ? 'Light Mode' : 'Dark Mode';
    if (icon) icon.innerHTML = dark
        ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>'
        : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>';
}

function setTheme(mode) { applyTheme(state.currentTheme || 'default', mode); saveTheme(); }

function saveBackground() {
    if (state.backgroundImage) {
        const sizeEstimate = Math.ceil(state.backgroundImage.length * 3 / 4 / 1024);
        if (sizeEstimate > 3000) console.warn(`Background image is large (~${sizeEstimate}KB). This may cause localStorage issues.`);
    }
    return saveToStorage(STORAGE_KEYS.BACKGROUND(state.currentUser), {
        image: state.backgroundImage,
        opacity: state.backgroundOpacity,
        scope: state.backgroundScope
    });
}

function saveAsMonthlyBackground() {
    if (!state.backgroundImage) return;
    const monthKey = dateToLocalString(state.currentDate).substring(0, 7);
    state.monthlyBackgrounds[monthKey] = {
        image: state.backgroundImage,
        opacity: state.backgroundOpacity
    };
    saveMonthlyBg();
    applyBackground();
}

function removeMonthlyBackground() {
    const monthKey = dateToLocalString(state.currentDate).substring(0, 7);
    delete state.monthlyBackgrounds[monthKey];
    saveMonthlyBg();
    applyBackground();
    updateMonthlyBgUI();
}

function updateMonthlyBgUI() {
    const monthKey = dateToLocalString(state.currentDate).substring(0, 7);
    const hasMontly = !!state.monthlyBackgrounds[monthKey];
    const monthlyBtn = document.getElementById('saveMonthlyBgBtn');
    const removeMonthlyBtn = document.getElementById('removeMonthlyBgBtn');
    if (monthlyBtn) monthlyBtn.classList.toggle('hidden', hasMontly);
    if (removeMonthlyBtn) removeMonthlyBtn.classList.toggle('hidden', !hasMontly);
    // Show current month label
    const label = document.getElementById('monthlyBgLabel');
    if (label) {
        const [y, m] = monthKey.split('-');
        label.textContent = t('monthNamesShort')[parseInt(m)-1] + ' ' + y;
    }
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
    state.calendars = (saved?.length > 0) ? saved : [...DEFAULT_CALENDARS];
    if (!saved?.length) saveCalendars();
    state.activeCalendars = loadFromStorage(STORAGE_KEYS.CALENDARS(state.currentUser) + '_active')
        || state.calendars.map(c => c.id);
    renderCalendarList();
}

// THEME MANAGEMENT

function openThemePicker() {
    closeSettings();
    let modal = document.getElementById('themePickerModal');
    if (modal) modal.remove();
    modal = document.createElement('div');
    modal.id = 'themePickerModal';
    modal.className = 'fixed inset-0 modal-backdrop flex items-center justify-center z-50';

    function buildThemeBtn(t) {
        const isActive = t.id === state.currentTheme;
        const [c1, c2, c3] = t.preview;
        const borderCls = isActive ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700';
        let preview = '';
        if (t.gradient) {
            preview = '<div class="w-full h-10 rounded-md mb-2" style="background:linear-gradient(135deg,' + c1 + ',' + c2 + ',' + c3 + ')"></div>';
        } else {
            preview = '<div class="flex space-x-1 mb-2">'
                    + '<div class="w-8 h-8 rounded-md" style="background:' + c1 + '"></div>'
                    + '<div class="w-8 h-8 rounded-md" style="background:' + c2 + '"></div>'
                    + '<div class="w-8 h-8 rounded-md" style="background:' + c3 + '"></div>'
                    + '</div>';
        }
        const gradientBadge = t.gradient ? `<span class="text-[9px] uppercase tracking-wider font-bold text-purple-400 mt-0.5 block">${state.language==='ar' ? 'متدرج' : 'Gradient'}</span>` : '';
        const activeDot = isActive ? '<div class="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"><svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></div>' : '';
        const arT = THEME_NAMES_AR[t.id];
        const displayName = (state.language === 'ar' && arT) ? arT.name : t.name;
        const displayDesc = (state.language === 'ar' && arT) ? arT.description : t.description;
        return "<button onclick='selectTheme(\"" + t.id + "\")' id='theme-btn-" + t.id + "' class='relative p-3 rounded-xl border-2 text-left transition-all hover:scale-105 " + borderCls + "'>"
             + preview
             + '<div class="font-semibold text-sm">' + displayName + '</div>'
             + '<div class="text-xs theme-text-secondary mt-0.5">' + displayDesc + '</div>'
             + gradientBadge
             + activeDot
             + '</button>';
    }

    const standardThemes = THEMES.filter(function(t) { return !t.gradient; });
    const gradientThemes  = THEMES.filter(function(t) { return !!t.gradient; });

    const sectionHeader = `<div class="col-span-2 sm:col-span-3 text-xs font-semibold theme-text-secondary uppercase tracking-wider mt-1 mb-1">${state.language==='ar' ? '\u062b\u064a\u0645\u0627\u062a \u0642\u064a\u0627\u0633\u064a\u0629' : 'Standard'}</div>`;
    const gradHeader    = `<div class="col-span-2 sm:col-span-3 text-xs font-semibold theme-text-secondary uppercase tracking-wider mt-3 mb-1 border-t theme-border pt-3">${state.language==='ar' ? '\u062b\u064a\u0645\u0627\u062a \u0645\u062a\u062f\u0631\u062c\u0629' : 'Gradient Themes'}</div>`;

    const grid = sectionHeader + standardThemes.map(buildThemeBtn).join('') + gradHeader + gradientThemes.map(buildThemeBtn).join('');

    modal.innerHTML = `
        <div class="theme-bg rounded-2xl shadow-2xl w-full max-w-xl modal-animate border theme-border flex flex-col" style="max-height:90vh">
            <div class="px-6 py-4 border-b theme-border flex items-center justify-between shrink-0">
                <div>
                    <h3 class="text-lg font-semibold">${t('appearance')}</h3>
                    <p class="text-xs theme-text-secondary mt-0.5">${state.language==='ar' ? 'اختر ثيماً لتقويمك' : 'Choose a theme for your calendar'}</p>
                </div>
                <button onclick="closeThemePicker()" class="theme-text-secondary hover:theme-text transition-colors p-1">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div class="p-6 overflow-y-auto flex-1">
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6" id="themeGrid">${grid}</div>
            </div>
            <div class="px-6 py-4 border-t theme-border flex items-center justify-between shrink-0">
                <div class="flex items-center space-x-3">
                    <span class="text-sm font-medium">${state.language==='ar' ? 'الوضع' : 'Mode'}</span>
                    <button onclick="toggleTheme()" class="flex items-center space-x-2 px-3 py-1.5 rounded-lg border theme-border hover:theme-bg-tertiary transition-colors">
                        <div class="w-8 h-4 bg-gray-200 dark:bg-gray-700 rounded-full relative">
                            <div id="themeToggleDot" class="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${state.isDarkMode ? 'translate-x-4' : 'translate-x-0'}"></div>
                        </div>
                        <span class="text-sm" id="themeText">${state.isDarkMode ? (state.language==='ar' ? 'الوضع الفاتح' : 'Light Mode') : (state.language==='ar' ? 'الوضع الداكن' : 'Dark Mode')}</span>
                    </button>
                </div>
                <button onclick="closeThemePicker()" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">${state.language==='ar' ? 'تم' : 'Done'}</button>
            </div>
        </div>`;

    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) closeThemePicker(); });
}

function selectTheme(themeId) {
    const mode = state.isDarkMode ? 'dark' : 'light';
    applyTheme(themeId, mode);
    saveTheme();
    renderCurrentView();
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
    $('themePickerModal')?.remove();
}

function checkSystemTheme() {
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) applyTheme('default', 'dark');
}

function toggleTheme() {
    const theme = THEMES.find(t => t.id === (state.currentTheme || 'default'));
    if (theme?.gradient && state.isDarkMode) {
        const toast = document.createElement('div');
        toast.className = 'fixed top-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-full shadow-xl z-[400] flex items-center gap-2.5 pointer-events-none';
        toast.innerHTML = '<svg class="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg><span>' + (state.language==='ar' ? 'الثيمات المتدرجة للوضع الداكن فقط. يرجى التبديل لثيم عادي أولاً.' : 'Gradient themes are dark-only. Switch to a standard theme first.') + '</span>';
        document.body.appendChild(toast);
        setTimeout(() => { toast.style.transition='opacity 0.3s'; toast.style.opacity='0'; setTimeout(()=>toast.remove(),300); }, 2500);
        return;
    }
    applyTheme(state.currentTheme || 'default', state.isDarkMode ? 'light' : 'dark');
    saveTheme();
}

// CALENDAR MANAGEMENT

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
    const modal = document.getElementById('addCalendarModal');
    if (!modal) return;
    const input = document.getElementById('newCalendarName');
    if (input) input.value = '';

    // Build color picker
    const picker = document.getElementById('newCalendarColorPicker');
    if (picker) {
        picker.innerHTML = '';
        const defaultColor = CALENDAR_COLORS[Math.floor(Math.random() * CALENDAR_COLORS.length)].id;
        CALENDAR_COLORS.forEach(color => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `w-8 h-8 rounded-full ${color.bg} transition-transform hover:scale-110 ${color.id === defaultColor ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600' : ''}`;
            btn.title = color.name;
            btn.dataset.colorId = color.id;
            btn.onclick = () => {
                picker.querySelectorAll('button').forEach(b => b.classList.remove('ring-2', 'ring-offset-2', 'ring-gray-400', 'dark:ring-gray-600'));
                btn.classList.add('ring-2', 'ring-offset-2', 'ring-gray-400', 'dark:ring-gray-600');
            };
            picker.appendChild(btn);
        });
    }

    showEl('addCalendarModal');
    setTimeout(() => input?.focus(), 50);
    modal.addEventListener('click', e => { if (e.target === modal) closeAddCalendarModal(); }, { once: true });
}

function closeAddCalendarModal() { hideEl('addCalendarModal'); }

function confirmAddCalendar() {
    const nameInput = document.getElementById('newCalendarName');
    const name = nameInput?.value?.trim();
    if (!name) { nameInput?.focus(); return; }

    const selectedBtn = document.querySelector('#newCalendarColorPicker button.ring-2');
    const colorId = selectedBtn ? selectedBtn.dataset.colorId : CALENDAR_COLORS[0].id;
    const id = 'cal_' + Date.now();
    const newCalendar = { id, name, color: colorId };
    state.calendars.push(newCalendar);
    state.activeCalendars.push(id);
    saveCalendars();
    saveToStorage(STORAGE_KEYS.CALENDARS(state.currentUser) + '_active', state.activeCalendars);
    renderCalendarList();
    renderCurrentView();
    closeAddCalendarModal();
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
    showEl('calendarEditModal');
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
    const defaultIds = ['personal', 'work', 'reminders'];
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
    hideEl('calendarEditModal');
    state.editingCalendarId = null;
}

// EVENT MODAL & FORM

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

        if (modalTitle) modalTitle.textContent = t('newEvent');
        if (eventForm) eventForm.reset();
        if (eventDateInput) { eventDateInput.value = eventDate; updateModalHijriLabel(eventDate); }
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

function updatePrayerTimeDisplay() {
    if (!state.prayerTimesForDate || !state.usePrayerTimes) return;
    // Update Dhuhr label to Jumu'ah on Fridays
    const dateInput = document.getElementById('eventDate');
    if (dateInput && dateInput.value) {
        const dow = new Date(dateInput.value + 'T12:00:00').getDay();
        const prayerSelectEl = document.getElementById('prayerTimeSelect');
        if (prayerSelectEl) {
            const dhuhrOpt = prayerSelectEl.querySelector('option[value="Dhuhr"]');
            if (dhuhrOpt) dhuhrOpt.textContent = dow === 5 ? "Jumu'ah" : "Dhuhr";
        }
    }
    const prayerSelect = document.getElementById('prayerTimeSelect');
    const startOffset = document.getElementById('prayerStartOffset');
    const endOffset = document.getElementById('prayerEndOffset');
    const startTimeDisplay = document.getElementById('prayerStartTimeDisplay');
    const endTimeDisplay = document.getElementById('prayerEndTimeDisplay');
    const prayer = prayerSelect ? prayerSelect.value : state.selectedPrayer;
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
                nextDate = addMonthsSafe(baseDate, occurrenceIndex, snap);
                if (!nextDate) { occurrenceIndex++; continue; }
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
                        case 'months': nextDate = addMonthsSafe(baseDate, interval * occurrenceIndex, snap); if (!nextDate) { occurrenceIndex++; continue; } break;
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
    const { prayer, startOffset, endOffset } = ev.prayerConfig;
    const cacheKeys = Object.keys(state.prayerTimesCache);
    // Prefer exact date key, then fall back to any key starting with dateStr
    const exactKey = cacheKeys.find(k => k.startsWith(dateStr + '_'));
    const fallbackKey = exactKey || cacheKeys.find(k => k.startsWith(dateStr.substring(0, 7)));
    const timings = fallbackKey ? state.prayerTimesCache[fallbackKey] : null;
    if (timings && timings[prayer]) {
        const base = getPrayerTimeInMinutes(timings[prayer]);
        if (base !== null) {
            return { ...ev, startTime: minutesToTimeString(base + (startOffset || 0)), endTime: minutesToTimeString(base + (endOffset || 0)) };
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
        <div class="absolute top-1 right-1 opacity-75" title="Based on ${event.prayerConfig.prayer}">
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
            ? date.getDate() + ' ' + ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][date.getMonth()]
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
            ? date.getDate() + ' ' + ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][date.getMonth()]
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
            <div class="flex justify-between items-start mb-1">
                <span class="font-semibold ${isToday ? 'text-blue-600 dark:text-blue-400' : ''}">${day}</span>
                <div class="flex flex-col items-end gap-0.5">
                    <span class="text-[10px] theme-text-secondary">${hijri.day} ${tHijri(islamicMonths.indexOf(hijri.month)+1).substring(0,4)}</span>
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
    const timedDayEvts = dayEvents.filter(e => !e.isAllDay);
    const dayEvtLayout = computeEventLayout(timedDayEvts);
    timedDayEvts.forEach(event => container.appendChild(createEventElement(event, dayEvtLayout.get(event.id))));
    if (state.showPrayerTimesInView) renderPrayerTimesInColumn(container, dateStr);
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
        <div class="shrink-0 px-4 py-3 border-t theme-border theme-bg-panel grid grid-cols-3 gap-2 text-center" style="${state.sidebarView === 'journal' || state.sidebarView === 'score' ? 'display:none' : ''}">
            <div>
                <div class="text-xs theme-text-secondary">${t('today')}</div>
                <div class="font-bold text-blue-600 dark:text-blue-400">${calcDayTotal(dateStr)}</div>
            </div>
            <div>
                <div class="text-xs theme-text-secondary">${t('week')}</div>
                <div class="font-bold">${getWeekTotal(dateStr)}</div>
            </div>
            <div>
                <div class="text-xs theme-text-secondary">${t('allTime')}</div>
                <div class="font-bold">${calcAllTimeTotal()}</div>
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

// HEADER SCORE BADGES
// Month total shown on month/year views; all-time always shown

function updateHeaderScores() {
    const container = document.getElementById('headerScores');
    if (!container) return;

    const allTime = calcAllTimeTotal();
    const dateStr = dateToLocalString(state.currentDate);
    const monthTotal = state.calendarMode === 'hijri' ? calcHijriMonthTotal(state.currentDate) : calcMonthTotal(dateStr);
    let monthName, year;
    if (state.calendarMode === 'hijri') {
        const h = toHijri(state.currentDate);
        const hm = islamicMonths.indexOf(h.month) + 1;
        monthName = tHijri(hm).substring(0, 5);
        year = h.year;
    } else {
        monthName = t('monthNamesShort')[state.currentDate.getMonth()];
        year = state.currentDate.getFullYear();
    }

    const showMonthScore = state.currentView === 'month' || state.currentView === 'year';

    container.innerHTML = `
        ${showMonthScore ? `
        <div class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg theme-bg-tertiary border theme-border text-sm">
            <span class="text-[11px] theme-text-secondary font-medium">${state.currentView === 'year' ? year : monthName}</span>
            <span class="font-bold text-blue-600 dark:text-blue-400">${state.currentView === 'year' ? calcYearTotal() : monthTotal} ${t('pts')}</span>
        </div>` : ''}
        <div class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg theme-bg-tertiary border theme-border text-sm" title="All-time score">
            <svg class="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
            <span class="text-[11px] theme-text-secondary font-medium">${t('allTime')}</span>
            <span class="font-bold text-blue-600 dark:text-blue-400">${allTime} ${t('pts')}</span>
        </div>
    `;
}

function calcYearTotal() {
    const year = state.currentDate.getFullYear();
    let total = 0;
    const seenWeeks = new Set();
    for (let m = 0; m < 12; m++) {
        const days = new Date(year, m + 1, 0).getDate();
        for (let d = 1; d <= days; d++) {
            const key = `${year}-${String(m + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
            total += calcDayTotal(key);
            const wk = getWeekKey(key);
            if (!seenWeeks.has(wk)) {
                seenWeeks.add(wk);
                const sun = new Date(wk + 'T12:00:00');
                if (sun.getFullYear() === year) total += calcWeekTaskPts(wk);
            }
        }
        total += calcMonthTaskPts(`${year}-${String(m + 1).padStart(2,'0')}`);
    }
    total += calcYearTaskPts(String(year));
    return total;
}

function showTasksTab() {
    state.sidebarView = 'tasks';
    renderSidebarContent();
}

function setTaskPeriod(period) {
    state.taskPeriod = period;
    renderSidebarContent();
}

function getTaskKey(dateStr) {
    const p = state.taskPeriod;
    return p === 'day' ? dateStr : p === 'week' ? getWeekKey(dateStr) : p === 'month' ? getMonthKey(dateStr) : getYearKey(dateStr);
}

function renderTaskList(dateStr) {
    const p = state.taskPeriod;
    const key = getTaskKey(dateStr);
    const list = state.tasks[p][key] || [];
    if (list.length === 0) {
        const noTaskLabels = {
            day:   state.language==='ar' ? 'لا مهام اليوم' : 'No tasks today',
            week:  state.language==='ar' ? 'لا مهام هذا الأسبوع' : 'No tasks this week',
            month: state.language==='ar' ? 'لا مهام هذا الشهر' : 'No tasks this month',
            year:  state.language==='ar' ? 'لا مهام هذا العام' : 'No tasks this year',
        };
        return `<p class="text-sm theme-text-secondary text-center py-6">${noTaskLabels[p]}</p>`;
    }
    const completedPts = list.filter(t => t.completed).reduce((s, t) => s + (t.points || 0), 0);
    const totalPts = list.reduce((s, t) => s + (t.points || 0), 0);
    return `
        <div class="flex items-center justify-between py-1 mb-1">
            <span class="text-xs theme-text-secondary">${list.filter(t=>t.completed).length}/${list.length} ${state.language==='ar' ? 'مكتمل' : 'done'}</span>
            <span class="text-xs font-semibold text-blue-600 dark:text-blue-400">${completedPts}/${totalPts} ${t('pts')}</span>
        </div>
        ${list.map((task, idx) => `
        <div class="rounded-xl ${task.completed ? 'theme-bg-tertiary opacity-60' : 'theme-bg-panel border theme-border'} transition-all overflow-hidden">
            <div class="flex items-center gap-2.5 px-2.5 py-2">
                <button onclick="toggleTask('${dateStr}', ${idx})"
                    class="shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                        ${task.completed ? 'bg-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-600'}">
                    ${task.completed ? '<svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>' : ''}
                </button>
                <span class="flex-1 text-sm ${task.completed ? 'line-through theme-text-secondary' : 'theme-text'}">${task.name}</span>
                ${task.points ? `<span class="text-xs font-semibold ${task.completed ? 'text-blue-400' : 'text-blue-600 dark:text-blue-400'} shrink-0">${task.points}${t('pts')}</span>` : ''}
                <button onclick="toggleTaskNotes('${dateStr}', ${idx})" title="Notes" class="shrink-0 p-0.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                    <svg class="w-3.5 h-3.5 ${task.notes ? 'text-blue-500' : 'text-gray-400'}" fill="${task.notes ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </button>
                <button onclick="forgetTask('${dateStr}', ${idx})" title="Mark as forgotten" class="shrink-0 p-0.5 rounded hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                    <svg class="w-3.5 h-3.5 text-gray-400 hover:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </button>
                <button onclick="deleteTask('${dateStr}', ${idx})" title="Delete task" class="shrink-0 p-0.5 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                    <svg class="w-3.5 h-3.5 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            </div>
            <div id="task-notes-${idx}" class="${task._notesOpen ? '' : 'hidden'} px-2.5 pb-2">
                <textarea rows="2" placeholder="Add a note…"
                    class="w-full text-xs theme-bg-tertiary border theme-border rounded-lg px-2 py-1.5 focus:ring-1 focus:ring-blue-500 theme-text resize-none"
                    onblur="saveTaskNote('${dateStr}', ${idx}, this.value)"
                    onkeydown="if(event.key==='Escape'){event.target.blur();}" placeholder="${state.language==='ar' ? 'أضف ملاحظة…' : 'Add a note…'}"
                    >${task.notes || ''}</textarea>
            </div>
        </div>`).join('')}
    `;
}

function toggleTaskNotes(dateStr, idx) {
    const p = state.taskPeriod;
    const key = getTaskKey(dateStr);
    const task = state.tasks[p][key]?.[idx];
    if (!task) return;
    task._notesOpen = !task._notesOpen;
    // Don't save _notesOpen to storage — just re-render
    renderSidebarContent();
    // Focus the textarea after render
    setTimeout(() => {
        const el = document.getElementById(`task-notes-${idx}`)?.querySelector('textarea');
        if (el && task._notesOpen) el.focus();
    }, 0);
}

function saveTaskNote(dateStr, idx, value) {
    const p = state.taskPeriod;
    const key = getTaskKey(dateStr);
    const task = state.tasks[p][key]?.[idx];
    if (!task) return;
    task.notes = value.trim() || undefined;
    saveTasks();
    // Update note icon color without full re-render
    const notesDiv = document.getElementById(`task-notes-${idx}`);
    if (notesDiv) {
        const btn = notesDiv.previousElementSibling?.querySelector('[title="Notes"] svg');
        if (btn) {
            btn.style.color = task.notes ? 'rgb(59,130,246)' : '';
            btn.setAttribute('fill', task.notes ? 'currentColor' : 'none');
        }
    }
}



function addTask() {
    const nameEl = $('newTaskName'), ptsEl = $('newTaskPoints');
    const name = nameEl?.value?.trim();
    if (!name) return;
    const key = getTaskKey(state.currentDaySidebar);
    const p = state.taskPeriod;
    (state.tasks[p][key] ||= []).push({ id: Date.now(), name, points: parseInt(ptsEl?.value) || 0, completed: false });
    saveTasks(); renderSidebarContent();
    setTimeout(() => $('newTaskName')?.focus(), 0);
}

function toggleTask(dateStr, idx) {
    const p = state.taskPeriod;
    const key = getTaskKey(dateStr);
    const task = state.tasks[p][key]?.[idx];
    if (!task) return;
    task.completed = !task.completed;
    saveTasks();
    renderSidebarContent();
}

function deleteTask(dateStr, idx) {
    const p = state.taskPeriod;
    const key = getTaskKey(dateStr);
    state.tasks[p][key]?.splice(idx, 1);
    saveTasks();
    renderSidebarContent();
}

function forgetTask(dateStr, idx) {
    const p = state.taskPeriod;
    const key = getTaskKey(dateStr);
    const task = state.tasks[p][key]?.[idx];
    if (!task) return;
    const periodLabels = { day: 'Day', week: 'Week', month: 'Month', year: 'Year' };
    state.forgottenTasks.unshift({
        id: Date.now(), name: task.name, points: task.points || 0,
        originalPeriod: p, originalKey: key, periodLabel: periodLabels[p], 
        forgottenAt: new Date().toISOString(), attributedDate: null, completed: false
    });
    state.tasks[p][key].splice(idx, 1);
    saveTasks(); saveForgottenTasks(); updateForgottenBadge(); renderSidebarContent();
}

function getRenderWindowLabel() {
    const rwLabels = state.language==='ar' ? RENDER_WINDOW_LABELS_AR : RENDER_WINDOW_LABELS_EN;
    const steps  = RENDER_WINDOW_STEPS;
    const d = state.renderWindowDays;
    if (d <= 7) return '1 week';
    if (d <= 14) return '2 weeks';
    if (d <= 31) return '1 month';
    if (d <= 92) return '3 months';
    if (d <= 183) return '6 months';
    return '1 year';
}

function openRenderWindowSettings() {
    showEl('renderWindowModal');
    const steps = [7, 14, 31, 92, 183, 365];
    const slider = document.getElementById('renderWindowSlider');
    if (slider) {
        const idx = steps.indexOf(state.renderWindowDays);
        slider.value = idx >= 0 ? idx : 2;
        onRenderWindowSlide(slider.value);
    }
}

function closeRenderWindowSettings() { hideEl('renderWindowModal'); }

function setRenderWindow(days) {
    state.renderWindowDays = days;
    saveRenderWindow();
    const lbl = document.getElementById('renderWindowLabel');
    if (lbl) lbl.textContent = getRenderWindowLabel();
    renderCurrentView();
    closeRenderWindowSettings();
}

const RENDER_WINDOW_STEPS = [7, 14, 31, 92, 183, 365];
const RENDER_WINDOW_LABELS_EN = ['1 Week', '2 Weeks', '1 Month', '3 Months', '6 Months', '1 Year'];
const RENDER_WINDOW_LABELS_AR = ['أسبوع', 'أسبوعان', 'شهر', '٣ أشهر', '٦ أشهر', 'سنة'];
const RENDER_WINDOW_DESCS_EN = [
    'Lightest — ideal for slow devices or phones.',
    'Light — good for most mobile use.',
    'Default — balanced performance for most devices.',
    'Comfortable — good for tablets and mid-range PCs.',
    'Heavier — recommended for laptops and desktops.',
    'Maximum — for powerful devices only.'
];
const RENDER_WINDOW_DESCS_AR = [
    'الأخف — مثالي للأجهزة البطيئة والهواتف.',
    'خفيف — مناسب لمعظم الهواتف.',
    'افتراضي — أداء متوازن لمعظم الأجهزة.',
    'مريح — مناسب للأجهزة اللوحية والحواسيب المتوسطة.',
    'ثقيل — موصى به للحواسيب المحمولة والمكتبية.',
    'الحد الأقصى — للأجهزة القوية فقط.'
];

function onRenderWindowSlide(val) {
    const i = parseInt(val);
    const label = document.getElementById('renderWindowSliderLabel');
    const desc = document.getElementById('renderWindowDesc');
    const rwLabels = state.language==='ar' ? RENDER_WINDOW_LABELS_AR : RENDER_WINDOW_LABELS_EN;
    const rwDescs  = state.language==='ar' ? RENDER_WINDOW_DESCS_AR  : RENDER_WINDOW_DESCS_EN;
    if (label) label.textContent = rwLabels[i] || '';
    if (desc) desc.textContent  = rwDescs[i]  || '';
}

function applyRenderWindowSlider() {
    const slider = document.getElementById('renderWindowSlider');
    if (!slider) return;
    const days = RENDER_WINDOW_STEPS[parseInt(slider.value)];
    setRenderWindow(days);
}

function savePfp() { saveToStorage(STORAGE_KEYS.PFP(state.currentUser), state.pfp); }
function loadPfp() { state.pfp = loadFromStorage(STORAGE_KEYS.PFP(state.currentUser)) || null; updateAvatarDisplay(); }
function saveMonthlyBg() { saveToStorage(STORAGE_KEYS.MONTHLY_BG(state.currentUser), state.monthlyBackgrounds); }
function loadMonthlyBg() { state.monthlyBackgrounds = loadFromStorage(STORAGE_KEYS.MONTHLY_BG(state.currentUser)) || {}; }

function updateAvatarDisplay() {
    const avatar = document.getElementById('userAvatar');
    if (!avatar) return;
    if (state.pfp) {
        avatar.innerHTML = '';
        avatar.style.backgroundImage = `url(${state.pfp})`;
        avatar.style.backgroundSize = 'cover';
        avatar.style.backgroundPosition = 'center';
        avatar.style.fontSize = '0';
    } else {
        avatar.style.backgroundImage = '';
        avatar.style.backgroundSize = '';
        avatar.innerHTML = state.currentUser.substring(0, 2).toUpperCase();
    }
}

function handlePfpUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        // Compress to max 200x200 for storage efficiency
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const size = 200;
            canvas.width = size; canvas.height = size;
            const ctx = canvas.getContext('2d');
            // Crop to square from center
            const min = Math.min(img.width, img.height);
            const sx = (img.width - min) / 2;
            const sy = (img.height - min) / 2;
            ctx.drawImage(img, sx, sy, min, min, 0, 0, size, size);
            state.pfp = canvas.toDataURL('image/jpeg', 0.8);
            savePfp();
            updateAvatarDisplay();
            closeAccountSettings();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function removePfp() {
    state.pfp = null;
    savePfp();
    updateAvatarDisplay();
}

function updateForgottenBadge() {
    const badge = $('forgottenBadge');
    if (!badge) return;
    const pending = state.forgottenTasks.filter(t => !t.completed).length;
    badge.textContent = pending;
    badge.classList.toggle('hidden', !pending);
}

function openForgottenTasks() {
    closeAccountSettings();
    renderForgottenTasksModal();
    const modal = $('forgottenTasksModal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
}

function closeForgottenTasks() {
    const modal = $('forgottenTasksModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.style.display = '';
}

function openViewAllTasks() {
    $('viewAllTasksModal')?.remove();
    const modal = document.createElement('div');
    modal.id = 'viewAllTasksModal';
    modal.className = 'fixed inset-0 z-[200] flex items-end sm:items-center justify-center modal-backdrop';
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });

    // Gather all uncompleted tasks across all scopes and keys
    const sections = [];
    const scopeLabels = state.language==='ar' ? { day: 'يومية', week: 'أسبوعية', month: 'شهرية', year: 'سنوية' } : { day: 'Daily', week: 'Weekly', month: 'Monthly', year: 'Yearly' };
    for (const scope of ['day', 'week', 'month', 'year']) {
        const entries = [];
        for (const [key, list] of Object.entries(state.tasks[scope] || {})) {
            const pending = (list || []).filter(t => !t.completed);
            for (const t of pending) entries.push({ key, task: t, scope });
        }
        // Sort keys newest-first (they're date strings)
        entries.sort((a, b) => b.key.localeCompare(a.key));
        if (entries.length) sections.push({ scope, label: scopeLabels[scope], entries });
    }

    const total = sections.reduce((s, sec) => s + sec.entries.length, 0);

    const bodyHTML = total === 0
        ? `<div class="text-center py-12 theme-text-secondary">
            <div class="text-4xl mb-3">✅</div>
            <p class="font-medium">${state.language==='ar' ? 'أحسنت! لا شيء بقي' : 'All caught up!'}</p>
            <p class="text-sm mt-1 opacity-70">${state.language==='ar' ? 'لا مهام غير مكتملة' : 'No uncompleted tasks across any period'}</p>
           </div>`
        : sections.map(sec => `
            <div class="px-5 pt-4 pb-1">
                <div class="text-xs font-bold theme-text-secondary uppercase tracking-wider mb-2">${sec.label} · ${sec.entries.length}</div>
                <div class="space-y-1.5">
                    ${sec.entries.map(({ key, task }) => `
                    <div class="flex items-start gap-3 py-2 px-3 theme-bg-tertiary rounded-xl">
                        <div class="flex-1 min-w-0">
                            <div class="text-sm font-medium theme-text truncate">${task.name}</div>
                            <div class="text-xs theme-text-secondary">${key}${task.points ? ' · ' + task.points + ' ' + t('pts') : ''}</div>
                            ${task.notes ? `<div class="text-xs theme-text-secondary mt-0.5 italic">${task.notes}</div>` : ''}
                        </div>
                        <button onclick="quickCompleteTask('${sec.scope}','${key}',${task.id})"
                            class="p-1.5 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 transition-colors flex-shrink-0" title="Complete">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        </button>
                    </div>`).join('')}
                </div>
            </div>`).join('');

    modal.innerHTML = `
        <div class="theme-bg rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col border theme-border overflow-hidden">
            <div class="px-5 py-4 border-b theme-border flex items-center justify-between shrink-0">
                <div>
                    <h2 class="font-bold text-base">${state.language==='ar' ? 'جميع المهام المعلقة' : 'All Pending Tasks'}</h2>
                    <p class="text-xs theme-text-secondary mt-0.5">${total} ${state.language==='ar' ? 'مهمة غير مكتملة' : ('uncompleted task' + (total !== 1 ? 's' : '') + ' across all periods')}</p>
                </div>
                <button onclick="$('viewAllTasksModal')?.remove()" class="p-2 hover:theme-bg-tertiary rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            </div>
            <div class="overflow-y-auto flex-1 pb-4">${bodyHTML}</div>
        </div>`;
    document.body.appendChild(modal);
}

function quickCompleteTask(scope, key, taskId) {
    const list = state.tasks[scope]?.[key];
    if (!list) return;
    const t = list.find(t => t.id === taskId);
    if (t) t.completed = true;
    saveTasks(); updateHeaderScores(); updateForgottenBadge();
    // Re-render the modal in place
    $('viewAllTasksModal')?.remove();
    openViewAllTasks();
}

function renderForgottenTasksModal() {
    const container = document.getElementById('forgottenTasksList');
    if (!container) return;
    const list = state.forgottenTasks;
    if (list.length === 0) {
        container.innerHTML = `<div class="text-center py-12 theme-text-secondary"><div class="text-4xl mb-3">&#x2705;</div><p class="font-medium">${state.language==='ar' ? 'لا توجد مهام منسية' : 'No forgotten tasks'}</p><p class="text-sm mt-1 opacity-70">${state.language==='ar' ? 'المهام التي تؤجلها ستظهر هنا' : 'Tasks you mark as forgotten will appear here'}</p></div>`;
        return;
    }
    container.innerHTML = list.map((task, idx) => {
        const forgottenLabel = new Date(task.forgottenAt).toLocaleDateString(state.language==='ar' ? 'ar-SA' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const completedHtml = task.completed
            ? `<div class="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                Completed &middot; ${new Date(task.attributedDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
               </div>`
            : `<div class="space-y-2">
                <p class="text-xs font-medium theme-text-secondary">${state.language==='ar' ? 'أكمل المهمة وانسبها ليوم:' : 'Complete and attribute to a day:'}</p>
                <div class="flex gap-2">
                    <input type="date" id="forgotten-date-${idx}" value="${dateToLocalString(new Date())}"
                        class="flex-1 theme-bg-panel border theme-border rounded-lg px-3 py-2 text-sm theme-text focus:ring-2 focus:ring-blue-500">
                    <button onclick="completeForgottenTask(${idx})"
                        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
                        &#x2713; ${state.language==='ar' ? 'إتمام' : 'Complete'}
                    </button>
                </div>
               </div>`;
        return `
        <div class="theme-bg-tertiary rounded-xl p-4 space-y-3">
            <div class="flex items-start justify-between gap-3">
                <div class="flex-1 min-w-0">
                    <p class="font-medium theme-text">${task.name}</p>
                    <div class="flex flex-wrap items-center gap-2 mt-1">
                        <span class="text-xs theme-text-secondary">${state.language==='ar' ? 'مهمة ' + {day:'يومية',week:'أسبوعية',month:'شهرية',year:'سنوية'}[task.originalPeriod] : 'Originally a <strong>' + task.periodLabel + '</strong> task'}</span>
                        ${task.points ? `<span class="text-xs font-semibold text-blue-600 dark:text-blue-400">${task.points} pts</span>` : ''}
                    </div>
                    <p class="text-xs theme-text-secondary mt-0.5">${state.language==='ar' ? 'تم تأجيلها ' : 'Forgotten '} ${forgottenLabel}</p>
                </div>
                <button onclick="deleteForgottenTask(${idx})" title="Remove permanently"
                    class="shrink-0 p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                    <svg class="w-4 h-4 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
            </div>
            ${completedHtml}
        </div>`;
    }).join('');
}

function completeForgottenTask(idx) {
    const task = state.forgottenTasks[idx];
    if (!task) return;
    const dateInput = document.getElementById('forgotten-date-' + idx);
    const chosenDate = dateInput?.value;
    if (!chosenDate) return;
    if (!state.tasks.day[chosenDate]) state.tasks.day[chosenDate] = [];
    state.tasks.day[chosenDate].push({ id: Date.now(), name: task.name, points: task.points, completed: true, fromForgotten: true });
    task.completed = true;
    task.attributedDate = chosenDate;
    saveTasks(); saveForgottenTasks(); updateForgottenBadge(); updateHeaderScores();
    if (state.currentDaySidebar) renderSidebarContent();
    renderForgottenTasksModal();
}

function deleteForgottenTask(idx) {
    state.forgottenTasks.splice(idx, 1);
    saveForgottenTasks(); updateForgottenBadge(); renderForgottenTasksModal();
}


function getWeekTotal(dateStr) {
    const date = new Date(dateStr + 'T12:00:00');
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    let total = 0;
    for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        total += calcDayTotal(dateToLocalString(d));
    }
    total += calcWeekTaskPts(getWeekKey(dateStr));
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

// SCORE EXPRESSION EVALUATOR
// Prevents arbitrary code execution.

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

function toggleEventComplete(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    event.completed = !event.completed;
    saveEvents();
    if (state.currentDaySidebar) renderSidebarContent();
}

// VIEW MANAGEMENT

function applyI18nQuick() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = t(key);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
            el.placeholder = val;
        } else {
            el.textContent = val;
        }
    });
    // Render window
    const rwMin = document.getElementById('renderWindowMin');
    if (rwMin) rwMin.textContent = state.language==='ar' ? 'أسبوع' : '1 Week';
    const rwMax = document.getElementById('renderWindowMax');
    if (rwMax) rwMax.textContent = state.language==='ar' ? 'سنة' : '1 Year';
    const ftSub = document.getElementById('forgottenTasksSubtitle');
    if (ftSub) ftSub.textContent = state.language==='ar' ? 'أكمل المهام وانسبها لأي يوم' : 'Complete and attribute to any day you choose';
    const rwSub = document.getElementById('renderWindowSubtitle');
    if (rwSub) rwSub.textContent = state.language==='ar' ? 'حدد نطاق إنشاء الأحداث المتكررة.' : 'How far to generate repeating events from your current view.';
    const rwApply = document.getElementById('renderWindowApplyBtn');
    if (rwApply) rwApply.textContent = state.language==='ar' ? 'تطبيق' : 'Apply';
    const slider = document.getElementById('renderWindowSlider');
    if (slider) onRenderWindowSlide(slider.value);
    // Add account modal
    const addAccLabel = document.getElementById('addAccountNameLabel');
    if (addAccLabel) addAccLabel.textContent = state.language==='ar' ? 'اسم الحساب' : 'Account Name';
    const addAccHint = document.getElementById('addAccountHint');
    if (addAccHint) addAccHint.textContent = state.language==='ar' ? 'حروف وأرقام وشرطات وشرطات سفلية فقط' : 'Letters, numbers, hyphens and underscores only';
    const createAccBtn = document.getElementById('createAccountBtn');
    if (createAccBtn) createAccBtn.textContent = state.language==='ar' ? 'إنشاء حساب' : 'Create Account';
    // Delete account modal
    const delAccSelLabel = document.getElementById('deleteAccountSelectLabel');
    if (delAccSelLabel) delAccSelLabel.textContent = state.language==='ar' ? 'اختر حساباً للحذف' : 'Select account to delete';
    const delAccWarnTitle = document.getElementById('deleteAccountWarnTitle');
    if (delAccWarnTitle) delAccWarnTitle.textContent = state.language==='ar' ? '⚠️ لا يمكن التراجع عن هذا' : '⚠️ This cannot be undone';
    const delAccConfirmLabel = document.getElementById('deleteAccountConfirmLabel');
    if (delAccConfirmLabel) delAccConfirmLabel.textContent = state.language==='ar' ? 'اكتب اسم الحساب للتأكيد' : 'Type the account name to confirm';
    // Add calendar modal
    const calNameLabel = document.getElementById('calendarNameLabel');
    if (calNameLabel) calNameLabel.textContent = state.language==='ar' ? 'اسم التقويم' : 'Calendar Name';
    const calColorLabel = document.getElementById('calendarColorLabel');
    if (calColorLabel) calColorLabel.textContent = state.language==='ar' ? 'اللون' : 'Color';
    const createCalBtn = document.getElementById('createCalendarBtn');
    if (createCalBtn) createCalBtn.textContent = state.language==='ar' ? 'إنشاء' : 'Create';
    // Background modal
    const AR = state.language === 'ar';
    const bgPairs = [
        ['bgSettingsTitle',       AR ? 'إعدادات الخلفية'          : 'Background Settings'],
        ['bgUploadLabel',         AR ? 'رفع صورة خلفية'           : 'Upload Background Image'],
        ['bgDropHint',            AR ? 'انقر للرفع أو اسحب وأفلت' : 'Click to upload or drag and drop'],
        ['bgFormatHint',          AR ? 'PNG أو JPG حتى 5MB'       : 'PNG, JPG up to 5MB (smaller is better for storage)'],
        ['bgOpacityLabel',        AR ? 'الشفافية'                  : 'Opacity'],
        ['bgApplyToLabel',        AR ? 'تطبيق على'                 : 'Apply to'],
        ['bgMonthlyOverrideLabel',AR ? 'تثبيت شهري'               : 'Monthly Override'],
        ['bgMonthlyHint',         AR ? 'حفظ هذه الصورة لشهر العرض الحالي فقط. لن تظهر أي خلفية الشهر القادم إلا إذا ضبطتها.' : 'Save this image only for the current view month. Next month will show no background unless you set one.'],
        ['bgPinBtnLabel',         AR ? 'تثبيت لهذا الشهر'         : 'Pin to this month'],
        ['bgUnpinBtnLabel',       AR ? 'إلغاء التثبيت'            : 'Remove pin'],
        ['bgRemoveBtnLabel',      AR ? 'إزالة الخلفية'            : 'Remove Background'],
    ];
    bgPairs.forEach(([id, text]) => { const el = document.getElementById(id); if (el) el.textContent = text; });
    // Scope buttons
    const scopeLabels = AR ? { month: 'هذا الشهر', year: 'هذا العام', all: 'كل الوقت' }
                           : { month: 'This Month', year: 'This Year', all: 'All Time' };
    document.querySelectorAll('[data-scope-label]').forEach(btn => {
        btn.textContent = scopeLabels[btn.getAttribute('data-scope-label')] || btn.textContent;
    });
    // Render window apply button
    const rwApplyBtn = document.getElementById('renderWindowApplyBtn');
    if (rwApplyBtn) rwApplyBtn.textContent = AR ? 'تطبيق' : 'Apply';
    // Search tabs (if already rendered)
    const stEvt = document.getElementById('searchTabEvents');
    if (stEvt) stEvt.textContent = AR ? 'الأحداث' : 'Events';
    const stJnl = document.getElementById('searchTabJournal');
    if (stJnl) stJnl.textContent = AR ? 'اليومية' : 'Journal';
    // Static HTML placeholders
    const naInput = document.getElementById('newAccountNameInput');
    if (naInput) naInput.placeholder = AR ? 'مثال: عمل، شخصي' : 'e.g., work, personal';
    const ncInput = document.getElementById('newCalendarNameInput');
    if (ncInput) ncInput.placeholder = AR ? 'مثال: رياضة، دراسة' : 'e.g., Gym, Study';
    const daCInput = document.getElementById('deleteAccountConfirmInput');
    if (daCInput) daCInput.setAttribute('dir', 'ltr');
    // Prayer offset placeholders (static in index.html)
    const ps = document.getElementById('prayerStartOffset');
    if (ps) ps.placeholder = AR ? 'مثال: 0' : 'e.g., 0';
    const pe = document.getElementById('prayerEndOffset');
    if (pe) pe.placeholder = AR ? 'مثال: 30' : 'e.g., 30';
    // Prayer times toggle button label
    const prayerBtn = document.getElementById('prayerViewToggleBtn');
    if (prayerBtn) {
        const pLabel = prayerBtn.querySelector('span.hidden.lg\\:inline, span[data-i18n]');
        if (pLabel) pLabel.textContent = state.showPrayerTimesInView ? t('hidePrayerTimes') : t('prayerTimes');
    }
    // Edit series modal
    const esPairs = [
        ['editSeriesTitle',    AR ? 'تعديل حدث متكرر'           : 'Edit Repeating Event'],
        ['editSeriesSubtitle', AR ? 'هذا الحدث جزء من سلسلة متكررة.' : 'This event is part of a repeating series.'],
        ['editSeriesOneLabel', AR ? 'هذا الحدث فقط'             : 'This event only'],
        ['editSeriesOneDesc',  AR ? 'سيتم تحديث هذا التكرار فقط وفصله عن السلسلة.' : 'Only this occurrence will be updated. It will be detached from the series.'],
        ['editSeriesAllLabel', AR ? 'جميع أحداث السلسلة'        : 'All events in series'],
        ['editSeriesAllDesc',  AR ? 'يتم تحديث العنوان والوقت والتقويم وغيرها لكل تكرار. تُحفظ التواريخ.' : 'Title, time, calendar, and other settings update for every occurrence. Dates are preserved.'],
    ];
    esPairs.forEach(([id, text]) => { const el = document.getElementById(id); if (el) el.textContent = text; });
}

function renderCurrentView() {
    if (state.currentView === 'day')   renderDayView();
    if (state.currentView === 'week')  renderWeekView();
    if (state.currentView === 'month') renderMonthView();
    if (state.currentView === 'year')  renderYearView();
    updateHeaderScores();
    applyI18nQuick();
}

function switchView(view) {
    state.currentView = view;
    ['day','week','month','year'].forEach(v => {
        const btn = document.getElementById(`view-${v}`);
        if (!btn) return;
        if (v === view) { btn.classList.remove('theme-text-secondary'); btn.classList.add('theme-bg', 'shadow-sm'); }
        else            { btn.classList.add('theme-text-secondary'); btn.classList.remove('theme-bg', 'shadow-sm'); }
    });

    $('dayView')?.classList.toggle('hidden', view !== 'day');
    $('weekView')?.classList.toggle('hidden', view !== 'week');
    $('monthView')?.classList.toggle('hidden', view !== 'month');
    $('yearView')?.classList.toggle('hidden', view !== 'year');

    if (view !== 'day') {
        // Close sidebar fully (hide DOM + clear state) so stale content
        // never remains visible when returning to a different day.
        if (state.currentDaySidebar || !document.getElementById('daySidebar')?.classList.contains('hidden')) {
            state.currentDaySidebar = null;
            state.sidebarView = null;
            hideEl('daySidebar');
            const label = document.getElementById('sidebarToggleBtnLabel');
            if (label) label.textContent = t('openJournal');
        }
    }
    animateNavView('switch');
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
    const j = state.journalEntries[dateStr];
    if (!j) return '<span class="w-2 h-2 rounded-full bg-red-400 inline-block"></span>';
    if (j.score) return `<span class="text-[10px] font-bold text-blue-600 dark:text-blue-400 leading-none">${j.score}pts</span>`;
    return '<span class="w-2 h-2 rounded-full bg-green-400 inline-block"></span>';
}

// NAVIGATION

// NAV ANIMATION HELPER
function animateNavView(direction) {
    // direction: 'next' | 'prev' | 'switch'
    const ids = ['dayView','weekView','monthView','yearView'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el || el.classList.contains('hidden')) return;
        el.classList.remove('nav-anim-next','nav-anim-prev','nav-anim-switch');
        void el.offsetWidth; // force reflow
        if (direction === 'next')   el.classList.add('nav-anim-next');
        else if (direction === 'prev') el.classList.add('nav-anim-prev');
        else                           el.classList.add('nav-anim-switch');
    });
}

// Day view: ±1 day | Week view: ±7 days | Month view: ±1 month | Year view: ±1 year

function navigatePrev() {
    switch (state.currentView) {
        case 'day':
            state.currentDate.setDate(state.currentDate.getDate() - 1);
            if (state.currentDaySidebar) {
                state.currentDaySidebar = dateToLocalString(state.currentDate);
            }
            break;
        case 'week':
            state.currentDate.setDate(state.currentDate.getDate() - (window.innerWidth < 768 ? 1 : 7));
            break;
        case 'month': {
            if (state.calendarMode === 'hijri') { hijriPrevMonth(); break; }
            const m = state.currentDate.getMonth();
            const y = state.currentDate.getFullYear();
            state.currentDate = new Date(m === 0 ? y - 1 : y, m === 0 ? 11 : m - 1, 1);
            break;
        }
        case 'year':
            if (state.calendarMode === 'hijri') { hijriPrevYear(); break; }
            state.currentDate.setFullYear(state.currentDate.getFullYear() - 1);
            break;
    }
    animateNavView('prev');
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
            state.currentDate.setDate(state.currentDate.getDate() + (window.innerWidth < 768 ? 1 : 7));
            break;
        case 'month': {
            if (state.calendarMode === 'hijri') { hijriNextMonth(); break; }
            const m = state.currentDate.getMonth();
            const y = state.currentDate.getFullYear();
            state.currentDate = new Date(m === 11 ? y + 1 : y, m === 11 ? 0 : m + 1, 1);
            break;
        }
        case 'year':
            if (state.calendarMode === 'hijri') { hijriNextYear(); break; }
            state.currentDate.setFullYear(state.currentDate.getFullYear() + 1);
            break;
    }
    animateNavView('next');
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
    state.currentDate = state.selectedDate = new Date();
    renderCurrentView(); renderMiniCalendar(); applyBackground();
}

function openMonthPicker() { switchView('month'); }

function openMonthYearPicker(e) {
    if (e) e.stopPropagation();
    // Remove any existing popover
    const existing = document.getElementById('dateJumpPopover');
    if (existing) { existing.remove(); return; }

    const btn = e?.currentTarget || document.querySelector('[onclick*="openMonthYearPicker"]');
    const rect = btn ? btn.getBoundingClientRect() : { left: 120, bottom: 60, width: 180 };

    const popover = document.createElement('div');
    popover.id = 'dateJumpPopover';
    popover.className = 'fixed z-50 theme-bg border theme-border rounded-2xl shadow-2xl p-4 w-72 modal-animate';
    // Position below the header button
    const top = rect.bottom + 8;
    const left = Math.min(rect.left, window.innerWidth - 300);
    popover.style.cssText = `top:${top}px; left:${Math.max(8, left)}px;`;

    const today = dateToLocalString(new Date());

    popover.innerHTML = `
        <div class="mb-3">
            <p class="text-xs font-semibold theme-text-secondary uppercase tracking-wider mb-1">${state.language==='ar' ? 'الانتقال إلى تاريخ' : 'Jump to Date'}</p>
        </div>
        <input type="date" id="dateJumpInput" value="${dateToLocalString(state.currentDate)}"
            class="w-full theme-bg-tertiary border theme-border rounded-xl px-3 py-2.5 text-sm theme-text focus:ring-2 focus:ring-blue-500 mb-3">
        <div class="flex gap-2">
            <button onclick="applyDateJump()" class="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-colors">${state.language==='ar' ? 'انتقل' : 'Go'}</button>
            <button onclick="applyDateJump('${today}')" class="px-3 py-2 theme-bg-tertiary hover:theme-bg-panel border theme-border rounded-xl text-sm theme-text transition-colors">${t('today')}</button>
        </div>
        <div class="mt-3 grid grid-cols-3 gap-1.5">
            <button onclick="jumpRelative(-1)" class="py-1.5 text-xs theme-bg-tertiary hover:theme-bg-panel border theme-border rounded-lg theme-text transition-colors">${state.language==='ar' ? '−شهر' : '−Month'}</button>
            <button onclick="jumpRelative(1)" class="py-1.5 text-xs theme-bg-tertiary hover:theme-bg-panel border theme-border rounded-lg theme-text transition-colors">${state.language==='ar' ? '+شهر' : '+Month'}</button>
            <button onclick="jumpRelative(12)" class="py-1.5 text-xs theme-bg-tertiary hover:theme-bg-panel border theme-border rounded-lg theme-text transition-colors">${state.language==='ar' ? '+سنة' : '+Year'}</button>
        </div>
    `;
    document.body.appendChild(popover);
    setTimeout(() => $('dateJumpInput')?.focus(), 50);

    // Remove any stale listener before adding fresh one
    document.removeEventListener('click', closeDateJumpOnOutside);
    setTimeout(() => document.addEventListener('click', closeDateJumpOnOutside), 0);
}

function closeDateJumpOnOutside(e) {
    const popover = document.getElementById('dateJumpPopover');
    if (!popover) { document.removeEventListener('click', closeDateJumpOnOutside); return; }
    if (!popover.contains(e.target) && !e.target.closest('[onclick*="openMonthYearPicker"]')) {
        popover.remove();
        document.removeEventListener('click', closeDateJumpOnOutside);
    }
}

function applyDateJump(dateStr) {
    const val = dateStr || document.getElementById('dateJumpInput')?.value;
    if (!val) return;
    state.currentDate = new Date(val + 'T12:00:00');
    const popover = document.getElementById('dateJumpPopover');
    if (popover) popover.remove();
    document.removeEventListener('click', closeDateJumpOnOutside);
    renderCurrentView();
    renderMiniCalendar();
}

function jumpRelative(months) {
    const d = new Date(state.currentDate);
    d.setMonth(d.getMonth() + months);
    state.currentDate = d;
    const inp = document.getElementById('dateJumpInput');
    if (inp) inp.value = dateToLocalString(d);
    renderCurrentView();
    renderMiniCalendar();
}

// BACKGROUND SETTINGS

function openBackgroundSettings() {
    const modal = document.getElementById('backgroundModal');
    showEl('backgroundModal');
    if (state.backgroundImage) {
        $('bgControls')?.classList.remove('hidden');
        const bgPreview = document.getElementById('bgPreview');
        if (bgPreview) { bgPreview.classList.remove('hidden'); bgPreview.style.backgroundImage = `url(${state.backgroundImage})`; }
    }
    updateMonthlyBgUI();
}

function closeBackgroundSettings() { hideEl('backgroundModal'); }

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
        $('bgControls')?.classList.remove('hidden');
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

    // Check monthly background for current view month first
    const monthKey = dateToLocalString(state.currentDate).substring(0, 7);
    const monthlyBg = state.monthlyBackgrounds[monthKey];
    if (monthlyBg && monthlyBg.image) {
        bgLayer.style.backgroundImage = `url(${monthlyBg.image})`;
        bgLayer.style.opacity = (monthlyBg.opacity || 0.5).toString();
        bgLayer.classList.add('active');
        return;
    }

    // Fall back to global background
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
    $('bgControls')?.classList.add('hidden');
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

// USER MENU & SETTINGS


// MERGED ACCOUNT & SETTINGS PANEL
// Fixed-position so sidebar overflow never clips it
function openAccountSettings(e) {
    if (e) e.stopPropagation();

    let panel = document.getElementById('accountSettingsPanel');
    if (panel) { panel.remove(); return; }

    const btn = document.getElementById('accountSettingsBtn');
    const rect = btn ? btn.getBoundingClientRect() : { top: 0, left: 0, width: 280 };

    // Build user list HTML
    let userListHTML = state.users.map(user => {
        const isActive = user === state.currentUser;
        return `<button onclick="switchUser('${user}'); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-sm transition-colors ${isActive ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'hover:theme-bg-tertiary'}">
            <div class="w-6 h-6 rounded-full bg-gradient-to-br ${isActive ? 'from-blue-400 to-blue-600' : 'from-gray-400 to-gray-600'} flex items-center justify-center text-white text-xs font-bold">${user.substring(0,2).toUpperCase()}</div>
            <span class="flex-1">${user}</span>
            ${isActive ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' : ''}
        </button>`;
    }).join('');

    panel = document.createElement('div');
    panel.id = 'accountSettingsPanel';
    panel.className = 'fixed theme-bg rounded-xl shadow-2xl border theme-border overflow-y-auto z-[200] w-72';
    // Position above the button; clamp left so panel stays on screen
    const panelW = 288; // w-72
    const safeLeft = Math.min(rect.left, window.innerWidth - panelW - 8);
    const bottomFromViewport = window.innerHeight - rect.top + 8;
    panel.style.cssText = `bottom: ${bottomFromViewport}px; left: ${Math.max(8, safeLeft)}px; max-height: calc(${rect.top}px - 16px);`;
    panel.innerHTML = `
        <div class="p-3 border-b theme-border">
            <div class="text-xs font-semibold theme-text-secondary uppercase tracking-wider mb-2">${t('accounts')}</div>
            <div class="space-y-1">${userListHTML}</div>
            <div class="flex gap-2 mt-2 pt-2 border-t theme-border">
                <button onclick="openAddAccountModal();" class="flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm text-blue-600 dark:text-blue-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                    <span>${t('add')}</span>
                </button>
                <button onclick="openDeleteAccountModal();" class="flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-sm text-red-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    <span>${t('delete')}</span>
                </button>
            </div>
        </div>
        <div class="p-2 space-y-1">
            <div class="text-xs font-semibold theme-text-secondary uppercase tracking-wider px-3 py-1">${t('settings')}</div>
            <button onclick="document.getElementById('pfpInput').click(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <div id="pfpMenuPreview" class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold overflow-hidden shrink-0"></div>
                <span>${t('profilePicture')}</span>
                ${state.pfp ? `<span class="ml-auto text-xs text-red-500 hover:underline" onclick="event.stopPropagation(); removePfp(); closeAccountSettings();">${t('remove')}</span>` : `<span class="ml-auto text-xs theme-text-secondary">${t('upload')}</span>`}
            </button>
            <button onclick="toggleCalendarMode(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
                <span id="calendarModeMenuLabel">${state.calendarMode === 'hijri' ? t('toGregorian') : t('toHijri')}</span>
            </button>
            <button onclick="openThemePicker(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                <span>${t('appearance')}</span>
            </button>
            <button onclick="openVariableSettings(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm text-blue-600 dark:text-blue-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path></svg>
                <span>${t('journalVars')}</span>
            </button>
            <button onclick="openLocationSettings(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>${t('locationSettings')}</span>
            </button>
            <button onclick="openBackgroundSettings(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span>${t('backgroundImage')}</span>
            </button>
            <button onclick="openRenderWindowSettings(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                <span>${t('renderWindow')}</span>
                <span class="ml-auto text-xs theme-text-secondary font-medium" id="renderWindowLabel">${getRenderWindowLabel()}</span>
            </button>
                        <button onclick="openViewAllTasks(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                <span>${t('viewAllTasks')}</span>
            </button>
                        <button onclick="openForgottenTasks();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span>${t('forgottenTasks')}</span>
                <span id="forgottenBadge" class="ml-auto text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-full px-2 py-0.5 font-semibold hidden">0</span>
            </button>
            <button onclick="toggleLanguage()" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/></svg>
                <span class="font-medium">${state.language === 'ar' ? t('switchToEnglish') : t('switchToArabic')}</span>
            </button>
            <div class="border-t theme-border my-1"></div>
            <button onclick="exportData(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                <span>${t('exportJson')}</span>
            </button>
            <button onclick="exportICS(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span>${t('exportIcs')}</span>
            </button>
            <button onclick="importData(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                <span>${t('importData')}</span>
            </button>
            <button onclick="clearAllData(); closeAccountSettings();" class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:theme-bg-tertiary transition-colors text-left text-sm text-red-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                <span>${t('clearData')}</span>
            </button>
        </div>
    `;
    document.body.appendChild(panel);

    // Update pfp preview in menu
    const pfpMenuPreview = document.getElementById('pfpMenuPreview');
    if (pfpMenuPreview) {
        if (state.pfp) {
            pfpMenuPreview.style.backgroundImage = 'url(' + state.pfp + ')';
            pfpMenuPreview.style.backgroundSize = 'cover';
            pfpMenuPreview.style.backgroundPosition = 'center';
            pfpMenuPreview.innerHTML = '';
        } else {
            pfpMenuPreview.style.backgroundImage = '';
            pfpMenuPreview.innerHTML = state.currentUser.substring(0,2).toUpperCase();
        }
    }

    // Close on outside click
    setTimeout(() => {
        document.addEventListener('click', closeAccountSettingsOutside);
    }, 0);
}

function closeAccountSettings() {
    const panel = document.getElementById('accountSettingsPanel');
    if (panel) panel.remove();
    document.removeEventListener('click', closeAccountSettingsOutside);
}

function closeAccountSettingsOutside(e) {
    const panel = document.getElementById('accountSettingsPanel');
    const btn = document.getElementById('accountSettingsBtn');
    if (!panel) return;
    if (panel.contains(e.target) || (btn && btn.contains(e.target))) return;
    closeAccountSettings();
}

function closeUserMenu() {
    $('userMenu')?.classList.add('hidden');
}

function closeSettings() {
    $('settingsMenu')?.classList.add('hidden');
}

function openSearch() {
    const modal = document.getElementById('searchModal');
    if (!modal) return;
    showEl('searchModal');
    // Remove stale tab bar so it regenerates with current language
    const staleBar = $('searchTabBar'); if (staleBar) staleBar.remove();
    // Inject tab bar (between header and results)
    if (!$('searchTabBar')) {
        const tabBar = document.createElement('div');
        tabBar.id = 'searchTabBar';
        tabBar.className = 'flex border-b theme-border shrink-0 px-5';
        tabBar.innerHTML = `
            <button id="searchTabEvents" onclick="setSearchTab('events')"
                class="flex-1 py-2.5 text-sm font-medium border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 transition-colors">
                ${state.language==='ar' ? '\u0627\u0644\u0623\u062d\u062f\u0627\u062b' : 'Events'}
            </button>
            <button id="searchTabJournal" onclick="setSearchTab('journal')"
                class="flex-1 py-2.5 text-sm font-medium border-b-2 border-transparent theme-text-secondary transition-colors">
                ${state.language==='ar' ? '\u0627\u0644\u064a\u0648\u0645\u064a\u0629' : 'Journal'}
            </button>`;
        const resultsEl = $('searchResults');
        if (resultsEl) resultsEl.before(tabBar);
    }
    state._searchTab = 'events';
    // Reset tabs to events active
    const ev = $('searchTabEvents'), jn = $('searchTabJournal');
    if (ev) ev.className = 'flex-1 py-2.5 text-sm font-medium border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 transition-colors';
    if (jn) jn.className = 'flex-1 py-2.5 text-sm font-medium border-b-2 border-transparent theme-text-secondary transition-colors';
    const input = $('searchInput');
    if (input) { input.value = ''; setTimeout(() => input.focus(), 50); }
    const results = $('searchResults');
    if (results) results.innerHTML = `<div class="px-5 py-8 text-center theme-text-secondary text-sm">${state.language==='ar' ? '\u0627\u0628\u062f\u0623 \u0627\u0644\u0643\u062a\u0627\u0628\u0629 \u0644\u0644\u0628\u062d\u062b' : 'Start typing to search'}</div>`;
    modal.addEventListener('click', e => { if (e.target === modal) closeSearchModal(); }, { once: true });
}

function closeSearchModal() { hideEl('searchModal'); }

function setSearchTab(tab) {
    state._searchTab = tab;
    const ev = $('searchTabEvents'), jn = $('searchTabJournal');
    const active = 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400';
    const inactive = 'border-b-2 border-transparent theme-text-secondary';
    if (ev) ev.className = `flex-1 py-2.5 text-sm font-medium transition-colors ${tab === 'events' ? active : inactive}`;
    if (jn) jn.className = `flex-1 py-2.5 text-sm font-medium transition-colors ${tab === 'journal' ? active : inactive}`;
    const q = $('searchInput')?.value || '';
    if (q.trim()) performSearch(q);
    else {
        const r = document.getElementById('searchResults');
        if (r) r.innerHTML = `<div class="px-5 py-8 text-center theme-text-secondary text-sm">${state.language==='ar' ? '\u0627\u0628\u062f\u0623 \u0627\u0644\u0643\u062a\u0627\u0628\u0629 \u0644\u0644\u0628\u062d\u062b' : 'Start typing to search'}</div>`;
    }
}

function performSearch(query) {
    const resultsEl = document.getElementById('searchResults');
    if (!resultsEl) return;
    if (!query.trim()) {
        resultsEl.innerHTML = `<div class="px-5 py-8 text-center theme-text-secondary text-sm">${state.language==='ar' ? '\u0627\u0628\u062f\u0623 \u0627\u0644\u0643\u062a\u0627\u0628\u0629 \u0644\u0644\u0628\u062d\u062b' : 'Start typing to search'}</div>`;
        return;
    }
    const q = query.toLowerCase();

    if (state._searchTab === 'journal') {
        // Search journal entries by title and content
        const matches = Object.entries(state.journalEntries)
            .filter(([, j]) => j && (
                (j.title && j.title.toLowerCase().includes(q)) ||
                (j.content && j.content.toLowerCase().includes(q))
            ))
            .sort((a, b) => b[0].localeCompare(a[0])); // newest first

        if (!matches.length) {
            resultsEl.innerHTML = `<div class="px-5 py-8 text-center theme-text-secondary text-sm">${state.language==='ar' ? '\u0644\u0627 \u062a\u0648\u062c\u062f \u064a\u0648\u0645\u064a\u0627\u062a \u062a\u0637\u0627\u0628\u0642' : 'No journal entries found for'} "<strong>${query}</strong>"</div>`;
            return;
        }
        resultsEl.innerHTML = matches.map(([dateStr, j]) => {
            const date = new Date(dateStr + 'T12:00:00');
            const hijri = toHijri(date);
            const snippet = (j.content || '').replace(/</g, '&lt;');
            const highlighted = snippet.replace(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'), '<mark class="bg-yellow-200 dark:bg-yellow-700 rounded px-0.5">$1</mark>');
            const preview = highlighted.length > 120 ? highlighted.slice(0, 120) + '…' : highlighted;
            return `
            <button onclick="searchGoToJournal('${dateStr}')" class="w-full px-5 py-3 flex items-start space-x-3 hover:theme-bg-tertiary transition-colors text-left">
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                        <span class="text-sm font-medium theme-text">${j.title || dateStr}</span>
                        ${j.score ? `<span class="text-xs font-bold text-blue-500">${j.score}${t('pts')}</span>` : ''}
                    </div>
                    <div class="text-xs theme-text-secondary mb-1">${dateStr} · ${hijri.day} ${tHijri(islamicMonths.indexOf(hijri.month)+1).slice(0,4)} ${hijri.year}</div>
                    ${preview ? `<div class="text-xs theme-text-secondary leading-relaxed">${preview}</div>` : ''}
                </div>
                <svg class="w-4 h-4 theme-text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>`;
        }).join('');
        return;
    }

    // Events search
    const windowDays = state.renderWindowDays || 31;
    const windowStart = new Date(state.currentDate);
    windowStart.setDate(windowStart.getDate() - windowDays);
    const windowEnd = new Date(state.currentDate);
    windowEnd.setDate(windowEnd.getDate() + windowDays);

    const searchPool = [];
    const seenKeys = new Set();
    for (const ev of events) {
        if (ev.parentId) continue;
        if (!ev.title.toLowerCase().includes(q) && !(ev.description?.toLowerCase().includes(q))) continue;
        if (!ev.repeat || ev.repeat === 'none') {
            if (!seenKeys.has(ev.id)) { searchPool.push(ev); seenKeys.add(ev.id); }
        } else {
            const baseInWindow = ev.date >= dateToLocalString(windowStart) && ev.date <= dateToLocalString(windowEnd);
            if (baseInWindow && !seenKeys.has(ev.id)) { searchPool.push(ev); seenKeys.add(ev.id); }
            for (const d of getRepeatDatesInWindow(ev, windowStart, windowEnd)) {
                const dStr = dateToLocalString(d), key = ev.id + '_' + dStr;
                if (!seenKeys.has(key)) { searchPool.push({ ...ev, date: dStr, id: key, parentId: ev.id }); seenKeys.add(key); }
            }
        }
    }

    const results = searchPool.sort((a, b) => a.date.localeCompare(b.date));
    if (!results.length) {
        resultsEl.innerHTML = `<div class="px-5 py-8 text-center theme-text-secondary text-sm">${state.language==='ar' ? '\u0644\u0627 \u062a\u0648\u062c\u062f \u0623\u062d\u062f\u0627\u062b \u062a\u0637\u0627\u0628\u0642' : 'No events found for'} "<strong>${query}</strong>"</div>`;
        return;
    }
    resultsEl.innerHTML = results.map(e => {
        const colorObj = CALENDAR_COLORS.find(c => c.id === e.color) || CALENDAR_COLORS[0];
        const timeStr = e.isAllDay ? (state.language==='ar' ? '\u0637\u0648\u0627\u0644 \u0627\u0644\u064a\u0648\u0645' : 'All day') : `${e.startTime} – ${e.endTime}`;
        const cal = state.calendars.find(c => c.id === e.calendar);
        return `
            <button onclick="searchGoToEvent('${e.id}')" class="w-full px-5 py-3 flex items-center space-x-3 hover:theme-bg-tertiary transition-colors text-left">
                <span class="w-3 h-3 rounded-full flex-shrink-0 ${colorObj.bg}"></span>
                <div class="flex-1 min-w-0">
                    <div class="text-sm font-medium theme-text truncate">${e.title}</div>
                    <div class="text-xs theme-text-secondary">${e.date} · ${timeStr}${cal ? ' · ' + cal.name : ''}</div>
                </div>
                <svg class="w-4 h-4 theme-text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>`;
    }).join('');
}

function searchGoToJournal(dateStr) {
    closeSearchModal();
    state.currentDate = new Date(dateStr + 'T12:00:00');
    renderMiniCalendar();
    switchView('day');
    setTimeout(() => openDaySidebar(dateStr), 100);
    setTimeout(() => { state.sidebarView = 'journal'; renderSidebarContent(); }, 150);
}

function searchGoToEvent(eventIdStr) {
    // eventIdStr may be a virtual composite like "12345_2026-05-01"
    let event = events.find(e => e.id === eventIdStr);
    if (!event) {
        // Try resolving virtual instance: find base event and reconstruct
        const parts = String(eventIdStr).split('_');
        const baseId = isNaN(parts[0]) ? eventIdStr : Number(parts[0]);
        const dateStr = parts[1];
        const base = events.find(e => e.id === baseId);
        if (!base) return;
        event = { ...base, date: dateStr || base.date, id: eventIdStr, parentId: base.id };
    }
    closeSearchModal();
    state.currentDate = new Date(event.date + 'T12:00:00');
    renderMiniCalendar();
    switchView('day');
    setTimeout(() => openModal(event), 100);
}

// EXPORT / IMPORT / CLEAR

function exportData() {
    // Build export without the large base64 background image
    const hasBackground = !!state.backgroundImage;
    const data = {
        user: state.currentUser,
        events: events,
        calendars: state.calendars,
        theme: { isDarkMode: state.isDarkMode, currentTheme: state.currentTheme },
        activeCalendars: state.activeCalendars,
        background: {
            imageOmitted: hasBackground,
            opacity: state.backgroundOpacity,
            scope: state.backgroundScope
        },
        location: state.userLocation,
        journal: state.journalEntries,
        variables: state.variables,
        tasks: state.tasks,
        forgottenTasks: state.forgottenTasks,
        hijriMonthOffsets: state.hijriMonthOffsets,
        calendarMode: state.calendarMode,
        renderWindowDays: state.renderWindowDays,
        exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calendar-${state.currentUser}-${todayLocalString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    const note = hasBackground ? '\n\nNote: Your background image was not included in the export to keep the file size small.' : '';
    alert('Data exported successfully!' + note);
}

function exportICS() {
    // Expand all events (including virtual repeat instances) into a flat list for export
    const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//HijriCalendar//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH'
    ];

    const icsDate = (dateStr, timeStr, isAllDay) => {
        if (isAllDay) return `VALUE=DATE:${dateStr.replace(/-/g, '')}`;
        const [h, m] = (timeStr || '00:00').split(':');
        return `${dateStr.replace(/-/g, '')}T${h.padStart(2,'0')}${m.padStart(2,'0')}00`;
    };
    const escText = s => (s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
    const stamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';

    // Build flat list: base events + virtual repeat instances (up to 2 years out)
    const allExport = [];
    const rangeEnd = new Date(); rangeEnd.setFullYear(rangeEnd.getFullYear() + 2);
    const rangeStart = new Date(); rangeStart.setFullYear(rangeStart.getFullYear() - 2);

    for (const ev of events) {
        if (ev.parentId) continue;
        if (!ev.repeat || ev.repeat === 'none') {
            allExport.push(ev);
        } else {
            // Base occurrence
            allExport.push(ev);
            // Virtual occurrences
            for (const d of getRepeatDatesInWindow(ev, rangeStart, rangeEnd)) {
                const dStr = dateToLocalString(d);
                if (ev.deletedDates?.includes(dStr)) continue;
                allExport.push({ ...ev, date: dStr, id: `${ev.id}_${dStr}`, repeat: 'none' });
            }
        }
    }

    for (const ev of allExport) {
        const uid = `${ev.id}@hijri-calendar`;
        const cal = state.calendars.find(c => c.id === ev.calendar);
        lines.push('BEGIN:VEVENT');
        lines.push(`UID:${uid}`);
        lines.push(`DTSTAMP:${stamp}`);
        if (ev.isAllDay) {
            lines.push(`DTSTART;${icsDate(ev.date, null, true)}`);
            // DTEND for all-day is exclusive next day
            const next = new Date(ev.date + 'T12:00:00'); next.setDate(next.getDate() + 1);
            lines.push(`DTEND;${icsDate(dateToLocalString(next), null, true)}`);
        } else {
            lines.push(`DTSTART:${icsDate(ev.date, ev.startTime, false)}`);
            lines.push(`DTEND:${icsDate(ev.date, ev.endTime || ev.startTime, false)}`);
        }
        lines.push(`SUMMARY:${escText(ev.title)}`);
        if (ev.description) lines.push(`DESCRIPTION:${escText(ev.description)}`);
        if (cal) lines.push(`CATEGORIES:${escText(cal.name)}`);
        if (ev.completed) lines.push('STATUS:COMPLETED');
        lines.push('END:VEVENT');
    }
    lines.push('END:VCALENDAR');

    const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calendar-${state.currentUser}-${todayLocalString()}.ics`;
    a.click();
    URL.revokeObjectURL(url);
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                if (data.events)           { events = data.events; saveEvents(); }
                if (data.calendars)        { state.calendars = data.calendars; saveCalendars(); }
                if (data.theme)            { state.isDarkMode = data.theme.isDarkMode; applyTheme(data.theme.currentTheme || 'default', state.isDarkMode ? 'dark' : 'light'); saveTheme(); }
                if (data.activeCalendars)  { state.activeCalendars = data.activeCalendars; saveToStorage(STORAGE_KEYS.CALENDARS(state.currentUser) + '_active', data.activeCalendars); }
                if (data.journal)          { state.journalEntries = data.journal; saveJournal(); }
                if (data.variables)        { state.variables = data.variables; saveVariables(); }
                if (data.location)         { state.userLocation = data.location; saveLocation(); }
                if (data.tasks)            { state.tasks = data.tasks; saveTasks(); }
                if (data.forgottenTasks)   { state.forgottenTasks = data.forgottenTasks; saveForgottenTasks(); }
                if (data.hijriMonthOffsets){ state.hijriMonthOffsets = data.hijriMonthOffsets; saveHijriOffsets(); }
                if (data.calendarMode)     { state.calendarMode = data.calendarMode; saveCalendarMode(); }
                if (data.renderWindowDays) { state.renderWindowDays = data.renderWindowDays; saveRenderWindow(); }
                updateForgottenBadge();
                renderCurrentView(); renderMiniCalendar(); renderCalendarList(); applyBackground(); updateCalendarModeToggleUI();
                alert('Data imported successfully!');
            } catch (err) {
                alert('Error importing data. Please check the file format.');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function clearAllData() {
    closeAccountSettings();
    openClearDataModal();
}

function openClearDataModal() {
    const existing = document.getElementById('clearDataModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'clearDataModal';
    modal.className = 'fixed inset-0 z-[300] flex items-center justify-center modal-backdrop';
    modal.innerHTML = `
        <div class="theme-bg rounded-2xl shadow-2xl w-full max-w-sm mx-4 border theme-border overflow-hidden modal-animate">
            <!-- Header -->
            <div class="px-6 py-5 border-b theme-border">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                        <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </div>
                    <div>
                        <h2 class="font-semibold text-base theme-text">${state.language==='ar' ? '\u0645\u0633\u062d \u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u062d\u0633\u0627\u0628' : 'Clear Account Data'}</h2>
                        <p class="text-xs theme-text-secondary mt-0.5">${state.language==='ar' ? '\u0627\u0644\u062d\u0633\u0627\u0628:' : 'Account:'} <span class="font-medium theme-text">${state.currentUser}</span></p>
                    </div>
                </div>
            </div>

            <!-- What will be deleted -->
            <div class="px-6 py-4 space-y-3">
                <p class="text-sm theme-text-secondary">${state.language==='ar' ? '\u0633\u064a\u062a\u0645 \u062d\u0630\u0641 \u0645\u0627 \u064a\u0644\u064a \u0646\u0647\u0627\u0626\u064a\u0627\u064b:' : 'This will permanently delete:'}</p>
                <div class="grid grid-cols-2 gap-2">
                    ${(state.language==='ar' ? [
                        ['📅','جميع الأحداث'],
                        ['📓','إدخالات اليومية'],
                        ['✅','المهام والأهداف'],
                        ['🌙','إعدادات الصلاة'],
                        ['📁','التقاويم المخصصة'],
                        ['🖼️','صورة الخلفية'],
                        ['📍','بيانات الموقع'],
                        ['⭐','سجل النقاط'],
                    ] : [
                        ['📅','All events'],
                        ['📓','Journal entries'],
                        ['✅','Tasks & goals'],
                        ['🌙','Prayer settings'],
                        ['📁','Custom calendars'],
                        ['🖼️','Background image'],
                        ['📍','Location data'],
                        ['⭐','Score history'],
                    ]).map(([icon, label]) => `
                        <div class="flex items-center space-x-2 text-sm theme-text-secondary">
                            <span>${icon}</span><span>${label}</span>
                        </div>`).join('')}
                </div>

                <!-- Warning box -->
                <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 mt-1">
                    <p class="text-xs text-red-700 dark:text-red-300 font-semibold">⚠ ${state.language==='ar' ? '\u0644\u0627 \u064a\u0645\u0643\u0646 \u0627\u0644\u062a\u0631\u0627\u062c\u0639.' : 'This cannot be undone.'}</p>
                    <p class="text-xs text-red-600 dark:text-red-400 mt-1">${state.language==='ar' ? '\u064a\u064f\u0646\u0635\u062d \u0628\u062a\u0635\u062f\u064a\u0631 \u0628\u064a\u0627\u0646\u0627\u062a\u0643 \u0623\u0648\u0644\u0627\u064b.' : 'Consider exporting your data first.'}</p>
                </div>

                <!-- Confirm input -->
                <div class="pt-1">
                    <label class="block text-xs font-medium theme-text-secondary mb-1.5">
                        ${state.language==='ar' ? '\u0627\u0643\u062a\u0628' : 'Type'} <span class="font-bold theme-text">${state.currentUser}</span> ${state.language==='ar' ? '\u0644\u0644\u062a\u0623\u0643\u064a\u062f' : 'to confirm'}
                    </label>
                    <input type="text" id="clearDataConfirmInput"
                        placeholder="${state.currentUser}"
                        class="w-full theme-bg-tertiary border theme-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 theme-text" dir="ltr"
                        oninput="checkClearDataReady()"
                        onkeydown="if(event.key==='Enter') executeClearData()">
                </div>
            </div>

            <!-- Actions -->
            <div class="px-6 pb-5 flex items-center space-x-3">
                <button onclick="closeClearDataModal()"
                    class="flex-1 py-2.5 rounded-xl border theme-border hover:theme-bg-tertiary transition-colors text-sm font-medium theme-text-secondary">
                    ${state.language==='ar' ? '\u0625\u0644\u063a\u0627\u0621' : 'Cancel'}
                </button>
                <button id="clearDataConfirmBtn" onclick="executeClearData()" disabled
                    class="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium transition-colors opacity-40 cursor-not-allowed">
                    ${state.language==='ar' ? '\u0645\u0633\u062d \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a' : 'Clear Data'}
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => {
        const input = document.getElementById('clearDataConfirmInput');
        if (input) input.focus();
    }, 50);
}

function checkClearDataReady() {
    const input = document.getElementById('clearDataConfirmInput');
    const btn = document.getElementById('clearDataConfirmBtn');
    if (!input || !btn) return;
    const ready = input.value === state.currentUser;
    btn.disabled = !ready;
    btn.classList.toggle('opacity-40', !ready);
    btn.classList.toggle('cursor-not-allowed', !ready);
    btn.classList.toggle('hover:bg-red-700', ready);
}

function closeClearDataModal() {
    const modal = document.getElementById('clearDataModal');
    if (modal) modal.remove();
}

function executeClearData() {
    const input = document.getElementById('clearDataConfirmInput');
    if (!input || input.value !== state.currentUser) return;

    const u = state.currentUser;
    const allKeys = [
        STORAGE_KEYS.EVENTS(u), STORAGE_KEYS.THEME(u), STORAGE_KEYS.BACKGROUND(u),
        STORAGE_KEYS.CALENDARS(u), STORAGE_KEYS.LOCATION(u), STORAGE_KEYS.PRAYER_TIMES_CACHE(u),
        STORAGE_KEYS.JOURNAL(u), STORAGE_KEYS.VARIABLES(u), STORAGE_KEYS.SHOW_PRAYER_TIMES(u),
        STORAGE_KEYS.TASKS(u), STORAGE_KEYS.FORGOTTEN(u), STORAGE_KEYS.RENDER_WINDOW(u),
        STORAGE_KEYS.PFP(u), STORAGE_KEYS.MONTHLY_BG(u), STORAGE_KEYS.CALENDAR_MODE(u),
        STORAGE_KEYS.HIJRI_OFFSETS(u)
    ];
    allKeys.forEach(k => removeFromStorage(k));

    // Reset in-memory state
    events = [];
    state.calendars = [...DEFAULT_CALENDARS];
    state.activeCalendars = DEFAULT_CALENDARS.map(c => c.id);
    state.backgroundImage = null;
    state.userLocation = null;
    state.prayerTimesCache = {};
    state.journalEntries = {};
    state.variables = {};
    state.tasks = { day: {}, week: {}, month: {}, year: {} };
    state.forgottenTasks = [];
    state.pfp = null;
    state.calendarMode = 'gregorian';
    state.hijriMonthOffsets = {};
    state.showPrayerTimesInView = false;

    closeClearDataModal();
    removeBackground();
    applyTheme('default', 'light');
    renderCurrentView();
    renderMiniCalendar();
    renderCalendarList();
    updateHeaderScores();

    // Show a brief success toast
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium px-5 py-3 rounded-full shadow-xl z-[400] transition-all';
    toast.textContent = state.language==='ar' ? '✓ تم مسح بيانات الحساب' : '✓ Account data cleared';
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 2500);
}

// UTILITIES

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

// KEYBOARD SHORTCUTS

function openVariableSettings() {
    let modal = $('variableSettingsModal');
    if (modal) { modal.remove(); return; }
    modal = document.createElement('div');
    modal.id = 'variableSettingsModal';
    modal.className = 'fixed inset-0 modal-backdrop flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="theme-bg rounded-2xl shadow-2xl w-full max-w-md modal-animate overflow-hidden border theme-border">
            <div class="px-6 py-4 border-b theme-border flex items-center justify-between">
                <h3 class="text-lg font-semibold">${t('journalVars')}</h3>
                <button onclick="closeVariableSettings()" class="theme-text-secondary hover:theme-text transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            </div>
            <div class="p-6 space-y-4">
                <p class="text-sm theme-text-secondary">${state.language==='ar' ? 'أنشئ متغيرات لاستخدامها في تعبيرات النقاط مثل:' : 'Create variables to use in score expressions like'} <code class="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded text-xs">work*2 + gym</code></p>
                <div class="flex space-x-2">
                    <input type="text" id="newVarName" placeholder="${state.language==='ar' ? 'الاسم (مثال: عمل)' : 'Name (e.g. work)'}"
                        class="flex-1 theme-bg-tertiary border theme-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 theme-text">
                    <input type="number" id="newVarValue" placeholder="${state.language==='ar' ? 'القيمة' : 'Value'}" step="any"
                        class="w-24 theme-bg-tertiary border theme-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 theme-text">
                    <button onclick="addVariable()" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">${t('add')}</button>
                </div>
                <div id="variableListContainer" class="space-y-2 max-h-60 overflow-y-auto"></div>
                <div class="flex justify-end pt-4 border-t theme-border">
                    <button onclick="closeVariableSettings()" class="px-4 py-2 text-sm font-medium theme-text-secondary hover:theme-bg-tertiary rounded-lg transition-colors">${state.language==='ar' ? 'تم' : 'Done'}</button>
                </div>
            </div>
        </div>`;
    document.body.appendChild(modal);
    renderVariableList();
    modal.addEventListener('click', e => { if (e.target === modal) closeVariableSettings(); });
}

function closeVariableSettings() { $('variableSettingsModal')?.remove(); }

function renderVariableList() {
    const container = $('variableListContainer');
    if (!container) return;
    if (Object.keys(state.variables).length === 0) {
        container.innerHTML = `<p class="text-sm theme-text-secondary text-center py-4">${state.language==='ar' ? 'لا توجد متغيرات بعد. أضف متغيراً أعلاه!' : 'No variables yet. Add one above!'}</p>`;
        return;
    }
    container.innerHTML = Object.entries(state.variables).map(([name, value]) => `
        <div class="flex items-center justify-between p-3 theme-bg-tertiary rounded-lg">
            <div class="flex items-center space-x-3">
                <code class="text-sm font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">${name}</code>
                <span class="text-sm theme-text">= ${value}</span>
            </div>
            <button onclick="deleteVariable('${name}')" class="text-red-500 hover:text-red-600 p-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
        </div>`).join('');
}

function addVariable() {
    const nameInput = $('newVarName'), valueInput = $('newVarValue');
    const name = nameInput?.value?.trim().toLowerCase();
    const value = parseFloat(valueInput?.value);
    if (!name || isNaN(value)) { alert('Please enter both a name and a numeric value'); return; }
    if (!/^[a-z_][a-z0-9_]*$/.test(name)) { alert('Name must start with a letter and contain only letters, numbers, and underscores'); return; }
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

function handleKeyboardShortcuts(e) {
    if (e.key === 'Escape') {
        document.getElementById('eventDetailsModal')?.remove();
        closeModal(); closeCalendarEditModal(); closeBackgroundSettings();
        closeUserMenu(); closeSettings(); closeLocationSettings(); closeForgottenTasks(); closeEditSeriesModal(); closeRenderWindowSettings();
        const djp = document.getElementById('dateJumpPopover'); if (djp) djp.remove();
        closeThemePicker(); closeVariableSettings();
        closeDeleteSeriesSheet(); closeSearchModal();
        closeAddAccountModal(); closeDeleteAccountModal();
        closeAddCalendarModal();
        $('viewAllTasksModal')?.remove();
        $('clearDataModal')?.remove();
        $('hijriSightingPanel')?.remove();
        closeAccountSettings();
        if (state.currentDaySidebar) closeDaySidebar();
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
        const modalOpen = $('eventModal')?.classList.contains('flex')
            || document.getElementById('deleteSeriesSheet');
        if (!typing && !modalOpen) {
            e.preventDefault();
            e.key === 'ArrowLeft' ? navigatePrev() : navigateNext();
        }
    }
}

// INITIALIZATION

function setupEventListeners() {
    // Modal backdrop close
    document.getElementById('eventModal').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
    document.getElementById('calendarEditModal').addEventListener('click', e => { if (e.target === e.currentTarget) closeCalendarEditModal(); });
    document.getElementById('backgroundModal').addEventListener('click', e => { if (e.target === e.currentTarget) closeBackgroundSettings(); });

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
        // legacy menus — safe-guard
        if (userMenu && !userMenu.contains(e.target) && !userBtn?.contains(e.target)) userMenu.classList.add('hidden');
        if (settingsMenu && !settingsMenu.contains(e.target) && !settingsBtn?.contains(e.target)) settingsMenu.classList.add('hidden');
    });

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
            $('repeatCount')?.classList.toggle('hidden', e.target.value !== 'after');
            $('repeatEndDate')?.classList.toggle('hidden', e.target.value !== 'on');
        });
    }

    document.querySelectorAll('.repeat-day-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('bg-blue-500');
            btn.classList.toggle('text-white');
            btn.classList.toggle('border-blue-500');
        });
    });

    // All-day toggle
    document.getElementById('allDayToggle')?.addEventListener('click', toggleAllDay);

    initResizeHandlers();

    // ── Touch swipe navigation ────────────────────────────────────────────────
    // Swipe left = next, swipe right = prev
    // Works on all main view containers
    const swipeTargets = ['weekView', 'monthView', 'yearView', 'dayView'];
    swipeTargets.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        let touchStartX = 0;
        let touchStartY = 0;
        let touchStartTime = 0;

        el.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
        }, { passive: true });

        el.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;
            const dt = Date.now() - touchStartTime;

            // Must be: fast enough (<400ms), horizontal dominant, and far enough (>50px)
            const isHorizontal = Math.abs(dx) > Math.abs(dy) * 1.5;
            const isFarEnough  = Math.abs(dx) > 50;
            const isFastEnough = dt < 400;

            if (isHorizontal && isFarEnough && isFastEnough) {
                if (dx < 0) {
                    // Swipe left → go forward
                    navigateNext();
                } else {
                    // Swipe right → go back
                    navigatePrev();
                }
            }
        }, { passive: true });
    });
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
function initBackHandler() {
    history.pushState({ uwuApp: true }, '');
    window.addEventListener('popstate', function(e) {
        // If any modal/panel is open, close it and push state again
        const anyOpen = document.getElementById('themePickerModal') ||
            document.getElementById('accountSettingsPanel') ||
            document.getElementById('dateJumpPopover') ||
            document.getElementById('eventDetailsModal') ||
            $('forgottenTasksModal')?.classList.contains('hidden') === false ||
            $('renderWindowModal')?.classList.contains('hidden') === false ||
            $('editSeriesModal')?.classList.contains('hidden') === false ||
            $('locationModal')?.classList.contains('hidden') === false ||
            $('eventModal')?.classList.contains('hidden') === false;

        if (anyOpen) {
            // Close everything
            closeModal();
            closeThemePicker();
            closeAccountSettings();
            document.getElementById('eventDetailsModal')?.remove();
            const djp = document.getElementById('dateJumpPopover'); if (djp) djp.remove();
            closeForgottenTasks();
            closeRenderWindowSettings();
            closeEditSeriesModal();
            closeLocationSettings();
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
            // Second press — actually go back / exit PWA
            _backPressCount = 0;
            history.back();
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    loadUsers();
    loadAllData();
    if (state.language === 'ar') applyLanguage();
    await initLocation();
    renderWeekView();
    renderMiniCalendar();
    updateTimeIndicator();
    setInterval(updateTimeIndicator, 60000);
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
