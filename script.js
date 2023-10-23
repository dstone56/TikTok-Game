let characterCount = 0;
const characterAttack = 1;
const characterHP = 100;

const bossAttack = 3;
const bossHealth = 1000;
let bossCount = 0;

const superBossAttack = 5;
let superBossCount = 0;
const superBossHealth = 1500;

const superCharacterAttack = 2;
let superCharacterCount = 0;
const superCharacterHP = 250;

let godCount = 0;
const godAttack = 10;
const godHealth = 5000;

let miniCharacterCount = 0;
const miniCharcterAttack = 1;
const miniCharacterHP= 50;

const bosses = new Set();
const characters = new Set();
const superBosses = new Set();
const superCharacters = new Set();
const gods = new Set();
const miniCharacters = new Set();

const backgroundAudio = new Audio('Audio/Wii.mp3'); // Create an audio element
backgroundAudio.volume = 0.4;

function startAudio() {
  if (!backgroundAudio.paused) {
    backgroundAudio.pause();
    backgroundAudio.currentTime = 0;
  }
  backgroundAudio.play().catch(error => console.error('Audio play error:', error));
}

function spawnCharacter() {
  characterCount++;
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
    requestAnimationFrame(moveCharacters);
  }

  if (!bossMoving) {
    bossMoving = true;
    requestAnimationFrame(moveBoss);
  }

  if (!godsMoving) {
    godsMoving = true;
    requestAnimationFrame(moveGods);
  }
}

let characterMoving = false;

function spawnBoss() {
  bossCount++;

  const spawnAudio = new Audio('Audio/MrBeastSpawn.mov');
  spawnAudio.volume = 0.7;
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
    requestAnimationFrame(moveBoss);
  }

  if (!charactersMoving) {
    charactersMoving = true;
    requestAnimationFrame(moveCharacters);
  }

  if (!godsMoving) {
    godsMoving = true;
    requestAnimationFrame(moveGods);
  }
}

let bossMoving = false;

function spawnSuperBoss() {
  superBossCount++;

  const spawnAudio = new Audio('Audio/Joe.mov');
  spawnAudio.play().catch(error => console.error('Joe audio play error:', error));

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
    requestAnimationFrame(moveBoss);
  }

  if (!bossMoving) {
    bossMoving = true;
    requestAnimationFrame(moveBoss);
  }

  if (!charactersMoving) {
    charactersMoving = true;
    requestAnimationFrame(moveCharacters);
  }

  if (!godsMoving) {
    godsMoving = true;
    requestAnimationFrame(moveGods);
  }
}

let superBossMoving = false;

function spawnSuperCharacter() {
  superCharacterCount++;

  const barkAudio = new Audio('Audio/BARK.mov');
  barkAudio.volume = 0.4;
  barkAudio.play().catch(error => console.error('Bark audio play error:', error));

  const newSuperCharacter = document.createElement('div');
  newSuperCharacter.classList.add('supercharacter');

  const randomTop = Math.random() * (window.innerHeight - 60);
  const randomLeft = Math.random() * (window.innerWidth - 60);

  newSuperCharacter.style.top = `${randomTop}px`;
  newSuperCharacter.style.left = `${randomLeft}px`;

  const superCharacterImage = document.createElement('img');
  superCharacterImage.src = 'Images/Speed.png';
  superCharacterImage.alt = `Character ${characterCount}`;
  superCharacterImage.style.width = '100%';
  superCharacterImage.style.height = '100%';

  const superCharacterHPDisplay = document.createElement('div');
  superCharacterHPDisplay.classList.add('superCharacter-hp');
  superCharacterHPDisplay.innerText = `HP: ${superCharacterHP}`; // Use bossHealth here

  newSuperCharacter.appendChild(superCharacterImage);
  newSuperCharacter.appendChild(superCharacterHPDisplay);
  document.body.appendChild(newSuperCharacter);

  const superCharacterData = {
    element: newSuperCharacter,
    hpDisplay: superCharacterHPDisplay,
    hp: superCharacterHP, // Set initial boss health
    isAttacking: false
  };

  superCharacters.add(superCharacterData);

  if (!superBossMoving) {
    superBossMoving = true;
    requestAnimationFrame(moveBoss);
  }

  if (!charactersMoving) {
    charactersMoving = true;
    requestAnimationFrame(moveCharacters);
  }

  if (!superCharactersMoving) {
    superCharactersMoving = true;
    requestAnimationFrame(moveCharacters);
  }

  if (!godsMoving) {
    godsMoving = true;
    requestAnimationFrame(moveGods);
  }

}

