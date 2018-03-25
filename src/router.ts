import * as Router from 'koa-router';
import auth from './middleware/auth';
import validator from './middleware/validator';
import testCtrl from './controller/test';
import userCtrl from './controller/user';
import usersCtrl from './controller/users';

const router = new Router();

router.prefix('/api/v0');

router
  .get('/test', testCtrl.index)
  .post('/user/login', userCtrl.login)
  .get('/user/:id', auth, userCtrl.getUser)
  .get('/users', validator({ query: ['type'] }), usersCtrl.index);

export default router;
