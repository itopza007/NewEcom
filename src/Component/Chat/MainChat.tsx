import React, { ChangeEvent, useRef, useState } from "react";
import Lobby from "./Lobby";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import Chat from "./Chat";
import axios, { AxiosProgressEvent, CancelTokenSource } from "axios";
import { v4 as uuidv4 } from "uuid";

export interface DataFile {
  [id: string]: {
    id: string;
    file: File;
    progress: number;
    status: number; //0 wait, 1 uploading, 2 faile, 3 success
    cancelToken: CancelTokenSource;
    estimated?: number;
  };
}

function MainChat() {
  const [connection, setConnection] = useState<HubConnection | null>();
  const [messages, setMessages] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [files, setFiles] = useState<DataFile[]>([]);
  const inputRef = useRef<any>(null);

  const joinRoom = async (user: string, room: string) => {
    try {
      const connection: HubConnection = new HubConnectionBuilder()
        // .withUrl("http://localhost:5101/chat")
        .withUrl("http://sev1.bsv-th-authorities.com/hub/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("UsersInRoom", (user) => {
        setUsers(user);
      });

      connection.on(
        "ReceiveMessage",
        (user: string, message: string, cur: string, type: string) => {
          console.log("message received: ", message);
          if (connection.connectionId !== cur || type === "img") {
            setMessages((messages: any) => [
              ...messages,
              {
                user,
                message,
                cur: type === "img" && connection.connectionId === cur ? 1 : 0,
              },
            ]);
          }
        }
      );

      connection.onclose((e) => {
        setConnection(null);
        setMessages([]);
        setUsers([]);
      });

      await connection.start();

      await connection.invoke("joinRoom", { "User": "Golf", "Room": "Room 1" });
      console.log(connection);
      setConnection(connection);
    } catch (error) {
      console.log(error);
    }
  };

  const closeConnection = async () => {
    try {
      await connection?.stop();
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (message: any) => {
    try {
      await connection?.invoke("SendMessage", message);
      setMessages((messages: any) => [
        ...messages,
        { user: "", message, cur: 1 },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async (fileData: DataFile, index: number) => {
    const formData: any = new FormData();
    const { file, id, cancelToken } = Object.values(fileData)[0];
    formData.append("files", file);
    formData.append("ConnectionId", connection?.connectionId);

    let TempFile: DataFile[] = files;
    TempFile[index][id].status = 1; //changStatus
    try {
      // http://localhost:5101/api/Upload
      // http://sev1.bsv-th-authorities.com/hub/api/Upload
      const res = await axios.post("http://localhost:5101/api/Upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        cancelToken: cancelToken.token,
        onUploadProgress(progressEvent) {
          if (progressEvent?.progress && progressEvent?.total) {
            let percen = Math.round((100 * progressEvent.progress) / progressEvent.total);
  
            TempFile[index][id].progress = percen;
            TempFile[index][id].estimated = progressEvent.estimated || 0;
            setFiles([...TempFile]);
          }
        },
      });
  
      if (res?.status === 200) {
        TempFile[index][id].status = 3;
        setFiles([...TempFile]);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        // Do something when user cancels upload
        TempFile[index][id].status = 2;
        setFiles([...TempFile]);
        console.log(error.message);
      }
    }
  };

  const handleSelectFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const file: FileList | null = e.currentTarget.files;

    if (file) {
      console.log(file);

      let tempData: DataFile[] = Array.from(file).map((file: File) => {
        // let uuid = crypto.randomUUID();
        let uuid = uuidv4();
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        return {
          [uuid]: {
            id: uuid,
            progress: 0,
            file,
            status: 0,
            cancelToken: source,
          },
        };
      });
      // console.log(Object.keys(tempData[0])[0]);
      // console.log(tempData);
      // setFiles(Array.from(file).map((file: File) => Object.assign(file)));
      setFiles(tempData);
    }
  };

  const handleRemoveFile = (iid: string) => {
    const filtered = files.filter(
      (i: DataFile) => Object.keys(i)[0].toString() !== iid
    );
    setFiles([...filtered]);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        {!connection ? (
          <Lobby joinRoom={joinRoom} />
        ) : (
          <Chat
            messages={messages}
            sendMessage={sendMessage}
            closeConnection={closeConnection}
            users={users}
            handleUpload={handleUpload}
            files={files}
            handleSelectFiles={handleSelectFiles}
            handleRemoveFile={handleRemoveFile}
            inputRef={inputRef}
          />
        )}
      </Container>
    </React.Fragment>
  );
}

export default MainChat;
