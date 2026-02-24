// Mendix Trainer - Main Application (Production v1.1.0)
// Zero dependencies, pure vanilla JS

// ============ CONSTANTS ============
const APP_VERSION = '1.1.0';
const EXAM_QUESTION_COUNT = 50;
const PRACTICE_COUNT = 20;
const PASS_THRESHOLD = 75;
const MASTERY_STREAK = 3;
const EXAM_TIME = { intermediate: 90 * 60, advanced: 120 * 60 }; // seconds
const TIMER_WARN_5MIN = 300;
const TIMER_WARN_1MIN = 60;

// ============ STATE ============
const state = {
    screen: 'home',
    exam: null,           // 'intermediate' or 'advanced'
    category: null,       // category key or 'all' or 'exam'
    questions: [],        // current quiz questions
    questionIndex: 0,
    selectedAnswer: null,
    answered: false,
    sessionCorrect: 0,
    sessionTotal: 0,
    sessionAnswers: [],   // { questionId, selected, correct, isCorrect }
    timerSeconds: 0,
    timerInterval: null,
    timerWarned5: false,
    timerWarned1: false,
    showAbout: false,
};

// ============ AUDIO (Web Audio API for timer beeps) ============
let audioCtx = null;

function playBeep(frequency, duration) {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
        // Audio nicht verfuegbar -- stille Fortsetzung
    }
}

function playWarningBeep() {
    playBeep(880, 0.3);
}

function playCriticalBeep() {
    playBeep(1200, 0.15);
    setTimeout(() => playBeep(1200, 0.15), 200);
}

// ============ PERSISTENCE ============
const STORAGE_KEY = 'mendix-trainer-progress';

function loadProgress() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch { return {}; }
}

function saveProgress(progress) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
        console.warn('LocalStorage voll, Fortschritt konnte nicht gespeichert werden');
    }
}

function getQuestionProgress(questionId) {
    const progress = loadProgress();
    return progress[questionId] || { attempts: 0, correct: 0, lastSeen: 0, streak: 0 };
}

function recordAnswer(questionId, isCorrect) {
    const progress = loadProgress();
    const q = progress[questionId] || { attempts: 0, correct: 0, lastSeen: 0, streak: 0 };
    q.attempts++;
    if (isCorrect) {
        q.correct++;
        q.streak++;
    } else {
        q.streak = 0;
    }
    q.lastSeen = Date.now();
    progress[questionId] = q;
    saveProgress(progress);
}

// ============ QUESTION HELPERS ============
function getQuestions(exam) {
    if (exam === 'intermediate' && typeof INTERMEDIATE_QUESTIONS !== 'undefined') return INTERMEDIATE_QUESTIONS;
    if (exam === 'advanced' && typeof ADVANCED_QUESTIONS !== 'undefined') return ADVANCED_QUESTIONS;
    return [];
}

function getTotalQuestionCount() {
    const intCount = typeof INTERMEDIATE_QUESTIONS !== 'undefined' ? INTERMEDIATE_QUESTIONS.length : 0;
    const advCount = typeof ADVANCED_QUESTIONS !== 'undefined' ? ADVANCED_QUESTIONS.length : 0;
    return { intermediate: intCount, advanced: advCount, total: intCount + advCount };
}

function examColor(exam) {
    return exam === 'intermediate' ? 'mendix-blue' : 'mendix-purple';
}

function getCategories(exam) {
    const questions = getQuestions(exam);
    const cats = {};
    questions.forEach(q => {
        if (!cats[q.category]) {
            cats[q.category] = { key: q.category, label: q.categoryLabel, count: 0 };
        }
        cats[q.category].count++;
    });
    return Object.values(cats);
}

function getCategoryProgress(exam, categoryKey) {
    const progress = loadProgress();
    const questions = getQuestions(exam).filter(q => categoryKey === 'all' || q.category === categoryKey);
    let answered = 0, correct = 0, mastered = 0;
    questions.forEach(q => {
        const p = progress[q.id];
        if (p && p.attempts > 0) {
            answered++;
            if (p.correct > 0) correct++;
            if (p.streak >= MASTERY_STREAK) mastered++;
        }
    });
    return { total: questions.length, answered, correct, mastered };
}

function getExamProgress(exam) {
    return getCategoryProgress(exam, 'all');
}

function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function selectQuestions(exam, categoryKey, count) {
    let questions = getQuestions(exam);
    if (categoryKey !== 'all' && categoryKey !== 'exam') {
        questions = questions.filter(q => q.category === categoryKey);
    }

    const progress = loadProgress();

    // Spaced repetition: prioritize questions with low streak or never seen
    const scored = questions.map(q => {
        const p = progress[q.id] || { attempts: 0, streak: 0, lastSeen: 0 };
        let priority = 100;
        if (p.streak >= MASTERY_STREAK) priority = 10;      // mastered
        else if (p.streak >= MASTERY_STREAK - 1) priority = 30;  // learning
        else if (p.attempts > 0 && p.streak === 0) priority = 150; // got wrong recently
        else if (p.attempts === 0) priority = 120; // never seen
        // Add time decay
        const hoursSince = (Date.now() - p.lastSeen) / (1000 * 60 * 60);
        priority += Math.min(hoursSince * 2, 50);
        return { question: q, priority };
    });

    // Sort by priority (highest first), then shuffle within similar priorities
    scored.sort((a, b) => b.priority - a.priority);

    const selected = scored.slice(0, count || questions.length).map(s => s.question);
    return shuffleArray(selected);
}

