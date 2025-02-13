

export const ButtonSwitch = ({isLogin:{}}) => {
    return (
        <button className="navigation-auth" onClick={toggleForm}>
        {isLogin ? "Перейти к регистрации" : "Перейти к логину"}
      </button>
    );
}