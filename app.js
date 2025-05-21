// Örnek görev verileri
const tasks = [
    {
        id: 1,
        title: "UX/UI Tasarımı",
        code: "COL-4",
        assignee: "Bedirhan Özmen",
        assigneeAvatar: "BO",
        status: "DEVAM EDİYOR",
        category: "ux/ui",
        dueDate: "20 Mar 2025"
    },
    {
        id: 2,
        title: "Api geliştirme",
        code: "COL-3",
        assignee: "Ömer Faruk Bingöl",
        assigneeAvatar: "OFB",
        status: "DEVAM EDİYOR",
        category: "backend",
        dueDate: "20 Mar 2025"
    },
    {
        id: 3,
        title: "Login Page kodlama",
        code: "COL-5",
        assignee: "Ceren Yolur",
        assigneeAvatar: "CY",
        status: "DEVAM EDİYOR",
        category: "frontend",
        dueDate: "20 Mar 2025"
    },
    {
        id: 4,
        title: "Veri Tabanı Tasarımı",
        code: "COL-6",
        assignee: "Emre Kandazoğlu",
        assigneeAvatar: "EK",
        status: "DEVAM EDİYOR",
        category: "database",
        dueDate: "20 Mar 2025"
    },
    {
        id: 5,
        title: "Veri Tabanı Tasarımı",
        code: "COL-11",
        assignee: "Büşra Özer",
        assigneeAvatar: "BÖ",
        status: "DEVAM EDİYOR",
        category: "database",
        dueDate: "20 Mar 2025"
    },
    {
        id: 6,
        title: "Frontend Geliştirme",
        code: "COL-10",
        assignee: "Arif Emin Köklü",
        assigneeAvatar: "AK",
        status: "YAPILACAKLAR",
        category: "frontend",
        dueDate: "20 Mar 2025"
    },
    {
        id: 7,
        title: "İş akışları",
        code: "COL-12",
        assignee: "Bahrı Talha Baş",
        assigneeAvatar: "BB",
        status: "YAPILACAKLAR",
        category: "is analizi",
        dueDate: "20 Mar 2025"
    }
];

// Sayfa yükleme işlemleri
document.addEventListener('DOMContentLoaded', function() {
    // Görünüm değiştirme işlemleri
    const viewLinks = document.querySelectorAll('.nav-link');
    viewLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const view = this.getAttribute('href');
            if (view && view !== '#') {
                window.location.href = view;
            }
        });
    });

    // Sidebar butonlarına tıklandığında modal açılması
    const enSonButton = document.querySelector('.nav-item:nth-child(2)'); // En son butonu
    const favoriButton = document.querySelector('.nav-item:nth-child(3)'); // Favori butonu
    const sidebarModal = document.getElementById('sidebarModal');
    const closeSidebarModal = document.getElementById('closeSidebarModal');
    const modalTitle = document.getElementById('modalTitle');
    
    // En son butonu için
    if (enSonButton && sidebarModal) {
        enSonButton.addEventListener('click', function(e) {
            e.preventDefault();
            modalTitle.textContent = 'En son';
            sidebarModal.style.display = 'block';
            // İçerik bölümlerini göster/gizle
            document.getElementById('enSonContent').style.display = 'block';
            document.getElementById('favoriContent').style.display = 'none';
            // Modal'ın pozisyonunu ayarla
            positionModalNextToSidebar();
        });
    }
    
    // Favori butonu için
    if (favoriButton && sidebarModal) {
        favoriButton.addEventListener('click', function(e) {
            e.preventDefault();
            modalTitle.textContent = 'Favori';
            sidebarModal.style.display = 'block';
            // İçerik bölümlerini göster/gizle
            document.getElementById('enSonContent').style.display = 'none';
            document.getElementById('favoriContent').style.display = 'block';
            // Modal'ın pozisyonunu ayarla
            positionModalNextToSidebar();
        });
    }
    
    // Modal'ı kapatma butonu
    if (closeSidebarModal) {
        closeSidebarModal.addEventListener('click', function() {
            sidebarModal.style.display = 'none';
        });
    }
    
    // Modal dışına tıklandığında kapanması
    window.addEventListener('click', function(e) {
        if (e.target === sidebarModal) {
            sidebarModal.style.display = 'none';
        }
    });
    
    // Modal'ı sidebar'ın yanında konumlandır
    function positionModalNextToSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const modalContent = sidebarModal.querySelector('.modal-content');
        
        if (sidebar && modalContent) {
            const sidebarRect = sidebar.getBoundingClientRect();
            modalContent.style.position = 'absolute';
            modalContent.style.left = (sidebarRect.width + 10) + 'px';
            modalContent.style.top = '50px';
            modalContent.style.transform = 'none';
        }
    }

    // Eğer liste sayfasındaysak, görevleri listele
    if (window.location.pathname.includes('list.html')) {
        renderTaskList();
    } else {
        // Pano sayfasındaysak, kartları göster
        renderTaskBoard();
    }

    setupModalListeners();
});

