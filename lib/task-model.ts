
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types

const likesSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
  });



const taskSchema = new mongoose.Schema(
  {
    product: {
      type: ObjectId,
      required: true,
      unique: false,
    },
    title: {
      type: String,
      required: [false, "The title is required "],
      unique: false,
      trim: true,

    },
    description: {
      type: String,
      required: false,
      trim: true,
      default: "Pending answer"
    },
    likes:[likesSchema]
  },
  {timestamps:true}
);
const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
export default Task;