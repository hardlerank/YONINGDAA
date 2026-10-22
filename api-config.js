<<<<<<< HEAD
/*
 * Public frontend API configuration for static hosting (including Vercel).
 * Replace the empty value with the exact HTTPS API origin before deployment,
 * for example: https://<YOUR_BACKEND_HOST>
 *
 * This is public browser code. Never put credentials, database URLs, or secrets here.
 * Leave empty until the real backend origin is known; auth-api.js will then show
 * a configuration error instead of sending requests to the frontend origin.
 *
 * A deployment may instead define window.YONINGDA_API_BASE_URL or
 * window.YONINGDA_CONFIG.apiBaseUrl before loading this file.
 */
if (typeof window.YONINGDA_API_BASE_URL === 'undefined') {
    window.YONINGDA_API_BASE_URL =
        typeof window.YONINGDA_CONFIG?.apiBaseUrl === 'string'
            ? window.YONINGDA_CONFIG.apiBaseUrl
            : '';
}
=======
/*
 * Public frontend API configuration for static hosting (including Vercel).
 * Replace the empty value with the exact HTTPS API origin before deployment,
 * for example: https://<YOUR_BACKEND_HOST>
 *
 * This is public browser code. Never put credentials, database URLs, or secrets here.
 * Leave empty until the real backend origin is known; auth-api.js will then show
 * a configuration error instead of sending requests to the frontend origin.
 *
 * A deployment may instead define window.YONINGDA_API_BASE_URL or
 * window.YONINGDA_CONFIG.apiBaseUrl before loading this file.
 */
if (typeof window.YONINGDA_API_BASE_URL === 'undefined') {
    window.YONINGDA_API_BASE_URL =
        typeof window.YONINGDA_CONFIG?.apiBaseUrl === 'string'
            ? window.YONINGDA_CONFIG.apiBaseUrl
            : '';
}
>>>>>>> e76fb39649d7a1e1c0f129abfdb571269e5e7a08
