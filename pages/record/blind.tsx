import * as React from "react";
import Link from "next/link";
import { HistoryContext } from "../_app";
import type { HistoryContextType } from "../_app"

const Blind = () => {
  const historyContext = React.useContext<HistoryContextType>(HistoryContext);
  const history = historyContext.history;
  const setHistory = historyContext.setHistory;

  console.log(historyContext);

  const [smallBlind, setSmallBlind] = React.useState(history.smallBlind);
  const [bigBlind, setBigBlind] = React.useState(history.bigBlind);
  const [participates, setParticipates] = React.useState(history.participates);

  const handleClickNext = () => {
    setHistory({
      ...historyContext.history,
      smallBlind: smallBlind,
      bigBlind: bigBlind,
      participates: participates
    });
  };

  return (
    <>
      <h1>Blindとテーブルの人数を登録</h1>
      <form>
        <label>SB</label>
        <input
          type="number"
          value={smallBlind}
          onChange={
            e => {
              setSmallBlind(Number(e.target.value));
            }
          }
        />
        <label>BB</label>
        <input
          type="number"
          value={bigBlind}
          onChange={
            e => {
              setBigBlind(Number(e.target.value));
            }
          }
        />
        <label>テーブルの人数</label>
        <input
          type="number"
          value={participates}
          onChange={
            e => {
              setParticipates(Number(e.target.value));
            }
          }
        />
      </form>

      <p>
        <Link href="/record/preflop" onClick={() => handleClickNext()}>
          次へ
        </Link>
      </p>

      <p>
        <Link href="/">最初に戻る</Link>
      </p>
    </>
  );
};

export default Blind;
