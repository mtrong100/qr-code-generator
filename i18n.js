// ================================================================
// i18n.js — Bilingual translations (VI / EN)
// ================================================================

const TRANSLATIONS = {
  vi: {
    appTitle: 'QR Generator',
    appSubtitle: 'Tạo mã QR miễn phí',
    heroTitle: 'Tạo Mã QR Ngay',
    heroDesc: 'Tạo mã QR miễn phí cho URL, văn bản, liên hệ, WiFi và nhiều hơn nữa. Tùy chỉnh màu sắc, kích thước và thêm logo.',
    qrType: 'Loại mã QR',
    typeUrl: 'URL',
    typeText: 'Văn bản',
    typeEmail: 'Email',
    typePhone: 'Điện thoại',
    typeVcard: 'Liên hệ',
    urlLabel: 'Địa chỉ URL',
    textLabel: 'Nội dung văn bản',
    textPlaceholder: 'Nhập văn bản...',
    emailAddrLabel: 'Địa chỉ email',
    emailSubjectLabel: 'Tiêu đề',
    emailSubjectPlaceholder: 'Tiêu đề email',
    emailBodyLabel: 'Nội dung',
    emailBodyPlaceholder: 'Nội dung email...',
    phoneLabel: 'Số điện thoại',
    wifiSsidHint: '(Tên mạng)',
    wifiSsidPlaceholder: 'Tên WiFi',
    wifiPasswordLabel: 'Mật khẩu',
    wifiPasswordPlaceholder: 'Mật khẩu WiFi',
    wifiEncryptionLabel: 'Mã hóa',
    wifiHiddenLabel: 'Mạng ẩn',
    vcardFirstLabel: 'Họ',
    vcardFirstPlaceholder: 'Nguyễn',
    vcardLastLabel: 'Tên',
    vcardLastPlaceholder: 'Văn A',
    vcardPhoneLabel: 'Điện thoại',
    vcardEmailLabel: 'Email',
    vcardOrgLabel: 'Tổ chức',
    vcardOrgPlaceholder: 'Tên công ty',
    vcardWebsiteLabel: 'Website',
    vcardAddressLabel: 'Địa chỉ',
    vcardAddressPlaceholder: 'Địa chỉ...',
    customTitle: 'Tùy chỉnh',
    colorsLabel: 'Màu sắc',
    fgColorLabel: 'Màu QR',
    bgColorLabel: 'Màu nền',
    sizeLabel: 'Kích thước',
    eccLabel: 'Mức sửa lỗi',
    eccL: '7%',
    eccM: '15%',
    eccQ: '25%',
    eccH: '30%',
    logoLabel: 'Logo',
    logoOptional: '(tuỳ chọn)',
    logoUploadText: 'Kéo thả hoặc nhấn để tải ảnh',
    logoUploadHint: 'PNG, JPG, SVG – tối đa 2MB',
    logoSizeLabel: 'Kích thước logo',
    generateBtn: 'Tạo mã QR',
    resultTitle: 'Mã QR của bạn',
    copyBtn: 'Sao chép',
    footerText: 'Tạo mã QR miễn phí — ',
    footerLink: 'Mã nguồn mở',
    pwaBannerText: 'Cài đặt ứng dụng để dùng offline',
    pwaBannerInstall: 'Cài đặt',
    snackCopied: 'Đã sao chép ảnh!',
    snackDownloaded: 'Đã tải xuống',
    snackError: 'Vui lòng nhập nội dung hợp lệ',
    snackLogoError: 'File ảnh không hợp lệ hoặc quá lớn (tối đa 2MB)',
    themeLight: 'Sáng',
    themeDark: 'Tối',
    themeSystem: 'Hệ thống',
    langSwitchMsg: 'Đã chuyển sang tiếng Việt',
    dragActive: 'Thả ảnh vào đây',
  },
  en: {
    appTitle: 'QR Generator',
    appSubtitle: 'Free QR code creator',
    heroTitle: 'Generate QR Codes Instantly',
    heroDesc: 'Create free QR codes for URLs, text, contacts, WiFi and more. Customize colors, size, and add your logo.',
    qrType: 'QR Code Type',
    typeUrl: 'URL',
    typeText: 'Text',
    typeEmail: 'Email',
    typePhone: 'Phone',
    typeVcard: 'Contact',
    urlLabel: 'URL address',
    textLabel: 'Text content',
    textPlaceholder: 'Enter your text...',
    emailAddrLabel: 'Email address',
    emailSubjectLabel: 'Subject',
    emailSubjectPlaceholder: 'Email subject',
    emailBodyLabel: 'Body',
    emailBodyPlaceholder: 'Email body...',
    phoneLabel: 'Phone number',
    wifiSsidHint: '(Network name)',
    wifiSsidPlaceholder: 'WiFi name',
    wifiPasswordLabel: 'Password',
    wifiPasswordPlaceholder: 'WiFi password',
    wifiEncryptionLabel: 'Encryption',
    wifiHiddenLabel: 'Hidden network',
    vcardFirstLabel: 'First name',
    vcardFirstPlaceholder: 'John',
    vcardLastLabel: 'Last name',
    vcardLastPlaceholder: 'Doe',
    vcardPhoneLabel: 'Phone',
    vcardEmailLabel: 'Email',
    vcardOrgLabel: 'Organization',
    vcardOrgPlaceholder: 'Company name',
    vcardWebsiteLabel: 'Website',
    vcardAddressLabel: 'Address',
    vcardAddressPlaceholder: 'Address...',
    customTitle: 'Customize',
    colorsLabel: 'Colors',
    fgColorLabel: 'QR Color',
    bgColorLabel: 'Background',
    sizeLabel: 'Size',
    eccLabel: 'Error Correction',
    eccL: '7%',
    eccM: '15%',
    eccQ: '25%',
    eccH: '30%',
    logoLabel: 'Logo',
    logoOptional: '(optional)',
    logoUploadText: 'Drag & drop or tap to upload',
    logoUploadHint: 'PNG, JPG, SVG – max 2MB',
    logoSizeLabel: 'Logo size',
    generateBtn: 'Generate QR Code',
    resultTitle: 'Your QR Code',
    copyBtn: 'Copy Image',
    footerText: 'Free QR code generator — ',
    footerLink: 'Open source',
    pwaBannerText: 'Install app for offline use',
    pwaBannerInstall: 'Install',
    snackCopied: 'Image copied!',
    snackDownloaded: 'Downloaded',
    snackError: 'Please enter valid content',
    snackLogoError: 'Invalid image or too large (max 2MB)',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'System',
    langSwitchMsg: 'Switched to English',
    dragActive: 'Drop image here',
  }
};

// ── Apply translations ────────────────────────────────────────────
function applyTranslations(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;

  // Text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // HTML lang attr
  document.documentElement.lang = lang === 'vi' ? 'vi' : 'en';

  // Page title
  document.title = lang === 'vi'
    ? 'QR Code Generator – Tạo Mã QR Miễn Phí'
    : 'QR Code Generator – Free QR Code Creator';
}

function t(key) {
  const lang = window.__lang || 'vi';
  return (TRANSLATIONS[lang] || TRANSLATIONS.vi)[key] || key;
}
