import React from "react";
import { Music } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChordType, Note, ChordQuality, NoteWithOctave } from "../types";
import { getChordNotes } from "../utils/chordUtils";
import { playChord } from "../utils/audioUtils";
import { useAtom } from "jotai";
import { useSharpsAtom } from "../atoms";

interface PianoVisualizerProps {
    note: Note;
    quality: ChordQuality;
    type: ChordType;
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

export function PianoVisualizer({ note, quality, type }: PianoVisualizerProps) {
    const [useSharps] = useAtom(useSharpsAtom);
    const chordNotes = getChordNotes(note, quality, type);
    const allNotes = useSharps ? sharpNotes : flatNotes;

    const handlePlayChord = () => {
        playChord(chordNotes);
    };

    const renderOctave = (octaveNumber: number) => {
        return allNotes.map((currentNote) => {
            const noteWithOctave =
                `${currentNote}${octaveNumber}` as NoteWithOctave;
            const isBlackKey =
                currentNote.includes("#") || currentNote.includes("b");
            const isInChord = chordNotes.includes(noteWithOctave);

            return (
                <div
                    key={`${currentNote}-${octaveNumber}`}
                    className={twMerge(
                        clsx(
                            "relative cursor-pointer transition-colors duration-200",
                            {
                                "w-8 md:w-8 h-20 md:h-32 -mx-[10px] md:-mx-4 z-10":
                                    isBlackKey,
                                "w-12 md:w-12 h-32 md:h-48": !isBlackKey,
                                "bg-gray-800 hover:bg-gray-700":
                                    isBlackKey && !isInChord,
                                "bg-gray-50 border border-gray-200 hover:bg-gray-100":
                                    !isBlackKey && !isInChord,
                                "bg-gray-400 hover:bg-gray-500":
                                    isBlackKey && isInChord,
                                "bg-gray-300 hover:bg-gray-400":
                                    !isBlackKey && isInChord,
                            },
                            "rounded-b-md"
                        )
                    )}
                >
                    <span
                        className={twMerge(
                            clsx(
                                "absolute bottom-2 left-1/2 transform -translate-x-1/2",
                                "text-[8px] md:text-xs font-medium",
                                {
                                    "text-white": isBlackKey && isInChord,
                                    "text-gray-800": !isBlackKey && !isInChord,
                                    "text-gray-300": isBlackKey && !isInChord,
                                }
                            )
                        )}
                    >
                        {currentNote}
                        {octaveNumber === 2 && "²"}
                    </span>
                </div>
            );
        });
    };

    return (
        <div className="flex flex-col items-center gap-6">
            <button
                onClick={handlePlayChord}
                className={twMerge(
                    clsx(
                        "flex items-center gap-2 px-6 py-3",
                        "bg-white text-gray-900 rounded-lg",
                        "hover:bg-gray-100 transition-colors duration-200",
                        "shadow-md hover:shadow-lg"
                    )
                )}
            >
                <Music size={20} />
                <span>Play Chord</span>
            </button>

            <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center w-full md:w-auto">
                <div className="relative flex w-full md:w-auto justify-center overflow-hidden">
                    {renderOctave(1)}
                </div>
                <div className="relative flex w-full md:w-auto justify-center overflow-hidden">
                    {renderOctave(2)}
                </div>
            </div>
        </div>
    );
}
