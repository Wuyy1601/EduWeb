import MyFooter from "@components/Footer/Footer";
import MyHeader from "@components/Header/Header";
import MainLayout from "@components/Layout/Layout";
import "./styles.css";

function Search() {
    return ( 
        <MainLayout>
            <MyHeader />
                <div className="huongdan">
                    làm Html vào đây
                </div>
            <MyFooter />
        </MainLayout>
     );
}

export default Search;