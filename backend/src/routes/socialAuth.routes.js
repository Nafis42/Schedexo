import express from 'express';
import { initiateFacebookAuth, handleFacebookCallback, disconnectSocialAccount } from '../controllers/socialAuth.controller.js';
import { getTwitterAuthUrl, handleTwitterCallback, refreshTwitterToken } from '../controllers/twitter.controller.js';
import { initiateLinkedInAuth, handleLinkedInCallback } from '../controllers/linkedin.controller.js';
// import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Facebook routes
router.get('/facebook/initiate', initiateFacebookAuth);
router.get('/facebook/callback', handleFacebookCallback);

// Twitter routes
router.get('/twitter/initiate', getTwitterAuthUrl);
router.get('/twitter/callback', handleTwitterCallback);
router.post('/twitter/refresh-token', refreshTwitterToken);

// LinkedIn routes
router.get('/linkedin/initiate', initiateLinkedInAuth);
router.get('/linkedin/callback', handleLinkedInCallback);

// Disconnect social account
router.delete('/:platform', disconnectSocialAccount);

export default router; 