import React from "react";
import {Button} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import CustomDialog from "./customDialog"

const useStyles = makeStyles((theme) => ({
    addButton: {
        marginLeft: "auto",
        marginRight: 10,
        // marginTop: 15,
        height: 35
    },
}));


export default function AddButton(props) {
    const style = useStyles();

    let [openDialogue, setOpenDialogue] = React.useState(false);

    const handleOpenDialogue = () => {
        setOpenDialogue(!openDialogue);
    }

    return (
        <>
        <div className={"addButtonDiv"}>
        <Button
            size="small"
            className={style.addButton}
            variant="contained"
            onClick={()=>handleOpenDialogue()}
        >Add Image
        </Button>
        </div>
        {openDialogue ? <CustomDialog
            taskName={"Add"}
            openDialogue={handleOpenDialogue}
            open={openDialogue}
            saveData={props.saveData}
            /> : null}
        </>
    )
}