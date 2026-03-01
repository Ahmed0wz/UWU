// ============================================================
// CAL AI — ai.js
// Powered by Anthropic claude-sonnet-4-20250514 via API
// Tool-use for reliable calendar actions (no fragile JSON parsing)
// API key stored in localStorage — never sent anywhere except Anthropic
// ============================================================

const CAL_AI_KEY_STORAGE = 'calendar_ai_api_key';

const calAI = {
    open:    false,
    history: [],        // { role, content }[]
    busy:    false
};

// ── TOOL DEFINITIONS sent to Claude ─────────────────────────────────────────
const CAL_TOOLS = [
    {
        name: 'create_event',
        description: 'Create a new calendar event. Use this whenever the user asks to add, schedule, or create an event.',
        input_schema: {
            type: 'object',
            properties: {
                title:     { type: 'string',  description: 'Event title' },
                date:      { type: 'string',  description: 'Date in YYYY-MM-DD format' },
                startTime: { type: 'string',  description: 'Start time HH:MM (24h). Omit if all-day.' },
                endTime:   { type: 'string',  description: 'End time HH:MM (24h). Omit if all-day.' },
                isAllDay:  { type: 'boolean', description: 'True if this is an all-day event' },
                calendar:  { type: 'string',  description: 'Calendar id: personal, work, birthdays, reminders, or any custom calendar id' },
                color:     { type: 'string',  description: 'Color: blue, purple, green, orange, red, pink, yellow, teal, indigo, cyan, lime, gray' },
                points:    { type: 'number',  description: 'Optional point value for scoring' },
                repeat:    { type: 'string',  description: 'Repeat: none, daily, weekly, monthly, yearly' }
            },
            required: ['title', 'date']
        }
    },
    {
        name: 'add_todo',
        description: 'Add a task/todo item for a given scope (day/week/month/year).',
        input_schema: {
            type: 'object',
            properties: {
                text:   { type: 'string', description: 'Task text' },
                scope:  { type: 'string', description: 'day | week | month | year' },
                date:   { type: 'string', description: 'Reference date YYYY-MM-DD (defaults to today)' },
                points: { type: 'number', description: 'Optional points for this task' }
            },
            required: ['text']
        }
    },
    {
        name: 'add_calendar',
        description: 'Create a new calendar (category) for grouping events.',
        input_schema: {
            type: 'object',
            properties: {
                name:  { type: 'string', description: 'Calendar name' },
                color: { type: 'string', description: 'Color id: blue, purple, green, orange, red, pink, yellow, teal, indigo, cyan, lime, gray' }
            },
            required: ['name']
        }
    },
    {
        name: 'change_theme',
        description: 'Change the app appearance theme and/or dark/light mode.',
        input_schema: {
            type: 'object',
            properties: {
                themeId: { type: 'string',  description: 'Theme id: default, discord, midnight, forest, sunset, rose, slate' },
                dark:    { type: 'boolean', description: 'true = dark mode, false = light mode. Omit to leave unchanged.' }
            },
            required: []
        }
    },
    {
        name: 'switch_view',
        description: 'Switch the calendar view.',
        input_schema: {
            type: 'object',
            properties: {
                view: { type: 'string', description: 'day | week | month | year' }
            },
            required: ['view']
        }
    },
    {
        name: 'navigate_to_date',
        description: 'Navigate the calendar to a specific date.',
        input_schema: {
            type: 'object',
            properties: {
                date: { type: 'string', description: 'YYYY-MM-DD' }
            },
            required: ['date']
        }
    },
    {
        name: 'save_journal',
        description: 'Save a journal entry (title + content) for a specific day.',
        input_schema: {
            type: 'object',
            properties: {
                date:    { type: 'string', description: 'YYYY-MM-DD. Defaults to today.' },
                title:   { type: 'string', description: 'Journal entry title' },
                content: { type: 'string', description: 'Journal entry body' }
            },
            required: ['content']
        }
    },
    {
        name: 'get_schedule',
        description: 'Retrieve events for a date range to answer questions about the schedule.',
        input_schema: {
            type: 'object',
            properties: {
                from: { type: 'string', description: 'Start date YYYY-MM-DD' },
                to:   { type: 'string', description: 'End date YYYY-MM-DD' }
            },
            required: ['from', 'to']
        }
    }
];

