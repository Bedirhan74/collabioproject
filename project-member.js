// Proje Katu0131lu0131mcu0131 Ekleme ve Proje Du00fczenleme u0130u015flevselliu011fi

document.addEventListener('DOMContentLoaded', function() {
    // Proje katu0131lu0131mcu0131 ekleme butonunu bul
    const projectMemberBtn = document.querySelector('.project-member-btn');
    
    // Modal elementlerini bul
    const projectModal = document.getElementById('projectModal');
    const closeProjectModal = document.getElementById('closeProjectModal');
    const cancelProjectBtn = document.getElementById('cancelProjectBtn');
    const saveProjectBtn = document.getElementById('saveProjectBtn');
    const projectTabs = document.querySelectorAll('.project-tab');
    const projectTabContents = document.querySelectorAll('.project-tab-content');
    
    // Proje katu0131lu0131mcu0131 ekleme butonuna tu0131klama olayu0131 ekle
    if (projectMemberBtn) {
        projectMemberBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Projeye tu0131klama olayu0131nu0131n tetiklenmesini engelle
            openProjectModal(this.getAttribute('data-project-id'));
        });
    }
    
    // Modalu0131 kapatma butonlaru0131na tu0131klama olayu0131 ekle
    if (closeProjectModal) {
        closeProjectModal.addEventListener('click', closeModal);
    }
    
    if (cancelProjectBtn) {
        cancelProjectBtn.addEventListener('click', closeModal);
    }
    
    // Modal du0131u015fu0131na tu0131klandu0131u011fu0131nda kapat
    window.addEventListener('click', function(event) {
        if (event.target === projectModal) {
            closeModal();
        }
    });
    
    // ESC tuu015funa basu0131ldu0131u011fu0131nda modalu0131 kapat
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
    
    // Proje detaylaru0131nu0131 kaydet butonuna tu0131klama olayu0131 ekle
    if (saveProjectBtn) {
        saveProjectBtn.addEventListener('click', saveProjectDetails);
    }
    
    // Tab'lar arasu0131 geu00e7iu015f iu00e7in olay ekle
    projectTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Aktif tab'laru0131 kaldu0131r
            projectTabs.forEach(t => t.classList.remove('active'));
            projectTabContents.forEach(c => c.classList.remove('active'));
            
            // Tu0131klanan tab'a active su0131nu0131fu0131 ekle
            this.classList.add('active');
            
            // u0130lgili iu00e7eriu011fi gu00f6ster
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId + 'Tab').classList.add('active');
        });
    });
    
    // Yeni katu0131lu0131mcu0131 ekleme formu gu00f6nderme olayu0131
    const addMemberForm = document.getElementById('addMemberForm');
    if (addMemberForm) {
        addMemberForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewMember();
        });
    }
    
    // u00dcye du00fczenleme ve silme butonlaru0131 iu00e7in olay ekle
    const memberActionBtns = document.querySelectorAll('.member-action-btn');
    memberActionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.querySelector('i').classList.contains('fa-pencil-alt') ? 'edit' : 'delete';
            const memberItem = this.closest('.member-item');
            const memberName = memberItem.querySelector('.member-name').textContent;
            
            if (action === 'edit') {
                editMember(memberItem);
            } else {
                deleteMember(memberItem, memberName);
            }
        });
    });
});

// Modalu0131 au00e7ma fonksiyonu
function openProjectModal(projectId) {
    const projectModal = document.getElementById('projectModal');
    const projectNameSpan = document.getElementById('projectName');
    
    // Proje adu0131nu0131 ayarla
    if (projectNameSpan) {
        // Geru00e7ek uygulamada bu veri veritabanu0131ndan gelecektir
        projectNameSpan.textContent = 'Collabio';
    }
    
    // Modalu0131 gu00f6ster
    if (projectModal) {
        projectModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Sayfa scrollunu devre du0131u015fu0131 bu0131rak
    }
}

// Modalu0131 kapatma fonksiyonu
function closeModal() {
    const projectModal = document.getElementById('projectModal');
    if (projectModal) {
        projectModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Sayfa scrollunu tekrar etkinleu015ftir
    }
}

