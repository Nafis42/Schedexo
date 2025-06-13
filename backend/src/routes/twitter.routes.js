import express from 'express';
import { getTwitterAuthUrl, handleTwitterCallback, refreshTwitterToken } from '../controllers/twitter.controller.js';

const router = express.Router();

// Get Twitter OAuth URL
router.get('/auth-url', getTwitterAuthUrl);

// Twitter callback URL
router.get('/callback', handleTwitterCallback);

// Refresh Twitter token
router.post('/refresh-token', refreshTwitterToken);

export default router; 