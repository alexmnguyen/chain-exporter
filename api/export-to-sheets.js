const got = require('got')

export default async (req, res) => {
  return res.json({
    body: req.body,
    query: req.query,
    cookies: req.cookies,
  });
}