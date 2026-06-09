# QR Code Generator

> 🇬🇧 [English](#english) | 🇻🇳 [Tiếng Việt](#tiếng-việt)

---

## English

### Overview

A free, fully client-side QR Code Generator web application built with pure HTML, CSS, and JavaScript. No server required — everything runs in your browser.

### Features

- **Multiple QR types**: URL, plain text, email, phone number, WiFi credentials, vCard contact
- **Full customization**: foreground/background color pickers with preset palettes, size slider (128–512 px), error correction level (L/M/Q/H)
- **Logo overlay**: drag-and-drop or tap to upload a logo image, with adjustable logo-size ratio
- **Export**: download as PNG or SVG, or copy image to clipboard
- **Bilingual UI**: Vietnamese and English, switchable at any time
- **Dark / Light / System theme**: persisted to localStorage
- **User preferences persistence**: all settings (theme, language, colors, size, ECC) saved automatically
- **PWA support**: installable as a native-like app, works offline via Service Worker
- **Responsive design**: optimized for phone, tablet, iPad, laptop, and desktop
- **Material Design 3**: Google's latest design system with MD3 color tokens, typography, and motion
- **One UI 8-style favicon**: rounded-square icon in purple gradient
- **Loading skeleton UI**: smooth skeleton placeholder shown while QR is rendering
- **Accessible**: keyboard navigation, ARIA roles, focus management, reduced-motion support

### Getting Started

```bash
# No build step needed — just open in a browser
open index.html

# Or serve locally (recommended for PWA/Service Worker)
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

### File Structure

```
qr-generator/
├── index.html        # Main HTML, structure & markup
├── style.css         # Material Design 3 styles, theming, responsive
├── app.js            # Main logic: QR generation, UI interactions
├── i18n.js           # Translations (VI/EN), language switcher
├── sw.js             # Service Worker for offline PWA support
├── manifest.json     # PWA manifest
├── favicon.svg       # One UI 8 style SVG favicon
└── icons/
    ├── icon-192.png  # PWA app icon 192×192
    ├── icon-512.png  # PWA app icon 512×512
    └── favicon-32.png
```

### Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic markup, ARIA accessibility |
| CSS3 | MD3 custom properties, responsive layout |
| Vanilla JS (ES2020+) | App logic, no framework |
| [qrcode.js](https://github.com/soldair/node-qrcode) | QR code generation (CDN) |
| Google Fonts – Noto Sans | Vietnamese-compatible typography |
| Material Symbols Rounded | Icon system |
| Service Worker | PWA offline caching |

### Browser Support

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+, Samsung Internet 14+

### License

MIT License — free to use, modify, and distribute.

---

## Tiếng Việt

### Tổng quan

Ứng dụng web tạo mã QR miễn phí, chạy hoàn toàn phía client — không cần máy chủ. Mọi thứ được xử lý ngay trên trình duyệt của bạn.

### Tính năng

- **Nhiều loại mã QR**: URL, văn bản thuần, email, số điện thoại, thông tin WiFi, danh bạ vCard
- **Tùy chỉnh đầy đủ**: chọn màu QR/nền với bảng màu preset, điều chỉnh kích thước (128–512 px), mức sửa lỗi (L/M/Q/H)
- **Chèn logo**: kéo thả hoặc nhấn để tải ảnh logo, điều chỉnh tỉ lệ kích thước logo
- **Xuất file**: tải xuống PNG hoặc SVG, hoặc sao chép ảnh vào clipboard
- **Giao diện song ngữ**: Tiếng Việt và Tiếng Anh, có thể chuyển đổi bất kỳ lúc nào
- **Chủ đề Sáng / Tối / Theo hệ thống**: được lưu vào localStorage
- **Ghi nhớ tùy chỉnh**: tất cả cài đặt (chủ đề, ngôn ngữ, màu sắc, kích thước, ECC) được lưu tự động
- **Hỗ trợ PWA**: cài đặt như ứng dụng native, hoạt động offline qua Service Worker
- **Thiết kế responsive**: tối ưu cho điện thoại, tablet, iPad, laptop và desktop
- **Material Design 3**: hệ thống thiết kế mới nhất của Google với color tokens, typography và chuyển động MD3
- **Favicon phong cách One UI 8**: icon hình vuông bo góc với gradient tím
- **Skeleton UI loading**: hiển thị khung placeholder mượt mà trong khi tạo mã QR
- **Hỗ trợ tiếp cận**: điều hướng bàn phím, vai trò ARIA, quản lý focus, hỗ trợ reduced-motion

### Cách chạy

```bash
# Không cần build — chỉ cần mở trình duyệt
open index.html

# Hoặc chạy server local (khuyến nghị cho PWA/Service Worker)
npx serve .
# hoặc
python3 -m http.server 8080
```

Sau đó mở `http://localhost:8080` trong trình duyệt.

### Cấu trúc file

```
qr-generator/
├── index.html        # HTML chính, cấu trúc & markup
├── style.css         # Kiểu dáng Material Design 3, theme, responsive
├── app.js            # Logic chính: tạo QR, tương tác UI
├── i18n.js           # Bản dịch (VI/EN), chuyển ngôn ngữ
├── sw.js             # Service Worker cho PWA offline
├── manifest.json     # Manifest PWA
├── favicon.svg       # Favicon SVG phong cách One UI 8
└── icons/
    ├── icon-192.png  # Icon ứng dụng PWA 192×192
    ├── icon-512.png  # Icon ứng dụng PWA 512×512
    └── favicon-32.png
```

### Công nghệ sử dụng

| Công nghệ | Mục đích |
|---|---|
| HTML5 | Markup ngữ nghĩa, tiếp cận ARIA |
| CSS3 | Custom properties MD3, layout responsive |
| Vanilla JS (ES2020+) | Logic ứng dụng, không dùng framework |
| [qrcode.js](https://github.com/soldair/node-qrcode) | Tạo mã QR (CDN) |
| Google Fonts – Noto Sans | Font hỗ trợ tiếng Việt |
| Material Symbols Rounded | Hệ thống icon |
| Service Worker | Caching offline cho PWA |

### Hỗ trợ trình duyệt

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+, Samsung Internet 14+

### Giấy phép

MIT License — tự do sử dụng, chỉnh sửa và phân phối.