// ============ NAVIGATION ============
function navigate(screen, params = {}) {
    Object.assign(state, {
        screen,
        ...params,
        selectedAnswer: null,
        answered: false,
    });
    render();
    window.scrollTo(0, 0);
}

// ============ RENDERING (with error boundary) ============
function render() {
    const app = document.getElementById('app');
    try {
        switch (state.screen) {
            case 'home': app.innerHTML = renderHome(); break;
            case 'categories': app.innerHTML = renderCategories(); break;
            case 'quiz': app.innerHTML = renderQuiz(); break;
            case 'results': app.innerHTML = renderResults(); break;
            case 'stats': app.innerHTML = renderStats(); break;
            default: app.innerHTML = renderHome(); break;
        }
    } catch (error) {
        console.error('Render-Fehler:', error);
        app.innerHTML = renderError(error);
    }
}

function renderError(error) {
    return `
    <div class="fade-in text-center py-16">
        <div class="text-5xl mb-4">\u26A0\uFE0F</div>
        <h2 class="text-2xl font-bold text-mendix-red mb-2">Etwas ist schiefgelaufen</h2>
        <p class="text-gray-400 mb-6 max-w-md mx-auto">
            Ein unerwarteter Fehler ist aufgetreten. Dein Fortschritt ist gespeichert.
        </p>
        <pre class="text-xs text-gray-600 bg-gray-900 rounded-lg p-4 mb-6 max-w-lg mx-auto text-left overflow-x-auto">${escapeHtml(error.message || 'Unbekannter Fehler')}</pre>
        <div class="space-x-3">
            <button onclick="navigate('home')" class="bg-mendix-blue hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl transition">
                Zur Startseite
            </button>
            <button onclick="location.reload()" class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition">
                Seite neu laden
            </button>
        </div>
    </div>`;
}

// ============ FOOTER ============
function renderFooter() {
    const counts = getTotalQuestionCount();
    return `
    <div class="app-footer text-center text-xs text-gray-600 pb-4 mt-8">
        <span>Mendix Trainer v${APP_VERSION}</span>
        <span class="mx-2">\u00B7</span>
        <span>${counts.total} Fragen (${counts.intermediate} Intermediate, ${counts.advanced} Advanced)</span>
    </div>`;
}

// ============ HOME SCREEN ============
function renderHome() {
    const intProgress = getExamProgress('intermediate');
    const advProgress = getExamProgress('advanced');
    const progress = loadProgress();
    const totalAnswered = Object.values(progress).filter(p => p.attempts > 0).length;
    const totalCorrect = Object.values(progress).reduce((sum, p) => sum + p.correct, 0);
    const totalAttempts = Object.values(progress).reduce((sum, p) => sum + p.attempts, 0);
    const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

    return `
    <div class="fade-in">
        <div class="text-center mb-8">
            <h1 class="text-4xl font-bold mb-2">
                <span class="text-mendix-blue">Mendix</span> Trainer
            </h1>
            <p class="text-gray-400">Intermediate &amp; Advanced Zertifizierung bestehen</p>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div class="bg-gray-900 rounded-xl p-4 text-center border border-gray-800">
                <div class="text-2xl font-bold text-mendix-blue">${totalAnswered}</div>
                <div class="text-xs text-gray-500">Fragen bearbeitet</div>
            </div>
            <div class="bg-gray-900 rounded-xl p-4 text-center border border-gray-800">
                <div class="text-2xl font-bold text-mendix-green">${accuracy}%</div>
                <div class="text-xs text-gray-500">Genauigkeit</div>
            </div>
            <div class="bg-gray-900 rounded-xl p-4 text-center border border-gray-800">
                <div class="text-2xl font-bold text-mendix-purple">${intProgress.mastered + advProgress.mastered}</div>
                <div class="text-xs text-gray-500">Gemeistert</div>
            </div>
        </div>

        <!-- Notifications -->
        ${renderNotificationSection()}

        <!-- Exam Cards -->
        <div class="space-y-4">
            ${renderExamCard('intermediate', 'Intermediate Developer', intProgress,
                'XPath, Microflows, Domain Modeling, Page Building, Security, Integration',
                'Voraussetzung: Rapid Developer \u2713')}
            ${renderExamCard('advanced', 'Advanced Developer', advProgress,
                'Advanced Domain Model, Performance, Security, Error Handling, Testing, Java',
                'Voraussetzung: Intermediate Developer')}
        </div>

        <!-- About Toggle -->
        <div class="mt-6">
            <button onclick="toggleAbout()" class="w-full text-center text-xs text-gray-500 hover:text-gray-400 transition py-2"
                    aria-expanded="${state.showAbout}" aria-controls="about-section">
                ${state.showAbout ? '\u25B2 Weniger anzeigen' : '\u25BC \u00DCber diese App'}
            </button>
            ${state.showAbout ? renderAbout() : ''}
        </div>

        <!-- Reset Button -->
        <div class="mt-4 text-center">
            <button onclick="resetProgress()" class="text-xs text-gray-600 hover:text-gray-400 transition">
                Fortschritt zur\u00FCcksetzen
            </button>
        </div>

        ${renderFooter()}
    </div>`;
}

