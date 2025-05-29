import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

function ChatGPT() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 100 });

    const bubbleRef = useRef(null);
    const offset = useRef({ x: 0, y: 0 });
    const dragging = useRef(false);

    // Kéo thả
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!dragging.current) return;
            setPosition({
                top: e.clientY - offset.current.y,
                left: e.clientX - offset.current.x,
            });
        };

        const handleMouseUp = () => {
            dragging.current = false;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const startDrag = (e) => {
        dragging.current = true;
        offset.current = {
            x: e.clientX - position.left,
            y: e.clientY - position.top,
        };
    };

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
                    model: 'gpt-4o-mini',
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
        <>
            {/* Bóng chat thu nhỏ */}
            {!isOpen && (
                <div
                    ref={bubbleRef}
                    onMouseDown={startDrag}
                    onClick={() => setIsOpen(true)}
                    style={{
                        position: 'fixed',
                        top: position.top,
                        right: 20, // giữ sát phải
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        backgroundColor: '#007bff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        fontSize: 24,
                        cursor: 'grab',
                        zIndex: 1000,
                        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                    }}
                >
                    <FontAwesomeIcon icon={faRobot} />
                </div>
            )}

            {/* Khung chat mở rộng */}
            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: position.top,
                        right: 20, // vẫn sát phải
                        width: 300,
                        height: 400,
                        background: '#f1f1f1',
                        padding: 20,
                        borderRadius: 10,
                        boxShadow: '0 0 20px rgba(0,0,0,0.2)',
                        zIndex: 1001,
                    }}
                >
                    <button
                        onClick={() => setIsOpen(false)}
                        style={{
                            position: 'absolute',
                            top: 5,
                            right: 5,
                            background: 'transparent',
                            border: 'none',
                            fontSize: 18,
                            cursor: 'pointer',
                        }}
                    >
                        ❌
                    </button>
                    <h3>Hỏi đáp vấn đề học tập</h3>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={3}
                        placeholder="Hỏi về học tập, tài liệu, hoặc bất kỳ điều gì khác..."
                        style={{ width: '100%', marginBottom: 10 }}
                    />
                    <button onClick={handleSend} disabled={loading}>
                        {loading ? 'Đang xử lý...' : 'Gửi'}
                    </button>
                    <div style={{ marginTop: 15, whiteSpace: 'pre-wrap', height: 200, overflowY: 'auto' }}>
                        <strong>Trợ lý AI</strong> {response}
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatGPT;
