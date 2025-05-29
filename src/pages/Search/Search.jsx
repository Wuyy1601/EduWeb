import MyFooter from '@components/Footer/Footer';
import MyHeader from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import SearchBar from './components/SearchBar';

function Search() {
    return (
        <MainLayout>
            <MyHeader />
            <SearchBar />
            <div className="result"></div>
            <MyFooter />
        </MainLayout>
    );
}

export default Search;