function renderAbout() {
    const counts = getTotalQuestionCount();
    return `
    <div id="about-section" class="about-section rounded-xl p-5 mt-2 fade-in">
        <h3 class="font-bold text-mendix-blue mb-3">\u00DCber Mendix Trainer</h3>
        <div class="space-y-2 text-sm text-gray-400">
            <p><strong class="text-gray-300">Version:</strong> ${APP_VERSION}</p>
            <p><strong class="text-gray-300">Fragen:</strong> ${counts.total} Pr\u00FCfungsfragen (${counts.intermediate} Intermediate, ${counts.advanced} Advanced)</p>
            <p><strong class="text-gray-300">Lernmethode:</strong> Spaced Repetition mit adaptiver Priorisierung. Fragen, die du falsch beantwortest, erscheinen h\u00E4ufiger.</p>
            <p><strong class="text-gray-300">Pr\u00FCfungsmodus:</strong> Simuliert die echte Mendix-Pr\u00FCfung mit Zeitlimit und ${EXAM_QUESTION_COUNT} Fragen. Bestehensgrenze: ${PASS_THRESHOLD}%.</p>
            <p><strong class="text-gray-300">Fortschritt:</strong> Wird lokal im Browser gespeichert. Kein Account n\u00F6tig, keine Daten werden \u00FCbertragen.</p>
            <p><strong class="text-gray-300">Tastatur:</strong> <kbd>1</kbd>\u2013<kbd>4</kbd> oder <kbd>A</kbd>\u2013<kbd>D</kbd> zum Antworten, <kbd>Enter</kbd> f\u00FCr n\u00E4chste Frage.</p>
        </div>
    </div>`;
}

function toggleAbout() {
    state.showAbout = !state.showAbout;
    render();
}

function renderExamCard(exam, title, progress, topics, prereq) {
    const pct = progress.total > 0 ? Math.round((progress.mastered / progress.total) * 100) : 0;
    const color = examColor(exam);

    return `
    <div class="bg-gray-900 rounded-xl p-6 border border-gray-800 card-hover cursor-pointer"
         onclick="navigate('categories', { exam: '${exam}' })" role="button" tabindex="0"
         onkeydown="if(event.key==='Enter')this.click()">
        <div class="flex justify-between items-start mb-3">
            <div>
                <h2 class="text-xl font-bold text-${color}">${title}</h2>
                <p class="text-xs text-gray-500 mt-1">${prereq}</p>
            </div>
            <div class="text-right">
                <div class="text-2xl font-bold">${pct}%</div>
                <div class="text-xs text-gray-500">gemeistert</div>
            </div>
        </div>
        <div class="w-full bg-gray-800 rounded-full h-2 mb-3" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
            <div class="bg-${color} h-2 rounded-full progress-fill" style="width: ${pct}%"></div>
        </div>
        <p class="text-xs text-gray-500">${topics}</p>
        <div class="flex justify-between items-center mt-3 text-xs text-gray-400">
            <span>${progress.answered}/${progress.total} bearbeitet</span>
            <span class="text-${color} font-medium">Starten \u2192</span>
        </div>
    </div>`;
}

function renderCategories() {
    const categories = getCategories(state.exam);
    const examLabel = state.exam === 'intermediate' ? 'Intermediate' : 'Advanced';
    const color = examColor(state.exam);
    const allProgress = getExamProgress(state.exam);

    return `
    <div class="fade-in">
        <div class="flex items-center justify-between mb-6">
            <button onclick="navigate('home')" class="text-gray-400 hover:text-white transition py-2 px-1">
                \u2190 Zur\u00FCck
            </button>
            <h2 class="text-xl font-bold text-${color}">${examLabel}</h2>
            <button onclick="navigate('stats', { exam: '${state.exam}' })" class="text-gray-400 hover:text-white transition text-sm py-2 px-1">
                Statistik
            </button>
        </div>

        <!-- Exam Mode -->
        <div class="bg-gray-900 rounded-xl p-4 border border-gray-800 mb-4 card-hover cursor-pointer"
             onclick="startQuiz('${state.exam}', 'exam', ${EXAM_QUESTION_COUNT})" role="button" tabindex="0"
             onkeydown="if(event.key==='Enter')this.click()">
            <div class="flex justify-between items-center">
                <div>
                    <h3 class="font-bold text-mendix-orange">Pr\u00FCfungssimulation</h3>
                    <p class="text-xs text-gray-500">${EXAM_QUESTION_COUNT} Fragen, ${state.exam === 'intermediate' ? '90' : '120'} Min Timer</p>
                </div>
                <span class="text-mendix-orange text-sm">Starten \u2192</span>
            </div>
        </div>

        <!-- All Categories -->
        <div class="bg-gray-900 rounded-xl p-4 border border-gray-800 mb-4 card-hover cursor-pointer"
             onclick="startQuiz('${state.exam}', 'all', ${PRACTICE_COUNT})" role="button" tabindex="0"
             onkeydown="if(event.key==='Enter')this.click()">
            <div class="flex justify-between items-center">
                <div>
                    <h3 class="font-bold">Alle Kategorien</h3>
                    <p class="text-xs text-gray-500">${allProgress.total} Fragen, priorisiert nach Schw\u00E4chen</p>
                </div>
                <span class="text-${color} text-sm">Starten \u2192</span>
            </div>
        </div>

        <!-- Category Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            ${categories.map(cat => renderCategoryCard(cat, state.exam)).join('')}
        </div>

        ${renderFooter()}
    </div>`;
}

