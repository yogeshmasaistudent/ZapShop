import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../Models/user.model.js";

// Registration
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ msg: "User already exists", success: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const User = new userModel({
      name,
      email,
      password: hashPassword,
    });

    await User.save();
    res
      .status(200)
      .json({ msg: "User registered successfully!", success: true, User });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const User = await userModel.findOne({ email });
    if (!User) {
      return res.status(400).json({ msg: "User Not Found", success: false });
    }

    const validPassword = await bcrypt.compare(password, User.password);
    if (!validPassword) {
      return res.status(400).json({ msg: "Wrong password", success: false });
    }

    const token = jwt.sign(
      { id: User._id, email: User.email },
      "Yogesh",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ msg: `Welcome ${User.name}`, success: true, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Routes
export const user = async(req,res)=>{
    try {
     const users = await userModel.find().sort({ createdAt:-1});
     res.status(200).json(users)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
