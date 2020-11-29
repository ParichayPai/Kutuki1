import '../App.css';
import React from "react";
import Header from "./header"
// import {Button} from "@material-ui/core";
import AddButton from "./addButton"
// import Posts from "./postsToRender"
import ImageCard from "./imageCard"
import { useHistory } from 'react-router-dom';
import { convertToRaw, EditorState } from 'draft-js';
// import Comment from './comment';

const backendUrl = "http://localhost:5000/api/v1/"

function Home() {
    const history = useHistory();
    // const postsPerPage = 3;
    // let baseSize = 9;
    // const [data, setData] = React.useState([]);
    const [imageList, setImageList] = React.useState([]);

    const getData = () => {
        fetch(backendUrl+"assets", {
            method : "get",
        }).then(res => res.json())
            .then(res2 => {setImageList(res2)});
    }

    React.useEffect(() => {
        getData();
    }, []);

    // const handleShowMorePosts = () => {
    //     if(next > data.length){
    //         return;
    //     }
    //     loopWithSlice(next, next + postsPerPage);
    //     setNext(next + postsPerPage);
    // };

    const handleDelete = (id) => {
        fetch(backendUrl+"assets/"+id, {
            method : "delete",
        }).then(getData());
    };

    const onDragOver = (e) => {
        e.preventDefault();
    }

    const onDragStart = (e, id) => {
        e.dataTransfer.setData("id", id);
    }

    const onDrop = (ev, cat) => {         
        let id = ev.dataTransfer.getData("id");  
        let tasks = imageList.filter((task) => {      
            if (task.name === id) {               
                task.category = cat;                 
            }                     
            return task;          
        });           
        setImageList([                 
            ...imageList,                 
            tasks          
        ]);    
    }

    const saveData = (title, desc, keywords, pic, taskName, id) => {

        // console.log(convertToRaw(desc.getCurrentContent()).blocks[0].text);

        // let description = desc["_immutable"]["currentContent"]["blockMap"]["_list"]["_tail"]["array"][0][1]["text"];
        
        let post = {
            title,
            description: convertToRaw(desc.getCurrentContent()).blocks[0].text,
            keywords,
            pic
        }

        if(taskName === "Add"){
            fetch(backendUrl+"assets/", {
                method : "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post)
            }).then(res => res.json())
                .then(res2 => setImageList([res2, ...imageList]));
            history.push("/assets");
        }else{
            fetch(backendUrl+"assets/"+id, {
                method : "put",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post)
            }).then(getData());
        // .then(res => res.json())
            // .then(res2 => setImageList([...imageList, res2]));
        history.push("/assets");
        }
    }
    
    const postComment = (id, commentData) => {
        fetch(backendUrl+"assets/comments/"+id, {
            method : "put",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({commentData})
        })
            .then(res => res.json())
            .then(result => {
               console.log(result);
            })
    }

    return (
        <>
        <Header />
        <hr />
        <div className={"appBody"}>
            <AddButton saveData={saveData}/>
            <hr />
            <div className="home"> 
            {(imageList.length === 0) ? 
            <div className={"center"}>{"No Documents Added!"}</div> 
            // : <Posts 
            //     postsToRender={imageList} 
            //     delete={handleDelete} 
            //     onDragOver={onDragOver}
            //     onDragStart={onDragStart}
            //     onDrop={onDrop}
            //     />
            : imageList.map((post, index) => {
                return <ImageCard 
                    data={post}
                    key={`${post.name}${index}`} 
                    handleDelete={handleDelete} 
                    index={index}
                    onDragOver={onDragOver}
                    onDragStart={onDragStart}
                    onDrop={onDrop}
                    saveData={saveData}
                    postComment={postComment}
                />
            })
            }
            
            </div>
            {/* <Button 
                onClick={handleShowMorePosts} 
                disabled={next>=data.length}
                variant={"contained"}
            >Load more</Button> */}
        </div>
        </>
    );
}

export default Home;
