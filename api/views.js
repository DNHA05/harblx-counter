import fs from "fs";

const filePath = "/tmp/views.txt";

export default function handler(req, res) {
  let views = 0n;

  // Nếu file tồn tại thì đọc
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    views = BigInt(data);
  }

  views = views + 1n;

  // Lưu lại
  fs.writeFileSync(filePath, views.toString());

  res.status(200).json({
    views: views.toString()
  });
}
