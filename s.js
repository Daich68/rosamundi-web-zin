const draggable = document.getElementById('draggable-element');
let isDragging = false;
let offsetX, offsetY;
let lastMouseX, lastMouseY; // Объявляем переменные для последних координат мыши

// Начало перетаскивания
draggable.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - draggable.getBoundingClientRect().left;
    offsetY = e.clientY - draggable.getBoundingClientRect().top;
    lastMouseX = e.clientX; // Запоминаем исходное положение мыши
    lastMouseY = e.clientY;
    draggable.classList.add('dragging');
});

// Перемещение элемента
document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const currentX = e.clientX - offsetX;
        const currentY = e.clientY - offsetY;

        // Покачивание: меняем угол на основе скорости перемещения мыши
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        const rotation = (deltaX + deltaY) * 0.1; // Регулируем интенсивность вращения

        draggable.style.left = `${currentX}px`;
        draggable.style.top = `${currentY}px`;

        // Добавляем покачивание в виде вращения
        draggable.style.transform = `rotate(${rotation}deg)`;

        // Обновляем последние координаты мыши
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    }
});

// Завершение перетаскивания
document.addEventListener('mouseup', () => {
    isDragging = false;
    draggable.classList.remove('dragging');
    // Убираем покачивание
    draggable.style.transform = `rotate(0deg)`;
});

// Логика работы с JSON и попапом
fetch('poems.json')
.then(response => response.json())
.then(data => {
    const poemList = document.getElementById('poem-list');

    data.poems.forEach(poem => {
        const li = document.createElement('li');
        li.classList.add('poem-item');

        const poemContainer = document.createElement('div');
        poemContainer.classList.add('poem-container');

        const poemText = document.createElement('span');
        poemText.textContent = `poem`;
        poemText.className = 'poem-text';
        poemContainer.appendChild(poemText);

        const poemSymbol = document.createElement('span');
        poemSymbol.textContent = `〔✛〕`;
        poemSymbol.className = 'poem-symbol';
        poemContainer.appendChild(poemSymbol);

        const poemInfo = document.createElement('span');
        poemInfo.textContent = `${poem.id} ${poem.author}`;
        poemInfo.className = 'poem-info';
        poemContainer.appendChild(poemInfo);

        li.appendChild(poemContainer);
        li.setAttribute('data-content', poem.content);

        li.addEventListener('click', () => {
            const popupText = document.getElementById('popup-text');
            popupText.textContent = poem.content;

            const popup = document.getElementById('popup');
            const popupContent = document.querySelector('.popup-content');
            popup.style.display = 'flex';

            const randomRotate = Math.floor(Math.random() * 11) - 5;
            popupContent.style.transform = `rotate(${randomRotate}deg)`;
        });

        poemList.appendChild(li);
    });

    function closePopup(event) {
        const popup = document.getElementById('popup');
        const popupContent = document.querySelector('.popup-content');
    
        // Проверяем, является ли цель события popup
        if (event.target === popup) {
            popup.style.display = 'none';
            popupContent.style.transform = 'rotate(0deg)';
        }
    }
    
    // Добавляем обработчики событий для click и touchstart
    window.addEventListener('click', closePopup);
    window.addEventListener('touchstart', closePopup);
});
