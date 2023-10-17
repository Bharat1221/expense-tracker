const mongoose = require('mongoose');
const { Schema } = mongoose;

  const loginSchema = new Schema({
    date: { type: Number },
    id: { type: String  },
    expensedata: { type: [
      {
        type:Object,
      }
    ]
        },
  },{collection:`expenseData`},{strict: true});
  
  
exports.expenseData = mongoose.model('expenseData', loginSchema);