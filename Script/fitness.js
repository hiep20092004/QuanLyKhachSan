// Khởi tạo thư viện AOS (Animation On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Xử lý các nút đặt lịch
document.querySelectorAll('.btn-book, .btn-register').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        // Bạn có thể thay thế phần này bằng logic đặt lịch thực tế
        alert('Chức năng đặt lịch đang được phát triển. Vui lòng liên hệ trực tiếp qua số điện thoại hoặc email.');
    });
});

// Thêm hiệu ứng cuộn mượt cho các liên kết điều hướng
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

// Thêm hiệu ứng parallax cho phần hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Thêm hiệu ứng animation khi cuộn cho các tính năng
const features = document.querySelectorAll('.feature');
const animateOnScroll = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.opacity = '1';
        }
    });
};

const observer = new IntersectionObserver(animateOnScroll, {
    threshold: 0.1
});

features.forEach(feature => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateY(20px)';
    feature.style.transition = 'all 0.5s ease-out';
    observer.observe(feature);
});

// Xử lý gửi form liên hệ
const contactForm = document.querySelector('.contact form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Thêm logic xử lý gửi form tại đây
        alert('Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể!');
        contactForm.reset();
    });
}

// Thêm hiệu ứng hover cho các thẻ thiết bị
document.querySelectorAll('.equipment-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
});

// Thêm hiệu ứng loading cho hình ảnh
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    
    if (!img.complete) {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in';
    }
});

// Khởi tạo chức năng menu mobile
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuButton.classList.toggle('active');
    });
}

// Thêm chức năng hiển thị lịch học
const scheduleItems = document.querySelectorAll('.schedule li');
if (scheduleItems.length > 0) {
    const today = new Date().getDay(); // 0 = Chủ nhật, 1 = Thứ 2, v.v.
    scheduleItems.forEach((item, index) => {
        if (index === today - 1) { // -1 vì lịch của chúng ta bắt đầu từ Thứ 2
            item.classList.add('today');
        }
    });
}

// Thêm chức năng liên hệ với huấn luyện viên
document.querySelectorAll('.trainer-card').forEach(trainer => {
    const contactButton = trainer.querySelector('.contact-trainer');
    if (contactButton) {
        contactButton.addEventListener('click', (e) => {
            e.preventDefault();
            const trainerName = trainer.querySelector('h3').textContent;
            alert(`Vui lòng liên hệ lễ tân để đặt lịch với ${trainerName}`);
        });
    }
}); 