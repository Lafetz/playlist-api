import mongoose , { Document }from "mongoose";
const { Schema } = mongoose;
interface ISong extends Document {
name:string,
userId:mongoose.Types.ObjectId,
url:string,
playlistId:mongoose.Types.ObjectId,
  createdAt:Date,
  updatedAt:Date,
}
const songSchema = new Schema<ISong>({
  name: {
    type: String,
    minLength: 1,
    maxLength: 200,
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  url: {
    type: String,
    required: true,
  },
  playlistId: {
    type: Schema.Types.ObjectId,
    ref: "Playlist",
    required: true,
  },
});

export default mongoose.model<ISong>("Song", songSchema);