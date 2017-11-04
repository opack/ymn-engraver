
import { SYSTEM_INDICATION_REGEXP, NOTES_TO_PITCHES, YmnScoreNotation } from './score-elements/score-constants';

const CMN_NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
// Indicates the alteration to the pitch for the notes, depending on the number of sharps in the key signature
const CMN_KEY_SIGNATURES_SHARPS = [
  // If 0 sharps in the key signature, CMN_KEY_SIGNATURES_SHARPS[0] indicates that no note is altered
  [0, 0, 0, 0, 0, 0, 0],
  // If 1 sharp in the key signature, CMN_KEY_SIGNATURES_SHARPS[1] indicates that F is altered by +1 YMN pitch
  [0, 0, 0, +1, 0, 0, 0],
  // If 2 sharps in the key signature, CMN_KEY_SIGNATURES_SHARPS[2] indicates that F and C are altered by +1 YMN pitch
  [+1, 0, 0, +1, 0, 0, 0],
  // If 3 sharps in the key signature, CMN_KEY_SIGNATURES_SHARPS[3] indicates that F, C, G are altered by +1 YMN pitch
  [+1, 0, 0, +1, +1, 0, 0],
  // If 4 sharps in the key signature, CMN_KEY_SIGNATURES_SHARPS[4] indicates that F, C, G, D are altered by +1 YMN pitch
  [+1, +1, 0, +1, +1, 0, 0],
  // If 5 sharps in the key signature, CMN_KEY_SIGNATURES_SHARPS[5] indicates that F, C, G, D, A are altered by +1 YMN pitch
  [+1, +1, 0, +1, +1, +1, 0],
  // If 6 sharps in the key signature, CMN_KEY_SIGNATURES_SHARPS[6] indicates that F, C, G, D, A, E are altered by +1 YMN pitch
  [+1, +1, +1, +1, +1, +1, 0],
  // If 7 sharps in the key signature, CMN_KEY_SIGNATURES_SHARPS[7] indicates that F, C, G, D, A, E, B are altered by +1 YMN pitch
  [+1, +1, +1, +1, +1, +1, +1]
];
// Indicates the alteration to the pitch for the notes, depending on the number of flats in the key signature
const CMN_KEY_SIGNATURES_FLATS = [
  // If 0 flats in the key signature, CMN_KEY_SIGNATURES_FLATS[0] indicates that no note is altered
  [0, 0, 0, 0, 0, 0, 0],
  // If 1 flat in the key signature, CMN_KEY_SIGNATURES_FLATS[1] indicates that F is altered by -1 YMN pitch
  [0, 0, 0, 0, 0, 0, -1],
  // If 2 flats in the key signature, CMN_KEY_SIGNATURES_FLATS[2] indicates that F and C are altered by -1 YMN pitch
  [0, 0, -1, 0, 0, 0, -1],
  // If 3 flats in the key signature, CMN_KEY_SIGNATURES_FLATS[3] indicates that F, C, G are altered by -1 YMN pitch
  [0, 0, -1, 0, 0, -1, -1],
  // If 4 flats in the key signature, CMN_KEY_SIGNATURES_FLATS[4] indicates that F, C, G, D are altered by -1 YMN pitch
  [0, -1, -1, 0, 0, -1, -1],
  // If 5 flats in the key signature, CMN_KEY_SIGNATURES_FLATS[5] indicates that F, C, G, D, A are altered by -1 YMN pitch
  [0, -1, -1, 0, -1, -1, -1],
  // If 6 flats in the key signature, CMN_KEY_SIGNATURES_FLATS[6] indicates that F, C, G, D, A, E are altered by -1 YMN pitch
  [-1, -1, -1, 0, -1, -1, -1],
  // If 7 flats in the key signature, CMN_KEY_SIGNATURES_FLATS[7] indicates that F, C, G, D, A, E, B are altered by -1 YMN pitch
  [-1, -1, -1, -1, -1, -1, -1]
];

const PITCH_INDICATION_REGEXP = /-?\d{1,2}/g;

