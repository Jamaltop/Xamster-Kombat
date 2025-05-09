const hamster = document.querySelector('.hamster-orig');
const origMoney = document.querySelector('#money');
const hamsterContainer = document.querySelector('.hamster-main');
const energyOrig = document.querySelector('#energy');
const rank = document.querySelector('.rank');
const level = document.querySelector('#levl');
const hamsterFistBackground = document.querySelector('.hamster__points');
const hamsterBackground = document.querySelector('#little__point');
const levelFor = document.querySelector('#levelFor');
const mine = document.querySelector('#mine');
const energyBar = document.querySelector('.hamster__bottom-energy');
const hamsterMarketNtt = document.querySelector('.hamster-market__nft');
const daily_earn = document.querySelector('.hamster-daily_earn');
const niz = document.querySelector('.hamster-bottom-all-pril');
const prilojeniya = document.querySelectorAll('.hamster__bottom-all_first');
const mainNft = document.querySelector('.hamster-nft');
const dayliEarn = document.querySelector('.hamster-daily_earn');
const hamsterSection = document.querySelector('.hamster__section');
const exchange = document.querySelector('#hamster-exchange');
const check = document.getElementById('checkTrue');

let currentLevel = 0;
let money = 0;
let rankIndex = 0;
let energyIndex = 0;
let energyInterval = null;

const energyGoals = [2000, 5000, 6500, 8000, 10000];
const levelGoals = [2000, 4000, 5000, 6000, 8000, 10000, 15000, 20000, 30000, 50000];
const ranks = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Expert',
    'Master',
    'Grandmaster',
    'Legendary',
    'Unreal',
    'Godlike',
    'Immortal',
];

let energy = energyGoals[energyIndex];
energyOrig.textContent = `${energy} / ${energyGoals[energyIndex]}`;
rank.textContent = ranks[rankIndex];
level.textContent = `Level ${currentLevel}/10`;
if (levelFor) levelFor.textContent = `${levelGoals[currentLevel]}`;

function startEnergyRecovery() {
    if (energyInterval) return;

    energyInterval = setInterval(() => {
        if (energy >= energyGoals[energyIndex]) {
            energy = energyGoals[energyIndex];
            clearInterval(energyInterval);
            energyInterval = null;
        } else {
            energy += 20;
            if (energy > energyGoals[energyIndex]) {
                energy = energyGoals[energyIndex];
            }
            energyOrig.innerHTML = `${energy} / ${energyGoals[energyIndex]}`;
        }
    }, 1000);
}

function handlerHamster() {
    if (energy <= 0) return;

    if (energyInterval) {
        clearInterval(energyInterval);
        energyInterval = null;
    }

    if (money === 5000) {
        check.style.display = 'flex';
    }

    energy -= 20;
    if (energy < 0) energy = 0;

    money += 12;
    localStorage.setItem('hamsterData', JSON.stringify({ money, energy, currentLevel, rankIndex }));

    showFloatingNumber('+12');

    const currentGoal = levelGoals[currentLevel];
    const progressPercent = Math.min((money / currentGoal) * 100, 100);
    hamsterBackground.style.width = `${progressPercent}%`;

    if (money >= currentGoal) {
        money = 0;
        energyIndex++;
        if (energyIndex >= energyGoals.length) energyIndex = energyGoals.length - 1;

        energy = energyGoals[energyIndex];
        if (currentLevel < 9) currentLevel++;
        if (rankIndex < ranks.length - 1) rankIndex++;

        level.textContent = `Level ${currentLevel}/10`;
        rank.textContent = ranks[rankIndex];
        if (levelFor) levelFor.textContent = `${levelGoals[currentLevel]}`;
        hamsterBackground.style.width = '0%';
    }

    energyOrig.innerHTML = `${energy} / ${energyGoals[energyIndex]}`;
    origMoney.innerHTML = money;

    if (energy === 0) {
        setTimeout(startEnergyRecovery, 1000);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    // загрузка из localStorage, если нужно
    setTimeout(() => {
        money = 6360000;
        origMoney.innerHTML = money;
    }, 100000);
});

hamster.addEventListener('click', handlerHamster);

function showFloatingNumber(text) {
    const container = document.querySelector('.floating-numbers-container');
    const number = document.createElement('div');
    number.className = 'floating-number';
    number.textContent = text;

    const offsetX = Math.random() * 50 - 40;
    number.style.left = `calc(50% + ${offsetX}px)`;
    number.style.top = '44%';

    hamsterContainer.appendChild(number);

    setTimeout(() => {
        container.removeChild(number);
    }, 1500);
}

prilojeniya.forEach(priloj => {
    priloj.addEventListener('click', () => {
        prilojeniya.forEach(p => {
            p.style.background = 'transparent';
            p.style.color = '';
            p.querySelectorAll('p').forEach(pText => {
                pText.style.color = '';
            });
        });

        priloj.style.cursor = 'pointer';
        priloj.style.background = 'rgba(33, 36, 41, 0.5)';
        priloj.style.color = 'white';
        priloj.style.transition = 'background 0.3s ease-in-out';

        priloj.querySelectorAll('p').forEach(pText => {
            pText.style.color = 'white';
            pText.style.transition = 'color 0.3s ease-in-out';
        });
    });
});

mine.addEventListener('click', () => {
    hamsterContainer.style.height = '851px';
    hamsterContainer.style.transition = 'height 0.3s ease-in-out';
    hamsterContainer.style.transform = 'translateY(-100px)';
    hamsterBackground.style.display = 'none';
    level.style.display = 'none';
    rank.style.display = 'none';
    hamster.style.display = 'none';
    energyBar.style.display = 'none';
    hamsterFistBackground.style.display = 'none';
    niz.style.zIndex = '1000 !important';
    niz.style.transition = 'transform 0.3s ease-in-out';
    niz.style.transform = 'translateY(-100px)';
    niz.style.background = 'rgb(44, 50, 58)';
    niz.style.zIndex = '1000';
    setTimeout(() => {
        hamsterMarketNtt.style.display = 'flex';
        hamsterSection.style.display = 'flex';
        daily_earn.style.display = 'flex';
        mainNft.style.display = 'flex';
    }, 300);
});

exchange.addEventListener('click', () => {
    hamsterContainer.style.height = '762px';
    hamsterContainer.style.transition = 'height 0.3s ease-in-out';
    hamsterContainer.style.transform = 'translateY(0px)';
    hamsterMarketNtt.style.display = 'none';
    hamsterSection.style.display = 'none';
    daily_earn.style.display = 'none';
    mainNft.style.display = 'none';
    niz.style.zIndex = '1000 !important';
    niz.style.transition = 'transform 0.3s ease-in-out';
    niz.style.transform = 'translateY(-200px)';
    niz.style.background = 'rgb(44, 50, 58)';
    niz.style.zIndex = '1000';
    setTimeout(() => {
        hamsterBackground.style.display = 'flex';
        level.style.display = 'flex';
        rank.style.display = 'flex';
        hamster.style.display = 'flex';
        energyBar.style.display = 'flex';
        hamsterFistBackground.style.display = 'flex';
    }, 300);
});
