import mongoose from "mongoose";
import { type } from "os";

const Schema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true

    },
    category:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    Image:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    authorImg:{
        type: String,
        required: true
    }
})