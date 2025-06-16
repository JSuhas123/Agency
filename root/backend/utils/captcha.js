import axios from 'axios';
import qs from 'qs'; // helps with x-www-form-urlencoded encoding

export const verifyCaptcha = async (token) => {
  try {
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      qs.stringify({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: token,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data.success;
  } catch (error) {
    console.error('Captcha verification failed:', error);
    return false;
  }
};
