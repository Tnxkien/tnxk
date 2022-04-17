const JWT = require("jsonwebtoken");

const verifyAccessToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.status(303).send({
      message: "Unauthorization",
    });
  }
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];

  JWT.verify(token, "#$#@#dsds", (err, payload) => {
    if (err) {
      return res.status(303).send({
        message: "Unauthorization",
      });
    }
    req.payload = payload;
    next();
  });
};
module.exports = {
  verifyAccessToken,
};