const DCRN_SPLIT_REGEXP = /(G|F)(?:(#|b)(\d))?\|(.*)/ig;

/**
 * Parse DCRN notes. If a pitch (number, 'x', '*') is found, then it is placed in the first
 * group; if a separator is found ('+', ' ', '.', '|'), then it is placed in the second group.
 */
const DCRN_PARSER_REGEXP = /(-?\d{1,2}|[x\*])|([\+ \.\|])/g;

class DCRNStaffData {
  // Data extracted from input
  public clef: string;
  public alteration: string;
  public alterationCount: number;
  public notes;

  // Computed data
  public clefOffset: number;
  public keySignatureAlteration: Array<number>;
}

/**
 * Translates a DCRN music string into YMN
 */
export class YmnDCRNTranslator {
  private staves: Array<String>;
  private translated: string;

  public translate(DCRN: string): string {
    // Reset translate result
    this.translated = '';

    // Split in systems
    const systems = DCRN.split(YmnScoreNotation.separators.system);

    // Translate each system and append to the result
    systems.forEach(system => this.translateDCRNSystem(system));

    return this.translated;
  }

  private translateDCRNSystem(dcrnSystem: string): void {
    let ymnSystem = '';

    // Split staves
    const dcrnStaves = dcrnSystem.split(YmnScoreNotation.separators.staff);
    dcrnStaves.forEach(dcrnStaff => {
      if (dcrnStaff.length > 0) {
        ymnSystem += this.translateDCRNStaff(dcrnStaff);
      }
    });

    ymnSystem += '===================================\n';
    this.translated += ymnSystem;
  }

  private translateDCRNStaff(dcrnStaff: string): string {
    // If separator staff, then nothing to do
    if (dcrnStaff.charAt(0) === YmnScoreNotation.separators.part) {
      return YmnScoreNotation.separators.part +
      '\n';
    }

    // Extract key signature
    const dcrnData = this.extractData(dcrnStaff);

    // Compute min and max octaves for the DCRN staff
    const bounds = this.computeStaffOctavesBounds(dcrnData);

    // Create one YMN staff for each impacted octave
    const staves: {[octave: number]: string} = [];
    let clefIndication: string;
    for (let octave = bounds.min; octave <= bounds.max; octave++) {
      if (octave > 0) {
        clefIndication = 'T';
      } else {
        clefIndication = 'B';
      }
      staves[octave] = clefIndication + Math.abs(octave) + '|';
    }

    // Translate the staff
    DCRN_PARSER_REGEXP.lastIndex = 0;
    let matched = DCRN_PARSER_REGEXP.exec(dcrnData.notes);
    let parsedPitch;
    let parsedSeparator;
    let inChord = false;
    let dcrnPitch: number;
    let ymnPitch: string;
    let ymnOctave: number;
    let lastYmnOctave: number;
    while (matched !== null) {
      // Retrieve parsed tokens
      parsedPitch = matched[1];
      parsedSeparator = matched[2];

      // Process the parsed token
      if (parsedPitch !== undefined) {
        // If pitch is silence (x) or continuation (*), then we have to place it on the
        // same octave as the previous pitch. But if previous pitch was a chord, we have
        // to place it on the corresponding place (octave and height) too.
        if (parsedPitch === 'x' || parsedPitch === '*') {
          ymnOctave = lastYmnOctave;
          ymnPitch = parsedPitch;
        } else {
          // Compute the YMN octave and pitch from the DCRN pitch
          dcrnPitch = parseInt(parsedPitch) + dcrnData.clefOffset;
          ymnOctave = this.getYMNOctaveForDCRNPitch(dcrnPitch);
          ymnPitch = '' + this.getYMNPitchForDCRNPitch(dcrnPitch, dcrnData.keySignatureAlteration);
        }

        // If in a chord, then if the octave is the same as the previous note we
        // must write both pitches on the same YMN staff and separate them with
        // a '+' sign
        if (inChord) {
          if (lastYmnOctave === ymnOctave) {
            staves[ymnOctave] += '+';
          }
          inChord = false;
        }

        // Write the pitch on the correct YMN staff
        staves[ymnOctave] += ymnPitch;
        lastYmnOctave = ymnOctave;
      } else if (parsedSeparator !== undefined) {
        // If the separator is a '+', then toggle the inChord flag
        if (parsedSeparator === '+') {
          inChord = true;
        }
        // Write the separator on each YMN staff
        else {
          for (let octave = bounds.max; octave >= bounds.min; octave--) {
            staves[octave] += parsedSeparator;
          }
        }
      }

      // Go to the next token
      matched = DCRN_PARSER_REGEXP.exec(dcrnData.notes);
    }

    // Create one string for the system, putting octaves from the highest to the lowest
    let translatedStaff = '';
    for (let octave = bounds.max; octave >= bounds.min; octave--) {
      translatedStaff += staves[octave] + '\n';
    }
    return translatedStaff;
  }

  private extractData(dcrnStaff: string): DCRNStaffData {
    DCRN_SPLIT_REGEXP.lastIndex = 0;
    const matched = DCRN_SPLIT_REGEXP.exec(dcrnStaff);

    const data = new DCRNStaffData();
    data.clef = matched[1];
    data.alteration = matched[2];
    data.alterationCount = parseInt(matched[3]);
    data.notes = matched[4];

    data.clefOffset = this.getClefOffset(data.clef);
    if (data.alteration === '#') {
      data.keySignatureAlteration = CMN_KEY_SIGNATURES_SHARPS[data.alterationCount];
    }
    // If alteration is 'b' or undefined, use FLATS alteration array
    else {
      data.keySignatureAlteration = CMN_KEY_SIGNATURES_FLATS[data.alterationCount];
    }

    return data;
  }

  /**
   * Returns the number of positions to offset DCRN pitch. For G-Clef, DCRN pitch 1
   * means E in the octave 0, but for F-clef the pitch 1 means G in octave B2 ! So
   * to simplify computation we always work as if we were in G-clef but sometimes
   * apply an offset if we are in another clef.
   * All computations are made for the G-clef, so if
   * the clef is F then the middle C is not at the position -2 but at position
   * 10. So 10 as to be shifted to -2, the we offset by -12.
   * @param clef
   */
  private getClefOffset(clef: string) {
    if (clef === 'F') {
      return -12;
    }
    return 0;
  }

  private computeStaffOctavesBounds(dcrnData: DCRNStaffData): {min: number, max: number} {
    // Get min and max pitch
    let bounds: {
      min: number,
      max: number
    };
    PITCH_INDICATION_REGEXP.lastIndex = 0;

    let matched = PITCH_INDICATION_REGEXP.exec(dcrnData.notes);
    while (matched !== null) {
      const dcrnPitch = parseInt(matched[0]) + dcrnData.clefOffset;
      const ymnPitch = this.getYMNPitchForDCRNPitch(dcrnPitch, dcrnData.keySignatureAlteration);

      if (bounds === undefined) {
        bounds = {
          min: ymnPitch,
          max: ymnPitch
        }
      } else if (ymnPitch < bounds.min) {
        bounds.min = ymnPitch;
      } else if (ymnPitch > bounds.max) {
        bounds.max = ymnPitch;
      }
      matched = PITCH_INDICATION_REGEXP.exec(dcrnData.notes);
    }

    // Compute corresponding octaves
    return {
      min: this.getYMNOctaveForDCRNPitch(bounds.min),
      max: this.getYMNOctaveForDCRNPitch(bounds.max)
    };
  }

  /**
   * Returns the YMN octave corresponding to the given DCRN pitch.
   * YMN octave 1 holds DCRN pitches from -2 (C in english CMN) to 4
   * (B in english CMN).
   * We know that pitch -2 is in octave 1, and pitch 5 is in octave 2.
   * We can imagine a line from (-2;1) to (5;2) and determine its
   * equation y=ax+b, where y is the octave and x is the pitch.
   * We obtain octave = 1/7 * pitch + 2.
   * We will use this equation to retrieve the YMN octave from a DCRN pitch.
   * @param pitch pitch in DCRN
   */
  private getYMNOctaveForDCRNPitch(pitch: number): number {
    return Math.floor(1/7 * (pitch + 2)) + 1;
  }

  /**
   * Returns the YMN pitch corresponding to the given DCRN pitch.
   * DCRN pitch -2 is 0 and there are 7 values for a DCRN pitch.
   * @param pitch
   * @param keySignatureAlteration Pitch modificator array for each CMN note.
   */
  private getYMNPitchForDCRNPitch(pitch: number, keySignatureAlteration: Array<number>): number {
    // DCRN pitch -2 is in fact value CMN 0, so we shift the value by 2
    const correctedPitch = pitch + 2;
    // There are 7 values of DCRN pitch, so the "absolute" pitch is a modulo 7
    let cmnPitch = correctedPitch % 7;
    // If the pitch was negative, then the modulo is too. The computed pitch
    // will be "inversed" : counting from -6 to -1, so we add 7 (number of pitches)
    // to put it back in the right order.
    if (cmnPitch < 0) {
      cmnPitch += 7;
    }
    // Now that we have a CMN pitch, we need to get the corresponding YMN pitch
    let ymnPitch = parseInt(NOTES_TO_PITCHES[CMN_NOTES[cmnPitch]]);

    // Finally, we modify the pitch to consider the number of sharps and flats in the armor
    ymnPitch += keySignatureAlteration[cmnPitch];

    return ymnPitch;
  }
 }
