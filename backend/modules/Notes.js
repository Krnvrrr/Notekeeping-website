const mongoose =require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
  user:{ type:mongoose.Schema.Types.ObjectId,ref:'user'},
  Title: { type: String, require: true },
  discription: { type: String, require: true },
  tag: { type: String, default: "general" },
  date: { type: String, default: Date.now },
});
module.exports = mongoose.model("Notes", NotesSchema);
