const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Statik dosyaları serve etmeden önce login kontrolü
app.use((req, res, next) => {
    // CSS, JS ve resim dosyalarına doğrudan erişime izin ver
    if (req.path.match(/\.(css|js|jpg|png|svg)$/)) {
        return next();
    }

    // İzin verilen sayfalar (whitelist)
    const allowedHtml = ['/', '/login.html', '/register.html', '/index.html', '/list.html', '/dashboard', '/ozet.html', '/ekler.html', '/formlar.html', '/sayfalar.html', '/takimlar.html', '/yapilacaklar.html', '/devam-ediyor.html', '/tamam.html', '/onaylar.html', '/zamancizelgesi.html', '/calendar.html'];
    if (allowedHtml.includes(req.path)) {
        return next();
    }

    // Diğer tüm HTML sayfaları için login sayfasına yönlendir
    if (req.path.endsWith('.html')) {
        return res.redirect('/login.html');
    }

    next();
});

// Statik dosyaları serve et
app.use(express.static(__dirname));

// Ana sayfayı login'e yönlendir
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Dashboard sayfası için route
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
