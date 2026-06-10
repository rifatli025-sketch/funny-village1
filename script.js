// Подключение звуков и эффектов
const soundMoo = document.getElementById('sound-moo');
const soundPolsh = document.getElementById('sound-polsh');
const soundKeyboard = document.getElementById('sound-keyboard');
const soundBirds = document.getElementById('sound-birds');
const soundScream = document.getElementById('sound-scream');
const screamerOverlay = document.getElementById('screamer-overlay');

// Новые звуки уток
const soundGa = document.getElementById('sound-ga');
const soundUtki = document.getElementById('sound-utki');

let nightActivated = false;
let crazyDucksArray = [];

// Активация звуков при первом взаимодействии с сайтом
document.addEventListener('click', () => {
    if (soundBirds && !nightActivated) soundBirds.play().catch(() => {});
}, { once: true });

// 1. Курица бегает хаотично по низу экрана
const chicken = document.getElementById('chicken');
function moveChicken() {
    if (nightActivated) return; 
    const container = document.getElementById('village-container');
    if (!container || !chicken) return;
    const maxX = container.clientWidth - chicken.clientWidth;
    const maxY = container.clientHeight - chicken.clientHeight;
    chicken.style.left = `${Math.random() * maxX}px`;
    chicken.style.top = `${(Math.random() * (maxY * 0.3)) + (maxY * 0.6)}px`;
}
setInterval(moveChicken, 2000);

// 2. Корова (Пасхалка на 67 кликов)
const cow = document.getElementById('cow');
let cowClicks = 0;
cow.addEventListener('click', () => {
    if (nightActivated) return;
    cowClicks++;
    if (cowClicks === 67) {
        soundPolsh.currentTime = 0;
        soundPolsh.play();
        alert('🎵 Польская корова активирована!');
        cowClicks = 0;
    } else {
        soundMoo.currentTime = 0;
        soundMoo.play();
    }
});

// 3. Пугливая свинка телепортируется при наведении мыши
const pig = document.getElementById('pig');
pig.addEventListener('mouseover', () => {
    if (nightActivated) return;
    const container = document.getElementById('village-container');
    const maxX = container.clientWidth - pig.clientWidth;
    const maxY = container.clientHeight - pig.clientHeight;
    pig.style.left = `${Math.random() * maxX}px`;
    pig.style.top = `${(Math.random() * (maxY * 0.3)) + (maxY * 0.6)}px`;
});

// 4. Появление кота через 5 минут игры
setTimeout(() => {
    if (nightActivated) return;
    const cat = document.getElementById('cat-hacker');
    if (cat) cat.classList.remove('hidden');
}, 5 * 60 * 1000);

// 5. Стог сена и Секретная модалка (3 клика)
const hay = document.getElementById('hay');
const secretModal = document.getElementById('secret-modal');
const closeModal = document.getElementById('close-modal');
let hayClicks = 0;

hay.addEventListener('click', () => {
    if (nightActivated) return;
    hayClicks++;
    if (hayClicks >= 3) {
        secretModal.classList.remove('hidden');
        hayClicks = 0;
    }
});
closeModal.addEventListener('click', () => {
    secretModal.classList.add('hidden');
});

// Кот-хакер (Комбинация Ctrl + Shift + C)
document.addEventListener('keydown', (e) => {
    if (nightActivated) return;
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyC') {
        e.preventDefault();
        soundKeyboard.currentTime = 0;
        soundKeyboard.play();
        document.getElementById('village-container').classList.toggle('hacker-mode');
    }
});


// ========================================================
// УСОВЕРШЕНСТВОВАННАЯ УТКА-ДЕТЕКТИВ И СЕКРЕТНОЕ НАШЕСТВИЕ
// ========================================================

const btnHelp = document.getElementById('btn-help');

const duckHints = [
    "Попробуй нажать на корову 67 раз.",
    "Стог сена скрывает секрет. Кликни по нему 3 раза!",
    "Не нажимай кнопку 'Не нажимать', иначе начнется землетрясение...",
    "Дедушка иногда выезжает на своем тракторе, лови его!",
    "Если зажать Ctrl + Shift + C, мир окрасится в хакерские цвета.",
    "Ночью происходят странные вещи... Нажми кнопку 'N', если не боишься."
];

