import {
  useEffect,
  useState,
} from "react";

function getWindowSize() {
  if (
    typeof window === "undefined"
  ) {
    return {
      width: 0,
      height: 0,
    };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export default function useWindowSize() {
  const [windowSize, setWindowSize] =
    useState(getWindowSize);

  useEffect(() => {
    let frameId = null;

    const handleResize = () => {
      if (frameId !== null) {
        return;
      }

      frameId =
        window.requestAnimationFrame(
          () => {
            setWindowSize(
              getWindowSize()
            );

            frameId = null;
          }
        );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );

      if (
        frameId !== null
      ) {
        window.cancelAnimationFrame(
          frameId
        );
      }
    };
  }, []);

  return windowSize;
}