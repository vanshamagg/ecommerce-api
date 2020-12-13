const passport = require("passport");
const User = require("../models/user");

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
            callbackURL: "/auth/google/redirect",
            clientID: "47138177234-kaeje8dehg6k5uuf2f46vdkf3bqcsu5q.apps.googleusercontent.com",
            clientSecret: "vw6PF9Tx7KFtDXAxtRC-JDMn",
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
                console.log("USER FOUND");
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
