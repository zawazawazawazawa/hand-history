import * as React from 'react';
import Link from 'next/link';

const PreFlop = (props) => {
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
    
    const exist_positions = (participates) => {
        debugger
        let result = ['SB', 'BB']
        if (participates <= 6) {
            result.push(...additional_positions.slice(0, participates - 2))
        } else if (participates <= 10) {
            result.push(...additional_positions)
            result.push(...utg_positions.slice(0, participates - 6).reverse())
        } else {
            throw('ここには来ないはず')
        }
        return result
    }
    
    return (
        <>
            <h1>プリフロップ</h1>
            <ul>
                {exist_positions(10).map(p => {
                    return (
                        <>
                        <li>{p}</li>
                            <form>
                                <input type="radio" value="fold" name="gender" />Fold
                                <input type="radio" value="raise" name="gender" />Raise
                                <input type="radio" value="call" name="gender" />Call
                            </form>
                        </>
                    )
                })}
            </ul>
        </>
    )
}

export default PreFlop
