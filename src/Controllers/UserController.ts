import { Request, Response } from 'express';
import User from '../Models/user';
import Job from '../Models/job';

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

  static async patchUser(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        res.status(404).json({ msg: 'User not found' });
      }
      for (const [key, value] of Object.entries(req.body)) {
        user[key] = value;
      }

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

      res.clearCookie('token');
      res.clearCookie('role');

      await user.deleteOne({ _id: user._id });

      return res.json({ msg: 'User deleted' });
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  }

  static async applyToJob(action = 'apply', req: Request, res: Response) {
    try {
      const job = await Job.findById(req.params.job_id);
      const user = await User.findById(req.params.user_id);

      if (!job || !user) {
        const model = job === null ? 'Job' : 'User';
        return res.status(404).json({ msg: `${model} not found` });
      }

      const findUser = job.users_pending.find(
        (userPending: typeof user) => user.id === userPending.id
      );

      if (!findUser) {
        return res.status(400).json({ msg: `This job is already listed` });
      }

      switch (action) {
        case 'apply':
          job.user_pending.push(user.id);
          await job.save();

          user.jobs_applies.push(job.id);
          await user.save();

          return res.status(200).json({ msg: 'Job applied by the user' });
          break;
        case 'delete':
          job.user_pending = job.user_pending.filter(
            (userPending: typeof user) => userPending.id != user.id
          );
          await job.save();

          user.jobs_applies = user.jobs_applies.filter(
            (jobApply: typeof job) => jobApply.id != user.id
          );
          await user.save();

          return res.status(200).json({ msg: 'Job removed by the user' });
          break;
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
}

export default UserController;
