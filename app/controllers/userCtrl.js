import jwt from 'jsonwebtoken';

import { config, redisClient } from '../../config';
import { Users } from '../models';
import {
    comparePassword,
    generateToken,
    validateToken
} from '../helpers';


var getUser = (req, res, next) => {
    let userid = req.body.userid;

    Users.findById(userid, (err, user) => {
        if (err) {
            console.log(err);
            throw err;
        }
        var data = {
            status: true,
            data: { users: user }
        }

        res.send(data);
        res.end();
    });
}

var getUsers = (req, res, next) => {

    Users
        .find({}).limit(10).exec((err, users) => {
            if (err) {
                console.log(err);
                throw err;
            }
            var data = {
                status: true,
                data: { users: users }
            }
            res.send(data);
            res.end();

        });
}

var saveUser = async(req, res, next) => {
    let userid = req.body.userid;

    let userObj = {
        email: req.body.email,
        password: req.body.password,
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        profileimage: req.body.profileimage,
    };

    userObj = new Users({...userObj });

    let savedUser = await userObj.save();
    var data = {
        status: true,
        data: { user: savedUser }
    }
    res.send(data);
    res.end();
}

var login = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    Users.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log(err);
            throw err;
        }

        comparePassword(password, user, function(err, isMatch) {
            console.log("user", isMatch)
            if (!isMatch) {
                throw "Password not matched";
            }

            var token = generateToken(user, 60);

            var data = {
                status: true,
                data: {
                    "user": {
                        fname: user.fname,
                        lname: user.lname,
                        email: user.email
                    },
                    "token": token
                }
            }
            res.send(data);
            res.end();
        });
    });
}

var authCheck = async(req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        res.send({ status: false, "message": "token required" });
        res.end();
    }
    try {
        jwt.verify(token, config.privateKey, function(err, decoded) {
            if (err) {
                res.send({ status: false, "message": err.message });
                throw err;
            }
            next();
        });
    } catch (err) {
        res.send({ status: false, "message": err.message });
        res.end();
        throw err;
    }
}

export default { getUser, getUsers, saveUser, login, authCheck };