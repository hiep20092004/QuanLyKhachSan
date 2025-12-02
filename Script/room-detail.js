// Khởi tạo gallery slider
new Swiper('.gallery-swiper', {
    loop: true,
    speed: 1000,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    }
});

// Scroll to booking section when clicking book button
document.querySelector('.btn-book').addEventListener('click', function(e) {
    e.preventDefault();
    const bookingSection = document.querySelector('.booking-section');
    if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.location.href = this.getAttribute('href');
    }
});

// Lazy loading cho hình ảnh
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Hiệu ứng hover cho amenity items
const amenityItems = document.querySelectorAll('.amenity-item');
amenityItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Hiển thị thông báo khi click vào nút đặt phòng
document.querySelector('.btn-book').addEventListener('click', function(e) {
    const roomType = document.querySelector('.room-title h1').textContent;
    const price = document.querySelector('.price').textContent;
    
    console.log(`Đặt phòng ${roomType} với giá ${price}`);
}); 