import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogBox({ open, onClose }) {
  const navigate = useNavigate();

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle fontWeight={"bold"}>{"Rate Cafe Europa"}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{fontSize : "20px"}} id="alert-dialog-slide-description">
          What do you like about our ambiance and food?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => navigate("/home")}>Back To Home</Button>
        <Button onClick={() => navigate("/contact")}>
          Rate the Restaurant
        </Button>
      </DialogActions>
    </Dialog>
  );
}
