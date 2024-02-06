const emailAnchor = document.getElementById('contact-email');
const turnstileContainer = document.getElementById('cf-turnstile-iframe');

const sitekey = (() => {
    if (window.location.hostname === 'www.powerium.io') return '0x4AAAAAAAQ3M_-Iq3x2fswz';
    else return '0x4AAAAAAAQ3UBXJ3dlYJlAZ';
})();

window.onloadTurnstileCallback = function () {
    turnstile.render(turnstileContainer, {
        sitekey: sitekey,
        action: 'email-reveal',
        size: 'compact',
        callback: async function (token) {
            const response = await fetch('/api/email-reveal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: token }),
            });

            const result = await parseCFTurnstileResult(response);

            if (result.success) {
                emailAnchor.href = `mailto:${result.email}`;
            } else {
                const notice = `Failed to retrieve email address: ${result.error}`;
                emailAnchor.href = `javascript:alert('${notice}');`;
            }

            turnstileContainer.style.display = 'none';
        },
    });
};

async function parseCFTurnstileResult(response) {
    let responseJson = undefined;

    try {
        responseJson = await response.json();
    } catch (_error) {
        return {
            success: false,
            error: `Failed to communicate with Turnstile verification backend: ${response.status} ${response.statusText}.`,
        };
    }

    if (responseJson.success) {
        return {
            success: true,
            email: responseJson.email,
        };
    } else {
        return {
            success: false,
            error: `Failed to retrieve email address: ${responseJson.error}.`,
        };
    }
}