let superCharactersMoving = false;

function spawnGod() {
  godCount++;

  const godAudio = new Audio('Audio/God.mov');
  godAudio.play().catch(error => console.error('god audio play error:', error));

  const newGod = document.createElement('div');
  newGod.classList.add('god');

  const randomTop = Math.random() * (window.innerHeight - 60);
  const randomLeft = Math.random() * (window.innerWidth - 60);

  newGod.style.top = `${randomTop}px`;
  newGod.style.left = `${randomLeft}px`;

  const godImage = document.createElement('img');
  godImage.src = 'Images/God.webp';
  godImage.alt = `Character ${characterCount}`;
  godImage.style.width = '100%';
  godImage.style.height = '100%';

  const godHPDisplay = document.createElement('div');
  godHPDisplay.classList.add('god-hp');
  godHPDisplay.innerText = `HP: ${godHealth}`; // Use bossHealth here

  newGod.appendChild(godImage);
  newGod.appendChild(godHPDisplay);
  document.body.appendChild(newGod);

  const godData = {
    element: newGod,
    hpDisplay: godHPDisplay,
    hp: godHealth, // Set initial boss health
    isAttacking: false
  };

  gods.add(godData);

  if (!godsMoving) {
    godsMoving = true;
    requestAnimationFrame(moveGods);
  }

  if (!superBossMoving) {
    superBossMoving = true;
    requestAnimationFrame(moveBoss);
  }

  if (!bossMoving) {
    bossMoving = true;
    requestAnimationFrame(moveBoss);
  }

  if (!charactersMoving) {
    charactersMoving = true;
    requestAnimationFrame(moveCharacters);
  }

  if (!superCharactersMoving) {
    superCharactersMoving = true;
    requestAnimationFrame(moveCharacters);
  }

  if (!miniCharacterMoving) {
    miniCharacterMoving = true;
    requestAnimationFrame(moveCharacters);
  }
}

let godsMoving = false;

function spawnMiniCharacter() {
  miniCharacterCount++;
  const yahooAudio = new Audio('Audio/Peter.mov');
  yahooAudio.play().catch(error => console.error('Yahoo audio play error:', error));

  const miniCharacter = document.createElement('div');
  miniCharacter.classList.add('minicharacter');

  const randomTop = Math.random() * (window.innerHeight - 60);
  const randomLeft = Math.random() * (window.innerWidth - 60);

  miniCharacter.style.top = `${randomTop}px`;
  miniCharacter.style.left = `${randomLeft}px`;

  const miniCharacterImage = document.createElement('img');
  miniCharacterImage.src = 'Images/Peter_Griffin.png';
  miniCharacterImage.alt = `Character ${miniCharacterCount}`;
  miniCharacterImage.style.width = '100%';
  miniCharacterImage.style.height = '100%';

  const miniCharacterHPDisplay = document.createElement('div');
  miniCharacterHPDisplay.classList.add('minicharacter-hp');
  miniCharacterHPDisplay.innerText = `HP: ${miniCharacterHP}`;

  miniCharacter.appendChild(miniCharacterImage);
  miniCharacter.appendChild(miniCharacterHPDisplay);
  document.body.appendChild(miniCharacter);

  const miniCharacterData = {
    element: miniCharacter,
    hpDisplay: miniCharacterHPDisplay,
    hp: miniCharacterHP,
    isAttacking: false
  };

  miniCharacters.add(miniCharacterData);

  if (!charactersMoving) {
    charactersMoving = true;
    requestAnimationFrame(moveCharacters);
  }

  if (!bossMoving) {
    bossMoving = true;
    requestAnimationFrame(moveBoss);
  }

  if (!godsMoving) {
    godsMoving = true;
    requestAnimationFrame(moveGods);
  }

  if (!miniCharacterMoving) {
    miniCharacterMoving = true;
    requestAnimationFrame(moveCharacters);
  }
}

let miniCharacterMoving = false;

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
  } else if (event.key === 't' || event.key === 'T') {
    spawnSuperCharacter(); // Start the audio when 'A' key is pressed
  } else if (event.key === 'g' || event.key === 'G') {
    spawnGod(); // Start the audio when 'A' key is pressed
  } else if (event.key === 'm' || event.key === 'm') {
    spawnMiniCharacter(); 
  }
}

let lastSpawnedType = null;

