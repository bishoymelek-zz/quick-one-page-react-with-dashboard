const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  nationalIdNum: { type: Number, required: true, unique: true, sparse: true },
  phoneNum: { type: Number, required: true },
  refNum: { type: String, unique: true },
  // 11 => (loan officer) 12 => (data entry officer)
  role: { type: Number, required: true }
});

EmployeeSchema.pre('save', function (next) {
  // Check if document is new
  if (this.isNew) {
    const firstNameInitial = this.firstName.slice(0, 1).toUpperCase();
    const lastNameInitial = this.lastName.slice(0, 1).toUpperCase();
    // just dummy
    // TODO: implement way helpful for the business to have easy to remember Ref Num
    this.refNum = firstNameInitial.concat(".", lastNameInitial, ".", this.nationalIdNum);
    next();
  }
  next();
});

module.exports = mongoose.model('Employee', EmployeeSchema);
