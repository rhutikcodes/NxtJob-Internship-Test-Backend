import { Clerk } from '@clerk/clerk-sdk-node'; // Correct Clerk import

// Register Function
export const register = async (email, password) => {
	try {
		const user = await Clerk.users.createUser({
			emailAddress: email,
			password,
		});
		return user;
	} catch (error) {
		console.error('Error creating user:', error);
		throw new Error('Registration failed');
	}
};

// Login Function
export const login = async (email, password) => {
	try {
		const user = await Clerk.users.getUserByEmail(email);
		if (!user) {
			return null;
		}

		return user;
	} catch (error) {
		console.error('Error during login:', error);
		throw new Error('Login failed');
	}
};
