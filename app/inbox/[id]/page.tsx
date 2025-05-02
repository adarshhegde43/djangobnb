import { getUserID } from "../../lib/actions";
import React from 'react';
import apiService from "@/app/services/apiService";
import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { UserType } from "../page";
import { getAccessToken } from "../../lib/actions";
import { Metadata } from 'next';

export type MessageType = {
    id: string;
    name: string;
    body: string;
    conversationId: string;
    sent_to: UserType;
    created_by: UserType;
}

// Metadata generation remains synchronous
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    return {
        title: `Conversation ${id}`,
    };
}

// Main page component with proper typing
interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    
    const userId = await getUserID();
    const token = await getAccessToken();

    if (!userId || !token) {
        return (
            <main className="max-w-[2500px] mx-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        )
    }

    const conversation = await apiService.get(`/api/chat/${id}/`);

    return (
        <main className="max-w-[2500px] mx-auto px-6 pb-6">
            <ConversationDetail 
                token={token}
                userId={userId}
                messages={conversation.messages}
                conversation={conversation.conversation}
            />
        </main>
    )
}