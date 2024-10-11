// При закрываетии окна (клик на крестик): удаляем класс "modal_active" + set cookie на 7 дн.
// При загрузке страницы popup показывается только если нет cookie
// здесь setCookie - универсальная функция (превышает требования задачи)


document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('subscribe-modal'); // popup
    const closeBtn = modal.querySelector('.modal__close'); //крестик

    function setCookie(name, value, options = {}) {
        options = {
            path: '/',
            SameSite: 'None',
            Secure: true,
            ...options // объединение значений по умолчанию и переданных опций
        };
        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }
        document.cookie = updatedCookie;
        console.log('set cookie=', document.cookie)
    }

    function getCookie(name) {
        const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    if (!getCookie('modalClosed')) {
        modal.classList.add('modal_active');
    } else {
        console.log(' get cookie=', getCookie('modalClosed'))
    }

    // Обработчик "крестика"
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('modal_active'); // скрыть окно
        setCookie('modalClosed', 'true', { 'max-age': 3600 * 24 * 7});
    });
});
