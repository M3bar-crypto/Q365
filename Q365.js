

const SUPABASE_URL = 'https://foarxwwnjibrvrjrfuoh.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_ACYyDO9EyXv-OYIbLE0waA_OODPNY_u';

const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const translations = {
    ar: {
        welcomeBanner: "مرحبا بك , سجل دخولك لحفظ تقدمك",
        appDesc: "سؤال كل يوم في 365 يوم",
        googleLogin: "التسجيل باستخدام google",
        menuTitle: "القائمة",
        streakLabel: "الايام المتتالية : ",
        archiveText: "أرشيف الأسئلة",
        settingsText: "الاعدادات",
        logoutText: "تسجيل الخروج",
        welcomeUser: "مرحبا",
        pointsLabel: "نقطة",
        dailyQuestionBtn: "سؤال اليوم ؟",
        answerPlaceholder: "ادخل اجابتك هنا (كلمة واحدة)",
        submitBtn: "ارسال",
        loadingText: "جاري جلب سؤال اليوم...",
        noQuestionText: "لا يوجد سؤال متاح لليوم!",
        successStatus: "إجابة صحيحة! 🎉",
        wrongStatus: "إجابة خاطئة ❌",
        suggestTitle: "مبروك ! لقد وصلت ل 100 نقطة",
        suggestDesc: "أصبح بإمكانك الآن اقتراح سؤالك الخاص ليتم عرضه على المستخدمين الآخرين",
        suggestBtn: "اضافة سؤالي الخاص",
        alertEmpty: "اكتب إجابتك قبل ما ترسل!",
        langBtnText: "English",
        
        archiveTitle: "أرشيف الأسئلة السابقة",
        archiveLoading: "جاري تحميل الأرشيف...",
        archiveEmpty: "لا توجد أسئلة سابقة في الأرشيف حتى الآن.",
        backToMain: "الرجوع للرئيسية",
        questionDate: "تاريخ السؤال:",
        correctAnswerLabel: "الإجابة الصحيحة:",
        
        settingsTitle: "إعدادات التطبيق",
        soundOption: "المؤثرات الصوتية",
        notificationsOption: "التنبيه اليومي بالسؤال",
        themeOption: "الوضع الليلي (Dark Mode)",
        langOption: "لغة التطبيق",
        clearCacheOption: "مسح البيانات المخزنة موقتاً",
        clearCacheBtn: "مسح الآن",
        saveSettingsBtn: "حفظ التغييرات",
        settingsSaved: "تم حفظ الإعدادات بنجاح!"
    },
    en: {
        welcomeBanner: "Welcome, please login to save your progress",
        appDesc: "One question every day for 365 days",
        googleLogin: "Sign in with Google",
        menuTitle: "Menu",
        streakLabel: "Streak Days : ",
        archiveText: "Questions Archive",
        settingsText: "Settings",
        logoutText: "Logout",
        welcomeUser: "Welcome",
        pointsLabel: "Points",
        dailyQuestionBtn: "Daily Question?",
        answerPlaceholder: "Enter answer (one word)",
        submitBtn: "Submit",
        loadingText: "Fetching today's question...",
        noQuestionText: "No question available for today!",
        successStatus: "Correct Answer! 🎉",
        wrongStatus: "Wrong Answer ❌",
        suggestTitle: "Congrats! You reached 100 points",
        suggestDesc: "You can now suggest your own question to be displayed to other users",
        suggestBtn: "Add My Question",
        alertEmpty: "Please enter your answer before submitting!",
        langBtnText: "العربية",
        
        // Archive Translations
        archiveTitle: "Questions Archive",
        archiveLoading: "Loading archive...",
        archiveEmpty: "No previous questions found in archive.",
        backToMain: "Back to Main",
        questionDate: "Date:",
        correctAnswerLabel: "Correct Answer:",
        
        // Settings Translations
        settingsTitle: "App Settings",
        soundOption: "Sound Effects",
        notificationsOption: "Daily Question Notification",
        themeOption: "Dark Mode",
        langOption: "App Language",
        clearCacheOption: "Clear Temporary Cache",
        clearCacheBtn: "Clear Now",
        saveSettingsBtn: "Save Settings",
        settingsSaved: "Settings saved successfully!"
    }
};

let currentLang = localStorage.getItem('Q365_lang') || 'ar';
let currentPoints = 0;
let isAnswered = false;
let currentQuestionData = null;
let currentUser = null;

function safeSetText(id, text) {
    const el = document.getElementById(id);
    if (el && text !== undefined) {
        el.textContent = text;
    }
}

