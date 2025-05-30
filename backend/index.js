const express = require('express');
const cors = require('cors');
require('dotenv').config();
const OpenAI = require('openai');

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

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    // Kiểm tra nếu message chứa từ khoá tài liệu thì trả về link luôn
    const foundDoc = DOCS.find(
        (doc) =>
            message.toLowerCase().includes(doc.name.toLowerCase()) ||
            (message.toLowerCase().includes('file tải') && message.toLowerCase().includes('reactjs')),
    );
    if (foundDoc) {
        return res.json({
            reply: `Bạn có thể tải "${foundDoc.name}" tại đây: /${foundDoc.filename}`,
        });
    }

    // Nếu không phải hỏi tài liệu thì mới gọi OpenAI API
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

const PORT = 8000;
app.listen(PORT, () => console.log(`Backend chatbot chạy tại http://localhost:${PORT}`));
