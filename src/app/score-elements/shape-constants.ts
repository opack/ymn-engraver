export const ShapeConfig = {
  stage: {
    yOffset: 0.5
  },
  score: {
    width: 1000,
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
  system: {
    bottomSpacing: 15
  },
  staff: {
    defaultHeight: 30,
    staffSeparator: {
      stroke: 'black',
      strokeWidth: 1
    },
    systemSeparator: {
      stroke: '#cccccc',
      strokeWidth: 3
    },
    continuationNotesLine: {
      isCurvy: true,
      curveHeight: 15,
      firstNoteInnerMargin: 3,
      stroke: 'black',
      strokeWidth: 1,
      dash: [1, 0]
    }
  },
  measure: {
    octaveFontSize: 12,
    octaveWidth: 30,
    stroke: 'black',
    strokeWidth: 1
  },
  beat: {
    stroke: 'black',
    strokeWidth: 1,
    dash: [4, 4]
  },
  chord: {
    pitchSpacing: 5
  },
  note: {
    width: 20,
    height: 15,
    text: {
      fontSize: 12,
      fontFamily: 'Calibri'
    },
    circle: {
      radius: 3,
      color: 'black'
    }
  }
};
