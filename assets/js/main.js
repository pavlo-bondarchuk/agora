document.addEventListener('DOMContentLoaded', function () {
    const languageSwitcher = document.querySelector('.language-switcher');
    if (languageSwitcher) {
        const selectedOption = languageSwitcher.querySelector('.selected-option');

        languageSwitcher.addEventListener('click', function (e) {
            if (!e.target.classList.contains('language-option')) {
                languageSwitcher.classList.toggle('active');
                return;
            }

            const selectedLanguage = e.target.textContent;
            const currentLanguage = selectedOption.textContent;

            selectedOption.textContent = selectedLanguage;
            e.target.textContent = currentLanguage;

            // You can add your site language change logic here
            const newLang = selectedOption.textContent === 'UA' ? 'ua' : 'en';
        });
    }

    const allButton = document.querySelector('.all');
    const catalog = document.querySelector('.sub-menu.catalog');
    const closeBtn = document.querySelector('.close-btn');
    const overlay = document.querySelector('.overlay');
    const body = document.querySelector('body');

    if (allButton && catalog && overlay && body) {
        // Open catalog menu
        allButton.addEventListener('click', () => {
            catalog.classList.toggle('active');
            overlay.classList.toggle('active');
            body.classList.toggle('active');
        });

        // Close catalog when clicking a link inside it
        catalog.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') {
                catalog.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('active');
            }
        });

        // Close catalog on close button
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                catalog.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('active');
            });
        }

        // Close catalog when clicking outside
        document.addEventListener('click', (event) => {
            const isClickInsideMenu = catalog.contains(event.target);
            const isClickOnButton = allButton.contains(event.target);

            if (!isClickInsideMenu && !isClickOnButton) {
                catalog.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('active');
            }
        });
    }

    const menuItems = document.querySelectorAll('.nav__list .has-menu');
    if (menuItems.length) {
        menuItems.forEach((menuItem) => {
            const subMenu = menuItem.querySelector('.sub-menu.sub-container');
            if (!subMenu) return;

            menuItem.addEventListener('click', (event) => {
                event.stopPropagation();

                menuItems.forEach((otherItem) => {
                    const otherSubMenu = otherItem.querySelector('.sub-menu.sub-container');
                    if (otherSubMenu !== subMenu) {
                        otherSubMenu?.classList.remove('active');
                    }
                });

                subMenu.classList.toggle('active');
            });

            subMenu.addEventListener('click', (event) => {
                if (event.target.tagName === 'A') {
                    subMenu.classList.remove('active');
                }
            });
        });

        // Close all open submenus when clicking outside
        document.addEventListener('click', () => {
            document.querySelectorAll('.sub-menu.sub-container.active').forEach((menu) => {
                menu.classList.remove('active');
            });
        });
    }

    // Swiper initializations
    if (document.querySelector('.swiper-hero')) {
        new Swiper('.swiper-hero', {
            loop: true,
            autoplay: {
                delay: 10000,
                disableOnInteraction: false,
            },
            effect: 'fade',
        });
    }

    if (document.querySelector('.category-swiper')) {
        new Swiper('.category-swiper', {
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 0,
        });
    }

    if (document.querySelector('.swiper-hero-mob')) {
        new Swiper('.swiper-hero-mob', {
            slidesPerView: 'auto',
            spaceBetween: 9,
            loop: true,
            centeredSlides: false,
            autoplay: {
                delay: 10000,
                disableOnInteraction: false,
            },
        });
    }

    if (document.querySelector('.catalog-category-swiper')) {
        new Swiper('.catalog-category-swiper', {
            slidesPerView: 4,
            spaceBetween: 38,
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween: 8,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                },
                1240: {
                    slidesPerView: 4,
                    spaceBetween: 38,
                },
            },
        });
    }

    // Product slider
    const thumbsContainer = document.querySelector('.swiper-thumbs');
    const mainContainer = document.querySelector('.swiper-main');

    if (thumbsContainer && mainContainer) {
        const thumbsSwiper = new Swiper(thumbsContainer, {
            direction: 'vertical',
            slidesPerView: 9,
            spaceBetween: 14,
            watchSlidesProgress: true,
            breakpoints: {
                0: {
                    direction: 'horizontal',
                },
                768: {
                    direction: 'vertical',
                },
            },
        });

        const mainSwiperOptions = {
            spaceBetween: 10,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            thumbs: {
                swiper: thumbsSwiper,
            },
        };

        // Добавляем autoplay только для мобильных
        if (window.innerWidth < 768) {
            mainSwiperOptions.autoplay = {
                delay: 3000,
                disableOnInteraction: false,
            };
        }

        const mainSwiper = new Swiper(mainContainer, mainSwiperOptions);
    }

    // Expand/collapse categories
    const categoryTitles = document.querySelectorAll('.category-title');
    categoryTitles.forEach((title) => {
        title.addEventListener('click', () => {
            const parentCategory = title.parentElement;
            const categoryItems = parentCategory.querySelector('.category-items');
            if (!categoryItems) return;

            parentCategory.classList.toggle('open');
            categoryItems.style.display = parentCategory.classList.contains('open')
                ? 'block'
                : 'none';
        });
    });

    // Tabs in popup
    const popupTabs = document.querySelectorAll('.popup-tab');
    const popupSections = document.querySelectorAll('.popup-section');
    popupTabs.forEach((tab) => {
        tab.addEventListener('click', (event) => {
            const tabId = event.target.getAttribute('data-tab');
            if (!tabId) return;

            popupTabs.forEach((t) => t.classList.remove('active'));
            event.target.classList.add('active');

            popupSections.forEach((section) => {
                section.style.display = 'none';
            });

            const activeSection = document.getElementById(tabId);
            if (activeSection) {
                activeSection.style.display = 'block';
            }
        });
    });

    const forgotPasswordBtn = document.querySelector('.forgot-password');
    if (forgotPasswordBtn) {
        forgotPasswordBtn.addEventListener('click', () => {
            popupTabs.forEach((tab) => tab.classList.remove('active'));
            popupSections.forEach((section) => (section.style.display = 'none'));
            const forgotSection = document.getElementById('forgot-password');
            if (forgotSection) forgotSection.style.display = 'block';
        });
    }

    const popup = document.querySelector('.popup');
    const popupBg = document.querySelector('.popup-bg');
    const loginBtn = document.querySelector('.header-login .login');
    const registerBtn = document.querySelector('.register');

    function checkScreenSize() {
        return window.innerWidth > 980;
    }

    function openPopup(tabId) {
        if (!popup || !body) return;

        body.style.overflow = 'hidden';
        popup.style.display = 'flex';
        popupSections.forEach((section) => (section.style.display = 'none'));

        if (checkScreenSize() && popupBg) {
            popupBg.style.display = 'block';
        }

        const activeSection = document.getElementById(tabId);
        if (activeSection) {
            activeSection.style.display = 'block';
        }

        popupTabs.forEach((tab) => {
            tab.classList.toggle('active', tab.dataset.tab === tabId);
        });
    }

    function closePopup() {
        if (!popup || !body) return;

        body.style.overflow = '';
        popup.style.display = 'none';
        if (popupBg) popupBg.style.display = 'none';
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', function (e) {
            e.preventDefault();
            openPopup('login');
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', function (e) {
            e.preventDefault();
            openPopup('register');
        });
    }

    document.addEventListener('click', function (e) {
        if (
            popup &&
            popup.style.display === 'flex' &&
            !e.target.closest('.popup-content') &&
            !e.target.closest('.login') &&
            !e.target.closest('.register')
        ) {
            closePopup();
        }
    });

    // Reopen the right section on resize
    window.addEventListener('resize', function () {
        if (popup && popup.style.display === 'flex') {
            if (popupBg) {
                popupBg.style.display = checkScreenSize() ? 'block' : 'none';
            }
        }
    });

    // Certificates
    const certPopup = document.getElementById('cert_popup');
    const openBtn = document.querySelector('.add_info-btn');
    const certOverlay = document.querySelector('.cert_popup-overlay');

    if (certPopup && openBtn) {
        openBtn.addEventListener('click', () => {
            certPopup.classList.add('active');
            certOverlay.classList.add('active');
        });

        certOverlay.addEventListener('click', () => {
            certPopup.classList.remove('active');
            certOverlay.classList.remove('active');
        });
    }

    // Size table popup
    const openSizeButtons = document.querySelectorAll('.size-table__title');
    const sizePopups = document.querySelectorAll('#size_popup');
    const sizeOverlays = document.querySelectorAll('.size_popup-overlay');

    if (openSizeButtons.length && sizePopups.length && sizeOverlays.length) {
        openSizeButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                // Для каждой кнопки активируем соответствующий попап и оверлей
                sizePopups[index].classList.add('active');
                sizeOverlays[index].classList.add('active');
            });
        });

        sizeOverlays.forEach((overlay, index) => {
            overlay.addEventListener('click', (e) => {
                // Закрытие только если клик вне попапа
                if (!e.target.closest('.size_popup-content')) {
                    sizePopups[index].classList.remove('active');
                    sizeOverlays[index].classList.remove('active');
                }
            });
        });
    }

    // Wishlist count
    const wishlistBtn = document.querySelector('.wishlis-btn');
    const wishlistCount = document.querySelector('.wishlis-count');

    if (wishlistBtn && wishlistCount) {
        wishlistBtn.addEventListener('click', function () {
            let count = parseInt(wishlistCount.textContent, 10);

            if (wishlistBtn.classList.contains('active')) {
                wishlistBtn.classList.remove('active');
                wishlistCount.textContent = Math.max(count - 1, 0);
            } else {
                wishlistBtn.classList.add('active');
                wishlistCount.textContent = count + 1;
            }
        });
    }

    // Favorites tab images
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach((card) => {
        const colorCircles = card.querySelectorAll('.color-circle');
        const images = card.querySelectorAll('.product-image img');

        if (!images.length) return;

        images.forEach((img, index) => {
            img.style.display = index === 0 ? 'block' : 'none';
        });

        if (!colorCircles.length) return;

        colorCircles.forEach((circle) => {
            circle.addEventListener('click', () => {
                const selectedColor = circle.dataset.color;
                if (!selectedColor) return;

                images.forEach((img) => {
                    img.style.display = 'none';
                });

                const matchedImage = card.querySelector(
                    `.product-image img[data-color="${selectedColor}"]`,
                );
                if (matchedImage) {
                    matchedImage.style.display = 'block';
                }
            });
        });
    });

    // Empty cart popup
    const deleteBtn = document.getElementById('delete-button');
    const emptyCartPopup = document.getElementById('empty-cart');
    const popupOverlay = document.querySelector('.popup-overlay');

    if (deleteBtn && emptyCartPopup && popupOverlay) {
        deleteBtn.addEventListener('click', () => {
            emptyCartPopup.classList.toggle('active');
            popupOverlay.classList.toggle('active');
        });

        popupOverlay.addEventListener('click', () => {
            emptyCartPopup.classList.remove('active');
            popupOverlay.classList.remove('active');
        });
    }

    // Filter-menu - wishlist page

    const filterBtn = document.getElementById('filter-button');
    const menu = document.getElementById('filter-menu');
    const breadcrumbs = document.getElementById('menu-breadcrumbs');

    const historyStack = [];

    if (filterBtn && menu && popupOverlay) {
        filterBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
            popupOverlay.classList.toggle('active');

            // Reset to first level (no breadcrumbs)
            historyStack.length = 0;
            showFirstMenu();
            renderBreadcrumbs();
        });

        popupOverlay.addEventListener('click', () => {
            menu.classList.remove('active');
            popupOverlay.classList.remove('active');
            historyStack.length = 0;
            renderBreadcrumbs();
        });
    }

    const links = document.querySelectorAll('.menu-level a[data-target]');

    links.forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.dataset.target;
            const targetMenu = document.getElementById(targetId);

            if (targetMenu) {
                hideAllMenus();
                targetMenu.dataset.active = 'true';

                const currentLabel = this.textContent.trim();
                historyStack.push({ id: targetId, label: currentLabel });

                renderBreadcrumbs();
            }
        });
    });

    function hideAllMenus() {
        document.querySelectorAll('.menu-level').forEach((menu) => {
            menu.dataset.active = 'false';
        });
    }

    function showFirstMenu() {
        const firstMenu = document.querySelector('.menu-level[data-level="1"]');
        if (firstMenu) {
            hideAllMenus();
            firstMenu.dataset.active = 'true';
        }
    }

    function renderBreadcrumbs() {
        breadcrumbs.innerHTML = '';

        historyStack.forEach((crumb, index) => {
            const span = document.createElement('span');
            span.classList.add('crumb');
            span.textContent = crumb.label;
            span.style.cursor = 'pointer';

            span.addEventListener('click', () => {
                // Get ID of menu to show before trimming stack
                const targetId = crumb.id;

                // Trim stack
                historyStack.splice(index + 1);

                // Show menu by saved ID
                showMenuById(targetId);

                renderBreadcrumbs();
            });

            breadcrumbs.appendChild(span);

            // Add › after each
            const separator = document.createElement('span');
            separator.textContent = ' › ';
            breadcrumbs.appendChild(separator);
        });
    }

    function showMenuById(id) {
        hideAllMenus();
        const targetMenu = document.getElementById(id);
        if (targetMenu) {
            targetMenu.dataset.active = 'true';
        } else {
            showFirstMenu(); // fallback
        }
    }

    // Favorites page See more products
    const items = document.querySelectorAll('.favorites-list__item');
    const btn = document.querySelector('.product-more-btn');
    const batchSize = 5; // Number of items to show per batch
    let visibleCount = 0; // Counter for how many items are currently visible

    function showNextBatch() {
        // Show the next batch of items
        for (let i = visibleCount; i < visibleCount + batchSize && i < items.length; i++) {
            items[i].style.display = 'block';
        }

        visibleCount += batchSize;

        // Hide the button if all items are visible
        if (visibleCount >= items.length) {
            btn.style.display = 'none';
        }
    }

    // Show the initial batch of items
    showNextBatch();

    // Button click handler
    btn?.addEventListener('click', showNextBatch);

    // Filter
    const filterSections = document.querySelectorAll('.filter-section');

    filterSections.forEach((section) => {
        const seeMoreBtn = section.querySelector('.see-more__btn');
        const tabs = section.querySelectorAll('.size-tab');
        const optionsGroups = section.querySelectorAll('.size-options');
        const isMobile = window.innerWidth <= 768;
        const isInsideOtherFilters = section.closest('.other-filters') !== null;

        // Handle tabbed filters (e.g. size systems)
        if (tabs.length && optionsGroups.length) {
            tabs.forEach((tab) => {
                tab.addEventListener('click', () => {
                    const type = tab.dataset.sizeType;

                    tabs.forEach((t) => t.classList.remove('active'));
                    tab.classList.add('active');

                    optionsGroups.forEach((group) => {
                        group.style.display = group.dataset.sizeType === type ? 'block' : 'none';
                    });
                });
            });

            optionsGroups.forEach((group) => {
                const checkboxes = group.querySelectorAll('.filter-checkbox');
                const visibleAttr = group.dataset.visibleCount;
                const visibleCount = visibleAttr !== undefined ? parseInt(visibleAttr, 10) : 8;
                const safeVisibleCount = isNaN(visibleCount) ? 5 : visibleCount;

                if (!checkboxes.length || !seeMoreBtn) return;

                const shouldHide = !isMobile || (isMobile && isInsideOtherFilters);

                if (checkboxes.length > safeVisibleCount || (isMobile && isInsideOtherFilters)) {
                    if (shouldHide) {
                        checkboxes.forEach((cb, index) => {
                            if (!isMobile && index < safeVisibleCount) return;
                            cb.style.display = 'none';
                        });

                        seeMoreBtn.style.cursor = 'pointer';
                        seeMoreBtn.addEventListener('click', () => {
                            const isExpanded = seeMoreBtn.classList.toggle('close');
                            checkboxes.forEach((cb, index) => {
                                if (!isMobile && index < safeVisibleCount) return;
                                cb.style.display = isExpanded ? 'flex' : 'none';
                            });
                        });
                    } else {
                        checkboxes.forEach((cb) => (cb.style.display = 'flex'));
                        seeMoreBtn.style.display = 'none';
                    }
                }
            });
        }

        // Handle standard filters (non-tabbed)
        if (!tabs.length && !optionsGroups.length) {
            const optionsContainer = section.querySelector('.filter-options');
            const checkboxes = section.querySelectorAll('.filter-checkbox');

            if (!optionsContainer || !checkboxes.length || !seeMoreBtn) return;

            let visibleCount;

            if (isMobile && isInsideOtherFilters) {
                visibleCount = 0;
            } else {
                const visibleAttr = section.dataset.visibleCount;
                visibleCount = visibleAttr !== undefined ? parseInt(visibleAttr, 10) : 5;
            }

            const safeVisibleCount = isNaN(visibleCount) ? 5 : visibleCount;

            const shouldHide = !isMobile || (isMobile && isInsideOtherFilters);

            if (checkboxes.length > safeVisibleCount || (isMobile && isInsideOtherFilters)) {
                if (shouldHide) {
                    checkboxes.forEach((cb, index) => {
                        if (!isMobile && index < safeVisibleCount) return;
                        cb.style.display = 'none';
                    });

                    seeMoreBtn.style.cursor = 'pointer';
                    seeMoreBtn.addEventListener('click', () => {
                        const isExpanded = seeMoreBtn.classList.toggle('close');
                        checkboxes.forEach((cb, index) => {
                            if (!isMobile && index < safeVisibleCount) return;
                            cb.style.display = isExpanded ? 'flex' : 'none';
                        });
                    });
                } else {
                    checkboxes.forEach((cb) => (cb.style.display = 'flex'));
                    seeMoreBtn.style.display = 'none';
                }
            }
        }
    });

    // Filter tabs for mobile
    const filterTabs = document.querySelectorAll('.filter-tab');
    const allFilterBlocks = document.querySelectorAll('.filter-section, .other-filters');

    if (!filterTabs.length || !allFilterBlocks.length) return;

    filterTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.filterTarget;
            const isAlreadyActive = tab.classList.contains('active');

            // Deactivate all tabs and blocks
            filterTabs.forEach((t) => t.classList.remove('active'));
            allFilterBlocks.forEach((block) => block.classList.remove('active'));

            if (!isAlreadyActive) {
                tab.classList.add('active');

                allFilterBlocks.forEach((block) => {
                    const id = block.dataset.filterId;
                    if (id === target) {
                        block.classList.add('active');
                    }
                });
            }
        });
    });
});
