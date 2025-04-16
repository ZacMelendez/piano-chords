import { useState, useEffect, useCallback } from "react";
import { ChordSelector } from "./components/ChordSelector";
import { PianoVisualizer } from "./components/PianoVisualizer";
import { ChordType, Note, ChordQuality } from "./types";
import { useAtom } from "jotai";
import { selectedNoteAtom } from "./atoms";
import { getChordNotes } from "./utils/chordUtils";
import { playChord } from "./utils/audioUtils";

// Define note mappings
const noteToSharpMap: Record<string, Note> = {
    C: "C#",
    D: "D#",
    F: "F#",
    G: "G#",
    A: "A#",
};

// const noteToFlatMap: Record<string, Note> = {
//     D: "Db",
//     E: "Eb",
//     G: "Gb",
//     A: "Ab",
//     B: "Bb",
// };

// Helper function to convert between sharp and flat notation
const convertToSharp = (note: Note): Note => {
    const flatToSharp: Record<string, Note> = {
        Db: "C#",
        Eb: "D#",
        Gb: "F#",
        Ab: "G#",
        Bb: "A#",
    };
    return flatToSharp[note] || note;
};

// const convertToFlat = (note: Note): Note => {
//     const sharpToFlat: Record<string, Note> = {
//         "C#": "Db",
//         "D#": "Eb",
//         "F#": "Gb",
//         "G#": "Ab",
//         "A#": "Bb",
//     };
//     return sharpToFlat[note] || note;
// };

function App() {
    const [selectedNote, setSelectedNote] = useAtom(selectedNoteAtom);
    const [selectedQuality, setSelectedQuality] =
        useState<ChordQuality>("major");
    const [selectedType, setSelectedType] = useState<ChordType>("triad");
    // const [useSharps, setUseSharps] = useAtom(useSharpsAtom);

    const handlePlayChord = useCallback(() => {
        const chordNotes = getChordNotes(
            selectedNote,
            selectedQuality,
            selectedType
        );
        playChord(chordNotes);
    }, [selectedNote, selectedQuality, selectedType]);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const key = event.key.toUpperCase();

            // Handle spacebar for playing chord
            if (event.code === "Space") {
                event.preventDefault(); // Prevent page scroll
                handlePlayChord();
                return;
            }

            // Only handle A-G keys
            if (!["A", "B", "C", "D", "E", "F", "G"].includes(key)) return;

            // If shift is pressed, try to get the sharp/flat note
            if (event.shiftKey) {
                const alteredNote = noteToSharpMap[key];

                if (alteredNote) {
                    // Convert to sharp for internal representation
                    const sharpNote = convertToSharp(alteredNote);
                    setSelectedNote(sharpNote);
                }
            } else {
                // Regular note selection
                setSelectedNote(key as Note);
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [
        setSelectedNote,
        selectedNote,
        selectedQuality,
        selectedType,
        handlePlayChord,
    ]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-12">
                    <ChordSelector
                        selectedNote={selectedNote}
                        selectedQuality={selectedQuality}
                        selectedType={selectedType}
                        onNoteChange={setSelectedNote}
                        onQualityChange={setSelectedQuality}
                        onTypeChange={setSelectedType}
                    />
                </div>

                <div>
                    <PianoVisualizer
                        note={selectedNote}
                        quality={selectedQuality}
                        type={selectedType}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
