
// server.js

// 1. Import các thư viện cần thiết
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

// 2. Sử dụng express.json() để parse JSON request body
app.use(express.json());

// 3. Cấu hình các biến (thay đổi thông tin của bạn tại đây)
const GMAIL_USER = 'linhpeter04@gmail.com';       // Thay bằng địa chỉ Gmail của bạn
const GMAIL_PASS = 'yvsl vpop mwms ymdt';           // Thay bằng App Password của bạn
const PORT = process.env.PORT || 3000;  // Hoặc thay đổi cổng nếu cần

// 4. Cấu hình Nodemailer với Gmail và bỏ qua kiểm tra chứng chỉ
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// 5. Tạo API endpoint để gửi email xác minh
app.post('/sendVerification', async (req, res) => {
  const { email, code } = req.body;

  // Kiểm tra nếu thiếu email hoặc code
  if (!email || !code) {
    return res.status(400).json({ error: 'Email và code là bắt buộc' });
  }

  // Cấu hình email gửi đi
  const mailOptions = {
    from: GMAIL_USER,
    to: email,
    subject: 'Verification Code',
    text: `Your verification code is: ${code}`,
  };

  try {
    // Gửi email với Nodemailer
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Verification email sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
});

// 6. Khởi chạy server trên cổng đã định nghĩa
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
