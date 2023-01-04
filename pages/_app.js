import * as React from 'react';
import Home from './index'

export default function App({ Component, pageProps }) {
  const [history, setHistory] = React.useState({
    smallBlind: 0,
    bigBlind: 0,
    participates: 0,
  })
  const value = {history, setHistory}
  
  
  return (
        <HistoryContext.Provider value={value}>
            <Component {...pageProps} />
        </HistoryContext.Provider>
    )
}

export const HistoryContext = React.createContext({
  smallBlind: 0,
  bigBlind: 0,
  participates: 0,
  setHistory: () => {}
})