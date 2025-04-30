// Pano işlevselliği için JavaScript kodu
document.addEventListener('DOMContentLoaded', function() {
    // Tüm sütun ekle butonlarını seç
    const addColumnBtns = [
        document.getElementById('add-column-btn-yapilacaklar'),
        document.getElementById('add-column-btn-devamEdiyor'),
        document.getElementById('add-column-btn-beklemede'),
        document.getElementById('add-column-btn-tamam')
    ];
    
    // Her sütun ekle butonuna tıklandığında yeni sütun ekleme modalini göster
    addColumnBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                showAddColumnModal();
            });
        }
    });
    
    // Görev oluştur butonlarına işlevsellik ekle
    const addTaskBtns = document.querySelectorAll('.add-task-btn');
    addTaskBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                const columnId = this.closest('.column').id;
                showAddTaskModal(columnId);
            });
        }
    });
});

// Yeni sütun ekleme modalını göster
function showAddColumnModal() {
    // Modal HTML'i oluştur
    const modalHtml = `
        <div id="column-modal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Yeni Sütun Ekle</h2>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="modal-body">
                    <form id="add-column-form">
                        <div class="form-group">
                            <label for="column-name">Sütun Adı</label>
                            <input type="text" id="column-name" name="columnName" required>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">Ekle</button>
                            <button type="button" class="btn btn-secondary cancel-modal">İptal</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Modal'ı sayfaya ekle
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer.firstElementChild);
    
    const modal = document.getElementById('column-modal');
    const closeBtn = modal.querySelector('.close-modal');
    const cancelBtn = modal.querySelector('.cancel-modal');
    const form = modal.querySelector('#add-column-form');
    
    // Modal'ı göster
    modal.style.display = 'block';
    
    // Kapatma işlevselliği
    closeBtn.addEventListener('click', function() {
        closeModal(modal);
    });
    
    cancelBtn.addEventListener('click', function() {
        closeModal(modal);
    });
    
    // Modal dışına tıklandığında kapat
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
    
    // Form gönderildiğinde yeni sütun ekle
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const columnName = document.getElementById('column-name').value;
        if (columnName.trim() !== '') {
            addNewColumn(columnName);
            closeModal(modal);
        }
    });
}

// Modal'ı kapat
function closeModal(modal) {
    modal.style.display = 'none';
    modal.remove();
}

// Yeni sütun ekle
function addNewColumn(columnName) {
    // Sütun ID'si oluştur (küçük harflerle, boşluklar tire ile değiştirilmiş)
    const columnId = columnName.toLowerCase().replace(/\s+/g, '-');
    
    // Yeni sütun HTML'i
    const columnHtml = `
        <div class="column" id="${columnId}">
            <div class="column-header">
                <div class="column-title">
                    <h3>${columnName.toUpperCase()}</h3>
                    <span class="task-count">0</span>
                </div>
                <button class="column-add-btn" onclick="showTaskForm('${columnId}')" title="Bu sütuna görev ekle">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="task-list">
                <!-- Boş sütun -->
            </div>
        </div>
    `;
    
    // Yeni sütunu pano konteynerine ekle
    const boardContainer = document.querySelector('.board-container');
    const columnElement = document.createElement('div');
    columnElement.innerHTML = columnHtml;
    boardContainer.appendChild(columnElement.firstElementChild);
    
    // Yeni eklenen sütundaki "Oluştur" butonuna işlevsellik ekle
    const newColumn = document.getElementById(columnId);
    const addTaskBtn = newColumn.querySelector('.add-task-btn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', function() {
            showAddTaskModal(columnId);
        });
    }
    
        // Yeni sütun eklendikten sonra tüm panoyu yeniden render et
    if (typeof renderTaskBoard === 'function') {
        renderTaskBoard();
    }
    
    // Görev sayılarını güncelle
    if (typeof updateAllTaskCounts === 'function') {
        updateAllTaskCounts();
    }
}

// Görev ekleme modalını göster
function showAddTaskModal(columnId) {
    // Modal HTML'i oluştur
    const modalHtml = `
        <div id="task-modal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Yeni Görev Ekle</h2>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="modal-body">
                    <form id="add-task-form">
                        <input type="hidden" id="column-id" name="columnId" value="${columnId}">
                        <div class="form-group">
                            <label for="task-title">Görev Başlığı</label>
                            <input type="text" id="task-title" name="title" required>
                        </div>
                        <div class="form-group">
                            <label for="task-code">Görev Kodu</label>
                            <input type="text" id="task-code" name="code" placeholder="COL-XX" required>
                        </div>
                        <div class="form-group">
                            <label for="task-priority">Öncelik</label>
                            <select id="task-priority" name="priority">
                                <option value="high">Yüksek</option>
                                <option value="medium">Orta</option>
                                <option value="low">Düşük</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="task-assignee">Sorumlu</label>
                            <select id="task-assignee" name="assignee">
                                <option value="BT">Bahri Talha Baş</option>
                                <option value="MD">Melike Danışmaz</option>
                                <option value="ÖF">Ömer Faruk Bingöl</option>
                                <option value="CY">Ceren Yolur</option>
                                <option value="BO">Bedirhan Özmen</option>
                                <option value="AE">Arif Emink</option>
                            </select>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">Ekle</button>
                            <button type="button" class="btn btn-secondary cancel-modal">İptal</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Modal'ı sayfaya ekle
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer.firstElementChild);
    
    const modal = document.getElementById('task-modal');
    const closeBtn = modal.querySelector('.close-modal');
    const cancelBtn = modal.querySelector('.cancel-modal');
    const form = modal.querySelector('#add-task-form');
    
    // Modal'ı göster
    modal.style.display = 'block';
    
    // Kapatma işlevselliği
    closeBtn.addEventListener('click', function() {
        closeModal(modal);
    });
    
    cancelBtn.addEventListener('click', function() {
        closeModal(modal);
    });
    
    // Modal dışına tıklandığında kapat
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
    
    // Form gönderildiğinde yeni görev ekle
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('task-title').value;
        const code = document.getElementById('task-code').value;
        const priority = document.getElementById('task-priority').value;
        const assignee = document.getElementById('task-assignee').value;
        
        if (title.trim() !== '' && code.trim() !== '') {
            addNewTask(columnId, {
                title: title,
                code: code,
                priority: priority,
                assignee: assignee,
                date: '20 Mar 2025' // Varsayılan tarih
            });
            closeModal(modal);
        }
    });
}

