import selectWithBanner from './index.js';

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
  banner: choice => (choice.value === 'Pencil' ? 'Hello John Wick!' : 'Nice choice'),
});

console.log('You chose:', choice);
