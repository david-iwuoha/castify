require('dotenv').config();

const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios');
const Groq = require('groq-sdk');

const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// ✅ FRONTEND (DO NOT REMOVE)
app.use(express.static('./'));

// ✅ AUDIO FILES ACCESS
app.use('/uploads', express.static('uploads'));

// -------------------------------
// 🔍 HEALTH CHECK (GROQ TEST)
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
            groq_key: !!process.env.GROQ_API_KEY,
            yarn_key: !!process.env.YARN_GPT_API_KEY
        });

    } catch (error) {
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

    const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.1-8b-instant",
        temperature: 0.2
    });

    const raw = chatCompletion.choices[0].message.content;

    console.log("\nRAW AI OUTPUT:\n", raw);

    const jsonStart = raw.indexOf('{');
    const jsonEnd = raw.lastIndexOf('}') + 1;

    if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error("AI did not return valid JSON");
    }

    return JSON.parse(raw.substring(jsonStart, jsonEnd));
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

        const buffer = fs.readFileSync(req.file.path);

        const parseFunc =
            typeof pdfParse === 'function'
                ? pdfParse
                : pdfParse.default;

        const pdfData = await parseFunc(buffer);

        console.log("PDF parsed. Sending to Groq...");

        const result = await generateScript(pdfData.text);

        fs.unlinkSync(req.file.path);

        res.json(result);

    } catch (error) {
        console.error("PDF Error:", error.message);

        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({ error: error.message });
    }
});

// -------------------------------
// 🔊 YARN GPT: VOICE GENERATION
// FIXED WITHOUT BREAKING OLD FLOW
// -------------------------------
async function generateVoice(text, episodeId, voice) {
    try {
        const allowedVoices = [
            "Idera",
            "Emma",
            "Zainab",
            "Osagie",
            "Wura",
            "Jude",
            "Chinenye"
        ];

        const selectedVoice = allowedVoices.includes(voice)
            ? voice
            : "Idera";

        console.log(`Generating voice for Episode ${episodeId}`);

        const response = await axios.post(
            'https://yarngpt.ai/api/v1/tts',
            {
                text: text,
                voice: selectedVoice,
                response_format: "mp3"
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.YARN_GPT_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                responseType: 'arraybuffer'
            }
        );

        const fileName = `audio_ep_${episodeId}_${Date.now()}.mp3`;
        const filePath = `./uploads/${fileName}`;

        fs.writeFileSync(filePath, response.data);

        return fileName;

    } catch (error) {
        console.error(
            "Yarn GPT Error:",
            error.response?.data
                ? error.response.data.toString()
                : error.message
        );

        throw new Error("Yarn GPT failed");
    }
}

// -------------------------------
// 🎙 AUDIO ENDPOINT
// -------------------------------
app.post('/produce-audio', async (req, res) => {
    try {
        const { script, episodeId, voice } = req.body;

        if (!script) {
            return res.status(400).json({ error: "Missing script" });
        }

        const audioFile = await generateVoice(
            script,
            episodeId || 1,
            voice
        );

        res.json({
            success: true,
            audioUrl: `/uploads/${audioFile}`
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// -------------------------------
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Castify Backend Live: http://localhost:${PORT}`);
});