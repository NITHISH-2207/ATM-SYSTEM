const Account = require("../models/Account");

const getBalance = async (accountNumber) => {
  return await Account.findOne({ accountNumber });
};

module.exports = {
  getBalance
};