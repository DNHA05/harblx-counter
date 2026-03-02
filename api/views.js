let views = 0;

export default function handler(req, res) {
  views += 1;

  res.status(200).json({
    views: views
  });
}
