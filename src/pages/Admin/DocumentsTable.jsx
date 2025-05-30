import React, { useEffect, useState } from "react";
import styles from './styles.module.scss';

export default function DocumentsTable() {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        // Gọi API từ backend NodeJS (file/document)
        fetch("http://localhost:8000/api/documents")
            .then(res => res.json())
            .then(data => setDocs(data.document ? [data.document] : data)) // tuỳ API trả về
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2 className={styles.adminTitle}>Quản lý tài liệu</h2>
            <table className={styles.adminTable}>
                <thead>
                    <tr>
                        <th>ID</th><th>Tiêu đề</th><th>Mô tả</th>
                    </tr>
                </thead>
                <tbody>
                    {docs.map(doc => (
                        <tr key={doc._id}>
                            <td>{doc._id}</td>
                            <td>{doc.title}</td>
                            <td>{doc.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
