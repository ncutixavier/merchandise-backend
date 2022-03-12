import Style from "../models/Style";

export default class StyleController {
  async createStyle(req, res) {
    try {
      const style = await Style.create({
        purchaseOrder: req.purchaseOrder._id,
        image: req.image,
      });
      return res.status(201).json({
        data: style,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "Failed to create style",
      });
    }
  }

  async getStyles(req, res) {
    try {
      const styles = await Style.find({
        purchaseOrder: req.purchaseOrder._id,
      })
        .populate({
          path: "purchaseOrder",
          populate: {
            path: "order",
          },
        })
        .exec();
      return res.status(200).json({
        data: styles,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "Failed to get styles",
      });
    }
  }

  async getStyle(req, res) {
    try {
      const { styleId } = req.params;
      const style = await Style.findById(styleId).populate({
        path: "purchaseOrder",
        populate: {
          path: "order",
        },
      });
      if (!style) {
        return res.status(404).json({
          message: "Style not found",
        });
      }
      return res.status(200).json({
        data: style,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "Failed to get style",
      });
    }
  }

  async deleteStyle(req, res) {
    try {
      const { styleId } = req.params;
      const style = await Style.findByIdAndDelete(styleId);
      if (!style) {
        return res.status(404).json({
          message: "Style not found",
        });
      }
      return res.status(200).json({
        message: "Style deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "Failed to delete style",
      });
    }
  }
}
