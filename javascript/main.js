document.addEventListener('DOMContentLoaded', function() {
    // ========== LOADING SCREEN ==========
    const loadingScreen = document.getElementById('loading');
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 1000);
        }, 1100);
    });

    // ========== MOBILE NAVIGATION ==========
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // ========== STICKY HEADER ==========
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        header.classList.toggle('scrolled', window.scrollY > 100);
    });
    
    // ========== MENU SYSTEM ==========
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    // Tab switching functionality
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and categories
            tabBtns.forEach(btn => btn.classList.remove('active'));
            menuCategories.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked button and corresponding category
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Reset show more/less buttons when switching tabs
            resetMenuItemsDisplay(tabId);
        });
    });
    
    // Show more/less functionality
    document.querySelectorAll('.show-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const category = this.parentElement;
            toggleMenuItems(category, false); // Show all items
            this.style.display = 'none';
            category.querySelector('.show-less-btn').style.display = 'block';
        });
    });

    document.querySelectorAll('.show-less-btn').forEach(button => {
        button.addEventListener('click', function() {
            const category = this.parentElement;
            toggleMenuItems(category, true); // Hide extra items
            this.style.display = 'none';
            category.querySelector('.show-more-btn').style.display = 'block';
        });
    });

    // Initialize menu items display
    menuCategories.forEach(category => {
        const items = category.querySelectorAll('.menu-item');
        const showMoreBtn = category.querySelector('.show-more-btn');
        const showLessBtn = category.querySelector('.show-less-btn');

        if (items.length <= 3) {
            if (showMoreBtn) showMoreBtn.style.display = 'none';
            if (showLessBtn) showLessBtn.style.display = 'none';
        } else {
            toggleMenuItems(category, true); // Hide extra items initially
        }
    });

    // Helper function to toggle menu items display
    function toggleMenuItems(category, hideExtra) {
        const items = category.querySelectorAll('.menu-item');
        items.forEach((item, index) => {
            if (index >= 3) {
                item.classList.toggle('hidden-item', hideExtra);
            }
        });
    }

    // Helper function to reset menu items display when switching tabs
    function resetMenuItemsDisplay(tabId) {
        const currentCategory = document.getElementById(tabId);
        const showMoreBtn = currentCategory.querySelector('.show-more-btn');
        const showLessBtn = currentCategory.querySelector('.show-less-btn');
        const items = currentCategory.querySelectorAll('.menu-item');

        if (items.length > 3) {
            if (showMoreBtn) showMoreBtn.style.display = 'block';
            if (showLessBtn) showLessBtn.style.display = 'none';
            toggleMenuItems(currentCategory, true);
        }
    }

    // ========== GALLERY NAVIGATION ==========
    const gallerySlides = document.querySelectorAll('.gallery-slide');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const dotsContainer = document.querySelector('.gallery-dots');
    let currentIndex = 0;
    
    // Create dots dynamically based on number of slides
    function createDots() {
        dotsContainer.innerHTML = '';
        gallerySlides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.setAttribute('data-index', index);
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = index;
                showSlide(currentIndex);
            });
            dotsContainer.appendChild(dot);
        });
    }
    
    // Enhanced showSlide function with smooth transitions
    function showSlide(index) {
        // Hide all slides
        gallerySlides.forEach(slide => {
            slide.style.opacity = '0';
            slide.style.transform = 'scale(0.95)';
            slide.classList.remove('active');
        });
        
        // Show selected slide with animation
        const activeSlide = gallerySlides[index];
        activeSlide.classList.add('active');
        setTimeout(() => {
            activeSlide.style.opacity = '1';
            activeSlide.style.transform = 'scale(1)';
        }, 10);
        
        // Update dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        // Update arrow states
        prevArrow.style.opacity = index === 0 ? '0.5' : '1';
        nextArrow.style.opacity = index === gallerySlides.length - 1 ? '0.5' : '1';
    }
    
    // Navigation functions
    function goToNext() {
        currentIndex = (currentIndex + 1) % gallerySlides.length;
        showSlide(currentIndex);
    }
    
    function goToPrev() {
        currentIndex = (currentIndex - 1 + gallerySlides.length) % gallerySlides.length;
        showSlide(currentIndex);
    }
    
    // Event listeners
    nextArrow.addEventListener('click', goToNext);
    prevArrow.addEventListener('click', goToPrev);
    
    // Touch/swipe events
    let touchStartX = 0;
    galleryContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    galleryContainer.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        
        if (diff > 50) goToNext(); // Swipe left
        if (diff < -50) goToPrev(); // Swipe right
    }, { passive: true });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') goToNext();
        if (e.key === 'ArrowLeft') goToPrev();
    });
    
    // Initialize
    createDots();
    showSlide(currentIndex);
    
    // Optional auto-advance with pause on hover
    let slideInterval;
    function startAutoSlide() {
        slideInterval = setInterval(goToNext, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    
    galleryContainer.addEventListener('mouseenter', stopAutoSlide);
    galleryContainer.addEventListener('mouseleave', startAutoSlide);
    startAutoSlide();
});

    // Optional auto-advance (uncomment if you want it)
    // let slideInterval = setInterval(() => {
    //     currentIndex = (currentIndex + 1) % gallerySlides.length;
    //     showSlide(currentIndex);
    // }, 5000);
    
    // galleryContainer.addEventListener('mouseenter', () => {
    //     clearInterval(slideInterval);
    // });
    
    // galleryContainer.addEventListener('mouseleave', () => {
    //     slideInterval = setInterval(() => {
    //         currentIndex = (currentIndex + 1) % gallerySlides.length;
    //         showSlide(currentIndex);
    //     }, 5000);
    // });
    
    // ========== GALLERY MODAL ==========
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
    
    // ========== ORDER SYSTEM ==========
    let cart = JSON.parse(localStorage.getItem('vezirCart')) || [];
    
    // Quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-item');
            const input = document.querySelector(`.quantity-input[data-item="${itemId}"]`);
            let value = parseInt(input.value) || 0;
            
            if (this.classList.contains('minus')) {
                value = Math.max(0, value - 1);
            } else {
                value++;
            }
            
            input.value = value;
        });
    });
    
    // Add to cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const item = JSON.parse(this.getAttribute('data-item'));
            const quantityInput = document.querySelector(`.quantity-input[data-item="${item.id}"]`);
            const quantity = parseInt(quantityInput.value) || 0;
            
            if (quantity > 0) {
                addToCart(item, quantity);
                quantityInput.value = 0;
                showToast(`${quantity} x ${item.name} dodano u korpu!`);
            }
        });
    });
    
    // Cart functionality
    function addToCart(item, quantity) {
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
        
        if (existingItemIndex >= 0) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({
                ...item,
                quantity: quantity
            });
        }
        
        saveCart();
        updateCartDisplay();
    }
    
    function removeFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        saveCart();
        updateCartDisplay();
    }
    
    function saveCart() {
        localStorage.setItem('vezirCart', JSON.stringify(cart));
    }
    
    function updateCartDisplay() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const totalAmountElement = document.querySelector('.total-amount');
        let total = 0;
        
        cartItemsContainer.innerHTML = cart.length === 0 
            ? '<div class="empty-cart">Vaša korpa je prazna</div>'
            : cart.map(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                return `
                    <div class="cart-item">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-quantity">${item.quantity}x</div>
                        <div class="cart-item-price">${itemTotal.toFixed(2)} KM</div>
                        <button class="remove-item" data-id="${item.id}">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;
            }).join('');
        
        totalAmountElement.textContent = `${total.toFixed(2)} KM`;
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                removeFromCart(this.getAttribute('data-id'));
            });
        });
    }
    
    // Checkout process
    const checkoutBtn = document.querySelector('.checkout-btn');
    const checkoutForm = document.querySelector('.checkout-form');
    const orderSuccess = document.querySelector('.order-success');

    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            showToast('Vaša korpa je prazna. Dodajte proizvode prije narudžbe.', 'error');
            return;
        }

        checkoutForm.style.display = 'block';
        this.style.display = 'none';
    });

    document.querySelector('.cancel-order').addEventListener('click', function() {
        checkoutForm.style.display = 'none';
        checkoutBtn.style.display = 'block';
    });

    document.querySelector('.submit-order').addEventListener('click', function() {
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const notes = document.getElementById('notes').value.trim();

        if (!name || !phone || !address) {
            showToast('Molimo popunite sva obavezna polja označena sa *.', 'error');
            return;
        }

        // Collect order details
        const orderDetails = {
            customer: { name, phone, address },
            notes,
            items: cart,
            total: document.querySelector('.total-amount').textContent,
            date: new Date().toISOString()
        };

        // Send email
        sendOrderConfirmationEmail(orderDetails);


        // Show success UI
        checkoutForm.style.display = 'none';
        orderSuccess.style.display = 'block';

        // Clear cart after delay
        setTimeout(() => {
            cart = [];
            saveCart();
            updateCartDisplay();
            orderSuccess.style.display = 'none';
            checkoutBtn.style.display = 'block';
            document.querySelector('form').reset();
        }, 5000);
    });


    // Function to send order confirmation email
    function sendOrderConfirmationEmail(orderDetails) {
        const recipient = 'tarikk.abdijanovic@gmail.com';
        const subject = 'Nova Narudžba';
        
        // Build the email body
        let body = 'Detalji narudžbe:\n\n';
        body += `Ime: ${orderDetails.customer.name}\n`;
        body += `Telefon: ${orderDetails.customer.phone}\n`;
        body += `Adresa: ${orderDetails.customer.address}\n`;
        body += `Napomene: ${orderDetails.notes}\n\n`;
        body += 'Artikli:\n';
        orderDetails.items.forEach(item => {
          body += `- ${item.name} x ${item.quantity} = ${item.price * item.quantity} KM\n`;
        });
        body += `\nUkupno: ${orderDetails.total}\n`;
        body += `Datum: ${orderDetails.date}\n`;
      
        // Encode for URLs
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);
      
        // ===== 1. Mobile Device Detection =====
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      
        if (isMobile) {
          // ===== MOBILE SOLUTION =====
          // Try to open Gmail app directly (works on Android)
          window.location.href = `googlegmail:///co?to=${recipient}&subject=${encodedSubject}&body=${encodedBody}`;
          
          // Fallback 1: If Gmail app isn't installed, open Play Store to install it
          setTimeout(() => {
            if (!document.hidden) {
              window.location.href = `https://play.google.com/store/apps/details?id=com.google.android.gm`;
            }
          }, 500);
          
          // Fallback 2: If all else fails, use regular Gmail web
          setTimeout(() => {
            if (!document.hidden) {
              window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodedSubject}&body=${encodedBody}`;
            }
          }, 1000);
          
        } else {
          // ===== DESKTOP SOLUTION =====
          // Force Gmail in new tab (bypasses Outlook)
          const gmailTab = window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodedSubject}&body=${encodedBody}`, '_blank');
          
          // Fallback if popup blocked
          setTimeout(() => {
            if (!gmailTab || gmailTab.closed) {
              window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodedSubject}&body=${encodedBody}`;
            }
          }, 500);
        }
      }


    // Toast notification
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 3000);
        }, 100);
    }
    
    // ========== SMOOTH SCROLLING ==========
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
    
    // ========== MENU ITEM HOVER IMAGES ==========
    document.querySelectorAll('.menu-item-hover').forEach(element => {
        const imageUrl = element.style.getPropertyValue('--item-image');
        if (imageUrl) {
            element.style.setProperty('--hover-image', imageUrl);
        }
    });
    
    // Initialize cart display
    updateCartDisplay();

// Toggle category items visibility
document.querySelectorAll('.toggle-category').forEach(button => {
    button.addEventListener('click', function() {
        const categoryItems = this.closest('.order-category').querySelector('.category-items');
        const isHidden = categoryItems.style.display === 'none';
        
        if (isHidden) {
            categoryItems.style.display = 'block';
            this.textContent = 'Sakrij';
        } else {
            categoryItems.style.display = 'none';
            this.textContent = 'Prikaži';
        }

    });
});

// Gallery scrolling functionality
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    const scrollLeftBtn = document.querySelector('.scroll-btn.left');
    const scrollRightBtn = document.querySelector('.scroll-btn.right');
    const modal = document.querySelector('.modal');
    const modalImg = document.querySelector('.modal-img');
    const closeModal = document.querySelector('.close-modal');
    
    // Function to check scroll position and update arrow visibility
    function updateArrowVisibility() {
        // Hide left arrow if at the start
        if (gallery.scrollLeft <= 10) {
            scrollLeftBtn.classList.add('hidden');
        } else {
            scrollLeftBtn.classList.remove('hidden');
        }
        
        // Hide right arrow if at the end
        if (gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth - 10) {
            scrollRightBtn.classList.add('hidden');
        } else {
            scrollRightBtn.classList.remove('hidden');
        }
    }
    
    // Initial check
    updateArrowVisibility();
    
    // Scroll buttons functionality
    scrollLeftBtn.addEventListener('click', () => {
        gallery.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });
    
    scrollRightBtn.addEventListener('click', () => {
        gallery.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });
    
    // Update arrows on scroll
    gallery.addEventListener('scroll', updateArrowVisibility);
    
    // Update arrows when window is resized
    window.addEventListener('resize', updateArrowVisibility);
    
    // Modal functionality for gallery images
    const galleryImages = document.querySelectorAll('.gallery img');
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImg.src = img.src;
        });
    });
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Keyboard navigation for modal
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'Escape') {
                modal.style.display = 'none';
            } else if (e.key === 'ArrowLeft') {
                // Navigate to previous image
                const currentIndex = Array.from(galleryImages).findIndex(img => img.src === modalImg.src);
                if (currentIndex > 0) {
                    modalImg.src = galleryImages[currentIndex - 1].src;
                }
            } else if (e.key === 'ArrowRight') {
                // Navigate to next image
                const currentIndex = Array.from(galleryImages).findIndex(img => img.src === modalImg.src);
                if (currentIndex < galleryImages.length - 1) {
                    modalImg.src = galleryImages[currentIndex + 1].src;
                }
            }
        }
    });
});
