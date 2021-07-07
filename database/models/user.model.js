const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = schema({
  username: { type: String, required: true, unique: true },
  local: {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  avatar: { type: String, default: '/images/avatar/default-profile.png' },
  role: {type: String, default: 'user' }
});

// Methode static du schema user
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hash(password, 12);
};

// Methode d'instance du schema user
// ici pas de fonction flecher car sa change le contexte de this
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.local.password);
};

const User = mongoose.model('users', userSchema);

module.exports = User;