export const DB_NAME="Schedexo"

// API URLs
export const API_URLS = {
    FACEBOOK_REDIRECT_URI: process.env.FACEBOOK_REDIRECT_URI || 'http://localhost:3000/auth/facebook/callback',
    TWITTER_REDIRECT_URI: process.env.TWITTER_REDIRECT_URI || 'http://localhost:3000/auth/twitter/callback',
    LINKEDIN_REDIRECT_URI: process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:3000/auth/linkedin/callback',
    BASE_URL: "http://localhost:8000"
}
