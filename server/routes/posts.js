import express from 'express';
//import { deletePost } from '../../client/src/api/index.js';
import auth from '../middleware/auth.js';
import { getPosts,createPost,updatePost,deletePost} from '../controllers/posts.js'; 

const router=express.Router();


router.get('/',getPosts);
router.post('/',auth,createPost);           
router.patch('/:id',auth,updatePost);                   //managed on the frontend
router.delete('/:id',auth,deletePost);               //managed on the frontend
//router.patch('/:id/likePost',auth,likePost);        //managed on the backend

export default router;