import { vi } from 'vitest';

// Mock `@clerk/clerk-sdk-node`
vi.mock('@clerk/clerk-sdk-node', () => {
	return {
		Clerk: {
			Client: vi.fn().mockImplementation(() => ({
				users: {
					create: vi.fn().mockResolvedValue({ id: 'mockId', emailAddress: 'test@example.com' }),
					findUnique: vi.fn().mockResolvedValue({ id: 'mockId', emailAddress: 'test@example.com', password: 'hashedPassword' }),
				},
				sessions: {
					createSession: vi.fn().mockResolvedValue({ session: { userId: 'mockId' } }),
				},
			})),
		},
	};
});

// Mock bcrypt
vi.mock('bcrypt', () => ({
	hash: vi.fn(),
	compare: vi.fn(),
}));
