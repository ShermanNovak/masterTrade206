const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

const User = require("../apps/user/model");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};

module.exports = (passport) => {
  passport.use(
    new Strategy(jwtOptions, (jwtPayload, done) => {
      console.log(jwtPayload);
  
      User.findOne({ username: jwtPayload.username })
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => done(err, null));
    })
  );
}