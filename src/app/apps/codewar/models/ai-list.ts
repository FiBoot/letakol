export const AICodeList = {
  randomAI: {
    name: 'Random AI',
    code: `function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

return {
  // mandatory turn function
  playTurn: (AI) => {
    const randomDir = randomNumber(4);
    const aroundMe = AI.look();

    AI.think(
      aroundMe.map(space => space.isEmpty() ?
        ' Empty' : space.isEnemy() ? ' Enemy' : ' Ally'
      )
    );

    switch (randomNumber(3)) {
      case 0: AI.move(randomDir); break;
      case 1: AI.duplicate(randomDir); break;
      case 2: AI.grow(); break;
    }
  }
};`
  },
  nulAI: {
    name: 'Dumb AI',
    code: `return {
  playTurn: (AI) => {
    AI.think(AI.health);
  }
};`
  },
  proAI: {
    name: 'Pro AI',
    code: `function randomNumber(max) {
  return Math.floor(Math.random() * max);
}
function emptySpace(around) {
  return around.filter(s => s.isEmpty()).length;
}
function getEmptyDirs(around) {
  const dirs = [];
  around.map((s, i) => {
    if (s.isEmpty()) { dirs.push(i); }
  });
  return dirs;
}
function getEnemyDirs(around) {
  const dirs = [];
  around.map((s, i) => {
    if (s.isEnemy()) { dirs.push(i); }
  });
  return dirs;
}

return {
  playTurn: async (AI) => {
    const sight = AI.look();

    if (AI.health < 2) { return AI.grow(); }

    const enemyDirs = getEnemyDirs(sight);
    if (enemyDirs.length) {
      return AI.move(enemyDirs[randomNumber(enemyDirs.length)]);
    }

    switch (emptySpace(sight)) {
      case 2: AI.move(getEmptyDirs(sight)[randomNumber(2)]);
        break;
      case 3: AI.duplicate(getEmptyDirs(sight)[randomNumber(3)]);
        break;
      case 4: AI.duplicate(randomNumber(4));
        break;
      default: AI.grow();
    }
  }
};`
  }
};

export const AIList = {
  randomAI: Function(AICodeList.randomAI.code).call(null),
  nulAI: Function(AICodeList.nulAI.code).call(null),
  proAI: Function(AICodeList.proAI.code).call(null),
};
