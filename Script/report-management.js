$(document).ready(function() {
    // Tải các thành phần admin
    $("#admin-header").load("admin-header.html");
    $("#admin-sidebar").load("admin-sidebar.html");

    // Khởi tạo biểu đồ doanh thu
    const revenueChart = new Chart(document.getElementById('revenueChart'), {
        type: 'line',
        data: {
            labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
            datasets: [{
                label: 'Doanh thu (triệu)',
                data: [800, 890, 1000, 950, 1200, 1100, 1300, 1250, 1400, 1350, 1450, 1500],
                borderColor: '#1976d2',
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString() + 'M';
                        }
                    }
                }
            }
        }
    });

    // Khởi tạo biểu đồ phân bố loại phòng
    const roomTypeChart = new Chart(document.getElementById('roomTypeChart'), {
        type: 'doughnut',
        data: {
            labels: ['Deluxe', 'Suite', 'Executive', 'Family'],
            datasets: [{
                data: [40, 25, 20, 15],
                backgroundColor: [
                    '#1976d2',
                    '#4caf50',
                    '#ff9800',
                    '#9c27b0'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });

    // Xử lý chuyển tab báo cáo
    $('.tab-btn').click(function() {
        const tabId = $(this).data('tab');
        
        // Cập nhật trạng thái active của các nút
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');
        
        // Ẩn/hiện nội dung tab tương ứng
        $('.report-content').hide();
        $(`#${tabId}-report`).show();
    });

    // Xử lý bộ lọc nhanh theo thời gian
    $('.quick-filters .btn-filter').click(function() {
        $('.quick-filters .btn-filter').removeClass('active');
        $(this).addClass('active');
        
        // TODO: Cập nhật dữ liệu theo khoảng thời gian đã chọn
        updateReportData($(this).text());
    });

    // Xử lý lọc theo khoảng thời gian tùy chỉnh
    $('.btn-apply').click(function() {
        const startDate = $('#startDate').val();
        const endDate = $('#endDate').val();
        
        if (!startDate || !endDate) {
            alert('Vui lòng chọn khoảng thời gian');
            return;
        }
        
        if (new Date(startDate) > new Date(endDate)) {
            alert('Ngày bắt đầu phải nhỏ hơn ngày kết thúc');
            return;
        }
        
        // TODO: Cập nhật dữ liệu theo khoảng thời gian đã chọn
        updateReportData(null, startDate, endDate);
    });
}); 