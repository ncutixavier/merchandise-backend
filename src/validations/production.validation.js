import joi from "@hapi/joi";

const productionValidation = async (req, res, next) => {
  const productionSchema = joi.object({
    input: joi.string().required(),
    output: joi.string().required(),
    packed: joi.string().required(),
    style: joi.string().required(),
  });

  const result = await productionSchema.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      message: result.error.details[0].message.replace(/["'`]+/g, ""),
    });
  }
  return next();
};

export default productionValidation;
