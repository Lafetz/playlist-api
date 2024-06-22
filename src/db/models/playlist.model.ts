import mongoose, { Document, Schema } from "mongoose";

export interface IPlaylist extends Document {
  title: string,
  description?: string,
  songs: mongoose.Types.ObjectId[],
  createdAt:Date,
  updatedAt:Date,
}

const playlistSchema = new Schema<IPlaylist>({
  title: {
    type: String,
    minLength: 1,
    maxLength: 200,
    required: true,
  },
  description: {
    type: String,
    maxLength: 500,
    default: "",
  },
  songs: [{
    type: Schema.Types.ObjectId,
    ref: 'Song'
  }]
}, {
  timestamps: true,
});

export default mongoose.model<IPlaylist>("Playlist", playlistSchema);