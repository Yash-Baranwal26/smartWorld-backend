const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersSchema = require('./usersSchema');

const app = express();
const PORT = 1234;
const MONGODB_URI = 'mongodb+srv://yashbaranwal121:yash2612@cluster0.c49ls.mongodb.net/smartWorld?retryWrites=true&w=majority&appName=Cluster0';

app.use(express.json());
app.use(cors());

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log("DB Connected");
})
.catch(err => {
    console.log(err);
});

app.post("/userEnquiry", async (req, res) => {
    try {
        const { name, mobile, description } = req.body;

        // Check if the mobile number is already registered
        let check = await usersSchema.findOne({ mobile: mobile });
        if (!check) {

            // Create a new user enquiry
            let send = await usersSchema.create({
                name,
                mobile,
                description
            });

            if (send) {
                res.status(200).json({ msg: "Your query is registered. We will contact you soon." });
            } else {
                res.status(400).json({ error: "Invalid arguments" });
            }
        } else {
            res.status(400).json({ error: "This number is already registered" });
        }
    } catch (err) {
        console.error('Error in /userEnquiry:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/fetchDetail', async (req, res) => {
    try {
        let data = await usersSchema.find();
        res.send(data);
    } catch (err) {
        res.status(500).json({ 'err': "Internal Server Error" });
    }
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
