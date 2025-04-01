import express from "express";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
//Store in memory
const users = [];

app.use(express.json());
//Register User API
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = users.find((data) => email == data.email);
    if (findUser) {
      res.status(400).send("You Are Already Access");
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
