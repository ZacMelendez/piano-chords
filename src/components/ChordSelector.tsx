import { ChordType, Note, ChordQuality } from "../types";
import { ButtonGroup } from "./ui/button-group";
import { useAtom } from "jotai";
import { useSharpsAtom } from "../atoms";

interface ChordSelectorProps {
    selectedNote: Note;
    selectedQuality: ChordQuality;
    selectedType: ChordType;
    onNoteChange: (note: Note) => void;
    onQualityChange: (quality: ChordQuality) => void;
    onTypeChange: (type: ChordType) => void;
}

const sharpNotes: Note[] = [
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

const flatNotes: Note[] = [
    "C",
    "Db",
    "D",
    "Eb",
    "E",
    "F",
    "Gb",
    "G",
    "Ab",
    "A",
    "Bb",
    "B",
];

const qualities: ChordQuality[] = ["major", "minor", "diminished", "augmented"];
const types: ChordType[] = [
    "triad",
    "seventh",
    "ninth",
    "eleventh",
    "thirteenth",
];

// Helper function to format chord qualities
const formatQuality = (quality: ChordQuality): string => {
    switch (quality) {
        case "major":
            return "Major";
        case "minor":
            return "Minor";
        case "diminished":
            return "Dim";
        case "augmented":
            return "Aug";
        default:
            return quality;
    }
};

// Helper function to format chord types
const formatType = (type: ChordType): string => {
    switch (type) {
        case "triad":
            return "Triad";
        case "seventh":
            return "7th";
        case "ninth":
            return "9th";
        case "eleventh":
            return "11th";
        case "thirteenth":
            return "13th";
        default:
            return type;
    }
};

export function ChordSelector({
    selectedNote,
    selectedQuality,
    selectedType,
    onNoteChange,
    onQualityChange,
    onTypeChange,
}: ChordSelectorProps) {
    const [useSharps] = useAtom(useSharpsAtom);
    const notes = useSharps ? sharpNotes : flatNotes;

    // Convert between sharp and flat notation when toggling
    const handleNoteChange = (note: Note) => {
        if (useSharps) {
            onNoteChange(note);
        } else {
            // Convert flat to sharp for internal representation
            const sharpNote = sharpNotes[flatNotes.indexOf(note)];
            onNoteChange(sharpNote);
        }
    };

    // Convert the selected note to the current notation for display
    const displayNote = useSharps
        ? selectedNote
        : flatNotes[sharpNotes.indexOf(selectedNote)];

    // Helper function to format the full chord name
    const getChordName = (
        note: Note,
        quality: ChordQuality,
        type: ChordType
    ): string => {
        const displayedNote = note;

        console.log({ displayedNote, quality, type });
        return `${displayedNote} ${formatQuality(quality)} ${formatType(type)}`;
    };

    return (
        <div className="flex flex-col gap-8">
            <div>
                <label className="block text-sm font-medium text-gray-100 mb-2">
                    Root Note
                </label>
                <ButtonGroup
                    items={notes}
                    selectedItem={displayNote}
                    onSelect={handleNoteChange}
                    renderItem={(note) => note}
                />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-100 mb-2">
                        Quality
                    </label>
                    <ButtonGroup
                        items={qualities}
                        selectedItem={selectedQuality}
                        onSelect={onQualityChange}
                        renderItem={formatQuality}
                    />
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-100 mb-2">
                        Type
                    </label>
                    <ButtonGroup
                        items={types}
                        selectedItem={selectedType}
                        onSelect={onTypeChange}
                        renderItem={formatType}
                    />
                </div>
            </div>

            <div className="mt-4">
                <p className="text-center text-lg font-medium text-white">
                    {getChordName(selectedNote, selectedQuality, selectedType)}
                </p>
            </div>
        </div>
    );
}
