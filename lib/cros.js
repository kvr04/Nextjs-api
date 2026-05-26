export function cors(req, res) {

  const allowedOrigins = [
    "http://localhost:5173",
  ];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS,PUT,DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  // preflight request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return true;
  }

  return false;
}