import axios from 'axios';
import { SocialConnection } from '../models/socialConnection.model.js';

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

export const refreshFacebookToken = async (socialConnection) => {
    try {
        // Refresh the main access token
        const tokenResponse = await axios.get('https://graph.facebook.com/v18.0/oauth/access_token', {
            params: {
                grant_type: 'fb_exchange_token',
                client_id: FACEBOOK_APP_ID,
                client_secret: FACEBOOK_APP_SECRET,
                fb_exchange_token: socialConnection.accessToken
            }
        });

        const { access_token, expires_in } = tokenResponse.data;

        // Update the main access token
        socialConnection.accessToken = access_token;
        socialConnection.tokenExpiry = new Date(Date.now() + expires_in * 1000);

        // Refresh page access tokens
        const pagesResponse = await axios.get('https://graph.facebook.com/v18.0/me/accounts', {
            params: { access_token }
        });

        // Update page tokens
        socialConnection.connectedPages = pagesResponse.data.data.map(page => ({
            pageId: page.id,
            pageName: page.name,
            pageAccessToken: page.access_token,
            pageTokenExpiry: new Date(Date.now() + page.expires_in * 1000)
        }));

        await socialConnection.save();
        return true;
    } catch (error) {
        console.error('Error refreshing Facebook token:', error);
        return false;
    }
};

export const checkAndRefreshTokens = async () => {
    try {
        // Find all social connections that will expire in the next 24 hours
        const expiringConnections = await SocialConnection.find({
            tokenExpiry: {
                $lt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
            }
        });

        for (const connection of expiringConnections) {
            if (connection.platform === 'facebook') {
                await refreshFacebookToken(connection);
            }
            // Add other platforms here as needed
        }
    } catch (error) {
        console.error('Error in token refresh job:', error);
    }
}; 