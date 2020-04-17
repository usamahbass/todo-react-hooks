import React, { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
  Toolbar,
  List,
  ListItem,
  IconButton,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  makeStyles,
  Card,
  CardContent,
  Tooltip,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import Form from "./components/form";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 500,
    margin: "0 auto",
    marginTop: 50,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    textAlign: "center",
    margin: "0 auto",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function App() {
  const classes = useStyles();
  const [todo, setTodo] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const elem = document.getElementById("starting");
    window.onload = () => {
      if (elem) {
        elem.remove();
      }
    };
  });

  const todoComplete = (index) =>
    setTodo(
      todo.map((text, i) =>
        i === index
          ? {
              ...text,
              complete: !text.complete,
            }
          : text
      )
    );

  const removeTodo = (index) => {
    const tempTodo = todo.slice();
    tempTodo.splice(index, 1);
    setTodo(tempTodo);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            React Todo
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.demo}>
        <Card className={classes.card}>
          {todo.map(({ text, complete }, index) => {
            if (todo && todo.length > 0) {
              return (
                <CardContent>
                  <List>
                    <ListItem key={text}>
                      <ListItemAvatar>{index + 1}.</ListItemAvatar>
                      <ListItemText
                        primary={text}
                        style={{
                          textDecoration: complete ? "line-through" : "",
                        }}
                      />

                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="check"
                          onClick={() => todoComplete(index)}
                        >
                          {complete ? (
                            <Tooltip title="cancel" aria-label="cancel">
                              <ClearIcon />
                            </Tooltip>
                          ) : (
                            <Tooltip title="complete" aria-label="complete">
                              <CheckIcon />
                            </Tooltip>
                          )}
                        </IconButton>
                        <Tooltip title="delete" aria-label="delete">
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={handleClickOpen}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>

                    <Dialog
                      open={open}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-slide-title"
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle id="alert-dialog-slide-title">
                        {"Remove todo ?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                          You won't be able to revert this!
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button
                          onClick={() => removeTodo(text, index)}
                          color="primary"
                        >
                          Remove
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </List>
                </CardContent>
              );
            } else {
              return <Typography>Null</Typography>;
            }
          })}
        </Card>
      </div>
      <Form
        addTodo={(text, index) =>
          setTodo([{ text, complete: false, index: index + 1 }, ...todo])
        }
      />
    </React.Fragment>
  );
}
