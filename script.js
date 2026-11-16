const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');
const searchInput = document.getElementById('searchInput');

let currentFilter = 'all';

// ฟังก์ชันกรองการ์ดทั้งจากปุ่มหมวดหมู่และช่องค้นหา
function filterCards() {
    const searchText = searchInput.value.toLowerCase().trim();

    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const cardTitle = card.querySelector('h3').textContent.toLowerCase();
        const cardDesc = card.querySelector('p').textContent.toLowerCase();

        const matchesCategory = (currentFilter === 'all' || currentFilter === cardCategory);
        const matchesSearch = (cardTitle.includes(searchText) || cardDesc.includes(searchText));

        if (matchesCategory && matchesSearch) {
            card.classList.remove('hide');
        } else {
            card.classList.add('hide');
        }
    });
}

// เมื่อคลิกปุ่มหมวดหมู่
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        currentFilter = button.getAttribute('data-filter');
        filterCards();
    });
});

// เมื่อพิมพ์ในช่องค้นหา
searchInput.addEventListener('input', filterCards);

// สร้างหน้าต่างป๊อปอัป (Modal) สำหรับแสดงรายละเอียดเมื่อกดการ์ด
const modalOverlay = document.createElement('div');
modalOverlay.className = 'modal-overlay';
modalOverlay.innerHTML = `
    <div class="modal-box">
        <button class="modal-close" title="ปิดหน้าต่าง">&times;</button>
        <img class="modal-img" src="" alt="">
        <div class="modal-body">
            <div class="modal-tags">
                <span class="modal-badge"></span>
                <span class="modal-origin"></span>
            </div>
            <h2 class="modal-title"></h2>
            <p class="modal-desc"></p>
            <div class="modal-stats"></div>
        </div>
    </div>
`;
document.body.appendChild(modalOverlay);

const modalImg = modalOverlay.querySelector('.modal-img');
const modalBadge = modalOverlay.querySelector('.modal-badge');
const modalOrigin = modalOverlay.querySelector('.modal-origin');
const modalTitle = modalOverlay.querySelector('.modal-title');
const modalDesc = modalOverlay.querySelector('.modal-desc');
const modalStats = modalOverlay.querySelector('.modal-stats');
const modalClose = modalOverlay.querySelector('.modal-close');

// เมื่อคลิกที่การ์ดแต่ละใบ ให้ดึงข้อมูลมาแสดงในป๊อปอัป
cards.forEach(card => {
    card.addEventListener('click', () => {
        modalImg.src = card.querySelector('img').src;
        modalImg.alt = card.querySelector('h3').textContent;
        modalBadge.textContent = card.querySelector('.badge').textContent;
        modalOrigin.textContent = card.querySelector('.origin-tag').textContent;
        modalTitle.textContent = card.querySelector('h3').textContent;
        modalDesc.textContent = card.querySelector('p').textContent;
        modalStats.textContent = card.querySelector('.stats').textContent;

        modalOverlay.classList.add('show');
    });
});

// ปิดป๊อปอัปเมื่อกดปุ่มกากบาท หรือกดพื้นที่มืดด้านนอก
modalClose.addEventListener('click', () => modalOverlay.classList.remove('show'));
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('show');
    }
});
