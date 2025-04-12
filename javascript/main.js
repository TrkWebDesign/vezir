document.addEventListener('DOMContentLoaded', function() {
    // Loading screen functionality
    window.addEventListener('load', function() {
        const loadingScreen = document.getElementById('loading');
        
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 1000);
        }, 1100);
    });

    // Mobile Navigation - Fixed hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Toggle body overflow when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Menu Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and categories
            tabBtns.forEach(btn => btn.classList.remove('active'));
            menuCategories.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding category
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Reset show more/less buttons when switching tabs
            const currentCategory = document.getElementById(tabId);
            const items = currentCategory.querySelectorAll('.menu-item');
            const showMoreBtn = currentCategory.querySelector('.show-more-btn');
            const showLessBtn = currentCategory.querySelector('.show-less-btn');

            if (items.length > 3) {
                if (showMoreBtn) showMoreBtn.style.display = 'block';
                if (showLessBtn) showLessBtn.style.display = 'none';

                items.forEach((item, index) => {
                    if (index >= 3) {
                        item.classList.add('hidden-item');
                    }
                });
            }
        });
    });
    
    // Show more/less functionality for menu items
    document.querySelectorAll('.show-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const category = this.parentElement;
            const hiddenItems = category.querySelectorAll('.hidden-item');
            const showLessBtn = category.querySelector('.show-less-btn');

            hiddenItems.forEach(item => {
                item.classList.remove('hidden-item');
            });

            this.style.display = 'none';
            showLessBtn.style.display = 'block';
        });
    });

    document.querySelectorAll('.show-less-btn').forEach(button => {
        button.addEventListener('click', function() {
            const category = this.parentElement;
            const items = category.querySelectorAll('.menu-item');
            const showMoreBtn = category.querySelector('.show-more-btn');

            items.forEach((item, index) => {
                if (index >= 3) {
                    item.classList.add('hidden-item');
                }
            });

            this.style.display = 'none';
            showMoreBtn.style.display = 'block';
        });
    });

    // Initialize menu items - hide items beyond first 3 in each category
    menuCategories.forEach(category => {
        const items = category.querySelectorAll('.menu-item');
        const showMoreBtn = category.querySelector('.show-more-btn');
        const showLessBtn = category.querySelector('.show-less-btn');

        // If there are 3 or fewer items, hide both buttons
        if (items.length <= 3) {
            if (showMoreBtn) showMoreBtn.style.display = 'none';
            if (showLessBtn) showLessBtn.style.display = 'none';
            return;
        }

        // Show only first 3 items initially
        items.forEach((item, index) => {
            if (index >= 3) {
                item.classList.add('hidden-item');
            }
        });
    });
    
    // Gallery Modal
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.querySelector('.modal');
    const modalImg = document.querySelector('.modal-img');
    const closeModal = document.querySelector('.close-modal');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            modalImg.setAttribute('src', imgSrc);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Order System Functionality
    let cart = JSON.parse(localStorage.getItem('vezirCart')) || [];
    
    // Quantity buttons functionality
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-item');
            const input = document.querySelector(`.quantity-input[data-item="${itemId}"]`);
            let value = parseInt(input.value);
            
            if (this.classList.contains('minus')) {
                if (value > 0) value--;
            } else {
                value++;
            }
            
            input.value = value;
        });
    });
    
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const item = JSON.parse(this.getAttribute('data-item'));
            const quantityInput = document.querySelector(`.quantity-input[data-item="${item.id}"]`);
            const quantity = parseInt(quantityInput.value);
            
            if (quantity > 0) {
                // Check if item already in cart
                const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
                
                if (existingItemIndex >= 0) {
                    // Update quantity if item exists
                    cart[existingItemIndex].quantity += quantity;
                } else {
                    // Add new item to cart
                    cart.push({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: quantity
                    });
                }
                
                // Save to localStorage
                localStorage.setItem('vezirCart', JSON.stringify(cart));
                
                // Update cart display
                updateCartDisplay();
                
                // Reset quantity input
                quantityInput.value = 0;
                
                // Show success message
                alert(`${quantity} x ${item.name} dodano u korpu!`);
            }
        });
    });
    
    // Update cart display
    function updateCartDisplay() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const totalAmountElement = document.querySelector('.total-amount');
        let total = 0;
        
        // Clear cart items
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart">Vaša korpa je prazna</div>';
            totalAmountElement.textContent = '0 KM';
            return;
        }
        
        // Add each item to cart display
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-quantity">${item.quantity}x</div>
                <div class="cart-item-price">${itemTotal.toFixed(2)} KM</div>
                <button class="remove-item" data-id="${item.id}"><i class="fas fa-times"></i></button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
        
        // Update total
        totalAmountElement.textContent = `${total.toFixed(2)} KM`;
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.getAttribute('data-id');
                cart = cart.filter(item => item.id !== itemId);
                localStorage.setItem('vezirCart', JSON.stringify(cart));
                updateCartDisplay();
            });
        });
    }
    
    // Checkout button functionality
    document.querySelector('.checkout-btn').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Vaša korpa je prazna. Dodajte proizvode prije nego što nastavite.');
            return;
        }
        
        // Show checkout form
        document.querySelector('.checkout-form').style.display = 'block';
        this.style.display = 'none';
    });
    
    // Cancel order button
    document.querySelector('.cancel-order').addEventListener('click', function() {
        document.querySelector('.checkout-form').style.display = 'none';
        document.querySelector('.checkout-btn').style.display = 'block';
    });
    
    // Submit order button (frontend only - just shows a message)
    document.querySelector('.submit-order').addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const notes = document.getElementById('notes').value;
        
        if (!name || !phone || !address) {
            alert('Molimo popunite sva obavezna polja označena sa *.');
            return;
        }
        
        // Hide form and show success message
        document.querySelector('.checkout-form').style.display = 'none';
        document.querySelector('.order-success').style.display = 'block';
        
        // In a real implementation, this would send data to a server
        console.log('Order submitted:', {
            customer: { name, phone, address },
            notes: notes,
            payment: 'pouzećem',
            items: cart,
            total: document.querySelector('.total-amount').textContent
        });
        
        // Clear cart after 5 seconds
        setTimeout(() => {
            cart = [];
            localStorage.removeItem('vezirCart');
            updateCartDisplay();
            document.querySelector('.order-success').style.display = 'none';
            document.querySelector('.checkout-btn').style.display = 'block';
            document.querySelector('form').reset();
        }, 5000);
    });
    
    // Initialize cart display
    updateCartDisplay();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
