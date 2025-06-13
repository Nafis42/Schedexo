import axios from 'axios';
import { SocialConnection } from '../models/socialConnection.model.js';
import { API_URLS } from '../constants.js';

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = API_URLS.LINKEDIN_REDIRECT_URI;

export const initiateLinkedInAuth = async (req, res) => {
    try {
        const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=openid%20profile%20email%20w_member_social`;
        res.json({ authUrl });
    } catch (error) {
        console.error('Error initiating LinkedIn auth:', error);
        res.status(500).json({ error: 'Failed to initiate LinkedIn authentication' });
    }
};

export const handleLinkedInCallback = async (req, res) => {
    try {
        const { code } = req.query;
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // Exchange code for access token
        const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
            params: {
                grant_type: 'authorization_code',
                code,
                client_id: LINKEDIN_CLIENT_ID,
                client_secret: LINKEDIN_CLIENT_SECRET,
                redirect_uri: REDIRECT_URI
            }
        });

        const { access_token, expires_in } = tokenResponse.data;

        // Get user profile
        const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });

        // Calculate token expiry
        const tokenExpiry = new Date(Date.now() + expires_in * 1000);

        // Check if user already has a LinkedIn connection
        let socialConnection = await SocialConnection.findOne({
            userId,
            platform: 'linkedin'
        });

        if (socialConnection) {
            // Update existing connection
            socialConnection.accessToken = access_token;
            socialConnection.tokenExpiry = tokenExpiry;
            socialConnection.platformUserId = profileResponse.data.id;
            socialConnection.platformUsername = `${profileResponse.data.localizedFirstName} ${profileResponse.data.localizedLastName}`;
        } else {
            // Create new connection
            socialConnection = new SocialConnection({
                userId,
                platform: 'linkedin',
                accessToken: access_token,
                tokenExpiry,
                platformUserId: profileResponse.data.id,
                platformUsername: `${profileResponse.data.localizedFirstName} ${profileResponse.data.localizedLastName}`
            });
        }

        await socialConnection.save();

        res.json({
            success: true,
            user: profileResponse.data,
            connection: {
                platform: 'linkedin',
                username: `${profileResponse.data.localizedFirstName} ${profileResponse.data.localizedLastName}`,
                connected: true
            }
        });
    } catch (error) {
        console.error('LinkedIn callback error:', error);
        res.status(500).json({ error: 'Failed to complete LinkedIn authentication' });
    }
}; 