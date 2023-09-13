import { Theme } from "../models";
import { getThemeFromVibe, ThemeAction } from "../theme";
export function reducer(state: Theme, action: ThemeAction) {
    console.log("state", state);
    console.log("action", action);
    return getThemeFromVibe(action.newVibe);
}

// export function useTheme() {

// }
