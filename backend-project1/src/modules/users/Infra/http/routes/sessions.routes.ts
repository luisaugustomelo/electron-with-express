import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const autenticateUser = new AuthenticateUserService();

        const { user, token } = await autenticateUser.execute({
            email,
            password,
        });

        // @ts-expect-error forçando remoção do password
        delete user.password;
        return response.json({ user, token });
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default sessionsRouter;