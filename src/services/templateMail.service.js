const { BadRequestError } = require("../core/error.response");
const templateMail = require("../models/templateMail.model");

class TemplateMailService {
  Create = async (payload) => {
    const createMail = await templateMail.create(payload);
    if (!createMail)
      throw new BadRequestError("Something went wrong cant create template");
    return 1;
  };

  GetTemplate = async (payload) => {
    const { objectCode } = payload;
    const template = await templateMail.findOne({ objectCode: objectCode });
    if (!template)
      throw new BadRequestError("Something went wrong cant get template");
    return template;
  };
}

module.exports = new TemplateMailService();
