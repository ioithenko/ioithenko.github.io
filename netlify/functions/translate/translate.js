const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Проверяем авторизацию через Netlify Identity
  if (!context.clientContext.user) {
    return { statusCode: 401, body: 'Unauthorized' };
  }

  try {
    const { text } = JSON.parse(event.body);
    const response = await fetch(
      'https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-ru-en',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: text })
      }
    );

    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ translation: data[0].translation_text })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};