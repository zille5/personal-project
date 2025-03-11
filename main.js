document.addEventListener('DOMContentLoaded', function () {
    const wishInput = document.getElementById('wishInput');
    const addWishBtn = document.getElementById('addWishBtn');
    const wishList = document.getElementById('wishList');
    const emptyState = document.getElementById('emptyState');
    const categoryBtns = document.querySelectorAll('.category-btn');

    if (wishInput && addWishBtn && wishList) {
        loadWishes(); // Load wishes from localStorage

        addWishBtn.addEventListener('click', addWish);
        wishInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                addWish();
            }
        });

        if (categoryBtns) {
            categoryBtns.forEach(btn => {
                btn.addEventListener('click', function () {
                    categoryBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');

                    const category = this.getAttribute('data-category');
                    filterWishesByCategory(category);
                });
            });
        }
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const nombre = document.getElementById('ph-nombre').value;
            const email = document.getElementById('ph-mail').value;
            const telefono = document.getElementById('ph-tfno').value;
            const asunto = document.getElementById('ph-asunto').value;
            const mensaje = document.getElementById('ph-mensaje').value;

            if (!nombre || !email || !telefono || !asunto || !mensaje) {
                e.preventDefault();
                alert('Por favor, complete todos los campos obligatorios.');
            }
        });
    }

    function addWish() {
        const wishText = wishInput.value.trim();
        if (wishText) {
            const categories = ['travel', 'material', 'experience'];
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];

            const li = document.createElement('li');
            li.setAttribute('data-category', randomCategory);
            li.innerHTML = `
                <span>${wishText}</span>
                <div class="wish-actions">
                    <button class="remove" onclick="removeWish(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;

            wishList.appendChild(li);
            wishInput.value = '';

            if (emptyState) emptyState.style.display = 'none';

            saveWishes(); // Save updated wishlist
        }
    }

    function removeWish(button) {
        const wishItem = button.closest('li');
        wishItem.remove();
        saveWishes();

        if (!wishList.children.length && emptyState) {
            emptyState.style.display = 'block';
        }
    }

    function saveWishes() {
        const wishes = [];
        wishList.querySelectorAll('li').forEach(item => {
            wishes.push({
                text: item.querySelector('span').innerText,
                category: item.getAttribute('data-category')
            });
        });
        localStorage.setItem('wishlist', JSON.stringify(wishes));
    }

    function loadWishes() {
        const storedWishes = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishList.innerHTML = '';

        if (storedWishes.length > 0) {
            storedWishes.forEach(wish => {
                const li = document.createElement('li');
                li.setAttribute('data-category', wish.category);
                li.innerHTML = `
                    <span>${wish.text}</span>
                    <div class="wish-actions">
                        <button class="remove" onclick="removeWish(this)">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;
                wishList.appendChild(li);
            });

            if (emptyState) emptyState.style.display = 'none';
        } else {
            if (emptyState) emptyState.style.display = 'block';
        }
    }

    function filterWishesByCategory(category) {
        wishList.querySelectorAll('li').forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
});

wishList.addEventListener('click', function (e) {
    if (e.target.closest('.remove')) {
        const wishItem = e.target.closest('li');
        wishItem.remove();
        saveWishes();

        if (!wishList.children.length && emptyState) {
            emptyState.style.display = 'block';
        }
    }
});
