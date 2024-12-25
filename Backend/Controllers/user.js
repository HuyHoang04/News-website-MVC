import { User } from "../Models/user.js";
import bcrypt from "bcryptjs";
export const userController = {
  // CREATE a new user
  createUser: async (userData) => {
    try {
      // Encrypt the password
      const hashedPassword = await bcrypt.hash(userData.password, 10); // 10 is the saltRounds

      // Create a new user object with the hashed password
      const user = new User({
        ...userData,
        password: hashedPassword, // Replace the plain password with the hashed one
      });

      // Save the user to the database
      return await user.save();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  

  // READ a single user by ID
  getUserById: async (id) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // UPDATE a user by ID
  updateUser: async (id, updateData) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!updatedUser) {
        throw new Error("User not found");
      }
      return updatedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // DELETE a user by ID
  deleteUser: async (id) => {
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        throw new Error("User not found");
      }
      return { message: "User deleted successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default userController;
