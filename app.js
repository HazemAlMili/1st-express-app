import express from "express";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

// تعريف __dirname في بيئة ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// تخزين المستخدمين في الذاكرة
const users = [];

app.use(express.json());
app.use(express.static("public"));

// راوت لعرض الصفحة الرئيسية
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// واجهة تسجيل المستخدم
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = users.find((data) => data.email === email);
    if (findUser) {
      return res.status(400).send("Wrong Email or Password");
    }
    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { email, password: hashedPassword };
    users.push(user);
    console.log(users);
    res.status(201).send("User Created Successfully");
  } catch {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// واجهة تسجيل الدخول (اختياري)
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = users.find((data) => data.email === email);
    if (!findUser) {
      return res.status(400).send("Wrong Email or Password");
    }
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
