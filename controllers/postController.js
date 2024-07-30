import Post from "../models/postModel.js"
import multer from "multer"
import {v2 as cloudinary} from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "posts",
        allowed_formats: ["jpeg", "png", "jpg"]
    }
})

export const upload = multer({storage: storage})


export const createPost = async(req, res) =>{
    try {
        if(!req.file) return res.status(400).json({
            status: "Fail",
            message: "Please upload an image"
        })
        const result = req.file.path
        const {title, body, author} = req.body
        const post  = await Post.create({
            title,
            body,
            author,
            image: result
        })

        res.status(201).json({
            status: "Success", 
            data: post
        })
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        })
    }
}


export const getPosts = async(req, res) =>{
    try {
        const posts = await Post.find()
        if(!posts) return res.status(404).json({
            message: "No posts found"
        })
        res.status(200).json({
            status: "success",
            data: posts,
            total: posts.length
        })
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        })
    }
}

export const getPost = async(req, res) =>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post) return res.status(404).json({
            message: "No post found"
        })
        res.status(200).json({
            status: "success",
            data: post,
        })
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        })
    }
}


export const deletePost = async(req, res) =>{
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        if(!post) return res.status(404).json({
            message: " post not found"
        })
        res.status(204).json({
            message: "Post deleted"
        })
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        })
    }
}


export const updatePost = async(req, res) =>{
    try {
        const {title, body, author} = req.body
        const post = await Post.findByIdAndUpdate(req.params.id,{
            title,
            body,
            author
        }, {new: true, runValidators: true})
        if(!post) return res.status(404).json({
            message: " post not found"
        })
        res.status(200).json({
            status: "success",
            data: post
        })
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        })
    }
}