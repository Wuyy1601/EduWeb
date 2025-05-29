import { useState } from 'react';

export default function ChatBot() {
    const [msg, setMsg] = useState('');
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMsg = async () => {
        if (!msg.trim()) return;
        setLoading(true);
        setHistory((h) => [...h, { from: 'user', text: msg }]);
        const userMsg = msg;
        setMsg('');
        try {
            const res = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg }),
            });
            const data = await res.json();
            setHistory((h) => [...h, { from: 'bot', text: data.reply }]);
        } catch (err) {
            setHistory((h) => [...h, { from: 'bot', text: 'Lỗi kết nối server!' }]);
        }
        setLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') sendMsg();
    };

    // Hàm tự động phát hiện và render link tải file docx
    function renderMessage(text) {
        // Regex tìm đường dẫn file .docx trong câu trả lời
        const match = text.match(/\/[^\s]+\.docx/);
        if (match) {
            return (
                <span>
                    {text.split(match[0])[0]}
                    <a href={match[0]} target="_blank" rel="noopener noreferrer" style={{ color: '#0a6ebd' }}>
                        {match[0]}
                    </a>
                    {text.split(match[0])[1]}
                </span>
            );
        }
        return text;
    }

    return (
        <div
            style={{
                maxWidth: 500,
                margin: '20px auto',
                padding: 16,
                borderRadius: 16,
                background: '#f6f8fa',
                boxShadow: '0 2px 8px #eee',
            }}
        >
            <h2 style={{ textAlign: 'center' }}>AI Chatbot Tư vấn Khóa học</h2>
            <div
                style={{
                    minHeight: 180,
                    maxHeight: 320,
                    overflowY: 'auto',
                    marginBottom: 8,
                    padding: 8,
                    background: '#fff',
                    borderRadius: 8,
                }}
            >
                {history.length === 0 && (
                    <div style={{ color: '#bbb' }}>Chào bạn! Hỏi mình về các khoá học hoặc xin tài liệu nhé.</div>
                )}
                {history.map((item, i) => (
                    <div key={i} style={{ textAlign: item.from === 'user' ? 'right' : 'left', margin: '8px 0' }}>
                        <span style={{ fontWeight: 'bold', color: item.from === 'user' ? '#0366d6' : '#e36209' }}>
                            {item.from === 'user' ? 'Bạn' : 'Bot'}
                        </span>
                        : {renderMessage(item.text)}
                    </div>
                ))}
                {loading && <div>Đang trả lời...</div>}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
                <input
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Nhập câu hỏi về khoá học hoặc tài liệu..."
                    style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
                    disabled={loading}
                />
                <button
                    onClick={sendMsg}
                    style={{
                        padding: '8px 18px',
                        borderRadius: 8,
                        background: '#0366d6',
                        color: '#fff',
                        border: 'none',
                    }}
                    disabled={loading}
                >
                    Gửi
                </button>
            </div>
        </div>
    );
}
