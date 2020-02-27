import express from 'express';
import path from 'path';

// import userRoute from './users';
import swagger from './swagger';
import testapi from './testapi';

var router = express.Router();


router.route('/').all(function(req, res) {
    res.send({ "status": true, "message": "Restfull API", "data": {} });
});

router.use(testapi);

router.use(swagger);
// router.use(userRoute);





export default router;