function startSpawnCheck() {
  setInterval(() => {
    if (bosses.size === 0 && superBosses.size === 0) {
      spawnBoss();
      lastSpawnedType = 'boss';
    } else if (characters.size === 0 && superCharacters.size === 0 && miniCharacters.size === 0) {
      spawnMiniCharacter();
      lastSpawnedType = 'minicharacter';
    }
  }, 5000); // Check every 5 seconds
}

function moveBoss() {
  if ((characters.size === 0 && superCharacters.size === 0 && miniCharacters.size === 0 && gods.size === 0)) {
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
    let closestGod = null;
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

    for (const superCharacterData of superCharacters) {
      const superCharacterRect = superCharacterData.element.getBoundingClientRect();
      const deltaX = superCharacterRect.x - bossRect.x;
      const deltaY = superCharacterRect.y - bossRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestCharacter = superCharacterData;
      }
    }

    for (const miniCharacterData of miniCharacters) {
      const miniCharacterRect = miniCharacterData.element.getBoundingClientRect();
      const deltaX = miniCharacterRect.x - bossRect.x;
      const deltaY = miniCharacterRect.y - bossRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestCharacter = miniCharacterData;
      }
    }

    for (const godData of gods) {
      const godRect = godData.element.getBoundingClientRect();
      const deltaX = godRect.x - bossRect.x;
      const deltaY = godRect.y - bossRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestGod = godData;
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
        bossesAttack(closestCharacter);
      }
    }

    if (closestGod) {
      const deltaX = closestGod.element.offsetLeft - bossRect.x;
      const deltaY = closestGod.element.offsetTop - bossRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const normalizedDeltaX = deltaX / distance;
      const normalizedDeltaY = deltaY / distance;

      const speed = 0.7;
      const newLeft = bossRect.x + normalizedDeltaX * speed;
      const newTop = bossRect.y + normalizedDeltaY * speed;

      bossElement.style.left = `${newLeft}px`;
      bossElement.style.top = `${newTop}px`;

      if (distance <= 50) {
        bossesAttackGod(closestGod);
      }
    }
  }

  for (const superBossData of superBosses) {
    const superBossElement = superBossData.element;
    const superBossRect = superBossElement.getBoundingClientRect();
    let closestCharacter = null;
    let closestGod = null;
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

    for (const superCharacterData of superCharacters) {
      const superCharacterRect = superCharacterData.element.getBoundingClientRect();
      const deltaX = superCharacterRect.x - superBossRect.x;
      const deltaY = superCharacterRect.y - superBossRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestCharacter = superCharacterData;
      }
    }

    for (const miniCharacterData of miniCharacters) {
      const miniCharacterRect = miniCharacterData.element.getBoundingClientRect();
      const deltaX = miniCharacterRect.x - superBossRect.x;
      const deltaY = miniCharacterRect.y - superBossRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestCharacter = miniCharacterData;
      }
    }

    for (const godData of gods) {
      const godRect = godData.element.getBoundingClientRect();
      const deltaX = godRect.x - superBossRect.x;
      const deltaY = godRect.y - superBossRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestGod = godData;
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
        bossesAttack(closestCharacter);
      }
    }

    if (closestGod) {
      const deltaX = closestGod.element.offsetLeft - superBossRect.x;
      const deltaY = closestGod.element.offsetTop - superBossRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const normalizedDeltaX = deltaX / distance;
      const normalizedDeltaY = deltaY / distance;

      const speed = 1;
      const newLeft = superBossRect.x + normalizedDeltaX * speed;
      const newTop = superBossRect.y + normalizedDeltaY * speed;

      superBossElement.style.left = `${newLeft}px`;
      superBossElement.style.top = `${newTop}px`;

      if (distance <= 50) {
        bossesAttackGod(closestGod);
      }
    }
  }
  if (characters.size === 0 && superCharacters.size === 0 && miniCharacters.size === 0 && gods.size === 0) {
    bossMoving = false;
    superBossMoving = false;
  }
  if (bossMoving) {
    requestAnimationFrame(moveBoss);
  }
}

let charactersMoving = false;

