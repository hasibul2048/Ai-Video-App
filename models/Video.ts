import mongoose, { Schema, model, models } from 'mongoose';

export const VIDEO_DIMENTIONS = {
    width: 1080,
    height: 1920
};

export interface VIDEO_DIMENTIONS {
    width: number;
    height: number;
}


export interface IVideo{
    _id?: mongoose.Types.ObjectId
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    controls?: boolean;
    transformation?: {
        height: number;
        width: number;
        quality?: number;
    }
}


const videoSchema = new Schema<IVideo>(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        videoUrl: {type: String, required: true},
        thumbnailUrl: {type: String, required: true},
        controls: {type: Boolean, default: true},
        transformation:{
            height: {type: Number, default: VIDEO_DIMENTIONS.height},
            width: {type: Number, default: VIDEO_DIMENTIONS.width},
            quality: {type: Number, min: 1, max: 100},
        }
    },
    {timestamps: true,}
);

const Video = models.Video || model<IVideo>('Video', videoSchema); //if model already exists, use it, otherwise create a new one

export default Video; //export the User model