const mongoose = require('mongoose');
const { Schema } = mongoose;

  const loginSchema = new Schema({
    name: { type: String },
    email: { type: String ,unique: true },
    password: { type: String },
    token: { type: String },
    id: { type: String }
  },{collection:`register`},{strict: true});
  
  
exports.authorization = mongoose.model('register', loginSchema);