function moveCharacters() {
  if (bosses.size === 0 && superBosses.size === 0 && gods.size === 0) {
    charactersMoving = false;
    superCharactersMoving = false;
    miniCharacterMoving = false;
    return;
  }

  charactersMoving = true;
  superCharactersMoving = true;
  miniCharacterMoving = true;

  for (const characterData of characters) {
    const characterRect = characterData.element.getBoundingClientRect();
    let closestBoss = null;
    let closestGod = null;
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

    for (const godData of gods) {
      const godRect = godData.element.getBoundingClientRect();
      const deltaX = godRect.x - characterRect.x;
      const deltaY = godRect.y - characterRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestGod = godData;
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
        charactersAttack(closestBoss);
      }
    }

    if (closestGod) {
      const godRect = closestGod.element.getBoundingClientRect();
      const deltaX = godRect.x - characterRect.x;
      const deltaY = godRect.y - characterRect.y;
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
        charactersAttackGod(closestGod);
      }
    }
  }

  for (const superCharacterData of superCharacters) {
    const superCharacterRect = superCharacterData.element.getBoundingClientRect();
    let closestBoss = null;
    let closestGod = null;
    let closestDistance = Infinity;

    for (const bossData of bosses) {
      const bossRect = bossData.element.getBoundingClientRect();
      const deltaX = bossRect.x - superCharacterRect.x;
      const deltaY = bossRect.y - superCharacterRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestBoss = bossData;
      }
    }

    for (const superBossData of superBosses) {
      const superBossRect = superBossData.element.getBoundingClientRect();
      const deltaX = superBossRect.x - superCharacterRect.x;
      const deltaY = superBossRect.y - superCharacterRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestBoss = superBossData;
      }
    }

    for (const godData of gods) {
      const godRect = godData.element.getBoundingClientRect();
      const deltaX = godRect.x - superCharacterRect.x;
      const deltaY = godRect.y - superCharacterRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestGod = godData;
      }
    }

    if (closestBoss) {
      const bossRect = closestBoss.element.getBoundingClientRect();
      const deltaX = bossRect.x - superCharacterRect.x;
      const deltaY = bossRect.y - superCharacterRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const normalizedDeltaX = deltaX / distance;
      const normalizedDeltaY = deltaY / distance;

      const speed = 1; // Adjust this speed value to control character movement speed
      const newLeft = superCharacterRect.x + normalizedDeltaX * speed;
      const newTop = superCharacterRect.y + normalizedDeltaY * speed;

      // Check if the new position is within the screen boundaries
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      if (newLeft > 0 && newLeft < screenWidth - 60) {
        superCharacterData.element.style.left = `${newLeft}px`;
      }

      if (newTop > 0 && newTop < screenHeight - 60) {
        superCharacterData.element.style.top = `${newTop}px`;
      }

      if (distance <= 50) {
        charactersAttack(closestBoss);
      }
    }

    if (closestGod) {
      const godRect = closestGod.element.getBoundingClientRect();
      const deltaX = godRect.x - superCharacterRect.x;
      const deltaY = godRect.y - superCharacterRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const normalizedDeltaX = deltaX / distance;
      const normalizedDeltaY = deltaY / distance;

      const speed = 1; // Adjust this speed value to control character movement speed
      const newLeft = superCharacterRect.x + normalizedDeltaX * speed;
      const newTop = superCharacterRect.y + normalizedDeltaY * speed;

      // Check if the new position is within the screen boundaries
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      if (newLeft > 0 && newLeft < screenWidth - 60) {
        superCharacterData.element.style.left = `${newLeft}px`;
      }

      if (newTop > 0 && newTop < screenHeight - 60) {
        superCharacterData.element.style.top = `${newTop}px`;
      }

      if (distance <= 50) {
        charactersAttackGod(closestGod);
      }
    }
  }

  for (const miniCharacterData of miniCharacters) {
    const miniCharacterRect = miniCharacterData.element.getBoundingClientRect();
    let closestBoss = null;
    let closestGod = null;
    let closestDistance = Infinity;

    for (const bossData of bosses) {
      const bossRect = bossData.element.getBoundingClientRect();
      const deltaX = bossRect.x - miniCharacterRect.x;
      const deltaY = bossRect.y - miniCharacterRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestBoss = bossData;
      }
    }

    for (const superBossData of superBosses) {
      const superBossRect = superBossData.element.getBoundingClientRect();
      const deltaX = superBossRect.x - miniCharacterRect.x;
      const deltaY = superBossRect.y - miniCharacterRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestBoss = superBossData;
      }
    }

    for (const godData of gods) {
      const godRect = godData.element.getBoundingClientRect();
      const deltaX = godRect.x - miniCharacterRect.x;
      const deltaY = godRect.y - miniCharacterRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestGod = godData;
      }
    }

    if (closestBoss) {
      const bossRect = closestBoss.element.getBoundingClientRect();
      const deltaX = bossRect.x - miniCharacterRect.x;
      const deltaY = bossRect.y - miniCharacterRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const normalizedDeltaX = deltaX / distance;
      const normalizedDeltaY = deltaY / distance;

      const speed = 1; // Adjust this speed value to control character movement speed
      const newLeft = miniCharacterRect.x + normalizedDeltaX * speed;
      const newTop = miniCharacterRect.y + normalizedDeltaY * speed;

      // Check if the new position is within the screen boundaries
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      if (newLeft > 0 && newLeft < screenWidth - 60) {
        miniCharacterData.element.style.left = `${newLeft}px`;
      }

      if (newTop > 0 && newTop < screenHeight - 60) {
        miniCharacterData.element.style.top = `${newTop}px`;
      }

      if (distance <= 50) {
        charactersAttack(closestBoss);
      }
    }

    if (closestGod) {
      const godRect = closestGod.element.getBoundingClientRect();
      const deltaX = godRect.x - miniCharacterRect.x;
      const deltaY = godRect.y - miniCharacterRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const normalizedDeltaX = deltaX / distance;
      const normalizedDeltaY = deltaY / distance;

      const speed = 1; // Adjust this speed value to control character movement speed
      const newLeft = miniCharacterRect.x + normalizedDeltaX * speed;
      const newTop = miniCharacterRect.y + normalizedDeltaY * speed;

      // Check if the new position is within the screen boundaries
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      if (newLeft > 0 && newLeft < screenWidth - 60) {
        miniCharacterData.element.style.left = `${newLeft}px`;
      }

      if (newTop > 0 && newTop < screenHeight - 60) {
        miniCharacterData.element.style.top = `${newTop}px`;
      }

      if (distance <= 50) {
        charactersAttackGod(closestGod);
      }
    }
  }

  if (bosses.size === 0 && superBosses.size === 0 && gods.size === 0) {
    charactersMoving = false; // Stop character movement when both bosses and super bosses are defeated
    superCharactersMoving = false;
    miniCharacterMoving = false;
  }

  if (charactersMoving) {
    requestAnimationFrame(moveCharacters);
  }
}

