import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserSchema from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await UserSchema.findOne({ email: profile.emails[0].value });

    if (!user) {
      user = await UserSchema.create({
        username: profile.displayName,
        email: profile.emails[0].value,
      });
    }
    
    return done(null, user); 
  } catch (err) {
    return done(err, null);
  }
}
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
