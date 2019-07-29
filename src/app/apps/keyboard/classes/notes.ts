export class Note {
  constructor(readonly name: string, readonly frequency: number, public bind: string = null) { }
}

const smallKeyboard = [
  new Note('C4', 261.626, 'w'),
  new Note('C4#', 277.183, '3'),
  new Note('D4', 293.665, 'e'),
  new Note('D4#', 311.127, '4'),
  new Note('E4', 329.628, 'r'),
  new Note('F4', 349.228, 't'),
  new Note('F4#', 369.994, '6'),
  new Note('G4', 391.995, 'y'),
  new Note('G4#', 415.305, '7'),
  new Note('A4', 440, 'u'),
  new Note('A4#', 466.164, '8'),
  new Note('B4', 493.883, 'i'),
];

const longKeyboard = [
  new Note('F3', 174.614),
  new Note('F3#', 184.997),
  new Note('G3', 195.998),
  new Note('G3#', 207.652),
  new Note('A3', 220),
  new Note('A3#', 233.082, '1'),
  new Note('B3', 246.942, 'q'),
  new Note('C4', 261.626, 'w'),
  new Note('C4#', 277.183, '3'),
  new Note('D4', 293.665, 'e'),
  new Note('D4#', 311.127, '4'),
  new Note('E4', 329.628, 'r'),
  new Note('F4', 349.228, 't'),
  new Note('F4#', 369.994, '6'),
  new Note('G4', 391.995, 'y'),
  new Note('G4#', 415.305, '7'),
  new Note('A4', 440, 'u'),
  new Note('A4#', 466.164, '8'),
  new Note('B4', 493.883, 'i'),
  new Note('C5', 523.251, 'o'),
  new Note('C5#', 554.365, '0'),
  new Note('D5', 587.33, 'p'),
  new Note('D5#', 622.254, '-'),
  new Note('E5', 659.255, '['),
  new Note('F5', 698.456, ']'),
  new Note('F5#', 739.989),
  new Note('G5', 783.991),
  new Note('G5#', 830.609),
  new Note('A5', 880),
  new Note('A5#', 932.328),
  new Note('B5', 987.767)
];

export const notes = longKeyboard;