function moveGods() {
  if (bosses.size === 0 && superBosses.size === 0 && characters.size === 0 && superCharacters.size === 0 && miniCharacters.size === 0) {
    godsMoving = false;
    return;
  }

  godsMoving = true;

  for (const godData of gods) {
    const godElement = godData.element;
    const godRect = godElement.getBoundingClientRect();
    let closestEntity = null;
    let closestDistance = Infinity;

    // Check distance to each entity (character, super character, boss, and super boss)
    for (const entityData of characters) {
      const entityRect = entityData.element.getBoundingClientRect();
      const deltaX = entityRect.x - godRect.x;
      const deltaY = entityRect.y - godRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestEntity = entityData;
      }
    }

    for (const entityData of superCharacters) {
      const entityRect = entityData.element.getBoundingClientRect();
      const deltaX = entityRect.x - godRect.x;
      const deltaY = entityRect.y - godRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestEntity = entityData;
      }
    }

    for (const entityData of miniCharacters) {
      const entityRect = entityData.element.getBoundingClientRect();
      const deltaX = entityRect.x - godRect.x;
      const deltaY = entityRect.y - godRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestEntity = entityData;
      }
    }

    for (const entityData of bosses) {
      const entityRect = entityData.element.getBoundingClientRect();
      const deltaX = entityRect.x - godRect.x;
      const deltaY = entityRect.y - godRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestEntity = entityData;
      }
    }

    for (const entityData of superBosses) {
      const entityRect = entityData.element.getBoundingClientRect();
      const deltaX = entityRect.x - godRect.x;
      const deltaY = entityRect.y - godRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestEntity = entityData;
      }
    }

    if (closestEntity) {
      const entityRect = closestEntity.element.getBoundingClientRect();
      const deltaX = entityRect.x - godRect.x;
      const deltaY = entityRect.y - godRect.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const normalizedDeltaX = deltaX / distance;
      const normalizedDeltaY = deltaY / distance;

      const speed = 1; // Adjust this speed value to control god movement speed
      const newLeft = godRect.x + normalizedDeltaX * speed;
      const newTop = godRect.y + normalizedDeltaY * speed;

      // Check if the new position is within the screen boundaries
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      if (newLeft > 0 && newLeft < screenWidth - 60) {
        godData.element.style.left = `${newLeft}px`;
      }

      if (newTop > 0 && newTop < screenHeight - 60) {
        godData.element.style.top = `${newTop}px`;
      }

      if (distance <= 50) {
        godsAttack(closestEntity);
      }
    }
  }

  if (bosses.size === 0 && superBosses.size === 0 && characters.size === 0 && superCharacters.size === 0 && miniCharacters.size === 0) {
    godsMoving = false;
  }

  if (godsMoving) {
    requestAnimationFrame(moveGods);
  }
}

