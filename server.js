const express = require('express');
const cors = require("cors");
require('./db/config');
const Staff = require('./db/Staffs');
const Dog = require('./db/Dogs');
const User = require('./db/Users');
const ChatBox = require('./db/ChatBoxs');
const app = express();

    app.use(express.json());
    app.use(cors());

    app.post("/register", async (req, resp) => {
        let staff = new Staff(req.body);
        let result = await staff.save();
        result = result.toObject();
        delete result.password
        resp.send(result);
    });

    app.post("/register2", async (req, resp) => {
        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password
        resp.send(result);
    });

    app.post("/stafflogin", async (req, resp) => {
        console.log(req.body)
        if (req.body.password && req.body.username) {
            let staff = await Staff.findOne(req.body).select("-password");
            if (staff) {
                resp.send(staff)
            } else {
                resp.send({ result: 'No Staff Found' })
            }
        }


    });

    app.post("/userlogin", async (req, resp) => {
        console.log(req.body)
        if (req.body.password && req.body.username) {
            let user = await User.findOne(req.body).select("-password");
            if (user) {
                resp.send(user)
            } else {
                resp.send({ result: 'No Staff Found' })
            }
        }


    });

    app.post("/add-dog",async (req, resp) => {
        let dog = new Dog(req.body);
        let result = await dog.save();
        resp.send(result)
    });

    app.post("/add-chatbox",async (req, resp) => {
        let chatbox = new ChatBox(req.body);
        let result = await chatbox.save();
        resp.send(result)
    });

    app.get("/dogs", async (req, resp) => {
        let dogs = await Dog.find();
        if (dogs.length > 0) {
            resp.send(dogs)
        } else {
            resp.send({ result: "No dogs found" })
        }

    });

    app.delete("/dogs/:id", async (req, resp) => {
        let result = await Dog.deleteOne({ _id: req.params.id });
        resp.send(result);
    });

    app.get("/dogs/:id", async (req, resp) => {
        let result = await Dog.findOne({ _id: req.params.id });
        if (result) {
            resp.send(result);
        } else {
            resp.send({ result: "No Record found" })
        }

    });

    app.get("/messages", async (req, resp) => {
        let chatboxs = await ChatBox.find();
        if (chatboxs.length > 0) {
            resp.send(chatboxs)
        } else {
            resp.send({ result: "No messages found" })
        }

    });

    app.delete("/messages/:id", async (req, resp) => {
        let result = await ChatBox.deleteOne({ _id: req.params.id });
        resp.send(result);
    });

    app.get("/messages/:id", async (req, resp) => {
        let result = await ChatBox.findOne({ _id: req.params.id });
        if (result) {
            resp.send(result);
        } else {
            resp.send({ result: "No messages found" })
        }

    });

    app.put("/dogs/:id", async (req, resp) => {
        let result = await Dog.updateOne(
            { _id: req.params.id },
            {
                $set: req.body
            }
        )

        resp.send(result);


    });

    app.put("/messages/:id", async (req, resp) => {
        let result = await ChatBox.updateOne(
            { _id: req.params.id },
            {
                $set: req.body
            }
        )

        resp.send(result);


    });

    app.get("/search/:key", async (req, resp) => {
        let result = await Dog.find(
            {
                "$or": [
                    { dog_name: { $regex: req.params.key } },
                    { dog_type: { $regex: req.params.key } },
                    { dog_age: { $regex: req.params.key } },
                    { dog_detail: { $regex: req.params.key } }
                ]
            }
        );

        resp.send(result);


    });

    app.get("/search-message/:key", async (req, resp) => {
        let result = await ChatBox.find(
            {
                "$or": [
                    { user_name: { $regex: req.params.key } },
                    { dog_name: { $regex: req.params.key } },
                    { user_message: { $regex: req.params.key } },
                    { staff_respond: { $regex: req.params.key } }
                ]
            }
        );

        resp.send(result);


    });



    app.listen(5000);
