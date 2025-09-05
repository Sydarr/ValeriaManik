// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Form submission handler (WhatsApp)
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    sendWhatsApp();
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Portfolio image modal
document.querySelectorAll('.portfolio-item img').forEach(img => {
    img.addEventListener('click', function() {
        createImageModal(this.src);
    });
});

function createImageModal(src) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 10px;
    `;
    
    modal.appendChild(img);
    document.body.appendChild(modal);
    
    // Close on click
    modal.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
        }
    });
}

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// WhatsApp sending function
function sendWhatsApp() {
    const form = document.querySelector('.contact-form form');
    const name = form.querySelector('input[type="text"]').value.trim();
    const phone = form.querySelector('input[type="tel"]').value.trim();
    const service = form.querySelector('select').value;
    const message = form.querySelector('textarea').value.trim();
    
    if (!name || !phone || !service) {
        showNotification('Пожалуйста, заполните все обязательные поля', 'error');
        return;
    }
    
    const whatsappMessage = `🦋 Привет! Хочу записаться на маникюр.

👤 Имя: ${name}
📞 Телефон: ${phone}
💅 Услуга: ${service}
💬 Пожелания: ${message || 'Не указаны'}

📅 Дата: ${new Date().toLocaleString('ru-RU')}`;
    
    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/79385286589?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    showNotification('Открываем WhatsApp для отправки заявки...', 'success');
    form.reset();
}

// Email sending function (improved for Gmail and other clients)
function sendEmail() {
    const form = document.querySelector('.contact-form form');
    const name = form.querySelector('input[type="text"]').value.trim();
    const phone = form.querySelector('input[type="tel"]').value.trim();
    const service = form.querySelector('select').value;
    const message = form.querySelector('textarea').value.trim();
    
    if (!name || !phone || !service) {
        showNotification('Пожалуйста, заполните все обязательные поля', 'error');
        return;
    }
    
    const subject = '🦋 Заявка на маникюр от ' + name;
    const body = `Новая заявка на маникюр:

👤 Имя: ${name}
📞 Телефон: ${phone}
💅 Услуга: ${service}
💬 Пожелания: ${message || 'Не указаны'}

📅 Дата: ${new Date().toLocaleString('ru-RU')}

---
С уважением,
${name}`;
    
    // Always open Gmail
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=ms.valeriak@mail.ru&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(gmailUrl, '_blank');
    showNotification('Открываем Gmail для отправки заявки...', 'success');
    
    form.reset();
}

// Telegram Bot configuration
const TELEGRAM_BOT_TOKEN = '8294522594:AAHGoFE567JMKOYenYAyysPqaS09rY5AtYs';

// Alternative Telegram sending via service
async function sendTelegramViaService() {
    const form = document.querySelector('.contact-form form');
    const name = form.querySelector('input[type="text"]').value.trim();
    const phone = form.querySelector('input[type="tel"]').value.trim();
    const service = form.querySelector('select').value;
    const message = form.querySelector('textarea').value.trim();
    
    if (!name || !phone || !service) {
        showNotification('Пожалуйста, заполните все обязательные поля', 'error');
        return;
    }
    
    const telegramMessage = `🦋 Новая заявка на маникюр

👤 Имя: ${name}
📞 Телефон: ${phone}
💅 Услуга: ${service}
💬 Пожелания: ${message || 'Не указаны'}

📅 Дата: ${new Date().toLocaleString('ru-RU')}`;
    
    try {
        showNotification('Отправляем заявку через сервис...', 'info');
        
        // Using a CORS proxy service
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        const response = await fetch(proxyUrl + apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({
                chat_id: '@vnzwgn',
                text: telegramMessage
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('Заявка успешно отправлена в Telegram!', 'success');
            form.reset();
        } else {
            throw new Error(result.description || 'Ошибка отправки');
        }
        
    } catch (error) {
        console.error('Telegram service error:', error);
        // Fallback to direct Telegram Web
        sendTelegram();
    }
}

// Telegram sending function (using Telegram Web)
function sendTelegram() {
    const form = document.querySelector('.contact-form form');
    const name = form.querySelector('input[type="text"]').value.trim();
    const phone = form.querySelector('input[type="tel"]').value.trim();
    const service = form.querySelector('select').value;
    const message = form.querySelector('textarea').value.trim();
    
    if (!name || !phone || !service) {
        showNotification('Пожалуйста, заполните все обязательные поля', 'error');
        return;
    }
    
    const telegramMessage = `🦋 Новая заявка на маникюр

