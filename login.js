// Şifre görünürlüğünü değiştir
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.classList.remove('fa-eye');
        toggleBtn.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleBtn.classList.remove('fa-eye-slash');
        toggleBtn.classList.add('fa-eye');
    }
}

// Form gönderme işlemi
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Basit doğrulama
    if (username && password) {
        // Başarılı giriş - /dashboard'a yönlendir
        window.location.href = '/dashboard';
    } else {
        alert('Lütfen kullanıcı adı ve şifre giriniz!');
    }
});

// Animasyonlu balonlar
document.addEventListener('DOMContentLoaded', function() {
    const bubbles = document.querySelectorAll('.bubble');
    
    bubbles.forEach(bubble => {
        // Rastgele başlangıç pozisyonu
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${Math.random() * 3 + 2}s`;
        bubble.style.animationDelay = `${Math.random() * 2}s`;
    });
});
