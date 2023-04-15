import cookie from "cookie";

export default async function token(req, res) {
  const header = cookie.parse(req.headers.cookie);

  res.status(200).json(header.authToken);
}
