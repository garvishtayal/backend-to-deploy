exports.verifyCaptcha = async (req, res) => {
  const { captchaToken } = req.body;

  if (!captchaToken) {
    return res.status(400).json({ error: 'Captcha token is required' });
  }

  try {
    const fetch = (await import('node-fetch')).default;
    const secretKey = '6LdJOyEqAAAAAHqMxXy3JCo9TP8dJcHNIJcACiWZ';

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${captchaToken}`,
    });

    const data = await response.json();

    if (!data.success) {
      return res.status(401).json({ error: 'Captcha verification failed' });
    }

    res.json({ message: 'Captcha verified successfully' });

  } catch (error) {
    console.error('Captcha verification error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
