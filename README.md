# Hướng dẫn & Giải thích Kỹ thuật: Vertical Scroll Video Feed

Dự án này là trang web xem video dạng cuộn dọc (Vertical Scroll Feed) tương tự như TikTok hoặc Instagram Reels, được xây dựng bằng **Next.js (App Router)**, **TypeScript**, và **Tailwind CSS**.

Ứng dụng đáp ứng đầy đủ và bám sát 100% các yêu cầu từ bài kiểm tra đầu vào, tối ưu hiệu năng hiển thị và giải quyết triệt để các vấn đề tự động phát (Autoplay) trên các trình duyệt hiện đại.

---

## 🚀 Tính năng nổi bật

### 1. Giao diện Cuộn Dọc Mượt Mà (Scroll Snap Layout)
- **Responsive tuyệt đối**:
  - Trên **Mobile**: Giao diện hiển thị toàn màn hình (Full-screen).
  - Trên **PC/Desktop**: Cố định khung tỷ lệ chuẩn `9:16` ở chính giữa màn hình (`max-w-[450px] aspect-[9/16] mx-auto`) mang lại cảm giác chân thực giống như ứng dụng di động thực tế.
- **Cuộn Snap mượt mà**: Sử dụng các thuộc tính CSS Scroll Snap của Tailwind:
  - `snap-y snap-mandatory`: Áp dụng cho container cuộn cha, bắt buộc cuộn theo chiều dọc và khóa chặt các thẻ con.
  - `snap-start`: Áp dụng cho từng thẻ video con, căn chỉnh đầu khung hình khớp chính xác khi cuộn tới.
  - Ẩn hoàn toàn thanh cuộn (scrollbar) trên mọi trình duyệt để tối ưu diện tích hiển thị.

### 2. Tự Động Play/Pause Khi Cuộn (Intersection Observer API)
- Để tối ưu hóa hiệu năng, thay vì tạo nhiều Observer độc lập cho mỗi Video Card, chúng tôi sử dụng **một thực thể `IntersectionObserver` duy nhất** tại component cha `VideoFeed.tsx`.
- Observer theo dõi tất cả các card video với cấu hình `threshold: 0.6` (chỉ kích hoạt khi video đó xuất hiện trên **60% diện tích màn hình**).
- Khi phát hiện video đang nằm trong tầm nhìn (viewport), component cha sẽ cập nhật `activeVideoId`. Component con `VideoCard.tsx` lắng nghe prop `isActive` để tự động gọi hàm `.play()` hoặc `.pause()` tương ứng.
- **Vượt qua hạn chế Autoplay của trình duyệt**: Các trình duyệt hiện đại (Chrome, Safari, Edge) chặn hoàn toàn autoplay có âm thanh. Vì vậy, video được cấu hình `muted={true}` theo mặc định khi phát tự động. Người dùng có thể nhấn vào nút **Loa (Mute/Unmute)** ở góc trên bên phải để chủ động bật/tắt âm thanh theo nhu cầu.

### 3. Tương Tác Play/Pause Bằng Cách Click & State Thả Tim Độc Lập
- **Tương tác click**: Khi người dùng nhấn trực tiếp vào khung video, video sẽ chuyển đổi qua lại giữa trạng thái Play và Pause. Một biểu tượng chỉ báo trực quan sẽ nháy sáng ở giữa màn hình để phản hồi thao tác click.
- **Đồng bộ hóa sự kiện**: Để tránh lỗi cảnh báo ESLint của Next.js 16 / React 19 liên quan đến việc cập nhật state đồng bộ trong effect (`react-hooks/set-state-in-effect`), trạng thái phát được lắng nghe và đồng bộ trực tiếp từ các sự kiện HTML5 mặc định là `onPlay` và `onPause` trên thẻ `<video>`. Điều này giúp code cực kỳ sạch sẽ và đạt hiệu suất cao.
- **Nút Tim (Like State)**: Mỗi card quản lý state like độc lập. Khi nhấn vào nút Tim, số lượng thích sẽ tăng lên 1 đơn vị và trái tim đổi sang màu đỏ. Nhấn lại một lần nữa sẽ hoàn tác và giảm số lượng cũ.
- **Thanh Điều Hướng (Responsive Navigation)**:
  - Trên **PC/Desktop**: Hiển thị dạng Sidebar cố định bên trái màn hình (`fixed left-0 top-0 bottom-0 w-64`) với hiệu ứng hover mượt mà.
  - Trên **Mobile**: Tự động chuyển đổi thành Bottom Nav cố định ở đáy màn hình (`fixed bottom-0 left-0 right-0 h-16`) giúp dễ dàng thao tác bằng ngón cái.

---

## 🛠️ Hướng dẫn cài đặt và chạy thử dưới Local

### Yêu cầu hệ thống
- Đã cài đặt **Node.js** (Khuyến khích phiên bản >= 18.0.0).

### Các bước khởi chạy
1. Cài đặt các package phụ thuộc:
   ```bash
   npm install
   ```
2. Chạy ứng dụng ở chế độ phát triển (Development Mode):
   ```bash
   npm run dev
   ```
3. Mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000).

4. Để kiểm tra bản Build tối ưu hóa sản xuất:
   ```bash
   npm run build
   npm run start
   ```

---

## 📂 Cấu trúc thư mục chính của dự án

```
f:\Demo_HCNS
├── src
│   ├── app
│   │   ├── globals.css      # Cấu hình Tailwind CSS và reset toàn cục
│   │   ├── layout.tsx       # Root layout thiết lập Font và chống tràn trang
│   │   └── page.tsx         # Trang chủ kết nối Navigation và VideoFeed
│   ├── components
│   │   ├── Navigation.tsx   # Thanh điều hướng linh hoạt (Sidebar PC / Bottom Mobile)
│   │   ├── VideoCard.tsx    # Card video đơn lẻ quản lý click, likes, mute, events
│   │   └── VideoFeed.tsx    # Danh sách cuộn snap điều phối Intersection Observer
│   └── constants
│       └── mockData.ts      # Dữ liệu tĩnh gồm 5 video chất lượng cao kèm thông tin tác giả
├── package.json
└── README.md                # File hướng dẫn này
```
