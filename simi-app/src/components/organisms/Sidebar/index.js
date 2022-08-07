import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/useAuth';

function Sidebar() {
    let history = useNavigate();
    let auth = useAuth();

    return auth.user ? (
        <p>
            Welcome!{" "}
            <button
                onClick={() => {
                    auth.signout(() => history.push("/"));
                }}
            >
                Sign out
            </button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    );
}

export default Sidebar;