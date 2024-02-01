const cfTurnstileSecretKey = process.env.CF_TURNSTILE_SECRET_KEY;

export default async function revealEmail(req, res) {
    const { token } = req.body;
    // const { ip } = req.headers;

    let formData = new FormData();
    formData.append('secret', cfTurnstileSecretKey);
    formData.append('response', token);

    const cfTurnstileSiteverifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const result = await fetch(cfTurnstileSiteverifyEndpoint, {
        method: 'POST',
        body: formData,
    });

    const expectedAction = 'email-reveal';
    const outcome = await result.json();

    if (outcome.success && outcome.action === expectedAction) {
        res.status(200).send({ success: true, email: process.env.CONTACT_EMAIL });
        console.error("Reveal email failed: CF Turnstile succeeds but action doesn't match expected action");
    } else if (outcome.action !== expectedAction) {
        res.status(403).send({ success: false, error: `Actual action does not match expected action` });
    } else {
        res.status(500).send({ success: false, error: 'Internal server error' });
        console.error(`Reveal email failed: CF Turnstile failed: ${outcome['error-codes']}`);
    }
}
