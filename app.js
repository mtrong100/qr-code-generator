// ================================================================
// app.js — QR Code Generator main logic
// ================================================================

(function () {
  'use strict';

  // ── State ──────────────────────────────────────────────────────
  const STATE = {
    lang: 'vi',
    theme: 'system',
    qrType: 'url',
    fg: '#000000',
    bg: '#ffffff',
    size: 256,
    ecc: 'M',
    logo: null,       // data URL
    logoSize: 20,     // percent
    generated: false,
  };

  // ── DOM refs ───────────────────────────────────────────────────
  const $ = id => document.getElementById(id);
  const $$ = sel => document.querySelectorAll(sel);

  const themeToggle      = $('themeToggle');
  const themeIcon        = $('themeIcon');
  const langToggle       = $('langToggle');
  const generateBtn      = $('generateBtn');
  const resultSection    = $('resultSection');
  const resultSkeleton   = $('resultSkeleton');
  const resultBody       = $('resultBody');
  const qrCanvas         = $('qrCanvas');
  const fgColorInput     = $('fgColor');
  const bgColorInput     = $('bgColor');
  const fgHex            = $('fgHex');
  const bgHex            = $('bgHex');
  const sizeSlider       = $('sizeSlider');
  const sizeVal          = $('sizeVal');
  const logoInput        = $('logoInput');
  const logoDropZone     = $('logoDropZone');
  const logoUploadInner  = $('logoUploadInner');
  const logoPreview      = $('logoPreview');
  const logoPreviewImg   = $('logoPreviewImg');
  const removeLogo       = $('removeLogo');
  const logoSizeControl  = $('logoSizeControl');
  const logoSizeSlider   = $('logoSizeSlider');
  const logoSizeVal      = $('logoSizeVal');
  const downloadPng      = $('downloadPng');
  const downloadSvg      = $('downloadSvg');
  const copyBtn          = $('copyBtn');
  const snackbar         = $('snackbar');
  const pwaBanner        = $('pwaBanner');
  const pwaBannerInstall = $('pwaBannerInstall');
  const pwaBannerClose   = $('pwaBannerClose');
  const togglePassword   = $('togglePassword');

  // ── LocalStorage helpers ───────────────────────────────────────
  const LS_KEY = 'qr_prefs_v2';

  function savePrefs() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({
        lang:     STATE.lang,
        theme:    STATE.theme,
        fg:       STATE.fg,
        bg:       STATE.bg,
        size:     STATE.size,
        ecc:      STATE.ecc,
        logoSize: STATE.logoSize,
      }));
    } catch (_) {}
  }

  function loadPrefs() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const p = JSON.parse(raw);
      if (p.lang)     STATE.lang     = p.lang;
      if (p.theme)    STATE.theme    = p.theme;
      if (p.fg)       STATE.fg       = p.fg;
      if (p.bg)       STATE.bg       = p.bg;
      if (p.size)     STATE.size     = p.size;
      if (p.ecc)      STATE.ecc      = p.ecc;
      if (p.logoSize) STATE.logoSize = p.logoSize;
    } catch (_) {}
  }

  // ── Theme ──────────────────────────────────────────────────────
  const THEME_CYCLE = ['system', 'light', 'dark'];
  const THEME_ICONS = { system: 'brightness_auto', light: 'light_mode', dark: 'dark_mode' };

  function applyTheme(theme) {
    const root = document.documentElement;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = theme === 'dark' || (theme === 'system' && systemDark);
    root.setAttribute('data-resolved-theme', isDark ? 'dark' : 'light');
    themeIcon.textContent = THEME_ICONS[theme] || 'brightness_auto';

    // Update theme-color meta
    const metaTc = document.querySelector('meta[name="theme-color"]');
    if (metaTc) metaTc.content = isDark ? '#D0BCFF' : '#6750A4';
  }

  function cycleTheme() {
    const idx = THEME_CYCLE.indexOf(STATE.theme);
    STATE.theme = THEME_CYCLE[(idx + 1) % THEME_CYCLE.length];
    applyTheme(STATE.theme);
    savePrefs();
  }

  themeToggle.addEventListener('click', cycleTheme);

  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      if (STATE.theme === 'system') applyTheme('system');
    });

  // ── Language ───────────────────────────────────────────────────
  function setLang(lang) {
    STATE.lang = lang;
    window.__lang = lang;
    applyTranslations(lang);
    langToggle.setAttribute('aria-label', lang === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt');
    savePrefs();
  }

  langToggle.addEventListener('click', () => {
    const next = STATE.lang === 'vi' ? 'en' : 'vi';
    setLang(next);
    showSnack(t('langSwitchMsg'));
  });

  // ── QR Type tabs ───────────────────────────────────────────────
  $$('.type-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.type-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      STATE.qrType = tab.dataset.type;

      $$('.tab-panel').forEach(p => {
        p.classList.remove('active');
        p.hidden = true;
      });
      const panel = $('panel-' + STATE.qrType);
      if (panel) { panel.classList.add('active'); panel.hidden = false; }
    });
  });

  // ── Color controls ─────────────────────────────────────────────
  fgColorInput.addEventListener('input', () => {
    STATE.fg = fgColorInput.value;
    fgHex.textContent = STATE.fg;
    savePrefs();
  });

  bgColorInput.addEventListener('input', () => {
    STATE.bg = bgColorInput.value;
    bgHex.textContent = STATE.bg;
    savePrefs();
  });

  $$('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const fg = btn.dataset.fg;
      const bg = btn.dataset.bg;
      fgColorInput.value = fg;
      bgColorInput.value = bg;
      STATE.fg = fg;
      STATE.bg = bg;
      fgHex.textContent = fg;
      bgHex.textContent = bg;
      savePrefs();
    });
  });

  // ── Size slider ────────────────────────────────────────────────
  sizeSlider.addEventListener('input', () => {
    STATE.size = parseInt(sizeSlider.value);
    sizeVal.textContent = STATE.size;
    savePrefs();
  });

  // ── ECC buttons ────────────────────────────────────────────────
  $$('.ecc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.ecc-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.ecc = btn.dataset.ecc;
      savePrefs();
    });
  });

  // ── Logo upload ────────────────────────────────────────────────
  logoDropZone.addEventListener('click', (e) => {
    if (e.target === removeLogo || removeLogo.contains(e.target)) return;
    logoInput.click();
  });

  logoInput.addEventListener('change', () => {
    if (logoInput.files[0]) handleLogoFile(logoInput.files[0]);
  });

  // Drag & drop
  logoDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    logoDropZone.classList.add('drag-over');
    logoUploadInner.querySelector('.logo-upload__text') &&
      (logoUploadInner.querySelector('.logo-upload__text').textContent = t('dragActive'));
  });

  logoDropZone.addEventListener('dragleave', () => {
    logoDropZone.classList.remove('drag-over');
    if (logoUploadInner.querySelector('.logo-upload__text'))
      logoUploadInner.querySelector('.logo-upload__text').textContent = t('logoUploadText');
  });

  logoDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    logoDropZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) handleLogoFile(file);
  });

  function handleLogoFile(file) {
    if (!file.type.startsWith('image/') || file.size > 2 * 1024 * 1024) {
      showSnack(t('snackLogoError'));
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      STATE.logo = ev.target.result;
      logoPreviewImg.src = STATE.logo;
      logoUploadInner.hidden = true;
      logoPreview.hidden = false;
      logoSizeControl.hidden = false;
    };
    reader.readAsDataURL(file);
  }

  removeLogo.addEventListener('click', (e) => {
    e.stopPropagation();
    STATE.logo = null;
    logoInput.value = '';
    logoPreviewImg.src = '';
    logoUploadInner.hidden = false;
    logoPreview.hidden = true;
    logoSizeControl.hidden = true;
  });

  logoSizeSlider.addEventListener('input', () => {
    STATE.logoSize = parseInt(logoSizeSlider.value);
    logoSizeVal.textContent = STATE.logoSize;
    savePrefs();
  });

  // ── Password toggle ────────────────────────────────────────────
  if (togglePassword) {
    togglePassword.addEventListener('click', () => {
      const pwInput = $('wifiPassword');
      const isPass = pwInput.type === 'password';
      pwInput.type = isPass ? 'text' : 'password';
      togglePassword.querySelector('.material-symbols-rounded').textContent =
        isPass ? 'visibility_off' : 'visibility';
    });
  }

  // ── Build QR data string ────────────────────────────────────────
  function buildQRData() {
    switch (STATE.qrType) {
      case 'url': {
        const v = $('urlInput').value.trim();
        if (!v) return null;
        return v.startsWith('http') ? v : 'https://' + v;
      }
      case 'text': {
        const v = $('textInput').value.trim();
        return v || null;
      }
      case 'email': {
        const addr = $('emailAddr').value.trim();
        if (!addr) return null;
        const sub = encodeURIComponent($('emailSubject').value.trim());
        const body = encodeURIComponent($('emailBody').value.trim());
        return `mailto:${addr}?subject=${sub}&body=${body}`;
      }
      case 'phone': {
        const v = $('phoneInput').value.trim();
        return v ? `tel:${v}` : null;
      }
      case 'wifi': {
        const ssid = $('wifiSsid').value.trim();
        if (!ssid) return null;
        const pw  = $('wifiPassword').value;
        const enc = $('wifiEncryption').value;
        const hid = $('wifiHidden').checked ? 'true' : 'false';
        return `WIFI:T:${enc};S:${ssid};P:${pw};H:${hid};;`;
      }
      case 'vcard': {
        const first = $('vcardFirst').value.trim();
        const last  = $('vcardLast').value.trim();
        if (!first && !last) return null;
        const phone = $('vcardPhone').value.trim();
        const email = $('vcardEmail').value.trim();
        const org   = $('vcardOrg').value.trim();
        const web   = $('vcardWebsite').value.trim();
        const addr  = $('vcardAddress').value.trim();
        return [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `FN:${first} ${last}`.trim(),
          `N:${last};${first}`,
          phone ? `TEL:${phone}` : '',
          email ? `EMAIL:${email}` : '',
          org   ? `ORG:${org}` : '',
          web   ? `URL:${web}` : '',
          addr  ? `ADR:;;${addr}` : '',
          'END:VCARD',
        ].filter(Boolean).join('\n');
      }
      default: return null;
    }
  }

  // ── Generate ───────────────────────────────────────────────────
  generateBtn.addEventListener('click', generate);

  // Also generate on Enter key in text inputs
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'SELECT') {
      generate();
    }
  });

  async function generate() {
    const data = buildQRData();
    if (!data) {
      showSnack(t('snackError'));
      shakeBtnEffect();
      return;
    }

    // Show skeleton
    resultSection.hidden = false;
    resultSkeleton.hidden = false;
    resultBody.hidden = true;
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Loading state on button
    generateBtn.classList.add('btn--loading');
    generateBtn.disabled = true;
    // Insert spinner if needed
    if (!generateBtn.querySelector('.spinner')) {
      const sp = document.createElement('span');
      sp.className = 'spinner';
      generateBtn.appendChild(sp);
    }

    try {
      await new Promise(r => setTimeout(r, 350)); // brief delay for skeleton UX

      await renderQR(data);

      resultSkeleton.hidden = true;
      resultBody.hidden = false;
      STATE.generated = true;
    } catch (err) {
      console.error(err);
      resultSection.hidden = true;
      showSnack(t('snackError'));
    } finally {
      generateBtn.classList.remove('btn--loading');
      generateBtn.disabled = false;
    }
  }

  async function renderQR(data) {
    if (typeof QRCode === 'undefined') {
      throw new Error('QRCode library not loaded');
    }

    const opts = {
      width: STATE.size,
      margin: 1,
      color: {
        dark: STATE.fg,
        light: STATE.bg,
      },
      errorCorrectionLevel: STATE.ecc,
    };

    // Use toDataURL → draw onto canvas (works reliably in all browsers)
    const dataUrl = await QRCode.toDataURL(data, opts);

    await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        qrCanvas.width  = STATE.size;
        qrCanvas.height = STATE.size;
        const ctx = qrCanvas.getContext('2d');
        ctx.clearRect(0, 0, STATE.size, STATE.size);
        ctx.drawImage(img, 0, 0, STATE.size, STATE.size);
        resolve();
      };
      img.onerror = reject;
      img.src = dataUrl;
    });

    // Overlay logo if present
    if (STATE.logo) {
      await overlayLogo(qrCanvas, STATE.logo, STATE.logoSize / 100);
    }
  }

  function overlayLogo(canvas, logoSrc, ratio) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const ctx = canvas.getContext('2d');
        const size = canvas.width * ratio;
        const x = (canvas.width - size) / 2;
        const y = (canvas.height - size) / 2;
        const pad = 4;
        // White bg behind logo
        ctx.fillStyle = STATE.bg;
        ctx.beginPath();
        ctx.roundRect(x - pad, y - pad, size + pad * 2, size + pad * 2, 6);
        ctx.fill();
        ctx.drawImage(img, x, y, size, size);
        resolve();
      };
      img.onerror = reject;
      img.src = logoSrc;
    });
  }

  // ── Download PNG ───────────────────────────────────────────────
  downloadPng.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCanvas.toDataURL('image/png');
    link.click();
    showSnack(t('snackDownloaded') + ' PNG');
  });

  // ── Download SVG ───────────────────────────────────────────────
  downloadSvg.addEventListener('click', async () => {
    const data = buildQRData();
    if (!data) return;
    try {
      const svgStr = await QRCode.toString(data, {
        type: 'svg',
        color: { dark: STATE.fg, light: STATE.bg },
        errorCorrectionLevel: STATE.ecc,
        width: STATE.size,
        margin: 1,
      });
      const blob = new Blob([svgStr], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'qrcode.svg';
      link.href = url;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      showSnack(t('snackDownloaded') + ' SVG');
    } catch (err) {
      console.error(err);
      showSnack(t('snackError'));
    }
  });

  // ── Copy image ─────────────────────────────────────────────────
  copyBtn.addEventListener('click', async () => {
    try {
      qrCanvas.toBlob(async (blob) => {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        showSnack(t('snackCopied'));
      }, 'image/png');
    } catch (_) {
      // Fallback: copy as URL
      try {
        await navigator.clipboard.writeText(qrCanvas.toDataURL('image/png'));
        showSnack(t('snackCopied'));
      } catch (__) {
        showSnack(t('snackError'));
      }
    }
  });

  // ── Snackbar ───────────────────────────────────────────────────
  let snackTimer;
  function showSnack(msg) {
    clearTimeout(snackTimer);
    snackbar.textContent = msg;
    snackbar.classList.add('show');
    snackTimer = setTimeout(() => snackbar.classList.remove('show'), 2800);
  }

  // ── Shake effect ───────────────────────────────────────────────
  function shakeBtnEffect() {
    generateBtn.animate([
      { transform: 'translateX(0)' },
      { transform: 'translateX(-6px)' },
      { transform: 'translateX(6px)' },
      { transform: 'translateX(-4px)' },
      { transform: 'translateX(4px)' },
      { transform: 'translateX(0)' },
    ], { duration: 350, easing: 'ease-out' });
  }

  // ── PWA Install ────────────────────────────────────────────────
  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const dismissed = localStorage.getItem('pwa_dismissed');
    if (!dismissed) {
      setTimeout(() => { pwaBanner.hidden = false; }, 3000);
    }
  });

  pwaBannerInstall.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    pwaBanner.hidden = true;
    if (outcome === 'accepted') showSnack('App installed!');
  });

  pwaBannerClose.addEventListener('click', () => {
    pwaBanner.hidden = true;
    localStorage.setItem('pwa_dismissed', '1');
  });

  window.addEventListener('appinstalled', () => {
    pwaBanner.hidden = true;
    deferredPrompt = null;
  });

  // ── Service Worker ─────────────────────────────────────────────
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }

  // ── Init ───────────────────────────────────────────────────────
  function init() {
    loadPrefs();

    // Apply persisted theme
    applyTheme(STATE.theme);

    // Apply persisted lang
    window.__lang = STATE.lang;
    applyTranslations(STATE.lang);

    // Apply persisted color
    fgColorInput.value = STATE.fg;
    bgColorInput.value = STATE.bg;
    fgHex.textContent  = STATE.fg;
    bgHex.textContent  = STATE.bg;

    // Apply persisted size
    sizeSlider.value   = STATE.size;
    sizeVal.textContent = STATE.size;

    // Apply persisted logoSize
    logoSizeSlider.value = STATE.logoSize;
    logoSizeVal.textContent = STATE.logoSize;

    // Apply persisted ECC
    $$('.ecc-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.ecc === STATE.ecc);
    });
  }

  init();

})();
