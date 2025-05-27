// Yorum işlevselliği için JavaScript kodu

// Örnek yorum verileri (gerçek uygulamada bu veriler bir veritabanından gelecektir)
const comments = {
    'COL-3': [
        {
            id: 1,
            author: 'Melike Danışmaz',
            authorAvatar: 'MD',
            authorColor: '9c27b0',
            date: '15 May 2025',
            text: 'API geliştirme sürecinde JWT token implementasyonu tamamlandı.',
            attachments: []
        },
        {
            id: 2,
            author: 'Ömer Faruk Bingöl',
            authorAvatar: 'ÖF',
            authorColor: '18a0fb',
            date: '18 May 2025',
            text: 'Endpoint testleri tamamlandı, dokümantasyon hazırlanıyor.',
            attachments: [{
                name: 'api-docs.pdf',
                size: '2.4 MB',
                type: 'application/pdf'
            }]
        }
    ],
    'COL-5': [
        {
            id: 3,
            author: 'Ceren Yolur',
            authorAvatar: 'CY',
            authorColor: '9c27b0',
            date: '12 May 2025',
            text: 'Login sayfası tasarımı tamamlandı, responsive tasarım üzerinde çalışıyorum.',
            attachments: []
        },
        {
            id: 4,
            author: 'Bedirhan Özmen',
            authorAvatar: 'BO',
            authorColor: 'ffd600',
            date: '14 May 2025',
            text: 'Tasarım güzel olmuş, renk paleti üzerinde birkaç önerim olacak.',
            attachments: []
        }
    ],
    'COL-6': [
        {
            id: 5,
            author: 'Emre Kandazoğlu',
            authorAvatar: 'EK',
            authorColor: '00bfae',
            date: '10 May 2025',
            text: 'Veritabanı şeması oluşturuldu, ER diyagramı ektedir.',
            attachments: [{
                name: 'database-schema.png',
                size: '1.8 MB',
                type: 'image/png'
            }]
        }
    ],
    'COL-11': [
        {
            id: 6,
            author: 'Büşra Özer',
            authorAvatar: 'BÖ',
            authorColor: 'ff7043',
            date: '20 May 2025',
            text: 'Veritabanı optimizasyonu tamamlandı, performans testleri devam ediyor.',
            attachments: []
        }
    ],
    'COL-4': [
        {
            id: 7,
            author: 'Bedirhan Özmen',
            authorAvatar: 'BO',
            authorColor: 'ffd600',
            date: '5 May 2025',
            text: 'UX/UI tasarımlar Figma\'da paylaşıldı, inceleyebilirsiniz.',
            attachments: []
        },
        {
            id: 8,
            author: 'Arif Emin',
            authorAvatar: 'AE',
            authorColor: 'ff7043',
            date: '6 May 2025',
            text: 'Harika olmuş, responsive tarafında birkaç sorun var gibi. Mobile view\'da menu problemi yaşayabiliyoruz.',
            attachments: []
        },
        {
            id: 9,
            author: 'Bedirhan Özmen',
            authorAvatar: 'BO',
            authorColor: 'ffd600',
            date: '7 May 2025',
            text: 'Mobile menu sorunları giderildi, güncel versiyonu inceleyebilirsiniz.',
            attachments: [{
                name: 'mobile-menu-fix.png',
                size: '0.9 MB',
                type: 'image/png'
            }]
        }
    ],
    'COL-10': [],
    'COL-12': [
        {
            id: 10,
            author: 'Bahrı Talha Baş',
            authorAvatar: 'BT',
            authorColor: '18a0fb',
            date: '22 May 2025',
            text: 'İş akışları diyagramı oluşturuldu, sprint toplantısında sunum yapabiliriz.',
            attachments: [{
                name: 'workflow-diagram.pdf',
                size: '3.2 MB',
                type: 'application/pdf'
            }]
        }
    ],
    'COL-9': [
        {
            id: 11,
            author: 'Melike Danışmaz',
            authorAvatar: 'MD',
            authorColor: '9c27b0',
            date: '19 May 2025',
            text: 'Otomasyon projesinin temel yapısı oluşturuldu, CI/CD pipeline üzerinde çalışıyorum.',
            attachments: []
        }
    ]
};

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    // Tüm yorum butonlarını bul
    const commentButtons = document.querySelectorAll('.comment-btn');
    
    // Her butona tıklama olayı ekle
    commentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const taskCode = this.getAttribute('data-task-code');
            openCommentModal(taskCode);
        });
    });
    
    // Kapatma butonuna olay ekle
    const closeButton = document.getElementById('closeCommentModal');
    if (closeButton) {
        closeButton.addEventListener('click', closeCommentModal);
    }
    
    // Modal dışına tıklandığında kapat
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('commentModal');
        if (event.target === modal) {
            closeCommentModal();
        }
    });
    
    // ESC tuşuna basarak kapatma
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeCommentModal();
        }
    });
    
    // Yorum formunu gönderme olayı
    const commentForm = document.getElementById('commentForm');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addComment();
        });
    }
    
    // Dosya seçme olayı
    const commentFile = document.getElementById('commentFile');
    const selectedFileName = document.getElementById('selectedFileName');
    
    if (commentFile && selectedFileName) {
        commentFile.addEventListener('change', function() {
            if (this.files.length > 0) {
                const file = this.files[0];
                const fileSize = (file.size / (1024 * 1024)).toFixed(2); // MB cinsinden
                selectedFileName.textContent = `${file.name} (${fileSize} MB)`;
            } else {
                selectedFileName.textContent = '';
            }
        });
    }
});

