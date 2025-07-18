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

    if (document.querySelector('.swiper-giftcard')) {
        new Swiper('.swiper-giftcard', {
            loop: true,
            effect: 'slide',
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

        if (window.innerWidth < 768) {
            mainSwiperOptions.autoplay = {
                delay: 3000,
                disableOnInteraction: false,
            };
        }

        const mainSwiper = new Swiper(mainContainer, mainSwiperOptions);
    }

    //Gift card swiper
    let giftSwiper = null;

    function initGiftSwiper() {
        const container = document.querySelector('.gift_category-swiper');

        if (window.innerWidth < 1500) {
            if (!giftSwiper) {
                giftSwiper = new Swiper(container, {
                    slidesPerView: 1,
                    spaceBetween: 16,
                    breakpoints: {
                        560: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1140: {
                            slidesPerView: 4,
                        },
                    },
                });
            }
        } else {
            if (giftSwiper) {
                giftSwiper.destroy(true, true);
                giftSwiper = null;
            }
        }
    }

    window.addEventListener('load', initGiftSwiper);
    window.addEventListener('resize', initGiftSwiper);

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

            // Apply overflow only on small screens
            if (window.innerWidth < 460) {
                document.body.style.overflow = 'hidden';
            }
        });

        popupOverlay.addEventListener('click', () => {
            emptyCartPopup.classList.remove('active');
            popupOverlay.classList.remove('active');

            // Reset overflow only on small screens
            if (window.innerWidth < 460) {
                document.body.style.overflow = '';
            }
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

            if (window.innerWidth < 460) {
                popupOverlay.style.backgroundColor = 'transparent';
            } else {
                popupOverlay.style.backgroundColor = '';
            }

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
    const batchSize = 5;
    let visibleCount = 0;

    // Function to show the next batch of items
    function showNextBatch() {
        for (let i = visibleCount; i < visibleCount + batchSize && i < items.length; i++) {
            items[i].style.display = 'block';
        }

        visibleCount += batchSize;

        if (visibleCount >= items.length && btn) {
            btn.style.display = 'none';
        }
    }

    // Initialize only on screens less than 520px
    function initMobileList() {
        if (window.innerWidth < 520 && items.length > 0 && btn) {
            // Hide all items initially
            items.forEach((item) => (item.style.display = 'none'));

            // Reset count and show first batch
            visibleCount = 0;
            btn.style.display = 'block';
            showNextBatch();

            // Attach button handler
            btn.addEventListener('click', showNextBatch);
        }
    }

    initMobileList();

    // Gift-card popup
    const giftCardBtn = document.getElementById('giftcard-popup_open');
    const giftCardPopup = document.getElementById('giftcard-popup');

    if (giftCardBtn && giftCardPopup && popupOverlay) {
        giftCardBtn.addEventListener('click', () => {
            giftCardPopup.classList.toggle('active');
            popupOverlay.classList.toggle('active');
        });

        popupOverlay.addEventListener('click', () => {
            giftCardPopup.classList.remove('active');
            popupOverlay.classList.remove('active');
        });

        if (window.innerWidth < 520) {
            popupOverlay.style.backgroundColor = 'transparent';
        } else {
            popupOverlay.style.backgroundColor = '';
        }
    }

    // FAQ Services

    const titles = document.querySelectorAll('.faq_accordion-title');

    if (titles.length) {
        titles.forEach((title) => {
            title.addEventListener('click', function () {
                const content = this.nextElementSibling;
                const isActive = content.classList.contains('active');

                // Закрыть все
                document.querySelectorAll('.faq_accordion-content.active').forEach((item) => {
                    item.classList.remove('active');
                });

                // Если текущий не был активен — открыть
                if (!isActive) {
                    content.classList.add('active');
                }
            });
        });
    }

    // Custom select

    const customSelect = document.getElementById('custom-select');
    const trigger = document.querySelector('.custom-select__trigger');
    const options = document.querySelectorAll('.custom-option');
    const hiddenInput = document.querySelector('input[type="hidden"]');

    if (customSelect && trigger && options && hiddenInput) {
        trigger.addEventListener('click', function (e) {
            customSelect.classList.toggle('open');
        });

        options.forEach((option) => {
            option.addEventListener('click', function () {
                trigger.textContent = this.textContent;
                hiddenInput.value = this.getAttribute('data-value');
                customSelect.classList.remove('open');
            });
        });

        document.addEventListener('click', function (e) {
            if (!customSelect.contains(e.target)) {
                customSelect.classList.remove('open');
            }
        });
    }

    const cfOpen = document.querySelector('.cf-mobile_title');
    const cfBlock = document.querySelector('.contact-form');

    if (cfOpen && cfBlock) {
        cfOpen.addEventListener('click', () => {
            cfBlock.classList.toggle('active');
        });
    }

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

    if (filterTabs.length && allFilterBlocks.length) {
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
    }

    // Tabs for simple nav

    const tabLinks = document.querySelectorAll('.nav-list-simple a');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabLinks.length && tabContents.length) {
        tabLinks.forEach((link) => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('data-target');
                const targetContent = document.getElementById(targetId);

                if (!targetContent) return;

                const isAlreadyActive = this.classList.contains('active');

                tabLinks.forEach((link) => {
                    link.classList.remove('active');
                    link.parentElement.classList.remove('active');
                });
                tabContents.forEach((content) => content.classList.remove('active'));

                if (!isAlreadyActive) {
                    this.classList.add('active');
                    this.parentElement.classList.add('active');
                    targetContent.classList.add('active');
                }
            });
        });
    }

    const menuTitles = document.querySelectorAll('.footer__menu-title');

    // Check if there are any menu titles
    if (menuTitles.length > 0) {
        menuTitles.forEach((title) => {
            title.addEventListener('click', function () {
                const menu = this.closest('.footer__menu');

                // If the menu container is not found, do nothing
                if (!menu) return;

                const items = menu.querySelectorAll('.footer__menu-item');

                // If there are no menu items, do nothing
                if (!items.length) return;

                items.forEach((item) => {
                    item.classList.toggle('active');
                });
            });
        });
    }

    // Mobile simple menu
    if (window.innerWidth < 768) {
        const openBtn = document.getElementById('mobile-links_btn');
        const simpleOverlay = document.querySelector('.menu-overlay');
        const menuLevel1 = document.querySelector('.menu-level-1');
        const level2Menus = document.querySelectorAll('.menu-level-2');
        let rightMenuOpen = false;

        // Open left menu
        openBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            menuLevel1.classList.add('active');
            document.body.classList.add('no-scroll');
        });

        function closeLeftMenuIfAllowed(e) {
            const isClickInsideMenu = menuLevel1.contains(e.target);
            const isClickOnButton = openBtn.contains(e.target);
            const isClickOnOverlay = e.target === simpleOverlay;
            const anyRightMenuOpen = document.querySelector('.menu-level-2.active');

            if (!isClickInsideMenu && !isClickOnButton && !anyRightMenuOpen && !isClickOnOverlay) {
                menuLevel1.classList.remove('active');
                simpleOverlay?.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        }

        document.addEventListener('click', closeLeftMenuIfAllowed);

        document.querySelectorAll('.menu-level-1-item').forEach((item) => {
            item.addEventListener('click', function (e) {
                e.stopPropagation();
                const target = this.dataset.target;

                level2Menus.forEach((menu) => menu.classList.remove('active'));

                const targetMenu = document.querySelector(`.menu-level-2[data-menu="${target}"]`);
                if (targetMenu) {
                    targetMenu.classList.add('active');
                    simpleOverlay.classList.add('active');
                    rightMenuOpen = true;
                }
            });
        });

        simpleOverlay.addEventListener('click', function (e) {
            e.stopPropagation();

            const activeRight = document.querySelector('.menu-level-2.active');
            if (activeRight) {
                activeRight.classList.remove('active');
                simpleOverlay.classList.remove('active');
                rightMenuOpen = false;
            }
        });
    }

    const container = document.querySelector('.agora-steps_images');

    if (container) {
        const defaultImg = container.querySelector('.step-default');
        const leftImg = container.querySelector('.step-left');
        const rightImg = container.querySelector('.step-right');
        function showImage(zone) {
            defaultImg.style.opacity = zone === 'default' ? '1' : '0';
            leftImg.style.opacity = zone === 'left' ? '1' : '0';
            rightImg.style.opacity = zone === 'right' ? '1' : '0';
        }

        // Desktop hover
        container.addEventListener('mousemove', (e) => {
            const bounds = container.getBoundingClientRect();
            const x = e.clientX - bounds.left;

            if (x < bounds.width / 2) {
                showImage('left');
            } else {
                showImage('right');
            }
        });

        container.addEventListener('mouseleave', () => {
            showImage('default');
        });

        // Touch support
        container.addEventListener('touchstart', handleTouch);
        container.addEventListener('touchmove', handleTouch);
        container.addEventListener('touchend', () => showImage('default'));

        function handleTouch(e) {
            const touch = e.touches[0];
            const bounds = container.getBoundingClientRect();
            const x = touch.clientX - bounds.left;

            if (x < bounds.width / 2) {
                showImage('left');
            } else {
                showImage('right');
            }
        }
    }

    const imgContainer = document.querySelector('.agora-questions_images');
    if (imgContainer) {
        const imgDefault = imgContainer?.querySelector('.img-default');
        const imgHover = imgContainer?.querySelector('.img-hover');
        function showHover() {
            imgDefault.style.opacity = '0';
            imgHover.style.opacity = '1';
        }

        function reset() {
            imgDefault.style.opacity = '1';
            imgHover.style.opacity = '0';
        }

        imgContainer.addEventListener('touchstart', showHover);
        imgContainer.addEventListener('touchend', reset);
        imgContainer.addEventListener('touchcancel', reset);
    }

    const sellerMenuLinks = document.querySelectorAll('.nav-list-simple a');
    const sellerTabContents = document.querySelectorAll('.seller_tab-content');

    if (sellerMenuLinks.length > 0) {
        sellerMenuLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Get the target tab from data attribute
                const targetTab = link.getAttribute('data-tab');
                const targetContent = document.querySelector(
                    `.seller_tab-content[data-tab-content="${targetTab}"]`,
                );

                if (!targetContent) return;

                // Toggle logic: close if already active
                const isActive = targetContent.classList.contains('active');

                // Remove active class from all tabs
                sellerTabContents.forEach((content) => content.classList.remove('active'));

                // Toggle the clicked tab (re-activate only if it wasn't already active)
                if (!isActive) {
                    targetContent.classList.add('active');
                }
            });
        });

        // Close tab when clicking outside the tab content or nav link
        document.addEventListener('click', (e) => {
            const clickedInsideTab = e.target.closest('.seller_tab-content');
            const clickedLink = e.target.closest('.nav-list-simple a');

            if (!clickedInsideTab && !clickedLink) {
                sellerTabContents.forEach((content) => content.classList.remove('active'));
            }
        });
    }

    const toggleBtn = document.querySelector('.collapsed-btn');
    const mobileBlock = document.querySelector('.collapsed-mobile');

    if (toggleBtn && mobileBlock) {
        toggleBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (window.innerWidth < 460) {
                mobileBlock.classList.toggle('active');
            }
        });
    }

    const agoraBl = document.querySelector('.agora-touch-slider');

    if (agoraBl) {
        const images = agoraBl.querySelectorAll('img');
        let current = 0;
        let interval;
        let direction = 1; // 1 — вперёд, -1 — назад

        function updateImage() {
            images[current].classList.remove('active');
            current += direction;

            if (current >= images.length) current = images.length - 1;
            if (current < 0) current = 0;

            images[current].classList.add('active');

            // Остановить на концах
            if (
                (direction === 1 && current === images.length - 1) ||
                (direction === -1 && current === 0)
            ) {
                clearInterval(interval);
            }
        }

        function startCycle(dir) {
            clearInterval(interval);
            direction = dir;
            interval = setInterval(updateImage, 500);
        }

        function stopCycle() {
            clearInterval(interval);
        }

        // Наведение мыши
        agoraBl.addEventListener('mouseenter', () => startCycle(1));
        agoraBl.addEventListener('mouseleave', () => startCycle(-1));

        // Сенсорный экран
        agoraBl.addEventListener('touchstart', () => startCycle(1));
        agoraBl.addEventListener('touchend', () => startCycle(-1));
    }

    const hoverSlider = document.querySelector('.agora-hover-slider');

    if (hoverSlider) {
        const hoverImages = hoverSlider.querySelectorAll('img');
        let hoverCurrent = 0;
        let hoverInterval;
        let hoverDirection = 1;

        function updateHoverImage() {
            hoverImages[hoverCurrent].classList.remove('active');
            hoverCurrent += hoverDirection;

            if (hoverCurrent >= hoverImages.length) hoverCurrent = hoverImages.length - 1;
            if (hoverCurrent < 0) hoverCurrent = 0;

            hoverImages[hoverCurrent].classList.add('active');

            if (
                (hoverDirection === 1 && hoverCurrent === hoverImages.length - 1) ||
                (hoverDirection === -1 && hoverCurrent === 0)
            ) {
                clearInterval(hoverInterval);
            }
        }

        function startHoverCycle(dir) {
            clearInterval(hoverInterval);
            hoverDirection = dir;
            hoverInterval = setInterval(updateHoverImage, 600);
        }

        function stopHoverCycle() {
            clearInterval(hoverInterval);
        }

        // Запускаем только на экранах >= 460px
        if (window.innerWidth >= 460) {
            hoverSlider.addEventListener('mouseenter', () => startHoverCycle(1));
            hoverSlider.addEventListener('mouseleave', () => startHoverCycle(-1));
        }
    }
});