// ── EXECUTE TOOLS ─────────────────────────────────────────────────────────────
function executeCalTool(name, input) {
    const today = window.dateToLocalString ? window.dateToLocalString(new Date()) : new Date().toISOString().slice(0, 10);

    switch (name) {

        case 'create_event': {
            const ev = {
                id:        Date.now(),
                title:     input.title,
                date:      input.date || today,
                isAllDay:  input.isAllDay || false,
                startTime: input.startTime || '09:00',
                endTime:   input.endTime   || '10:00',
                calendar:  input.calendar  || 'personal',
                color:     input.color     || (() => {
                    const cal = (window.state?.calendars || []).find(c => c.id === (input.calendar || 'personal'));
                    return cal?.color || 'blue';
                })(),
                points:    input.points    || 0,
                repeat:    input.repeat    || 'none',
                completed: false
            };
            window.events.push(ev);
            window.saveEvents?.();
            window.renderCurrentView?.();
            window.renderMiniCalendar?.();
            window.updateHeaderScores?.();
            return { ok: true, message: `Event "${ev.title}" added on ${ev.date}${ev.isAllDay ? ' (all day)' : ' at ' + ev.startTime}` };
        }

        case 'add_todo': {
            const scope  = input.scope || 'day';
            const date   = input.date  || today;
            const points = input.points || 0;
            if (window.addTodo) {
                window.addTodo(scope, date, input.text, points);
                window.renderCurrentView?.();
                return { ok: true, message: `Task "${input.text}" added to ${scope} list` };
            }
            return { ok: false, message: 'addTodo not available' };
        }

        case 'add_calendar': {
            const colors = ['blue','purple','green','orange','red','pink','yellow','teal','indigo','cyan','lime','gray'];
            const color  = input.color || colors[Math.floor(Math.random() * colors.length)];
            const id     = 'cal_' + Date.now();
            window.state.calendars.push({ id, name: input.name, color });
            window.state.activeCalendars.push(id);
            window.saveCalendars?.();
            const key = window.STORAGE_KEYS?.CALENDARS?.(window.state.currentUser) + '_active';
            if (key) window.saveToStorage?.(key, window.state.activeCalendars);
            window.renderCalendarList?.();
            return { ok: true, message: `Calendar "${input.name}" created with ${color} color` };
        }

        case 'change_theme': {
            const themeId = input.themeId || window.state?.currentTheme || 'default';
            const dark    = input.dark !== undefined ? input.dark : window.state?.isDarkMode;
            window.applyTheme?.(themeId, dark ? 'dark' : 'light');
            return { ok: true, message: `Theme set to ${themeId} in ${dark ? 'dark' : 'light'} mode` };
        }

        case 'switch_view': {
            window.switchView?.(input.view);
            return { ok: true, message: `Switched to ${input.view} view` };
        }

        case 'navigate_to_date': {
            window.state.currentDate = new Date(input.date + 'T12:00:00');
            window.renderCurrentView?.();
            window.renderMiniCalendar?.();
            return { ok: true, message: `Navigated to ${input.date}` };
        }

        case 'save_journal': {
            const date = input.date || today;
            if (!window.state.journalEntries[date]) window.state.journalEntries[date] = {};
            if (input.title)   window.state.journalEntries[date].title   = input.title;
            if (input.content) window.state.journalEntries[date].content = input.content;
            window.saveJournal?.();
            window.renderCurrentView?.();
            window.updateHeaderScores?.();
            return { ok: true, message: `Journal entry saved for ${date}` };
        }

        case 'get_schedule': {
            const evs = (window.events || [])
                .filter(e => e.date >= input.from && e.date <= input.to)
                .sort((a, b) => a.date.localeCompare(b.date))
                .map(e => `[${e.date}] ${e.isAllDay ? 'All day' : e.startTime + '-' + e.endTime}: "${e.title}" (${e.calendar}${e.points ? ', ' + e.points + 'pts' : ''}${e.completed ? ', done' : ''})`);
            return { ok: true, events: evs, count: evs.length };
        }

        default:
            return { ok: false, message: 'Unknown tool: ' + name };
    }
}

