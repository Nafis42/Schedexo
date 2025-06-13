import { TwitterApi } from 'twitter-api-v2';
import { SocialConnection } from '../models/socialConnection.model.js';
import { API_URLS } from '../constants.js';

// Initialize Twitter client
const twitterClient = new TwitterApi({
    clientId: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,

});

// Generate Twitter OAuth URL
export const getTwitterAuthUrl = async (req, res) => {
    try {
        console.log(twitterClient);
        const authUrl = await twitterClient.generateOAuth2AuthLink(
            API_URLS.TWITTER_REDIRECT_URI,
            { scope: ['tweet.read', 'users.read', 'offline.access'] }
        );
        res.json({ authUrl });
    } catch (error) {
        console.error('Error generating Twitter auth URL:', error);
        res.status(500).json({ error: 'Failed to generate Twitter auth URL' });
    }
};

// Handle Twitter callback
export const handleTwitterCallback = async (req, res) => {
    const { code } = req.query;
    const userId = req.user?._id;
    
    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    
    try {
        // Exchange code for access token
        const { client: loggedClient, accessToken, refreshToken, expiresIn } = 
            await twitterClient.loginWithOAuth2({ 
                code, 
                redirectUri: API_URLS.TWITTER_REDIRECT_URI 
            });

        // Get user info
        const user = await loggedClient.v2.me();
        
        // Calculate token expiry
        const tokenExpiry = new Date(Date.now() + expiresIn * 1000);

        // Check if user already has a Twitter connection
        let socialConnection = await SocialConnection.findOne({
            userId,
            platform: 'twitter'
        });

        if (socialConnection) {
            // Update existing connection
            socialConnection.accessToken = accessToken;
            socialConnection.refreshToken = refreshToken;
            socialConnection.tokenExpiry = tokenExpiry;
            socialConnection.platformUserId = user.data.id;
            socialConnection.platformUsername = user.data.username;
        } else {
            // Create new connection
            socialConnection = new SocialConnection({
                userId,
                platform: 'twitter',
                accessToken,
                refreshToken,
                tokenExpiry,
                platformUserId: user.data.id,
                platformUsername: user.data.username
            });
        }

        await socialConnection.save();

        res.json({
            success: true,
            user: user.data,
            connection: {
                platform: 'twitter',
                username: user.data.username,
                connected: true
            }
        });
    } catch (error) {
        console.error('Error in Twitter callback:', error);
        res.status(500).json({ error: 'Failed to authenticate with Twitter' });
    }
};

// Refresh Twitter token
export const refreshTwitterToken = async (req, res) => {
    const { refreshToken } = req.body;
    const userId = req.user?._id;
    
    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    
    try {
        const { client: refreshedClient, accessToken, refreshToken: newRefreshToken, expiresIn } = 
            await twitterClient.refreshOAuth2Token(refreshToken);

        // Update the connection in database
        const socialConnection = await SocialConnection.findOne({
            userId,
            platform: 'twitter'
        });

        if (!socialConnection) {
            return res.status(404).json({ error: 'Twitter connection not found' });
        }

        socialConnection.accessToken = accessToken;
        socialConnection.refreshToken = newRefreshToken;
        socialConnection.tokenExpiry = new Date(Date.now() + expiresIn * 1000);
        await socialConnection.save();

        res.json({
            success: true,
            accessToken,
            refreshToken: newRefreshToken
        });
    } catch (error) {
        console.error('Error refreshing Twitter token:', error);
        res.status(500).json({ error: 'Failed to refresh Twitter token' });
    }
}; 