import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'answers.json');

// Ensure data directory and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify(
      {
        description: "Khadija's Birthday Reflection Responses",
        createdAt: new Date().toISOString(),
        submissions: []
      },
      null,
      2
    )
  );
}

app.use(express.json());

// Helper to read database
function readDatabase() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return { submissions: [] };
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading answers file:', err);
    return { submissions: [] };
  }
}

// Helper to write database
function writeDatabase(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing answers file:', err);
    return false;
  }
}

// Save answers route
app.post('/api/answers', (req, res) => {
  try {
    const { sessionId, respondent, answers, completedAt, totalQuestions, currentQuestionIndex } = req.body;

    if (!sessionId || !answers) {
      return res.status(400).json({ error: 'Missing sessionId or answers' });
    }

    const db = readDatabase();
    if (!Array.isArray(db.submissions)) {
      db.submissions = [];
    }

    const existingIndex = db.submissions.findIndex((sub: any) => sub.sessionId === sessionId);

    const submissionData = {
      sessionId,
      respondent: respondent || 'Khadija (tassa)',
      updatedAt: new Date().toISOString(),
      completedAt: completedAt || (answers.length >= 15 ? new Date().toISOString() : null),
      totalQuestions: totalQuestions || 15,
      answeredCount: answers.length,
      isComplete: answers.length >= 15,
      answers, // array of { questionId, question, optionKey, optionText, answeredAt }
    };

    if (existingIndex >= 0) {
      db.submissions[existingIndex] = {
        ...db.submissions[existingIndex],
        ...submissionData,
      };
    } else {
      db.submissions.unshift({
        createdAt: new Date().toISOString(),
        ...submissionData,
      });
    }

    writeDatabase(db);
    return res.json({ success: true, submission: submissionData });
  } catch (error: any) {
    console.error('Failed to save answers:', error);
    return res.status(500).json({ error: 'Failed to save answers' });
  }
});

// Admin login route
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  // Supports default admin credentials or customized password
  const validUsername = process.env.ADMIN_USER || 'admin';
  const validPassword = process.env.ADMIN_PASSWORD || 'tassa2025';
  const altPassword = 'tassa'; // convenient alternative

  if (
    username === validUsername &&
    (password === validPassword || password === altPassword)
  ) {
    return res.json({
      success: true,
      token: 'auth_' + Date.now(),
      message: 'Logged in successfully',
    });
  }

  return res.status(401).json({
    success: false,
    error: 'Invalid username or password',
  });
});

// Get all answers (database.json content)
app.get('/api/answers', (req, res) => {
  const db = readDatabase();
  res.json(db);
});

// Clear answers
app.delete('/api/answers', (req, res) => {
  const db = {
    description: "Khadija's Birthday Reflection Responses",
    clearedAt: new Date().toISOString(),
    submissions: [],
  };
  writeDatabase(db);
  res.json({ success: true, message: 'Responses cleared' });
});

// Serve frontend: Vite middlewares for dev, static files for production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
