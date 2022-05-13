
const naver = require('./strategy');
const passport = require('passport');

const User = require('./model/User');

module.exports = () => {
    passport.serializeUser((user, done) => {
        console.log(user);
        done(null, user.snsId);
    });
    passport.deserializeUser((id, done) => {
        User.findOne({ where: { id } })
        .then(user => done(null, user))
        .catch(err => done(err));
    });

    naver(); // 네이버 전략 등록
};
    