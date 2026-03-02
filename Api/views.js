export default function handler(req, res) {
  res.status(200).json({
    views: Math.floor(Math.random() * 1000)
  });
}
