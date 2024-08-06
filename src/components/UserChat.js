import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { supabase } from "../utils/hooks/supabase";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { View, Text } from "react-native";

export default function UserChat({ chatId }) {
  const [messages, setMessages] = useState([]);
  const { user, userData } = useAuthentication();

  useEffect(() => {
    async function fetchMessages() {
      const { data, error } = await supabase
        .from('Chats')
        .select('messages')
        .eq('id', chatId)
        .single();

      if (error) {
        console.error("Error fetching messages:", error);
        return;
      }

      if (data) {
        const dbMessages = data.messages;
        const fixTimestampMessages = dbMessages.map((obj) => ({
          ...obj,
          createdAt: new Date(obj.createdAt),
        }));

        setMessages(fixTimestampMessages.reverse());
      }
    }

    fetchMessages();

    const subscription = supabase
      .channel('public:Chats')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'Chats', filter: `id=eq.${chatId}` }, (payload) => {
        const updatedMessages = payload.new.messages;
        const fixTimestampMessages = updatedMessages.map((obj) => ({
          ...obj,
          createdAt: new Date(obj.createdAt),
        }));

        setMessages(fixTimestampMessages.reverse());
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [chatId]);

  const onSend = useCallback(async (newMessages = []) => {
    const newMessage = newMessages[0];
    const { error } = await supabase
      .from('Chats')
      .update({
        messages: supabase.raw('array_append(messages, $1)', [newMessage])
      })
      .eq('id', chatId);

    if (error) {
      console.error("Error updating messages:", error);
      return;
    }

    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
  }, [chatId]);

  if (!user || !userData || !chatId) {
    return (
      <View>
        <Text>Missing user data or chat ref</Text>
      </View>
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user.id,
        name: userData.name || "Anonymous",
      }}
      renderUsernameOnMessage={true}
    />
  );
}