// Кнопка выдает подсказку, намекает на код и ОДИН РАЗ играет ga.mp3
btnHelp.addEventListener('click', () => {
    if (nightActivated) return;
    
    if (soundGa) {
        soundGa.currentTime = 0; // Сброс на начало
        soundGa.play().catch(() => {}); // Воспроизведение
    }
    
    const randomHint = duckHints[Math.floor(Math.random() * duckHints.length)];
    alert(`🦆 Утка-Детектив шепчет: "${randomHint}" \n\n(Псс... А еще поговаривают, если набрать на клавиатуре слово DUCK, то деревню заполонит безумие!)`);
});

// Функция создания одной бешеной утки
function spawnCrazyDuck() {
    if (nightActivated) return;

    const village = document.getElementById('village-container');
    const newDuck = document.createElement('img');
    newDuck.src = 'images/duck.png';
    newDuck.classList.add('crazy-duck');

    const startX = Math.random() * (village.clientWidth - 50);
    const startY = Math.random() * (village.clientHeight - 50);
    newDuck.style.left = `${startX}px`;
    newDuck.style.top = `${startY}px`;

    village.appendChild(newDuck);
    crazyDucksArray.push(newDuck);

    // Хаотичный бег утки
    const duckMoveInterval = setInterval(() => {
        if (nightActivated) {
            clearInterval(duckMoveInterval);
            newDuck.remove();
            return;
        }
        const nextX = Math.random() * (village.clientWidth - 50);
        const nextY = Math.random() * (village.clientHeight - 50);
        
        const currentX = parseFloat(newDuck.style.left);
        if (nextX < currentX) {
            newDuck.style.transform = 'scaleX(-1)';
        } else {
            newDuck.style.transform = 'scaleX(1)';
        }

        newDuck.style.left = `${nextX}px`;
        newDuck.style.top = `${nextY}px`;
    }, 800);
}

// Запуск нашествия + бесконечный utkimp3
function startDuckInvasion() {
    if (nightActivated) return;
    
    // Включаем бесконечное utkimp3 (loop настроен в HTML)
    if (soundUtki) {
        soundUtki.currentTime = 0;
        soundUtki.play().catch(() => {});
    }
    
    alert('🦆 СИСТЕМА ВЗЛОМАНА: НАШЕСТВИЕ БЕЗУМНЫХ УТОК!');
    for (let i = 0; i < 25; i++) {
        setTimeout(spawnCrazyDuck, i * 100);
    }
}

// Ввод DUCK
let inputBuffer = "";
document.addEventListener('keydown', (e) => {
    if (nightActivated) return;
    if (e.key.length === 1) {
        inputBuffer += e.key.toUpperCase();
        if (inputBuffer.length > 4) {
            inputBuffer = inputBuffer.substring(inputBuffer.length - 4);
        }
        if (inputBuffer === "DUCK") {
            startDuckInvasion();
            inputBuffer = "";
        }
    }
    
    // Кнопка S (типо Стоп) — вырубает бесконечный utkimp3, но утки не исчезают
    if (e.code === 'KeyS' && soundUtki && !soundUtki.paused) {
        soundUtki.pause();
    }
});


// Дед на тракторе (Случайный выезд)
const tractor = document.getElementById('tractor');
function driveTractor() {
    if (nightActivated) return;
    tractor.classList.remove('hidden');
    let position = -200;
    const containerWidth = document.getElementById('village-container').clientWidth;
    
    const interval = setInterval(() => {
        if (nightActivated) {
            clearInterval(interval);
            return;
        }
        if (position > containerWidth) {
            clearInterval(interval);
            tractor.classList.add('hidden');
            tractor.style.left = '-200px';
            setTimeout(driveTractor, (Math.random() * 3 + 2) * 60 * 1000);
        } else {
            position += 5;
            tractor.style.left = position + 'px';
        }
    }, 30);
}
setTimeout(driveTractor, 2 * 60 * 1000);

tractor.addEventListener('click', () => {
    alert('🚜 Дедушка: "Эй, уступи дорогу!"');
});

// Кнопка "Не нажимать" + Землетрясение и Скример на 21 клик
const btnDont = document.getElementById('btn-dont-click');
let dontClicks = 0;
let isScreamerLoading = false;

