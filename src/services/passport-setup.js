const passport = require("passport");
const User = require("../models/user");
const dotenv = require('dotenv');

const GoogleStrategy = require("passport-google-oauth20");

passport.serializeUser((user, done)=> {
    done(null, user._id);
})

passport.deserializeUser((obj, done)=> {
    done(null, obj);
})


passport.use(
    new GoogleStrategy(
        {
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            clientID: process.env.CLIENT_ID ,
            clientSecret: process.env.CLIENT_SECRET,
        },
        cb
    )
);

function cb(accessToken, refreshToken, profile, done) {
    const data = profile._json;
    (async () => {
        try {
            const doc = await User.findOne({ email: data.email });
            // if a user is found
            if (doc) {
                console.log("USER FOUND".white.bold);
                done(null, doc)
                // if a user is not found, we create one
            } else {
                const newUser = new User({
                    firstname: data.given_name,
                    lastname: data.family_name,
                    email: data.email,
                    password: "kajshsuhahavsgsgs",
                });
                const doc = await newUser.save();
                console.log("User Added to Db".bold.white);
                done(null, doc);
            }
        } catch (err) {
            console.log(err.message.bold.red);
        }
    })();
}
