const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const Admin = require("./Models/Admin");
const User = require("./Models/User");
const Skill = require("./Models/Skill");
const Certificate = require("./Models/Certification");
const Project = require("./Models/Project");

const app = express();

// middleware setup123
app.use(express.urlencoded({extended : true}));
app.use("/api" , express.json());
app.use(cors());
//app.use(bodyParser.json());

const withAuth = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  if (token.startsWith("Bearer ")) {
    // Check if it's a Bearer token
    // Remove 'Bearer ' to get the actual token
    token = token.slice(7, token.length);
  }

  jwt.verify(token, "MY_SECRET_KEY", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    } else {
      req.userId = decoded.userId;
      next();
    }
  });
};

mongoose
  .connect("mongodb+srv://saketsingh:1234@cluster0.u3i9j.mongodb.net/")
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log(error));

// Route for creating an admin
app.post("/api/admin", async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(200).send(admin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route for creating an user
app.post("/api/user", async (req, res) => {
  
  try {
    
    console.log(req)
    console.log(req.body)
    const user = await User.create(req.body);
    console.log(user)
    
    res.status(200).send(user);
  } catch (err) {
    
    res.status(400).json({ error: err.message });
  }
});

//for making an approver
app.put("/api/user/:userName/:forName/approve", async (req, res) => {
  const userName = req.params.userName;
  const forName = req.params.forName;

  try {
    // Find the user by name
    const user = await User.findOne({ name: userName });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the isApprover field to true
    user.isApprover = true;
    user.madeApproverFor = forName;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "User approved successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//for removing an approver

app.put("/api/user/:userName/disapprove", async (req, res) => {
  const userName = req.params.userName;

  try {
    // Find the user by name
    const user = await User.findOne({ name: userName });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the isApprover field to true
    user.isApprover = false;
    user.madeApproverFor = null;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "User dis-approved successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//for creating a skill
app.post("/api/skills", async (req, res) => {
  try {
    // Extracting data from the request body
    const { userId, skillName, proficiency } = req.body;

    // Creating a new skill document directly using create()
    const skill = await Skill.create({
      userId,
      skillName,
      proficiency
    });

    console.log(skill)

    // Sending the newly created skill as a response
    res.status(201).json(skill);
  } catch (error) {
    // Handling errors
    res.status(400).json({ error: error.message });
  }
});

//for adding a cetificate
app.post("/api/certificates", async (req, res) => {
  try {
    // Extracting data from the request body
    const { userId, certificateName, organization } = req.body;

    // Creating a new certificate document directly using create()
    const certificate = await Certificate.create({
      userId,
      certificateName,
      organization
    });

    // Sending the newly created certificate as a response
    res.status(201).json(certificate);
  } catch (error) {
    // Handling errors
    res.status(400).json({ error: error.message });
  }
});

//for adding project experience
app.post("/api/project-experiences", async (req, res) => {
  try {
    // Extracting data from the request body
    const { userId, projectName, description, startDate, endDate, totalHoursWorked, techUsed, performance } = req.body;

    // Creating a new project experience document directly using create()
    const projectExperience = await Project.create({
      userId,
      projectName,
      description,
      startDate,
      endDate,
      totalHoursWorked,
      techUsed,
      performance
    });

    // Sending the newly created project experience as a response
    res.status(201).json(projectExperience);
  } catch (error) {
    // Handling errors
    res.status(400).json({ error: error.message });
  }
});

// Send email
const transporter = nodemailer.createTransport(
  smtpTransport({
    host: "smtp.gmail.com",
    port: 587,
    service: "gmail",
    auth: {
      user: "saketsingh.sjv@gmail.com", // sender email id
      pass: "tslb gvne nope rpwc", // third party app pass word generated from google
    },
  })
);

// Endpoint to retrieve user by email
app.get('/user/:email', async (req, res) => {
  try {
      console.log("hihihi");
      const email = req.params.email;
      console.log(email)
      const user = await User.findOne({ email });
      console.log(user);
      res.json(user);
  } catch (error) {
      //console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

//for getting certificate bsed on userId

app.get('/certificates/:userId', async (req, res) => {
  try {
    console.log("Finding certificates for user...");
    const userId = req.params.userId;
    console.log("User ID:", userId);
    const certificates = await Certificate.find({ userId });
    console.log("Certificates:", certificates);
    res.json(certificates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// for getting project experience based on userId

app.get('/projects/:userId', async (req, res) => {
  try {
    console.log("Finding projects for user...");
    const userId = req.params.userId;
    console.log("User ID:", userId);
    const projects = await Project.find({ userId });
    console.log("Projects:", projects);
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Route for admin sending email intimation to the user
app.post("/api/send-email", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Generate default password
    const defaultPassword = password;
    const token = crypto.randomBytes(20).toString("hex");
    
    const user = await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 3600000, // Token expires in 1 hour (3600000 milliseconds)
        },
      }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const link = `http://localhost:3000/reset-password/${token}`
    const mailOptions = {
      from: "saketsingh.sjv@gmail.com", // Enter your email
      to: email,
      subject: "Reset Your Password",
      text: `Here is your default password: ${defaultPassword}. Click the following link to reset your password: ${link}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Email sent successfully from backend" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to send email from backend" });
  }
});

// Route for updating the user's password
app.post("/api/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Invalid or expired token" });
    }

    user.password = newPassword;
    user.isPasswordSet = true;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password updated Successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ error: "Failed to update password" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // First, try to find the user
  let foundUser = await User.findOne({ email: email });
  let isUser = true;

  // If not found as a user, try finding as an admin
  if (!foundUser) {
    foundUser = await Admin.findOne({ email: email });
    isUser = false;
  }

  // If no record is found in both collections
  if (!foundUser) {
    return res.status(401).json({ error: "No user found with this email." });
  }

  // Check password (PLAIN TEXT - Not recommended)
  if (foundUser.password !== password) {
    return res.status(401).json({ error: "Incorrect password." });
  }

  // Generate token assuming use of JWT
  const token = jwt.sign(
    {
      userId: foundUser._id,
      userType: isUser ? "user" : "admin",
    },
    "MY_SECRET_KEY",
    { expiresIn: "8760h" }
  );

  res.json({
    message: "Logged in successfully",
    token,
    userType: isUser ? "user" : "admin",
  });
});

// Route to fetch user-details
app.get("/user-details", withAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "-password -resetPasswordToken -resetPasswordExpires"
    );
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
