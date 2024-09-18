import { Hono } from 'hono';
import { loginUser, registerUser } from '../controllers/authCOntroller.js';

const authRoutes = new Hono();

authRoutes.post('/login', loginUser);
authRoutes.post('/register', registerUser);

export default authRoutes;
