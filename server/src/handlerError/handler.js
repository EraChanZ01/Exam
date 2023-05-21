const fs = require("fs")

module.exports = (err, req, res, next) => {
  const logData = {
    message: err.message,
    time: Date.now(),
    code: err.code,
    stackTrace: { error: err.stack }
  };
  fs.appendFile("error.log", JSON.stringify(logData) + '\n',
    (err) => {
      if (err) throw err
    })

  if (err.message ===
    'new row for relation "Banks" violates check constraint "Banks_balance_ck"' ||
    err.message ===
    'new row for relation "Users" violates check constraint "Users_balance_ck"') {
    err.message = 'Not Enough money';
    err.code = 406;
  }
  if (!err.message || !err.code) {
    res.status(500).send('Server Error');
  } else {
    res.status(err.code).send(err.message);
  }
};
