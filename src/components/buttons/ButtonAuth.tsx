
import '../styles/button.scss';

const ButtonAuth = ({onClick, children}: any) => {
    return(
        <button onClick={onClick} className="auth-button">
            {children}
        </button>
    );
};

export default ButtonAuth;