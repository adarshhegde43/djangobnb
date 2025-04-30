'use client';

import { useEffect, useState, useRef, useMemo } from "react";
import CustomButton from "../forms/CustomButton";
import { ConversationType } from "@/app/inbox/page";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { MessageType } from "@/app/inbox/[id]/page";
import { UserType } from "@/app/inbox/page";

interface ConversationDetailProps {
    token: string;
    userId: string;
    conversation?: ConversationType;
    messages?: MessageType[];   
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({
    userId,
    token,
    messages = [],
    conversation = { id: '', users: [] }
}) => {
    const messagesDiv = useRef<HTMLDivElement>(null);
    const [newMessage, setNewMessage] = useState('');
    const [realtimeMessages, setRealtimeMessages] = useState<MessageType[]>([]);

    // Safe user filtering
    const { myUser, otherUser } = useMemo(() => {
        const users = conversation?.users || [];
        return {
            myUser: users.find((user) => user.id === userId),
            otherUser: users.find((user) => user.id !== userId)
        };
    }, [conversation, userId]);

    // WebSocket connection
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        `${process.env.NEXT_PUBLIC_WS_HOST}/ws/${conversation.id}/?token=${token}`, 
        {
            share: false,
            shouldReconnect: () => true,
        }
    );

    // Handle new WebSocket messages
    useEffect(() => {
        if (lastJsonMessage && typeof lastJsonMessage === 'object' && 'name' in lastJsonMessage && 'body' in lastJsonMessage) {
            const message: MessageType = {
                id: Date.now().toString(), // Temporary ID
                name: lastJsonMessage.name as string,
                body: lastJsonMessage.body as string,
                sent_to: otherUser as UserType,
                created_by: myUser as UserType,
                conversationId: conversation.id
            };
            setRealtimeMessages(prev => [...prev, message]);
            scrollToBottom();
        }
    }, [lastJsonMessage]);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        sendJsonMessage({
            event: 'chat_message',
            data: {
                body: newMessage,
                name: myUser?.name,
                sent_to_id: otherUser?.id,
                conversation_id: conversation.id
            }
        });

        setNewMessage('');
        setTimeout(scrollToBottom, 50);
    }

    const scrollToBottom = () => {
        messagesDiv.current?.scrollTo({
            top: messagesDiv.current.scrollHeight,
            behavior: 'smooth'
        });
    }

    return (
        <div className="h-full flex flex-col">
            {/* Messages container */}
            <div 
                ref={messagesDiv}
                className="flex-1 max-h-[400px] overflow-auto p-4 space-y-4"
            >
                {messages.map((message, index) => (
                    <div
                        key={`msg-${message.id || index}`}
                        className={`w-[80%] py-3 px-4 rounded-xl ${
                            message.created_by.id === userId 
                                ? 'ml-[20%] bg-blue-100' 
                                : 'bg-gray-100'
                        }`}
                    >
                        <p className="font-bold text-gray-700">{message.created_by.name}</p>
                        <p className="text-gray-800">{message.body}</p>
                    </div>
                ))}

                {realtimeMessages.map((message, index) => (
                    <div
                        key={`rt-${message.id || index}`}
                        className={`w-[80%] py-3 px-4 rounded-xl ${
                            message.created_by.id === userId
                                ? 'ml-[20%] bg-blue-100'
                                : 'bg-gray-100'
                        }`}
                    >
                        <p className="font-bold text-gray-700">{message.name}</p>
                        <p className="text-gray-800">{message.body}</p>
                    </div>
                ))}
            </div>

            {/* Input area */}
            <div className="mt-auto p-4 border-t border-gray-300">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg"
                    />
                    <CustomButton 
                        label="Send"
                        onClick={sendMessage}
                        className="w-24"
                    />
                </div>
            </div>
        </div>
    );
};

export default ConversationDetail;