function renderCategoryCard(cat, exam) {
    const progress = getCategoryProgress(exam, cat.key);
    const pct = progress.total > 0 ? Math.round((progress.mastered / progress.total) * 100) : 0;
    const answeredPct = progress.total > 0 ? Math.round((progress.answered / progress.total) * 100) : 0;

    return `
    <div class="bg-gray-900 rounded-xl p-4 border border-gray-800 card-hover cursor-pointer"
         onclick="startQuiz('${exam}', '${cat.key}')" role="button" tabindex="0"
         onkeydown="if(event.key==='Enter')this.click()">
        <div class="flex justify-between items-start mb-2">
            <span class="badge-${cat.key} text-xs px-2 py-0.5 rounded-full text-white font-medium">${cat.label}</span>
            <span class="text-xs text-gray-500">${progress.answered}/${progress.total}</span>
        </div>
        <div class="w-full bg-gray-800 rounded-full h-1.5 mt-2">
            <div class="bg-mendix-green h-1.5 rounded-full progress-fill" style="width: ${pct}%"></div>
        </div>
        <div class="flex justify-between mt-1">
            <span class="text-xs text-gray-500">${pct}% gemeistert</span>
            <span class="text-xs text-gray-500">${answeredPct}% gesehen</span>
        </div>
    </div>`;
}

// ============ TIMER ============
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}

function startTimer(seconds) {
    stopTimer();
    state.timerSeconds = seconds;
    state.timerWarned5 = false;
    state.timerWarned1 = false;
    state.timerInterval = setInterval(() => {
        state.timerSeconds--;
        const el = document.getElementById('exam-timer');
        if (el) {
            el.textContent = formatTime(state.timerSeconds);

            // 5-Minuten-Warnung
            if (state.timerSeconds <= TIMER_WARN_5MIN && !state.timerWarned5) {
                state.timerWarned5 = true;
                el.className = 'text-sm font-mono font-bold text-mendix-orange timer-warning';
                playWarningBeep();
                showTimerToast('5 Minuten verbleibend!');
            }

            // 1-Minute-Warnung
            if (state.timerSeconds <= TIMER_WARN_1MIN && !state.timerWarned1) {
                state.timerWarned1 = true;
                el.className = 'text-sm font-mono font-bold text-mendix-red timer-critical';
                playCriticalBeep();
                showTimerToast('Noch 1 Minute!');
            }
        }
        if (state.timerSeconds <= 0) {
            stopTimer();
            playCriticalBeep();
            navigate('results');
        }
    }, 1000);
}

function stopTimer() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
}

