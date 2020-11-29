import { Typography } from "@material-ui/core";
import React from "react";
import logo from "./logo.png"
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
//

const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: "auto",
        marginTop: 5,
        fontFamily: 'Josefin Sans',
        cursor: "pointer"
    }
}));

export default function Header(){

    let style = useStyles();
    const history = useHistory();

    const openProfile = () => {

    }

    const goToHome = () => {
        history.push("/assets");
    }

    return(
        <div id="header"> 
        <Typography variant={"h3"} className={style.title} onClick={goToHome} >Asset Management</Typography>
        <span id="profilePic" onClick={() =>openProfile()}><img src={logo} alt="DP" className={"dp"}/></span>
        </div>
    )
}