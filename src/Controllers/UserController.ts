import { Request, Response } from 'express';
import User from '../Models/user';

class UserController {
  /**
   * Get all the Users
   */
  static async getUsers(req: Request, res: Response) {
    try {
      const Users = await User.find({})
        .populate('jobs')
        .populate('jobs_applies');

      return res.json({ Users: Users });
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id)
        .populate('jobs')
        .populate('jobs_applies');

      return user
        ? res.json({ User: user })
        : res.status(404).json({ msg: 'User not found' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const newUser = await User.create(req.body);
      return res.json({ newUser: newUser });
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  }

  static async patchUser(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        res.status(404).json({ msg: 'User not found' });
      }

      user.salary = req.body.salary;
      const updatedUser = await user.save();

      return res.json({ User: updatedUser });
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        res.status(404).json({ msg: 'User not found' });
      }

      await user.deleteOne({ _id: user._id });

      return res.json({ msg: 'User deleted' });
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  }
}

export default UserController;
