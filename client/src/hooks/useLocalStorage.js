import {
  useCallback,
  useEffect,
  useState,
} from "react";

function readValue(key, initialValue) {
  if (
    typeof window === "undefined"
  ) {
    return initialValue;
  }

  try {
    const storedValue =
      window.localStorage.getItem(
        key
      );

    if (storedValue === null) {
      return typeof initialValue ===
        "function"
        ? initialValue()
        : initialValue;
    }

    return JSON.parse(storedValue);
  } catch {
    return typeof initialValue ===
      "function"
      ? initialValue()
      : initialValue;
  }
}

export default function useLocalStorage(
  key,
  initialValue
) {
  const [value, setValue] =
    useState(() =>
      readValue(
        key,
        initialValue
      )
    );

  const setStoredValue = useCallback(
    (nextValue) => {
      try {
        const valueToStore =
          nextValue instanceof Function
            ? nextValue(value)
            : nextValue;

        setValue(valueToStore);

        if (
          typeof window !==
          "undefined"
        ) {
          window.localStorage.setItem(
            key,
            JSON.stringify(
              valueToStore
            )
          );
        }
      } catch (error) {
        console.error(
          "Gagal menyimpan localStorage:",
          error
        );
      }
    },
    [key, value]
  );

  const removeStoredValue =
    useCallback(() => {
      try {
        setValue(
          typeof initialValue ===
            "function"
            ? initialValue()
            : initialValue
        );

        if (
          typeof window !==
          "undefined"
        ) {
          window.localStorage.removeItem(
            key
          );
        }
      } catch (error) {
        console.error(
          "Gagal menghapus localStorage:",
          error
        );
      }
    }, [key, initialValue]);

  useEffect(() => {
    const handleStorage =
      (event) => {
        if (event.key !== key) {
          return;
        }

        if (
          event.newValue === null
        ) {
          setValue(
            typeof initialValue ===
              "function"
              ? initialValue()
              : initialValue
          );

          return;
        }

        try {
          setValue(
            JSON.parse(
              event.newValue
            )
          );
        } catch {
          setValue(
            event.newValue
          );
        }
      };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, [key, initialValue]);

  return [
    value,
    setStoredValue,
    removeStoredValue,
  ];
}