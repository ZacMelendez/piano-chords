import { Note, ChordQuality, ChordType, NoteWithOctave } from "../types";

const noteOrder: Note[] = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
];

function getNoteIndex(note: Note): number {
    return noteOrder.indexOf(note);
}

function getNoteFromIndex(index: number): Note {
    const normalizedIndex = ((index % 12) + 12) % 12;
    return noteOrder[normalizedIndex];
}

function addOctave(
    note: Note,
    rootIndex: number,
    noteIndex: number
): NoteWithOctave {
    const octave = noteIndex < rootIndex ? 2 : 1;
    return `${note}${octave}` as NoteWithOctave;
}

export function getChordNotes(
    root: Note,
    quality: ChordQuality,
    type: ChordType
): NoteWithOctave[] {
    const rootIndex = getNoteIndex(root);
    const notes: NoteWithOctave[] = [addOctave(root, rootIndex, rootIndex)];

    // Add third
    const thirdInterval =
        quality === "major" || quality === "augmented" ? 4 : 3;
    const thirdIndex = (rootIndex + thirdInterval) % 12;
    notes.push(addOctave(getNoteFromIndex(thirdIndex), rootIndex, thirdIndex));

    // Add fifth
    let fifthInterval = 7;
    if (quality === "diminished") fifthInterval = 6;
    if (quality === "augmented") fifthInterval = 8;
    const fifthIndex = (rootIndex + fifthInterval) % 12;
    notes.push(addOctave(getNoteFromIndex(fifthIndex), rootIndex, fifthIndex));

    // Add seventh if needed
    if (type !== "triad") {
        const seventhInterval = quality === "major" ? 11 : 10;
        const seventhIndex = (rootIndex + seventhInterval) % 12;
        notes.push(
            addOctave(getNoteFromIndex(seventhIndex), rootIndex, seventhIndex)
        );
    }

    // Add ninth if needed
    if (["ninth", "eleventh", "thirteenth"].includes(type)) {
        const ninthIndex = (rootIndex + 14) % 12;
        notes.push(
            addOctave(getNoteFromIndex(ninthIndex), rootIndex, ninthIndex)
        );
    }

    // Add eleventh if needed
    if (["eleventh", "thirteenth"].includes(type)) {
        const eleventhIndex = (rootIndex + 17) % 12;
        notes.push(
            addOctave(getNoteFromIndex(eleventhIndex), rootIndex, eleventhIndex)
        );
    }

    // Add thirteenth if needed
    if (type === "thirteenth") {
        const thirteenthIndex = (rootIndex + 21) % 12;
        notes.push(
            addOctave(
                getNoteFromIndex(thirteenthIndex),
                rootIndex,
                thirteenthIndex
            )
        );
    }

    return notes;
}
