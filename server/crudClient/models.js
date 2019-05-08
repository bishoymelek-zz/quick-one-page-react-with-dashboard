const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNum: { type: Number, required: true, unique: true, sparse: true },
  loanOfficerRefNum: { type: String, required: true },
  dataEntryRefNum: { type: String, required: true },
}, { timestamps: true});

module.exports = mongoose.model('Client', ClientSchema);
