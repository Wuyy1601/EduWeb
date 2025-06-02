import Button from "@components/Button/Button";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate()
    return <div style={{
        paddingTop: '48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Poppins',
    }}>
        <h1 style={{ fontSize: '64px' }}>404</h1>
        <h2 style={{ fontSize: '48px' }}>Page Not Found</h2>
        <Button style={{ marginTop: '28px' }} content={"Home"} onClick={() => navigate('/')} />
    </div>
}

export default NotFound;