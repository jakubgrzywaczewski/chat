import { Router } from 'express';

import RootController from '../controllers/root.controller';

const RootRouter: Router = Router();
RootRouter.get('/', RootController);

export default RootRouter;
