const ymnNotationRegExp = /^\d{1,2}$/;

const ENGLISH_NOTATION_REGEXP =  /^([cdefgab])([#b]?)$/i;
export enum EnglishNotesToYmn {
  C = 1,
  D = 3,
  E = 5,
  F = 6,
  G = 8,
  A = 10,
  B = 12,
}
const FRENCH_NOTATION_REGEXP = /(do|re|mi|fa|sol|la|si)([#b]?)/i;
enum FrenchNotesToYmn {
  DO = 1,
  RE = 3,
  MI = 5,
  FA = 6,
  SOL = 8,
  LA = 10,
  SI = 12,
}

export class YmnNote {
  public pitch: string;

  public parse(noteString: string): void {
    if (noteString === '*') {
      this.pitch = '*';
    } else if (ymnNotationRegExp.test(noteString)) {
      this.parseFromYmnNotation(noteString);
    } else if (ENGLISH_NOTATION_REGEXP.test(noteString)) {
      this.parseFromEnglishNotation(noteString);
    } else if (FRENCH_NOTATION_REGEXP.test(noteString)) {
      this.parseFromFrenchNotation(noteString);
    }
  }

  private parseFromYmnNotation(noteString: string) {
    this.pitch = noteString;
  }

  private parseFromEnglishNotation(noteString: string) {
    this.parseFromNonYmnNotation(noteString, ENGLISH_NOTATION_REGEXP, EnglishNotesToYmn);
  }

  private parseFromFrenchNotation(noteString: string) {
    this.parseFromNonYmnNotation(noteString, FRENCH_NOTATION_REGEXP, FrenchNotesToYmn);
  }

  private parseFromNonYmnNotation(noteString: string, notationRegExp, notationNotesEnum) {
    const matched = noteString.match(notationRegExp);
    const note = matched[1].toUpperCase();
    const alteration = matched[2];

    let pitchNumber = notationNotesEnum[note];
    if (alteration === '#') {
      pitchNumber += 1;
    } else if (alteration === 'b') {
      pitchNumber -= 1;
    }

    this.pitch = pitchNumber.toString();
  }
}
