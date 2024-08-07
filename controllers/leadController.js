const Lead = require('../models/lead');

// Get leads with pagination
exports.getLeads = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const leads = await Lead.find().skip(skip).limit(parseInt(limit));
    const totalLeads = await Lead.countDocuments();
    const totalPages = Math.ceil(totalLeads / limit);

    res.status(200).json({
      page: parseInt(page),
      totalPages,
      totalLeads,
      leads,
    });
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add a new lead
exports.addLead = async (req, res) => {
  const { name, email, number, product } = req.body;

  try {
    const newLead = new Lead({ name, email, number, product });
    await newLead.save();
    res.status(201).json({ message: 'Lead created successfully', lead: newLead });
  } catch (error) {
    console.error('Add lead error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Edit an existing lead
exports.editLead = async (req, res) => {
  const { id } = req.params;
  const { name, email, number, product } = req.body;

  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { name, email, number, product },
      { new: true, runValidators: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.status(200).json({ message: 'Lead updated successfully', lead: updatedLead });
  } catch (error) {
    console.error('Edit lead error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete an existing lead
exports.deleteLead = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLead = await Lead.findByIdAndDelete(id);

    if (!deletedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Delete lead error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};