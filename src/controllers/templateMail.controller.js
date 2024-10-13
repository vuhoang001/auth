const { SuccessResponse } = require("../core/success.response");
const TemplateMailService = require("../services/templateMail.service");

class TemplateMailController {
  CreateTemplate = async (req, res, next) => {
    new SuccessResponse({
      message: "Create template success!",
      metadata: await TemplateMailService.Create(req.body),
    }).send(res);
  };

  GetTemplateByCode = async (req, res, next) => {
    new SuccessResponse({
      message: "Get template success!",
      metadata: await TemplateMailService.GetTemplate(req.body),
    }).send(res);
  };
}

module.exports = new TemplateMailController();
