const axios = require('axios');
const PAYBEAR_SECRET = 'sec84f58b9652888a481b52beb3e59cc5ac'

function getCurrencies() {
    return new Promise(
        async function (resolve, reject) {

            let CURRENCIES = null;
            let URL = `https://api.paybear.io/v2/currencies?token=${PAYBEAR_SECRET}`;

            try {
                response = await axios.get(URL);
                CURRENCIES = response.data;
                resolve(CURRENCIES);
            } catch (error) {
                console.error(err);
                reject(null);
            }

        }
    )
}

function getRates(crypto) {
    return new Promise(
        async function (resolve, reject) {

            let RATES = null;
            let URL = `https://api.paybear.io/v2/exchange/usd/rate`;

            try {
                response = await axios.get(URL);
                RATES = response.data;
                resolve(RATES);
            } catch (error) {
                console.error(err);
                reject(null);
            }

        }
    )
}


function getRate(currencyCode) {
    return new Promise(
        async function (resolve, reject) {

            let RATE = null;
            let URL = `https://api.paybear.io/v2/${currencyCode}/exchange/usd/rate`;

            try {
                response = await axios.get(URL);
                RATE = response.data;
                resolve(RATE);
            } catch (error) {
                console.error(err);
                reject(null);
            }
        }
    )
}


async function getEnabledCurrencies(req, res) {
    try {
        let CURRENCIES = await getCurrencies();
        return res.json(CURRENCIES);
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

async function getRates(req, res) {
    try {
        let RATES = await getRates();
        return res.json(RATES);
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

//Get ETH rate
async function getETHRate(req, res) {
    try {
        let ETH_RATE = await getRate('eth');
        return res.json(ETH_RATE);
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}

module.exports = {
    getEnabledCurrencies,
    getRates,
    getETHRate,
} 