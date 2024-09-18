import { register, login } from '../services/authService.js';

export const loginUser = async (c) => {
	const { email, password } = await c.req.json();
	const user = await login(email, password);

	if (user) {
		return c.json({ user });
	} else {
		return c.json({ error: 'Invalid credentials' }, 401);
	}
};

export const registerUser = async (c) => {
	const { email, password } = await c.req.json();
	const newUser = await register(email, password);

	if (newUser) {
		return c.json({ newUser }, 201);
	} else {
		return c.json({ error: 'Registration failed' }, 400);
	}
};
