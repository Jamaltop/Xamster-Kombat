const hamster = document.querySelector('.hamster-orig');
const origMoney = document.querySelector('#money');
const energyOrig = document.querySelector('#energy');
const rank = document.querySelector('.rank');
const level = document.querySelector('#levl');
const hamsterBackground = document.querySelector('#little__point');
const levelFor = document.querySelector('#levelFor');
const prilojeniya = document.querySelectorAll('.hamster__bottom-all_first');
let currentLevel = 0;
let energy = 6500;
let money = 0;
let rankIndex = 0;
let energyInterval = null;

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

rank.textContent = ranks[rankIndex];
level.textContent = `Level ${currentLevel}/10`;
if (levelFor) levelFor.textContent = `${levelGoals[currentLevel]}`;

function startEnergyRecovery() {
    if (energyInterval) return;

    energyInterval = setInterval(() => {
        if (energy >= 6500) {
            energy = 6500;
            clearInterval(energyInterval);
            energyInterval = null;
        } else {
            energy += 20;
            energyOrig.innerHTML = `${energy}&nbsp;/&nbsp;6500`;


        }
    }, 1000);
}

function handlerHamster() {
    if (energy <= 0) return;

    if (energyInterval) {
        clearInterval(energyInterval);
        energyInterval = null;
    }

    money += 12;
    energy -= 20;


    const currentGoal = levelGoals[currentLevel];
    const progressPercent = Math.min((money / currentGoal) * 100, 100);
    hamsterBackground.style.width = `${progressPercent}%`;

  
    if (money >= currentGoal) {
        money = 0;
        if (currentLevel < 9) currentLevel++;
        if (rankIndex < ranks.length - 1) rankIndex++;

        level.textContent = `Level ${currentLevel}/10`;
        rank.textContent = ranks[rankIndex];
        if (levelFor) levelFor.textContent = `${levelGoals[currentLevel]}`;
        hamsterBackground.style.width = '0%';
    }

    if (energy < 0) energy = 0;

    if (energy === 0) {
        setTimeout(startEnergyRecovery, 1000);
    }

    origMoney.innerHTML = money;
    energyOrig.innerHTML = `${energy}&nbsp;/&nbsp;6500`;

}

hamster.addEventListener('click', handlerHamster);

prilojeniya.forEach(priloj => {
    priloj.addEventListener('click', () => {
        
      
        prilojeniya.forEach(p => {
            p.style.background = 'transparent';
            p.style.color = ''; 
            p.querySelectorAll('p').forEach(pText => {
                pText.style.color = ''; 
            });
        });
        
        
        priloj.style.background = 'rgba(33, 36, 41, 0.5)';
        priloj.style.color = 'white'; 

       
        priloj.querySelectorAll('p').forEach(pText => {
            pText.style.color = 'white'; 
        });
    });
});
