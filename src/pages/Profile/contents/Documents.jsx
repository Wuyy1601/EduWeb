import { useSearchParams } from 'react-router-dom';

import Pagination from '../components/Pagination';
import CourseCard from '../components/CourseCard';

import classNames from 'classnames/bind';
import styles from '../styles.module.scss';

const cx = classNames.bind(styles);

const documentData = [
    { id: 1, title: 'Document 1', content: 'Content of Document 1' },
    { id: 2, title: 'Document 2', content: 'Content of Document 2' },
    { id: 3, title: 'Document 3', content: 'Content of Document 3' },
    { id: 4, title: 'Document 4', content: 'Content of Document 4' },
    { id: 5, title: 'Document 5', content: 'Content of Document 5' },
    { id: 6, title: 'Document 6', content: 'Content of Document 6' },
    { id: 7, title: 'Document 7', content: 'Content of Document 7' },
    { id: 8, title: 'Document 8', content: 'Content of Document 8' },
    { id: 9, title: 'Document 9', content: 'Content of Document 9' },
    { id: 10, title: 'Document 10', content: 'Content of Document 10' },
    { id: 11, title: 'Document 11', content: 'Content of Document 11' },
    { id: 12, title: 'Document 12', content: 'Content of Document 12' },
    { id: 13, title: 'Document 13', content: 'Content of Document 13' },
    { id: 14, title: 'Document 14', content: 'Content of Document 14' },
    { id: 15, title: 'Document 15', content: 'Content of Document 15' },
    { id: 16, title: 'Document 16', content: 'Content of Document 16' },
    { id: 17, title: 'Document 17', content: 'Content of Document 17' },
    { id: 18, title: 'Document 18', content: 'Content of Document 18' },
    { id: 19, title: 'Document 19', content: 'Content of Document 19' },
    { id: 20, title: 'Document 20', content: 'Content of Document 20' },
    { id: 21, title: 'Document 21', content: 'Content of Document 21' },
];

function RenderDocuments({ documents, currentPage }) {
    const startIndex = (currentPage - 1) * 8;
    const endIndex = startIndex + 8;
    return documents
        .slice(startIndex, endIndex)
        .map((document) => (
            <CourseCard key={document.id} title={document.title} content={document.content} id={document.id} />
        ));
}

function Documents() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = searchParams.get('page') || 1;

    return (
        <>
            <div id={cx('documents-container')}>
                <RenderDocuments documents={documentData} currentPage={currentPage} />
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(documentData.length / 8)}
                onPageChange={(page) => setSearchParams({ page })}
            />
        </>
    );
}

export default Documents;
