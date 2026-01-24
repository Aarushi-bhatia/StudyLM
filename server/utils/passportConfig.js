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
    // Inside your passport.use(new GoogleStrategy(...))
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await UserSchema.findOne({ email: profile.emails[0].value });

    if (!user) {
      // Create a new document in your MongoDB
      user = await UserSchema.create({
        username: profile.displayName,
        email: profile.emails[0].value,
        // Don't use the Google ID as the primary MongoDB _id
      });
    }
    
    // This 'user' is now a Mongoose document with a valid ._id
    return done(null, user); 
  } catch (err) {
    return done(err, null);
  }
}
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
