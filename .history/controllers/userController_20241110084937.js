const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const Skill = require('../models/skillsModel');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  //1)Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password update.Please use updateMyPassword',
        400
      )
    );
  }
  //2)Filtered out unwanted fields names that are not allowed to be updated

  // x = req.body we can't do because user can change other field like role or passwordResetToken or etc.
  const filteredBody = filterObj(
    req.body,
    'name',
    'email',
    'bio',
    'skills',
    'profilePicture'
  );

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  // updating the user id in skill collection
  if (updatedUser?.skills?.length) {
    await Promise.all(
      updatedUser.skills.map(async (skill) => {
        const skillDoc = await Skill.findOneAndUpdate(
          { name: skill },
          { $addToSet: { users: updatedUser._id } },
          { new: true } // Returns the updated document
        );
      })
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getUser = factory.getOne(User, {
  path: 'requestsReceived requestsSent',
});
// Do NOT update passwords with this!

exports.getAllUsers = factory.getAll(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
