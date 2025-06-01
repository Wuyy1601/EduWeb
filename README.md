<p align="center">
  <a href="https://www.uit.edu.vn/" title="Trường Đại học Công nghệ Thông tin" style="border: none;">
    <img src="https://i.imgur.com/WmMnSRt.png" alt="Trường Đại học Công nghệ Thông tin | University of Information Technology">
  </a>
</p>

1. GIỚI THIỆU MÔN HỌC
Tên môn học: Phát triển Ứng dụng Web

Mã môn học: IS207

Mã lớp: IS207.P21

Năm học: HK2 (2024 - 2025)

Giảng viên: ThS. Trình Trọng Tín

Email: tintt@uit.edu.vn

2. GIỚI THIỆU ĐỒ ÁN
Tên đề tài: EduWeb - Nền tảng học tập trực tuyến

Mô tả:
EduWeb là website học tập, chia sẻ tài liệu và khóa học trực tuyến, giúp sinh viên dễ dàng tiếp cận tri thức và kết nối cộng đồng học tập.

Repository: https://github.com/Wuyy1601/EduWeb

Thiết kế Figma: Xem giao diện

3. NHÓM SINH VIÊN THỰC HIỆN
Họ và Tên	MSSV
Thái Hoàng Hải Đăng	23520236
Hồ Tuyết Sương	23521366
Đổng Khánh Huy	23520605
Võ Thiên Lý	23520909
Nguyễn Khải	23520675
Lê Khánh Duy	23520367

🚀 TÍNH NĂNG NỔI BẬT
Đăng ký & Đăng nhập:
Tạo tài khoản, đăng nhập an toàn, quản lý hồ sơ người dùng.

Quản lý khóa học:
Tìm kiếm, đăng ký và theo dõi tiến trình học tập qua các khóa học đa dạng.

Chia sẻ & Tải lên tài liệu:
Người dùng có thể tải lên, chia sẻ hoặc tải về các tài liệu phục vụ học tập.

Thanh toán & Quản lý đơn hàng:
Tích hợp thanh toán online, quản lý lịch sử mua khóa học.

Đánh giá & Bình luận:
Đánh giá khóa học, để lại phản hồi giúp cải thiện chất lượng nội dung.

Tích hợp Chatbot AI:
Hỗ trợ giải đáp thắc mắc, tư vấn chọn khóa học nhờ công nghệ AI thông minh.

Hệ thống quản trị dành cho Admin:
Quản lý user, khóa học, tài liệu và các nghiệp vụ nền tảng.

🏗️ CÔNG NGHỆ SỬ DỤNG
Công nghệ	Chức năng
ReactJS + Vite	Xây dựng giao diện web

Spring Boot (Java)	Xử lý nghiệp vụ backend chính

Node.js + Express	Xây dựng API, tích hợp với Chatbot

MongoDB	Lưu trữ tài liệu, dữ liệu linh hoạt

MySQL	Quản lý user, khóa học (dữ liệu quan hệ)

TailwindCSS	UI/UX hiện đại, responsive

JWT Authentication	Bảo mật đăng nhập

OpenAI API	Tư vấn Chatbot AI

Docker (Optional)	Đóng gói, triển khai dễ dàng

📸 DEMO
<div align="center"> <img src="https://github.com/Wuyy1601/EduWeb/raw/main/public/demo.gif" alt="EduWeb Demo" width="700"/> </div>
Link demo: edu-web-five.vercel.app

⚡ HƯỚNG DẪN CÀI ĐẶT NHANH
bash
Sao chép
Chỉnh sửa
# 1. Clone repo
git clone https://github.com/Wuyy1601/EduWeb.git
cd EduWeb

# 2. Cài đặt Frontend
npm install
npm run dev

# 3. Cài đặt Backend 
Tải JDK bản 23 và cài môi trường Java

Tải intelliJ

Tải MongoDB

Tải MySQL

Tải Docker và chạy các lệnh trong CMD:

docker run --name mysql-8.0.36 -e MYSQL_ROOT_PASSWORD=root -d mysql:8.0.36-debian

docker run -d --name mongodb-7.0.11 -p 27017:27017 -e MONGODB_ROOT_USER=root -e MONGODB_ROOT_PASSWORD=root bitnami/mongodb:7.0.11

docker run --name neo4j --publish=7474:7474 --publish=7687:7687 -d neo4j:latest

Cần cấu hình file .env cho backend để chạy ChatBot

Cài đặt & cấu hình database MySQL/MongoDB theo hướng dẫn trong từng thư mục.

📝 CẤU TRÚC DỰ ÁN

EduWeb/
├── backend/            # Source code backend Java và thư viện SpringBoot
├── src/                # Source code ReactJS 
├── package.json        # Thông tin cấu hình dự án (npm)
├── package-lock.json   # Khóa phiên bản các package
├── vite.config.js      # Cấu hình Vite
├── eslint.config.js    # Cấu hình ESLint
├── public/             
└── README.md           # Tài liệu mô tả dự án
Chức năng chính đều được chú thích rõ ràng trong source code.

💡 ĐỊNH HƯỚNG PHÁT TRIỂN

Tối ưu trải nghiệm học tập (UI/UX, tốc độ).

Thêm chức năng live-stream, video call học nhóm.

Nâng cấp AI tư vấn chuyên sâu hơn.

Xây dựng hệ thống học liệu mở rộng, học liệu theo chủ đề, cấp bậc.

Tích hợp chức năng thông báo, nhắc lịch học tự động.