function safeSetHTML(id, html) {
    const el = document.getElementById(id);
    if (el && html !== undefined) {
        el.innerHTML = html;
    }
}

function showView(viewName) {
    const questionSection = document.querySelector('.question-section');
    const resultSection = document.getElementById('result-section');
    const suggestSection = document.getElementById('suggest-question-section');
    const archiveScreen = document.getElementById('archive-screen');
    const settingsScreen = document.getElementById('settings-screen');

    if (questionSection) questionSection.style.display = 'none';
    if (resultSection) resultSection.style.display = 'none';
    if (suggestSection) suggestSection.style.display = 'none';
    if (archiveScreen) archiveScreen.style.display = 'none';
    if (settingsScreen) settingsScreen.style.display = 'none';

    if (viewName === 'archive') {
        if (archiveScreen) archiveScreen.style.display = 'block';
    } else if (viewName === 'settings') {
        if (settingsScreen) settingsScreen.style.display = 'block';
    } else { 
        if (questionSection) questionSection.style.display = 'block';
        if (isAnswered && resultSection) {
            resultSection.classList.remove('hidden');
            resultSection.style.display = 'block';
        }
        if (currentPoints >= 100 && suggestSection) {
            suggestSection.classList.remove('hidden');
            suggestSection.style.display = 'block';
        }
    }
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('Q365_lang', lang);
    
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    const t = translations[lang];

    safeSetText('welcoming', t.welcomeBanner);
    safeSetText('app-desc', t.appDesc);
    safeSetText('google-login-text', t.googleLogin);
    safeSetText('menu-title', t.menuTitle);
    safeSetText('streak-label', t.streakLabel);
    safeSetText('archive-text', t.archiveText);
    safeSetText('settings-text', t.settingsText);
    safeSetText('logout-text', t.logoutText);
    safeSetText('points-label', t.pointsLabel);
    safeSetText('daily-question-btn', t.dailyQuestionBtn);
    safeSetText('submit-answer-btn', t.submitBtn);
    safeSetText('suggest-desc', t.suggestDesc);
    safeSetText('open-suggest-modal-btn', t.suggestBtn);

    safeSetText('archive-title-text', t.archiveTitle);
    safeSetText('settings-title-text', t.settingsTitle);
    safeSetText('sound-opt-text', t.soundOption);
    safeSetText('notif-opt-text', t.notificationsOption);
    safeSetText('clear-cache-opt-text', t.clearCacheOption);
    safeSetText('clear-cache-btn', t.clearCacheBtn);

    const backIcon = lang === 'ar' ? 'fa-arrow-right' : 'fa-arrow-left';
    const backBtnArchive = document.getElementById('back-from-archive-btn');
    if (backBtnArchive) backBtnArchive.innerHTML = `<i class="fa-solid ${backIcon}"></i>`;
    const backBtnSettings = document.getElementById('back-from-settings-btn');
    if (backBtnSettings) backBtnSettings.innerHTML = `<i class="fa-solid ${backIcon}"></i>`;

    safeSetHTML('suggest-title', `<i class="fa-solid fa-crown" style="color: gold;"></i> ${t.suggestTitle}`);

    const answerInput = document.getElementById('answer-input');
    if (answerInput) {
        answerInput.placeholder = t.answerPlaceholder;
    }

    if (currentUser) {
        const fullName = currentUser.user_metadata?.full_name || (currentLang === 'ar' ? 'صديقنا' : 'Friend');
        safeSetText('welcome-mes', `${t.welcomeUser}، ${fullName}`);
    }

    const langBtnContent = `<i class="fa-solid fa-globe"></i> ${t.langBtnText}`;
    safeSetHTML('lang-login-btn', langBtnContent);
    safeSetHTML('lang-nav-btn', langBtnContent);

    if (currentQuestionData) {
        safeSetText('daily-question-text', currentLang === 'ar' ? currentQuestionData.question_ar : currentQuestionData.question_en);
        if (isAnswered) {
            safeSetText('explanation-text', currentLang === 'ar' ? currentQuestionData.explanation_ar : currentQuestionData.explanation_en);
            safeSetText('result-status', isCorrectAnswer() ? t.successStatus : t.wrongStatus);
        }
    }
}

function toggleLanguage() {
    setLanguage(currentLang === 'ar' ? 'en' : 'ar');
}