// Yorum modalını aç
function openCommentModal(taskCode) {
    const modal = document.getElementById('commentModal');
    const taskCodeSpan = document.getElementById('commentTaskCode');
    const commentsContainer = document.getElementById('commentsContainer');
    
    // Görev kodunu ayarla
    taskCodeSpan.textContent = taskCode;
    
    // Yorumları render et
    renderComments(taskCode, commentsContainer);
    
    // Modalı göster
    modal.style.display = 'flex';
    
    // Sayfa scrollunu devre dışı bırak
    document.body.style.overflow = 'hidden';
}

function closeCommentModal() {
    const modal = document.getElementById('commentModal');
    modal.style.display = 'none';
    
    // Sayfa scrollunu tekrar etkinleştir
    document.body.style.overflow = 'auto';
}

// Yorumları render et
function renderComments(taskCode, container) {
    container.innerHTML = ''; // Mevcut yorumları temizle
    
    const taskComments = comments[taskCode] || [];
    
    // Yorumlar u00e7eru00e7evesi oluu015ftur
    const commentsFrame = document.createElement('div');
    commentsFrame.className = 'comments-frame';
    
    // Yorumlar bau015flu0131u011fu0131 ekle
    const commentsHeader = document.createElement('div');
    commentsHeader.className = 'comments-frame-header';
    commentsHeader.innerHTML = `<h3>Yorumlar (${taskComments.length})</h3>`;
    commentsFrame.appendChild(commentsHeader);
    
    // Yorumlar iu00e7eriu011fi
    const commentsContent = document.createElement('div');
    commentsContent.className = 'comments-frame-content';
    
    if (taskComments.length === 0) {
        commentsContent.innerHTML = '<div class="no-comments">Bu gu00f6rev iu00e7in henu00fcz yorum yapu0131lmamu0131u015f.</div>';
    } else {
        taskComments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            
            let attachmentsHtml = '';
            if (comment.attachments && comment.attachments.length > 0) {
                attachmentsHtml = `
                    <div class="comment-attachments">
                        ${comment.attachments.map(attachment => `
                            <div class="attachment">
                                <i class="fas fa-paperclip"></i>
                                <span class="attachment-name">${attachment.name}</span>
                                <span class="attachment-size">${attachment.size}</span>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            
            commentElement.innerHTML = `
                <div class="comment-header">
                    <div class="comment-author">
                        <img src="https://ui-avatars.com/api/?name=${comment.authorAvatar}&background=${comment.authorColor}&color=fff" class="avatar comment-avatar" title="${comment.author}">
                        <span>${comment.author}</span>
                    </div>
                    <div class="comment-date">${comment.date}</div>
                </div>
                <div class="comment-content">${comment.text}</div>
                ${attachmentsHtml}
            `;
            
            commentsContent.appendChild(commentElement);
        });
    }
    
    commentsFrame.appendChild(commentsContent);
    container.appendChild(commentsFrame);
}

// Yeni yorum ekle
function addComment() {
    const taskCode = document.getElementById('commentTaskCode').textContent;
    const commentText = document.getElementById('commentText').value;
    const commentFile = document.getElementById('commentFile');
    
    if (!commentText.trim()) return;
    
    // Yeni yorum oluu015ftur
    const newComment = {
        id: Date.now(), // Benzersiz ID iu00e7in timestamp kullan
        author: 'Melike Danu0131u015fmaz', // Varsayu0131lan kullanu0131cu0131
        authorAvatar: 'MD',
        authorColor: '9c27b0',
        date: formatDate(new Date()),
        text: commentText,
        attachments: []
    };
    
    // Dosya eklendiyse
    if (commentFile.files.length > 0) {
        const file = commentFile.files[0];
        const fileSize = (file.size / (1024 * 1024)).toFixed(2); // MB cinsinden
        
        newComment.attachments.push({
            name: file.name,
            size: `${fileSize} MB`,
            type: file.type
        });
    }
    
    // Yorumu ekle
    if (!comments[taskCode]) {
        comments[taskCode] = [];
    }
    comments[taskCode].push(newComment);
    
    // Yorumlaru0131 yeniden render et
    const commentsContainer = document.getElementById('commentsContainer');
    renderComments(taskCode, commentsContainer);
    
    // Formu temizle
    document.getElementById('commentText').value = '';
    document.getElementById('commentFile').value = '';
    document.getElementById('selectedFileName').textContent = '';
    
    // Yorum sayu0131su0131nu0131 gu00fcncelle
    updateCommentCount(taskCode);
}

// Yorum sayu0131su0131nu0131 gu00fcncelle
function updateCommentCount(taskCode) {
    const commentButtons = document.querySelectorAll(`.comment-btn[data-task-code="${taskCode}"]`);
    const commentCount = comments[taskCode].length;
    
    commentButtons.forEach(button => {
        button.innerHTML = `<i class="fas fa-comment"></i> ${commentCount} yorum`;
    });
}

// Modalu0131 kapat
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Tarih formatla
function formatDate(date) {
    const day = date.getDate();
    const monthNames = ['Oca', 'u015eub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Au011fu', 'Eyl', 'Eki', 'Kas', 'Ara'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}
