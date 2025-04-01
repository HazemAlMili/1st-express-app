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
      res.status(400).send("Wrong Email or Password");
    }
    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { email, password: hashedPassword };
    users.push(user);
    console.log(users);
    res.status(201).send("User Created Successfully");
  } catch {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//Login User API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = users.find((data) => email == data.email);
    // Check if user exists
    if (!findUser) {
      return res.status(400).send("Wrong Email or Password");
    }
    //Compare Password
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
      return res.status(400).send("Wrong Email or Password");
    } else {
      res.status(200).send("Login Successful");
    }
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
