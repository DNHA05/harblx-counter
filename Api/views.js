let views = 0;

export default function handler(req, res) {
  if (req.method === "GET") {
    views++;
    res.status(200).json({ views });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
