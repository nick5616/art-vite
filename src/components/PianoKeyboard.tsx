import * as React from "react";
import { useState, useEffect } from "react";

import {
    ChevronLeft,
    ChevronRight,
    Music,
    TrendingUp,
    TrendingDown,
    Minus,
    Zap,
} from "lucide-react";

type Note = {
    note: string;
    altName: string;
    freq: number;
    isBlack: boolean;
    semitone: number;
};

type RecentNote = {
    name: string;
    octave: number;
    semitone: number;
};

type Toast = {
    name: string;
    emoji: string;
    color: string;
};

type KeyType = "C" | "G" | "D" | "F" | "Am" | "Em";

const PianoKeyboard = () => {
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [octave, setOctave] = useState(4);
    const [selectedKey, setSelectedKey] = useState<KeyType>("C");
    const [showSmart, setShowSmart] = useState(true);
    const [recentNotes, setRecentNotes] = useState<RecentNote[]>([]);
    const [noteHistory, setNoteHistory] = useState<string[]>([]);
    const [numOctaves, setNumOctaves] = useState(2);
    const [toast, setToast] = useState<Toast | null>(null);

    useEffect(() => {
        const ctx = new (window.AudioContext ||
            (window as any).webkitAudioContext)();

        const unlock = () => {
            if (ctx.state === "suspended") ctx.resume();
            const o = ctx.createOscillator();
            const g = ctx.createGain();
            g.gain.value = 0;
            o.connect(g);
            g.connect(ctx.destination);
            o.start(0);
            o.stop(0.001);
        };

        document.addEventListener("touchstart", unlock, { once: true });
        document.addEventListener("click", unlock, { once: true });

        setAudioContext(ctx);
        return () => {
            ctx.close();
        };
    }, []);

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            if (w >= 1400) setNumOctaves(3);
            else if (w >= 900) setNumOctaves(2);
            else setNumOctaves(1);
        };

        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const playNote = (freq: number, name: string, oct: number) => {
        if (!audioContext) return;
        const o = audioContext.createOscillator();
        const g = audioContext.createGain();
        o.connect(g);
        g.connect(audioContext.destination);
        o.frequency.value = freq;
        o.type = "sine";
        g.gain.setValueAtTime(0.3, audioContext.currentTime);
        g.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 0.5,
        );
        o.start();
        o.stop(audioContext.currentTime + 0.5);

        const noteData = baseFreqs.find((n) => n.note === name);
        if (!noteData) return;
        const semi = noteData.semitone;
        const newNote: RecentNote = { name, octave: oct, semitone: semi };

        // Show toast for interval
        if (recentNotes.length > 0) {
            const lastNote = recentNotes[recentNotes.length - 1];
            const interval = (semi - lastNote.semitone + 12) % 12;

            const intervalNames: Record<number, Toast> = {
                0: { name: "Unison", emoji: "🎯", color: "blue" },
                1: { name: "Minor 2nd", emoji: "😬", color: "red" },
                2: { name: "Major 2nd", emoji: "👍", color: "green" },
                3: { name: "Minor 3rd", emoji: "😊", color: "green" },
                4: { name: "Major 3rd", emoji: "✨", color: "green" },
                5: { name: "Perfect 4th", emoji: "🎵", color: "blue" },
                6: { name: "Tritone", emoji: "🔥", color: "orange" },
                7: { name: "Perfect 5th", emoji: "⭐", color: "purple" },
                8: { name: "Minor 6th", emoji: "💫", color: "green" },
                9: { name: "Major 6th", emoji: "🌟", color: "green" },
                10: { name: "Minor 7th", emoji: "🎶", color: "blue" },
                11: { name: "Major 7th", emoji: "✨", color: "blue" },
            };

            const intervalInfo = intervalNames[interval];
            if (intervalInfo) {
                setToast(intervalInfo);
                setTimeout(() => setToast(null), 1500);
            }
        }

        setRecentNotes((p) => [...p.slice(-7), newNote]);
        setNoteHistory((p) => [...p.slice(-7), `${name}-${oct}`]);
    };

    const playChord = (freqs: number[], name: string) => {
        if (!audioContext) return;
        freqs.forEach((freq) => {
            const o = audioContext.createOscillator();
            const g = audioContext.createGain();
            o.connect(g);
            g.connect(audioContext.destination);
            o.frequency.value = freq;
            o.type = "sine";
            g.gain.setValueAtTime(0.15, audioContext.currentTime);
            g.gain.exponentialRampToValueAtTime(
                0.01,
                audioContext.currentTime + 1,
            );
            o.start();
            o.stop(audioContext.currentTime + 1);
        });

        const chord = keyData[selectedKey].chords.find((c) => c.name === name);
        if (chord) {
            const notes = getChordNotes(chord.root, chord.type);
            const data = notes.map((n) => {
                const noteData = baseFreqs.find((bf) => bf.note === n);
                return {
                    name: n,
                    octave: octave,
                    semitone: noteData?.semitone || 0,
                };
            });
            setRecentNotes((p) => [...p.slice(-7), ...data].slice(-8));
            setNoteHistory((p) =>
                [...p.slice(-7), ...notes.map((n) => `${n}-${octave}`)].slice(
                    -8,
                ),
            );
        }
    };

    const getChordNotes = (root: string, type: string) => {
        const r = baseFreqs.find((n) => n.note === root);
        if (!r) return [];
        const notes = [root];
        const third = type === "major" ? 4 : 3;
        const fifth = type === "diminished" ? 6 : 7;
        const t = baseFreqs.find(
            (n) => n.semitone === (r.semitone + third) % 12,
        );
        const f = baseFreqs.find(
            (n) => n.semitone === (r.semitone + fifth) % 12,
        );
        if (t) notes.push(t.note);
        if (f) notes.push(f.note);
        return notes;
    };

    const baseFreqs = [
        { note: "C", altName: "C", freq: 261.63, isBlack: false, semitone: 0 },
        { note: "C#", altName: "Db", freq: 277.18, isBlack: true, semitone: 1 },
        { note: "D", altName: "D", freq: 293.66, isBlack: false, semitone: 2 },
        { note: "D#", altName: "Eb", freq: 311.13, isBlack: true, semitone: 3 },
        { note: "E", altName: "E", freq: 329.63, isBlack: false, semitone: 4 },
        { note: "F", altName: "F", freq: 349.23, isBlack: false, semitone: 5 },
        { note: "F#", altName: "Gb", freq: 369.99, isBlack: true, semitone: 6 },
        { note: "G", altName: "G", freq: 392.0, isBlack: false, semitone: 7 },
        { note: "G#", altName: "Ab", freq: 415.3, isBlack: true, semitone: 8 },
        { note: "A", altName: "A", freq: 440.0, isBlack: false, semitone: 9 },
        {
            note: "A#",
            altName: "Bb",
            freq: 466.16,
            isBlack: true,
            semitone: 10,
        },
        { note: "B", altName: "B", freq: 493.88, isBlack: false, semitone: 11 },
    ];

    const keyNoteNames: Record<KeyType, Record<number, string>> = {
        C: { 1: "C#", 3: "D#", 6: "F#", 8: "G#", 10: "A#" },
        G: { 1: "C#", 3: "D#", 6: "F#", 8: "G#", 10: "A#" },
        D: { 1: "C#", 3: "D#", 6: "F#", 8: "G#", 10: "A#" },
        F: { 1: "Db", 3: "Eb", 6: "Gb", 8: "Ab", 10: "Bb" },
        Am: { 1: "C#", 3: "Eb", 6: "F#", 8: "G#", 10: "Bb" },
        Em: { 1: "C#", 3: "D#", 6: "F#", 8: "G#", 10: "Bb" },
    };

    const getNoteName = (semitone: number) => {
        const note = baseFreqs.find((n) => n.semitone === semitone);
        if (!note || !note.isBlack) return note?.note;
        return keyNoteNames[selectedKey]?.[semitone] || note.note;
    };

    type Chord = {
        name: string;
        root: string;
        type: string;
        degree: string;
        transitions: string[];
        strength: Record<string, number>;
    };

    const keyData: Record<KeyType, { scale: number[]; chords: Chord[] }> = {
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

    const getFreq = (base: number, baseOct: number, targetOct: number) =>
        base * Math.pow(2, targetOct - baseOct);

    const isInKey = (semi: number) =>
        keyData[selectedKey].scale.includes(semi % 12);

    const analyzeNote = (
        targetSemi: number,
    ): {
        dissonance: number;
        momentum: "neutral" | "ascending" | "descending" | "static";
        tension: number;
        consonance: number;
        continues: boolean;
        resolves: boolean;
        inKey: boolean;
    } => {
        if (recentNotes.length === 0)
            return {
                dissonance: 0,
                momentum: "neutral" as const,
                tension: 0,
                consonance: 0,
                continues: false,
                resolves: false,
                inKey: isInKey(targetSemi),
            };

        let maxDiss = 0;
        let totalTension = 0;

        recentNotes.forEach((rn, i) => {
            const weight = (i + 1) / recentNotes.length;
            const interval = Math.abs((targetSemi - rn.semitone + 12) % 12);
            const minInt = Math.min(interval, 12 - interval);

            let diss = 0;
            if (minInt === 1 || minInt === 6) diss = 3;
            else if (minInt === 2 || minInt === 5) diss = 2;
            else if (minInt === 10 || minInt === 11) diss = 1;

            maxDiss = Math.max(maxDiss, diss * weight);
            if (minInt === 1) totalTension += weight * 2;
            else if (minInt === 2) totalTension += weight;
        });

        let momentum: "neutral" | "ascending" | "descending" | "static" =
            "neutral";
        if (recentNotes.length >= 3) {
            const last3 = recentNotes.slice(-3);
            const diffs = last3
                .slice(1)
                .map((n, i) => n.semitone - last3[i].semitone);
            if (diffs.every((d) => d > 0)) momentum = "ascending";
            else if (diffs.every((d) => d < 0)) momentum = "descending";
            else if (Math.abs(diffs[0]) <= 2 && Math.abs(diffs[1]) <= 2)
                momentum = "static";
        }

        const lastNote = recentNotes[recentNotes.length - 1];
        const intervalFromLast = targetSemi - lastNote.semitone;

        let continues = false;
        let resolves = false;

        if (momentum === "ascending" && intervalFromLast > 0) continues = true;
        else if (momentum === "descending" && intervalFromLast < 0)
            continues = true;
        else if (momentum === "static" && Math.abs(intervalFromLast) <= 2)
            continues = true;

        if (
            Math.abs(intervalFromLast) <= 2 &&
            [0, 4, 7].includes(targetSemi % 12)
        )
            resolves = true;
        if (momentum === "ascending" && intervalFromLast < 0) resolves = true;
        if (momentum === "descending" && intervalFromLast > 0) resolves = true;

        let consonance = 0;
        const minInt = Math.abs((targetSemi - lastNote.semitone + 12) % 12);
        if ([0, 7, 12].includes(minInt)) consonance = 3;
        else if ([3, 4, 8, 9].includes(minInt)) consonance = 2;
        else if ([5, 10].includes(minInt)) consonance = 1;

        return {
            dissonance: maxDiss,
            momentum,
            continues,
            resolves,
            tension: totalTension,
            consonance,
            inKey: isInKey(targetSemi),
        };
    };

    type NoteWithAnalysis = Note & {
        displayName: string;
        freq: number;
        octave: number;
        id: string;
        dissonance: number;
        momentum: "neutral" | "ascending" | "descending" | "static";
        tension: number;
        consonance: number;
        continues: boolean;
        resolves: boolean;
        inKey: boolean;
    };

    const allNotes: NoteWithAnalysis[] = [];
    for (let oct = octave; oct < octave + numOctaves; oct++) {
        baseFreqs.forEach((n) => {
            if (n.semitone < 12) {
                const analysis = analyzeNote(n.semitone);
                const displayName = getNoteName(n.semitone);
                allNotes.push({
                    ...n,
                    displayName: displayName || n.note,
                    freq: getFreq(n.freq, 4, oct),
                    octave: oct,
                    id: `${n.note}-${oct}`,
                    ...analysis,
                });
            }
        });
    }

    const whiteKeys = allNotes.filter((n) => !n.isBlack);
    const blackKeys = allNotes.filter((n) => n.isBlack);

    const getKeyStyle = (note: NoteWithAnalysis) => {
        const justPlayed =
            recentNotes.length > 0 &&
            recentNotes[recentNotes.length - 1].name === note.note &&
            recentNotes[recentNotes.length - 1].octave === note.octave;

        if (justPlayed)
            return "bg-yellow-300 text-yellow-900 border-yellow-500";

        // No smart mode or no context - show in-scale vs out-of-scale
        if (!showSmart || recentNotes.length === 0) {
            if (note.inKey) return "bg-blue-200 text-blue-900 border-blue-400";
            return note.isBlack
                ? "bg-gray-700 text-white border-2 border-dashed border-gray-500"
                : "bg-gray-200 text-gray-700 border-2 border-dashed border-gray-400";
        }

        // Smart mode with context

        // VERY dissonant notes - red
        if (note.dissonance >= 2.5 && !note.resolves)
            return "bg-red-600 text-white border-red-800";
        if (note.dissonance >= 2.0 && !note.resolves)
            return "bg-red-400 text-white border-red-600";

        // Consonant notes IN KEY - solid green
        if (note.inKey) {
            if (note.consonance === 3)
                return "bg-green-500 text-white border-green-700";
            if (note.consonance === 2)
                return "bg-green-400 text-white border-green-600";
            if (note.consonance === 1)
                return "bg-green-300 text-green-900 border-green-500";
            // In key but not particularly consonant - blue
            return "bg-blue-200 text-blue-900 border-blue-400";
        }

        // Consonant notes OUT OF KEY - green with dashed border (chromatic)
        if (note.consonance === 3)
            return "text-white border-2 border-dashed border-green-500";
        if (note.consonance === 2)
            return "text-white border-2 border-dashed border-green-400";
        if (note.consonance === 1)
            return "text-green-900 border-2 border-dashed border-green-300";

        // Out of scale and not consonant - grey dashed
        return note.isBlack
            ? "bg-gray-700 text-white border-2 border-dashed border-gray-500"
            : "bg-gray-200 text-gray-700 border-2 border-dashed border-gray-400";
    };

    const getIcon = (note: NoteWithAnalysis) => {
        if (recentNotes.length === 0) return null;
        const cls =
            "w-3 h-3 absolute top-1 left-1/2 transform -translate-x-1/2";
        if (note.resolves && note.dissonance < 1)
            return <Zap className={`${cls} text-purple-600`} />;
        if (note.continues) {
            if (note.momentum === "ascending")
                return <TrendingUp className={`${cls} text-blue-600`} />;
            if (note.momentum === "descending")
                return <TrendingDown className={`${cls} text-blue-600`} />;
            return <Minus className={`${cls} text-blue-600`} />;
        }
        return null;
    };

    const getChordFreqs = (root: string, type: string) => {
        const r = baseFreqs.find((n) => n.note === root);
        if (!r) return [];
        const rootFreq = getFreq(r.freq, 4, octave);
        const third = type === "major" ? 4 : 3;
        const fifth = type === "diminished" ? 6 : 7;
        return [
            rootFreq,
            rootFreq * Math.pow(2, third / 12),
            rootFreq * Math.pow(2, fifth / 12),
        ];
    };

    const getSuggestedChords = (): Chord[] => {
        const all = keyData[selectedKey].chords;
        if (recentNotes.length === 0) return all;

        const last = recentNotes[recentNotes.length - 1];
        const current = all.find((chord: Chord) => {
            const cr = baseFreqs.find((n) => n.note === chord.root);
            const ln = baseFreqs.find((n) => n.note === last.name);
            if (!cr || !ln) return false;
            const int = (ln.semitone - cr.semitone + 12) % 12;
            if (chord.type === "major") return [0, 4, 7].includes(int);
            if (chord.type === "minor") return [0, 3, 7].includes(int);
            return [0, 3, 6].includes(int);
        });

        if (!current) return all;
        const sugg = all.filter(
            (c: Chord) =>
                current.transitions?.includes(c.name) &&
                c.name !== current.name,
        );
        return sugg.length > 0
            ? sugg
            : all.filter((c: Chord) => c.name !== current.name);
    };

    const getChordStrength = (name: string) => {
        if (recentNotes.length === 0) return 1;
        const last = recentNotes[recentNotes.length - 1];
        const current = keyData[selectedKey].chords.find((chord: Chord) => {
            const cr = baseFreqs.find((n) => n.note === chord.root);
            const ln = baseFreqs.find((n) => n.note === last.name);
            if (!cr || !ln) return false;
            const int = (ln.semitone - cr.semitone + 12) % 12;
            if (chord.type === "major") return [0, 4, 7].includes(int);
            if (chord.type === "minor") return [0, 3, 7].includes(int);
            return [0, 3, 6].includes(int);
        });
        return current?.strength?.[name] || 1;
    };

    const getChordStyle = (name: string) => {
        const s = getChordStrength(name);
        if (s === 3) return "bg-green-500";
        if (s === 2) return "bg-green-400";
        return "bg-green-300";
    };

    const suggestedChords = getSuggestedChords();

    const getDotOpacity = (id: string) => {
        const pos = noteHistory.lastIndexOf(id);
        if (pos === -1) return 0;
        return Math.max(0, 1 - (noteHistory.length - pos - 1) * 0.125);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 p-4">
            <div className="mb-3 flex flex-col gap-2 items-center relative">
                {toast && (
                    <div
                        className={`absolute -top-16 px-6 py-3 rounded-full shadow-lg animate-bounce text-lg font-bold ${
                            toast.color === "purple"
                                ? "bg-purple-500 text-white"
                                : toast.color === "green"
                                ? "bg-green-500 text-white"
                                : toast.color === "blue"
                                ? "bg-blue-500 text-white"
                                : toast.color === "orange"
                                ? "bg-orange-500 text-white"
                                : "bg-red-500 text-white"
                        }`}
                    >
                        {toast.emoji} {toast.name}!
                    </div>
                )}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setOctave((p) => Math.max(1, p - 1))}
                        disabled={octave <= 1}
                        className="p-2 bg-white rounded-lg disabled:opacity-30"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div className="text-white text-xl font-bold min-w-32 text-center">
                        Octave {octave}
                        {numOctaves > 1 && `-${octave + numOctaves - 1}`}
                    </div>
                    <button
                        onClick={() => setOctave((p) => Math.min(7, p + 1))}
                        disabled={octave >= 7}
                        className="p-2 bg-white rounded-lg disabled:opacity-30"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <label className="text-white text-sm font-semibold">
                        Key:
                    </label>
                    <select
                        value={selectedKey}
                        onChange={(e) => {
                            setSelectedKey(e.target.value as KeyType);
                            setRecentNotes([]);
                            setNoteHistory([]);
                        }}
                        className="px-3 py-2 rounded-lg font-semibold"
                    >
                        <option value="C">C Major</option>
                        <option value="G">G Major</option>
                        <option value="D">D Major</option>
                        <option value="F">F Major</option>
                        <option value="Am">A Minor</option>
                        <option value="Em">E Minor</option>
                    </select>

                    <button
                        onClick={() => setShowSmart(!showSmart)}
                        className={`px-3 py-2 rounded-lg font-semibold ${
                            showSmart
                                ? "bg-blue-400 text-blue-900"
                                : "bg-gray-300 text-gray-700"
                        }`}
                    >
                        Smart
                    </button>
                </div>
            </div>

            <div className="relative mb-3 overflow-x-auto max-w-full">
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
                                {getIcon(note)}
                                <span className="block mt-auto mb-2 font-semibold text-sm">
                                    {note.displayName}
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
                                    {getIcon(bk)}
                                    <span className="block mt-auto mb-1 font-semibold text-xs">
                                        {bk.displayName}
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
            <div className="mb-3 w-full max-w-md">
                <div className="text-white text-xs font-semibold mb-2 text-center">
                    {recentNotes.length > 0
                        ? "Suggested (darker = stronger)"
                        : `Chords in ${selectedKey}`}
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                    {suggestedChords.map((chord) => (
                        <button
                            key={chord.name}
                            onClick={() =>
                                playChord(
                                    getChordFreqs(chord.root, chord.type),
                                    chord.name,
                                )
                            }
                            className={`px-3 py-2 ${getChordStyle(
                                chord.name,
                            )} text-green-900 rounded-lg font-bold shadow-lg active:opacity-80 flex flex-col items-center min-w-16`}
                        >
                            <Music className="w-4 h-4" />
                            <span className="text-sm">{chord.name}</span>
                            <span className="text-xs opacity-70">
                                {chord.degree}
                            </span>
                        </button>
                    ))}
                </div>
                {recentNotes.length > 0 &&
                    suggestedChords.length <
                        keyData[selectedKey].chords.length && (
                        <button
                            onClick={() => {
                                setRecentNotes([]);
                                setNoteHistory([]);
                            }}
                            className="mt-2 text-white text-xs underline opacity-70 w-full text-center"
                        >
                            Show all chords
                        </button>
                    )}
            </div>
            {showSmart && (
                <div className="text-center max-w-md bg-white bg-opacity-10 px-4 py-3 rounded-lg">
                    {recentNotes.length > 0 ? (
                        <div className="text-sm space-y-1">
                            <div className="text-yellow-200 font-semibold">
                                Playing:{" "}
                                {recentNotes
                                    .slice(-3)
                                    .map((n) => n.name)
                                    .join(", ")}
                            </div>
                            <div className="flex items-center justify-center gap-3 text-xs mt-2">
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                                    <span className="text-red-200">
                                        Dissonant
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                                    <span className="text-green-200">
                                        Consonant
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Zap className="w-3 h-3 text-purple-400" />
                                    <span className="text-purple-200">
                                        Resolves
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-3 text-xs">
                                <div className="flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3 text-blue-400" />
                                    <span className="text-blue-200">Up</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <TrendingDown className="w-3 h-3 text-blue-400" />
                                    <span className="text-blue-200">Down</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Minus className="w-3 h-3 text-blue-400" />
                                    <span className="text-blue-200">
                                        Static
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-blue-200 text-sm">
                            Play notes to see context-aware suggestions!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PianoKeyboard;
