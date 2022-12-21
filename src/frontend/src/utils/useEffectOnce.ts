import React, {EffectCallback, useEffect} from "react";

export const useEffectOnce = (func: EffectCallback) => {
    const calledOnce = React.useRef(false);
    useEffect(() => {
        if (calledOnce.current) {
            return;
        }
        func();
        calledOnce.current = true;
    }, [])
};