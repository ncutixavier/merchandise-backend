import joi from "@hapi/joi";

const orderValidation = async (req, res, next) => { 
    const orderSchema = joi.object({
        buyer: joi.string().required(),
        quantity: joi.string().required(),
        colors: joi.array().required(),
    });
    
    const result = await orderSchema.validate(req.body);
    if (result.error) {
        return res.status(400).json({
        message: result.error.details[0].message.replace(/["'`]+/g, ""),
        });
    }
    return next();
}

export default orderValidation;
