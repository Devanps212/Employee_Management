import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
    },
    position: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    dateOfJoining: {
      type: Date,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
      min: [0, 'Salary must be a positive number'],
    },
  },
  { timestamps: true }
)

export const Employees = mongoose.model('Employee', employeeSchema);
