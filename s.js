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

window.onload=()=>{
    alert("О̴̠͐с̷͖̈́т̸͎̀а̶̼̕в̷̥͋ь̸̬͠ ̶̙̈н̵̻̍а̴̢̉д̴͚̾е̸̘̾ж̴̫̉д̵̮͒ы̷͎͌ ̴̣̊н̸̮̌а̶̬͛ ̷̟̐п̵̜̉ӧ̷̲́р̸̥́ӧ̸͙́г̸͖̃е̶͈̃,̴̡̈́ ̸͂ͅн̷͈̕е̶̩̌ ̵̙̇с̵͙̕м̴͇͊е̶̘̿й̴̧̔ ̴̢̀и̴͇͋х̵̹͘ ̸͖̏т̶̼͗ӓ̸́͜щ̷̲͗и̴̹̑т̷͈̑ь̷̰́ ̷̲̒с̶̩̓ю̶͙̓д̸̨̈́а̶̝̌!̷͇͋ ̷̖̂К̶͎͝а̷̮͒ж̶̻̉д̵̯͘а̴̟͠я̷̺̋ ̷̡̄п̵̝͆ы̵̢͊л̷̖̋и̵̝̓н̷̙́к̴̹͂а̵͇̄ ̴̱̓в̵̛̖ ̵͎̐э̸̳̂т̶̟͊о̵͓̽м̸̝̔ ̷͓̌п̴͙͗р̷̛̞о̶̟̚с̵̙͝т̸̩͝р̸̹̈а̶̳̾н̴̛͇с̵̗̍т̸͕͒в̸̠̅е̶̳̂ ̷̣̏с̶̧̀м̷͔͑е̸̥͒ё̸̻͋т̶͓̑с̶̇ͅя̸̮͆ ̵͓̓н̸͔̂а̸̭͌д̴̣̾ ̷͙̇т̸̜͛в̵̢͊о̴̟̀и̸͔͌м̷̺̐и̷̗͠ ̴̳͗м̵̩͝е̷̣̊ч̷̣̑т̵͚̔а̴̝̂м̴̣̑и̴͇̎.̷̡͗ ̴͚̑З̵͉̊д̴͔̆ё̵ͅс̵̰̆ь̴̙͝ ̷̻̈́р̶̢̔е̸̭̽а̶̧̽л̴̫̆ь̶̹̊н̵̱́о̴̧̓с̴͇͒т̷̱͘ь̸̥̈́ ̵̧͌т̷̰̀а̷̪̾н̶͈͊ц̷̬͒у̵͕̐е̵̬̄т̷̰̄ ̷͍̆н̸̗̓а̶̛͈ ̸͖̈́г̴̣̽р̷̤͊а̴̠́н̸̲̓и̵̧͑ ̶̫̄а̶̪̎б̵̯͝с̵͈̀ӱ̸̤р̶͇̇д̶͚̈́а̴̪̏,̷̝̀ ̵̻̉а̷͈̄ ̵̃ͅб̸͊ͅӗ̷̙з̵͚͗у̶̢͘м̶̭͘и̸̝͂е̶̥͑ ̶͇̈́с̸͉̓т̷͇̕у̴̹̿ч̶̺͛и̵̲̃т̴̜͂ ̷̨̈́в̶̯͒ ̴̋͜д̴̤͆в̷̱̓е̴͎̒р̵̖͛ӥ̶̰,̶̟͠ ̴̜̊у̴̢̾г̶̖̈́о̶̫͋щ̶̺̇а̸͇͊я̸͍̃ ̶̣̅с̸͙͌т̴̬͗р̶̝̚а̴͍̏н̴̑ͅн̴̡̊ы̵̝̐м̵̰͂и̴̰͊ ̷̞͑в̷͖͆и̶̤͂д̶̊ͅе̸̰́н̷̬̇и̴͇͛я̷͚̍м̶̡̍ѝ̷̰.̴̢̾ ̷̜̅З̵̜̒а̶͓̉б̴͖͂у̷̨̀д̶̖̚ь̸̖̃ ̷̝͠о̸̘͊ ̵̫͌з̸̫͠д̷̘̍р̵̛͈а̴̗͋в̴̺́о̴͇̔м̴̮͘ ̸̐ͅс̵̠̕м̴̲̌ы̸̭̂с̸͉̾л̶̮̍е̶̝̄,̷̣̽ ̵̦̿о̷̯͝н̶̬̕ ̴͚̑з̵̱͠д̵̪͆е̵̜̾с̸͉̆ь̸̹͂ ̴̼͂н̵̻̔е̶́͜ ̶̟̊н̶͎̋у̵̱̓ж̴̝̐е̸͔̄н̵̪̿.̷̪͠ ̸̕͜В̸̤̅х̴̦̎о̵̬͐д̴̞̐я̷͓̎ ̷̽͜с̸̤̿ю̷͙̓д̷̟̇а̴͋͜,̵̝̓ ̶̉ͅт̸̪͐ы̵̰͗ ̵̜͗р̷̝͊а̷̨̒с̵͇͛п̴͎͝и̴̹͐с̵͎̎ӹ̴̰́в̶̰̊а̷̗̀е̴̌͜ш̵̰́ь̴͍̔с̶̤̇я̵͙́ ̴̢͂н̴̝̐а̶̡̿ ̶̭͂к̴͈̒а̸̙̊р̶̼͊т̴͉̊ӗ̸̯ ̵̤̐б̶̧̂е̵͙̌з̴̖̅у̶͖̐м̴̜̈́и̸̮̑я̴͇͗,̶̘̈ ̸̻̈́и̶̥́ ̴̗͆т̸̹͛о̸̧͐л̶͕̏ь̷͕͝к̶̬̆ӧ̴̜ ̴̠̓о̶̝̕н̴̳̄ӥ̸̻́ ̴̼͂—̵̖̒ ̵̱̔т̴̲̃е̴̯̓н̸͈̅и̷̧̕ ̶̺̈и̶͘͜ ̵̯͒ш̷̭́е̶̧̌п̵̛̦о̷͙̽т̷͙͝ы̷̗̀ ̶͉̅—̸͖͠ ̵̻͐с̴͇́т̷̰̍а̷̟̀н̴̧̈́у̵̣͂т̸̻̃ ̴̮͑т̶͎̀в̷͈̔ӧ̷̫ӥ̵̰́м̸̫̀и̷̹̃ ̷̭̊п̵̱̋р̸̱̔о̶͉͊в̶̹̽о̵͎͑д̸̡̓н̶̘͌и̴̥̓к̷̦̊а̵͚̇м̵̝́ѝ̸͜ ̴̩́в̷̻͋ ̵̧͒м̷͎̑р̵̳̒а̵̺̔к̴̦͘!̸̹̒k")
    run()
    }