$(document).ready(function () {
    // Tải các thành phần admin
    $("#admin-header").load("admin-header.html");
    $("#admin-sidebar").load("admin-sidebar.html");

    // Xử lý checkbox chọn tất cả
    $('.select-all').change(function () {
        $('.select-item').prop('checked', $(this).prop('checked'));
        updateBulkActionState();
    });

    // Xử lý các checkbox riêng lẻ
    $('.select-item').change(function () {
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
    $('.bulk-actions button').click(function () {
        const action = $('.bulk-actions select').val();
        const selectedCustomers = $('.select-item:checked').map(function () {
            return $(this).closest('tr').find('.customer-name').text();
        }).get();

        if (!action) {
            alert('Vui lòng chọn thao tác');
            return;
        }

        switch (action) {
            case 'export':
                console.log('Xuất Excel cho khách hàng:', selectedCustomers);
                break;
            case 'email':
                console.log('Gửi email cho khách hàng:', selectedCustomers);
                break;
            case 'delete':
                if (confirm(`Bạn có chắc chắn muốn xóa ${selectedCustomers.length} khách hàng đã chọn?`)) {
                    $('.select-item:checked').closest('tr').fadeOut(300, function () {
                        $(this).remove();
                        updateCustomerStats();
                    });
                }
                break;
        }
    });

    // Xử lý chỉnh sửa khách hàng
    $(document).on('click', '.btn-icon[title="Chỉnh sửa"]', function() {
        const row = $(this).closest('tr');
        const customerName = row.find('.customer-name').text();
        const customerPhone = row.find('td:eq(3)').text();
        const customerEmail = row.find('td:eq(4)').text();
        const customerIdNumber = row.find('.customer-id').text().replace('CCCD: ', '');
        const customerType = row.find('td:eq(5) .badge').text();

        // Tạo form string để hiển thị trong prompt
        const currentInfo = 
`Nhập thông tin khách hàng (định dạng: tên, email, số điện thoại, CCCD, loại khách hàng)
Ví dụ: Nguyễn Văn A, nguyenvana@email.com, 0912345678, 012345678901, regular
Thông tin hiện tại: ${customerName}, ${customerEmail}, ${customerPhone}, ${customerIdNumber}, ${customerType}`;

        const input = prompt(currentInfo, `${customerName}, ${customerEmail}, ${customerPhone}, ${customerIdNumber}, ${customerType}`);

        if (input) {
            // Phân tích input thành các trường thông tin
            const [name, email, phone, idNumber, type] = input.split(',').map(item => item.trim());

            // Validate dữ liệu
            if (!name || !email || !phone || !idNumber || !type) {
                alert('Vui lòng nhập đầy đủ thông tin theo định dạng yêu cầu!');
                return;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Email không hợp lệ!');
                return;
            }

            // Validate số điện thoại
            const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
            if (!phoneRegex.test(phone)) {
                alert('Số điện thoại không hợp lệ!');
                return;
            }

            // Validate CCCD/CMND
            const idRegex = /^(\d{9}|\d{12})$/;
            if (!idRegex.test(idNumber)) {
                alert('CCCD/CMND không hợp lệ (9 hoặc 12 số)!');
                return;
            }

            // Validate loại khách hàng
            const validTypes = ['regular', 'vip', 'business'];
            if (!validTypes.includes(type.toLowerCase())) {
                alert('Loại khách hàng không hợp lệ (regular/vip/business)!');
                return;
            }

            // Cập nhật thông tin trong bảng
            row.find('.customer-name').text(name);
            row.find('.customer-id').text('CCCD: ' + idNumber);
            row.find('td:eq(3)').text(phone);
            row.find('td:eq(4)').text(email);
            row.find('td:eq(5) .badge')
                .removeClass('regular vip business')
                .addClass(type.toLowerCase())
                .text(type.toLowerCase());

            // Hiển thị thông báo
            alert('Cập nhật thành công!');
            
            // Cập nhật thống kê
            updateCustomerStats();
        }
    });

    // Xử lý tìm kiếm
    let searchTimeout;
    $('.search-box input').on('input', function () {
        clearTimeout(searchTimeout);
        const searchText = $(this).val().toLowerCase();

        searchTimeout = setTimeout(() => {
            $('.table tbody tr').each(function () {
                const row = $(this);
                const customerName = row.find('.customer-name').text().toLowerCase();
                const customerId = row.find('.customer-id').text().toLowerCase();
                const phone = row.find('td:eq(3)').text().toLowerCase();
                const email = row.find('td:eq(4)').text().toLowerCase();

                if (customerName.includes(searchText) ||
                    customerId.includes(searchText) ||
                    phone.includes(searchText) ||
                    email.includes(searchText)) {
                    row.show();
                } else {
                    row.hide();
                }
            });
        }, 300);
    });

    // Xử lý lọc
    $('.filter-group select').change(function () {
        const customerType = $('.filter-group select:eq(0)').val();
        const status = $('.filter-group select:eq(1)').val();

        $('.table tbody tr').each(function () {
            const row = $(this);
            const rowType = row.find('.badge:eq(0)').text().toLowerCase();
            const rowStatus = row.find('.badge:eq(1)').text().toLowerCase();

            const typeMatch = !customerType || rowType === customerType;
            const statusMatch = !status || rowStatus === status;

            if (typeMatch && statusMatch) {
                row.show();
            } else {
                row.hide();
            }
        });
    });
}); 