export const NOTES_TO_PITCHES: {[note: string]: string} = {
  // Yed Music Notation
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '10': '10',
  '11': '11',
  '12': '12',
  '*': '*',
  'X': 'X',

  // English music notation
  'CB': '12', // /!\ One octave down !!!
  'C': '1',
  'C#': '2',
  'DB': '2',
  'D': '3',
  'D#': '4',
  'EB': '4',
  'E': '5',
  'E#': '6',
  'FB': '5',
  'F': '6',
  'F#': '7',
  'GB': '7',
  'G': '8',
  'G#': '9',
  'AB': '9',
  'A': '10',
  'A#': '11',
  'BB': '11',
  'B': '12',
  'B#': '1',  // /!\ One octave up !!!

  // French music notation
  'DOB': '12', // /!\ One octave down !!!
  'DO': '1',
  'DO#': '2',
  'REB': '2',
  'RE': '3',
  'RE#': '4',
  'MIB': '4',
  'MI': '5',
  'MI#': '6',
  'FAB': '5',
  'FA': '6',
  'FA#': '7',
  'SOLB': '7',
  'SOL': '8',
  'SOL#': '9',
  'LAB': '9',
  'LA': '10',
  'LA#': '11',
  'SIB': '11',
  'SI': '12',
  'SI#': '1'  // /!\ One octave up !!!
};

export const OCTAVE_INDICATION_REGEXP = /^((T|B)\d|0)$/i;

export const SYSTEM_INDICATION_REGEXP = /\{((?:.|\s)+?)\}/g;

export const YmnScoreNotation = {
  /**
   * Separators used to split the music in YMN and parse it
   */
  separators: {
    system: /=+/,
    staff: '\n',
    measure: '|',
    beat: '.',
    note: ' ',
    chord: '+',
    part: '-',
  }
}
