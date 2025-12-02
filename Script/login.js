$(document).ready(function() {
    const $loginForm = $('#loginForm');
    const $togglePassword = $('.toggle-password');
    const $passwordInput = $('#password');

    // Tài khoản mặc định
    const accounts = {
        admin: {
            username: 'admin',
            password: 'admin123',
            role: 'admin',
            fullName: 'Administrator'
        },
        user: {
            username: 'user',
            password: 'user123',
            role: 'user',
            fullName: 'Nguyễn Văn A'
        }
    };

    // Xử lý hiện/ẩn mật khẩu
    $togglePassword.on('click', function() {
        const type = $passwordInput.attr('type') === 'password' ? 'text' : 'password';
        $passwordInput.attr('type', type);
        
        // Thay đổi biểu tượng con mắt
        const $icon = $(this).find('i');
        if (type === 'password') {
            $icon.removeClass('fa-eye-slash').addClass('fa-eye');
        } else {
            $icon.removeClass('fa-eye').addClass('fa-eye-slash');
        }
    });

    // Xử lý form đăng nhập
    $loginForm.on('submit', function(e) {
        e.preventDefault();
        
        const username = $('#username').val();
        const password = $passwordInput.val();
        const remember = $('input[name="remember"]').prop('checked');
        
        // Tìm tài khoản phù hợp
        const account = Object.values(accounts).find(acc => 
            acc.username === username && acc.password === password
        );
        
        if (account) {
            // Lưu thông tin đăng nhập
            const userData = {
                username: account.username,
                role: account.role,
                fullName: account.fullName
            };
            
            if (remember) {
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userData', JSON.stringify(userData));
            } else {
                sessionStorage.setItem('userLoggedIn', 'true');
                sessionStorage.setItem('userData', JSON.stringify(userData));
            }
            
            // Chuyển hướng dựa vào role
            if (account.role === 'admin') {
                window.location.href = 'Admin.html';
            } else {
                window.location.href = 'index.html';
            }
        } else {
            // Hiển thị thông báo lỗi
            $('#error-message').fadeIn();
            
            // Xóa thông báo lỗi sau 3 giây
            setTimeout(function() {
                $('#error-message').fadeOut();
            }, 3000);
        }
    });

    // Xử lý quên mật khẩu
    $('.forgot-password').on('click', function(e) {
        e.preventDefault();
        alert('Vui lòng liên hệ quản trị viên để đặt lại mật khẩu');
    });
    // Thêm hiệu ứng focus cho input
    $('.form-group input').on('focus', function() {
        $(this).parent('.form-group').addClass('focused');
    }).on('blur', function() {
        if (!$(this).val()) {
            $(this).parent('.form-group').removeClass('focused');
        }
    });

    // Kiểm tra email hợp lệ khi gõ
    $('#email').on('input', function() {
        const email = $(this).val();
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        
        if (email && !isValid) {
            $(this).addClass('invalid');
            $(this).siblings('.error-message').remove();
            $('<span class="error-message">Email không hợp lệ</span>').insertAfter(this);
        } else {
            $(this).removeClass('invalid');
            $(this).siblings('.error-message').remove();
        }
    });
}); 