function showTimerToast(message) {
    const existing = document.getElementById('timer-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'timer-toast';
    toast.setAttribute('role', 'alert');
    toast.style.cssText = 'position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:9999;' +
        'padding:10px 24px;border-radius:12px;font-weight:bold;font-size:14px;color:#fff;' +
        'background:#F04438;box-shadow:0 4px 20px rgba(240,68,56,0.4);transition:opacity 0.5s ease;';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// ============ QUIZ ============
function startQuiz(exam, category, count) {
    const questions = selectQuestions(exam, category, count || 999);
    if (questions.length === 0) return;

    stopTimer();
    Object.assign(state, {
        exam,
        category,
        questions,
        questionIndex: 0,
        selectedAnswer: null,
        answered: false,
        sessionCorrect: 0,
        sessionTotal: 0,
        sessionAnswers: [],
    });
    navigate('quiz');
    if (category === 'exam') startTimer(EXAM_TIME[exam]);
}

function renderQuiz() {
    const q = state.questions[state.questionIndex];
    if (!q) return renderResults();

    const total = state.questions.length;
    const current = state.questionIndex + 1;
    const pct = Math.round((current / total) * 100);
    const color = examColor(state.exam);
    const letters = ['A', 'B', 'C', 'D'];
    const isExamMode = state.category === 'exam';

    // Timer CSS classes
    let timerClasses = 'text-sm font-mono font-bold';
    if (state.timerSeconds <= TIMER_WARN_1MIN) {
        timerClasses += ' text-mendix-red timer-critical';
    } else if (state.timerSeconds <= TIMER_WARN_5MIN) {
        timerClasses += ' text-mendix-orange timer-warning';
    } else {
        timerClasses += ' text-mendix-orange';
    }

    return `
    <div class="fade-in">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
            <button onclick="stopTimer(); navigate('categories', { exam: '${state.exam}' })" class="text-gray-400 hover:text-white transition text-sm py-2 px-1">
                \u2190 Abbrechen
            </button>
            ${isExamMode ? `<span id="exam-timer" class="${timerClasses}">${formatTime(state.timerSeconds)}</span>` : ''}
            <span class="text-sm text-gray-400">${current} / ${total}</span>
            <span class="text-sm font-medium ${state.sessionTotal > 0 ? (state.sessionCorrect / state.sessionTotal >= PASS_THRESHOLD / 100 ? 'text-mendix-green' : 'text-mendix-red') : 'text-gray-400'}">
                ${state.sessionCorrect}/${state.sessionTotal}
            </span>
        </div>

        <!-- Progress Bar -->
        <div class="w-full bg-gray-800 rounded-full h-1 mb-6" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Fortschritt">
            <div class="bg-${color} h-1 rounded-full progress-fill" style="width: ${pct}%"></div>
        </div>

        <!-- Category Badge -->
        <span class="badge-${q.category} text-xs px-2 py-0.5 rounded-full text-white font-medium">${q.categoryLabel}</span>

        <!-- Question -->
        <h3 class="text-lg font-medium mt-3 mb-6 leading-relaxed">${escapeHtml(q.question)}</h3>

        <!-- Options -->
        <div class="space-y-3">
            ${q.options.map((opt, i) => {
                let classes = 'option-btn';
                if (state.answered) {
                    classes += ' answered';
                    if (i === q.correct) classes += ' correct';
                    else if (i === state.selectedAnswer && i !== q.correct) classes += ' incorrect';
                }
                return `
                <button class="${classes} w-full text-left p-4 rounded-xl flex items-start gap-3"
                        onclick="answerQuestion(${i})" ${state.answered ? 'disabled' : ''}
                        aria-label="Antwort ${letters[i]}: ${escapeHtml(opt)}">
                    <span class="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold
                        ${state.answered && i === q.correct ? 'bg-mendix-green text-white' :
                          state.answered && i === state.selectedAnswer && i !== q.correct ? 'bg-mendix-red text-white' :
                          'bg-gray-800 text-gray-400'}">${letters[i]}</span>
                    <span class="pt-0.5">${escapeHtml(opt)}</span>
                </button>`;
            }).join('')}
        </div>

        <!-- Explanation -->
        ${state.answered ? `
        <div class="mt-6 p-4 rounded-xl border ${state.selectedAnswer === q.correct ? 'bg-green-950/30 border-green-900' : 'bg-red-950/30 border-red-900'}">
            <div class="flex items-center gap-2 mb-2">
                <span class="text-lg">${state.selectedAnswer === q.correct ? '\u2713' : '\u2717'}</span>
                <span class="font-bold ${state.selectedAnswer === q.correct ? 'text-mendix-green' : 'text-mendix-red'}">
                    ${state.selectedAnswer === q.correct ? 'Richtig!' : 'Falsch!'}
                </span>
            </div>
            <p class="text-sm text-gray-300 leading-relaxed">${escapeHtml(q.explanation)}</p>
        </div>
        <button onclick="nextQuestion()" class="w-full mt-4 bg-${color} hover:opacity-90 text-white font-bold py-3 rounded-xl transition">
            ${state.questionIndex < state.questions.length - 1 ? 'N\u00E4chste Frage \u2192' : 'Ergebnis anzeigen'}
        </button>
        ` : ''}

        <!-- Keyboard Hint -->
        <div class="keyboard-hint text-center mt-6 text-gray-500">
            <kbd>1</kbd>\u2013<kbd>4</kbd> zum Antworten${state.answered ? ', <kbd>Enter</kbd> f\u00FCr n\u00E4chste' : ''}
        </div>
    </div>`;
}

function answerQuestion(index) {
    if (state.answered) return;
    const q = state.questions[state.questionIndex];

    state.selectedAnswer = index;
    state.answered = true;
    state.sessionTotal++;

    const isCorrect = index === q.correct;
    if (isCorrect) state.sessionCorrect++;

    state.sessionAnswers.push({
        questionId: q.id,
        question: q.question,
        selected: index,
        correct: q.correct,
        isCorrect,
        options: q.options,
        explanation: q.explanation,
        category: q.category,
        categoryLabel: q.categoryLabel,
    });

    recordAnswer(q.id, isCorrect);
    render();
}

function nextQuestion() {
    state.questionIndex++;
    state.selectedAnswer = null;
    state.answered = false;

    if (state.questionIndex >= state.questions.length) {
        stopTimer();
        navigate('results');
    } else {
        render();
        window.scrollTo(0, 0);
    }
}

// ============ RESULTS ============
function renderResults() {
    const pct = state.sessionTotal > 0 ? Math.round((state.sessionCorrect / state.sessionTotal) * 100) : 0;
    const passed = pct >= PASS_THRESHOLD;
    const wrong = state.sessionAnswers.filter(a => !a.isCorrect);
    const color = examColor(state.exam);
    const letters = ['A', 'B', 'C', 'D'];

    // Category-wise breakdown
    const categoryBreakdown = buildCategoryBreakdown();

    return `
    <div class="fade-in">
        <div class="text-center mb-8">
            <div class="text-6xl mb-4">${passed ? '\uD83C\uDF89' : '\uD83D\uDCDA'}</div>
            <h2 class="text-3xl font-bold mb-2">${pct}%</h2>
            <p class="text-lg ${passed ? 'text-mendix-green' : 'text-mendix-red'}">
                ${passed ? 'Bestanden!' : 'Noch nicht bestanden'}
            </p>
            <p class="text-sm text-gray-500 mt-1">
                ${state.sessionCorrect} von ${state.sessionTotal} richtig (${PASS_THRESHOLD}% zum Bestehen)
            </p>
        </div>

        <!-- Score Bar -->
        <div class="relative w-full bg-gray-800 rounded-full h-4 mb-6">
            <div class="absolute left-[75%] top-0 w-0.5 h-4 bg-white/50 z-10" title="${PASS_THRESHOLD}% Bestehensgrenze"></div>
            <div class="${passed ? 'bg-mendix-green' : 'bg-mendix-red'} h-4 rounded-full progress-fill" style="width: ${pct}%"></div>
        </div>

        <!-- Category Breakdown -->
        <div class="bg-gray-900 rounded-xl p-4 border border-gray-800 mb-4">
            <h3 class="font-bold mb-3 text-gray-300">Ergebnis nach Kategorie</h3>
            <div class="space-y-3">
                ${categoryBreakdown.map(cat => {
                    const catPct = cat.total > 0 ? Math.round((cat.correct / cat.total) * 100) : 0;
                    const catColor = catPct >= 75 ? '#12B76A' : catPct >= 50 ? '#F79009' : '#F04438';
                    return `
                    <div>
                        <div class="flex justify-between items-center mb-1">
                            <span class="badge-${cat.key} text-xs px-2 py-0.5 rounded-full text-white font-medium">${cat.label}</span>
                            <span class="text-sm font-medium" style="color: ${catColor}">${cat.correct}/${cat.total} (${catPct}%)</span>
                        </div>
                        <div class="category-bar">
                            <div class="category-bar-fill" style="width: ${catPct}%; background: ${catColor}"></div>
                        </div>
                    </div>`;
                }).join('')}
            </div>
        </div>

        ${wrong.length > 0 ? `
        <!-- Wrong Answers Detail -->
        <div class="bg-gray-900 rounded-xl p-4 border border-gray-800 mb-4">
            <h3 class="font-bold mb-3 text-mendix-red">Falsche Antworten (${wrong.length})</h3>
            <div class="space-y-4">
                ${wrong.map(a => `
                    <div class="border-b border-gray-800 pb-3 last:border-0 last:pb-0">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="badge-${a.category} text-xs px-2 py-0.5 rounded-full text-white font-medium">${a.categoryLabel}</span>
                        </div>
                        <p class="text-sm font-medium mb-2">${escapeHtml(a.question)}</p>
                        <p class="text-xs text-mendix-red mb-1">Deine Antwort: ${letters[a.selected]}. ${escapeHtml(a.options[a.selected])}</p>
                        <p class="text-xs text-mendix-green mb-2">Richtig: ${letters[a.correct]}. ${escapeHtml(a.options[a.correct])}</p>
                        <p class="text-xs text-gray-400">${escapeHtml(a.explanation)}</p>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : '<p class="text-center text-mendix-green font-bold mb-4">Alle Fragen richtig! Perfekt!</p>'}

        <!-- Actions -->
        <div class="grid grid-cols-2 gap-3">
            <button onclick="navigate('categories', { exam: '${state.exam}' })" class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition">
                Zur\u00FCck
            </button>
            ${wrong.length > 0 ? `
            <button onclick="retryWrong()" class="bg-${color} hover:opacity-90 text-white font-bold py-3 rounded-xl transition">
                Falsche wiederholen
            </button>` : `
            <button onclick="startQuiz('${state.exam}', '${state.category}', ${PRACTICE_COUNT})" class="bg-${color} hover:opacity-90 text-white font-bold py-3 rounded-xl transition">
                Nochmal
            </button>`}
        </div>

        ${renderFooter()}
    </div>`;
}

function buildCategoryBreakdown() {
    const catMap = {};
    state.sessionAnswers.forEach(a => {
        const key = a.category || 'unknown';
        if (!catMap[key]) {
            catMap[key] = { key, label: a.categoryLabel || key, total: 0, correct: 0 };
        }
        catMap[key].total++;
        if (a.isCorrect) catMap[key].correct++;
    });

    // Sortiert nach Genauigkeit aufsteigend (schlechteste zuerst)
    return Object.values(catMap).sort((a, b) => {
        const pctA = a.total > 0 ? a.correct / a.total : 0;
        const pctB = b.total > 0 ? b.correct / b.total : 0;
        return pctA - pctB;
    });
}

function retryWrong() {
    const wrongIds = state.sessionAnswers.filter(a => !a.isCorrect).map(a => a.questionId);
    const allQuestions = getQuestions(state.exam);
    const wrongQuestions = shuffleArray(allQuestions.filter(q => wrongIds.includes(q.id)));

    if (wrongQuestions.length === 0) return;

    Object.assign(state, {
        questions: wrongQuestions,
        questionIndex: 0,
        selectedAnswer: null,
        answered: false,
        sessionCorrect: 0,
        sessionTotal: 0,
        sessionAnswers: [],
    });
    navigate('quiz');
}

// ============ STATS ============
function renderStats() {
    const exam = state.exam;
    const categories = getCategories(exam);
    const examLabel = exam === 'intermediate' ? 'Intermediate' : 'Advanced';
    const color = examColor(exam);
    const overall = getExamProgress(exam);
    const progress = loadProgress();

    // Calculate per-category accuracy
    const catStats = categories.map(cat => {
        const questions = getQuestions(exam).filter(q => q.category === cat.key);
        let attempts = 0, correct = 0;
        questions.forEach(q => {
            const p = progress[q.id];
            if (p) {
                attempts += p.attempts;
                correct += p.correct;
            }
        });
        const accuracy = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;
        const prog = getCategoryProgress(exam, cat.key);
        return { ...cat, accuracy, ...prog };
    });

    catStats.sort((a, b) => a.accuracy - b.accuracy);

    return `
    <div class="fade-in">
        <div class="flex items-center justify-between mb-6">
            <button onclick="navigate('categories', { exam: '${exam}' })" class="text-gray-400 hover:text-white transition py-2 px-1">
                \u2190 Zur\u00FCck
            </button>
            <h2 class="text-xl font-bold text-${color}">${examLabel} Statistik</h2>
            <div></div>
        </div>

        <!-- Overall -->
        <div class="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-6">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                    <div class="text-2xl font-bold text-mendix-blue">${overall.answered}</div>
                    <div class="text-xs text-gray-500">Bearbeitet</div>
                </div>
                <div>
                    <div class="text-2xl font-bold text-mendix-green">${overall.mastered}</div>
                    <div class="text-xs text-gray-500">Gemeistert</div>
                </div>
                <div>
                    <div class="text-2xl font-bold">${overall.total}</div>
                    <div class="text-xs text-gray-500">Gesamt</div>
                </div>
            </div>
            <div class="w-full bg-gray-800 rounded-full h-2 mt-4">
                <div class="bg-mendix-green h-2 rounded-full progress-fill" style="width: ${overall.total > 0 ? Math.round((overall.mastered / overall.total) * 100) : 0}%"></div>
            </div>
        </div>

        <!-- Per Category -->
        <h3 class="font-bold mb-3">Kategorien (sortiert nach Genauigkeit)</h3>
        <div class="space-y-3">
            ${catStats.map(cat => {
                const accColor = cat.accuracy >= 75 ? 'text-mendix-green' : cat.accuracy >= 50 ? 'text-mendix-orange' : 'text-mendix-red';
                return `
                <div class="bg-gray-900 rounded-xl p-4 border border-gray-800">
                    <div class="flex justify-between items-center mb-2">
                        <span class="badge-${cat.key} text-xs px-2 py-0.5 rounded-full text-white font-medium">${cat.label}</span>
                        <span class="${accColor} font-bold">${cat.accuracy}%</span>
                    </div>
                    <div class="flex justify-between text-xs text-gray-500">
                        <span>${cat.answered}/${cat.total} bearbeitet</span>
                        <span>${cat.mastered} gemeistert</span>
                    </div>
                    <div class="w-full bg-gray-800 rounded-full h-1 mt-2">
                        <div class="bg-mendix-green h-1 rounded-full progress-fill" style="width: ${cat.total > 0 ? Math.round((cat.mastered / cat.total) * 100) : 0}%"></div>
                    </div>
                </div>`;
            }).join('')}
        </div>

        ${renderFooter()}
    </div>`;
}

// ============ UTILITIES ============
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function resetProgress() {
    if (confirm('Wirklich allen Fortschritt zur\u00FCcksetzen? Diese Aktion kann nicht r\u00FCckg\u00E4ngig gemacht werden.')) {
        localStorage.removeItem(STORAGE_KEY);
        render();
    }
}

// ============ KEYBOARD ============
document.addEventListener('keydown', (e) => {
    if (state.screen !== 'quiz') return;

    // Nicht in Eingabefelder eingreifen
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (!state.answered) {
        const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3, 'a': 0, 'b': 1, 'c': 2, 'd': 3 };
        const index = keyMap[e.key.toLowerCase()];
        if (index !== undefined && index < state.questions[state.questionIndex]?.options.length) {
            answerQuestion(index);
        }
    } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        nextQuestion();
    }
});

// ============ PWA & NOTIFICATIONS ============
const NOTIFICATION_STORAGE_KEY = 'mendix-trainer-notifications';

function getNotificationSettings() {
    try {
        const data = localStorage.getItem(NOTIFICATION_STORAGE_KEY);
        return data ? JSON.parse(data) : { enabled: false, hour: 19, minute: 0 };
    } catch { return { enabled: false, hour: 19, minute: 0 }; }
}

function saveNotificationSettings(settings) {
    try {
        localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(settings));
    } catch {}
}

async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const reg = await navigator.serviceWorker.register('./sw.js');
            console.log('Service Worker registriert');
            return reg;
        } catch (err) {
            console.warn('Service Worker Registrierung fehlgeschlagen:', err);
        }
    }
    return null;
}