// Proje detaylaru0131nu0131 kaydetme fonksiyonu
function saveProjectDetails() {
    const projectNameInput = document.getElementById('projectNameInput');
    const projectDescription = document.getElementById('projectDescription');
    const projectNameSpan = document.getElementById('projectName');
    
    if (projectNameInput && projectNameSpan) {
        // Proje adu0131nu0131 gu00fcncelle
        const newProjectName = projectNameInput.value.trim();
        if (newProjectName) {
            projectNameSpan.textContent = newProjectName;
            
            // Sidebar'daki proje adu0131nu0131 da gu00fcncelle
            const sidebarProjectName = document.querySelector('.project-item span');
            if (sidebarProjectName) {
                sidebarProjectName.textContent = newProjectName;
            }
            
            // Bau015faru0131lu0131 mesaju0131 gu00f6ster
            alert('Proje detaylaru0131 bau015faru0131yla gu00fcncellendi!');
            
            // Modalu0131 kapat
            closeModal();
        } else {
            alert('Proje adu0131 bou015f olamaz!');
        }
    }
}

// Yeni katu0131lu0131mcu0131 ekleme fonksiyonu
function addNewMember() {
    const memberName = document.getElementById('memberName');
    const memberRole = document.getElementById('memberRole');
    const memberList = document.querySelector('.member-list');
    
    if (memberName && memberRole && memberList) {
        const name = memberName.value.trim();
        const role = memberRole.value.trim();
        
        if (name && role) {
            // Rastgele bir renk oluu015ftur
            const colors = ['#9c27b0', '#18a0fb', '#ffd600', '#ff7043', '#00bfae'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            // u0130sim ku0131saltmasu0131nu0131 oluu015ftur
            const nameParts = name.split(' ');
            let initials = '';
            if (nameParts.length >= 2) {
                initials = nameParts[0].charAt(0) + nameParts[1].charAt(0);
            } else {
                initials = nameParts[0].substring(0, 2);
            }
            
            // Yeni u00fcye HTML'ini oluu015ftur
            const newMemberHTML = `
                <div class="member-item">
                    <div class="member-avatar" style="background-color: ${randomColor};">${initials.toUpperCase()}</div>
                    <div class="member-info">
                        <div class="member-name">${name}</div>
                        <div class="member-role">${role}</div>
                    </div>
                    <div class="member-actions">
                        <button class="member-action-btn"><i class="fas fa-pencil-alt"></i></button>
                        <button class="member-action-btn"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
            
            // Yeni u00fcyeyi listeye ekle
            memberList.insertAdjacentHTML('beforeend', newMemberHTML);
            
            // Formu temizle
            memberName.value = '';
            memberRole.value = '';
            
            // Yeni eklenen u00fcyenin butonlaru0131na olay ekle
            const newMemberItem = memberList.lastElementChild;
            const actionBtns = newMemberItem.querySelectorAll('.member-action-btn');
            
            actionBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const action = this.querySelector('i').classList.contains('fa-pencil-alt') ? 'edit' : 'delete';
                    const memberItem = this.closest('.member-item');
                    const memberName = memberItem.querySelector('.member-name').textContent;
                    
                    if (action === 'edit') {
                        editMember(memberItem);
                    } else {
                        deleteMember(memberItem, memberName);
                    }
                });
            });
        } else {
            alert('Lu00fctfen tu00fcm alanlaru0131 doldurun!');
        }
    }
}

// u00dcye du00fczenleme fonksiyonu
function editMember(memberItem) {
    const memberName = memberItem.querySelector('.member-name').textContent;
    const memberRole = memberItem.querySelector('.member-role').textContent;
    
    const newName = prompt('Katu0131lu0131mcu0131 adu0131nu0131 du00fczenleyin:', memberName);
    if (newName !== null) {
        const newRole = prompt('Katu0131lu0131mcu0131 rolu00fcnu00fc du00fczenleyin:', memberRole);
        if (newRole !== null) {
            // u0130sim ve rolu00fc gu00fcncelle
            memberItem.querySelector('.member-name').textContent = newName;
            memberItem.querySelector('.member-role').textContent = newRole;
            
            // u0130sim ku0131saltmasu0131nu0131 gu00fcncelle
            const nameParts = newName.split(' ');
            let initials = '';
            if (nameParts.length >= 2) {
                initials = nameParts[0].charAt(0) + nameParts[1].charAt(0);
            } else {
                initials = nameParts[0].substring(0, 2);
            }
            
            memberItem.querySelector('.member-avatar').textContent = initials.toUpperCase();
        }
    }
}

// u00dcye silme fonksiyonu
function deleteMember(memberItem, memberName) {
    if (confirm(`${memberName} adlu0131 katu0131lu0131mcu0131yu0131 silmek istediu011finizden emin misiniz?`)) {
        memberItem.remove();
    }
}
