const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret'
const mongoose = require('mongoose');
const socials = require('./router/api/socials');
const Social = mongoose.model("socials");
const passport = require('koa-passport');
module.exports = passport =>{
    passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
        // console.log(jwt_payload);
        const social = await Social.findById(jwt_payload.id);
        if(social){
            return done(null,social);
        }else{
            return done(null,false)
        }
    }));
};