const got = require("got");
const { GoogleSpreadsheet } = require("google-spreadsheet");

const loadSheet = async (sheetName) => {
  const doc = new GoogleSpreadsheet(
    "14RHr3ooyDssYYHTQ2D2dRBHD0fj_AaWo_iTFsPtMnas"
  );

  console.log(sheetName);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  });

  await doc.loadInfo(); // loads document properties and worksheets

  return doc.sheetsByTitle[sheetName];
};

export const getTodaysSpxChainURL = () => {
  const now = DateTime.local();
  const tosDateString = mockDate ? mockDate : getTOSDateString(now);
  return `https://api.tdameritrade.com/v1/marketdata/chains?apikey=${process.env.TOS_API_KEY}&symbol=$SPX.X&fromDate=${tosDateString}&toDate=${tosDateString}`;
};

const getChain = async () => {
  const sheet = await loadSheet("legs");
  const rows = await sheet.getRows();

  console.log(rows);
};

export default async (req, res) => {
  await getChain();
  return res.json({
    body: req.body,
    query: req.query,
    cookies: req.cookies,
  });
};
