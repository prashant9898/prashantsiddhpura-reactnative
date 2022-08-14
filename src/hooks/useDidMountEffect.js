// Import the React and React Native components.
import React, { useEffect, useRef } from 'react';

// Implement the DidMount Effect.
const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}

export default useDidMountEffect;