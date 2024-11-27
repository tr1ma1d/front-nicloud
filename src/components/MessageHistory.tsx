


const HistoryMessage = ({username, context} : any) =>{
    return (
        <div className="history-message">
            <div className="img__container">
            </div>
            <div className="history_text">
                <span className = "his__username">
                    {username}
                </span>
                <p className ="his__context">
                    {context}
                </p>
            </div>

        </div>
    );
}

export default HistoryMessage;