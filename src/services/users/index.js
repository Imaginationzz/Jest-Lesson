const router = require("express").Router()
const UserSchema = require("./schema")
const UserModel = require("mongoose").model("User", UserSchema)
const { authenticate } = require("../auth");
const { authorize } = require("../auth/middleware");

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) throw new Error("Provide credentials")

        const user = new UserModel({ username, password })
        const { _id } = await user.save()

        res.status(201).send({ _id })

    } catch (error) {
        res.status(400).send({
            message: error.message,
            errorCode: 'wrong_credentials'
        })
    }
})

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) throw new Error("Provide credentials")

        const user = await UserModel.findOne({ username })

        const accessToken = await authenticate(user);
        console.log(accessToken);
    res.send({ accessToken });

    } catch (error) {
        res.status(400).send({
            message: error.message,
            errorCode: 'wrong_credentials'
        })
    }
})
router.get("/cats", authorize, async (req, res, next) => {
    try {
      
      const url = response.body.url
      res.send(users)
    } catch (error) {
      next(error)
    }
  })


module.exports = router