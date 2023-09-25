const bossAttack = 3;
let characterCount = 0;
const characterAttack = 1;
const characterHP = 100;
const bossHealth = 1000; // Make bossHealth a constant
let bossCount = 0;
const superBossAttack = 5;
let superBossCount = 0;
const superBossHealth = 1500;


const bosses = new Set();
const characters = new Set();
const superBosses = new Set();

const backgroundAudio = new Audio('Audio/Wii.mp3'); // Create an audio element

function startAudio() {
  if (!backgroundAudio.paused) {
    backgroundAudio.pause();
    backgroundAudio.currentTime = 0;
  }
  backgroundAudio.play().catch(error => console.error('Audio play error:', error));
}

function spawnCharacter() {
  characterCount++;

  // Play YAHOO.mp3 audio
  const yahooAudio = new Audio('Audio/YAHOO.mov');
  yahooAudio.play().catch(error => console.error('Yahoo audio play error:', error));

  const character = document.createElement('div');
  character.classList.add('character');

  const randomTop = Math.random() * (window.innerHeight - 60);
  const randomLeft = Math.random() * (window.innerWidth - 60);

  character.style.top = `${randomTop}px`;
  character.style.left = `${randomLeft}px`;

  const characterImage = document.createElement('img');
  characterImage.src = 'Images/Mario.png';
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

  const spawnAudio = new Audio('Audio/MrBeastSpawn.mov');
  spawnAudio.play().catch(error => console.error('spawn audio play error:', error));

  const newBoss = document.createElement('div');
  newBoss.classList.add('boss');

  const randomTop = Math.random() * (window.innerHeight - 60);
  const randomLeft = Math.random() * (window.innerWidth - 60);

  newBoss.style.top = `${randomTop}px`;
  newBoss.style.left = `${randomLeft}px`;

  const bossImage = document.createElement('img');
  bossImage.src = 'Images/MrBeast.png';
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

function spawnSuperBoss() {
  superBossCount++;

  const newSuperBoss = document.createElement('div');
  newSuperBoss.classList.add('superboss');

  const randomTop = Math.random() * (window.innerHeight - 60);
  const randomLeft = Math.random() * (window.innerWidth - 60);

  newSuperBoss.style.top = `${randomTop}px`;
  newSuperBoss.style.left = `${randomLeft}px`;

  const superBossImage = document.createElement('img');
  superBossImage.src = 'Images/Joe.png';
  superBossImage.alt = `Character ${characterCount}`;
  superBossImage.style.width = '100%';
  superBossImage.style.height = '100%';

  const superBossHPDisplay = document.createElement('div');
  superBossHPDisplay.classList.add('superBoss-hp');
  superBossHPDisplay.innerText = `HP: ${superBossHealth}`; // Use bossHealth here

  newSuperBoss.appendChild(superBossImage);
  newSuperBoss.appendChild(superBossHPDisplay);
  document.body.appendChild(newSuperBoss);

  const superBossData = {
    element: newSuperBoss,
    hpDisplay: superBossHPDisplay,
    hp: superBossHealth, // Set initial boss health
    isAttacking: false
  };

  superBosses.add(superBossData);

  if (!superBossMoving) {
    superBossMoving = true;
    requestAnimationFrame(moveBossTowardsCharacter);
  }

  if (!bossMoving) {
    bossMoving = true;
    requestAnimationFrame(moveBossTowardsCharacter);
  }

  if (!charactersMoving) {
    charactersMoving = true;
    requestAnimationFrame(moveCharactersTowardsBoss);
  }
}

let superBossMoving = false;

function handleKeyboardInput(event) {
  // Listen for 'C' to spawn character and 'B' to spawn boss
  if (event.key === 'c' || event.key === 'C') {
    spawnCharacter();
  } else if (event.key === 'b' || event.key === 'B') {
    spawnBoss();
  } else if (event.key === 'a' || event.key === 'A') {
    startAudio(); // Start the audio when 'A' key is pressed
  } else if (event.key === 's' || event.key === 'S') {
    spawnSuperBoss(); // Start the audio when 'A' key is pressed
  } 
}

let lastSpawnedType = null;

function startSpawnCheck() {
  setInterval(() => {
    if (bosses.size === 0 && superBosses.size === 0) {
      spawnBoss();
      lastSpawnedType = 'boss';
    } else if (characters.size === 0) {
      spawnCharacter();
      lastSpawnedType = 'character';
    }
  }, 5000); // Check every 10 seconds
}


function moveBossTowardsCharacter() {
  if ((characters.size === 0) || (!bossMoving && !superBossMoving)) {
    bossMoving = false;
    superBossMoving = false;
    return;
  }

  bossMoving = true;
  superBossMoving = true;

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

  for (const superBossData of superBosses) {
    const superBossElement = superBossData.element;
    const superBossRect = superBossElement.getBoundingClientRect();
    let closestCharacter = null;
    let closestDistance = Infinity;

    for (const characterData of characters) {
      const characterRect = characterData.element.getBoundingClientRect();
      const deltaX = characterRect.x - superBossRect.x;
      const deltaY = characterRect.y - superBossRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestCharacter = characterData;
      }
    }

    if (closestCharacter) {
      const deltaX = closestCharacter.element.offsetLeft - superBossRect.x;
      const deltaY = closestCharacter.element.offsetTop - superBossRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const normalizedDeltaX = deltaX / distance;
      const normalizedDeltaY = deltaY / distance;

      const speed = 1;
      const newLeft = superBossRect.x + normalizedDeltaX * speed;
      const newTop = superBossRect.y + normalizedDeltaY * speed;

      superBossElement.style.left = `${newLeft}px`;
      superBossElement.style.top = `${newTop}px`;

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
  if (bosses.size === 0 && superBosses.size === 0) {
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

    for (const superBossData of superBosses) {
      const superBossRect = superBossData.element.getBoundingClientRect();
      const deltaX = superBossRect.x - characterRect.x;
      const deltaY = superBossRect.y - characterRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestBoss = superBossData;
      }
    }

    if (closestBoss) {
      const bossRect = closestBoss.element.getBoundingClientRect();
      const deltaX = bossRect.x - characterRect.x;
      const deltaY = bossRect.y - characterRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const normalizedDeltaX = deltaX / distance;
      const normalizedDeltaY = deltaY / distance;

      const speed = 1; // Adjust this speed value to control character movement speed
      const newLeft = characterRect.x + normalizedDeltaX * speed;
      const newTop = characterRect.y + normalizedDeltaY * speed;

      // Check if the new position is within the screen boundaries
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      if (newLeft > 0 && newLeft < screenWidth - 60) {
        characterData.element.style.left = `${newLeft}px`;
      }

      if (newTop > 0 && newTop < screenHeight - 60) {
        characterData.element.style.top = `${newTop}px`;
      }

      if (distance <= 50) {
        characterAttackBoss(closestBoss);
      }
    }
  }

  if (bosses.size === 0 && superBosses.size === 0) {
    charactersMoving = false; // Stop character movement when both bosses and super bosses are defeated
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
    const dieAudio = new Audio('Audio/MrBeastDie.mov');
    dieAudio.play().catch(error => console.error('die audio play error:', error));

    bossData.element.remove();

    if (bosses.has(bossData)) {
      bosses.delete(bossData);
    } else if (superBosses.has(bossData)) {
      superBosses.delete(bossData);
    }

    // Check if both regular bosses and super bosses are defeated
    if (bosses.size === 0 && superBosses.size === 0) {
      charactersMoving = false;
    }
  }
}


function bossAttackCharacter(characterData) {
  let bossDamage = bossAttack;

  characterData.hp -= bossDamage;
  characterData.hpDisplay.innerText = `HP: ${characterData.hp}`;

  if (characterData.hp <= 0) {
    // Play WAAA.mov audio when character dies
    const waaaAudio = new Audio('Audio/WAAA.mov');
    waaaAudio.play().catch(error => console.error('WAAA audio play error:', error));

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

window.addEventListener('keydown', handleKeyboardInput);

window.addEventListener('load', () => {
  spawnBoss();
  startSpawnCheck(); // Start the spawn check on page load
});

