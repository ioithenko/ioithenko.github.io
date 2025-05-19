const fetch = require('node-fetch');

exports.handler = async (event) => {
  // Проверяем наличие текста
  const { text } = JSON.parse(event.body);
  if (!text) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Текст для перевода не предоставлен" })
    };
  }

  try {
    // Запрос к Hugging Face
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

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Hugging Face API error: ${error}`);
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ translation: data[0].translation_text })
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: "Ошибка перевода",
        details: error.message 
      })
    };
  }
};