async function fetchTodayQuestion() {
    if (!supabaseClient) return null;

    const todayStr = new Date().toISOString().split('T')[0];

    const { data, error } = await supabaseClient
        .from('questions')
        .select('*')
        .eq('publish_date', todayStr)
        .single();

    if (error) {
        console.error("خطأ في جلب سؤال اليوم:", error.message);
        return null;
    }

    return data;
}

async function fetchArchiveQuestions() {
    if (!supabaseClient) return [];

    const todayStr = new Date().toISOString().split('T')[0];

    const { data, error } = await supabaseClient
        .from('questions')
        .select('*')
        .lte('publish_date', todayStr)
        .order('publish_date', { ascending: false });

    if (error) {
        console.error("خطأ في جلب الأرشيف:", error.message);
        return [];
    }

    return data || [];
}

async function renderArchive() {
    const archiveContainer = document.getElementById('archive-container');
    const t = translations[currentLang];

    if (!archiveContainer) return;

    archiveContainer.innerHTML = `<p class="loading-msg">${t.archiveLoading}</p>`;

    const questions = await fetchArchiveQuestions();

    if (questions.length === 0) {
        archiveContainer.innerHTML = `<p class="empty-msg">${t.archiveEmpty}</p>`;
        return;
    }

    let html = '<div class="archive-list" style="display:flex; flex-direction:column; gap:1rem;">';
    questions.forEach((q) => {
        const qText = currentLang === 'ar' ? q.question_ar : q.question_en;
        const qExp = currentLang === 'ar' ? q.explanation_ar : q.explanation_en;
        const mainAns = q.answers && q.answers.length > 0 ? q.answers[0] : '';

        html += `
            <div class="archive-card" style="padding:1rem; border-radius:8px; border:1px solid rgba(150,150,150,0.2);">
                <div class="archive-card-header" style="font-size:0.85rem; opacity:0.8; margin-bottom:0.5rem;">
                    <span class="archive-date"><i class="fa-solid fa-calendar-day"></i> ${q.publish_date}</span>
                </div>
                <h3 class="archive-question" style="margin:0 0 0.5rem 0;">${qText}</h3>
                <div class="archive-answer-info">
                    <p><strong>${t.correctAnswerLabel}</strong> <span class="badge-answer">${mainAns}</span></p>
                    <p class="archive-exp">${qExp || ''}</p>
                </div>
            </div>
        `;
    });
    html += '</div>';

    archiveContainer.innerHTML = html;
}

document.getElementById('daily-question-btn')?.addEventListener('click', async () => {
    const dailyBtn = document.getElementById('daily-question-btn');
    const qBox = document.getElementById('question-box');
    const submitBtn = document.getElementById('submit-answer-btn');
    const inputField = document.getElementById('answer-input');

    dailyBtn?.classList.add('hidden');
    qBox?.classList.remove('hidden');
    safeSetText('daily-question-text', translations[currentLang].loadingText);

    currentQuestionData = await fetchTodayQuestion();

    if (currentQuestionData) {
        safeSetText('daily-question-text', currentLang === 'ar' ? currentQuestionData.question_ar : currentQuestionData.question_en);
    } else {
        safeSetText('daily-question-text', translations[currentLang].noQuestionText);
        if (submitBtn) submitBtn.disabled = true;
        if (inputField) inputField.disabled = true;
    }
});

function isCorrectAnswer() {
    if (!currentQuestionData || !currentQuestionData.answers) return false;
    const answerInput = document.getElementById('answer-input');
    const userAnswer = answerInput ? answerInput.value.trim().toLowerCase() : '';
    return currentQuestionData.answers.some(ans => ans.toString().toLowerCase() === userAnswer);
}

