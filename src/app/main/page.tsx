'use client';
import Image from 'next/image';
import MessageHistory from '@/components/MessageHistory';
import './style-main.scss';
import type {RootState} from '@/store/store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
export default function Home() {
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();
    useEffect(() => {
        if(!user.id){
            router.replace('/auth');
            
        }
    }, [user, router]);


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
                        <div className="header-username">
                            <div className="logo-friend">
                                <Image src="/logotype-example.svg" alt={'logo'} layout='fill' objectFit='cover' />
                            </div>
                            <div className="header-username">
                                <span className="header-username__text">
                                    username
                                </span>
                            </div>
                        </div>
                        <div className="header_text">
                            <span>Chat</span>
                        </div>
                        <div className="header-button_action">
                            <button className="call">
                                <Image src="/phone.svg" alt='phone' objectFit='contain' layout='fill' />
                            </button>
                            <button className="option">
                                <Image src="/dot.svg" alt='option' layout='fill' />
                            </button>
                        </div>
                    </div>
                    <div className="container_message">
                        {/* Render HistoryMessage component here */}

                    </div>
                </div>
                <div className="input-message">
                    <input type="text" placeholder="Type..."/>
                    <div className="send-message__container">
                        <button>
                            <Image src ="/arrow-right.svg" alt="arrow" objectFit="none" layout='fill'/>
                        </button>
                    </div>
                </div>
            </main>

        </div>
    );
}