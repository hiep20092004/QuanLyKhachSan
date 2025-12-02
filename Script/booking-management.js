$(document).ready(function() {
    // Tải các thành phần admin
    $("#admin-header").load("admin-header.html");
    $("#admin-sidebar").load("admin-sidebar.html");

    // Xử lý checkbox chọn tất cả
    $('.select-all').change(function() {
        $('.select-item').prop('checked', $(this).prop('checked'));
        updateBulkActionState();
    });

    // Xử lý các checkbox riêng lẻ
    $('.select-item').change(function() {
        updateSelectAllState();
        updateBulkActionState();
    });

    // Cập nhật trạng thái của checkbox chọn tất cả
    function updateSelectAllState() {
        const totalCheckboxes = $('.select-item').length;
        const checkedCheckboxes = $('.select-item:checked').length;
        $('.select-all').prop('checked', totalCheckboxes === checkedCheckboxes);
    }

    // Cập nhật trạng thái của thao tác hàng loạt
    function updateBulkActionState() {
        const hasChecked = $('.select-item:checked').length > 0;
        $('.bulk-actions select, .bulk-actions button').prop('disabled', !hasChecked);
    }

    // Xử lý thao tác hàng loạt
    $('.bulk-actions button').click(function() {
        const action = $('.bulk-actions select').val();
        const selectedBookings = $('.select-item:checked').map(function() {
            return $(this).closest('tr').find('td:nth-child(2)').text();
        }).get();

        if (!action) {
            alert('Vui lòng chọn thao tác');
            return;
        }

        switch(action) {
            case 'confirm':
                if (confirm(`Xác nhận ${selectedBookings.length} đặt phòng đã chọn?`)) {
                    $('.select-item:checked').closest('tr').find('.badge').removeClass().addClass('badge confirmed').text('Đã xác nhận');
                }
                break;
            case 'cancel':
                if (confirm(`Hủy ${selectedBookings.length} đặt phòng đã chọn?`)) {
                    $('.select-item:checked').closest('tr').find('.badge').removeClass().addClass('badge cancelled').text('Đã hủy');
                }
                break;
            case 'export':
                exportToExcel(selectedBookings);
                break;
        }

        // Reset trạng thái sau khi thực hiện
        $('.select-all').prop('checked', false);
        $('.select-item').prop('checked', false);
        updateBulkActionState();
    });

    // Xử lý các nút thao tác
    $('.btn-icon').click(function(e) {
        e.preventDefault();
        const action = $(this).attr('title');
        const bookingId = $(this).closest('tr').find('td:nth-child(2)').text();

        switch(action) {
            case 'Chi tiết':
                showBookingDetails(bookingId);
                break;
            case 'Chỉnh sửa':
                editBooking(bookingId);
                break;
            case 'Hủy':
                cancelBooking($(this));
                break;
        }
    });

    // Hiển thị chi tiết đặt phòng
    function showBookingDetails(bookingId) {
        // TODO: Triển khai modal hiển thị chi tiết
        console.log('Xem chi tiết đặt phòng:', bookingId);
    }

    // Chỉnh sửa đặt phòng
    function editBooking(bookingId) {
        // TODO: Triển khai form chỉnh sửa
        console.log('Chỉnh sửa đặt phòng:', bookingId);
    }

    // Hủy đặt phòng
    function cancelBooking(button) {
        const bookingId = button.closest('tr').find('td:nth-child(2)').text();
        if (confirm(`Bạn có chắc chắn muốn hủy đặt phòng "${bookingId}"?`)) {
            button.closest('tr').find('.badge').removeClass().addClass('badge cancelled').text('Đã hủy');
        }
    }

    // Xuất Excel
    function exportToExcel(bookings) {
        // TODO: Triển khai xuất Excel
        console.log('Xuất Excel cho các đặt phòng:', bookings);
    }

    // Xử lý tìm kiếm
    let searchTimeout;
    $('.search-box input').on('input', function() {
        clearTimeout(searchTimeout);
        const searchText = $(this).val().toLowerCase();

        searchTimeout = setTimeout(() => {
            $('.table tbody tr').each(function() {
                const row = $(this);
                const bookingId = row.find('td:nth-child(2)').text().toLowerCase();
                const customerName = row.find('.customer-name').text().toLowerCase();
                const customerPhone = row.find('.customer-phone').text().toLowerCase();
                const roomInfo = row.find('.room-info').text().toLowerCase();

                if (bookingId.includes(searchText) ||
                    customerName.includes(searchText) ||
                    customerPhone.includes(searchText) ||
                    roomInfo.includes(searchText)) {
                    row.show();
                } else {
                    row.hide();
                }
            });
        }, 300);
    });

    // Xử lý lọc
    $('.filter-group select, .filter-group input[type="date"]').change(function() {
        const status = $('.filter-group select:eq(0)').val();
        const roomType = $('.filter-group select:eq(1)').val();
        const fromDate = $('.filter-group input[type="date"]:eq(0)').val();
        const toDate = $('.filter-group input[type="date"]:eq(1)').val();

        $('.table tbody tr').each(function() {
            const row = $(this);
            const rowStatus = row.find('.badge:first').text().toLowerCase();
            const rowRoomType = row.find('.room-type').text().toLowerCase();
            const rowCheckIn = new Date(row.find('td:nth-child(5)').text());
            const rowCheckOut = new Date(row.find('td:nth-child(6)').text());

            const statusMatch = !status || rowStatus === status;
            const roomTypeMatch = !roomType || rowRoomType === roomType;
            const dateMatch = (!fromDate || rowCheckOut >= new Date(fromDate)) &&
                            (!toDate || rowCheckIn <= new Date(toDate));

            if (statusMatch && roomTypeMatch && dateMatch) {
                row.show();
            } else {
                row.hide();
            }
        });
    });

    // Xử lý phân trang
    $('.btn-page').click(function() {
        if (!$(this).hasClass('active')) {
            $('.btn-page').removeClass('active');
            $(this).addClass('active');
            // TODO: Triển khai phân trang thực tế
            console.log('Đang tải trang', $(this).text());
        }
    });

    // Nút thêm đặt phòng mới
    $('.btn-primary').click(function() {
        // TODO: Triển khai form thêm mới
        console.log('Mở form thêm đặt phòng mới');
    });

    // Khởi tạo trạng thái ban đầu
    updateBulkActionState();
}); 