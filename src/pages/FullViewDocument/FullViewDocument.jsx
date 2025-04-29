import MyHeader from "@components/Header/Header";
import "./styles.css"
import MainLayout from "@components/Layout/Layout";
import MyFooter from "@components/Footer/Footer";

function FullViewDocument() {
    return ( 
<MainLayout>

    <MyHeader/>
        <div className="huongdan">
            FullViewDocument Page
        </div>
    <MyFooter/>
</MainLayout>
     );
}

export default FullViewDocument;