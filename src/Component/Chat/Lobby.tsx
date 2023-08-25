import React, { ChangeEvent, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface Register {
  user?: string;
  room?: string;
  userId?: string;
}

function Lobby({ joinRoom }: any) {
  const [regidter, setRegidter] = useState<Register>({ room: "", user: "" });
  const [room, setRoom] = useState([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const JoinGroup = (e: any) => {
    e.preventDefault();
    joinRoom(regidter?.user, regidter?.room);
  };

  const handleChang = (event: ChangeEvent<HTMLInputElement>) => {
    setRegidter({
      ...regidter,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setRoom(await feshdate());
  };

  const feshdate = async () => {
    const DataRoom = await fetch(
      // "http://sev1.bsv-th-authorities.com/hub/api/Showroom",
      "http://localhost:5101/api/Showroom",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    ).then((responst) => responst.json().then((res) => res));
    return DataRoom;
  };

  const handleClose = (rm: string) => {
    setRegidter({
      ...regidter,
      room: rm,
    });
    setAnchorEl(null);
  };

  return (
    <Paper elevation={3} sx={{ padding: "59px 0px 59px 0px", marginTop: 10 }}>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={8} xs={10}>
          <Typography variant="h5" gutterBottom>
            Chat DD Demo
          </Typography>
        </Grid>
        <Grid item md={8} xs={10}>
          <TextField
            fullWidth
            name="user"
            label="Name"
            variant="outlined"
            onChange={handleChang}
          />
        </Grid>
        <Grid container item md={8} xs={10}>
          <Grid item md={9}>
            <TextField
              fullWidth
              name="room"
              label="Group Chat"
              variant="outlined"
              value={regidter?.room}
              onChange={handleChang}
            />
          </Grid>
          <Grid item md={3}>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              ShowRoom
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {room.length > 0 ? (
                room.map((rm, index) => (
                  <MenuItem key={index} onClick={() => handleClose(rm)}>
                    {rm}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>room not found</MenuItem>
              )}
            </Menu>
          </Grid>
        </Grid>
        <Grid item md={8} xs={10}>
          <Button
            fullWidth
            variant="outlined"
            color="info"
            onClick={JoinGroup}
            disabled={!regidter?.user || !regidter?.room}
          >
            Join
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Lobby;
