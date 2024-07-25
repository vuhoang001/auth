const AccountModel = require("../account.model");

const getAccountById = async (id) => {
  return await AccountModel.findOne({
    _id: id,
  });
};

const getAccountByEmail = async (email) => {
  return await AccountModel.findOne({
    email,
  });
};

module.exports = {
  getAccountById,
  getAccountByEmail,
};
