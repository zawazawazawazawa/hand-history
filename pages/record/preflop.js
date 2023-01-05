import * as React from 'react';
import Link from 'next/link';
import { HistoryContext } from '../_app'

const additional_positions = [
        'BTN',
        'CO',
        'HJ',
        'LJ',
    ]
    
const utg_positions = [
        'UTG',
        'UTG+1',
        'UTG+2',
        'UTG+3',
    ]

const PreFlop = () => {
    const historyContext = React.useContext(HistoryContext)
    const history = historyContext.history
    const setHistory = historyContext.setHistory
    
    const exist_positions = (participates) => {
        let result = ['BB', 'SB']
        if (participates <= 6) {
            result.push(...additional_positions.slice(0, participates - 2))
        } else if (participates <= 10) {
            result.push(...additional_positions)
            result.push(...utg_positions.slice(0, participates - 6).reverse())
        } else {
            throw('ここには来ないはず')
        }
        return result.reverse()
    }
    
    const handleSubmit = (event) => {
        console.log(event)
    }
    
    const [preflopHistory, setPreflopHistory] = React.useState([])
    
    return (
        <>
            <h1>プリフロップ</h1>
            {exist_positions(history.participates).map(position => {
                return (
                    <>
                        <li>{position}</li>
                        <Action position={position} preflopHistor={preflopHistory} setPreflopHistory={setPreflopHistory}/>
                    </>
                )
            })}

            <p>
                <Link href="/record/blind">一つ前に戻る</Link>
            </p>
            <p>
                <Link href="/">最初に戻る</Link>
            </p>
        </>
    )
}

export default PreFlop

const Action = (props) => {
    // TODO
    // 親componentでpreflopの履歴全体を持ち、各子componentでpositonごとのactionをpushして更新していきたい
    // 5betとかなると同じpositionの人のアクションが何回もあることになるので、
    // それをどういうデータ構造で持つかがあんまりいいアイディアがない
    // 順番の縛りをいれると管理がかなり楽にはなりそう
    const {position, preflopHistory, setPreflopHistory} = props
    
    const [action, setAction] = React.useState('call')
    const [price, setPrice] = React.useState(0)
    
    const handleActionChange = e => {
        setAction(e.target.value)
        const preflopHistoryCopy = [...position]
    }
    
    const handlePriceChange = e => {
        console.log(e)
        setPrice(e.target.value)
    }
    
    return(
            <>
                <input type="radio" value="fold" id={`${position}-fold`} name={position} onChange={handleActionChange} checked={action === 'fold'}/>
                <label for={`${position}-fold`}>Fold</label>
                <input type="radio" value="call" id={`${position}-call`} name={position} onChange={handleActionChange} checked={action === 'call'}/>
                <label for={`${position}-call`}>Call</label>
                <input type="radio" value="raise" id={`${position}-raise`} name={position} onChange={handleActionChange} checked={action === 'raise'} />
                <label for={`${position}-raise`}>Raise</label>
                {action === 'raise' &&
                    <input type="number" onChange={handlePriceChange} value={price} />
                }
            </>
        )
}
 