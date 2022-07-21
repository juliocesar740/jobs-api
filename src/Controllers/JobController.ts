import { Request, Response } from 'express';
import Job from '../Models/job';
import User from '../Models/user';

class JobController {
  /**
   * Get all the jobs
   */
  static async getJobs(req: Request, res: Response) {
    try {
      const jobs = await Job.find({}).populate('company');
      return res.json({ jobs: jobs });
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  }

  static async getJob(req: Request, res: Response) {
    try {
      const job = await Job.findById(req.params.job_id).populate('company');

      return job
        ? res.json({ job: job })
        : res.status(404).json({ msg: 'Job not found' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  }

  static async createJob(req: Request, res: Response) {
    try {
      const newJob = await Job.create(req.body);
      return res.json({ newJob: newJob });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  }

  static async patchJob(req: Request, res: Response) {
    try {
      const job = await Job.findById(req.params.job_id);

      if (!job) {
        res.status(404).json({ msg: 'Job not found' });
      }

      for (const [key, value] of Object.entries(req.body)) {
        job[key] = value;
      }
      const updatedJob = await job.save();

      return res.json({ job: updatedJob });
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  }

  static async deleteJob(req: Request, res: Response) {
    try {
      const job = await Job.findById(req.params.id);

      if (!job) {
        res.status(404).json({ msg: 'Job not found' });
      }

      await Job.deleteOne({ _id: job._id });

      return res.json({ msg: 'Job deleted' });
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  }

  static async selectUser(req: Request, res: Response) {
    try {
      const job = await Job.findById(req.params.job_id).populate(
        'users_pending'
      );
      const user = await User.findById(req.params.user_id);

      if (!job || !user) {
        const model = job === null ? 'Job' : 'User';
        return res.status(404).json({ msg: `${model} not found` });
      }

      const findUser = job.users_pending.find(
        (userPending: typeof user) => user.id === userPending.id
      );

      if (!findUser) {
        return res.status(400).json({ msg: 'There is not this user' });
      }

      job.user_selected = user.id;
      await job.save();

      user.jobs.push(job.id);
      await user.save();

      return res.status(200).json({ msg: 'User selected for the job' });
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  }
}

export default JobController;
