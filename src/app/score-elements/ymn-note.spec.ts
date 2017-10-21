import { YmnChord } from './ymn-chord';

describe('YmnChord', () => {
  const ymnNote = new YmnChord();

  const tests: {[note: string]: string} = {
    'F': '6',
    'c#': '2',
    'SOL': '8',
    'sIb': '11',
  };

  for (let noteString in tests) {
    const expectedPitch = tests[noteString];
    it(`should interpret ${noteString} as ${expectedPitch}`, () => {
      ymnNote.parse(noteString);
      expect(ymnNote.pitch).toBe(expectedPitch);
    });
  }
});
