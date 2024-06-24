import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
  username: {
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
  return `Name: ${this.username} Email: ${this.email}`;
};

UserSchema.methods.findUsersByName = function() {
  return this.model("User")
      .find({username: this.username})
      .exec();
};

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.model('User', UserSchema);
export default User;