// Yeni görev ekle
function addNewTask(columnId, taskData) {
    // Yeni görev nesnesi oluştur
    const newTask = {
        id: tasks.length + 1,
        code: taskData.code,
        title: taskData.title,
        status: columnId === 'yapilacaklar' ? 'YAPILACAKLAR' : 
                columnId === 'devamEdiyor' ? 'DEVAM EDİYOR' : 
                columnId === 'beklemede' ? 'BEKLEMEDE' : 'TAMAM',
        assignee: getAssigneeInfo(taskData.assignee).name,
        dueDate: taskData.date,
        priority: taskData.priority,
        category: 'frontend' // Varsayılan kategori
    };
    
    // Görevi global tasks dizisine ekle
    tasks.push(newTask);
    
    // Görev panosu görünümünü güncelle
    renderTaskBoard();
    
    // Görev sayısını güncelle
    updateTaskCount(columnId);
}

// Sorumlu kişi bilgilerini al
function getAssigneeInfo(assigneeCode) {
    const assignees = {
        'BT': { name: 'Bahri Talha Baş', color: '18a0fb', textColor: 'fff' },
        'MD': { name: 'Melike Danışmaz', color: '9c27b0', textColor: 'fff' },
        'ÖF': { name: 'Ömer Faruk Bingöl', color: '18a0fb', textColor: 'fff' },
        'CY': { name: 'Ceren Yolur', color: '9c27b0', textColor: 'fff' },
        'BO': { name: 'Bedirhan Özmen', color: 'ffd600', textColor: '333' },
        'AE': { name: 'Arif Emink', color: 'ff7043', textColor: 'fff' }
    };
    
    return assignees[assigneeCode] || { name: assigneeCode, color: 'cccccc', textColor: '333' };
}

// Görev sayısını güncelle
function updateTaskCount(columnId) {
    const column = document.getElementById(columnId);
    const taskCount = column.querySelectorAll('.task-card').length;
    const taskCountElement = column.querySelector('.task-count');
    taskCountElement.textContent = taskCount;
}

// Görev sayısını güncelle
function updateTaskCount(columnId) {
    const column = document.getElementById(columnId);
    if (column) {
        const taskCount = column.querySelectorAll('.task-card').length;
        const taskCountElement = column.querySelector('.task-count');
        if (taskCountElement) {
            taskCountElement.textContent = taskCount;
        }
    }
}

// CSS stillerini ekle
const styles = document.createElement('style');
styles.textContent = `
    .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }
    
    .modal-content {
        background-color: #fff;
        margin: 10% auto;
        padding: 0;
        border-radius: 4px;
        width: 400px;
        max-width: 90%;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        border-bottom: 1px solid #eee;
    }
    
    .modal-header h2 {
        margin: 0;
        font-size: 1.2rem;
    }
    
    .close-modal {
        font-size: 1.5rem;
        cursor: pointer;
        color: #aaa;
    }
    
    .close-modal:hover {
        color: #333;
    }
    
    .modal-body {
        padding: 16px;
    }
    
    .form-group {
        margin-bottom: 16px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 4px;
        font-weight: 500;
    }
    
    .form-group input,
    .form-group select {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    
    .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
    }
    
    .btn {
        padding: 8px 16px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
    }
    
    .btn-primary {
        background-color: var(--color-primary);
        color: white;
    }
    
    .btn-secondary {
        background-color: #f0f0f0;
        color: #333;
    }
    
    .drag-over {
        background-color: rgba(0, 120, 212, 0.05);
    }
    
    .dragging {
        opacity: 0.5;
    }
`;
document.head.appendChild(styles);
