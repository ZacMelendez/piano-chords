export type Note =
    | "C"
    | "C#"
    | "D"
    | "D#"
    | "E"
    | "F"
    | "F#"
    | "G"
    | "G#"
    | "A"
    | "A#"
    | "B"
    | "C"
    | "Db"
    | "D"
    | "Eb"
    | "E"
    | "F"
    | "Gb"
    | "G"
    | "Ab"
    | "A"
    | "Bb"
    | "B";
export type ChordQuality = "major" | "minor" | "diminished" | "augmented";
export type ChordType =
    | "triad"
    | "seventh"
    | "ninth"
    | "eleventh"
    | "thirteenth";
export type NoteWithOctave = `${Note}${1 | 2}`;