// Liste görünümünde görevleri render et
function renderTaskList() {
    const listBody = document.querySelector('.list-body');
    if (!listBody) return;

    listBody.innerHTML = tasks.map(task => `
        <div class="list-row">
            <div class="list-cell checkbox-cell">
                <input type="checkbox">
            </div>
            <div class="list-cell">
                <i class="fas ${getCategoryIcon(task.category)}"></i>
            </div>
            <div class="list-cell">${task.code}</div>
            <div class="list-cell">${task.title}</div>
            <div class="list-cell">
                <span class="status-badge ${getStatusClass(task.status)}">${task.status}</span>
            </div>
            <div class="list-cell">
                <span class="category-badge ${task.category}">${task.category}</span>
            </div>
            <div class="list-cell">
                <img src="https://ui-avatars.com/api/?name=${task.assigneeAvatar}&background=8972e7&color=fff" 
                     alt="${task.assignee}" 
                     class="avatar" 
                     title="${task.assignee}">
            </div>
            <div class="list-cell">${task.dueDate}</div>
            <div class="list-cell"><i class="fas fa-arrow-up priority-high"></i></div>
            <div class="list-cell"><span class="tag">${getTaskTag(task)}</span></div>
            <div class="list-cell">13 Mar 2025</div>
            <div class="list-cell">27 Mar 2025</div>
            <div class="list-cell">
                <img src="https://ui-avatars.com/api/?name=MD&background=84809c&color=fff" 
                     alt="Meltem Danışmaz" 
                     class="avatar" 
                     title="Meltem Danışmaz">
            </div>
            <div class="list-cell actions-cell">
                <button class="action-btn"><i class="fas fa-ellipsis-h"></i></button>
        </div>
    `).join('');
}

// Görev etiketi al
function getTaskTag(task) {
    const tags = {
        'frontend': 'Frontend',
        'backend': 'API',
        'database': 'DB',
        'ux/ui': 'UI',
        'is analizi': 'Analiz'
    };
    return tags[task.category] || task.category;
}

// Pano görünümünde görevleri render et
function renderTaskBoard() {
    // Tüm sütunları dinamik olarak al
    const columnElements = document.querySelectorAll('.column');
    const columns = {};
    
    // Her sütun için task-list elementini al ve columns nesnesine ekle
    columnElements.forEach(column => {
        const columnId = column.id;
        const taskList = column.querySelector('.task-list');
        if (columnId && taskList) {
            columns[columnId] = taskList;
            
            // Her sütunu drop zone olarak ayarla
            setupDropZone(taskList);
            
            // Sütun içeriğini temizle
            taskList.innerHTML = '';
        }
    });
    
    // Temel sütunlar yoksa işlemi durdur
    if (!columns.yapilacaklar) return;

    // Görevleri uygun sütunlara yerleştir
    tasks.forEach(task => {
        let targetColumnId;
        
        // Görev durumuna göre hedef sütunu belirle
        switch(task.status) {
            case 'YAPILACAKLAR':
                targetColumnId = 'yapilacaklar';
                break;
            case 'DEVAM EDİYOR':
                targetColumnId = 'devamEdiyor';
                break;
            case 'TAMAM':
                targetColumnId = 'tamam';
                break;
            default:
                // Özel durum sütunları için (kullanıcının eklediği sütunlar)
                // Sütun ID'sini küçük harfli ve tire ile ayrılmış formata çevir
                targetColumnId = task.status.toLowerCase().replace(/\s+/g, '-');
        }
        
        // Hedef sütun varsa görevi ekle
        if (columns[targetColumnId]) {
            const taskCard = createTaskCard(task);
            columns[targetColumnId].appendChild(taskCard);
        } else {
            // Hedef sütun yoksa varsayılan olarak yapilacaklar sütununa ekle
            const taskCard = createTaskCard(task);
            columns.yapilacaklar.appendChild(taskCard);
        }
    });
}

// Görev kartı oluştur
function createTaskCard(task) {
    const div = document.createElement('div');
    div.className = 'task-card';
    div.draggable = true;
    div.dataset.taskId = task.id;

    div.innerHTML = `
        <h3>${task.title}</h3>
        <div class="task-meta">
            <span class="task-code">${task.code}</span>
            <span>${task.assignee}</span>
            <span>${task.dueDate}</span>
        </div>
    `;

    setupDragAndDrop(div);
    return div;
}

