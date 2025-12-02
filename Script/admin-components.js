$(document).ready(function() {
    // Load admin header
    $("#admin-header").load("../View/admin-header.html", function() {
        // Xử lý menu profile
        $('.admin-profile').click(function(e) {
            e.stopPropagation();
            $('.profile-dropdown').toggleClass('show');
        });

        // Ẩn dropdown khi click ra ngoài
        $(document).click(function(e) {
            if (!$(e.target).closest('.admin-profile').length) {
                $('.profile-dropdown').removeClass('show');
            }
        });

        // Xử lý thông báo
        $('.notifications').click(function() {
            // TODO: Hiển thị danh sách thông báo
            alert('Tính năng thông báo đang được phát triển');
        });

        // Xử lý tìm kiếm
        $('.search-bar input').on('input', function() {
            const searchTerm = $(this).val().toLowerCase();
            
            // Tìm kiếm trong bảng đặt phòng
            $('table tbody tr').each(function() {
                const text = $(this).text().toLowerCase();
                $(this).toggle(text.indexOf(searchTerm) > -1);
            });
            
            // Tìm kiếm trong danh sách phòng
            $('.room-card').each(function() {
                const text = $(this).text().toLowerCase();
                $(this).toggle(text.indexOf(searchTerm) > -1);
            });
        });

        // Xử lý đăng xuất
        $('#logoutBtn').click(function(e) {
            e.preventDefault();
            
            if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                // Xóa thông tin đăng nhập
                localStorage.removeItem('adminLoggedIn');
                localStorage.removeItem('adminUsername');
                sessionStorage.removeItem('adminLoggedIn');
                sessionStorage.removeItem('adminUsername');
                
                // Chuyển về trang đăng nhập
                window.location.href = 'login.html';
            }
        });
    });
    
    // Load admin sidebar
    $("#admin-sidebar").load("../View/admin-sidebar.html", function() {
        // Xử lý active menu item
        $('.sidebar-nav a').click(function(e) {
            e.preventDefault();
            $('.sidebar-nav li').removeClass('active');
            $(this).parent().addClass('active');
        });
        $('#dashboard').click(function(e) {
            e.preventDefault();
            window.location.href = '../View/Admin.html';
        });
        $('#room-management').click(function(e) {
            e.preventDefault();
            window.location.href = '../View/room-management.html';
        });
        $('#staff').click(function(e) {
            e.preventDefault();
            window.location.href = '../View/staff-management.html';
        });
        $('#services').click(function(e) {
            e.preventDefault();
            window.location.href = '../View/service-management.html';
        });
        $('#guests').click(function(e) {
            e.preventDefault();
            window.location.href = '../View/customer-management.html';
        });
        $('#bookings').click(function(e) {
            e.preventDefault();
            window.location.href = '../View/booking-management.html';
        });
        $('#reports').click(function(e) {
            e.preventDefault();
            window.location.href = '../View/report-management.html';
        });
    });
}); 
