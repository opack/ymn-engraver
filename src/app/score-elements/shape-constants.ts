export const ShapeConfig = {
    score: {
        width: 1000, //MAX_LINE_WIDTH
        title: {
            fontSize: 18,
            fontFamily: 'Calibri',
            topMargin: 20,
            bottomSpacing: 10
        },
        author: {
            fontSize: 14,
            fontFamily: 'Calibri'
        },
        tempo: {
            leftPosition: 10,
            fontSize: 18,
            fontFamily: 'Calibri',
            bottomSpacing: 10
        }
    },
    line: {
        defaultHeight: 30,
        stroke: '#999999',
        strokeWidth: 1
    },
    measure: {
        octaveFontSize: 12, //OCTAVE_FONT_SIZE
        octaveWidth: 30,
        stroke: 'black',
        strokeWidth: 1
    },
    beat: {
        stroke: 'black',
        strokeWidth: 1,
        dash: [1, 3]
    },
    chord: {
        pitchSpacing: 5 //CHORD_PITCH_SPACE
    },
    note: {
        size: 30, //NOTE_SIZE
        width: 15, //PITCH_TEXT_WIDTH
        height: 12, //PITCH_TEXT_HEIGHT
        fontSize: 12, //PITCH_FONT_SIZE
        fontFamily: 'Calibri'
    }
};
