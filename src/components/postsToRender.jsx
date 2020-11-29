import React from "react";
import ImageCard from "./imageCard";

const Posts = (props) => {return (
    <>
      {props.postsToRender.map((post, index) => {
        return <ImageCard 
          key={`${post.name}${index}`} 
          postsToRender={post} 
          handleDelete={props.delete} 
          index={index}
          onDragOver={props.onDragOver}
          onDragStart={props.onDragStart}
          onDrop={props.onDrop}
          />
      })}
      </>
  );
};
export default Posts;