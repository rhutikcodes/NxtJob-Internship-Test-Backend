import { authService } from '../services/authService.js';

export const loginUser = async (req, res) => {
	const { email, password } = req.body;
	const user = await authService.login(email, password);
	res.json({ user });
};

export const registerUser = async (req, res) => {
	const { email, password } = req.body;
	const newUser = await authService.register(email, password);
	res.json({ newUser });
};
