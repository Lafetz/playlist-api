import mongoose from "mongoose";

const { Schema } = mongoose;

const songSchema = new Schema({
  name: {
    type: String,
    minLength: 1,
    maxLength: 200,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  playlist: {
    type: Schema.Types.ObjectId,
    ref: "Playlist",
    required: true,
  },
});

export default mongoose.model("Song", songSchema);