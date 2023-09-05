import React from "react";
import MessageContainer from "../Component/Chat/MessageContainer";
import { NewMessages } from "../Models/NewMessages";
import { Divider } from "@mui/material";
import SendMessageForm from "../Component/Chat/SendMessageForm";
import { User } from "../Models/Users";

function ChatRoom({
  SendMessage,
  Messages,
  userSelect,
}: {
  SendMessage: (message: string) => void;
  Messages: NewMessages[];
  userSelect: User;
}) {
  return (
    <React.Fragment>
      {Messages.length > 0 ? (
        <MessageContainer messages={Messages} userSelect={userSelect} />
      ) : (
        ""
      )}

      <Divider />
      <SendMessageForm SendMessage={SendMessage} />
    </React.Fragment>
  );
}

export default ChatRoom;
