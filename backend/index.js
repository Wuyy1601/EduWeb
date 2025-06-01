const express = require('express');
const cors = require('cors');
require('dotenv').config();
const OpenAI = require('openai');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

// Serve file tĩnh cho thư mục public (rất quan trọng)
app.use(express.static('public'));

const DOCS = [
    {
        name: 'đề cương reactjs',
        filename: 'Đề cương reactjs.docx',
        description: 'Tài liệu tổng hợp các nội dung chính của môn ReactJS.',
    },
    // ... thêm tài liệu khác
];
const COURSE_CONTEXT = `
Course 1: Lập trình Python cơ bản - 10 bài, có quiz cuối khoá.
Course 2: ReactJS chuyên sâu - 15 bài, project thực tế.
`;

mongoose.connect('mongodb://localhost:27017/DataChatBot', { useNewUrlParser: true, useUnifiedTopology: true });

const DocumentSchema = new mongoose.Schema({
    title: String,
    description: String,
    subject: String,
    major: String,
    language: String,
    subLanguage: String,
    level: String,
    note: String,
    filename: String,
    originalname: String,
    createdAt: { type: Date, default: Date.now }
});
const Document = mongoose.model('datadocs', DocumentSchema);

const upload = multer({ dest: 'uploads/' });

function normalize(str) {
    return str.toLowerCase().replace(/[\s\-_.]/g, '');
}

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    const docs = await Document.find({});
    const foundDoc = docs.find(doc =>
        normalize(doc.title).includes(normalize(message)) ||
        normalize(doc.description).includes(normalize(message)) ||
        normalize(doc.subject).includes(normalize(message))
    );
    if (foundDoc) {
        // Nếu có file, trả về link download dạng Markdown
        if (foundDoc.filename) {
            return res.json({
                reply: `Tài liệu "${foundDoc.title}": ${foundDoc.description || "Không có mô tả"}\n[Download file](/uploads/${foundDoc.filename})`
            });
        } else {
            return res.json({
                reply: `Tài liệu "${foundDoc.title}": ${foundDoc.description || "Không có mô tả"}`
            });
        }
    }
    // Nếu không có, gọi OpenAI như cũ (giữ nguyên phần này)
    const systemPrompt = `
    Bạn là chatbot tư vấn khoá học. Khi người dùng hỏi tài liệu, hãy nói rõ: "File tải về tại: /[filename].docx"
    Nếu không có file, chỉ cung cấp thông tin tổng quan.
    Dữ liệu khoá học:
    ${COURSE_CONTEXT}
  `;
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message },
            ],
            temperature: 0.6,
            max_tokens: 512,
        });
        res.json({ reply: completion.choices[0].message.content });
    } catch (err) {
        console.error(err);
        res.status(500).json({ reply: 'Có lỗi khi gọi OpenAI API.' });
    }
});


app.post('/api/documents', upload.single('file'), async (req, res) => {
    try {
        const { title, description, subject, major, language, subLanguage, level, note } = req.body;

        if (!req.file) {
            console.log("Không nhận được file upload từ frontend.");
        } else {
            console.log("File nhận được:", req.file);
        }

        const doc = await Document.create({
            title, description, subject, major, language, subLanguage, level, note,
            filename: req.file ? req.file.filename : null,
            originalname: req.file ? req.file.originalname : null
        });

        console.log("Đã lưu vào MongoDB:", doc);
        res.json({ success: true, document: doc });
    } catch (error) {
        console.error("Lỗi khi lưu vào DB:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// API trả file download
app.get('/uploads/:filename', async (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    // Tìm document theo filename
    const doc = await Document.findOne({ filename: req.params.filename });
    if (!doc) return res.status(404).send('Không tìm thấy file');
    res.download(filePath, doc.originalname || req.params.filename, (err) => {
        if (err) {
            console.log('Download error:', err);
            res.status(404).send('Không tìm thấy file');
        }
    });
});

// Lấy danh sách tài liệu, có thể filter theo query
app.get('/api/documents', async (req, res) => {
    try {
        const { subject, major, language, level } = req.query;
        const filter = {};
        if (subject) filter.subject = subject;
        if (major) filter.major = major;
        if (language) filter.language = language;
        if (level) filter.level = level;
        const docs = await Document.find(filter);
        res.json(docs);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy danh sách tài liệu' });
    }
});

// Xóa tài liệu theo id
app.delete('/api/documents/:id', async (req, res) => {
    try {
        await Document.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi xóa tài liệu' });
    }
});

// Sửa thông tin tài liệu
app.put('/api/documents/:id', async (req, res) => {
    try {
        const update = req.body;
        const doc = await Document.findByIdAndUpdate(req.params.id, update, { new: true });
        res.json({ success: true, document: doc });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi cập nhật tài liệu' });
    }
});

// Middleware debug routes (thêm vào cuối index.js)
app.use((req, res, next) => {
    console.log(`Route không tìm thấy: ${req.method} ${req.url}`);
    res.status(404).json({ error: "Route không tìm thấy", url: req.url });
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Backend chatbot chạy tại http://localhost:${PORT}`));
