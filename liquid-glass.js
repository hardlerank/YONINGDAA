(() => {
    const surfaceSelector = [
        '.glass-card', '.glass-panel', '.login-card', '.profile-card',
        '.register-card', '.verify-card', '.feature-info', '.support-card',
        '.main-header', '.main-card', '.input-box', '.code-input', '.age-select',
        '.question-option', '.custom-answer', '.problem-tag', '.auth-tab', '.feature-button', '.profile-mini',
        '.gender-button', '.category-button', '.problem-button', '.buttons button',
        '.primary-button', '.continue-button', '.verify-button', '.login-button', '.back-button',
        '.secondary-button', '.register-button', '.forgot-button', '.resend-button', '.login-link', '.link-button', '.eye-button'
    ].join(',');

    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !('PointerEvent' in window)) {
        return;
    }

    let activeSurface = null;
    let latestPointer = null;
    let frameRequested = false;

    function renderPointerLight() {
        frameRequested = false;
        if (!activeSurface || !latestPointer || !activeSurface.isConnected) return;

        const bounds = activeSurface.getBoundingClientRect();
        const x = Math.min(100, Math.max(0, ((latestPointer.clientX - bounds.left) / bounds.width) * 100));
        const y = Math.min(100, Math.max(0, ((latestPointer.clientY - bounds.top) / bounds.height) * 100));

        activeSurface.style.setProperty('--glass-x', `${x}%`);
        activeSurface.style.setProperty('--glass-y', `${y}%`);
    }

    document.addEventListener('pointerover', (event) => {
        const surface = event.target.closest(surfaceSelector);
        if (!surface || surface === activeSurface) return;

        if (activeSurface) activeSurface.style.setProperty('--glass-cursor-opacity', '0');
        activeSurface = surface;
        activeSurface.style.setProperty('--glass-cursor-opacity', '0.14');
        latestPointer = event;
        if (!frameRequested) {
            frameRequested = true;
            requestAnimationFrame(renderPointerLight);
        }
    }, { passive: true });

    document.addEventListener('pointermove', (event) => {
        if (!activeSurface) return;
        latestPointer = event;
        if (!frameRequested) {
            frameRequested = true;
            requestAnimationFrame(renderPointerLight);
        }
    }, { passive: true });

    document.addEventListener('pointerout', (event) => {
        if (!activeSurface || activeSurface.contains(event.relatedTarget)) return;
        const nextSurface = event.relatedTarget instanceof Element
            ? event.relatedTarget.closest(surfaceSelector)
            : null;
        if (nextSurface === activeSurface) return;

        activeSurface.style.setProperty('--glass-cursor-opacity', '0');
        activeSurface = nextSurface;
        latestPointer = nextSurface ? event : null;
        if (activeSurface) activeSurface.style.setProperty('--glass-cursor-opacity', '0.14');
        if (activeSurface && !frameRequested) {
            frameRequested = true;
            requestAnimationFrame(renderPointerLight);
        }
    }, { passive: true });
})();
