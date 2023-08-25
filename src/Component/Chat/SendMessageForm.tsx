import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";

function SendMessageForm({ semdMessage, handleSelectFiles, inputRef }: any) {
  const [message, setMessage] = useState<string>();

  const SubmitMessage = (e: any) => {
    e.preventDefault();
    semdMessage(message);
    setMessage("");
  };

  return (
    <Grid container spacing={1} style={{ padding: "20px" }}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton sx={{ p: "10px" }} component="label">
          <AttachFileIcon />
          <input
            hidden
            accept="image/*,"
            multiple
            type="file"
            ref={inputRef}
            onChange={handleSelectFiles}
          />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Type Something"
          id="txtmessage"
          type="text"
          onChange={(e: any) => setMessage(e.target.value)}
          value={message}
          autoComplete="off"
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
          disabled={!message}
          onClick={SubmitMessage}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Grid>
  );
}

export default SendMessageForm;
