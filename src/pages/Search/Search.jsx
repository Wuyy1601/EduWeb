import MyFooter from '@components/Footer/Footer';
import MyHeader from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import SearchBar from './components/SearchBar';
import Result from './components/Result';
import Highlight from './components/Highlight';
import Recommend from './components/Recommend';
import ChatGPT from '@components/ChatGPT/ChatGPT';

import img from '@images/search-highlight.png';
const searchResults = [
    { id: 1, title: 'Course 1', description: 'Description for Course 1' },
    { id: 2, title: 'Course 2', description: 'Description for Course 2' },
    { id: 3, title: 'Course 3', description: 'Description for Course 3' },
    { id: 4, title: 'Course 4', description: 'Description for Course 4' },
    { id: 5, title: 'Course 5', description: 'Description for Course 5' },
    { id: 6, title: 'Course 6', description: 'Description for Course 6' },
    { id: 7, title: 'Course 7', description: 'Description for Course 7' },
    { id: 8, title: 'Course 8', description: 'Description for Course 8' },
];

function Search() {
    return (
        <MainLayout>
            <MyHeader />
            <SearchBar />
            <Result courses={searchResults} />
            <Highlight img={img} />
            <Recommend title={'Gợi ý cho bạn'} />
            <ChatGPT />
            <MyFooter />
        </MainLayout>
    );
}

export default Search;
