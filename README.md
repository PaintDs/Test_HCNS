# 📱 Ứng dụng Vertical Scroll Video Feed (Next.js App Router & TypeScript)

Dự án hoàn thiện theo các tiêu chí kiểm tra đầu vào, giả lập giao diện cuộn dọc video ngắn tối ưu hiệu năng.

---

## 🔗 Thông Tin Triển Khai (Submission Links)

- **Link Source Code (GitHub):** `https://github.com/PaintDs/Test_HCNS`
- **Link Dự án Production (Vercel):** `https://test-nguyenvankhai-xxx.vercel.app` *(thay `xxx` bằng 3 số cuối số điện thoại)*
- **Link Video Demo (Google Drive):** `[DÁN_LINK_VIDEO_DEMO_ĐÃ_MỞ_QUYỀN_TRUY_CẬP_VÀO_ĐÂY]`

---

## 🧠 Giải Pháp Kiến Trúc & Xử Lý Logic Play/Pause Khi Cuộn Trang

*(Đây là phần bắt buộc giải thích ngắn gọn theo yêu cầu của đề bài)*

- **Cơ chế xử lý chính:** Thay vì gắn cho mỗi thẻ video một `IntersectionObserver` độc lập gây tốn tài nguyên phần cứng, ứng dụng áp dụng giải pháp **Single Observer Pattern** tập trung tại Component cha (`VideoFeed.tsx`).

- **Cách thức hoạt động:**
  - Một thực thể `IntersectionObserver` duy nhất thực hiện giám sát tất cả các card video trong Viewport cuộn.
  - Khi một video cuộn tới và đạt tỷ lệ hiển thị trên màn hình **> 60%**, component cha sẽ tính toán và kích hoạt biến trạng thái active, truyền xuống component con (`VideoCard.tsx`) thông qua prop `isActive`.
  - Component con nhận tín hiệu và điều khiển vòng đời phát của video native HTML5 thông qua Hook `useEffect`: Gọi lệnh `.play()` khi `isActive = true` và lập tức gọi `.pause()` khi `isActive = false`.

- **Hiệu quả tối ưu:** Giải pháp này giúp kiểm soát tuyệt đối luồng âm thanh (tại một thời điểm chỉ có tối đa 1 video phát tiếng), giảm tải CPU, giải phóng bộ nhớ trình duyệt ngay khi video cuộn qua, ngăn ngừa hoàn toàn hiện tượng rò rỉ bộ nhớ (Memory Leak).

---

## 🛠️ Hướng Dẫn Khởi Chạy Dưới Local

```bash
# 1. Cài đặt các thư viện phụ thuộc
pnpm install   # hoặc npm install

# 2. Khởi chạy môi trường phát triển (Development)
pnpm dev       # hoặc npm run dev

# 3. Biên dịch gói sản phẩm tối ưu hóa (Production Build)
pnpm build     # hoặc npm run build

# 4. Chạy thử nghiệm gói sản phẩm Production dưới Local
pnpm start     # hoặc npm run start
```
