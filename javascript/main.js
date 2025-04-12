document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
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
    
    // Form Submission
    const reservationForm = document.getElementById('reservation-form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show an alert
            alert('Thank you for your reservation! We will contact you shortly to confirm.');
            this.reset();
        });
    }
    
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