(function () {
    'use strict';

    const configuredBaseUrl =
        window.YONINGDA_API_BASE_URL ??
        window.YONINGDA_CONFIG?.apiBaseUrl ??
        '';

    class ApiError extends Error {
        constructor(status, code, message) {
            super(message);
            this.name = 'ApiError';
            this.status = status;
            this.code = code;
        }
    }

    function getBaseUrl() {
        if (typeof configuredBaseUrl !== 'string' || !configuredBaseUrl.trim()) {
            throw new ApiError(
                0,
                'api_configuration_missing',
                'API manzili sozlanmagan.'
            );
        }

        let parsed;
        try {
            parsed = new URL(configuredBaseUrl.trim());
        } catch {
            throw new ApiError(0, 'api_configuration_invalid', 'API manzili noto‘g‘ri.');
        }

        const isLoopback = ['localhost', '127.0.0.1', '[::1]'].includes(parsed.hostname);
        if (
            !['https:', 'http:'].includes(parsed.protocol) ||
            (parsed.protocol !== 'https:' && !isLoopback) ||
            parsed.username ||
            parsed.password ||
            (parsed.pathname !== '/' && parsed.pathname !== '') ||
            parsed.search ||
            parsed.hash
        ) {
            throw new ApiError(
                0,
                'api_configuration_invalid',
                'API manzili faqat xavfsiz origin ko‘rinishida bo‘lishi kerak.'
            );
        }

        return parsed.origin;
    }

    async function request(path, {
        method = 'GET', body, csrf = false, credentials = 'include'
    } = {}) {
        const baseUrl = getBaseUrl();
        const headers = { Accept: 'application/json' };
        const options = {
            method,
            headers,
            credentials,
            cache: 'no-store'
        };

        if (body !== undefined) {
            headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }

        if (csrf) {
            const csrfResponse = await fetch(`${baseUrl}/api/auth/csrf`, {
                credentials: 'include',
                cache: 'no-store',
                headers: { Accept: 'application/json' }
            });
            const csrfPayload = await parseResponse(csrfResponse);
            if (!csrfResponse.ok) {
                throw toApiError(csrfResponse.status, csrfPayload);
            }
            headers['X-CSRF-Token'] = csrfPayload.csrf_token;
        }

        const response = await fetch(`${baseUrl}${path}`, options);
        const payload = await parseResponse(response);
        if (!response.ok) {
            throw toApiError(response.status, payload);
        }
        return payload;
    }

    async function parseResponse(response) {
        try {
            return await response.json();
        } catch {
            return {};
        }
    }

    function toApiError(status, payload) {
        const error = payload?.error || {};
        return new ApiError(
            status,
            typeof error.code === 'string' ? error.code : 'request_failed',
            typeof error.message === 'string' ? error.message : ''
        );
    }

    function toNetworkError(error) {
        if (error instanceof ApiError) return error;
        return new ApiError(0, 'network_error', 'API bilan bog‘lanib bo‘lmadi.');
    }

    function messageFor(error, context = 'general') {
        if (error?.code === 'api_configuration_missing') {
            return 'Tizim API manzili hali sozlanmagan. YONINGDA administratoriga murojaat qiling.';
        }
        if (error?.code === 'api_configuration_invalid') {
            return 'Tizim API manzili noto‘g‘ri sozlangan. YONINGDA administratoriga murojaat qiling.';
        }
        if (error?.code === 'network_error') {
            return 'Server bilan bog‘lanib bo‘lmadi. Internet va server holatini tekshirib, qayta urinib ko‘ring.';
        }
        if (error?.code === 'phone_number_already_registered') {
            return 'Bu telefon raqam bilan hisob mavjud. Kirish sahifasidan foydalaning.';
        }
        if (error?.code === 'invalid_credentials') {
            return 'Telefon raqam yoki parol noto‘g‘ri. Ma’lumotlarni tekshirib, qayta urinib ko‘ring.';
        }
        if (error?.code === 'authentication_required') {
            return 'Sessiya topilmadi yoki muddati tugagan. Qayta kiring.';
        }
        if (error?.status === 403) {
            return 'Xavfsizlik tekshiruvi bajarilmadi. Sahifani yangilab, qayta urinib ko‘ring.';
        }
        if (error?.status === 422) {
            return context === 'register'
                ? 'Kiritilgan ma’lumotlar talabga mos emas. Ism, telefon va parolni tekshiring.'
                : 'Telefon raqam yoki parol formati noto‘g‘ri.';
        }
        if (error?.status >= 500) {
            return 'Hisob xizmati vaqtincha ishlamayapti. Keyinroq qayta urinib ko‘ring.';
        }
        return 'So‘rovni bajarib bo‘lmadi. Qayta urinib ko‘ring.';
    }

    async function safeRequest(path, options) {
        try {
            return await request(path, options);
        } catch (error) {
            throw toNetworkError(error);
        }
    }

    window.YoningdaAuthApi = Object.freeze({
        ApiError,
        messageFor,
        register(payload) {
            return safeRequest('/api/auth/register', {
                method: 'POST',
                body: payload,
                credentials: 'omit'
            });
        },
        login(payload) {
            return safeRequest('/api/auth/login', {
                method: 'POST',
                body: payload,
                csrf: true
            });
        },
        currentUser() {
            return safeRequest('/api/auth/me');
        },
        logout() {
            return safeRequest('/api/auth/logout', {
                method: 'POST',
                csrf: true
            });
        }
    });
}());