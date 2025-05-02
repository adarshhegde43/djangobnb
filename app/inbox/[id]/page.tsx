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

// Metadata generation (synchronous params - remains unchanged)
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    return {
        title: `Conversation ${params.id}`,
    };
}

// Main page component with proper async params handling
export default async function Page(props: { params: { id: string } }) {
    // Destructure normally since Next.js 15 actually provides concrete params
    const { id } = props.params;
    
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