import React, { useEffect, useState } from "react";
import styles from './styles.module.scss';
import Button from "@components/Button/Button";

const filterFields = [
    { label: "Môn học", name: "subject" },
    { label: "Chuyên ngành", name: "major" },
    { label: "Ngôn ngữ", name: "language" },
    { label: "Cấp học", name: "level" }
];

export default function DocumentsTable() {
    const [docs, setDocs] = useState([]);
    const [filters, setFilters] = useState({ subject: "", major: "", language: "", level: "" });
    const [editDoc, setEditDoc] = useState(null);
    const [newDoc, setNewDoc] = useState({
        title: "", description: "", subject: "", major: "", language: "", level: ""
    });
    const [showAddModal, setShowAddModal] = useState(false);
    const [addDoc, setAddDoc] = useState({
        title: "", description: "", subject: "", major: "", language: "", subLanguage: "", level: "", note: ""
    });
    const [addFile, setAddFile] = useState(null);

    const fetchDocs = async () => {
        const params = new URLSearchParams(filters);
        const res = await fetch(`http://localhost:8000/api/documents?${params}`);
        const data = await res.json();
        setDocs(Array.isArray(data) ? data : []);
    };

    useEffect(() => { fetchDocs(); }, [filters]);

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn chắc chắn muốn xóa?")) return;
        await fetch(`http://localhost:8000/api/documents/${id}`, { method: "DELETE" });
        fetchDocs();
    };

    const handleEdit = (doc) => setEditDoc(doc);

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const { _id, ...update } = editDoc;
        await fetch(`http://localhost:8000/api/documents/${_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(update)
        });
        setEditDoc(null);
        fetchDocs();
    };
    const [desc, setDesc] = useState('');
    const maxDesc = 120;
    const [file, setFile] = useState(null);

    const majors = ["CNTT", "Kinh tế", "Y dược"];
    const subjects = ["Toán", "Lý", "Hóa"];
    const languages = ["Tiếng Việt", "Tiếng Anh"];
    const levels = ["Đại học", "Cao đẳng", "THPT"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (file) formData.append('file', file);

        const res = await fetch('http://localhost:8000/api/documents', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data.success) {
            alert('Tải tài liệu thành công!');
            // Reset form nếu muốn
        }
    };

    return (
        <div>
            <h2 className={styles.adminTitle}>Quản lý tài liệu</h2>
            {/* Form thêm mới */}
            <Button content="Thêm mới" onClick={() => setShowAddModal(true)} />
            {showAddModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeBtn} onClick={() => setShowAddModal(false)}>×</button>
                        <h3>Thêm tài liệu mới</h3>
                        <form
                            onSubmit={async e => {
                                e.preventDefault();
                                const formData = new FormData();
                                // Thêm các trường text
                                Object.entries(addDoc).forEach(([key, value]) => formData.append(key, value));
                                // Thêm file nếu có
                                if (addFile) formData.append('file', addFile);

                                const res = await fetch("http://localhost:8000/api/documents", {
                                    method: "POST",
                                    body: formData
                                });
                                if (res.ok) {
                                    setAddDoc({ title: "", description: "", subject: "", major: "", language: "", subLanguage: "", level: "", note: "" });
                                    setAddFile(null);
                                    setShowAddModal(false);
                                    fetchDocs();
                                } else {
                                    alert("Thêm tài liệu thất bại!");
                                }
                            }}
                            className={styles.addForm}
                        >
                            <div className={styles.formRow}>
                                <div className={styles.formCol}>
                                    <label>Tiêu đề</label>
                                    <input
                                        type="text"
                                        placeholder="Tiêu đề tài liệu của bạn"
                                        maxLength={80}
                                        value={addDoc.title}
                                        onChange={e => setAddDoc({ ...addDoc, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className={styles.formCol}>
                                    <label>Mô tả</label>
                                    <input
                                        type="text"
                                        placeholder="Mô tả tài liệu của bạn"
                                        maxLength={120}
                                        value={addDoc.description}
                                        onChange={e => setAddDoc({ ...addDoc, description: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formCol}>
                                    <label>File tài liệu</label>
                                    <input
                                        type="file"
                                        id="adminFileInput"
                                        style={{ display: 'none' }}
                                        onChange={e => setAddFile(e.target.files[0])}
                                        accept=".pdf,.doc,.docx,.jpg,.png"
                                    />
                                    <Button
                                        type="button"
                                        content={addFile ? addFile.name : "Chọn file"}
                                        onClick={() => document.getElementById('adminFileInput').click()}
                                    />
                                    {addFile && addFile.type.startsWith("image/") && (
                                        <img
                                            src={URL.createObjectURL(addFile)}
                                            alt="preview"
                                            style={{ width: 120, marginTop: 8, borderRadius: 6 }}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formCol}>
                                    <label>Chuyên ngành</label>
                                    <select
                                        value={addDoc.major}
                                        onChange={e => setAddDoc({ ...addDoc, major: e.target.value })}
                                    >
                                        <option value="">Chọn</option>
                                        {majors.map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                </div>
                                <div className={styles.formCol}>
                                    <label>Môn học</label>
                                    <select
                                        value={addDoc.subject}
                                        onChange={e => setAddDoc({ ...addDoc, subject: e.target.value })}
                                    >
                                        <option value="">Chọn</option>
                                        {subjects.map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formCol}>
                                    <label>Chủ đề tài liệu</label>
                                    <input
                                        type="text"
                                        placeholder="Nội dung chính của tài liệu bạn là gì"
                                        value={addDoc.note}
                                        onChange={e => setAddDoc({ ...addDoc, note: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formCol}>
                                    <label>Ngôn ngữ</label>
                                    <select
                                        value={addDoc.language}
                                        onChange={e => setAddDoc({ ...addDoc, language: e.target.value })}
                                    >
                                        <option value="">Chọn</option>
                                        {languages.map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                </div>
                                <div className={styles.formCol}>
                                    <label>Ngôn Ngữ phụ</label>
                                    <select
                                        value={addDoc.subLanguage}
                                        onChange={e => setAddDoc({ ...addDoc, subLanguage: e.target.value })}
                                    >
                                        <option value="">Chọn</option>
                                        {languages.map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                </div>
                                <div className={styles.formCol}>
                                    <label>Cấp học</label>
                                    <select
                                        value={addDoc.level}
                                        onChange={e => setAddDoc({ ...addDoc, level: e.target.value })}
                                    >
                                        <option value="">Chọn</option>
                                        {levels.map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                </div>
                                <div className={styles.formCol}>
                                    <label>Ghi chú</label>
                                    <input
                                        type="text"
                                        placeholder="Ghi chú"
                                        value={addDoc.note}
                                        onChange={e => setAddDoc({ ...addDoc, note: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div style={{ textAlign: "right", marginTop: 16 }}>
                                <Button type="submit" content="Lưu" />
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Filter */}
            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                {filterFields.map(f => (
                    <select
                        key={f.name}
                        value={filters[f.name]}
                        onChange={e => setFilters({ ...filters, [f.name]: e.target.value })}
                    >
                        <option value="">{f.label}</option>
                        {[...new Set(docs.map(d => d[f.name]).filter(Boolean))].map(val =>
                            <option key={val} value={val}>{val}</option>
                        )}
                    </select>
                ))}
                <Button onClick={() => setFilters({ subject: "", major: "", language: "", level: "" })} content="Xóa filter"></Button>
            </div>
            {/* Table */}
            <table className={styles.adminTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tiêu đề</th>
                        <th>Mô tả</th>
                        <th>Môn học</th>
                        <th>Chuyên ngành</th>
                        <th>Ngôn ngữ</th>
                        <th>Cấp học</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {docs.map(doc => (
                        <tr key={doc._id}>
                            <td>{doc._id}</td>
                            <td>{editDoc && editDoc._id === doc._id
                                ? <input value={editDoc.title} onChange={e => setEditDoc({ ...editDoc, title: e.target.value })} />
                                : doc.title}
                            </td>
                            <td>{editDoc && editDoc._id === doc._id
                                ? <input value={editDoc.description} onChange={e => setEditDoc({ ...editDoc, description: e.target.value })} />
                                : doc.description}
                            </td>
                            <td>{editDoc && editDoc._id === doc._id
                                ? <input value={editDoc.subject} onChange={e => setEditDoc({ ...editDoc, subject: e.target.value })} />
                                : doc.subject}
                            </td>
                            <td>{editDoc && editDoc._id === doc._id
                                ? <input value={editDoc.major} onChange={e => setEditDoc({ ...editDoc, major: e.target.value })} />
                                : doc.major}
                            </td>
                            <td>{editDoc && editDoc._id === doc._id
                                ? <input value={editDoc.language} onChange={e => setEditDoc({ ...editDoc, language: e.target.value })} />
                                : doc.language}
                            </td>
                            <td>{editDoc && editDoc._id === doc._id
                                ? <input value={editDoc.level} onChange={e => setEditDoc({ ...editDoc, level: e.target.value })} />
                                : doc.level}
                            </td>
                            <td>
                                {editDoc && editDoc._id === doc._id ? (
                                    <>
                                        <Button onClick={handleEditSubmit} content="Lưu"></Button>
                                        <Button onClick={() => handleDelete(doc._id)} content="Xóa"></Button>
                                    </>
                                ) : (
                                    <>
                                        <Button onClick={() => handleEdit(doc)} content="Sửa"></Button>
                                        <Button onClick={() => handleDelete(doc._id)} content="Xóa"></Button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