document.getElementById('submit-answer-btn')?.addEventListener('click', () => {
    if (isAnswered || !currentQuestionData) return;

    const answerInput = document.getElementById('answer-input');
    const submitBtn = document.getElementById('submit-answer-btn');
    const resultSection = document.getElementById('result-section');
    const userAnswer = answerInput ? answerInput.value.trim().toLowerCase() : '';
    const t = translations[currentLang];
    
    if (!userAnswer) {
        return alert(t.alertEmpty);
    }

    isAnswered = true;
    if (submitBtn) submitBtn.disabled = true;
    if (answerInput) answerInput.disabled = true;

    resultSection?.classList.remove('hidden');
    resultSection.style.display = 'block';

    const isCorrect = isCorrectAnswer();

    if (isCorrect) {
        answerInput?.classList.add('correct-answer-input');
        answerInput?.classList.remove('wrong-answer-input');
        
        safeSetText('result-status', t.successStatus);
        const resStatusEl = document.getElementById('result-status');
        if (resStatusEl) resStatusEl.style.color = "var(--success-color, green)";

        safeSetText('correct-word-display', currentQuestionData.answers[0]);
        safeSetText('explanation-text', currentLang === 'ar' ? currentQuestionData.explanation_ar : currentQuestionData.explanation_en);
        
        currentPoints += 25;
        safeSetText('points-counter', currentPoints);
    } else {
        answerInput?.classList.add('wrong-answer-input');
        answerInput?.classList.remove('correct-answer-input');
        
        safeSetText('result-status', t.wrongStatus);
        const resStatusEl = document.getElementById('result-status');
        if (resStatusEl) resStatusEl.style.color = "var(--error-color, red)";

        safeSetText('correct-word-display', currentQuestionData.answers[0]);
        safeSetText('explanation-text', currentLang === 'ar' ? currentQuestionData.explanation_ar : currentQuestionData.explanation_en);
    }

    if (currentPoints >= 100) {
        const suggestSec = document.getElementById('suggest-question-section');
        suggestSec?.classList.remove('hidden');
        if (suggestSec) suggestSec.style.display = 'block';
    }
});


async function loginWithGoogle() {
    if (!supabaseClient) return alert("مكتبة Supabase غير محملة!");
    const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + window.location.pathname }
    });
    if (error) console.error("خطأ في تسجيل الدخول:", error.message);
}

async function logout() {
    if (!supabaseClient) return;
    await supabaseClient.auth.signOut();
}

async function checkAuthState() {
    if (!supabaseClient) return;
    const { data: { session } } = await supabaseClient.auth.getSession();
    updateUI(session?.user);
    supabaseClient.auth.onAuthStateChange((_event, session) => updateUI(session?.user));
}

function updateUI(user) {
    currentUser = user;
    const loginScreen = document.getElementById('login-screen');
    const mainScreen = document.getElementById('main-screen');

    if (!loginScreen || !mainScreen) return;

    if (user) {
        loginScreen.style.display = 'none';
        mainScreen.style.display = 'block';
    } else {
        loginScreen.style.display = 'flex';
        mainScreen.style.display = 'none';
    }

    setLanguage(currentLang);
}


const sidebar = document.getElementById('sidebar');
const openSidebarBtn = document.getElementById('open-sidebar-btn');
const closeSidebarBtn = document.getElementById('closesidebar-btn');

function closeSidebar() {
    sidebar?.classList.remove('active');
    openSidebarBtn?.classList.remove('hide-btn');
}

openSidebarBtn?.addEventListener('click', () => { 
    sidebar?.classList.add('active');
    openSidebarBtn?.classList.add('hide-btn');
});

closeSidebarBtn?.addEventListener('click', closeSidebar);

document.addEventListener('click', (e) => {
    if (sidebar && sidebar.classList.contains('active')) {
        if (!sidebar.contains(e.target) && !openSidebarBtn.contains(e.target)) {
            closeSidebar();
        }
    }
});

document.getElementById('archive-btn')?.addEventListener('click', () => {
    closeSidebar();
    showView('archive');
    renderArchive();
});

document.getElementById('settings-btn')?.addEventListener('click', () => {
    closeSidebar();
    showView('settings');
});

document.getElementById('theme-toggle-btn')?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) themeBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem('Q365_theme', isDark ? 'dark' : 'light');
});

document.getElementById('answer-input')?.addEventListener('input', (e) => {
    safeSetText('char-count', e.target.value.length);
});


document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('Q365_theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const themeBtn = document.getElementById('theme-toggle-btn');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    document.getElementById('back-from-archive-btn')?.addEventListener('click', () => showView('main'));
    document.getElementById('back-from-settings-btn')?.addEventListener('click', () => showView('main'));
    
    document.getElementById('clear-cache-btn')?.addEventListener('click', () => {
        if (confirm(currentLang === 'ar' ? 'هل أنت متاكد من مسح البيانات المؤقتة؟' : 'Are you sure you want to clear cache?')) {
            localStorage.removeItem('Q365_settings');
            alert(currentLang === 'ar' ? 'تم المسح بنجاح!' : 'Cache cleared successfully!');
            window.location.reload();
        }
    });

    document.getElementById('lang-login-btn')?.addEventListener('click', toggleLanguage);
    document.getElementById('lang-nav-btn')?.addEventListener('click', toggleLanguage);
    document.getElementById('google-login-btn')?.addEventListener('click', loginWithGoogle);
    document.getElementById('logout-btn')?.addEventListener('click', logout);

    setLanguage(currentLang);
    checkAuthState();
});