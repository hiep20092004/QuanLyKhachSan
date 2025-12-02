$(document).ready(function() {
    // Tải các thành phần admin
    $("#admin-header").load("admin-header.html");
    $("#admin-sidebar").load("admin-sidebar.html");

    // Chức năng lọc theo danh mục
    $('.category-btn').click(function() {
        $('.category-btn').removeClass('active');
        $(this).addClass('active');
        
        const category = $(this).text().toLowerCase();
        if (category === 'tất cả') {
            $('.service-card').show();
        } else {
            $('.service-card').hide();
            $(`.service-card[data-category="${category}"]`).show();
        }
    });
    });