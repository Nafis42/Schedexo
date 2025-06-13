import cron from 'node-cron';
import { checkAndRefreshTokens } from '../utils/tokenManager.js';

// Run the token refresh check every 12 hours
// This ensures we catch any tokens that will expire in the next 24 hours
export const startTokenRefreshJob = () => {
    // Schedule the job to run every 12 hours
    cron.schedule('0 */12 * * *', async () => {
        console.log('Running token refresh job...');
        await checkAndRefreshTokens();
        console.log('Token refresh job completed');
    });
}; 