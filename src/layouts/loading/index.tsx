import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Component } from "./component";
import styles from "./style.module.scss";
import type { State } from "./types";

export const Loading: React.VFC = () => {
  const [state, setState] = useState<State>("initial");
  const { events } = useRouter();

  let className = styles.initial;
  if (state === "start") className += ` ${styles.start}`;
  if (state === "complete") className += ` ${styles.complete}`;

  useEffect(() => {
    const start = () => setState("start");

    const complete = () => {
      setTimeout(() => setState("complete"), 100);
      setTimeout(() => setState("initial"), 500);
    };

    events.on("routeChangeStart", start);
    events.on("routeChangeComplete", complete);
    events.on("routeChangeError", complete);

    return () => {
      events.off("routeChangeStart", start);
      events.off("routeChangeComplete", complete);
      events.off("routeChangeError", complete);
    };
  }, [events]);

  return <Component className={className} />;
};