btnDont.addEventListener('click', () => {
    if (isScreamerLoading || nightActivated) return;

    dontClicks++;
    
    if (dontClicks === 1) btnDont.innerText = "Я же просил...";
    else if (dontClicks === 5) btnDont.innerText = "Серьёзно?";
    else if (dontClicks === 10) btnDont.innerText = "Последнее предупреждение!";
    else if (dontClicks === 15) {
        document.getElementById('village-container').classList.add('shake-effect');
        btnDont.innerText = "ОСТАНОВИСЬ!!!";
    }
    else if (dontClicks === 20) btnDont.innerText = "Ну всё, ты доигрался.";
    else if (dontClicks === 21) {
        isScreamerLoading = true;
        btnDont.innerText = "..."; 
        
        setTimeout(() => {
            screamerOverlay.classList.remove('screamer-hidden');
            soundScream.volume = 1.0;
            soundScream.currentTime = 0;
            soundScream.play().catch(() => {});
            
            setTimeout(() => {
                screamerOverlay.classList.add('screamer-hidden');
                document.getElementById('village-container').classList.remove('shake-effect');
                btnDont.innerText = "Не нажимать 🔴";
                dontClicks = 0;
                isScreamerLoading = false;
            }, 4000);
        }, 10000); 
    }
});


// ==========================================
// ХОРРОР-РЕЖИМ ПО КНОПКЕ "N" (С КРАШЕМ)
// ==========================================

const ghostImg = document.createElement('img');
ghostImg.id = 'ghost';
ghostImg.src = 'images/ghost.png';
ghostImg.classList.add('hidden');
document.getElementById('village-container').appendChild(ghostImg);

document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyN' && !nightActivated) {
        nightActivated = true;

        const village = document.getElementById('village-container');
        
        // 1. Переключаем фон на night.jpg
        village.classList.add('night-bg');

        // 2. Глушим птиц и бесконечных уток, врубаем wolf.mp3
        if (soundBirds) soundBirds.pause();
        if (soundUtki) soundUtki.pause(); // ОСТАНАВЛИВАЕМ НАШЕСТВИЕ УТОК И ЗДЕСЬ!
        
        const soundWolves = document.getElementById('sound-wolves');
        if (soundWolves) soundWolves.play().catch(() => {});

        // 3. Мгновенно убираем всех животных, кнопки и бегающих уток
        document.getElementById('cow').classList.add('hidden');
        document.getElementById('chicken').classList.add('hidden');
        document.getElementById('pig').classList.add('hidden');
        document.getElementById('hay').classList.add('hidden');
        document.getElementById('tractor').classList.add('hidden');
        document.querySelector('.controls').classList.add('hidden');
        
        crazyDucksArray.forEach(d => d.remove());
        crazyDucksArray = [];

        // 4. Через 5 секунд плавно появляется ghost.png
        setTimeout(() => {
            ghostImg.classList.remove('hidden');
            
            setTimeout(() => {
                ghostImg.classList.add('ghost-visible');
            }, 50);

            // Движение призрака
            function moveGhost() {
                const maxX = village.clientWidth - ghostImg.clientWidth;
                const maxY = village.clientHeight - ghostImg.clientHeight;
                ghostImg.style.left = `${Math.random() * maxX}px`;
                ghostImg.style.top = `${Math.random() * maxY}px`;
            }
            moveGhost();
            const ghostMovement = setInterval(moveGhost, 2000);

            // 5. Даем призраку полетать 7 секунд, затем врубаем скример и краш
            setTimeout(() => {
                clearInterval(ghostMovement);
                
                // Включаем глитчи экрана
                village.classList.add('glitch-screen');

                // Звук скримера на максимум
                if (soundScream) {
                    soundScream.volume = 1.0;
                    soundScream.currentTime = 0;
                    soundScream.play().catch(() => {});
                }

                // Показываем скример во весь экран
                if (screamerOverlay) {
                    screamerOverlay.classList.remove('screamer-hidden');
                }

                // Через 1.5 секунды — намертво вешаем вкладку
                setTimeout(() => {
                    while (true) {
                        console.log("CRASH_OVERFLOW");
                    }
                }, 1500);

            }, 7000);

        }, 5000);
    }
});