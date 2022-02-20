import React, { useEffect, useRef } from "react";

/**
 *  Helper that closes dropdown if user clicks outside dropdown field
 */

export const useOuterClick = (e: ((e: any) => void) | undefined) => {
  const innerRef = useRef();
  const callbackRef = useRef();

  // set current callback in ref, before second useEffect uses it
  useEffect(() => {
    // useEffect wrapper to be safe for concurrent mode
    //@ts-ignore
    callbackRef.current = e;
  });

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);

    // read most recent callback and innerRef dom node from refs
    function handleClick(e: { target: any }) {
      //@ts-ignore
      if (innerRef.current && callbackRef.current && !innerRef.current.contains(e.target)) {
        //@ts-ignore

        callbackRef.current(e);
      }
    }
  }, []); // no need for callback + innerRef dep

  return innerRef; // return ref; client can omit `useRef`
};
