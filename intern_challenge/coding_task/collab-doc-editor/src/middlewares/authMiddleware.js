import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

export const authMiddleware = ClerkExpressWithAuth({
	secretKey: process.env.CLERK_SECRET,
});
