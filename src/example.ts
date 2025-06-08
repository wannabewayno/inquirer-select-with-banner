import selectWithBanner from './index.js';

await selectWithBanner({
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
  loop: false,
  banner: choice => (choice.value === 'Pencil' ? 'Hello John Wick!' : 'Nice choice'),
});