async function requestNotificationPermission() {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') return false;
    const result = await Notification.requestPermission();
    return result === 'granted';
}

async function toggleNotifications() {
    const settings = getNotificationSettings();

    if (!settings.enabled) {
        // Turning ON
        const granted = await requestNotificationPermission();
        if (!granted) {
            alert('Bitte erlaube Benachrichtigungen in den Einstellungen deines Browsers/Geräts.');
            return;
        }
        settings.enabled = true;
        saveNotificationSettings(settings);
        scheduleNextReminder();
    } else {
        // Turning OFF
        settings.enabled = false;
        saveNotificationSettings(settings);
        cancelReminder();
    }
    render();
}

function updateReminderTime(timeStr) {
    const [hour, minute] = timeStr.split(':').map(Number);
    const settings = getNotificationSettings();
    settings.hour = hour;
    settings.minute = minute;
    saveNotificationSettings(settings);
    if (settings.enabled) {
        scheduleNextReminder();
    }
}

let reminderTimeout = null;

function scheduleNextReminder() {
    cancelReminder();
    const settings = getNotificationSettings();
    if (!settings.enabled) return;

    const now = new Date();
    const next = new Date();
    next.setHours(settings.hour, settings.minute, 0, 0);

    // If time already passed today, schedule for tomorrow
    if (next <= now) {
        next.setDate(next.getDate() + 1);
    }

    const delay = next.getTime() - now.getTime();

    reminderTimeout = setTimeout(() => {
        showReminder();
        // Schedule next day
        scheduleNextReminder();
    }, delay);

    console.log(`Erinnerung geplant für ${next.toLocaleString('de-DE')}`);
}

