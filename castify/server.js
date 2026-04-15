require('dotenv').config();

const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const cors = require('cors');
const fs = require('fs');
const Groq = require('groq-sdk');

const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// ✅ KEEP THIS (this is what makes your index.html work)
app.use(express.static('./'));

// -------------------------------
// 🔍 HEALTH CHECK (AI TEST)
// -------------------------------
app.get('/health', async (req, res) => {
    try {
        const test = await groq.chat.completions.create({
            messages: [{ role: "user", content: "Reply with OK" }],
            model: "llama-3.1-8b-instant",
            temperature: 0
        });

        res.json({
            status: "ok",
            ai: test.choices[0].message.content,
            key_loaded: !!process.env.GROQ_API_KEY
        });

    } catch (error) {
        console.error("Health Error:", error.message);

        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});

// -------------------------------
// 🧠 GROQ SCRIPT GENERATOR
// -------------------------------
async function generateScript(text) {
    const prompt = `
You MUST return ONLY valid JSON.

{
  "series_title": "Catchy Name",
  "episodes": [
    {
      "title": "Episode 1 Title",
      "script": "Conversational 300-word script",
      "scene_description": "Office or relevant setting",
      "quizzes": [
        {
          "question": "Question?",
          "options": ["A","B","C","D"],
          "answer": "A",
          "timestamp": 30
        }
      ]
    }
  ]
}

Tone: Nigerian conversational English.

Text:
${text.substring(0, 4000)}
`;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.1-8b-instant",
            temperature: 0.2
        });

        const raw = chatCompletion.choices[0].message.content;

        console.log("\nRAW AI OUTPUT:\n", raw);

        // ✅ Safe JSON extraction
        const jsonStart = raw.indexOf('{');
        const jsonEnd = raw.lastIndexOf('}') + 1;

        if (jsonStart === -1 || jsonEnd === -1) {
            throw new Error("AI did not return valid JSON");
        }

        const cleanJson = raw.substring(jsonStart, jsonEnd);

        return JSON.parse(cleanJson);

    } catch (error) {
        console.error("Groq Error:", error.message);
        throw new Error("Groq failed to generate script.");
    }
}

// -------------------------------
// 📄 PDF PROCESSOR
// -------------------------------
app.post('/process-pdf', upload.single('pdf'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }

        console.log("Processing:", req.file.originalname);

        const dataBuffer = fs.readFileSync(req.file.path);

        const parseFunc =
            typeof pdfParse === 'function'
                ? pdfParse
                : pdfParse.default;

        const pdfData = await parseFunc(dataBuffer);

        console.log("PDF parsed. Sending to Groq...");

        const castifyScript = await generateScript(pdfData.text);

        fs.unlinkSync(req.file.path);

        res.json(castifyScript);

    } catch (error) {
        console.error("Backend Error:", error.message);

        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({ error: error.message });
    }
});

// -------------------------------
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Castify Backend Live: http://localhost:${PORT}`);
});