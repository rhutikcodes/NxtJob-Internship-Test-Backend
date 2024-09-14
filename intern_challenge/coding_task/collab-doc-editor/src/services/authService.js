// src/test/authService.test.js
import { describe, it, expect, beforeAll, vi } from 'vitest';
import { authService } from '../services/authService.js';
import { Clerk } from '@clerk/clerk-sdk-node';
import bcrypt from 'bcrypt';

// Mock Clerk and bcrypt
vi.mock('@clerk/clerk-sdk-node');
vi.mock('bcrypt');

describe('authService', () => {
	let mockUser;

	beforeAll(() => {
		// Set up mock user data
		mockUser = {
			emailAddress: 'test@example.com',
			id: 'mockId',
			password: 'hashedPassword', // Mock hashed password for comparison
		};

		// Mock Clerk and bcrypt functions
		Clerk.Client.mockImplementation(() => ({
			users: {
				create: vi.fn().mockResolvedValue(mockUser),
				findUnique: vi.fn().mockResolvedValue(mockUser),
			},
			sessions: {
				createSession: vi.fn().mockResolvedValue({ session: { userId: 'mockId' } }),
			},
		}));

		bcrypt.hash.mockResolvedValue('hashedPassword');
		bcrypt.compare.mockResolvedValue(true);
	});

	it('should register a user', async () => {
		const user = await authService.register('test@example.com', 'password');
		expect(user).toEqual({ id: 'mockId', emailAddress: 'test@example.com' });
		expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
	});

	it('should log in a user with valid credentials', async () => {
		const user = await authService.login('test@example.com', 'password');
		expect(user).toEqual(mockUser);
		expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedPassword');
	});

	it('should not log in a user with invalid credentials', async () => {
		bcrypt.compare.mockResolvedValue(false);
		const user = await authService.login('test@example.com', 'wrongpassword');
		expect(user).toBeNull();
	});
});
