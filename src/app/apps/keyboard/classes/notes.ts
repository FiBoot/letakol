export class Note {
  constructor(readonly name: string, readonly frequency: number, public bind: string) {}
}

export const notes = [
  new Note('C4', 261.63, 'q'),
  new Note('C4#', 277.18, '2'),
  new Note('D4', 293.66, 'w'),
  new Note('D4#', 311.13, '3'),
  new Note('E4', 329.63, 'e'),
  new Note('F4', 349.23, 'r'),
  new Note('F4#', 369.99, '5'),
  new Note('G4', 392, 't'),
  new Note('G4#', 415.3, '6'),
  new Note('A4', 440, 'y'),
  new Note('A4#', 466.16, '7'),
  new Note('B4', 493.88, 'u'),
  new Note('C5', 523.25, 'i'),
  new Note('C5#', 554.37, '9'),
  new Note('D5', 587.33, 'o'),
  new Note('D5#', 622.25, '0'),
  new Note('E5', 659.25, 'p'),
  new Note('F5', 698.46, ''),
  new Note('F5#', 739.99, ''),
  new Note('G5', 783.99, ''),
  new Note('G5#', 830.61, ''),
  new Note('A5', 880, ''),
  new Note('A5#', 932.33, '')
];
