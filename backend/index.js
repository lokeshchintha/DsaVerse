import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/analyze-code', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: 'Code is missing or invalid' });
    }

    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': process.env.GPT_KEY,
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: `Analyze this code and suggest improvements:\n\n${code}`
          }
        ],
        web_access: false
      })
    };

    const response = await fetch('https://chatgpt-42.p.rapidapi.com/gpt4', options);
    
    if (!response.ok) {
      console.error('GPT API error:', response.statusText);
      return res.status(500).json({ error: 'Failed to get response from GPT API' });
    }

    const result = await response.text();
    res.send(result);
  } catch (error) {
    console.error('Server error during analysis:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/send-message', async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await fetch('https://chatgpt-42.p.rapidapi.com/gpt4', {
      method: 'POST',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: messages || [],
        web_access: false
      })
    });

    const result = await response.text();
    res.send(result);
  } catch (error) {
    console.error("Backend GPT API Error:", error);
    res.status(500).json({ error: "Failed to connect to GPT API" });
  }
});

app.post('/api/generate-questions', async (req, res) => {
  try {
    const { topics, numQuestions } = req.body;

    const prompt = `Generate ${numQuestions || 5} multiple-choice aptitude questions on the topics: ${topics.join(', ')}.
Each question should include:
- question
- 4 options
- correct answer
- short explanation

Format output strictly as a JSON array like this:
[
  {
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "correct": "B",
    "explanation": "..."
  }
]
`;

    const response = await fetch('https://chatgpt-42.p.rapidapi.com/gpt4', {
      method: 'POST',
      headers: {
        'x-rapidapi-key': process.env.GPT_KEY,
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
        web_access: false
      })
    });

    const result = await response.text();

    res.send(result);
  } catch (error) {
    console.error("Backend GPT API Error:", error);
    res.status(500).json({ error: "Failed to connect to GPT API" });
  }
});

app.post('/api/analyze-code1', async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }

  const prompt = `Analyze the following code and provide structured JSON output with the following schema:
{
  qualityScore: number,
  complexity: { time: string, space: string, cyclomatic: number },
  metrics: { lines: number, functions: number, classes: number, comments: number },
  issues: [{ type: string, severity: string, message: string, line: number, suggestion: string }],
  suggestions: string[],
  patterns: [{ name: string, detected: boolean, relevance: string }],
  securityIssues: [{ type: string, severity: string, description: string }]
}
CODE:
${code}`;

  try {
    const response = await fetch(`https://chatgpt-42.p.rapidapi.com/gpt4`, {
      method: 'POST',
      headers: {
        'x-rapidapi-key': process.env.GPT_KEY,
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
        web_access: false,
      }),
    });

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    res.json({ content });
  } catch (error) {
    console.error('Error from RapidAPI:', error);
    res.status(500).json({ error: 'Failed to analyze code' });
  }
});


app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

