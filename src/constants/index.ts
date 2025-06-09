import colors from '../themes/colors';

export type Template = {
  id: string;
  uri: string;
  name: string;
};

export const templateImages: Template[] = [
  {id: '1', uri: 'https://i.imgflip.com/1bij.jpg', name: 'Drake'},
  {
    id: '2',
    uri: 'https://i.imgflip.com/26am.jpg',
    name: 'Distracted Boyfriend',
  },
  {
    id: '3',
    uri: 'https://i.imgflip.com/1ur9b0.jpg',
    name: 'Left Exit 12 Off Ramp',
  },
  {id: '4', uri: 'https://i.imgflip.com/1otk96.jpg', name: 'Two Buttons'},
  {id: '5', uri: 'https://i.imgflip.com/2wifvo.jpg', name: 'Expanding Brain'},
  {id: '6', uri: 'https://i.imgflip.com/3si4.jpg', name: 'One Does Not Simply'},
  {
    id: '7',
    uri: 'https://i.imgflip.com/1g8my4.jpg',
    name: 'Batman Slapping Robin',
  },
  {id: '8', uri: 'https://i.imgflip.com/30b1gx.jpg', name: 'UNO Draw 25'},
  {
    id: '9',
    uri: 'https://i.imgflip.com/4acd7j.png',
    name: 'Woman Yelling at Cat',
  },
];

export const COLOR_PALETTE = [
  colors.primary,
  colors.white,
  colors.red,
  colors.green,
  colors.blue,
  colors.yellow,
  colors.magenta,
] as const;
