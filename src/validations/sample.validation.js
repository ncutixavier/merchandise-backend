import joi from "@hapi/joi";

const sampleValidation = async (req, res, next) => {
  const sampleSchema = joi.object({
    style_no: joi.string().required(),
    image: joi.any().meta({ swaggerType: "file" }).required(),
  });

  const result = await sampleSchema.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      message: result.error.details[0].message.replace(/["'`]+/g, ""),
    });
  }
  return next();
};

export default sampleValidation;
