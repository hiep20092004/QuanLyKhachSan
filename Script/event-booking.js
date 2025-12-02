$(document).ready(function() {
    // Khởi tạo hiệu ứng AOS
    AOS.init({
        duration: 800,
        once: true
    });

    // Thiết lập ngày tối thiểu là ngày mai
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    $('#date').attr('min', tomorrow.toISOString().split('T')[0]);

    // Xử lý khi thay đổi số người tham dự
    $('#attendees').on('change', function() {
        const attendees = parseInt($(this).val());
        const $roomType = $('#roomType');
        
        // Tự động chọn loại phòng phù hợp
        if (attendees <= 20) {
            $roomType.val('small');
        } else if (attendees <= 50) {
            $roomType.val('medium');
        } else if (attendees <= 200) {
            $roomType.val('large');
        } else {
            alert('Số lượng người tham dự vượt quá sức chứa tối đa của phòng lớn nhất (200 người)');
            $(this).val(200);
            $roomType.val('large');
        }
    });

    // Xử lý khi thay đổi loại phòng
    $('#roomType').on('change', function() {
        const roomType = $(this).val();
        const attendees = parseInt($('#attendees').val());
        
        // Kiểm tra sức chứa phòng
        if (roomType === 'small' && attendees > 20) {
            alert('Phòng họp nhỏ chỉ phù hợp cho tối đa 20 người');
            $(this).val('medium');
        } else if (roomType === 'medium' && attendees > 50) {
            alert('Phòng họp vừa chỉ phù hợp cho tối đa 50 người');
            $(this).val('large');
        }
    });

    // Xử lý form đặt phòng
    $('#eventBookingForm').on('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitBooking();
        }
    });

    // Hàm kiểm tra form
    function validateForm() {
        let isValid = true;

        // Xóa thông báo lỗi cũ
        $('.error-message').remove();

        // Kiểm tra các trường bắt buộc
        if (!validateName()) isValid = false;
        if (!validateEmail()) isValid = false;
        if (!validatePhone()) isValid = false;
        if (!validateDateTime()) isValid = false;
        if (!validateDuration()) isValid = false;
        if (!validateAttendees()) isValid = false;

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

    function validateDateTime() {
        const selectedDate = new Date($('#date').val() + ' ' + $('#time').val());
        const now = new Date();
        
        if (selectedDate <= now) {
            showError('date', 'Thời gian đặt phòng phải sau thời điểm hiện tại');
            return false;
        }
        return true;
    }

    function validateDuration() {
        const duration = parseInt($('#duration').val());
        if (duration < 2) {
            showError('duration', 'Thời lượng tối thiểu là 2 giờ');
            return false;
        }
        return true;
    }

    function validateAttendees() {
        const attendees = parseInt($('#attendees').val());
        if (attendees < 1 || attendees > 200) {
            showError('attendees', 'Số người tham dự phải từ 1 đến 200');
            return false;
        }
        return true;
    }

    // Hiển thị thông báo lỗi
    function showError(fieldId, message) {
        const field = $(`#${fieldId}`);
        field.siblings('.error-message').remove();
        field.after(`<span class="error-message">${message}</span>`);
    }

    // Gửi form đặt phòng
    function submitBooking() {
        const bookingData = {
            eventType: $('#eventType').val(),
            date: $('#date').val(),
            time: $('#time').val(),
            duration: $('#duration').val(),
            attendees: $('#attendees').val(),
            roomType: $('#roomType').val(),
            services: $('input[name="services"]:checked').map(function() {
                return $(this).val();
            }).get(),
            name: $('#name').val().trim(),
            email: $('#email').val().trim(),
            phone: $('#phone').val().trim(),
            notes: $('#notes').val().trim()
        };

        // Chuẩn bị gửi dữ liệu đến máy chủ
        console.log('Dữ liệu đặt phòng:', bookingData);

        // Hiển thị thông báo thành công
        showSuccessMessage();

        // Đặt lại form về trạng thái ban đầu
        $('#eventBookingForm')[0].reset();
    }

    // Hiển thị thông báo đặt phòng thành công
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
                Yêu cầu đặt phòng của bạn đã được gửi thành công! 
                Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
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

    // Tính toán và hiển thị giá tạm tính
    function updateEstimatedPrice() {
        const duration = parseInt($('#duration').val()) || 0;
        const roomType = $('#roomType').val();
        let basePrice = 0;

        switch(roomType) {
            case 'small':
                basePrice = 2000000;
                break;
            case 'medium':
                basePrice = 4000000;
                break;
            case 'large':
                basePrice = 10000000;
                break;
        }

        const services = $('input[name="services"]:checked').length;
        const servicePrice = services * 500000;
        const totalPrice = (basePrice * duration) + servicePrice;

        // Hiển thị giá tạm tính
        if (duration > 0 && roomType) {
            const formattedPrice = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(totalPrice);

            $('.estimated-price').remove();
            $('.btn-submit').before(`
                <div class="estimated-price" style="
                    margin-top: 15px;
                    padding: 15px;
                    background: #f8f9fa;
                    border-radius: 6px;
                    text-align: right;
                    font-weight: 600;
                ">
                    Giá tạm tính: ${formattedPrice}
                </div>
            `);
        }
    }

    // Cập nhật giá khi thay đổi các trường liên quan
    $('#duration, #roomType, input[name="services"]').on('change', updateEstimatedPrice);
}); 