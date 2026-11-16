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
