import React ,{useState,useEffect} from "react";
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import useStyles from "./styles";


import {createPost,updatePost} from '../../actions/posts';
//import { updatePost } from "../../api";

const Form = ({currentId,setCurrentId}) => {

  const [postData,setPostData]= useState({creator:'',title:'',message:'',tags:'',selectedFile:''});
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));

  //const [postData,setPostData]= useState({price:'',coin:'',investment:'',tags:'',selectedFile:''});
  const classes = useStyles();
  const dispatch =useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(currentId){
      dispatch(updatePost(currentId,postData));
    }
    else{
    dispatch(createPost(postData));
    }
    clear();
  };

  const clear=()=>{
    setCurrentId(null);
    setPostData({creator:'',title:'',message:'',tags:'',selectedFile:''});
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>

        <Typography variant="h6"> Tracking an investment </Typography>
        
        <TextField
          name="creator"
          variant="outlined"
          label="Enter the asset's price"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value }) //changing state by spreading an object
          }
        />

        <TextField
          name="title"
          variant="outlined"
          label="Enter the coin/token"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <TextField
          name="message"
          variant="outlined"
          label="Investment details"
          fullWidth
          multiline
          rows={3}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />

        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />

        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>

        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
