// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cookie from "cookie";

export default function handleToken(req, res) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("authToken", req.body, {
      httpOnly: true,
      secure: true,
      // maxAge: 60 * 60,¨
      path: "/",
    })
  );
  res.status(200).json({ success: true });
}
