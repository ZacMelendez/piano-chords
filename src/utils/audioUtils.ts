import * as Tone from 'tone';
import { NoteWithOctave } from '../types';

// Initialize the sampler with piano sounds
const sampler = new Tone.Sampler({
  urls: {
    C4: "https://tonejs.github.io/audio/salamander/C4.mp3",
    "D#4": "https://tonejs.github.io/audio/salamander/Ds4.mp3",
    "F#4": "https://tonejs.github.io/audio/salamander/Fs4.mp3",
    A4: "https://tonejs.github.io/audio/salamander/A4.mp3",
  },
  release: 1,
}).toDestination();

// Convert our note format to Tone.js format
function convertToToneNote(note: NoteWithOctave): string {
  const [noteName, octave] = [note.slice(0, -1), note.slice(-1)];
  // Tone.js uses octave 4 as middle C, so we need to adjust our octaves
  const toneOctave = Number(octave) + 3;
  return `${noteName}${toneOctave}`;
}

export async function playChord(notes: NoteWithOctave[]) {
  // Ensure Tone.js is started (browsers require user interaction)
  await Tone.start();
  
  // Convert our notes to Tone.js format
  const toneNotes = notes.map(convertToToneNote);
  
  // Sort notes by pitch
  toneNotes.sort((a, b) => {
    const aNote = Tone.Frequency(a).toFrequency();
    const bNote = Tone.Frequency(b).toFrequency();
    return aNote - bNote;
  });

  // Create a slight arpeggio effect
  const now = Tone.now();
  toneNotes.forEach((note, index) => {
    sampler.triggerAttackRelease(note, "2n", now + index * 0.05);
  });
}