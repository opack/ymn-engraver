import { YmnMeasure } from './ymn-measure';
import { YmnBeat } from './ymn-beat';

export class YmnScoreElementsBank {
    private static instance: YmnScoreElementsBank;
    public static getInstance(): YmnScoreElementsBank {
        if (this.instance === undefined) {
            this.instance = new YmnScoreElementsBank();
        }
        return this.instance;
    }

    private constructor() {
        // Singleton
    }


    /**
     * Stores all measures at a given position
     * (first measures, measures #2...) across lines
     */
    public measures: Array<Array<YmnMeasure>> = [];
    /**
     * Stores all beats at a given position
     * (first beats, beats #2...) across measures
     */
    public beats: Array<Array<YmnBeat>> = [];

    public registerBeat(beat: YmnBeat, position: number) {
        if (this.beats[position] === undefined) {
            this.beats[position] = new Array<YmnBeat>();
        }
        this.beats[position].push(beat);
    }

    public registerMeasure(measure: YmnMeasure, position: number) {
        if (this.measures[position] === undefined) {
            this.measures[position] = new Array<YmnMeasure>();
        }
        this.measures[position].push(measure);
    }
}