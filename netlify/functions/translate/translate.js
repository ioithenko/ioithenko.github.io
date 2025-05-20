const fetch = require('node-fetch');

exports.handler = async (event) => {
  // Устанавливаем CORS заголовки
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Обрабатываем OPTIONS запрос (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight response' })
    };
  }

  // Проверяем метод запроса
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Парсим тело запроса
    const { text } = JSON.parse(event.body);
    if (!text || typeof text !== 'string') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid text input' })
      };
    }

    // Логируем запрос (для отладки)
    console.log('Translating text:', text.substring(0, 50) + '...');

    // Запрос к Hugging Face API
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

    // Обрабатываем ответ Hugging Face
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Hugging Face API error:', errorData);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ 
          error: 'Translation service unavailable',
          details: errorData 
        })
      };
    }

    const data = await response.json();
    
    // Проверяем структуру ответа
    if (!data || !Array.isArray(data) || !data[0].translation_text) {
      throw new Error('Invalid response format from translation service');
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        translation: data[0].translation_text,
        detectedLanguage: 'ru'
      })
    };

  } catch (error) {
    console.error('Translation error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      })
    };
  }
};