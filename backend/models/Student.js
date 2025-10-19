import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    adminID: String,
    email: String,
    dob: Date,
    phone: String,
    gender: String,
    university: String,
    address: String,
    city: String,
    zipCode: String,
    country: String,
    domain: String,
    education: String,
    graduationYear: String,
    photo: String,
    password: String
});

const Student = mongoose.model('Student', studentSchema);
export default Student;  // ✅ Add default export