const express = require("express");
const router = express.Router();
const User = require("../../models/UsersModel.js");

router
  .route("/")

  // RENDER USER
  .get((req, res) => {
    return new req.database.User()
      .fetchAll()
      .then(users => {
        return res.json(users);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  })

  // CREATE USER
  .post((req, res) => {
    const body = req.body;

    new req.database.User({});
    return new req.database.User({
      body
    })
      .save()
      .then(user => {
        return res.json({ success: true });
      })
      .catch(err => {
        res.sendStatus(500);
      });
  });

// EDIT USER
router.post("/:id", (req, res) => {
  const body = req.body;
  const paramsId = req.params.id;
  console.log(body);
  User.where({
    id: paramsId
  })
    .fetch()
    .then(user => {
      new User({
        id: paramsId
      })
        .save(
          {
            // username: body.username,
            // password: body.password,
            // email: body.email,
            // first_name: body.first_name,
            // last_name: body.last_name,
            profileblurb: body.profileblurb,
            avatarurl: body.avatarurl,
            contactlinks: body.contactlinks
            // updated_at: new Date()
          },
          {
            patch: true
          }
        )
        .then(() => {
          return res.redirect("/");
        });
    });
});

// DELETE USER
router.delete("/:id", (req, res) => {
  const paramsId = req.params.id;

  User.where({
    id: paramsId
  })
    .fetch()
    .then(user => {
      new User({
        id: paramsId
      })
        .destroy()
        .then(() => {
          return res.redirect("/");
        });
    });
});

// GET SPECIFIC USER
router.get("/:id", (req, res) => {
  const paramsID = req.params.id;
  User.where({
    id: paramsID
  })
    .fetch()
    .then(user => {
      return res.json(user);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
