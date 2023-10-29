import * as React from "react";

export const useIsOverflow = (
    ref: React.RefObject<HTMLDivElement>,
    callback: (hasBoolean: boolean) => void,
) => {
    const [isOverflow, setIsOverflow] = React.useState<boolean>();
    React.useLayoutEffect(() => {
        const { current } = ref;

        const trigger = () => {
            if (current && current.scrollHeight) {
                const hasOverflow = current.scrollWidth > current.clientWidth;
                setIsOverflow(() => hasOverflow);

                if (callback) {
                    callback(hasOverflow);
                }
            } else {
                return;
            }
        };

        if (current) {
            trigger();
        }
    }, [callback, ref]);

    return isOverflow;
};
