import mongoose from 'mongoose';

const socialConnectionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    platform: {
        type: String,
        enum: ['facebook', 'instagram', 'twitter', 'linkedin'],
        required: true
    },
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    },
    tokenExpiry: {
        type: Date,
        required: true
    },
    platformUserId: {
        type: String,
        required: true
    },
    platformUsername: {
        type: String
    },
    connectedPages: [{
        pageId: String,
        pageName: String,
        pageAccessToken: String,
        pageTokenExpiry: Date
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
socialConnectionSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

export const SocialConnection = mongoose.model('SocialConnection', socialConnectionSchema); 