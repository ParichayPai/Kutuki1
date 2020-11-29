import { makeStyles } from "@material-ui/core";
import React from "react";
import logo from "./logo.png"

const useStyles = makeStyles(() => ({
    comment: {
        height: "auto",
        marginTop: 20,
        backgroundColor: "white",
        paddingBlockEnd: 20
    },
    logo:{
        height: 50,
        width: 50,
    },
    header:{
        display: "flex",
    },
    img:{
        margin: 10,
        backgroundColor:"wheat",
        borderRadius:2
    },
    userName:{
        fontSize: 30,
        marginTop: 20,
        marginLeft: 20
        // marginTop:"auto"
    },
    body:{
        textAlign: "left",
        marginLeft: 10,
        marginTop: 10,
        height: "auto"
    }
}))

export default function Comment(props){
    const style = useStyles(); 

    return (
        <div className={style.comment}>
            <div className={style.header}>
                <span className={style.img}><img src={logo} alt={"logo"} className={style.logo}/></span>
                <span className={style.userName}>{Object.keys(props.data)}</span>
            </div>
            <div className={style.body}>
                {Object.values(props.data)}
            </div>
        </div>
    )
}