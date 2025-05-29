import MyFooter from "@components/Footer/Footer";
import MyHeader from "@components/Header/Header";
import MainLayout from "@components/Layout/Layout";
import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";



function ReviewDocument() {
    const { id } = useParams();
    return (<MainLayout>
        <MyHeader />
        <div className="huongdan">
            làm Html vào đây
        </div>
        <MyFooter />
    </MainLayout>);
}

export default ReviewDocument;