window.addEventListener('load', () => {
    const signinBlock = document.getElementById('signin');
    const signinForm = document.getElementById('signin__form');
    const welcomeBlock = document.getElementById('welcome');
    const userIdSpan = document.getElementById('user_id');


    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
        welcomeBlock.classList.add('welcome_active');        // выводим блок WELCOME
        userIdSpan.textContent = storedUserId;              // выводим сохраненный user_id
        signinBlock.classList.remove('signin_active');     // Скрываем auth-форму(user залогинен)
    }

    // Обработка auth-формы
    signinForm.addEventListener('submit', (event) => {
        event.preventDefault();                      // отменяем перезагрузку страницы
        const formData = new FormData(signinForm);  // способ отправить данные для авторизации: FormData

        // Отправляем AJAX-запрос на сервер с formData
        fetch('https://students.netoservices.ru/nestjs-backend/auth', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) // Преобразуем ответ в объект JS
        .then(data => {
            if (data.success) {
                // Успешная авторизация
                localStorage.setItem('user_id', data.user_id);     // Сохраняем user_id
                welcomeBlock.classList.add('welcome_active');     // выводим блок WELCOME
                userIdSpan.textContent = data.user_id;           // выводим user_id
                signinForm.reset();                             // Очищаем форму
                signinBlock.classList.remove('signin_active'); // Скрываем auth-форму
            } else {
                // Неудачная авторизация
                alert('Неверный логин/пароль');
                signinForm.reset();
            }
        })
        .catch(error => {
            console.error('Ошибка авторизации:', error);
        });
    });

    // Создаем кнопку "Выйти"
    welcomeBlock.insertAdjacentHTML('beforeend',
        '<button class="btn" id="logout__btn">Выйти</button>'
    );
    const logoutButton = document.getElementById('logout__btn');

    // Обработка события на кнопке "Выйти"
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('user_id');
        welcomeBlock.classList.remove('welcome_active'); // Скрываем блок WELCOME
        signinBlock.classList.add('signin_active');     // выводим auth-форму
    });
});
