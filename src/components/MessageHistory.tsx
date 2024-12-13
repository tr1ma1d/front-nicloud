
import './styles/message-history.scss';
import Image from 'next/image';
const HistoryMessage = ({username} : any) =>{
    return (
        <div className="history-message">
            <div className="img__container">
                <Image src = "/logotype-example.svg" alt ="logo" objectFit="cover" layout="fill"/>
            </div>
            <div className="history_text">
                <span className = "his__username">
                    {username}
                </span>
                <p className ="his__context">
                    text
                </p>
            </div>

        </div>
    );
}

export default HistoryMessage;