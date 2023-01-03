import * as React from 'react';
import Link from 'next/link';

const Blind = () => {
    const [smallBlind, setSmallBlind] = React.useState(0)
    const [bigBlind, setBigBlind] = React.useState(0)
    const [participates, setParticipates] = React.useState(0)
    
    return (
        <>
            <h1>Blindとテーブルの人数を登録</h1>
            <form>
                <label>SB</label>
                <input
                    type="number"
                    value={smallBlind}
                    onChange={
                        (e) => {setSmallBlind(e.target.value)} // 型チェック
                    }
                />
                <label>BB</label>
                <input
                    type="number"
                    value={bigBlind}
                    onChange={
                        (e) => {setBigBlind(e.target.value)} // 型チェック
                    }
                />
                <label>テーブルの人数</label>
                <input
                    type="number"
                    value={participates}
                    onChange={
                        (e) => {setParticipates(e.target.value)} // 型チェック
                    }
                />
            </form>
            <p>
                <Link href="/">最初に戻る</Link>
            </p>
            <p>
                <Link href="/record/preflop" participates={participates}>次へ</Link>
            </p>
        </>   
    )
}

export default Blind
