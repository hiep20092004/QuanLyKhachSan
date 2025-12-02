// Khởi tạo thư viện AOS (Animation On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Xử lý việc xác thực và gửi form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Lấy giá trị từ các trường form
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();

        // Kiểm tra cơ bản
        if (!name || !email || !phone || !subject || !message) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Vui lòng nhập địa chỉ email hợp lệ.');
            return;
        }

        // Kiểm tra định dạng số điện thoại (định dạng Việt Nam)
        const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        if (!phoneRegex.test(phone)) {
            alert('Vui lòng nhập số điện thoại hợp lệ.');
            return;
        }

        // Nếu kiểm tra thành công, gửi form
        // Ở đây bạn sẽ thêm code để gửi dữ liệu đến server
        alert('Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể!');
        contactForm.reset();
    });
}

// Xử lý chức năng accordion cho phần FAQ
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Đóng tất cả các mục FAQ
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            const answer = item.querySelector('.faq-answer');
            answer.style.maxHeight = '0';
            answer.style.padding = '0 20px';
        });

        // Mở mục được click nếu chưa active
        if (!isActive) {
            faqItem.classList.add('active');
            const answer = faqItem.querySelector('.faq-answer');
            answer.style.maxHeight = answer.scrollHeight + 40 + 'px';
            answer.style.padding = '20px';
        }
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

// Kiểm tra form theo thời gian thực
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('input', () => {
        validateInput(input);
    });

    input.addEventListener('blur', () => {
        validateInput(input);
    });
});

function validateInput(input) {
    const value = input.value.trim();
    
    // Xóa thông báo lỗi hiện tại
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Thêm class lỗi và thông báo nếu không hợp lệ
    if (!value) {
        input.classList.add('error');
        addErrorMessage(input, 'Trường này không được để trống');
        return false;
    }

    // Kiểm tra email
    if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            input.classList.add('error');
            addErrorMessage(input, 'Email không hợp lệ');
            return false;
        }
    }

    // Kiểm tra số điện thoại
    if (input.type === 'tel') {
        const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        if (!phoneRegex.test(value)) {
            input.classList.add('error');
            addErrorMessage(input, 'Số điện thoại không hợp lệ');
            return false;
        }
    }

    input.classList.remove('error');
    return true;
}

function addErrorMessage(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '5px';
    input.parentElement.appendChild(errorDiv);
}