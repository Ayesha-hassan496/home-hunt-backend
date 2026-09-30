const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

// Load and initialize the single, real DB connection (uses env vars).
// NOTE: previously server.js also opened a second, unused raw "mysql"
// connection with hardcoded credentials — that was dead code and has
// been removed. All controllers talk to the DB through config/database.js.
require("./config/database");

const app = express();

// =========================
// Create Upload Folder
// =========================
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// =========================
// Middlewares
// =========================
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// Upload Folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =========================
// Routes
// =========================

// Authentication
app.use("/api/auth",
require("./config/routes/authRoutes"));

// Profile
app.use("/api/profile",
require("./config/routes/profileRoutes"));

// Properties
app.use("/api/properties",
require("./config/routes/propertyRoutes"));

// Reviews
app.use("/api/reviews",
require("./config/routes/reviewRoutes"));

// Complaints
app.use("/api/complaints",
require("./config/routes/complaintRoutes"));

// Bookings
app.use("/api/bookings",
require("./config/routes/bookingRoutes"));

// Property Inquiries (Buy / Rent forms)
app.use("/api/inquiries",
require("./config/routes/inquiryRoutes"));

// Notifications
app.use("/api/notifications",
require("./config/routes/notificationRoutes"));

// Payments
app.use("/api/payments",
require("./config/routes/paymentRoutes"));

// ✅ Sell Property
app.use("/api/sell-property",
require("./config/routes/sellPropertyRoutes"));

// Contact Us
app.use("/api/contact",
require("./config/routes/contactRoutes"));

// =========================
// Home Route
// =========================

app.get("/", (req,res)=>{

    res.send("Home Hunt Backend Running");

});
app.use("/api/inquiries", require("./config/routes/inquiryRoutes"));
// =========================
// 404 Route
// =========================

app.use((req,res)=>{

    res.status(404).json({

        success:false,
        message:"Route Not Found"

    });

});

// =========================
// Start Server
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{

    console.log(`🚀 Server Running on http://localhost:${PORT}`);

});