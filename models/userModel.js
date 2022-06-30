const crypto = require('crypto');
const mongoose = require('mongoose');
// const validator = require('validator');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name!']
    },
    email: {
      type: String,
      required: [true, 'Please provide your TUP email!'],
      unique: true,
      lowercase: true
    },
    photo: {
      type: String,
      default: 'default.jpg'
    },
    contact: {
      type: String,
      required: [true, 'Please provide a contact number']
    },
    // bday: {
    //   type: String,
    //   required: [true, 'Please provide a birth date']
    // },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    status: {
      type: String,
      enum: ['Pending', 'Active'],
      default: 'Pending'
    },
    verified: {
      type: Boolean,
      required: true,
      default: false
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // this only works on create and save!!!
        validator: function(el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!'
      }
    },
    passwordChangedAt: Date,
    resetPasswordToken: {
      type: String,
      default: null
    },
    resetPasswordExpires: {
      type: Date,
      default: null
    },
    emailToken: {
      type: String,
      default: null
    },
    emailTokenExpires: {
      type: Date,
      default: null
    },
    active: {
      type: Boolean,
      default: true,
      select: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
    // date: {
    //   dateToString: {
    //     format: '%d/%m/%Y',
    //     date: '$timestamp'
    //   }
    // }
    // active: {
    //   type: Boolean,
    //   default: false
    // }
  },
  {
    timestamps: {
      updatedAt: 'updatedAt'
    }
  }
);

// Custom validation for email
userSchema.path('email').validate(val => {
  const emailRegex = /[a-z0-9]+@[a-z]+.edu.[a-z]{2,3}/;
  return emailRegex.test(val);
}, 'Invalid e-mail.');

userSchema.pre('save', async function(next) {
  // only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function(next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // false means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// create token for verifying an account
userSchema.methods.createVerificationToken = function() {
  // create token(not yet encrypted)
  const verificationToken = crypto.randomBytes(32).toString('hex');

  // encrypt the created token and save to the user
  this.emailToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  // return the unencrypted token
  return verificationToken;
};

// userSchema.methods.generateVerificationToken = function() {
//   const user = this;
//   const verificationToken = jwt.sign({ ID: user._id }, process.env.JWT_SECRET, {
//     expiresIn: '7d'
//   });
//   return verificationToken;
// };

// module.exports.hashPassword = async password => {
//   try {
//     const salt = await bcrypt.genSalt(10); // 10 rounds
//     return await bcrypt.hash(password, salt);
//   } catch (error) {
//     throw new Error('Hashing failed', error);
//   }
// };

const User = mongoose.model('User', userSchema);

module.exports = User;
