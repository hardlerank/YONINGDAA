<<<<<<< HEAD
(function () {
    'use strict';

    const loading = document.getElementById('auth-loading');
    const errorView = document.getElementById('auth-error');
    const dashboard = document.getElementById('dashboard');
    const errorMessage = document.getElementById('auth-error-message');
    const retryButton = document.getElementById('retry-auth');
    const viewTitles = {
        home: 'Home',
        search: 'Izlash',
        ai: 'AI yordamchi',
        chat: 'Chat',
        profile: 'Profil'
    };

    function showAuthenticationError(message) {
        loading.hidden = true;
        dashboard.hidden = true;
        errorMessage.textContent = message;
        errorView.hidden = false;
    }

    function setView(viewName) {
        if (!Object.prototype.hasOwnProperty.call(viewTitles, viewName)) return;

        document.querySelectorAll('[data-panel]').forEach(function (panel) {
            panel.hidden = panel.dataset.panel !== viewName;
        });
        document.querySelectorAll('.nav-item[data-view]').forEach(function (button) {
            const active = button.dataset.view === viewName;
            button.classList.toggle('is-active', active);
            if (active) button.setAttribute('aria-current', 'page');
            else button.removeAttribute('aria-current');
        });

        const heading = document.querySelector(`[data-panel="${viewName}"] h1`);
        if (heading) heading.setAttribute('tabindex', '-1');
        document.title = `YONINGDA — ${viewTitles[viewName]}`;
    }

    function populateSafeProfile(profile) {
        const name = typeof profile.display_name === 'string' && profile.display_name.trim()
            ? profile.display_name.trim()
            : 'do‘stim';
        const firstName = name.split(/\s+/)[0];
        const initial = Array.from(firstName)[0] || 'Y';

        document.getElementById('welcome-name').textContent = firstName;
        document.getElementById('profile-name').textContent = name;
        document.getElementById('profile-phone').textContent = profile.phone_number || '—';
        document.getElementById('avatar-initial').textContent = initial.toLocaleUpperCase('uz-UZ');
        document.getElementById('profile-avatar').textContent = initial.toLocaleUpperCase('uz-UZ');

        if (profile.gender === 'female' || profile.gender === 'male') {
            document.getElementById('profile-gender').textContent = profile.gender === 'female' ? 'Ayol' : 'Erkak';
            document.getElementById('profile-gender-row').hidden = false;
        }
    }

    async function verifySession() {
        loading.hidden = false;
        errorView.hidden = true;
        dashboard.hidden = true;

        try {
            const profile = await window.YoningdaAuthApi.currentUser();
            populateSafeProfile(profile);
            loading.hidden = true;
            dashboard.hidden = false;
            setView('home');
        } catch (error) {
            if (error.status === 401 || error.code === 'authentication_required') {
                window.location.replace('login.html');
                return;
            }
            showAuthenticationError(window.YoningdaAuthApi.messageFor(error, 'session'));
        }
    }

    document.querySelectorAll('[data-view]').forEach(function (button) {
        button.addEventListener('click', function () {
            setView(button.dataset.view);
            const activePanel = document.querySelector(`[data-panel="${button.dataset.view}"]`);
            const heading = activePanel && activePanel.querySelector('h1');
            if (heading) heading.focus({ preventScroll: true });
            window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                    ? 'auto'
                    : 'smooth'
            });
        });
    });

    document.querySelectorAll('.mood-option').forEach(function (button) {
        button.addEventListener('click', function () {
            document.querySelectorAll('.mood-option').forEach(function (option) {
                option.setAttribute('aria-pressed', String(option === button));
            });
            document.getElementById('mood-status').textContent =
                `“${button.dataset.mood}” tanlovi faqat shu sahifada ko‘rinadi; yuborilmadi va saqlanmadi.`;
        });
    });

    document.getElementById('logout-button').addEventListener('click', async function (event) {
        const button = event.currentTarget;
        const error = document.getElementById('logout-error');
        button.disabled = true;
        button.textContent = 'Chiqilmoqda…';
        error.textContent = '';

        try {
            await window.YoningdaAuthApi.logout();
            [
                'yoningda_profile_user_id',
                'yoningda_gender',
                'yoningda_age',
                'yoningda_questionnaire'
            ].forEach(function (key) {
                localStorage.removeItem(key);
            });
            window.location.replace('index.html');
        } catch (logoutError) {
            error.textContent = window.YoningdaAuthApi.messageFor(logoutError, 'logout');
            button.disabled = false;
            button.textContent = 'Tizimdan chiqish';
        }
    });

    retryButton.addEventListener('click', verifySession);
    verifySession();
}());
=======
(function () {
    'use strict';

    const loading = document.getElementById('auth-loading');
    const errorView = document.getElementById('auth-error');
    const dashboard = document.getElementById('dashboard');
    const errorMessage = document.getElementById('auth-error-message');
    const retryButton = document.getElementById('retry-auth');
    const viewTitles = {
        home: 'Home',
        search: 'Izlash',
        ai: 'AI yordamchi',
        chat: 'Chat',
        profile: 'Profil'
    };

    function showAuthenticationError(message) {
        loading.hidden = true;
        dashboard.hidden = true;
        errorMessage.textContent = message;
        errorView.hidden = false;
    }

    function setView(viewName) {
        if (!Object.prototype.hasOwnProperty.call(viewTitles, viewName)) return;

        document.querySelectorAll('[data-panel]').forEach(function (panel) {
            panel.hidden = panel.dataset.panel !== viewName;
        });
        document.querySelectorAll('.nav-item[data-view]').forEach(function (button) {
            const active = button.dataset.view === viewName;
            button.classList.toggle('is-active', active);
            if (active) button.setAttribute('aria-current', 'page');
            else button.removeAttribute('aria-current');
        });

        const heading = document.querySelector(`[data-panel="${viewName}"] h1`);
        if (heading) heading.setAttribute('tabindex', '-1');
        document.title = `YONINGDA — ${viewTitles[viewName]}`;
    }

    function populateSafeProfile(profile) {
        const name = typeof profile.display_name === 'string' && profile.display_name.trim()
            ? profile.display_name.trim()
            : 'do‘stim';
        const firstName = name.split(/\s+/)[0];
        const initial = Array.from(firstName)[0] || 'Y';

        document.getElementById('welcome-name').textContent = firstName;
        document.getElementById('profile-name').textContent = name;
        document.getElementById('profile-phone').textContent = profile.phone_number || '—';
        document.getElementById('avatar-initial').textContent = initial.toLocaleUpperCase('uz-UZ');
        document.getElementById('profile-avatar').textContent = initial.toLocaleUpperCase('uz-UZ');

        if (profile.gender === 'female' || profile.gender === 'male') {
            document.getElementById('profile-gender').textContent = profile.gender === 'female' ? 'Ayol' : 'Erkak';
            document.getElementById('profile-gender-row').hidden = false;
        }
    }

    async function verifySession() {
        loading.hidden = false;
        errorView.hidden = true;
        dashboard.hidden = true;

        try {
            const profile = await window.YoningdaAuthApi.currentUser();
            populateSafeProfile(profile);
            loading.hidden = true;
            dashboard.hidden = false;
            setView('home');
        } catch (error) {
            if (error.status === 401 || error.code === 'authentication_required') {
                window.location.replace('login.html');
                return;
            }
            showAuthenticationError(window.YoningdaAuthApi.messageFor(error, 'session'));
        }
    }

    document.querySelectorAll('[data-view]').forEach(function (button) {
        button.addEventListener('click', function () {
            setView(button.dataset.view);
            const activePanel = document.querySelector(`[data-panel="${button.dataset.view}"]`);
            const heading = activePanel && activePanel.querySelector('h1');
            if (heading) heading.focus({ preventScroll: true });
            window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                    ? 'auto'
                    : 'smooth'
            });
        });
    });

    document.querySelectorAll('.mood-option').forEach(function (button) {
        button.addEventListener('click', function () {
            document.querySelectorAll('.mood-option').forEach(function (option) {
                option.setAttribute('aria-pressed', String(option === button));
            });
            document.getElementById('mood-status').textContent =
                `“${button.dataset.mood}” tanlovi faqat shu sahifada ko‘rinadi; yuborilmadi va saqlanmadi.`;
        });
    });

    document.getElementById('logout-button').addEventListener('click', async function (event) {
        const button = event.currentTarget;
        const error = document.getElementById('logout-error');
        button.disabled = true;
        button.textContent = 'Chiqilmoqda…';
        error.textContent = '';

        try {
            await window.YoningdaAuthApi.logout();
            [
                'yoningda_profile_user_id',
                'yoningda_gender',
                'yoningda_age',
                'yoningda_questionnaire'
            ].forEach(function (key) {
                localStorage.removeItem(key);
            });
            window.location.replace('index.html');
        } catch (logoutError) {
            error.textContent = window.YoningdaAuthApi.messageFor(logoutError, 'logout');
            button.disabled = false;
            button.textContent = 'Tizimdan chiqish';
        }
    });

    retryButton.addEventListener('click', verifySession);
    verifySession();
}());
>>>>>>> e76fb39649d7a1e1c0f129abfdb571269e5e7a08
