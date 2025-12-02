$(document).ready(function() {
    // Tải các thành phần admin
    $("#admin-header").load("admin-header.html");
    $("#admin-sidebar").load("admin-sidebar.html");

    // Xử lý chuyển tab
    $('.nav-btn').click(function() {
        const tabId = $(this).data('tab');
        
        // Cập nhật trạng thái active của các nút
        $('.nav-btn').removeClass('active');
        $(this).addClass('active');
        
        // Ẩn/hiện nội dung tab tương ứng
        $('.profile-section').removeClass('active').hide();
        $(`#${tabId}-section`).addClass('active').show();
    });

    // Xử lý chỉnh sửa thông tin
    let isEditing = false;
    $('#editInfo').click(function() {
        isEditing = !isEditing;
        const $inputs = $('#info-section input, #info-section select, #info-section textarea');
        const $button = $(this);

        if (isEditing) {
            // Chuyển sang chế độ chỉnh sửa
            $inputs.prop('disabled', false);
            $button.html('<i class="fas fa-save"></i> Lưu');
            $button.addClass('active');
        } else {
            // Lưu thông tin
            saveProfileInfo();
            $inputs.prop('disabled', true);
            $button.html('<i class="fas fa-pen"></i> Chỉnh sửa');
            $button.removeClass('active');
        }
    });

    // Xử lý thay đổi ảnh đại diện
    $('.btn-change-avatar').click(function() {
        $('#avatarInput').click();
    });

    // Xử lý thay đổi ảnh bìa
    $('.btn-change-cover').click(function() {
        $('#coverInput').click();
    });

    // Thêm input ẩn cho upload ảnh
    $('body').append('<input type="file" id="avatarInput" accept="image/*" style="display: none">');
    $('body').append('<input type="file" id="coverInput" accept="image/*" style="display: none">');

    // Xử lý upload ảnh đại diện
    $('#avatarInput').change(function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                $('.avatar-wrapper img').attr('src', e.target.result);
                uploadProfileImage('avatar', file);
            };
            reader.readAsDataURL(file);
        }
    });

    // Xử lý upload ảnh bìa
    $('#coverInput').change(function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                $('.profile-cover img').attr('src', e.target.result);
                uploadProfileImage('cover', file);
            };
            reader.readAsDataURL(file);
        }
    });

    // Xử lý đổi mật khẩu
    $('.password-form button').click(function() {
        const currentPassword = $('.password-form input').eq(0).val();
        const newPassword = $('.password-form input').eq(1).val();
        const confirmPassword = $('.password-form input').eq(2).val();

        if (!currentPassword || !newPassword || !confirmPassword) {
            showNotification('Vui lòng điền đầy đủ thông tin', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            showNotification('Mật khẩu mới không khớp', 'error');
            return;
        }

        changePassword(currentPassword, newPassword);
    });

    // Xử lý xác thực hai yếu tố
    $('.two-factor button').click(function() {
        const isEnabled = $('.status-badge').hasClass('enabled');
        toggleTwoFactor(!isEnabled);
    });

    // Xử lý cài đặt thông báo
    $('.notification-option input[type="checkbox"]').change(function() {
        const type = $(this).closest('.notification-group').find('h3').text().toLowerCase();
        const setting = $(this).closest('.notification-option').find('h4').text();
        const enabled = $(this).is(':checked');
        
        updateNotificationSettings(type, setting, enabled);
    });

    // Hàm lưu thông tin cá nhân
    function saveProfileInfo() {
        const profileData = {
            name: $('#info-section input[type="text"]').eq(0).val(),
            email: $('#info-section input[type="email"]').val(),
            phone: $('#info-section input[type="tel"]').val(),
            birthdate: $('#info-section input[type="date"]').val(),
            gender: $('#info-section select').val(),
            position: $('#info-section input[type="text"]').eq(1).val(),
            address: $('#info-section input[type="text"]').eq(2).val(),
            bio: $('#info-section textarea').val()
        };

        // TODO: Gửi dữ liệu lên server
        console.log('Saving profile:', profileData);
        showNotification('Đã lưu thông tin thành công', 'success');
    }

    // Hàm upload ảnh
    function uploadProfileImage(type, file) {
        // TODO: Upload ảnh lên server
        console.log(`Uploading ${type} image:`, file);
        showNotification('Đã cập nhật ảnh thành công', 'success');
    }

    // Hàm đổi mật khẩu
    function changePassword(currentPassword, newPassword) {
        // TODO: Gửi yêu cầu đổi mật khẩu lên server
        console.log('Changing password');
        showNotification('Đã đổi mật khẩu thành công', 'success');
        $('.password-form input').val('');
    }

    // Hàm bật/tắt xác thực hai yếu tố
    function toggleTwoFactor(enable) {
        // TODO: Gửi yêu cầu bật/tắt 2FA lên server
        console.log('Toggling 2FA:', enable);
        
        if (enable) {
            $('.status-badge').addClass('enabled').text('Đã bật');
            $('.two-factor button').text('Tắt xác thực');
        } else {
            $('.status-badge').removeClass('enabled').text('Đã tắt');
            $('.two-factor button').text('Bật xác thực');
        }
        
        showNotification(`Đã ${enable ? 'bật' : 'tắt'} xác thực hai yếu tố`, 'success');
    }

    // Hàm cập nhật cài đặt thông báo
    function updateNotificationSettings(type, setting, enabled) {
        // TODO: Gửi cài đặt thông báo lên server
        console.log('Updating notification settings:', { type, setting, enabled });
        showNotification('Đã cập nhật cài đặt thông báo', 'success');
    }

    // Hàm hiển thị thông báo
    function showNotification(message, type = 'success') {
        // TODO: Implement notification system
        alert(message);
    }
}); 