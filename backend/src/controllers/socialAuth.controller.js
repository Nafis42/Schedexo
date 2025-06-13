import axios from 'axios';
import { SocialConnection } from '../models/socialConnection.model.js';
import { API_URLS } from '../constants.js';

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
const REDIRECT_URI = API_URLS.FACEBOOK_REDIRECT_URI;

export const initiateFacebookAuth = async (req, res) => {
    try {
        console.log(FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, REDIRECT_URI);
        const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=pages_manage_posts,instagram_basic,instagram_content_publish,pages_read_engagement`;
        res.json({ authUrl });
    } catch (error) {
        res.status(500).json({ error: 'Failed to initiate Facebook authentication' });
    }
};

export const handleFacebookCallback = async (req, res) => {
    try {
        const { code } = req.query;
        
        // Exchange code for access token
        const tokenResponse = await axios.get('https://graph.facebook.com/v18.0/oauth/access_token', {
            params: {
                client_id: FACEBOOK_APP_ID,
                client_secret: FACEBOOK_APP_SECRET,
                redirect_uri: REDIRECT_URI,
                code
            }
        });

        const { access_token, expires_in } = tokenResponse.data;

        // Get user's Facebook pages
        const pagesResponse = await axios.get('https://graph.facebook.com/v18.0/me/accounts', {
            params: { access_token }
        });

        // Get user's Instagram account
        const instagramResponse = await axios.get('https://graph.facebook.com/v18.0/me/accounts', {
            params: {
                access_token,
                fields: 'instagram_business_account'
            }
        });

        // Store the connection in database
        const socialConnection = new SocialConnection({
            userId: req.user._id, // Assuming you have user authentication middleware
            platform: 'facebook',
            accessToken: access_token,
            tokenExpiry: new Date(Date.now() + expires_in * 1000),
            platformUserId: req.user._id,
            connectedPages: pagesResponse.data.data.map(page => ({
                pageId: page.id,
                pageName: page.name,
                pageAccessToken: page.access_token,
                pageTokenExpiry: new Date(Date.now() + page.expires_in * 1000)
            }))
        });

        await socialConnection.save();

        res.json({ message: 'Successfully connected Facebook account' });
    } catch (error) {
        console.error('Facebook callback error:', error);
        res.status(500).json({ error: 'Failed to complete Facebook authentication' });
    }
};

export const disconnectSocialAccount = async (req, res) => {
    try {
        const { platform } = req.params;
        await SocialConnection.findOneAndDelete({
            userId: req.user._id,
            platform
        });
        res.json({ message: `Successfully disconnected ${platform} account` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to disconnect social account' });
    }
}; 