// ── SYSTEM PROMPT ─────────────────────────────────────────────────────────────
function buildSystemPrompt() {
    const s      = window.state  || {};
    const evts   = window.events || [];
    const today  = new Date();
    const todayStr = today.toISOString().slice(0, 10);
    const viewStr  = window.dateToLocalString?.(s.currentDate) || todayStr;

    // Upcoming events next 14 days
    const upcoming = evts
        .filter(e => e.date >= todayStr)
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 25)
        .map(e => `  • [${e.date}] ${e.isAllDay ? 'all-day' : e.startTime + '–' + e.endTime} "${e.title}" [${e.calendar}]${e.points ? ' +' + e.points + 'pts' : ''}${e.completed ? ' ✓' : ''}`)
        .join('\n') || '  (none)';

    // Recent journal (last 7 entries)
    const journal = Object.entries(s.journalEntries || {})
        .sort(([a], [b]) => b.localeCompare(a))
        .slice(0, 7)
        .map(([d, j]) => `  • [${d}] score:${j.score ?? 'n/a'}${j.title ? ' "' + j.title + '"' : ''}`)
        .join('\n') || '  (none)';

    // Month + alltime scores
    const monthKey   = todayStr.slice(0, 7);
    const monthScore = Object.entries(s.journalEntries || {})
        .filter(([d]) => d.startsWith(monthKey))
        .reduce((sum, [, j]) => sum + (j.score || 0), 0);
    const allTime = Object.values(s.journalEntries || {}).reduce((sum, j) => sum + (j.score || 0), 0);

    // Calendars
    const calList = (s.calendars || []).map(c => `${c.name} (id:${c.id}, color:${c.color})`).join(', ');

    // Todos today
    const todayTodos = (window.getTodos?.('day', todayStr) || [])
        .map(t => `  • [${t.completed ? 'x' : ' '}] ${t.text}${t.points ? ' +' + t.points + 'pts' : ''}`)
        .join('\n') || '  (none)';

    return `You are Cal, a smart and friendly personal calendar assistant embedded in the user's calendar PWA.
Today is ${todayStr} (${today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}).
User is currently viewing: ${viewStr} in ${s.currentView || 'week'} view.
Theme: ${s.currentTheme || 'default'} | Mode: ${s.isDarkMode ? 'dark' : 'light'} | User: ${s.currentUser || 'default'}

CALENDARS: ${calList || 'none'}

UPCOMING EVENTS (next 14 days):
${upcoming}

TODAY'S TASKS:
${todayTodos}

SCORES — This month: ${monthScore} pts | All-time: ${allTime} pts

RECENT JOURNAL:
${journal}

SCORE VARIABLES: ${Object.entries(s.variables || {}).map(([k, v]) => k + '=' + v).join(', ') || 'none'}

AVAILABLE THEMES: default, discord, midnight, forest, sunset, rose, slate
AVAILABLE COLORS: blue, purple, green, orange, red, pink, yellow, teal, indigo, cyan, lime, gray
AVAILABLE VIEWS: day, week, month, year

INSTRUCTIONS:
- Be friendly, concise, and helpful. Use **bold** for emphasis.
- When the user asks to add/create/schedule something, use the create_event tool immediately — do not just describe it.
- When the user asks to change the theme/mode, use change_theme immediately.
- When the user asks to switch view or navigate, use switch_view / navigate_to_date.
- When the user asks to add a task or todo, use add_todo.
- When the user wants a new calendar category, use add_calendar.
- When the user asks about their schedule, use get_schedule to fetch accurate data.
- You can chain multiple tools in one response (e.g. create event + switch to day view).
- For journal help, write the content and use save_journal to actually save it.
- Keep responses under 120 words unless the user asks for detail.`;
}

// ── CALL ANTHROPIC API ────────────────────────────────────────────────────────
async function callAnthropic(messages) {
    const apiKey = loadAIKey();
    if (!apiKey) throw new Error('NO_KEY');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type':      'application/json',
            'x-api-key':         apiKey,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model:      'claude-sonnet-4-20250514',
            max_tokens: 1024,
            system:     buildSystemPrompt(),
            tools:      CAL_TOOLS,
            messages
        })
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        if (response.status === 401) throw new Error('INVALID_KEY');
        throw new Error(err.error?.message || `API error ${response.status}`);
    }
    return response.json();
}

