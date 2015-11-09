import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

function localAuthenticate(User, login, password, done) {
  User.findOneAsync({
    login: login.toLowerCase()
  })
    .then(function(user) {
      if (!user) {
        return done(null, false, {
          message: 'This login is not registered.'
        });
      }
      user.authenticate(password, function(authError, authenticated) {
        if (authError) {
          return done(authError);
        }
        if (!authenticated) {
          return done(null, false, {
            message: 'This password is not correct.'
          });
        } else {
          return done(null, user);
        }
      });
    })
    .catch(function(err) {
      return done(err);
    });
}

exports.setup = function(User, config) {
  passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password' // this is the virtual field on the model
  }, function(login, password, done) {
    return localAuthenticate(User, login, password, done);
  }));
};
