

export default function MessageContainer({username, content} : any) {
    return(
        <div className="message-container">
            <div className = "logo">
                {/* logotype*/}
            </div>
            <div className="message-context">
                <span>username</span>
                <p>content</p>
            </div>
        </div>
    )
}