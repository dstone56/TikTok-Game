const bossAttack = 3;
let characterCount = 0;
const characterAttack = 1;
const characterHP = 100;
const bossHealth = 1000; // Make bossHealth a constant
let bossCount = 0;


const bosses = new Set();
const characters = new Set();

function spawnCharacter() {
  characterCount++;

  const character = document.createElement('div');
  character.classList.add('character');

  const randomTop = Math.random() * (window.innerHeight - 60);
  const randomLeft = Math.random() * (window.innerWidth - 60);

  character.style.top = `${randomTop}px`;
  character.style.left = `${randomLeft}px`;

  const characterImage = document.createElement('img');
  characterImage.src = 'Mario.png';
  characterImage.alt = `Character ${characterCount}`;
  characterImage.style.width = '100%';
  characterImage.style.height = '100%';

  const characterHPDisplay = document.createElement('div');
  characterHPDisplay.classList.add('character-hp');
  characterHPDisplay.innerText = `HP: ${characterHP}`;

  character.appendChild(characterImage);
  character.appendChild(characterHPDisplay);
  document.body.appendChild(character);

  const characterData = {
    element: character,
    hpDisplay: characterHPDisplay,
    hp: characterHP,
    isAttacking: false
  };

  characters.add(characterData);

  if (!charactersMoving) {
    charactersMoving = true;
    requestAnimationFrame(moveCharactersTowardsBoss);
  }

  if (!bossMoving) {
    bossMoving = true;
    requestAnimationFrame(moveBossTowardsCharacter);
  }
}

let characterMoving = false;

function spawnBoss() {
  bossCount++;

  const newBoss = document.createElement('div');
  newBoss.classList.add('boss');

  const randomTop = Math.random() * (window.innerHeight - 60);
  const randomLeft = Math.random() * (window.innerWidth - 60);

  newBoss.style.top = `${randomTop}px`;
  newBoss.style.left = `${randomLeft}px`;

  const bossImage = document.createElement('img');
  bossImage.src = 'MrBeast.png';
  bossImage.alt = `Character ${characterCount}`;
  bossImage.style.width = '100%';
  bossImage.style.height = '100%';

  const bossHPDisplay = document.createElement('div');
  bossHPDisplay.classList.add('boss-hp');
  bossHPDisplay.innerText = `HP: ${bossHealth}`; // Use bossHealth here

  newBoss.appendChild(bossImage);
  newBoss.appendChild(bossHPDisplay);
  document.body.appendChild(newBoss);

  const bossData = {
    element: newBoss,
    hpDisplay: bossHPDisplay,
    hp: bossHealth, // Set initial boss health
    isAttacking: false
  };

  bosses.add(bossData);

  if (!bossMoving) {
    bossMoving = true;
    requestAnimationFrame(moveBossTowardsCharacter);
  }

  if (!charactersMoving) {
    charactersMoving = true;
    requestAnimationFrame(moveCharactersTowardsBoss);
  }
}

let bossMoving = false;

let lastSpawnedType = null;

function startSpawnCheck() {
  setInterval(() => {
    if (bosses.size === 0 && characters.size === 0) {
    } else if (bosses.size === 0 ) {
      // If no bosses but last spawn wasn't a boss, spawn a boss
      spawnBoss();
      lastSpawnedType = 'boss';
    } else if (characters.size === 0 ) {
      // If no characters but last spawn wasn't a character, spawn a character
      spawnCharacter();
      lastSpawnedType = 'character';
    }
  }, 10000); // Check every 10 seconds
}

function moveBossTowardsCharacter() {
  if (characters.size === 0 || bosses.size === 0) {
    bossMoving = false;
    return;
  }

  bossMoving = true;

  for (const bossData of bosses) {
    const bossElement = bossData.element;
    const bossRect = bossElement.getBoundingClientRect();
    let closestCharacter = null;
    let closestDistance = Infinity;

    for (const characterData of characters) {
      const characterRect = characterData.element.getBoundingClientRect();
      const deltaX = characterRect.x - bossRect.x;
      const deltaY = characterRect.y - bossRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestCharacter = characterData;
      }
    }

    if (closestCharacter) {
      const deltaX = closestCharacter.element.offsetLeft - bossRect.x;
      const deltaY = closestCharacter.element.offsetTop - bossRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const normalizedDeltaX = deltaX / distance;
      const normalizedDeltaY = deltaY / distance;

      const speed = 1;
      const newLeft = bossRect.x + normalizedDeltaX * speed;
      const newTop = bossRect.y + normalizedDeltaY * speed;

      bossElement.style.left = `${newLeft}px`;
      bossElement.style.top = `${newTop}px`;

      if (distance <= 50) {
        bossAttackCharacter(closestCharacter);
      }
    }
  }

  if (bossMoving) {
    requestAnimationFrame(moveBossTowardsCharacter);
  }
}

let charactersMoving = false;

function moveCharactersTowardsBoss() {
  if (bosses.size === 0 || !bossMoving) {
    charactersMoving = false;
    return;
  }

  charactersMoving = true;

  for (const characterData of characters) {
    const characterRect = characterData.element.getBoundingClientRect();
    let closestBoss = null;
    let closestDistance = Infinity;

    for (const bossData of bosses) {
      const bossRect = bossData.element.getBoundingClientRect();
      const deltaX = bossRect.x - characterRect.x;
      const deltaY = bossRect.y - characterRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestBoss = bossData;
      }
    }

    if (closestBoss) {
      const bossRect = closestBoss.element.getBoundingClientRect();
      const deltaX = bossRect.x - characterRect.x;
      const deltaY = bossRect.y - characterRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const normalizedDeltaX = deltaX / distance;
      const normalizedDeltaY = deltaY / distance;

      const speed = 1;
      const newLeft = characterRect.x + normalizedDeltaX * speed;
      const newTop = characterRect.y + normalizedDeltaY * speed;

      characterData.element.style.left = `${newLeft}px`;
      characterData.element.style.top = `${newTop}px`;

      if (distance <= 50) {
        characterAttackBoss(closestBoss);
      }
    }
  }

  if (charactersMoving) {
    requestAnimationFrame(moveCharactersTowardsBoss);
  }
}

function characterAttackBoss(bossData) {
  let characterDamage = characterAttack;
  bossData.hp -= characterDamage;

  bossData.hpDisplay.innerText = `HP: ${bossData.hp}`; // Update the boss's HP display

  if (bossData.hp <= 0) {
    bossData.element.remove();
    bosses.delete(bossData);
  }
}


function bossAttackCharacter(characterData) {
  let bossDamage = bossAttack;

  characterData.hp -= bossDamage;
  characterData.hpDisplay.innerText = `HP: ${characterData.hp}`;

  if (characterData.hp <= 0) {
    characterData.element.remove();
    characters.delete(characterData);
  }
}

function resetGame() {
  document.getElementById('bossHP').innerText = `HP: ${bossHealth}`;
  characterCount = 0;

  characters.forEach(({ element }) => {
    element.remove();
  });
  characters.clear();
}

window.addEventListener('load', () => {
  spawnBoss();
  startSpawnCheck(); // Start the spawn check on page load
});

