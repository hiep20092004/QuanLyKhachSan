$(document).ready(function() {
    // Tải header và footer
    $("#header").load("../View/components/header.html");
    $("#footer").load("../View/components/footer.html");

    // Thiết lập ngày tối thiểu là ngày hiện tại
    const today = new Date().toISOString().split('T')[0];
    $('#date').attr('min', today);

    // Kiểm tra form trước khi submit
    $('#bookingForm').on('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitBooking();
        }
    });

    // Kiểm tra từng trường khi người dùng rời khỏi
    $('#name').on('blur', validateName);
    $('#email').on('blur', validateEmail);
    $('#phone').on('blur', validatePhone);
    $('#date').on('change', validateDate);
    $('#time').on('change', validateTime);
    $('#guests').on('change', validateGuests);

    // Hàm kiểm tra form
    function validateForm() {
        let isValid = true;

        // Xóa tất cả thông báo lỗi cũ
        $('.error-message').remove();

        // Kiểm tra từng trường
        if (!validateName()) isValid = false;
        if (!validateEmail()) isValid = false;
        if (!validatePhone()) isValid = false;
        if (!validateDate()) isValid = false;
        if (!validateTime()) isValid = false;
        if (!validateGuests()) isValid = false;

        return isValid;
    }

    // Các hàm kiểm tra riêng lẻ
    function validateName() {
        const name = $('#name').val().trim();
        if (name.length < 2) {
            showError('name', 'Vui lòng nhập họ tên hợp lệ');
            return false;
        }
        return true;
    }

    function validateEmail() {
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Vui lòng nhập email hợp lệ');
            return false;
        }
        return true;
    }

    function validatePhone() {
        const phone = $('#phone').val().trim();
        const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        if (!phoneRegex.test(phone)) {
            showError('phone', 'Vui lòng nhập số điện thoại hợp lệ');
            return false;
        }
        return true;
    }

    function validateDate() {
        const selectedDate = new Date($('#date').val());
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            showError('date', 'Ngày đặt bàn không hợp lệ');
            return false;
        }
        return true;
    }

    function validateTime() {
        const time = $('#time').val();
        if (!time) {
            showError('time', 'Vui lòng chọn giờ đặt bàn');
            return false;
        }
        return true;
    }

    function validateGuests() {
        const guests = $('#guests').val();
        if (!guests) {
            showError('guests', 'Vui lòng chọn số lượng khách');
            return false;
        }
        return true;
    }

    // Hiển thị thông báo lỗi
    function showError(fieldId, message) {
        const field = $(`#${fieldId}`);
        // Xóa thông báo lỗi cũ nếu có
        field.siblings('.error-message').remove();
        // Thêm thông báo lỗi mới
        field.after(`<span class="error-message">${message}</span>`);
    }

    // Xử lý gửi form đặt bàn
    function submitBooking() {
        const bookingData = {
            name: $('#name').val().trim(),
            email: $('#email').val().trim(),
            phone: $('#phone').val().trim(),
            date: $('#date').val(),
            time: $('#time').val(),
            guests: $('#guests').val(),
            area: $('#area').val(),
            occasion: $('#occasion').val(),
            notes: $('#notes').val().trim()
        };

        // Chuẩn bị gửi dữ liệu đến máy chủ
        console.log('Dữ liệu đặt bàn:', bookingData);

        // Hiển thị thông báo thành công
        showSuccessMessage();

        // Đặt lại form về trạng thái ban đầu
        $('#bookingForm')[0].reset();
    }

    // Hiển thị thông báo đặt bàn thành công
    function showSuccessMessage() {
        const successHtml = `
            <div class="success-message" style="
                background-color: #dff0d8;
                color: #3c763d;
                padding: 15px;
                border-radius: 4px;
                margin-bottom: 20px;
                text-align: center;
            ">
                <i class="fas fa-check-circle"></i>
                Đặt bàn thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
            </div>
        `;

        // Thêm thông báo vào đầu form
        $('.booking-form').prepend(successHtml);

        // Tự động ẩn thông báo sau 5 giây
        setTimeout(() => {
            $('.success-message').fadeOut(500, function() {
                $(this).remove();
            });
        }, 5000);
    }
}); 