import Sample from "../models/Sample";

export default class SampleController {
  async getAllSamples(req, res) {
    try {
      const samples = await Sample.find({});
      return res.status(200).json({
        success: true,
        message: "All samples fetched successfully",
        samples,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch all samples",
        error,
      });
    }
  }

  async getSampleById(req, res) {
    try {
      const sample = await Sample.findById(req.params.id);
      if (!sample) {
        return res.status(404).json({
          success: false,
          message: "Sample not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Sample fetched successfully",
        sample,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch sample",
        error,
      });
    }
  }

  async createSample(req, res) {
    try {
      const sample = await Sample.create({
        image: req.image,
        style_no: req.body.style_no,
        status: req.body.status,
      });
      return res.status(201).json({
        success: true,
        message: "Sample created successfully",
        sample,
      });
      
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create sample",
        error: error.message,
      });
    }
  }

  async updateSample(req, res) {
    try {
      const sample = await Sample.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!sample) {
        return res.status(404).json({
          success: false,
          message: "Sample not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Sample updated successfully",
        sample,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update sample",
        error,
      });
    }
  }

  async deleteSample(req, res) {
    try {
      const sample = await Sample.findByIdAndDelete(req.params.id);
      if (!sample) {
        return res.status(404).json({
          success: false,
          message: "Sample not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Sample deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete sample",
        error,
      });
    }
  }
}
