import mongoose from 'mongoose';
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  entries: [{type: mongoose.Schema.Types.ObjectId, ref: "Entry"}],
  habits: [{type: mongoose.Schema.Types.ObjectId, ref: "Habit"}]
});

UserSchema.methods.getInfo = function() {
    return `Name: ${this.name} Email: ${this.email}`;
};
  
UserSchema.methods.findUsersByName = function() {
    return this.model("User")
    .find({name: this.name})
    .exec();
};
UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.model('User', UserSchema);
export default User;