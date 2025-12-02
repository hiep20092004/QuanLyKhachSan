$(document).ready(function() {
    // Tải header và footer
    $("#header").load("../components/header.html");
    $("#footer").load("../components/footer.html");

    // Xử lý hiện/ẩn mật khẩu
    $('.toggle-password').click(function() {
        const input = $(this).siblings('input');
        const type = input.attr('type') === 'password' ? 'text' : 'password';
        input.attr('type', type);
        $(this).toggleClass('fa-eye fa-eye-slash');
    });

    // Validate form khi submit
    $('#registerForm').on('submit', function(e) {
        e.preventDefault();
        
        // Lấy giá trị từ form
        const formData = {
            fullName: $('#fullName').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            password: $('#password').val(),
            confirmPassword: $('#confirmPassword').val(),
            idNumber: $('#idNumber').val(),
            birthdate: $('#birthdate').val(),
            gender: $('#gender').val(),
            address: $('#address').val()
        };

        // Validate mật khẩu
        if (formData.password !== formData.confirmPassword) {
            alert('Mật khẩu xác nhận không khớp!');
            return;
        }

        // Validate số điện thoại
        const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        if (!phoneRegex.test(formData.phone)) {
            alert('Số điện thoại không hợp lệ!');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Email không hợp lệ!');
            return;
        }

        // Validate CCCD/CMND (9 hoặc 12 số)
        const idRegex = /^(\d{9}|\d{12})$/;
        if (!idRegex.test(formData.idNumber)) {
            alert('CCCD/CMND không hợp lệ!');
            return;
        }

        // TODO: Gửi dữ liệu đăng ký lên server
        console.log('Form data:', formData);
        
        // Giả lập đăng ký thành công
        alert('Đăng ký thành công!');
        window.location.href = 'login.html';
    });

    // Validate độ mạnh của mật khẩu khi nhập
    $('#password').on('input', function() {
        const password = $(this).val();
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        const mediumRegex = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})");
        
        if (strongRegex.test(password)) {
            $(this).css('border-color', '#28a745');
        } else if (mediumRegex.test(password)) {
            $(this).css('border-color', '#ffc107');
        } else {
            $(this).css('border-color', '#dc3545');
        }
    });

    // Reset style khi focus out
    $('#password').on('blur', function() {
        $(this).css('border-color', '#ddd');
    });
}); 