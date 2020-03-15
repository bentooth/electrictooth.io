const Web3 = require('web3');
const path = require('path');
web3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://mainnet.infura.io/nPETzyZiYQ2axYIVnGx7',
  ),
);

function getTransaction(ethTx) {
  return new Promise(async function(resolve, reject) {
    let TRANSACTION = null;
    try {
      response = await web3.eth.getTransactionReceipt(ethTx);
      TRANSACTION = response;
      resolve(TRANSACTION);
    } catch (error) {
      console.error(err);
      reject(null);
    }
  });
}

async function verifyEthTip(req, res) {
  const txHash = req.query.txHash;

  try {
    let MYTRANSACTION = await getTransaction(txHash);
    return res.json({ transaction: MYTRANSACTION });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
}

function passHTML(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function(
    err,
  ) {
    if (err) {
      res.status(500).send(err);
    }
  });
}

module.exports = {
  getTransaction,
  verifyEthTip,
  passHTML,
};
