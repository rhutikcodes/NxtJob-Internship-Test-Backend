import { describe, it, expect, beforeAll, vi } from 'vitest';
import { authService } from '../services/authService.js';
import bcrypt from 'bcrypt';

describe('authService', () => {
	let mockUser;

	beforeAll(() => {
		// Set up mock user data
		mockUser = {
			id: 'mockId',
			emailAddress: 'test@example.com',
			password: 'hashedPassword',
		};

		// Mock bcrypt functions
		bcrypt.hash.mockResolvedValue(mockUser.password);
		bcrypt.compare.mockResolvedValue(true);
	});

	it('should register a user', async () => {
		const user = await authService.register('test@example.com', 'password');
		expect(user).toEqual(mockUser);
		expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
	});

	it('should log in a user with valid credentials', async () => {
		const user = await authService.login('test@example.com', 'password');
		expect(user).toEqual(mockUser);
		expect(bcrypt.compare).toHaveBeenCalledWith('password', mockUser.password);
	});

	it('should throw an error with invalid credentials', async () => {
		bcrypt.compare.mockResolvedValue(false); // Mock invalid password comparison
		await expect(authService.login('test@example.com', 'wrongPassword')).rejects.toThrow('Invalid login credentials');
	});
});
