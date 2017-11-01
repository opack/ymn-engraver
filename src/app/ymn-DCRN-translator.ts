
import { SYSTEM_INDICATION_REGEXP, NOTES_TO_PITCHES } from './score-elements/score-constants';

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

const PITCH_INDICATION_REGEXP = /-?\d{1,2}/;
/**
 * Translates a DCRN music string into YMN
 */
export class YmnDCRNTranslator {
  private staves: Array<String>;
  public translated: string;

  public translate(DCRN: string): string {

    // Split in systems
    const systems = this.splitSystems(DCRN);

    // Translate each system and append to the result
    systems.forEach(system => this.translateSystem(system));

    return this.translated;
  }

  private splitSystems(DCRN: string): Array<string> {
    SYSTEM_INDICATION_REGEXP.lastIndex = 0;
    let matched = SYSTEM_INDICATION_REGEXP.exec(DCRN);
    if (matched === null) {
      alert('No system detected. Remember to enclose your systems with curly braces "{...}".');
      return;
    }

    const systems: Array<string> = [];
    do {
      systems.push(matched[1]);
      matched = SYSTEM_INDICATION_REGEXP.exec(DCRN);
    }
    while (matched !== null);

    return systems;
  }

  private translateSystem(dcrnSystem: string): void {
    let ymnSystem = '{';

    // Split staves
    const dcrnStaves = dcrnSystem.split('\n');
    dcrnStaves.forEach(dcrnStaff => {
      if (dcrnStaff.length > 0) {
        ymnSystem += this.translateStaff(dcrnStaff) + '\n';
      }
    });

    ymnSystem += '}';
    this.translated += ymnSystem;
  }

  private translateStaff(dcrnStaff: string): void {
    // Compute min and max octaves for the DCRN staff
    const bounds = this.computeStaffOctavesBounds(dcrnStaff);

    // Create one YMN staff for each impacted octave
    const staves: {[octave: number]: string} = [];
    let clefIndication: string;
    for (let octave = bounds.min; octave <= bounds.max; octave++) {
      if (octave === 0) {
        clefIndication = '';
      } else if (octave > 0) {
        clefIndication = 'T';
      } else if (octave < 0) {
        clefIndication = 'B';
      }
      staves[octave] = clefIndication + Math.abs(octave);
    }
  }

  private computeStaffOctavesBounds(dcrnStaff: string): {min: number, max: number} {
    // Get min and max pitch
    let bounds: {
      min: number,
      max: number
    };
    PITCH_INDICATION_REGEXP.lastIndex = 0;

    let matched = PITCH_INDICATION_REGEXP.exec(dcrnStaff);
    while (matched !== null) {
      const pitch = parseInt(matched[0]);
      if (bounds === undefined) {
        bounds = {
          min: pitch,
          max: pitch
        }
      } else if (pitch < bounds.min) {
        bounds.min = pitch;
      } else if (pitch > bounds.max) {
        bounds.max = pitch;
      }
      matched = PITCH_INDICATION_REGEXP.exec(dcrnStaff);
    }

    // Compute corresponding octaves
    return {
      min: this.getOctaveForDCRNPitch(bounds.min),
      max: this.getOctaveForDCRNPitch(bounds.max)
    };
  }

  /**
   * Returns the YMN octave corresponding to the given DCRN pitch.
   * YMN octave 0 holds DCRN pitches from -2 (C in english CMN) to 4
   * (B in english CMN).
   * We know that pitch -2 is in octave 0, and pitch 5 is in octave 1.
   * We can imagine a line from (-2;0) to (5;1) and determine its
   * equation y=ax+b, where y is the octave and x is the pitch.
   * We obtain octave = 1/7 * pitch + 2.
   * We will use this equation to retrieve the YMN octave from a DCRN pitch.
   * @param pitch pitch in DCRN
   */
  private getOctaveForDCRNPitch(pitch: number): number {
    return Math.floor(1/7 * (pitch + 2));
  }

  /**
   * Returns the YMN pitch corresponding to the given DCRN pitch.
   * DCRN pitch -2 is 0 and there are 7 values for a DCRN pitch.
   * @param pitch
   * @param keySignatureAlteration Pitch modificator array for each CMN note.
   */
  private getPitchForDCRNPitch(pitch: number, keySignatureAlteration: number): number {
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
