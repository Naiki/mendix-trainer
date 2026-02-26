// ============ STATE ============
export const state = {
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
