import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

 const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

app.post("/booking", async (req, res) => {
  try {

    const fullName = req.body.fullName;
    const phone = req.body.phone;
    const email = req.body.email;
    const serviceType = req.body.serviceType;
    const propertyType = req.body.propertyType;
    const date = req.body.date;
    const time = req.body.time;
    const address = req.body.address;
    const details = req.body.details;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.BUSINESS_USER,
      cc: email,
      subject: `📸 New Booking from ${fullName}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${serviceType}</p>
        <p><strong>Property:</strong> ${propertyType}</p>
        <p><strong>Proposed Date:</strong> ${date}</p>
        <p><strong>Proposed Time:</strong> ${time}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Message:</strong> ${details}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Booking email sent successfully!" });

  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Failed to send booking email" });
  }
});

app.post("/contact", async (req, res) => {
  try {

    const fullName = req.body.fullName;
    const phone = req.body.phone;
    const email = req.body.email;
    const address = req.body.address;
    const message = req.body.message;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.BUSINESS_USER,
      cc: email,
      subject: `📸 New Booking from ${fullName}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Contact email sent successfully!" });

  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Failed to send booking email" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
