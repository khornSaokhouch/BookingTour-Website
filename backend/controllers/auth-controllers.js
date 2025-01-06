import { User } from "../model/user.js";
import bcrypt from "bcryptjs";
import { generateJWTToken } from "../utils/generateJWTToken.js";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../resend/email.js";
import crypto from "crypto";
import { createCanvas } from "canvas";
import path from "path";
import fs from "fs";

// Signup function
// Signup function
export const signup = async (req, res) => {
  const {
    name,
    email,
    password,
    status: requestedStatus,  // Renamed to avoid conflict
    role: requestedRole,
  } = req.body;

  // Define allowed roles and default to 'user'
  const allowedRoles = ["user", "admin", "subadmin"];
  const allowedStatuses = ["pending", "approved", "rejected"];  // Renamed constant

  const role = allowedRoles.includes(requestedRole) ? requestedRole : "user";
  const status = allowedStatuses.includes(requestedStatus) ? requestedStatus : "pending";  // Default status to 'pending'

  try {
    // Validate required fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if user already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = generateVerificationToken();

    // Generate profile image
    const profileImagePath = generateProfileImage(name);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      status,  // Added the status field to the user object
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // Expires in 24 hours
      image: profileImagePath, // Save the profile image path
    });

    await user.save();

    // Generate JWT token and send verification email
    generateJWTToken(res, user._id, user.role);
    await sendVerificationEmail(user.email, verificationToken);

    // Send response
    res.status(201).json({
      success: true,
      message: "User created successfully. Please verify your email.",
      user: {
        ...user._doc,
        password: undefined, // Exclude password from the response
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};


// Function to generate profile image
const generateProfileImage = (name) => {
  const initials = name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("")
    .slice(0, 2); // Limit to 2 letters

  const hash = crypto.createHash("md5").update(name).digest("hex");
  const bgColor = `#${hash.slice(0, 6)}`;
  const textColor = `#${hash.slice(6, 12)}`;

  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext("2d");

  // Draw background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 200, 200);

  // Draw initials
  ctx.fillStyle = textColor;
  ctx.font = "bold 100px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(initials, 100, 100);

  // Save the image to a file
  const imagePath = path.join("uploads", `${Date.now()}-${name}.png`);
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(imagePath, buffer);

  return imagePath; // Return the file path
};

// Login function
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }

    // Generate profile image if not already present
    if (!user.image) {
      user.image = generateProfileImage(user.name);
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: `${process.env.API_URL}${path.basename(user.image)}`,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// getprofile function
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId); // Adjust the query as needed
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid credentials" });
//     }

//     // Validate password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid credentials" });
//     }

//     // Check if email is verified
//     if (!user.isVerified) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Email not verified" });
//     }

//     // Generate JWT token
//     const token = generateJWTToken(res, user._id, user.role);

//     // Send response including the user object
//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         image: user.image, // Include the image path in the response
//       },
//       token, // Optional: return the JWT if needed on the frontend
//     });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error. Please try again." });
//   }
// };

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.log("error verifying email", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const resetPasswordToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpiresAt = resetPasswordExpiresAt;

    await user.save();
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully!",
    });
  } catch (error) {
    console.log("error sending password reset email", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    console.log(token);
    console.log(password);
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log("error resetting password", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, user: { ...user._doc, password: undefined } });
  } catch (error) {
    console.log("error checking auth", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getUsersByRole = async (req, res) => {
  const { role } = req.query; // Get role from query parameters
  try {
    const query = role ? { role } : {}; // If role exists, filter by it
    const users = await User.find(query).select("-password"); // Exclude password
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
// Edit user details
export const editUser = async (req, res) => {
  const { userId } = req.params;  // Get the userId from URL parameters
  const { name, email, status, role } = req.body;  // Get data from request body

  try {
    // Validate incoming data (you can add more checks here if needed)
    if (!name || !email || !role || !status) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, role, status) are required",
      });
    }

    // Find the user by ID and update their data
    const user = await User.findByIdAndUpdate(
      userId,  // Use the userId from params
      { name, email, status, role },  // Fields to update
      { new: true }  // Return the updated user document
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Send response with the updated user data
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: { ...user._doc, password: undefined },  // Exclude password
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};
// Delete user
export const deleteUser = async (req, res) => {
  const { userId } = req.params;  // Get the userId from URL parameters

  try {
    // Find and delete the user by ID
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Send response confirming deletion
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};