// ── SEND MESSAGE (handles multi-turn tool loop) ───────────────────────────────
window.calAISend = async function () {
    if (calAI.busy) return;
    const input = document.getElementById('calAIInput');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    if (!loadAIKey()) { promptForKey(); return; }

    input.value = '';
    _setSendDisabled(true);
    calAI.busy = true;

    _appendUserMessage(text);
    calAI.history.push({ role: 'user', content: text });

    const typingId = _appendTyping();

    try {
        // Keep a working copy of messages for this turn (supports tool loops)
        const workingMessages = [...calAI.history];
        let finalText = '';
        const executedActions = [];

        // Agentic tool-use loop — Claude may call tools multiple times
        while (true) {
            const resp = await callAnthropic(workingMessages);

            if (resp.stop_reason === 'end_turn' || !resp.content?.some(b => b.type === 'tool_use')) {
                // Final text response
                finalText = resp.content
                    .filter(b => b.type === 'text')
                    .map(b => b.text)
                    .join('\n')
                    .trim();
                // Add assistant message to history
                calAI.history.push({ role: 'assistant', content: resp.content });
                break;
            }

            // There are tool_use blocks — execute them
            const assistantContent = resp.content;
            workingMessages.push({ role: 'assistant', content: assistantContent });

            const toolResults = [];
            for (const block of assistantContent) {
                if (block.type !== 'tool_use') continue;
                const result = executeCalTool(block.name, block.input);
                executedActions.push({ tool: block.name, input: block.input, result });
                toolResults.push({
                    type:        'tool_result',
                    tool_use_id: block.id,
                    content:     JSON.stringify(result)
                });
            }
            workingMessages.push({ role: 'user', content: toolResults });
            // Update history too
            calAI.history.push({ role: 'assistant', content: assistantContent });
            calAI.history.push({ role: 'user',      content: toolResults });
        }

        _removeTyping(typingId);
        _appendAIMessage(finalText || "Done!", executedActions);

    } catch (err) {
        _removeTyping(typingId);
        if (err.message === 'NO_KEY' || err.message === 'INVALID_KEY') {
            _appendAIMessage(err.message === 'INVALID_KEY'
                ? '❌ **Invalid API key.** Tap the 🔑 icon to update it.'
                : '🔑 **No API key set.** Tap the 🔑 icon to add your Anthropic API key.');
        } else if (err.message?.includes('Failed to fetch')) {
            _appendAIMessage('❌ **Network error.** Make sure you\'re connected and the API is reachable.');
        } else {
            _appendAIMessage('❌ **Error:** ' + err.message);
        }
    }

    calAI.busy = false;
    _setSendDisabled(false);
    _focusInput();
};

window.calAISendSuggestion = function (btn) {
    const text = btn.dataset.prompt || btn.textContent.replace(/^[^\w]+/, '').trim();
    document.getElementById('calAISuggestions')?.classList.add('hidden');
    document.getElementById('calAIInput').value = text;
    window.calAISend();
};

// ── PANEL TOGGLE ──────────────────────────────────────────────────────────────
window.toggleCalAI = function () {
    calAI.open = !calAI.open;
    const panel = document.getElementById('calAIPanel');
    if (!panel) return;

    if (calAI.open) {
        panel.classList.remove('hidden');
        _showChat();
        if (calAI.history.length === 0) _appendWelcome();
        _focusInput();
    } else {
        panel.classList.add('hidden');
    }
};

// Close on outside click
document.addEventListener('click', e => {
    if (!calAI.open) return;
    const panel = document.getElementById('calAIPanel');
    const btn   = document.getElementById('calAIBtn');
    if (panel && btn && !panel.contains(e.target) && !btn.contains(e.target)) {
        calAI.open = false;
        panel.classList.add('hidden');
    }
});

// ── KEY MANAGEMENT ────────────────────────────────────────────────────────────
function loadAIKey() {
    // Use app's file-based storage (DB) so API key is in the same file
    if (typeof loadFromStorage === 'function') return loadFromStorage(CAL_AI_KEY_STORAGE) || '';
    try { return localStorage.getItem(CAL_AI_KEY_STORAGE) || ''; } catch { return ''; }
}
function saveAIKey(key) {
    if (typeof saveToStorage === 'function') { saveToStorage(CAL_AI_KEY_STORAGE, key); return; }
    try { localStorage.setItem(CAL_AI_KEY_STORAGE, key); } catch {}
}

window.promptForKey = function () {
    const current = loadAIKey();
    const key = prompt(
        (current ? 'Update your Anthropic API key.\n' : 'Enter your Anthropic API key to use Cal AI.\n') +
        'Get one free at: console.anthropic.com\n\nYour key is stored only on this device.',
        current
    );
    if (key === null) return;
    if (key.trim().startsWith('sk-ant-')) {
        saveAIKey(key.trim());
        _setStatusDot('ready');
        _appendAIMessage('✅ **API key saved!** Ask me anything.');
    } else if (key.trim() === '') {
        saveAIKey('');
        _setStatusDot('idle');
        _appendAIMessage('⚠️ API key cleared.');
    } else {
        alert('That doesn\'t look like a valid Anthropic API key (should start with sk-ant-).\nPlease try again.');
    }
};

window.clearCalAIChat = function () {
    calAI.history = [];
    const msgs = document.getElementById('calAIChatMessages');
    if (msgs) msgs.innerHTML = '';
    _appendWelcome();
};