function cancelReminder() {
    if (reminderTimeout) {
        clearTimeout(reminderTimeout);
        reminderTimeout = null;
    }
}

function showReminder() {
    const messages = [
        'Zeit für Mendix! 5 Fragen am Tag machen den Unterschied.',
        'Deine Mendix-Zertifizierung wartet! Kurze Übungsrunde?',
        'Bleib dran! Jeden Tag ein bisschen lernen bringt dich ans Ziel.',
        'Mendix Trainer: Dein tägliches Training steht an!',
        'Nur 5 Minuten! Halte deine Streak aufrecht.',
    ];
    const body = messages[Math.floor(Math.random() * messages.length)];

    // Try Service Worker notification (works in background)
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            type: 'SHOW_NOTIFICATION',
            title: 'Mendix Trainer',
            body: body,
        });
    } else if ('Notification' in window && Notification.permission === 'granted') {
        // Fallback: direct notification
        new Notification('Mendix Trainer', {
            body: body,
            icon: './icon-192.svg',
            tag: 'mendix-daily-reminder',
        });
    }
}

function isPWA() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true;
}

function renderNotificationSection() {
    const settings = getNotificationSettings();
    const timeStr = `${String(settings.hour).padStart(2, '0')}:${String(settings.minute).padStart(2, '0')}`;
    const permStatus = 'Notification' in window ? Notification.permission : 'unavailable';

    // Show install hint if not in PWA mode
    if (!isPWA() && /iPhone|iPad|iPod/.test(navigator.userAgent)) {
        return `
        <div class="notification-banner" onclick="this.querySelector('.install-details').classList.toggle('hidden')">
            <div class="flex items-center gap-3">
                <span class="text-2xl">📲</span>
                <div>
                    <div class="font-bold text-white text-sm">Zum Home-Bildschirm hinzufügen</div>
                    <div class="text-xs text-white/70">Für Push-Erinnerungen & Offline-Zugang</div>
                </div>
            </div>
            <div class="install-details hidden mt-3 text-xs text-white/80 space-y-1">
                <p>1. Tippe auf <strong>Teilen</strong> (□↑) unten im Safari</p>
                <p>2. Scrolle nach unten und tippe <strong>"Zum Home-Bildschirm"</strong></p>
                <p>3. Tippe <strong>"Hinzufügen"</strong></p>
            </div>
        </div>`;
    }

    if (permStatus === 'unavailable') return '';

    return `
    <div class="notification-settings">
        <div class="flex items-center justify-between mb-3">
            <div>
                <div class="font-bold text-sm">Tägliche Erinnerung</div>
                <div class="text-xs text-gray-500">Werde jeden Tag ans Lernen erinnert</div>
            </div>
            <div class="toggle-switch ${settings.enabled ? 'active' : ''}" onclick="toggleNotifications()" role="switch" aria-checked="${settings.enabled}" tabindex="0"></div>
        </div>
        ${settings.enabled ? `
        <div class="flex items-center gap-3">
            <span class="text-xs text-gray-400">Uhrzeit:</span>
            <input type="time" class="notification-time-picker" value="${timeStr}" onchange="updateReminderTime(this.value)">
        </div>
        ` : ''}
        ${permStatus === 'denied' ? '<p class="text-xs text-mendix-red mt-2">Benachrichtigungen sind blockiert. Bitte in den Geräteeinstellungen aktivieren.</p>' : ''}
    </div>`;
}

// ============ INIT ============
registerServiceWorker();

// Restore notification schedule if enabled
const _notifSettings = getNotificationSettings();
if (_notifSettings.enabled) {
    scheduleNextReminder();
}

render();