👤 Имя: ${name}
📞 Телефон: ${phone}
💅 Услуга: ${service}
💬 Пожелания: ${message || 'Не указаны'}

📅 Дата: ${new Date().toLocaleString('ru-RU')}`;
    
    // Open Telegram Web with pre-filled message
    const telegramUrl = `https://t.me/vnzwgn?text=${encodeURIComponent(telegramMessage)}`;
    window.open(telegramUrl, '_blank');
    
    showNotification('Открываем Telegram для отправки заявки...', 'success');
    form.reset();
}

// Carousel functionality
let carouselTrack = null;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let animationId = 0;

function initCarousel() {
    carouselTrack = document.getElementById('carouselTrack');
    const carousel = document.getElementById('worksCarousel');
    
    if (!carouselTrack || !carousel) return;
    
    // Click to scroll to portfolio
    carousel.addEventListener('click', function(e) {
        if (!isDragging) {
            e.preventDefault();
            const portfolioSection = document.getElementById('portfolio');
            if (portfolioSection) {
                portfolioSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
    
    // Mouse events for desktop
    carousel.addEventListener('mousedown', startDrag);
    carousel.addEventListener('mousemove', drag);
    carousel.addEventListener('mouseup', endDrag);
    carousel.addEventListener('mouseleave', endDrag);
    
    // Touch events for mobile
    carousel.addEventListener('touchstart', startDrag, { passive: false });
    carousel.addEventListener('touchmove', drag, { passive: false });
    carousel.addEventListener('touchend', endDrag);
    
    // Pause animation on hover
    carousel.addEventListener('mouseenter', pauseAnimation);
    carousel.addEventListener('mouseleave', resumeAnimation);
}

function startDrag(e) {
    isDragging = true;
    carouselTrack.classList.add('dragging');
    
    if (e.type === 'mousedown') {
        startX = e.clientX;
    } else if (e.type === 'touchstart') {
        startX = e.touches[0].clientX;
    }
    
    // Pause the animation
    carouselTrack.style.animationPlayState = 'paused';
}

function drag(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    
    let currentX = 0;
    if (e.type === 'mousemove') {
        currentX = e.clientX;
    } else if (e.type === 'touchmove') {
        currentX = e.touches[0].clientX;
    }
    
    const diffX = currentX - startX;
    const translateX = currentTranslate + diffX;
    
    carouselTrack.style.transform = `translateX(${translateX}px)`;
}

function endDrag(e) {
    if (!isDragging) return;
    
    isDragging = false;
    carouselTrack.classList.remove('dragging');
    
    // Calculate new translate value
    let currentX = 0;
    if (e.type === 'mouseup') {
        currentX = e.clientX;
    } else if (e.type === 'touchend') {
        currentX = e.changedTouches[0].clientX;
    }
    
    const diffX = currentX - startX;
    currentTranslate += diffX;
    
    // Reset animation with new position
    carouselTrack.style.animation = 'none';
    carouselTrack.style.transform = `translateX(${currentTranslate}px)`;
    
    // Restart animation after a short delay
    setTimeout(() => {
        carouselTrack.style.animation = 'scroll 20s linear infinite';
        carouselTrack.style.transform = 'translateX(0)';
        currentTranslate = 0;
    }, 100);
}

function pauseAnimation() {
    if (!isDragging) {
        carouselTrack.style.animationPlayState = 'paused';
    }
}

function resumeAnimation() {
    if (!isDragging) {
        carouselTrack.style.animationPlayState = 'running';
    }
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});