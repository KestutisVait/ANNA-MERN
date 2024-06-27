const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const AdminModel = require('../models/admin');

passport.use(new BearerStrategy(
  async function(token, done) {
    try {
      const user = await AdminModel.findOne({ token: token }).exec();
      if (!user || user.token_expires.getTime() < Date.now()) {
        return done(null, false);
      }
      return done(null, user, { scope: 'all' });
    } catch (err) {
      return done(err);
    }
  }
));

module.exports = passport;
