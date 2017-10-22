import { YmnNote } from './ymn-note';

export class YmnNoteLayout {
    /**
     *
     * @param measures 
     * @param initialOffset yOffset
     * @return the new offset in order to layout next note right below
     */
    public layout(note: YmnNote, initialOffset: number): number {
        // Layout the note
        note.shape.text(note.pitch);
        note.shape.y(initialOffset);
                
        // Next note position will be below this note
        return note.shape.y() + note.shape.height();
    }
}