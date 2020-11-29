import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import logo from "./logo.png"
// import {Button} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from "react-router-dom"
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CustomDialog from "./customDialog";
import DeleteDialog from "./deleteDialog";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1.5),
        height:50,
    },
}));

const ImageCard = (props) => {
    let history = useHistory();
    const classes = useStyles();
    let {title, pic, description, comments} = props.data;
    let id = props.data._id;

    const [openDialogue, setOpenDialogue] = React.useState(false);
    const [deleteDialogue, setDeleteDialogue] = React.useState(false);

    const handleOpenDialogue = (task) => {
        setOpenDialogue(!openDialogue);
    }

    const handleDeleteDialogue = () => {
        setDeleteDialogue(!deleteDialogue);
    }

    const handleClick = (id, name, pic, description, index, saveData, postComment) => {
        history.push({
            pathname: `/assets/${index}/`,
            search: `?name=${name}`,
            state: { 
                id,
                name,
                pic,
                description,
                comments,
            },
            saveData: saveData,
            postComment: postComment
        })
    }
   
    // const onDragOver = (e) => {
    //     e.preventDefault();
    // }

    // const onDragStart = (e, id) => {
    //     e.dataTransfer.setData("id", id);
    // }

    // const onDrop = (ev, cat) => {         
    //     let id = ev.dataTransfer.getData("id");  
    //     let tasks = this.state.tasks.filter((task) => {      
    //         if (task.name === id) {               
    //             task.category = cat;                 
    //         }                     
    //         return task;          
    //     });           
    //     this.setState({                 
    //         ...this.state,                 
    //         tasks          
    //     });    
    // }


    return(
        <>
        <Paper 
            key={props.key}
            elevation={3} 
            m={5} 
            className={"card"} 
            draggable 
            onDragStart={(e) => props.onDragStart(e, props.key)}
            onDragOver={(e) => props.onDragOver(e)} 
            onDrop={(e) => props.onDrop(e, "dropped")} 
        >
            <Box>
                <div className={"imgContainer"} onClick={() => handleClick(id, title, pic, description, props.index, props.saveData, props.postComment)}>
                <Box>
                    <img src={logo} alt={"Logo"} className={"image"} draggable="false"/>
                </Box>
                </div>
                
                <hr/>
                <div className={"cardBody"}>
                    <Typography variant="h5" className={"cardName"}>{title}</Typography>
                    <IconButton aria-label="delete" className={classes.margin} onClick={()=>handleOpenDialogue()} >
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" className={classes.margin} onClick={()=>handleDeleteDialogue()}>
                    <DeleteIcon />
                    </IconButton>
                </div>
            </Box>
        </Paper>
        {openDialogue ? <CustomDialog
            taskName={"Edit"}
            data={props.data}
            saveData={props.saveData}
            image={logo}    
            openDialogue={handleOpenDialogue}
            open={openDialogue}
            /> : null}
        {deleteDialogue ? <DeleteDialog 
            name={title}
            open={deleteDialogue}
            openDeleteDialog={handleDeleteDialogue}
            delete={props.handleDelete}
            id={id}
        /> : null}
        </>
    )
}

export default ImageCard;