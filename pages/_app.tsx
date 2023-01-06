import { Dispatch, SetStateAction, createContext, useState } from "react";
import type { AppProps } from 'next/app';


export type HistoryContextType = {
  history: HistoryType;
  setHistory: Dispatch<SetStateAction<HistoryType>>;
};

export type HistoryType = {
  smallBlind: number;
  bigBlind: number;
  participates: number;
};

export const HistoryContext = createContext<HistoryContextType>({
  history: {
    smallBlind: 0,
    bigBlind: 0,
    participates: 0
  },
  setHistory: () => {}
});

export default function App({ Component, pageProps }: AppProps) {
  const [history, setHistory] = useState({
    smallBlind: 0,
    bigBlind: 0,
    participates: 0
  });

  const value = { history, setHistory };

  return (
    <HistoryContext.Provider value={value}>
      <Component {...pageProps} />
    </HistoryContext.Provider>
  );
}