function charactersAttack(bossData) {
  let characterDamage = characterAttack;
  bossData.hp -= characterDamage;

  bossData.hpDisplay.innerText = `HP: ${bossData.hp}`; // Update the boss's HP display

  if (bossData.hp <= 0) {
    let dieAudio;

    // Play different audio based on the type of boss
    if (superBosses.has(bossData)) {
      // Play a different audio for super bosses
      dieAudio = new Audio('');
    } else {
      // Default audio for regular bosses
      dieAudio = new Audio('Audio/MrBeastDie.mov');
    }

    dieAudio.play().catch(error => console.error('die audio play error:', error));

    bossData.element.remove();

    if (bosses.has(bossData)) {
      bosses.delete(bossData);
    } else if (superBosses.has(bossData)) {
      superBosses.delete(bossData);
    }

    // Check if both regular bosses and super bosses are defeated
    if (bosses.size === 0 && superBosses.size === 0 && gods.size === 0) {
      charactersMoving = false;
    }
  }
}

function bossesAttack(characterData) {
  let bossDamage = bossAttack;

  characterData.hp -= bossDamage;
  characterData.hpDisplay.innerText = `HP: ${characterData.hp}`;

  if (characterData.hp <= 0) {
    let deathAudio;

    // Play different audio based on the type of character
    if (superCharacters.has(characterData) || miniCharacters.has(characterData)) {
      // Play a different audio for super characters
      deathAudio = new Audio('');
    } 
    else {
      // Default audio for regular characters
      deathAudio = new Audio('Audio/WAAA.mov');
      deathAudio.volume = 0.7;
    }

    deathAudio.play().catch(error => console.error('Audio play error:', error));

    characterData.element.remove();

    if (characters.has(characterData)) {
      characters.delete(characterData);
    } else if (superCharacters.has(characterData)) {
      superCharacters.delete(characterData);
    } else if (miniCharacters.has(characterData)) {
      miniCharacters.delete(characterData);
    }

    if (characters.size === 0 && superCharacters.size === 0 && miniCharacters.size === 0 && gods.size === 0) {
      bossMoving = false;
    }
  }
}

function bossesAttackGod(godData) {
  let bossDamage = bossAttack;

  godData.hp -= bossDamage;
  godData.hpDisplay.innerText = `HP: ${godData.hp}`;

  if (godData.hp <= 0) {

    godData.element.remove();

    gods.delete(godData);


    if (characters.size === 0 && superCharacters.size === 0 && miniCharacters.size === 0 && gods.size === 0) {
      bossMoving = false;
    }
  }
}

function charactersAttackGod(godData) {
  let characterDamage = characterAttack;
  godData.hp -= characterDamage;

  godData.hpDisplay.innerText = `HP: ${godData.hp}`; // Update the boss's HP display

  if (godData.hp <= 0) {

    godData.element.remove();
    gods.delete(godData);

    if (bosses.size === 0 && superBosses.size === 0 && gods.size === 0) {
      charactersMoving = false;
    }
  }
}

function godsAttack(entityData) {
  let godDamage = godAttack;

  entityData.hp -= godDamage;
  entityData.hpDisplay.innerText = `HP: ${entityData.hp}`;

  if (entityData.hp <= 0) {
    entityData.element.remove();

    if (characters.has(entityData)) {
      characters.delete(entityData);
      deathAudio = new Audio('Audio/WAAA.mov');
      deathAudio.volume = 0.7;
      deathAudio.play().catch(error => console.error('Audio play error:', error));
    } else if (superCharacters.has(entityData)) {
      superCharacters.delete(entityData);
    } else if (miniCharacters.has(entityData)) {
      miniCharacters.delete(entityData);
    } else if (bosses.has(entityData)) {
      bosses.delete(entityData);
      dieAudio = new Audio('Audio/MrBeastDie.mov');
      dieAudio.play().catch(error => console.error('die audio play error:', error));
    } else if (superBosses.has(entityData)) {
      superBosses.delete(entityData);
    }

    if (characters.size === 0 && superCharacters.size === 0 && bosses.size === 0 && superBosses.size === 0 && miniCharacters.size === 0) {
      godsMoving = false;
    }
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