// ── DOM HELPERS ───────────────────────────────────────────────────────────────
function _showChat() {
    ['calAILoader', 'calAINoGPU'].forEach(id => document.getElementById(id)?.classList.add('hidden'));
    const chat = document.getElementById('calAIChat');
    if (chat) { chat.classList.remove('hidden'); chat.classList.add('flex'); }
    _setStatusDot(loadAIKey() ? 'ready' : 'idle');
}

function _appendWelcome() {
    _appendAIMessage(
        "Hi! I'm **Cal**, your calendar assistant ✦\n\n" +
        "I can **add events**, **create calendars**, **change themes**, " +
        "**manage tasks**, **write journal entries**, and answer questions about your schedule.\n\n" +
        (loadAIKey() ? "What can I help you with?" : "Tap 🔑 to add your API key and get started.")
    );
}

function _appendUserMessage(text) {
    const container = document.getElementById('calAIChatMessages');
    if (!container) return;
    const div = document.createElement('div');
    div.className = 'cal-msg-user';
    div.innerHTML = `<div class="cal-bubble">${_escHtml(text)}</div>`;
    container.appendChild(div);
    _scrollBottom();
}

function _appendAIMessage(text, actions = []) {
    const container = document.getElementById('calAIChatMessages');
    if (!container) return;
    const div = document.createElement('div');
    div.className = 'cal-msg-ai';

    // Action chips
    const chips = actions.map(a => {
        const label = _actionLabel(a.tool, a.input, a.result);
        const ok    = a.result?.ok !== false;
        return `<div class="cal-action-chip ${ok ? 'cal-action-ok' : 'cal-action-err'}">
            <span>${ok ? '✓' : '✗'}</span> ${_escHtml(label)}
        </div>`;
    }).join('');

    div.innerHTML = `
        <div class="cal-avatar">✦</div>
        <div class="cal-bubble-wrap">
            <div class="cal-bubble">${_renderMd(text)}</div>
            ${chips}
        </div>`;
    container.appendChild(div);
    _scrollBottom();
}

function _actionLabel(tool, input, result) {
    if (result?.message) return result.message;
    const labels = {
        create_event:   () => `Added "${input.title}" on ${input.date}`,
        add_todo:       () => `Task added: "${input.text}"`,
        add_calendar:   () => `Calendar "${input.name}" created`,
        change_theme:   () => `Theme → ${input.themeId || 'unchanged'}${input.dark !== undefined ? (input.dark ? ' dark' : ' light') : ''}`,
        switch_view:    () => `Switched to ${input.view} view`,
        navigate_to_date: () => `Navigated to ${input.date}`,
        save_journal:   () => `Journal saved for ${input.date || 'today'}`,
        get_schedule:   () => `Fetched ${result?.count || 0} events`
    };
    return (labels[tool] || (() => tool))();
}

function _appendTyping() {
    const container = document.getElementById('calAIChatMessages');
    if (!container) return null;
    const id = 'cal-typing-' + Date.now();
    const div = document.createElement('div');
    div.id = id;
    div.className = 'cal-msg-ai cal-typing';
    div.innerHTML = `
        <div class="cal-avatar">✦</div>
        <div class="cal-bubble">
            <div class="cal-typing-dot"></div>
            <div class="cal-typing-dot"></div>
            <div class="cal-typing-dot"></div>
        </div>`;
    container.appendChild(div);
    _scrollBottom();
    return id;
}

function _removeTyping(id) { document.getElementById(id)?.remove(); }
function _scrollBottom()   { const el = document.getElementById('calAIChatMessages'); if (el) el.scrollTop = el.scrollHeight; }
function _focusInput()     { setTimeout(() => document.getElementById('calAIInput')?.focus(), 50); }
function _setSendDisabled(d) {
    const btn = document.getElementById('calAISendBtn');
    const inp = document.getElementById('calAIInput');
    if (btn) { btn.disabled = d; btn.style.opacity = d ? '0.4' : '1'; }
    if (inp) inp.disabled = d;
}
function _setStatusDot(s) {
    const dot = document.getElementById('calAIStatusDot');
    if (!dot) return;
    dot.className = 'w-2 h-2 rounded-full absolute -top-0.5 -right-0.5';
    if (s === 'ready')   dot.classList.add('bg-green-500');
    else if (s === 'loading') { dot.classList.add('bg-yellow-500'); dot.style.animation = 'calPulse 1.2s infinite'; }
    else if (s === 'error')   dot.classList.add('bg-red-500');
    else                      dot.classList.add('bg-gray-400');
}

function _renderMd(text) {
    return _escHtml(text)
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
}
function _escHtml(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// ── INIT — set correct dot state on load ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    _setStatusDot(loadAIKey() ? 'ready' : 'idle');
});
