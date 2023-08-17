const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const {nanoid} = require("nanoid")

const { SECRET_KEY,BASE_URL } = process.env;

const { ctrl, HttpError, sendEmail } = require("../helpers");

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hassPassword = await bcrypt.hash(password, 10);
const verificationToken = nanoid()

  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hassPassword,
    avatarURL,
    verificationToken
  });
const verifyEmail = {
  to: email,
  subject: "Varify email",
  html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Hello! Please, click this link to confirm your email<a/>`
}
await sendEmail(verifyEmail)


  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};
const verify = async(req, res) => {
  const {verificationToken} = req.params;
  const user = await User.findOne({verificationToken})
  if (!user) {
    throw HttpError(404, "User not found")
  }
  await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: ""})

  res.json({
    message: "Verification successful"
  })
}

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  if (!user.verify) {
    throw HttpError(401)
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "Logout success",
  });
};
const changeSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { id } = req.user;
  const user = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  );
  if (!user) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    subscription,
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  Jimp.read(tempUpload)
  .then((avatar) => {
    return avatar
      .resize(250, 250) // resize
      .write(resultUpload); // save
  })
  .catch((err) => {
    console.error(err);
  });
  const fileName = `${_id}_${originalname}`
  const resultUpload = path.join(avatarDir, fileName);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL
  })
};

const resendVerify = async(req, res) => {
const {email} = req.body;
const user = await User.findOne({email})
if (!user) {
  throw HttpError(401);
}

if (user.verify) {
  throw HttpError(400, "Email already verify")
}
const verifyEmail = {
  to: email,
  subject: "Varify email",
  html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Hello! Please, click this link to confirm your email<a/>`
}
await sendEmail(verifyEmail)
res.json({
  message: " Verify email send success"
})
}

module.exports = {
  register: ctrl(register),
  login: ctrl(login),
  getCurrent: ctrl(getCurrent),
  logout: ctrl(logout),
  changeSubscription: ctrl(changeSubscription),
  updateAvatar: ctrl(updateAvatar),
  verify:ctrl(verify),
  resendVerify: ctrl(resendVerify)
};
