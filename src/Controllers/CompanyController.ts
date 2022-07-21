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
    try {
      const company = await Company.findById(req.params.id);

      return company
        ? res.json({ company: company })
        : res.status(404).json({ msg: 'Company not found' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Server error' });
    }
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
      for (const [key, value] of Object.entries(req.body)) {
        company[key] = value;
      }
      const updatedCompany = await company.save();

      return res.json({ Company: updatedCompany });
    } catch (error) {
      console.log(error);
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
