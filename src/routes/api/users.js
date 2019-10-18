const router = require("express").Router();
import { authenticate } from "passport";
import User from '../../models/users';

router.get("/users", function(req, res, next) {
    User.findAll()
    .then(
        (results) => {
            res.length === 0? true: false
            res.json(results)
        }
    )
    .catch (
        (err) => {
            console.error('Error retrieving profiles.', err)
            next
        }
    )
});

router.put("/user", function(req, res, next) {
    findById(req.payload.id)
        .then(function(user) {
            if (!user) {
                return res.sendStatus(401);
            }

            // only update fields that were actually passed...
            if (typeof req.body.user.username !== "undefined") {
                user.username = req.body.user.username;
            }
            if (typeof req.body.user.email !== "undefined") {
                user.email = req.body.user.email;
            }
            if (typeof req.body.user.bio !== "undefined") {
                user.bio = req.body.user.bio;
            }
            if (typeof req.body.user.image !== "undefined") {
                user.image = req.body.user.image;
            }
            if (typeof req.body.user.password !== "undefined") {
                user.setPassword(req.body.user.password);
            }

            return user.save().then(function() {
                return res.json({ user: user.toAuthJSON() });
            });
        })
        .catch(next);
});

router.post("/users/login", function(req, res, next) {
    if (!req.body.user.email) {
        return res.status(422).json({ errors: { email: "can't be blank" } });
    }

    if (!req.body.user.password) {
        return res.status(422).json({ errors: { password: "can't be blank" } });
    }
    authenticate("local", { session: false }, function(
        err,
        user,
        info
    ) {
        if (err) {
            return next(err);
        }

        if (user) {
            return res.json({ user: user.toAuthJSON() });
        } else {
            return res.status(422).json(info);
        }
    })(req, res, next);
});

router.post("/users", function(req, res, next) {
    const user = {}

    user.height = req.body.height;
    user.bloodGroup = req.body.bloodGroup;

    User.create(user)
        .then((responseDb) => {
            return res.json({ user: responseDb.userDetails });
        })
        .catch(next);
});

export default router;
