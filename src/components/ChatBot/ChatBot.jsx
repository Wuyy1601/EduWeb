import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

function ChatBot({ onClose, position, onDrag, onDragEnd }) {
    // DRAG LOGIC
    const bubbleRef = useRef(null);
    const dragData = useRef({ x: 0, y: 0, dragging: false, offsetX: 0, offsetY: 0 });

    useEffect(() => {
        function onMouseMove(e) {
            if (!dragData.current.dragging) return;
            const newX = e.clientX - dragData.current.offsetX;
            const newY = e.clientY - dragData.current.offsetY;
            onDrag({ x: newX, y: newY });
        }
        function onMouseUp() {
            if (dragData.current.dragging) {
                dragData.current.dragging = false;
                onDragEnd && onDragEnd();
            }
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, [onDrag, onDragEnd]);

    function handleDragStart(e) {
        dragData.current.dragging = true;
        const rect = bubbleRef.current.getBoundingClientRect();
        dragData.current.offsetX = e.clientX - rect.left;
        dragData.current.offsetY = e.clientY - rect.top;
    }

    const [msg, setMsg] = useState('');
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatRef = useRef(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [history, loading]);

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

    function renderMessage(text) {
        // Nhận diện Markdown link [Download file](/uploads/xxxx.pdf)
        const mdLink = /\[([^\]]+)\]\((\/uploads\/[^\)]+)\)/g;
        const parts = [];
        let lastIndex = 0;
        let match;
        let idx = 0;
        while ((match = mdLink.exec(text)) !== null) {
            const before = text.substring(lastIndex, match.index);
            if (before) parts.push(<span key={idx++}>{before}</span>);
            parts.push(
                <a
                    key={idx++}
                    href={`http://localhost:8000${match[2]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0a6ebd', textDecoration: 'underline', fontWeight: 500 }}
                >
                    {match[1]}
                </a>,
            );
            lastIndex = match.index + match[0].length;
        }
        if (lastIndex < text.length) {
            parts.push(<span key={idx++}>{text.substring(lastIndex)}</span>);
        }
        // Nếu không match, trả về text thường
        return parts.length > 0 ? parts : text;
    }

    return (
        <div
            ref={bubbleRef}
            style={{
                maxWidth: 420,
                position: 'fixed',
                zIndex: 9999,
                left: 'auto',
                right: position.x,
                bottom: position.y,
                margin: 0,
                padding: 0,
                borderRadius: 16,
                background: '#f8fafc',
                boxShadow: '0 2px 16px #e0e7ef',
                width: '90vw',
                minWidth: 280,
                maxHeight: '80vh',
                cursor: 'grab',
                userSelect: 'none',
            }}
        >
            {/* Thanh kéo */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#0366d6',
                    color: '#fff',
                    borderRadius: '16px 16px 0 0',
                    padding: '8px 12px',
                    cursor: 'grab',
                    userSelect: 'none',
                    fontSize: '14px',
                }}
                onMouseDown={handleDragStart}
                title="Kéo để di chuyển chat"
            >
                <div style={{ fontWeight: 'bold' }}>AI Chatbot Tư vấn Khóa học</div>
                <button
                    onClick={onClose}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        fontSize: 20,
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        padding: '0 4px',
                    }}
                    aria-label="Đóng"
                >
                    ×
                </button>
            </div>
            <div
                ref={chatRef}
                style={{
                    minHeight: 180,
                    maxHeight: 'calc(80vh - 120px)',
                    overflowY: 'auto',
                    padding: '12px',
                    background: '#f6f8fa',
                    borderRadius: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                }}
            >
                {history.length === 0 && (
                    <div style={{ color: '#bbb', textAlign: 'center' }}>
                        Chào bạn! Hỏi mình về các khoá học hoặc xin tài liệu nhé.
                    </div>
                )}
                {history.map((item, i) => (
                    <div
                        key={i}
                        style={{
                            display: 'flex',
                            justifyContent: item.from === 'user' ? 'flex-end' : 'flex-start',
                        }}
                    >
                        <div
                            style={{
                                maxWidth: '80%',
                                padding: '10px 16px',
                                borderRadius: item.from === 'user' ? '18px 18px 6px 18px' : '18px 18px 18px 6px',
                                background: item.from === 'user' ? '#0366d6' : '#e5e7eb',
                                color: item.from === 'user' ? '#fff' : '#23262f',
                                fontSize: 15,
                                boxShadow: '0 1px 6px #e0e7ef',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                                marginLeft: item.from === 'user' ? 40 : 0,
                                marginRight: item.from === 'bot' ? 40 : 0,
                                transition: 'all 0.18s',
                            }}
                        >
                            {renderMessage(item.text)}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <div
                            style={{
                                background: '#e5e7eb',
                                color: '#23262f',
                                borderRadius: '18px 18px 18px 6px',
                                padding: '10px 16px',
                                maxWidth: '80%',
                            }}
                        >
                            Đang trả lời...
                        </div>
                    </div>
                )}
            </div>
            <div style={{
                display: 'flex',
                gap: 8,
                padding: '8px 12px',
                background: '#f6f8fa',
                borderRadius: '0 0 16px 16px'
            }}>
                <input
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Nhập câu hỏi về khoá học hoặc tài liệu..."
                    style={{
                        flex: 1,
                        padding: '8px 12px',
                        borderRadius: 12,
                        border: '1px solid #bbb',
                        fontSize: '14px'
                    }}
                    disabled={loading}
                />
                <button
                    onClick={sendMsg}
                    style={{
                        padding: '8px 16px',
                        borderRadius: 12,
                        background: '#0366d6',
                        color: '#fff',
                        border: 'none',
                        fontWeight: 'bold',
                        letterSpacing: 0.5,
                        boxShadow: '0 1px 3px #e0e7ef',
                        fontSize: '14px'
                    }}
                    disabled={loading}
                >
                    Gửi
                </button>
            </div>
        </div>
    );
}

// --- Container quản lý mở/tắt và vị trí ---
export default function ChatBotFloatTing() {
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState(() => {
        const padding = 16;
        const width = Math.min(420, window.innerWidth - (padding * 2));

        return {
            x: padding,  // Khoảng cách từ bên phải
            y: padding   // Khoảng cách từ dưới lên
        };
    });

    useEffect(() => {
        function handleResize() {
            const padding = 16;
            const width = Math.min(420, window.innerWidth - (padding * 2));
            const height = Math.min(520, window.innerHeight - (padding * 2));

            setPosition(pos => {
                const newX = Math.min(
                    Math.max(padding, pos.x),
                    window.innerWidth - width - padding
                );

                const newY = Math.min(
                    Math.max(padding, pos.y),
                    window.innerHeight - height - padding
                );

                return { x: newX, y: newY };
            });
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleDrag = (newPosition) => {
        const padding = 16;
        const width = Math.min(420, window.innerWidth - (padding * 2));
        const height = Math.min(520, window.innerHeight - (padding * 2));

        // Tính toán vị trí dựa trên khoảng cách từ mép phải và dưới
        const x = window.innerWidth - (newPosition.x + width);
        const y = window.innerHeight - (newPosition.y + height);

        // Giới hạn trong phạm vi màn hình
        const boundedX = Math.min(
            Math.max(padding, x),
            window.innerWidth - width - padding
        );
        const boundedY = Math.min(
            Math.max(padding, y),
            window.innerHeight - height - padding
        );

        setPosition({ x: boundedX, y: boundedY });
    };

    return (
        <>
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    style={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                        zIndex: 9999,
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: '#0366d6',
                        color: '#fff',
                        border: 'none',
                        boxShadow: '0 2px 16px #bbb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 24,
                        cursor: 'pointer',
                        padding: 0,
                    }}
                    aria-label="Mở ChatBot"
                >
                    <FontAwesomeIcon style={{ color: '#fff' }} icon={faComment} />
                </button>
            )}

            {open && <ChatBot
                position={position}
                onClose={() => setOpen(false)}
                onDrag={handleDrag}
                onDragEnd={() => { }}
            />}
        </>
    );
}
