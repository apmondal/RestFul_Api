const Student = require("./models/students");
require("./db/conn");
const router = require("./routers/exp");
const express = require("express");
const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(router);

app.post("/students", (req, res) => {
    const user = new Student(req.body);
    console.log(user);
    user.save()
    .then(() => res.status(201).send(user))
    .catch((err) => res.status(400).send(err));
});


app.get("/students", async (req, res) => {
    try {
        const result = await Student.find();
        res.send(result);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

app.get("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id);

        if(!studentData) return res.status(404).send();
        else res.send(studentData);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.patch("/students/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = await Student.findByIdAndUpdate(id, req.body, {new: true});

        res.send(updateData);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.delete("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteData = await Student.findByIdAndDelete(_id);

        if(!_id) return res.status(400).send();
        
        res.send(deleteData);

    } catch (err) {
        res.status(500).send(err);
    }
})

app.listen(port, () => {
    console.log("Listening to port no " + port + "...");
});