// Wishlist functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the wishlist page
    const wishInput = document.getElementById('wishInput');
    const addWishBtn = document.getElementById('addWishBtn');
    const wishList = document.getElementById('wishList');
    const emptyState = document.getElementById('emptyState');
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    if (wishInput && addWishBtn && wishList) {
        // Load wishes from localStorage
        loadWishes();
        
        // Add wish when button is clicked
        addWishBtn.addEventListener('click', function() {
            addWish();
        });
        
        // Add wish when Enter key is pressed
        wishInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addWish();
            }
        });
        
        // Category filtering
        if (categoryBtns) {
            categoryBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Remove active class from all buttons
                    categoryBtns.forEach(b => b.classList.remove('active'));
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Filter wishes by category
                    const category = this.getAttribute('data-category');
                    filterWishesByCategory(category);
                });
            });
        }
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // If you want to perform validation before submission
            const nombre = document.getElementById('ph-nombre').value;
            const email = document.getElementById('ph-mail').value;
            const telefono = document.getElementById('ph-tfno').value;
            const asunto = document.getElementById('ph-asunto').value;
            const mensaje = document.getElementById('ph-mensaje').value;
            
            if (!nombre || !email || !telefono || !asunto || !mensaje) {
                e.preventDefault();
                alert('Por favor, complete todos los campos obligatorios.');
            }
            
            // If everything is valid, the form will submit to thank-you.html
        });
    }
    
    // Functions for wishlist management
    function addWish() {
        const wishText = wishInput.value.trim();
        if (wishText) {
            // Create random category for demo purposes
            const categories = ['travel', 'material', 'experience'];
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            
            // Create new wish item
            const li = document.createElement('li');
            li.setAttribute('data-category', randomCategory);
            
            // Fixed: Properly enclosed the HTML content in backticks
            li.innerHTML = `
                <span>${wishText}</span>
                <div class="wish-actions">
                    <button class="remove" onclick="removeWish(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            
            // Add the new wish to the list
            wishList.appendChild(li);
            
            // Clear the input field
            wishInput.value = '';
            
            // Hide empty state if visible
            if (emptyState) {
                emptyState.style.display = 'none';
            }