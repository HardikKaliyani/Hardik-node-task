import mongoose from "mongoose";

const instituteSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["GSAB", "CBSE", "GSEB"],
    index: true,
  },
});
const instituteModel = mongoose.model("school-boards", instituteSchema);
export default instituteModel;
