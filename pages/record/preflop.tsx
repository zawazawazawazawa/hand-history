import {
  Dispatch,
  useState,
  useContext,
  SetStateAction,
  FormEvent
} from "react";
import Link from "next/link";
import { HistoryContext } from "../_app";

const additional_positions = ["BTN", "CO", "HJ", "LJ"];

const utg_positions = ["UTG", "UTG+1", "UTG+2", "UTG+3"];

const PreFlop = () => {
  const historyContext = useContext(HistoryContext);
  const history = historyContext.history;
  const setHistory = historyContext.setHistory;

  const exist_positions = (participates: number) => {
    let result = ["BB", "SB"];
    if (participates <= 6) {
      result.push(...additional_positions.slice(0, participates - 2));
    } else if (participates <= 10) {
      result.push(...additional_positions);
      result.push(...utg_positions.slice(0, participates - 6).reverse());
    } else {
      throw "ここには来ないはず";
    }
    return result.reverse();
  };

  const handleSubmit = (event: Event) => {
    console.log(event);
  };

  const [preflopHistory, setPreflopHistory] = useState([]);

  return (
    <>
      <h1>プリフロップ</h1>
      {exist_positions(history.participates).map(position => {
        return (
          <>
            <li>{position}</li>
            <Action
              position={position}
              preflopHistor={preflopHistory}
              setPreflopHistory={setPreflopHistory}
            />
          </>
        );
      })}

      <p>
        <Link href="/record/blind">一つ前に戻る</Link>
      </p>
      <p>
        <Link href="/">最初に戻る</Link>
      </p>
    </>
  );
};

export default PreFlop;

type ActionProps = {
  position: string;
  preflopHistor: Array<any>;
  setPreflopHistory: Dispatch<SetStateAction<any>>;
};

const Action = (props: ActionProps) => {
  // TODO
  // 親componentでpreflopの履歴全体を持ち、各子componentでpositonごとのactionをpushして更新していきたい
  // 5betとかなると同じpositionの人のアクションが何回もあることになるので、
  // それをどういうデータ構造で持つかがあんまりいいアイディアがない
  // 順番の縛りをいれると管理がかなり楽にはなりそう
  const { position, setPreflopHistory } = props;

  const [action, setAction] = useState("call");
  const [price, setPrice] = useState(0);

  const handleActionChange = (event: FormEvent<HTMLInputElement>) => {
    // if (!(event.target instanceof HTMLButtonElement)) {
    //   return; // or throw new TypeError();
    // }
    setAction(event.target.value);
    const preflopHistoryCopy = [...position];
  };

  const handlePriceChange = (event: Event) => {
    console.log(event);
    if (!(event.target instanceof HTMLButtonElement)) {
      return; // or throw new TypeError();
    }
    setPrice(Number(event.target.value));
  };

  return (
    <>
      <input
        type="radio"
        value="fold"
        id={`${position}-fold`}
        name={position}
        onChange={handleActionChange}
        checked={action === "fold"}
      />
      <label htmlFor={`${position}-fold`}>Fold</label>
      <input
        type="radio"
        value="call"
        id={`${position}-call`}
        name={position}
        onChange={handleActionChange}
        checked={action === "call"}
      />
      <label htmlFor={`${position}-call`}>Call</label>
      <input
        type="radio"
        value="raise"
        id={`${position}-raise`}
        name={position}
        onChange={handleActionChange}
        checked={action === "raise"}
      />
      <label htmlFor={`${position}-raise`}>Raise</label>
      {action === "raise" && (
        <input type="number" onChange={handlePriceChange} value={price} />
      )}
    </>
  );
};
