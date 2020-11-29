import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, IconButton } from '@material-ui/core';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import DeleteIcon from '@material-ui/icons/Delete';
import { ContentState, convertToRaw, EditorState } from 'draft-js';

const useStyles = makeStyles((theme) => ({
  backButton: {
    height: 40,
    marginLeft: "auto",
    marginTop:10,
    marginRight: 20,
  },
  saveButton:{
    margin: "auto",
    marginBlockEnd: 50,
  },
  dialog: {
    //  minWidth: "400px", 
    //  maxWidth: false 
  },
  keywords: {
    marginTop: 20
  },
  delBtn: {
    margin: "auto",
    height: 30
  }
}));

// const inputBox = {
//   redBackground: {
//     backgroundColor: 'red'
//   },
//   border: 1,
//   borderColor:"black"
// }


export default function CustomDialog(props) {
  let data = props.data;
  let id = data? data._id: null;
  // console.log(data);

  const [editorState, setEditorState] = React.useState(data? EditorState.createWithContent(ContentState.createFromText(data.description)): "");
  const [title, setTitle] = React.useState(data ? data.title : "");
  const [keywords, setKeywords] = React.useState(data ? data.keywords : "");
  const [inpDoc, setInputDoc] = React.useState({});


  const onEditorStateChange = (editorState) => {
      setEditorState(editorState);
  }

  // const onChangeHandler = (event) => {
  //     console.log(event.target.files[0]);
  // }

  // const clearInputFile = (doc) => {
  //   console.log(doc);
  // }

  const style = useStyles();

  return (
    <div>
      <Dialog 
        fullScreen
        className={style.dialog}
        open={props.open} 
        onClose={props.openDialogue} 
        >
          <div 
            className={"dialogHeader"}           
          >
          <DialogTitle id="form-dialog-title">{props.taskName} An Image</DialogTitle>
          <Button 
            variant={"contained"} 
            className={style.backButton}
            onClick={props.openDialogue}
            >Back</Button>
          </div>
        <Divider />
        <DialogContent>
          <div className={"dialogBody"}>
          <div className={"dialogText"}>
          <DialogContentText>
          <TextField 
            id="title" 
            label="Title" 
            variant="outlined" 
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <div className={"inputBox"}>
          <Editor
            editorState={editorState}
            value={props.description}
            onEditorStateChange={onEditorStateChange}
          />
          </div>
          <TextField 
            className={style.keywords}
            id="keywords" 
            label="Keywords/Tags" 
            variant="outlined" 
            fullWidth
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            />
          </DialogContentText>
          </div>
          <div className={"dialogImg"}>
            <input 
              type="file" 
              name="file" 
              // onChange={onChangeHandler} 
              key={"inpDoc"} 
              // value={inpDoc}
              // onChange={(e) => setInputDoc(e.target.files[0])}  
            />
            
            <IconButton 
              aria-label="delete" 
              className={style.delBtn} 
              // onClick={()=>clearInputFile("inpDoc")} 
              >  
              <DeleteIcon />
            </IconButton>
          </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="contained"
            onClick={() => {
              props.saveData(title, editorState, keywords, inpDoc, props.taskName, id)
              props.openDialogue()
            }} 
            color="primary"
            className={style.saveButton}  
            disabled={!title} //&& convertToRaw(editorState.getCurrentContent()).blocks[0].text}
          >
            Save
          </Button> 
          {/* : <Button 
            variant="contained"
            onClick={() => {
              props.saveEditData(title, editorState, keywords, inpDoc)
              props.openDialogue()
            }} 
            color="primary"
            className={style.saveButton}  
          >
            Save
          </Button> */}
          {/* } */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
