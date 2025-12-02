$(document).ready(function () {
    // Tải header và footer
    $("#header").load("../View/components/header.html");
    $("#footer").load("../View/components/footer.html");

    // Lấy dữ liệu người dùng từ bộ nhớ
    const userData = JSON.parse(localStorage.getItem('userData') || sessionStorage.getItem('userData') || '{}');

    // Điền thông tin người dùng
    if (userData) {
        $('.profile-info h1').text(userData.fullName || 'Khách hàng');
        // TODO: Điền các trường khác khi API sẵn sàng
    }

    // Chuyển đổi tab
    $('.nav-btn').click(function () {
        const tabId = $(this).data('tab');

        // Cập nhật trạng thái active của các nút
        $('.nav-btn').removeClass('active');
        $(this).addClass('active');

        // Ẩn/hiện nội dung tương ứng
        $('.profile-section').removeClass('active').hide();
        $(`#${tabId}-section`).addClass('active').show();
    });

    // Xử lý chế độ chỉnh sửa thông tin cá nhân
    let isEditing = false;
    $('#editInfo').click(function () {
        isEditing = !isEditing;
        const $inputs = $('#info-section input, #info-section select');
        const $button = $(this);

        if (isEditing) {
            // Bật chế độ chỉnh sửa
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


    // Xử lý đổi mật khẩu
    $('.password-form button').click(function () {
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

    // Xử lý tùy chọn thông báo
    $('.preference-option input[type="checkbox"]').change(function () {
        const type = $(this).closest('.preference-option').find('h4').text();
        const enabled = $(this).is(':checked');
        updateNotificationPreference(type, enabled);
    });

    // Các hàm tiện ích
    function saveProfileInfo() {
        const profileData = {
            fullName: $('#info-section input[type="text"]').eq(0).val(),
            email: $('#info-section input[type="email"]').val(),
            phone: $('#info-section input[type="tel"]').val(),
            birthdate: $('#info-section input[type="date"]').val(),
            gender: $('#info-section select').val(),
            idNumber: $('#info-section input[type="text"]').eq(1).val(),
            address: $('#info-section input[type="text"]').eq(2).val()
        };

    }

    function changePassword(currentPassword, newPassword) {
        // TODO: Gửi lên server
        console.log('Đang đổi mật khẩu');
        showNotification('Đã đổi mật khẩu thành công');
        $('.password-form input').val('');
    }
    const userProfile = document.querySelector('.user-profile')
    userProfile.style.display = 'block';
    // Xử lý click vào avatar
    const userAvatar = userProfile.querySelector('.user-avatar');
    if (userAvatar) {
        userAvatar.addEventListener('click', (e) => {
            e.stopPropagation();
            userProfile.querySelector('.user-dropdown').classList.toggle('show');
        });
    }

    // Xử lý click ra ngoài để đóng dropdown
    document.addEventListener('click', (e) => {
        if (!userProfile.contains(e.target)) {
            userProfile.querySelector('.user-dropdown').classList.remove('show');
        }
    });

    // Xử lý đăng xuất
    const logoutBtn = userProfile.querySelector('#logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                localStorage.removeItem('userLoggedIn');
                localStorage.removeItem('userData');
                sessionStorage.removeItem('userLoggedIn');
                sessionStorage.removeItem('userData');
                window.location.reload();
            }
        });
    }


}); 