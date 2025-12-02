$(document).ready(function () {

    // Khởi tạo thư viện AOS cho hiệu ứng animation khi cuộn
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 50
    });

    // Khởi tạo Swiper cho phần Hero (banner chính)
    const heroSwiper = new Swiper('.hero.swiper', {
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 1500,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });

    // Khởi tạo Swiper cho phần Phòng ở
    const roomSwiper = new Swiper('.room-slider.swiper', {
        slidesPerView: 2.2,
        spaceBetween: 70,
        centeredSlides: true,
        loop: true,
        loopedSlides: 3,
        speed: 1000,
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
                effect: 'slide'
            },
            768: {
                slidesPerView: 1.5,
                spaceBetween: 30,
                effect: 'slide'
            },
            992: {
                slidesPerView: 2,
                spaceBetween: 40
            }
        }
    });

    // Khởi tạo Swiper cho phần Ưu đãi
    const offersSwiper = new Swiper('.offers-slider.swiper', {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        loopedSlides: 3,
        speed: 1000,
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
                effect: 'slide'
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
                effect: 'slide'
            },
            992: {
                slidesPerView: 2.5,
                spaceBetween: 30
            }
        }
    });

    // Thiết lập hình nền cho các slide trong phần Hero
    const images = [
        '../Images/ks_hanoi.jpg',
        '../Images/ks_hanoi1.jpg'
    ];

    $('.hero .swiper-slide').each(function (index) {
        $(this).css('backgroundImage', `url(${images[index % images.length]})`);
    });

    // Xử lý menu cố định và hiệu ứng cuộn
    let lastScroll = 0;
    const $navbar = $('.navbar');
    const $mainNav = $('.main-nav');
    const $mobileMenuBtn = $('.mobile-menu-btn');
    const $navLinks = $('.nav-links');

    // Xử lý scroll
    $(window).scroll(function () {
        const currentScroll = $(this).scrollTop();
        const windowWidth = $(window).width();

        // Thêm bóng đổ khi cuộn
        if (currentScroll > 0) {
            $mainNav.addClass('nav-shadow');
            if (windowWidth >= 992) {
                $mainNav.css({
                    'padding-top': '10px',
                    'padding-bottom': '10px'
                });
            }
        } else {
            $mainNav.removeClass('nav-shadow');
            if (windowWidth >= 992) {
                $mainNav.css({
                    'padding-top': '20px',
                    'padding-bottom': '20px'
                });
            }
        }

        // Ẩn/hiện menu khi cuộn
        if (currentScroll > lastScroll && currentScroll > 200) {
            $navbar.css('transform', 'translateY(-100%)');
        } else {
            $navbar.css('transform', 'translateY(0)');
        }

        lastScroll = currentScroll;
    });

    // Xử lý menu mobile
    $mobileMenuBtn.on('click', function () {
        $(this).toggleClass('active');
        $navbar.toggleClass('menu-open');
        $navLinks.slideToggle(300);
    });

    // Xử lý dropdown trên mobile
    if ($(window).width() <= 991) {
        $('.nav-item.has-dropdown > a').on('click', function (e) {
            e.preventDefault();
            const $parent = $(this).parent();
            const $dropdown = $parent.children('.dropdown-menu');

            $('.nav-item.has-dropdown').not($parent).removeClass('active');
            $('.dropdown-menu').not($dropdown).slideUp(300);

            $parent.toggleClass('active');
            $dropdown.slideToggle(300);
        });
    } else {
        // Xử lý hover trên desktop
        $('.nav-item.has-dropdown').hover(
            function () {
                $(this).addClass('active');
                $(this).children('.dropdown-menu').stop(true, true).fadeIn(200);
            },
            function () {
                $(this).removeClass('active');
                $(this).children('.dropdown-menu').stop(true, true).fadeOut(200);
            }
        );
    }

    // Xử lý thay đổi kích thước màn hình
    let resizeTimer;
    $(window).on('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            const windowWidth = $(window).width();

            // Reset menu styles
            if (windowWidth > 991) {
                $navLinks.removeAttr('style');
                $navbar.removeClass('menu-open');
                $mobileMenuBtn.removeClass('active');
                $('.dropdown-menu').removeAttr('style');

                // Rebind hover events
                $('.nav-item.has-dropdown').off('click').hover(
                    function () {
                        $(this).addClass('active');
                        $(this).children('.dropdown-menu').stop(true, true).fadeIn(200);
                    },
                    function () {
                        $(this).removeClass('active');
                        $(this).children('.dropdown-menu').stop(true, true).fadeOut(200);
                    }
                );
            } else {
                // Rebind click events for mobile
                $('.nav-item.has-dropdown > a').off('mouseenter mouseleave').on('click', function (e) {
                    e.preventDefault();
                    const $parent = $(this).parent();
                    const $dropdown = $parent.children('.dropdown-menu');

                    $('.nav-item.has-dropdown').not($parent).removeClass('active');
                    $('.dropdown-menu').not($dropdown).slideUp(300);

                    $parent.toggleClass('active');
                    $dropdown.slideToggle(300);
                });
            }

            // Cập nhật lại các hiệu ứng parallax
            $('.one-harmony').each(function () {
                const scrolled = $(window).scrollTop();
                const speed = 0.3;
                const yPos = -(scrolled * speed);
                $(this).css('background-position', `center ${yPos}px`);
            });

            // Cập nhật lại vị trí của các phần tử animation
            $('.animate-on-scroll').each(function () {
                const elementTop = $(this).offset().top;
                const elementBottom = elementTop + $(this).outerHeight();
                const viewportTop = $(window).scrollTop();
                const viewportBottom = viewportTop + $(window).height();

                if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    $(this).addClass('animated');
                }
            });

            // Cập nhật lại chiều cao của các section nếu cần
            const windowHeight = $(window).height();
            $('.full-height').css('min-height', windowHeight);
        }, 250);
    });

    // Cuộn mượt đến các section
    $('a[href*="#"]').not('[href="#"]').click(function (e) {
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
        ) {
            e.preventDefault();
            const target = $(this.hash);
            const $target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            if ($target.length) {
                const offset = $('.navbar').height();
                $('html, body').animate({
                    scrollTop: $target.offset().top - offset
                }, 1000, 'easeInOutExpo');
                return false;
            }
        }
    });

    // Hiệu ứng parallax cho các section có background
    $('.one-harmony').each(function () {
        const $section = $(this);
        $(window).scroll(function () {
            const scrolled = $(window).scrollTop();
            const speed = 0.3;
            const yPos = -(scrolled * speed);
            $section.css('background-position', `center ${yPos}px`);
        });
    });

    // Thêm class animation khi cuộn đến section
    $(window).scroll(function () {
        $('.animate-on-scroll').each(function () {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animated');
            }
        });
    });

    // Hiệu ứng hover cho các thẻ phòng
    $('.room-card').hover(
        function () {
            $(this).find('.room-image').css('transform', 'scale(1.05)');
        },
        function () {
            $(this).find('.room-image').css('transform', 'scale(1)');
        }
    );

    // Hiệu ứng hover cho các thẻ trải nghiệm
    $('.exp-card').hover(
        function () {
            $(this).find('.exp-image').css('transform', 'scale(1.05)');
        },
        function () {
            $(this).find('.exp-image').css('transform', 'scale(1)');
        }
    );

    // Hiệu ứng hover cho các thẻ sự kiện
    $('.event-card').hover(
        function () {
            $(this).find('.event-image').css('transform', 'scale(1.05)');
            $(this).find('.event-content').css('background', 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)');
        },
        function () {
            $(this).find('.event-image').css('transform', 'scale(1)');
            $(this).find('.event-content').css('background', 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)');
        }
    );

    // Thêm hiệu ứng fade-in cho các section
    $(window).on('scroll', function () {
        $('.features, .offers').each(function () {
            if ($(window).scrollTop() + $(window).height() > $(this).offset().top) {
                $(this).animate({ 'opacity': 1 }, 1000);
            }
        });
    });

    // Khởi tạo opacity cho các section features và offers
    $('.features, .offers').css('opacity', 0);

    // Dữ liệu cho phần Trải nghiệm
    const experienceData = {
        'LA BRASSERIE': {
            images: [
                '../Images/labrasserie.jpg',
                '../Images/labrasserie2.jpg',
                '../Images/labrasserie3.jpg'
                
            ],
            title: 'LA BRASSERIE',
            description: 'La Brasserie cung cấp các quầy buffet quốc tế đa dạng cho bữa sáng và tối, không gian thư giãn khi ghé thăm để thưởng thức bữa ăn nhẹ nhàng. Trải nghiệm ẩm thực Pháp chính thống trong không gian sang trọng với tầm nhìn toàn cảnh thành phố.'
        },
        'THE LOUNGE': {
            images: [
                '../Images/thelounge.jpg',
                '../Images/thelounge2.jpg',
                '../Images/thelounge1.jpg'
            ],
            title: 'THE LOUNGE',
            description: 'The Lounge là trải nghiệm thư giãn nơi khách có thể thưởng thức cocktail và đồ uống cao cấp trong không gian hiện đại sang trọng với trần cao thoáng đãng.'
        },
        'MING COURT': {
            images: [
                '../Images/mingcourt.jpg',
                '../Images/mingcourt2.jpg',
                '../Images/mingcourt3.jpg'
            ],
            title: 'MING COURT',
            description: 'Trải nghiệm ẩm thực Quảng Đông tinh tế tại Ming Court, nơi các đầu bếp bậc thầy của chúng tôi tạo ra các món ăn chính thống sử dụng nguyên liệu cao cấp trong không gian phương Đông sang trọng.'
        },
        'SWIMMING POOL': {
            images: [
                '../Images/hoboi.jpg',
                '../Images/hoboi2.jpg',

            ],
            title: 'HỒ BƠI',
            description: 'Thư giãn trong hồ bơi vô cực tuyệt đẹp của chúng tôi trong khi thưởng thức tầm nhìn ngoạn mục ra đường chân trời thành phố. Một ốc đảo đô thị hoàn hảo để thư giãn và giải trí.'
        },
        'REN SPA': {
            images: [
                '../Images/spa.jpg',
                '../Images/stdnen1.webp',
                '../Images/suinen3.webp'
            ],
            title: 'REN SPA',
            description: 'Đắm chìm trong thế giới thanh bình tại Ren Spa, nơi truyền thống chữa lành cổ xưa của Châu Á gặp gỡ sự sang trọng hiện đại. Các chuyên gia trị liệu của chúng tôi cung cấp các liệu pháp tái tạo trong môi trường yên bình.'
        },
        'GYM': {
            images: [
                '../Images/dlx4.webp',
                '../Images/dlx5.webp',
                '../Images/sui2.jpg'
            ],
            title: 'PHÒNG TẬP',
            description: 'Duy trì thể lực trong thời gian lưu trú tại trung tâm thể dục hiện đại của chúng tôi, được trang bị các máy tập thể dục mới nhất và các huấn luyện viên chuyên nghiệp hỗ trợ thói quen tập luyện của bạn.'
        }
    };

    // Hàm cập nhật nội dung cho phần Trải nghiệm
    function updateExperienceContent(tabName) {
        const data = experienceData[tabName];
        const $container = $('.exp-content');

        // Tạo HTML cho phần hình ảnh
        const imagesHTML = data.images.map(img =>
            `<div class="exp-image" style="background-image: url('${img}');"></div>`
        ).join('');

        // Cập nhật nội dung với hiệu ứng fade
        $container.fadeOut(300, function () {
            $container.html(`
                <div class="exp-image-container">
                    ${imagesHTML}
                </div>
                <div class="exp-info">
                    <h3>${data.title}</h3>
                    <p>${data.description}</p>
                    <a href="#" class="learn-more">Xem thêm</a>
                </div>
            `).fadeIn(300);
        });
    }

    // Xử lý sự kiện click cho các tab
    $('.exp-tab').click(function (e) {
        e.preventDefault();
        const tabName = $(this).text();

        // Cập nhật trạng thái active
        $('.exp-tab').removeClass('active');
        $(this).addClass('active');

        // Cập nhật nội dung
        updateExperienceContent(tabName);
    });

    // Kích hoạt tab đầu tiên khi tải trang
    $('.exp-tab:first').trigger('click');

    // Hàm hiển thị thông báo
    function showNotification(message, type = 'success') {
        const notification = $(`
            <div class="notification ${type}">
                <p>${message}</p>
                <button class="close-btn">&times;</button>
            </div>
        `).appendTo('body');

        notification.animate({ right: '20px' }, 500);

        setTimeout(() => {
            notification.animate({ right: '-100%' }, 500, function () {
                $(this).remove();
            });
        }, 3000);

        notification.find('.close-btn').on('click', function () {
            notification.animate({ right: '-100%' }, 500, function () {
                $(this).remove();
            });
        });
    }

    // Xử lý chuyển trang mượt mà
    function loadPage(url) {
        $.ajax({
            url: url,
            type: 'GET',
            beforeSend: function () {
                // Hiển thị loading overlay
                $('body').append('<div class="page-loader"><div class="loader"></div></div>');
                $('.page-loader').fadeIn(200);
            },
            success: function (response) {
                // Lấy nội dung mới
                const $newContent = $(response).find('#main-content').html();

                // Animation fade out nội dung cũ
                $('#main-content').fadeOut(200, function () {
                    // Cập nhật nội dung mới
                    $(this).html($newContent).fadeIn(200, function () {
                        // Khởi tạo lại các component
                        initializeComponents();
                    });

                    // Cập nhật URL
                    window.history.pushState({ path: url }, '', url);

                    // Cuộn lên đầu trang mượt mà
                    $('html, body').animate({
                        scrollTop: 0
                    }, 500);
                });
            },
            error: function () {
                // Nếu có lỗi, chuyển hướng bình thường
                window.location.href = url;
            },
            complete: function () {
                // Ẩn loading
                $('.page-loader').fadeOut(200, function () {
                    $(this).remove();
                });
            }
        });
    }

    // Xử lý click vào các link trong menu
    $('.nav-links a, .logo a').on('click', function (e) {
        const href = $(this).attr('href');

        // Chỉ xử lý các link nội bộ
        if (href.indexOf(window.location.origin) > -1 || href.startsWith('/')) {
            e.preventDefault();
            loadPage(href);
        }
    });

    // Xử lý nút back/forward của trình duyệt
    $(window).on('popstate', function () {
        loadPage(window.location.href);
    });

    // Hàm khởi tạo lại các component sau khi load trang mới
    function initializeComponents() {
        // Khởi tạo lại AOS
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 50
        });

        // Khởi tạo lại các Swiper
        const heroSwiper = new Swiper('.hero.swiper', {
            direction: 'horizontal',
            loop: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 1500,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });

        const roomSwiper = new Swiper('.room-slider.swiper', {
            slidesPerView: 2.2,
            spaceBetween: 70,
            centeredSlides: true,
            loop: true,
            loopedSlides: 3,
            speed: 1000,
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    effect: 'slide'
                },
                768: {
                    slidesPerView: 1.5,
                    spaceBetween: 30,
                    effect: 'slide'
                },
                992: {
                    slidesPerView: 2,
                    spaceBetween: 40
                }
            }
        });

        const offersSwiper = new Swiper('.offers-slider.swiper', {
            slidesPerView: 3,
            spaceBetween: 30,
            centeredSlides: true,
            loop: true,
            loopedSlides: 3,
            speed: 1000,
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    effect: 'slide'
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    effect: 'slide'
                },
                992: {
                    slidesPerView: 2.5,
                    spaceBetween: 30
                }
            }
        });

        // Thiết lập lại hình nền cho các slide
        const images = [
            '../Images/ks_hanoi.jpg',
            '../Images/ks_hanoi1.jpg'
        ];

        $('.hero .swiper-slide').each(function (index) {
            $(this).css('backgroundImage', `url(${images[index % images.length]})`);
        });

        // Khởi tạo lại tab đầu tiên
        $('.exp-tab:first').trigger('click');

        // Cập nhật lại các hiệu ứng parallax
        $(window).trigger('scroll');
    }

    // Xử lý load more mượt mà
    $('#load-more-rooms').on('click', function (e) {
        e.preventDefault();
        const $button = $(this);
        const nextPage = $button.data('page') || 2;

        $.ajax({
            url: $button.attr('href'),
            type: 'GET',
            beforeSend: function () {
                $button.prop('disabled', true).html('<span class="spinner"></span> Đang tải...');
            },
            success: function (response) {
                const $newRooms = $(response).find('.room-card');

                // Animation cho các phòng mới
                $newRooms.hide();
                $('.rooms-container').append($newRooms);
                $newRooms.each(function (index) {
                    $(this).delay(index * 100).fadeIn(500);
                });

                // Cập nhật nút load more
                const $newButton = $(response).find('#load-more-rooms');
                if ($newButton.length) {
                    $button.data('page', nextPage + 1)
                        .attr('href', $newButton.attr('href'));
                } else {
                    $button.fadeOut(300, function () {
                        $(this).remove();
                    });
                }

                // Khởi tạo lại AOS cho các phần tử mới
                AOS.refresh();
            },
            error: function () {
                $button.html('Tải thêm <i class="fas fa-chevron-down"></i>');
            },
            complete: function () {
                $button.prop('disabled', false);
            }
        });
    });

    // Xử lý tab mượt mà
    $('.exp-tab').on('click', function (e) {
        e.preventDefault();
        const $tab = $(this);
        const target = $tab.data('target');

        if (!$tab.hasClass('active')) {
            // Cập nhật trạng thái active
            $('.exp-tab').removeClass('active');
            $tab.addClass('active');

            // Animation chuyển tab
            $('.exp-content').fadeOut(300, function () {
                $.ajax({
                    url: 'get-experience.php',
                    type: 'GET',
                    data: { target: target },
                    success: function (response) {
                        $('.exp-content').html(response).fadeIn(300);
                    }
                });
            });
        }
    });

    // Xử lý form search mượt mà
    $('#search-form').on('submit', function (e) {
        e.preventDefault();
        const formData = $(this).serialize();
        const targetUrl = $(this).attr('action') + '?' + formData;

        loadPage(targetUrl);
    });

    // Thêm transition cho tất cả các hover state
    $('a, button, .nav-item, .room-card').on('mouseenter mouseleave', function (e) {
        $(this).css('transition', 'all 0.3s ease');
    });
    const isLoggedIn = localStorage.getItem('userLoggedIn') || sessionStorage.getItem('userLoggedIn');
    const userData = JSON.parse(localStorage.getItem('userData') || sessionStorage.getItem('userData') || '{}');

    // Xử lý hiển thị nút đăng nhập/avatar user
    // const updateLoginDisplay = () => {
    //     const $loginBtn = $('.book-now');
    //     const $userProfile = $('.user-profile');

    //     if (isLoggedIn === 'true' && userData.role === 'user') {
    //         // Ẩn nút đăng nhập
    //         $loginBtn.hide();

    //         // Hiển thị avatar và thông tin user
    //         $userProfile.html(`
    //             <div class="user-avatar">
    //                 <img src="../Images/user-avatar.jpg" alt="${userData.fullName}">
    //                 <span>${userData.fullName}</span>
    //                 <i class="fas fa-chevron-down"></i>
    //             </div>
    //             <div class="user-dropdown">
    //                 <ul>
    //                     <li><a href=""><i class="fas fa-user"></i>Thông tin cá nhân</a></li>
    //                     <li><a href="" id="bookings"><i class="fas fa-calendar-check"></i>Đặt phòng của tôi</a></li>
    //                     <li><a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i>Đăng xuất</a></li>
    //                 </ul>
    //             </div>
    //         `).show();
    //         $('.user-avatar').click(function (e) {
    //             e.stopPropagation();
    //             $('.user-dropdown').toggleClass('show');
    //         });

    //         // Ẩn dropdown khi click ra ngoài
    //         $(document).click(function (e) {
    //             if (!$(e.target).closest('.user-profile').length) {
    //                 $('.user-dropdown').removeClass('show');
    //             }
    //         });
    //     } else {
    //         // Hiển thị nút đăng nhập và ẩn profile
    //         $loginBtn.show();
    //         $userProfile.hide();
    //     }
   // };

    $(document).on('click', '#logoutBtn', function (e) {
        e.preventDefault();

        if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
            // Xóa thông tin đăng nhập
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('userData');
            sessionStorage.removeItem('userLoggedIn');
            sessionStorage.removeItem('userData');

            // Chuyển về trang chủ và reload
            window.location.reload();
        }
    });
    // Cập nhật hiển thị khi tải trang
    updateLoginDisplay();

}); 