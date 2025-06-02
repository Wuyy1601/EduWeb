import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MyFooter from '@components/Footer/Footer';
import MyHeader from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import ChatBot from '@components/ChatBot/ChatBot';
import Button from '@components/Button/Button';
import imgCat from '@images/cat.png';

import styles from './styles.module.scss';

function UpFile() {
    useEffect(() => {
        document.title = "Ulearn - Upload File";
    }, []);
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
        <MainLayout>
            <MyHeader />
            <div className={styles.uploadPage}>
                {/* Section 1: Upload + Mascot */}
                <div className={styles.uploadSection}>
                    <div className={styles.uploadBox}>
                        <div className={styles.uploadLeft}>
                            <h2 className={styles.title}>Tải tài liệu lên</h2>
                            <div className={styles.filePreview}>
                                {file ? (
                                    <img src={URL.createObjectURL(file)} alt="preview" />
                                ) : (
                                    <div className={styles.imgPlaceholder}>
                                        <svg width="48" height="48" fill="#b3b3b3"><rect x="8" y="12" width="32" height="24" rx="4" fill="#f5f6fa" /><path d="M13 29l8-8 8 8 7-7" stroke="#b3b3b3" strokeWidth="2" fill="none" /></svg>
                                        <div>Chưa chọn file</div>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                id="fileInput"
                                name="file"
                                style={{ display: 'none' }}
                                onChange={e => setFile(e.target.files[0])}
                                accept=".pdf,.doc,.docx,.jpg,.png"
                            />
                            <Button content="Chọn file" onClick={() => document.getElementById('fileInput').click()} />
                        </div>
                        <div className={styles.uploadRight}>
                            <img src={imgCat} alt="Mascot" className={styles.mascot} />
                            <div className={styles.tip}>
                                <span>Tips:</span> Tải file rõ ràng, đúng định dạng!
                            </div>
                        </div>
                    </div>
                </div>
                {/* Section 2: Form nhập thông tin tài liệu */}
                <div className={styles.infoSection}>
                    <div className={styles.infoHeader}>
                        <span>Thông tin tài liệu</span>
                        <Button content={'Lưu'}></Button>
                    </div>
                    <form className={styles.infoForm} onSubmit={handleSubmit}>
                        <div className={styles.formRow}>
                            <div className={styles.formCol}>
                                <label>Tiêu đề</label>
                                <input type="text" placeholder="Tiêu đề tài liệu của bạn" maxLength={80} name="title" />
                            </div>
                            <div className={styles.formCol}>
                                <label>Mô tả</label>
                                <input type="text" placeholder="Mô tả tài liệu của bạn" maxLength={120} name="description" />
                            </div>
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.formCol}>
                                <label>Chuyên ngành</label>
                                <select name="major">
                                    <option value="">Chọn</option>
                                    {majors.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>
                            <div className={styles.formCol}>
                                <label>Môn học</label>
                                <select name='subject'><option>Chọn</option>
                                    {subjects.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.formCol}>
                                <label>Chủ đề tài liệu</label>
                                <input type="text" placeholder="Nội dung chính của tài liệu bạn là gì" />
                            </div>
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.formCol}>
                                <label>Ngôn ngữ</label>
                                <select name='language'><option>Chọn</option>
                                    {languages.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>
                            <div className={styles.formCol}>
                                <label>Ngôn Ngữ phụ</label>
                                <select name='subLanguage'><option>Chọn</option>
                                    {languages.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>
                            <div className={styles.formCol}>
                                <label>Cấp học</label>
                                <select name='level'><option>Chọn</option>
                                    {levels.map(m => <option key={m} value={m}>{m}</option>)}</select>
                            </div>
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.formCol}>
                                <label>Ghi chú</label>
                                <input type="text" placeholder="Ghi chú" name="note" />
                            </div>
                        </div>
                        <div className={styles.formActions}>
                            <Button content={'Hủy'} ></Button>
                            <Button content={'Đăng Bài'} type='sumbit'></Button>
                        </div>
                    </form>
                </div>
            </div>


            <ChatBot />
            <MyFooter />
        </MainLayout>
    );
}

export default UpFile;
