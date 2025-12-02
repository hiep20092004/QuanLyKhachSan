$(document).ready(function() {

    // Xử lý nút chỉnh sửa
    $('.btn-icon.edit').click(function() {
        const row = $(this).closest('tr');
        const bookingId = row.find('td:first').text();
        // TODO: Mở form chỉnh sửa đặt phòng
        alert(`Chỉnh sửa đặt phòng ${bookingId}`);
    });

    // Xử lý nút xóa
    $('.btn-icon.delete').click(function() {
        const row = $(this).closest('tr');
        const bookingId = row.find('td:first').text();
        
        if (confirm(`Bạn có chắc chắn muốn xóa đặt phòng ${bookingId}?`)) {
            // TODO: Gọi API xóa đặt phòng
            row.fadeOut(300, function() {
                $(this).remove();
            });
        }
    });

    // Xử lý cập nhật số liệu thống kê
    const updateStats = () => {
        // TODO: Gọi API lấy số liệu thống kê mới
        // Đây là dữ liệu mẫu
        const stats = {
            roomsBooked: '42/50',
            guestsStaying: '86',
            todayRevenue: '32.5M VND',
            newBookings: '12'
        };

        // Cập nhật giao diện
        $('.stat-number').each(function() {
            const key = $(this).data('stat');
            if (stats[key]) {
                $(this).text(stats[key]);
            }
        });
    };

    // Cập nhật số liệu mỗi 5 phút
    setInterval(updateStats, 5 * 60 * 1000);

    // Xử lý responsive
    $(window).resize(function() {
        if ($(window).width() > 1024) {
            $('.sidebar').removeClass('collapsed');
            $('.main-content').removeClass('expanded');
        }
    });

    // Xử lý click vào phòng
    $('.room-card').click(function() {
        const roomNumber = $(this).find('h3').text();
        const roomType = $(this).find('p').text();
        const status = $(this).find('.status').text();
        
        // TODO: Hiển thị chi tiết phòng
        alert(`
            Số phòng: ${roomNumber}
            Loại phòng: ${roomType}
            Trạng thái: ${status}
        `);
    });

    // Xử lý nút "Xem tất cả"
    $('.view-all').click(function(e) {
        e.preventDefault();
        const section = $(this).closest('section').attr('id');
        // TODO: Chuyển đến trang chi tiết tương ứng
        alert(`Đang chuyển đến trang ${section}`);
    });

    // Khởi tạo tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Xử lý loading
    $(window).on('load', function() {
        // TODO: Ẩn loading screen
        $('.loading-screen').fadeOut();
    });

    // Xử lý lỗi AJAX
    $(document).ajaxError(function(event, jqxhr, settings, thrownError) {
        // TODO: Hiển thị thông báo lỗi
        console.error('Lỗi AJAX:', thrownError);
        alert('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
    });

    // Hiển thị tên admin đã đăng nhập
    const adminUsername = localStorage.getItem('adminUsername') || sessionStorage.getItem('adminUsername');
    if (adminUsername) {
        $('#adminUsername').text(adminUsername);
    }
}); 