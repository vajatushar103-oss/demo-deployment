import {Enquiry} from '../models/Enquiry.js';

export async function createEnquiry(req, res, next) {
  try {
    const { name, company, phone, email, machine, message } = req.body;
    if (!name || !phone || !email || !message) {
      return res.status(400).json({ message: 'Name, phone, email and message are required.' });
    }
    const enquiry = await Enquiry.create({ name, company, phone, email, machine, message });
    res.status(201).json({ message: 'Enquiry submitted successfully', enquiry });
  } catch (error) { next(error); }
}

export async function getEnquiries(req, res, next) {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();
    res.json({ enquiries });
  } catch (error) { next(error); }
}
