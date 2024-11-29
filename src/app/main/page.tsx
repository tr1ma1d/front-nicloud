'use client';
import Image from 'next/image';
import MessageHistory from '@/components/MessageHistory';
import './style-main.scss';

export default function Home() {
    return (
        <div className="main-page">
            <div className="friend-list">
                { /* render frined-list history */}
                <div className="profile">
                    <div className="profile__image">
                        <Image src="/logotype-example.svg" alt={'logo'} layout='fill' objectFit='cover' />
                    </div>
                    <div className="profile-info">
                        <span className="profile__text-username">Username</span>
                        <span className="profile__text-email">Email</span>

                    </div>
                </div>
                <div className="message-list">
                    <MessageHistory />
                </div>
            </div>
            <main className="message-block">

                <div className="message-history">
                    <div className="message-header">

                    </div>
                    <div className="container_message">
                        {/* Render HistoryMessage component here */}

                    </div>
                </div>
                <div className="input-message"></div>
            </main>
        </div>
    );
}