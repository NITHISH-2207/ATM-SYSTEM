const Account = require("../models/Account");

const signup = async (req, res) => {
  try {
    const { name, accountNumber, pin } = req.body;

    const existingUser = await Account.findOne({
      accountNumber,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Account already exists",
      });
    }

    const account = await Account.create({
      name,
      accountNumber,
      pin,
      balance: 0,
    });

    res.status(201).json({
      message: "Account created successfully",
      account,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { accountNumber, pin } = req.body;

    const account = await Account.findOne({
      accountNumber,
      pin,
    });

    if (!account) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    res.json(account);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const checkBalance = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const account = await Account.findOne({
      accountNumber,
    });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    res.json({
      balance: account.balance,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deposit = async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;

    const account = await Account.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    account.balance += Number(amount);

    await account.save();

    res.json({
      message: "Deposit successful",
      balance: account.balance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const withdraw = async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;

    const account = await Account.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    if (account.balance < amount) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    account.balance -= Number(amount);

    await account.save();

    res.json({
      message: "Withdrawal successful",
      balance: account.balance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
  checkBalance,
  deposit,
  withdraw,
};