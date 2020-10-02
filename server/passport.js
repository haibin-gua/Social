const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
const mongoose = require('mongoose');
const User = mongoose.model('social');
module.exports = passport =>{
    passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
        console.log(jwt_payload);
        const user = await User.findById
    }));
}