const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Statik dosyaları sun (HTML, CSS, JS, img vs.)
app.use(express.static(__dirname));

// Ana sayfayı login'e yönlendir
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Oturum kontrolü simülasyonu (gerçek bir session yoksa bu örnekte kullanılmaz)
// Sadece login.html, register.html ve sizin_icin.html sayfalarına doğrudan erişime izin ver,
// diğer tüm .html sayfaları için login sayfasına yönlendir
app.use((req, res, next) => {
    const allowedPaths = ['/login.html', '/register.html', '/sizin_icin.html'];
    const isHtmlRequest = req.path.endsWith('.html');

    if (isHtmlRequest && !allowedPaths.includes(req.path)) {
        return res.redirect('/login.html');
    }

    next();
});

// Örnek özel route: dashboard -> index.html
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Sunucuyu başlat
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
