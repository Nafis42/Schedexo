import dotenv from 'dotenv';
dotenv.config();

export const twitterConfig = {
    clientID: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL || 'http://localhost:3000/auth/twitter/callback',
    scope: ['tweet.read', 'users.read', 'offline.access']
}; 