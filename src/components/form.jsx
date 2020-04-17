import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Fab,
  Tooltip,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(() => ({
  appBar: {
    top: "auto",
    bottom: 0,
    background: "none",
    boxShadow: "none",
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    margin: "0 auto",
  },
}));

const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    onChange: (e) => setValue(e.target.value),
    resetValue: () => setValue(""),
  };
};

const Form = ({ addTodo }) => {
  const classes = useStyles();
  const { resetValue, ...text } = useInputValue("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Todo</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setOpen(false);
              resetValue();
              addTodo(text.value);
            }}
          >
            {" "}
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Todo"
              type="text"
              autoComplete="off"
              fullWidth
              {...text}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              resetValue();
              addTodo(text.value);
            }}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Tooltip title="new todo" aria-label="new todo">
            <Fab
              color="secondary"
              aria-label="add"
              className={classes.fabButton}
              onClick={handleOpen}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Form;
