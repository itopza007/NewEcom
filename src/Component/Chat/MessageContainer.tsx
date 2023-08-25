import React, { useEffect, useRef } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function MessageContainer({ messages }: any) {
  const messageRef = useRef<any>();

  useEffect(() => {
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <List
      ref={messageRef}
      sx={{
        height: "77vh",
        overflowY: "auto",
      }}
    >
      <Grid container>
        {messages.map((m: any, index: any) => (
          <ListItem key={index}>
            <Grid item xs={12}>
              <ListItemText
                style={
                  m.cur === 0 ? { textAlign: "left" } : { textAlign: "end" }
                }
                primary={m.message}
                secondary={"-- " + m.user}
              />
            </Grid>
          </ListItem>
        ))}
      </Grid>
    </List>
  );
}

export default MessageContainer;
