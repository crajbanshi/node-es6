import express from 'express';
import { userCtlr, configuratorCtrl } from './../controllers';

import { getUserValidate, saveUserValidate, loginValidate } from './../validation';
const router = express.Router();
/**
 *configurator Routes
 */


router.route('/saveUser').post(saveUserValidate, userCtlr.saveUser);

router.route('/login').post(loginValidate, userCtlr.login);

router.route('/getUser').post(userCtlr.authCheck, getUserValidate, userCtlr.getUser);
router.route('/getUsers').post(userCtlr.authCheck, userCtlr.getUsers);


export default router;