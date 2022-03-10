import Production from "../models/Production";

export const checkProductionExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productionExist = await Production.findById(id);
    if (!productionExist) {
      return res.status(404).json({
        message: "Production not found",
      });
    }
    req.production = productionExist;
    return next();
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: "Failed to check production",
    });
  }
};
