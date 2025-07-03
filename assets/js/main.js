document.addEventListener('DOMContentLoaded', function () {
    const languageSwitcher = document.querySelector('.language-switcher');
    const selectedOption = languageSwitcher.querySelector('.selected-option');

    // Обработчик клика по переключателю
    languageSwitcher.addEventListener('click', function (e) {
        // Если кликнули не по опции - просто открываем/закрываем меню
        if (!e.target.classList.contains('language-option')) {
            languageSwitcher.classList.toggle('active');
            return;
        }

        // Если кликнули по опции - меняем язык
        const selectedLanguage = e.target.textContent;
        const currentLanguage = selectedOption.textContent;

        // Меняем местами
        selectedOption.textContent = selectedLanguage;
        e.target.textContent = currentLanguage;

        // Можно добавить логику смены языка на сайте
        const newLang = selectedOption.textContent === 'UA' ? 'ua' : 'en';
    });

    // Находим элементы
    const allButton = document.querySelector('.all');
    const catalog = document.querySelector('.sub-menu.catalog');
    const closeBtn = document.querySelector('.close-btn');
    const overlay = document.querySelector('.overlay');
    const body = document.querySelector('body');

    // Открытие меню при клике на ".all"
    allButton.addEventListener('click', () => {
        catalog.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('active');
    });

    catalog.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            catalog.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('active');
        }
    });

    closeBtn.addEventListener('click', () => {
        catalog.classList.remove('active'); // Убираем класс "active"
        overlay.classList.remove('active');
        body.classList.remove('active');
    });

    document.addEventListener('click', (event) => {
        const isClickInsideMenu = catalog.contains(event.target); // Проверяем, клик внутри меню
        const isClickOnButton = allButton.contains(event.target); // Проверяем, клик по кнопке

        if (!isClickInsideMenu && !isClickOnButton) {
            catalog.classList.remove('active'); // Закрываем меню
            overlay.classList.remove('active');
            body.classList.remove('active');
        }
    });

    // Находим все кнопки с классом "has-menu"
    const menuItems = document.querySelectorAll('.nav__list .has-menu');

    // Для каждого элемента .has-menu добавляем обработчики
    menuItems.forEach((menuItem) => {
        const subMenu = menuItem.querySelector('.sub-menu.sub-container');

        menuItem.addEventListener('click', (event) => {
            event.stopPropagation(); // Предотвращаем всплытие

            // Закрываем другие открытые меню
            menuItems.forEach((otherItem) => {
                const otherSubMenu = otherItem.querySelector('.sub-menu.sub-container');
                if (otherSubMenu !== subMenu) {
                    otherSubMenu.classList.remove('active');
                }
            });

            // Переключаем текущее меню
            subMenu.classList.toggle('active');
        });

        // Закрытие меню при клике на ссылку внутри него
        subMenu.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') {
                subMenu.classList.remove('active');
            }
        });
    });

    // Закрытие всех открытых меню при клике вне их
    document.addEventListener('click', () => {
        document.querySelectorAll('.sub-menu.sub-container.active').forEach((menu) => {
            menu.classList.remove('active');
        });
    });

    const swiper = new Swiper('.swiper-hero', {
        loop: true,
        autoplay: {
            delay: 10000,
            disableOnInteraction: false,
        },
        effect: 'fade',
    });

    const swiperCategory = new Swiper('.category-swiper', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 0,
    });

    const swiperHeroMob = new Swiper('.swiper-hero-mob', {
        slidesPerView: 'auto',
        spaceBetween: 9,
        loop: true,
        centeredSlides: false,
        autoplay: {
            delay: 10000,
            disableOnInteraction: false,
        },
    });

    const categorySwiper = new Swiper('.catalog-category-swiper', {
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

    // Выбираем все заголовки категорий
    const categoryTitles = document.querySelectorAll('.category-title');

    // Добавляем обработчик клика для каждого заголовка
    categoryTitles.forEach((title) => {
        title.addEventListener('click', () => {
            const parentCategory = title.parentElement;
            const categoryItems = parentCategory.querySelector('.category-items');

            // Переключаем класс "open" для раскрытия/сокрытия
            parentCategory.classList.toggle('open');

            // Анимация раскрытия/скрытия
            if (parentCategory.classList.contains('open')) {
                categoryItems.style.display = 'block';
            } else {
                categoryItems.style.display = 'none';
            }
        });
    });

    document.querySelectorAll('.popup-tab').forEach((tab) => {
        tab.addEventListener('click', (event) => {
            const tabId = event.target.getAttribute('data-tab');

            // Переключение активной вкладки
            document.querySelectorAll('.popup-tab').forEach((tab) => {
                tab.classList.remove('active');
            });
            event.target.classList.add('active');

            // Переключение секции
            document.querySelectorAll('.popup-section').forEach((section) => {
                section.style.display = 'none';
            });
            document.getElementById(tabId).style.display = 'block';
        });
    });

    document.querySelector('.forgot-password').addEventListener('click', () => {
        document.querySelectorAll('.popup-tab').forEach((tab) => {
            tab.classList.remove('active');
        });

        // Показать секцию "Зміна пароля"
        document.querySelectorAll('.popup-section').forEach((section) => {
            section.style.display = 'none';
        });
        document.getElementById('forgot-password').style.display = 'block';
    });

    // Элементы попапа
    const popup = document.querySelector('.popup');
    const popupSections = document.querySelectorAll('.popup-section');
    const popupBg = document.querySelector('.popup-bg');

    // Кнопки открытия
    const loginBtn = document.querySelector('.header-login .login');
    const registerBtn = document.querySelector('.register');

    function checkScreenSize() {
        return window.innerWidth > 980;
    }

    // Функция открытия попапа с определенной вкладкой
    function openPopup(tabId) {
        body.style.overflow = 'hidden';
        popup.style.display = 'flex';
        // Скрываем все секции
        popupSections.forEach((section) => {
            section.style.display = 'none';
        });

        if (checkScreenSize() && popupBg) {
            popupBg.style.display = 'block';
        }

        // Показываем нужную секцию
        const activeSection = document.getElementById(tabId);
        if (activeSection) {
            activeSection.style.display = 'block';
        }

        // Активируем соответствующую вкладку
        const tabs = document.querySelectorAll('.popup-tab');
        tabs.forEach((tab) => {
            if (tab.dataset.tab === tabId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }

    // Функция закрытия попапа
    function closePopup() {
        body.style.overflow = '';
        popup.style.display = 'none';
        if (popupBg) {
            popupBg.style.display = 'none';
        }
    }

    // Обработчики для кнопок открытия
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

    // Закрытие по клику вне попапа
    document.addEventListener('click', function (e) {
        if (
            popup.style.display === 'flex' &&
            !e.target.closest('.popup-content') &&
            !e.target.closest('.login') &&
            !e.target.closest('.register')
        ) {
            closePopup();
        }
    });

    // Переключение между вкладками
    const tabButtons = document.querySelectorAll('.popup-tab');
    tabButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const tabId = this.dataset.tab;
            openPopup(tabId);
        });
    });

    window.addEventListener('resize', function () {
        if (popup.style.display === 'flex') {
            if (checkScreenSize()) {
                if (popupBg) popupBg.style.display = 'block';
            } else {
                if (popupBg) popupBg.style.display = 'none';
            }
        }
    });
});
