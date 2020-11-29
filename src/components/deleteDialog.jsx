import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cancel: {
      marginRight: "auto",
  },
}));


export default function DeleteDialog(props) {

  const style = useStyles();

  const handleDelete = () => {
    props.delete(props.id);
    props.openDeleteDialog();
  }

  return (
    <div>
      <Dialog 
        open={props.open} 
        onClose={props.openDeleteDialog} 
        aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">Delete {props.name}?</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            Are you sure you would like to delete this image?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.openDeleteDialog} color="primary" variant="contained" className={style.cancel}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
