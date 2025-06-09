import selectWithBanner from './select.js';

const choice = await selectWithBanner<string>({
  message: 'Choose your weapon!',
  choices: [
    'Battle Axe',
    'Sword',
    'Bow and Arrow',
    'Spear',
    'Shield',
    'Hammer',
    'Mace',
    'Dagger',
    'Pencil',
    'Flail',
    'Scimitar',
    'Crossbow',
    'Staff',
  ],
  banner: choice => {
    switch (choice.value) {
      case 'Battle Axe':
      case 'Mace':
      case 'Flail':
        return 'Heavy';
      case 'Staff':
        return 'You shall not pass!';
      case 'Sword':
      case 'Dagger':
      case 'Scimitar':
        return 'Pointy';
      case 'Bow and Arrow':
      case 'Crossbow':
        return 'Ahh, from afar!';
      case 'Pencil':
        return 'Hello John Wick';
      default:
        return 'Nice Choice';
    }
  },
});

console.log('You chose:', choice);
