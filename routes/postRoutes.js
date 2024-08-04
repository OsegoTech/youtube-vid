import express from "express"
import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/postController.js"

const router = express.Router()

router.route("/", createPost).get(getPosts)
router.route("/:id").get(getPost).delete(deletePost).patch(updatePost)


export default router