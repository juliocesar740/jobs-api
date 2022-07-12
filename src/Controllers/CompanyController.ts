import { Request, Response } from 'express';
import Company from '../Models/company';

class CompanyController {
  static async getCompanies(req: Request, res: Response) {
    try {
      const companies = await Company.find({});
      return res.json({ companies: companies });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  }

  static async getCompany(req: Request, res: Response) {
    return res.json({
      company: req.model
    });
  }

  static async createCompany(req: Request, res: Response) {
    try {
      const newCompany = await Company.create({ ...req.body });
      return res.status(201).json({ newCompany: newCompany });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  }

  static async patchCompany(req: Request, res: Response) {
    try {
      const company = await Company.findById(req.params.id);
      if (!company) {
        return res.status(404).json({ msg: 'Company not found' });
      }

      company.location = req.body.location;
      const updatedCompany = await company.save();

      return res.json({ Company: updatedCompany });
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  }

  static async deleteCompany(req: Request, res: Response) {
    try {
      const company = await Company.findById(req.params.id);

      if (!company) {
        res.status(404).json({ msg: 'company not found' });
      }

      await company.deleteOne({ _id: company._id });

      return res.json({ msg: 'company deleted' });
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  }
}

export default CompanyController;
