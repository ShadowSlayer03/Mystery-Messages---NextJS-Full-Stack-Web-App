import mongoose,{Schema, Document} from "mongoose";

export interface Message extends Document{
    title?: string,
    content: string;
    createdAt: Date;
}

export const messageSchema:Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

