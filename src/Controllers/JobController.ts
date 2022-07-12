import { Request, Response } from 'express';
import Job from '../Models/job';

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
      const job = await Job.findById(req.params.id).populate('company');

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
      return res.status(500).json({ msg: 'Server error' });
    }
  }

  static async patchJob(req: Request, res: Response) {
    try {
      const job = await Job.findById(req.params.id);

      if (!job) {
        res.status(404).json({ msg: 'Job not found' });
      }

      job.salary = req.body.salary;
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
}

export default JobController;
