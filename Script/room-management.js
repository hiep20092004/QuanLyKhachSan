$(document).ready(function() {
    // Xử lý nút thêm phòng mới
    $('.btn-primary').click(function() {
        // TODO: Mở modal thêm phòng
        alert('Tính năng thêm phòng đang được phát triển');
    });

    // Xử lý lọc theo loại phòng
    $('.filter-group select').first().change(function() {
        const roomType = $(this).val();
        filterRooms();
    });

    // Xử lý lọc theo trạng thái
    $('.filter-group select').last().change(function() {
        const status = $(this).val();
        filterRooms();
    });

    // Hàm lọc phòng theo điều kiện
    function filterRooms() {
        const roomType = $('.filter-group select').first().val();
        const status = $('.filter-group select').last().val();
        
        $('table tbody tr').each(function() {
            const row = $(this);
            const rowRoomType = row.find('td:nth-child(2)').text().toLowerCase();
            const rowStatus = row.find('.status-badge').text().toLowerCase();
            
            const matchRoomType = !roomType || rowRoomType === roomType.toLowerCase();
            const matchStatus = !status || rowStatus === status.toLowerCase();
            
            row.toggle(matchRoomType && matchStatus);
        });

        updateStats();
    }

    // Xử lý tìm kiếm phòng
    $('.search-filter input').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        
        $('table tbody tr').each(function() {
            const text = $(this).text().toLowerCase();
            $(this).toggle(text.indexOf(searchTerm) > -1);
        });

        updateStats();
    });

    // Cập nhật số liệu thống kê
    function updateStats() {
        const visibleRows = 50;
        const totalRooms = visibleRows.length;
        
        const availableRooms = visibleRows.filter(function() {
            return $(this).find('.status-badge.available').length;
        }).length;
        
        const occupiedRooms = visibleRows.filter(function() {
            return $(this).find('.status-badge.occupied').length;
        }).length;
        
        const maintenanceRooms = visibleRows.filter(function() {
            return $(this).find('.status-badge.maintenance').length;
        }).length;

        // Cập nhật UI
        $('.stat-number').eq(0).text(totalRooms);
        $('.stat-number').eq(1).text(availableRooms);
        $('.stat-number').eq(2).text(occupiedRooms);
        $('.stat-number').eq(3).text(maintenanceRooms);
    }

    // Xử lý các nút thao tác
    $('.btn-icon').click(function() {
        const row = $(this).closest('tr');
        const roomNumber = row.find('td:first').text();
        const action = $(this).attr('title');

        switch(action) {
            case 'Chỉnh sửa':
                editRoom(roomNumber);
                break;
            case 'Xóa':
                deleteRoom(roomNumber, row);
                break;
            case 'Chi tiết':
                viewRoomDetails(roomNumber);
                break;
        }
    });

    function editRoom(roomNumber) {
        // TODO: Mở modal chỉnh sửa với thông tin phòng
        alert(`Chỉnh sửa thông tin phòng ${roomNumber}`);
    }

    function deleteRoom(roomNumber, row) {
        if (confirm(`Bạn có chắc chắn muốn xóa phòng ${roomNumber}?`)) {
            // TODO: Gọi API xóa phòng
            row.fadeOut(300, function() {
                $(this).remove();
                updateStats();
            });
        }
    }

    function viewRoomDetails(roomNumber) {
        // TODO: Mở modal xem chi tiết phòng
        alert(`Xem chi tiết phòng ${roomNumber}`);
    }

    // Xử lý phân trang
    $('.btn-page').click(function() {
        if (!$(this).hasClass('active')) {
            $('.btn-page').removeClass('active');
            $(this).addClass('active');
            // TODO: Load dữ liệu trang mới
        }
    });

    // Khởi tạo ban đầu
    updateStats();
}); 