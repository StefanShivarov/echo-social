const bcryptjs = require("bcryptjs");
const userService = require("./userService");

const handleSignIn = async (email, password) => {
  const user = await userService.findUserByEmail(email);
  if (!user) {
    throw new Error(`User with email: ${email} does not exist!`);
  }

  if (!user.password) {
    throw new Error(
      `The account associated with this email address was created via an external provider. Please sign in using that method.`
    );
  }

  console.log(user.password);
  const passwordMatch = await bcryptjs.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid password!");
  }

  return user;
};

const handleSignInWithGoogle = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  const user = await userService.findUserByEmail(profile.emails[0].value);
  if (!user) {
    const newUserData = {
      username: profile.displayName,
      email: profile.emails[0].value,
      googleId: profile.id,
    };

    const newUser = await userService.createUser(newUserData);
    return done(null, newUser);
  }

  const updatedUser = await userService.updateUser(user.id, {
    googleId: profile.id,
  });
  return done(null, updatedUser);
};

module.exports = { handleSignIn, handleSignInWithGoogle };
