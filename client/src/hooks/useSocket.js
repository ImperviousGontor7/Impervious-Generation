import {
  useCallback,
  useEffect,
  useRef,
} from "react";

import socket from "../lib/websocket/socket.js";

export default function useSocket(
  eventHandlers = {},
  options = {}
) {
  const {
    enabled = true,
    autoConnect = true,
  } = options;

  const handlersRef =
    useRef(eventHandlers);

  useEffect(() => {
    handlersRef.current =
      eventHandlers;
  }, [eventHandlers]);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    if (
      autoConnect &&
      !socket.connected
    ) {
      socket.connect();
    }

    const registeredEvents =
      Object.entries(
        handlersRef.current
      );

    registeredEvents.forEach(
      ([event, handler]) => {
        if (
          typeof handler !==
          "function"
        ) {
          return;
        }

        socket.on(
          event,
          handler
        );
      }
    );

    return () => {
      registeredEvents.forEach(
        ([event, handler]) => {
          if (
            typeof handler !==
            "function"
          ) {
            return;
          }

          socket.off(
            event,
            handler
          );
        }
      );
    };
  }, [
    enabled,
    autoConnect,
  ]);

  const emit = useCallback(
    (event, ...args) => {
      if (!socket.connected) {
        return false;
      }

      socket.emit(
        event,
        ...args
      );

      return true;
    },
    []
  );

  const on = useCallback(
    (event, handler) => {
      if (
        typeof handler !==
        "function"
      ) {
        return () => {};
      }

      socket.on(
        event,
        handler
      );

      return () => {
        socket.off(
          event,
          handler
        );
      };
    },
    []
  );

  const off = useCallback(
    (event, handler) => {
      socket.off(
        event,
        handler
      );
    },
    []
  );

  const connect = useCallback(() => {
    if (!socket.connected) {
      socket.connect();
    }
  }, []);

  const disconnect =
    useCallback(() => {
      if (socket.connected) {
        socket.disconnect();
      }
    }, []);

  return {
    socket,
    connected: socket.connected,
    emit,
    on,
    off,
    connect,
    disconnect,
  };
}