// Yardımcı fonksiyonlar
function getCategoryIcon(category) {
    const icons = {
        'frontend': 'fa-laptop-code',
        'backend': 'fa-server',
        'database': 'fa-database',
        'ux/ui': 'fa-palette',
        'is analizi': 'fa-sitemap',
        'test': 'fa-vial'
    };
    return icons[category] || 'fa-tasks';
}

function getStatusClass(status) {
    return status.toLowerCase().replace(/\s+/g, '-');
}

// Sürükle-bırak işlemleri
let draggedTask = null;

function setupDragAndDrop(element) {
    element.addEventListener('dragstart', (e) => {
        draggedTask = element;
        element.classList.add('dragging');
        e.dataTransfer.setData('text/plain', element.dataset.taskId);
    });

    element.addEventListener('dragend', () => {
        draggedTask = null;
        element.classList.remove('dragging');
    });
}

function setupDropZone(element) {
    element.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(element, e.clientY);
        if (draggedTask) {
            if (afterElement) {
                element.insertBefore(draggedTask, afterElement);
            } else {
                element.appendChild(draggedTask);
            }
        }
    });

    element.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedTask) {
            const newStatus = element.closest('.column').id;
            const taskId = parseInt(draggedTask.dataset.taskId);
            updateTaskStatus(taskId, newStatus);
        }
    });
}

// Sürüklenen kartın konumunu belirle
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.task-card:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Görev durumunu güncelle
function updateTaskStatus(taskId, newStatus) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        // Temel sütunlar için durum güncellemesi
        if (newStatus === 'yapilacaklar') {
            task.status = 'YAPILACAKLAR';
        } else if (newStatus === 'devamEdiyor') {
            task.status = 'DEVAM EDİYOR';
        } else if (newStatus === 'tamam') {
            task.status = 'TAMAM';
        } else {
            // Özel sütunlar için (kullanıcının eklediği sütunlar)
            // Sütun ID'sini büyük harfli ve boşluklu formata çevir
            task.status = newStatus.toUpperCase().replace(/-/g, ' ');
        }
        
        // Görev sayılarını güncelle
        updateAllTaskCounts();
    }
    
    console.log(`Görev ${task.code} durumu güncellendi: ${task.status}`);
}

// Tüm sütunların görev sayılarını güncelle
function updateAllTaskCounts() {
    const columns = document.querySelectorAll('.column');
    columns.forEach(column => {
        const columnId = column.id;
        const taskCount = column.querySelectorAll('.task-card').length;
        const taskCountElement = column.querySelector('.task-count');
        if (taskCountElement) {
            taskCountElement.textContent = taskCount;
        }
    });
}

function setupModalListeners() {
    const modal = document.getElementById('taskForm');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn && modal) {
        closeBtn.onclick = () => modal.style.display = 'none';
        window.onclick = (e) => {
            if (e.target == modal) modal.style.display = 'none';
        }
    }
}

// Görev formu gösterme ve kapatma
function showTaskForm(column) {
    const modal = document.getElementById('taskForm');
    if (modal) {
        modal.style.display = "block";
        window.targetColumn = column;
        
        // Tarih alanını bugünden başlayacak şekilde ayarla
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('taskDueDate').min = today;
    }
}

function closeTaskForm() {
    const modal = document.getElementById('taskForm');
    if (modal) {
        modal.style.display = "none";
        document.getElementById('newTaskForm').reset();
    }
}

// Form gönderme işlemi
document.getElementById('newTaskForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('taskTitle').value;
    const code = document.getElementById('taskCode').value;
    const assignee = document.getElementById('taskAssignee').value;
    const category = document.getElementById('taskCategory').value;
    const dueDate = document.getElementById('taskDueDate').value;
    const priority = document.getElementById('taskPriority').value;
    const description = document.getElementById('taskDescription').value;

    // Yeni görev oluştur
    const newTask = {
        id: tasks.length + 1,
        title: title,
        code: code,
        assignee: assignee,
        assigneeAvatar: getInitials(assignee),
        status: 'YAPILACAKLAR',
        category: category,
        dueDate: formatDate(dueDate),
        priority: priority,
        description: description,
        createdAt: formatDate(new Date()),
        updatedAt: formatDate(new Date()),
        reporter: 'Meltem Danışmaz'
    };

    // Görevi listeye ekle
    tasks.push(newTask);

    // Görevi panoya ekle
    if (window.location.pathname.includes('list.html')) {
        renderTaskList();
    } else {
        renderTaskBoard();
    }

    // Formu kapat
    closeTaskForm();
});

// Yardımcı fonksiyonlar
function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('');
}

function formatDate(date) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('tr-TR', { month: 'short' }).format(date);
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

// Modal dışına tıklandığında kapatma
window.addEventListener('click', function(e) {
    const modal = document.getElementById('taskForm');
    if (e.target === modal) {
        closeTaskForm();
    }
});
