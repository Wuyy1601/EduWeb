import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import CourseCard from '../components/CourseCard';

import classNames from 'classnames/bind';
import styles from '../styles.module.scss';

const cx = classNames.bind(styles);

const postData = [
    { id: 1, title: 'Post 1', content: 'Content of Post 1' },
    { id: 2, title: 'Post 2', content: 'Content of Post 2' },
    { id: 3, title: 'Post 3', content: 'Content of Post 3' },
    { id: 4, title: 'Post 4', content: 'Content of Post 4' },
    { id: 5, title: 'Post 5', content: 'Content of Post 5' },
    { id: 6, title: 'Post 6', content: 'Content of Post 6' },
    { id: 7, title: 'Post 7', content: 'Content of Post 7' },
    { id: 8, title: 'Post 8', content: 'Content of Post 8' },
    { id: 9, title: 'Post 9', content: 'Content of Post 9' },
    { id: 10, title: 'Post 10', content: 'Content of Post 10' },
    { id: 11, title: 'Post 11', content: 'Content of Post 11' },
    { id: 12, title: 'Post 12', content: 'Content of Post 12' },
    { id: 13, title: 'Post 13', content: 'Content of Post 13' },
];

function RenderPosts({ posts, currentPage }) {
    const startIndex = (currentPage - 1) * 8;
    const endIndex = startIndex + 8;
    return posts
        .slice(startIndex, endIndex)
        .map((post) => <CourseCard key={post.id} title={post.title} content={post.content} id={post.id} />);
}

function Posts() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = searchParams.get('page') || 1;

    return (
        <>
            <div id={cx('posts-container')}>
                <RenderPosts posts={postData} currentPage={currentPage} />
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(postData.length / 8)}
                onPageChange={(page) => setSearchParams({ page })}
            />
        </>
    );
}

export default Posts;
