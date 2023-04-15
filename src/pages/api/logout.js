import cookie from "cookie";

export default function handleToken(req, res) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("authToken", "", {
      httpOnly: true,
      secure: true,
      // maxAge: 60 * 60,
      expires: new Date(0),
      path: "/",
    })
  );
  res.status(200).json({ success: true });
}
