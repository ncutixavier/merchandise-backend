import Production from "../models/Production";

export default class ProductionController {
  async getAllProduction(req, res) {
    try {
      const productions = await Production.find({}).populate("order");
      return res.status(200).json({
        data: productions,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "Failed to get all productions",
      });
    }
  }

  async getOneProduction(req, res) {
    try {
      const production = await Production.findById(req.params.id).populate(
        "order"
      );
      if (!production) {
        return res.status(404).json({
          message: "Production not found",
        });
      }
      return res.status(200).json({
        data: production,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "Failed to get production",
      });
    }
  }

  async createProduction(req, res) {
    try {
      const production = await Production.create(req.body);
      return res.status(201).json({
        data: production,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "Failed to create production",
      });
    }
  }

  async updateProduction(req, res) {
    try {
      const production = await Production.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!production) {
        return res.status(404).json({
          message: "Production not found",
        });
      }
      return res.status(200).json({
        data: production,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "Failed to update production",
      });
    }
  }

  async deleteProduction(req, res) {
    try {
      const production = await Production.findByIdAndDelete(req.params.id);
      if (!production) {
        return res.status(404).json({
          message: "Production not found",
        });
      }
      return res.status(200).json({
        message: "Production deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
          error: error.message,
          message: "Failed to delete production",
      });
    }
  }
}
