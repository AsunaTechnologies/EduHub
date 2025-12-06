// Vercel Serverless Function - AI Proxy
// This proxies requests to the educational AI API to avoid CORS issues

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        console.log('Proxying AI request:', prompt.substring(0, 100) + '...');

        const apiResponse = await fetch('https://educational-datahub.onrender.com/api/v1/gemini/generate-educational', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        if (!apiResponse.ok) {
            const errorText = await apiResponse.text();
            console.error('AI API Error:', apiResponse.status, errorText);
            return res.status(apiResponse.status).json({ 
                error: 'AI API request failed', 
                status: apiResponse.status,
                details: errorText
            });
        }

        const data = await apiResponse.json();
        console.log('AI Response received successfully');
        
        return res.status(200).json(data);

    } catch (error) {
        console.error('Proxy Error:', error);
        return res.status(500).json({ 
            error: 'Internal server error', 
            message: error.message 
        });
    }
}

