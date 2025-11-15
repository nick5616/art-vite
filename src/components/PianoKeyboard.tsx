import * as React from "react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Music } from "lucide-react";

const PianoKeyboard = () => {
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [octave, setOctave] = useState(4);
    const [selectedKey, setSelectedKey] = useState<
        "C" | "G" | "D" | "F" | "Am" | "Em"
    >("C");
    const [showInScale, setShowInScale] = useState(true);
    const [lastPlayedNotes, setLastPlayedNotes] = useState<string[]>([]);
    const [noteHistory, setNoteHistory] = useState<string[]>([]);
    const [numOctaves, setNumOctaves] = useState(2);

    useEffect(() => {
        const ctx = new (window.AudioContext ||
            (window as any).webkitAudioContext)();
        setAudioContext(ctx);

        // On mobile, AudioContext starts suspended - we'll resume on first user interaction
        if (ctx.state === "suspended") {
            const enableAudio = async () => {
                try {
                    await ctx.resume();
                } catch (error) {
                    console.error("Failed to enable audio:", error);
                }
            };

            // Try to enable on first touch/click
            const handleFirstInteraction = () => {
                enableAudio();
            };

            document.addEventListener("touchstart", handleFirstInteraction, {
                once: true,
            });
            document.addEventListener("click", handleFirstInteraction, {
                once: true,
            });
        }

        return () => {
            ctx.close();
        };
    }, []);

    useEffect(() => {
        const updateOctaves = () => {
            const width = window.innerWidth;
            if (width >= 1400) setNumOctaves(3);
            else if (width >= 900) setNumOctaves(2);
            else setNumOctaves(1);
        };

        updateOctaves();
        window.addEventListener("resize", updateOctaves);
        return () => window.removeEventListener("resize", updateOctaves);
    }, []);

    const resumeAudioContext = async () => {
        if (!audioContext) return;
        if (audioContext.state === "suspended") {
            try {
                await audioContext.resume();
            } catch (error) {
                console.error("Failed to resume audio context:", error);
            }
        }
    };

    const playNote = async (
        frequency: number,
        noteName: string,
        noteOctave: number,
    ) => {
        if (!audioContext) return;
        await resumeAudioContext();

        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.value = frequency;
        osc.type = "sine";
        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 0.5,
        );
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 0.5);

        const noteWithOctave = `${noteName}-${noteOctave}`;
        setLastPlayedNotes([noteWithOctave]);
        setNoteHistory((prev) => [...prev.slice(-7), noteWithOctave]);
    };

    const playChord = async (frequencies: number[], chordName: string) => {
        if (!audioContext) return;
        await resumeAudioContext();

        frequencies.forEach((freq: number) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.frequency.value = freq;
            osc.type = "sine";
            gain.gain.setValueAtTime(0.15, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(
                0.01,
                audioContext.currentTime + 1,
            );
            osc.start(audioContext.currentTime);
            osc.stop(audioContext.currentTime + 1);
        });

        const chordData = keyData[selectedKey].chords.find(
            (c: any) => c.name === chordName,
        );
        if (chordData) {
            const chordNotes = getChordNotes(chordData.root, chordData.type);
            const notesWithOctave = chordNotes.map(
                (note) => `${note}-${octave}`,
            );
            setLastPlayedNotes(notesWithOctave);
            setNoteHistory((prev) =>
                [...prev.slice(-7), ...notesWithOctave].slice(-8),
            );
        }
    };

    const getChordNotes = (root: string, type: string) => {
        const rootNote = baseFreqs.find((n) => n.note === root);
        if (!rootNote) return [];

        const notes = [root];
        const third = type === "major" ? 4 : 3;
        const fifth = type === "diminished" ? 6 : 7;

        const thirdNote = baseFreqs.find(
            (n) => n.semitone === (rootNote.semitone + third) % 12,
        );
        const fifthNote = baseFreqs.find(
            (n) => n.semitone === (rootNote.semitone + fifth) % 12,
        );

        if (thirdNote) notes.push(thirdNote.note);
        if (fifthNote) notes.push(fifthNote.note);
        return notes;
    };

    const baseFreqs = [
        { note: "C", freq: 261.63, isBlack: false, semitone: 0 },
        { note: "C#", freq: 277.18, isBlack: true, semitone: 1 },
        { note: "D", freq: 293.66, isBlack: false, semitone: 2 },
        { note: "D#", freq: 311.13, isBlack: true, semitone: 3 },
        { note: "E", freq: 329.63, isBlack: false, semitone: 4 },
        { note: "F", freq: 349.23, isBlack: false, semitone: 5 },
        { note: "F#", freq: 369.99, isBlack: true, semitone: 6 },
        { note: "G", freq: 392.0, isBlack: false, semitone: 7 },
        { note: "G#", freq: 415.3, isBlack: true, semitone: 8 },
        { note: "A", freq: 440.0, isBlack: false, semitone: 9 },
        { note: "A#", freq: 466.16, isBlack: true, semitone: 10 },
        { note: "B", freq: 493.88, isBlack: false, semitone: 11 },
    ];

    const keyData = {
        C: {
            scale: [0, 2, 4, 5, 7, 9, 11],
            chords: [
                {
                    name: "C",
                    root: "C",
                    type: "major",
                    degree: "I",
                    transitions: ["F", "G", "Am", "Em"],
                    strength: { F: 2, G: 2, Am: 1, Em: 1 },
                },
                {
                    name: "Dm",
                    root: "D",
                    type: "minor",
                    degree: "ii",
                    transitions: ["G", "F", "Am"],
                    strength: { G: 3, F: 1, Am: 1 },
                },
                {
                    name: "Em",
                    root: "E",
                    type: "minor",
                    degree: "iii",
                    transitions: ["Am", "F", "C"],
                    strength: { Am: 2, F: 1, C: 1 },
                },
                {
                    name: "F",
                    root: "F",
                    type: "major",
                    degree: "IV",
                    transitions: ["G", "C", "Dm"],
                    strength: { G: 2, C: 2, Dm: 1 },
                },
                {
                    name: "G",
                    root: "G",
                    type: "major",
                    degree: "V",
                    transitions: ["C", "Am", "F"],
                    strength: { C: 3, Am: 2, F: 1 },
                },
                {
                    name: "Am",
                    root: "A",
                    type: "minor",
                    degree: "vi",
                    transitions: ["F", "C", "G", "Dm"],
                    strength: { F: 2, C: 2, G: 1, Dm: 2 },
                },
            ],
        },
        Am: {
            scale: [9, 11, 0, 2, 4, 5, 7],
            chords: [
                {
                    name: "Am",
                    root: "A",
                    type: "minor",
                    degree: "i",
                    transitions: ["Dm", "E", "F", "C"],
                    strength: { Dm: 2, E: 2, F: 1, C: 1 },
                },
                {
                    name: "C",
                    root: "C",
                    type: "major",
                    degree: "III",
                    transitions: ["F", "Dm", "Am"],
                    strength: { F: 2, Dm: 1, Am: 2 },
                },
                {
                    name: "Dm",
                    root: "D",
                    type: "minor",
                    degree: "iv",
                    transitions: ["E", "Am", "F"],
                    strength: { E: 2, Am: 2, F: 1 },
                },
                {
                    name: "E",
                    root: "E",
                    type: "major",
                    degree: "V",
                    transitions: ["Am", "F", "C"],
                    strength: { Am: 3, F: 1, C: 1 },
                },
                {
                    name: "F",
                    root: "F",
                    type: "major",
                    degree: "VI",
                    transitions: ["C", "Dm"],
                    strength: { C: 2, Dm: 2 },
                },
            ],
        },
        G: {
            scale: [7, 9, 11, 0, 2, 4, 6],
            chords: [
                {
                    name: "G",
                    root: "G",
                    type: "major",
                    degree: "I",
                    transitions: ["C", "D", "Em", "Am"],
                    strength: { C: 2, D: 2, Em: 1, Am: 1 },
                },
                {
                    name: "Am",
                    root: "A",
                    type: "minor",
                    degree: "ii",
                    transitions: ["D", "C", "G"],
                    strength: { D: 3, C: 1, G: 1 },
                },
                {
                    name: "Bm",
                    root: "B",
                    type: "minor",
                    degree: "iii",
                    transitions: ["Em", "C", "G"],
                    strength: { Em: 2, C: 1, G: 1 },
                },
                {
                    name: "C",
                    root: "C",
                    type: "major",
                    degree: "IV",
                    transitions: ["D", "G", "Am"],
                    strength: { D: 2, G: 2, Am: 1 },
                },
                {
                    name: "D",
                    root: "D",
                    type: "major",
                    degree: "V",
                    transitions: ["G", "Em", "C"],
                    strength: { G: 3, Em: 2, C: 1 },
                },
                {
                    name: "Em",
                    root: "E",
                    type: "minor",
                    degree: "vi",
                    transitions: ["C", "G", "D"],
                    strength: { C: 2, G: 2, D: 1 },
                },
            ],
        },
        Em: {
            scale: [4, 6, 7, 9, 11, 0, 2],
            chords: [
                {
                    name: "Em",
                    root: "E",
                    type: "minor",
                    degree: "i",
                    transitions: ["Am", "B", "C", "G"],
                    strength: { Am: 2, B: 2, C: 1, G: 1 },
                },
                {
                    name: "G",
                    root: "G",
                    type: "major",
                    degree: "III",
                    transitions: ["C", "Am", "Em"],
                    strength: { C: 2, Am: 1, Em: 2 },
                },
                {
                    name: "Am",
                    root: "A",
                    type: "minor",
                    degree: "iv",
                    transitions: ["B", "Em", "C"],
                    strength: { B: 2, Em: 2, C: 1 },
                },
                {
                    name: "B",
                    root: "B",
                    type: "major",
                    degree: "V",
                    transitions: ["Em", "C", "G"],
                    strength: { Em: 3, C: 1, G: 1 },
                },
                {
                    name: "C",
                    root: "C",
                    type: "major",
                    degree: "VI",
                    transitions: ["G", "Am"],
                    strength: { G: 2, Am: 2 },
                },
            ],
        },
        D: {
            scale: [2, 4, 6, 7, 9, 11, 1],
            chords: [
                {
                    name: "D",
                    root: "D",
                    type: "major",
                    degree: "I",
                    transitions: ["G", "A", "Bm", "Em"],
                    strength: { G: 2, A: 2, Bm: 1, Em: 1 },
                },
                {
                    name: "Em",
                    root: "E",
                    type: "minor",
                    degree: "ii",
                    transitions: ["A", "G", "D"],
                    strength: { A: 3, G: 1, D: 1 },
                },
                {
                    name: "F#m",
                    root: "F#",
                    type: "minor",
                    degree: "iii",
                    transitions: ["Bm", "G", "D"],
                    strength: { Bm: 2, G: 1, D: 1 },
                },
                {
                    name: "G",
                    root: "G",
                    type: "major",
                    degree: "IV",
                    transitions: ["A", "D", "Em"],
                    strength: { A: 2, D: 2, Em: 1 },
                },
                {
                    name: "A",
                    root: "A",
                    type: "major",
                    degree: "V",
                    transitions: ["D", "Bm", "G"],
                    strength: { D: 3, Bm: 2, G: 1 },
                },
                {
                    name: "Bm",
                    root: "B",
                    type: "minor",
                    degree: "vi",
                    transitions: ["G", "D", "A"],
                    strength: { G: 2, D: 2, A: 1 },
                },
            ],
        },
        F: {
            scale: [5, 7, 9, 10, 0, 2, 4],
            chords: [
                {
                    name: "F",
                    root: "F",
                    type: "major",
                    degree: "I",
                    transitions: ["A#", "C", "Dm", "Gm"],
                    strength: { "A#": 2, C: 2, Dm: 1, Gm: 1 },
                },
                {
                    name: "Gm",
                    root: "G",
                    type: "minor",
                    degree: "ii",
                    transitions: ["C", "A#", "F"],
                    strength: { C: 3, "A#": 1, F: 1 },
                },
                {
                    name: "Am",
                    root: "A",
                    type: "minor",
                    degree: "iii",
                    transitions: ["Dm", "A#", "F"],
                    strength: { Dm: 2, "A#": 1, F: 1 },
                },
                {
                    name: "A#",
                    root: "A#",
                    type: "major",
                    degree: "IV",
                    transitions: ["C", "F", "Gm"],
                    strength: { C: 2, F: 2, Gm: 1 },
                },
                {
                    name: "C",
                    root: "C",
                    type: "major",
                    degree: "V",
                    transitions: ["F", "Dm", "A#"],
                    strength: { F: 3, Dm: 2, "A#": 1 },
                },
                {
                    name: "Dm",
                    root: "D",
                    type: "minor",
                    degree: "vi",
                    transitions: ["A#", "F", "C"],
                    strength: { "A#": 2, F: 2, C: 1 },
                },
            ],
        },
    };

    const getFreq = (baseFreq: number, baseOct: number, targetOct: number) => {
        return baseFreq * Math.pow(2, targetOct - baseOct);
    };

    const isInKey = (semitone: number) => {
        return keyData[selectedKey].scale.includes(semitone % 12);
    };

    const getNoteStrengths = (): Record<string, number> => {
        if (lastPlayedNotes.length === 0) return {};

        const rootNote = lastPlayedNotes[0].split("-")[0];
        const lastNote = baseFreqs.find((n) => n.note === rootNote);
        if (!lastNote) return {};

        const strengths: Record<string, number> = {};

        baseFreqs.forEach((note) => {
            const interval = (note.semitone - lastNote.semitone + 12) % 12;
            if (isInKey(note.semitone)) {
                if ([7, 12].includes(interval)) strengths[note.note] = 3;
                else if ([3, 4, 5, 8, 9].includes(interval))
                    strengths[note.note] = 2;
                else strengths[note.note] = 1;
            }
        });

        return strengths;
    };

    const getChordStrength = (chordName: string) => {
        if (lastPlayedNotes.length === 0) return 1;

        const rootNote = lastPlayedNotes[0].split("-")[0];
        const currentChord = keyData[selectedKey].chords.find((chord: any) => {
            const chordRoot = baseFreqs.find((n) => n.note === chord.root);
            const lastNote = baseFreqs.find((n) => n.note === rootNote);
            if (!chordRoot || !lastNote) return false;

            const interval = (lastNote.semitone - chordRoot.semitone + 12) % 12;
            if (chord.type === "major") return [0, 4, 7].includes(interval);
            if (chord.type === "minor") return [0, 3, 7].includes(interval);
            return [0, 3, 6].includes(interval);
        });

        return (currentChord?.strength as any)?.[chordName] || 1;
    };

    const getSuggestedChords = () => {
        const allChords = keyData[selectedKey].chords;
        if (lastPlayedNotes.length === 0) return allChords;

        const rootNote = lastPlayedNotes[0].split("-")[0];
        const currentChord = allChords.find((chord: any) => {
            const chordRoot = baseFreqs.find((n) => n.note === chord.root);
            const lastNote = baseFreqs.find((n) => n.note === rootNote);
            if (!chordRoot || !lastNote) return false;

            const interval = (lastNote.semitone - chordRoot.semitone + 12) % 12;
            if (chord.type === "major") return [0, 4, 7].includes(interval);
            if (chord.type === "minor") return [0, 3, 7].includes(interval);
            return [0, 3, 6].includes(interval);
        });

        if (!currentChord) return allChords;

        const suggested = allChords.filter(
            (c: any) =>
                currentChord.transitions?.includes(c.name) &&
                c.name !== currentChord.name,
        );

        return suggested.length > 0
            ? suggested
            : allChords.filter((c: any) => c.name !== currentChord.name);
    };

    const noteStrengths = getNoteStrengths();

    const allNotes: any[] = [];
    for (let oct = octave; oct < octave + numOctaves; oct++) {
        baseFreqs.forEach((n) => {
            if (n.semitone < 12) {
                allNotes.push({
                    ...n,
                    freq: getFreq(n.freq, 4, oct),
                    inScale: isInKey(n.semitone),
                    strength: noteStrengths[n.note] || 0,
                    octave: oct,
                    id: `${n.note}-${oct}`,
                });
            }
        });
    }

    const whiteKeys = allNotes.filter((n) => !n.isBlack);
    const blackKeys = allNotes.filter((n) => n.isBlack);

    const getKeyStyle = (note: any) => {
        if (lastPlayedNotes.includes(note.id)) {
            return "bg-yellow-300 text-yellow-900 border-yellow-500";
        }

        if (showInScale && lastPlayedNotes.length > 0 && note.strength > 0) {
            if (note.strength === 3)
                return "bg-green-500 text-white border-green-700";
            if (note.strength === 2)
                return "bg-green-400 text-white border-green-600";
            return "bg-green-300 text-green-900 border-green-500";
        }

        if (showInScale && note.inScale) {
            return "bg-blue-200 text-blue-900 border-blue-400";
        }

        return note.isBlack
            ? "bg-gray-900 text-white border-black"
            : "bg-white text-gray-600 border-gray-800";
    };

    const getChordFreqs = (root: string, type: string) => {
        const rootNote = baseFreqs.find((n) => n.note === root);
        if (!rootNote) return [];

        const rootFreq = getFreq(rootNote.freq, 4, octave);
        const third = type === "major" ? 4 : 3;
        const fifth = type === "diminished" ? 6 : 7;

        return [
            rootFreq,
            rootFreq * Math.pow(2, third / 12),
            rootFreq * Math.pow(2, fifth / 12),
        ];
    };

    const suggestedChords = getSuggestedChords();
    const allChords = keyData[selectedKey].chords;

    const getDotOpacity = (noteId: string) => {
        const pos = noteHistory.lastIndexOf(noteId);
        if (pos === -1) return 0;
        const recency = noteHistory.length - pos - 1;
        return Math.max(0, 1 - recency * 0.125);
    };

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen p-4"
            style={{
                background: "linear-gradient(to bottom, #581c87, #312e81)",
                minHeight: "100vh",
                width: "100%",
                margin: 0,
                padding: "1rem",
                boxSizing: "border-box",
            }}
        >
            <a
                href="/"
                style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    color: "white",
                    textDecoration: "none",
                    fontSize: "1rem",
                    fontWeight: "500",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                        "rgba(255, 255, 255, 0.2)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                        "rgba(255, 255, 255, 0.1)";
                }}
            >
                ← Home
            </a>
            <div className="mb-4 flex flex-col gap-3 items-center">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() =>
                            setOctave((prev) => Math.max(1, prev - 1))
                        }
                        disabled={octave <= 1}
                        className="p-2 bg-white rounded-lg disabled:opacity-30"
                        style={{ color: "black" }}
                    >
                        <ChevronLeft
                            className="w-6 h-6"
                            style={{ color: "black" }}
                        />
                    </button>
                    <div
                        className="text-xl font-bold min-w-32 text-center"
                        style={{
                            color: "white",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                        }}
                    >
                        Octave {octave}
                        {numOctaves > 1 && `-${octave + numOctaves - 1}`}
                    </div>
                    <button
                        onClick={() =>
                            setOctave((prev) => Math.min(7, prev + 1))
                        }
                        disabled={octave >= 7}
                        className="p-2 bg-white rounded-lg disabled:opacity-30"
                        style={{ color: "black" }}
                    >
                        <ChevronRight
                            className="w-6 h-6"
                            style={{ color: "black" }}
                        />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <label
                        className="text-sm font-semibold"
                        style={{ color: "white" }}
                    >
                        Key:
                    </label>
                    <select
                        value={selectedKey}
                        onChange={(e) => {
                            setSelectedKey(
                                e.target.value as
                                    | "C"
                                    | "G"
                                    | "D"
                                    | "F"
                                    | "Am"
                                    | "Em",
                            );
                            setLastPlayedNotes([]);
                            setNoteHistory([]);
                        }}
                        className="px-3 py-2 rounded-lg font-semibold"
                        style={{ backgroundColor: "white", color: "black" }}
                    >
                        <option value="C">C Major</option>
                        <option value="G">G Major</option>
                        <option value="D">D Major</option>
                        <option value="F">F Major</option>
                        <option value="Am">A Minor</option>
                        <option value="Em">E Minor</option>
                    </select>

                    <button
                        onClick={() => setShowInScale(!showInScale)}
                        className="px-3 py-2 rounded-lg font-semibold"
                        style={{
                            backgroundColor: showInScale
                                ? "#60a5fa"
                                : "#d1d5db",
                            color: showInScale ? "#1e3a8a" : "#374151",
                        }}
                    >
                        Hints
                    </button>
                </div>
            </div>

            <div className="relative mb-4 overflow-x-auto max-w-full">
                <div className="flex">
                    {whiteKeys.map((note, idx) => {
                        const opacity = getDotOpacity(note.id);
                        return (
                            <button
                                key={idx}
                                onTouchStart={(e) => {
                                    e.preventDefault();
                                    playNote(note.freq, note.note, note.octave);
                                }}
                                onClick={() =>
                                    playNote(note.freq, note.note, note.octave)
                                }
                                className={`w-16 h-48 border-2 active:bg-gray-300 transition-colors rounded-b-lg shadow-lg relative flex-shrink-0 ${getKeyStyle(
                                    note,
                                )}`}
                            >
                                <span className="block mt-auto mb-2 font-semibold text-sm">
                                    {note.note}
                                </span>
                                {opacity > 0 && (
                                    <div
                                        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rounded-full"
                                        style={{ opacity }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="absolute top-0 left-0 flex pointer-events-none">
                    {whiteKeys.map((wk, idx) => {
                        const bk = blackKeys.find(
                            (b) =>
                                b.octave === wk.octave &&
                                b.semitone === wk.semitone + 1,
                        );

                        if (!bk)
                            return (
                                <div key={idx} className="w-16 flex-shrink-0" />
                            );

                        const opacity = getDotOpacity(bk.id);
                        return (
                            <div
                                key={idx}
                                className="relative w-16 flex-shrink-0"
                            >
                                <button
                                    onTouchStart={(e) => {
                                        e.preventDefault();
                                        playNote(bk.freq, bk.note, bk.octave);
                                    }}
                                    onClick={() =>
                                        playNote(bk.freq, bk.note, bk.octave)
                                    }
                                    className={`absolute left-9 w-10 h-32 border-2 active:bg-gray-600 transition-colors rounded-b-lg shadow-xl z-10 pointer-events-auto ${getKeyStyle(
                                        bk,
                                    )}`}
                                >
                                    <span className="block mt-auto mb-1 font-semibold text-xs">
                                        {bk.note}
                                    </span>
                                    {opacity > 0 && (
                                        <div
                                            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"
                                            style={{ opacity }}
                                        />
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mb-4 w-full max-w-md">
                <div
                    className="text-xs font-semibold mb-2 text-center"
                    style={{ color: "white" }}
                >
                    {lastPlayedNotes.length > 0
                        ? "Suggested (darker = stronger)"
                        : `Chords in ${selectedKey}`}
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                    {suggestedChords.map((chord: any) => {
                        const strength = getChordStrength(chord.name);
                        const bgColor =
                            strength === 3
                                ? "#22c55e"
                                : strength === 2
                                ? "#4ade80"
                                : "#86efac";
                        return (
                            <button
                                key={chord.name}
                                onClick={() =>
                                    playChord(
                                        getChordFreqs(chord.root, chord.type),
                                        chord.name,
                                    )
                                }
                                className="px-3 py-2 rounded-lg font-bold shadow-lg active:opacity-80 flex flex-col items-center min-w-16"
                                style={{
                                    background: `linear-gradient(to bottom, ${bgColor}, ${
                                        strength === 3
                                            ? "#16a34a"
                                            : strength === 2
                                            ? "#22c55e"
                                            : "#4ade80"
                                    })`,
                                    color: "#14532d",
                                }}
                            >
                                <Music
                                    className="w-4 h-4"
                                    style={{ color: "#14532d" }}
                                />
                                <span
                                    className="text-sm"
                                    style={{
                                        color: "#14532d",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {chord.name}
                                </span>
                                <span
                                    className="text-xs"
                                    style={{ color: "#14532d", opacity: 0.8 }}
                                >
                                    {chord.degree}
                                </span>
                            </button>
                        );
                    })}
                </div>
                {lastPlayedNotes.length > 0 &&
                    suggestedChords.length < allChords.length && (
                        <button
                            onClick={() => {
                                setLastPlayedNotes([]);
                                setNoteHistory([]);
                            }}
                            className="mt-2 text-xs underline w-full text-center"
                            style={{
                                color: "rgba(255, 255, 255, 0.9)",
                                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                                backgroundColor: "rgba(0, 0, 0, 0.2)",
                                padding: "4px 8px",
                                borderRadius: "4px",
                            }}
                        >
                            Show all chords
                        </button>
                    )}
            </div>

            {showInScale && (
                <div className="text-center max-w-md bg-white bg-opacity-10 px-4 py-3 rounded-lg">
                    {lastPlayedNotes.length > 0 ? (
                        <div className="text-sm">
                            <div
                                className="font-semibold mb-1"
                                style={{ color: "#fef08a" }}
                            >
                                Playing:{" "}
                                {lastPlayedNotes
                                    .map((n) => n.split("-")[0])
                                    .join(", ")}
                            </div>
                            <div style={{ color: "#86efac" }}>
                                Darker green = stronger resolution
                            </div>
                            <div
                                className="text-xs mt-1"
                                style={{ color: "#93c5fd" }}
                            >
                                Blue = all notes in {selectedKey}
                            </div>
                            <div
                                className="text-xs mt-1"
                                style={{ color: "rgba(255, 255, 255, 0.8)" }}
                            >
                                Dots = recent notes (fade over time)
                            </div>
                        </div>
                    ) : (
                        <div className="text-sm" style={{ color: "#93c5fd" }}>
                            Play notes/chords for smart suggestions!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PianoKeyboard;
