export function firstNWords(n: number, s: string) {
    const words = s.split(" ");
    const firstNWords = words.slice(0, n);
    return firstNWords.join(" ");
}

export function firstNCharacters(n: number, s: string) {
    const chars = s.split("");
    const firstNChars = chars.slice(0, n);
    return firstNChars.join("");
}
