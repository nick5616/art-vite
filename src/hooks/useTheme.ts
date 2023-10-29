import { Theme } from "../models";
import { getThemeFromVibe, ThemeAction } from "../theme";
export function reducer(state: Theme, action: ThemeAction) {
    return getThemeFromVibe(action.newVibe);
}
