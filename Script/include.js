// Hàm để load các components
function loadComponent(url, targetElement) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(targetElement).innerHTML = data;
            
            // Sau khi load header, khởi tạo các event listeners
            if (targetElement === 'header') {
                initializeHeader();
            }
        })
        .catch(error => console.error('Lỗi khi tải component:', error));
}

// Hàm khởi tạo các tính năng cho header
function initializeHeader() {
    // Xử lý menu mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navbar.classList.toggle('menu-open');
            navLinks.style.display = navLinks.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Xử lý dropdown menu trên mobile
    if (window.innerWidth <= 991) {
        const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown > a');
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const parent = item.parentElement;
                const dropdown = parent.querySelector('.dropdown-menu');

                // Đóng các dropdown khác
                document.querySelectorAll('.nav-item.has-dropdown').forEach(otherItem => {
                    if (otherItem !== parent) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.dropdown-menu').style.display = 'none';
                    }
                });

                // Toggle dropdown hiện tại
                parent.classList.toggle('active');
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            });
        });
    }

    // Xử lý scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const mainNav = document.querySelector('.main-nav');

        // Thêm shadow khi scroll
        if (currentScroll > 0) {
            mainNav.classList.add('nav-shadow');
            if (window.innerWidth >= 992) {
                mainNav.style.paddingTop = '10px';
                mainNav.style.paddingBottom = '10px';
            }
        } else {
            mainNav.classList.remove('nav-shadow');
            if (window.innerWidth >= 992) {
                mainNav.style.paddingTop = '20px';
                mainNav.style.paddingBottom = '20px';
            }
        }

        // Ẩn/hiện navbar khi scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Cập nhật trạng thái đăng nhập
    updateLoginDisplay();
}

// Hàm cập nhật hiển thị đăng nhập
function updateLoginDisplay() {
    const isLoggedIn = localStorage.getItem('userLoggedIn') || sessionStorage.getItem('userLoggedIn');
    const userData = JSON.parse(localStorage.getItem('userData') || sessionStorage.getItem('userData') || '{}');
    const loginBtn = document.querySelector('.book-now');
    const userProfile = document.querySelector('.user-profile');

    if (isLoggedIn === 'true' && userData.role === 'user') {
        // Ẩn nút đăng nhập
        if (loginBtn) loginBtn.style.display = 'none';

        // Hiển thị thông tin user
        if (userProfile) {
            userProfile.innerHTML = `
                <div class="user-avatar">
                    <img src="../Images/user-avatar.jpg" alt="${userData.fullName}">
                    <span>${userData.fullName}</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="user-dropdown">
                    <ul>
                        <li><a href="../View/user-profile.html"><i class="fas fa-user"></i>Thông tin cá nhân</a></li>
                        <li><a href="#bookings"><i class="fas fa-calendar-check"></i>Đặt phòng của tôi</a></li>
                        <li><a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i>Đăng xuất</a></li>
                    </ul>
                </div>
            `;
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
        }
    } else {
        // Hiển thị nút đăng nhập và ẩn profile
        if (loginBtn) loginBtn.style.display = 'block';
       if (userProfile) userProfile.style.display = 'none';
    }
}

// Tải components khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('../components/header.html', 'header');
    loadComponent('../components/footer.html', 'footer');
}); 