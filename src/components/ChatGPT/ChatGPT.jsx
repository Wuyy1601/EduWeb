import { useState } from 'react';

function ChatGPT() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        setLoading(true);
        try {
            const res = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini', // Hoặc "gpt-4o"
                    messages: [{ role: 'user', content: input }],
                }),
            });

            const data = await res.json();
            setResponse(data.choices?.[0]?.message?.content || 'Không có phản hồi');
        } catch (err) {
            setResponse('⚠️ Đã xảy ra lỗi');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ background: '#f1f1f1', padding: 20, borderRadius: 8 }}>
            <h3>🤖 Trợ lý AI</h3>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
                placeholder="Hỏi AI điều gì đó..."
                style={{ width: '100%', marginBottom: 10 }}
            />
            <br />
            <button onClick={handleSend} disabled={loading}>
                {loading ? 'Đang xử lý...' : 'Gửi'}
            </button>
            <div style={{ marginTop: 15, whiteSpace: 'pre-wrap' }}>
                <strong>GPT:</strong> {response}
            </div>
        </div>
    );
}

export default ChatGPT;
