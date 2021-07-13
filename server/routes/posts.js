import express from 'express';
//import { deletePost } from '../../client/src/api/index.js';

import { getPosts,createPost,updatePost,deletePost,likePost} from '../controllers/posts.js'; 

const router=express.Router();

router.get('/',getPosts);
router.post('/',createPost);
router.patch('/:id',updatePost);
router.delete('/:id',deletePost);
router.patch('/:id/likePost',likePost);

export default router;