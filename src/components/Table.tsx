import React from "react";
import {Card} from "./Card";
import {connect} from 'react-redux'
import {HIT, STAND} from "../redux/types";
import {WinnerScreen} from "./WinnerSceen";
import {IState} from "../redux/store";

interface TableProps {
    player: number[],
    dealer: number[],
    playerPoints: number,
    dealerPoints: number,
    onHit(): void,
    onStand(): void,
    winner: string
}

const _Table: React.FC<TableProps> = ({player, dealer, playerPoints, dealerPoints, onHit, onStand, winner}) => {

    const btn1 = ['btn green lighten-2', '1']
    const btn2 = ['btn orange lighten-2', '1']
    if (playerPoints === 0) {
        btn1.push('disabled')
        btn2.push('disabled')
    }
    if (playerPoints > 0) {
        btn1.pop()
        btn2.pop()
    }
    // const winn = useEffect(() => {
    //     setTimeout(() => <WinnerScreen/>, 1000)
    // }, [winner])

    return (
        <>
            <div className='card-table indigo lighten-5'>
                <div className='card-header indigo lighten-4'>
                    <h5>Dealer</h5>
                    <p>points: {dealerPoints}</p>
                </div>
                {
                    dealer.map((card, index) => <Card card={card} key={index}/>)
                }
            </div>
            <div className='card-table indigo lighten-5'>
                <div className='card-header indigo lighten-4'>
                    <h5>Player</h5>
                    <p>points: {playerPoints}</p>
                    <button className={btn1.join(' ')} onClick={onHit}>HIT</button>
                    <button className={btn2.join(' ')} onClick={onStand}>STAND</button>
                </div>
                {
                    player.map((card, index) => <Card card={card} key={index}/>)
                }
            </div>
            {

                winner
                    ? <WinnerScreen/>
                    : null
            }
        </>
    )
}

const mapStateToProps = (state: IState) => {
    return {
        player: state.player,
        dealer: state.dealer,
        playerPoints: state.playerPoints,
        dealerPoints: state.dealerPoints,
        winner: state.winner
    }
}

const mapDispatchToProps = {
    onHit: () => ({
        type: HIT
    }),
    onStand: () => ({
        type: STAND
    }),
}

export const Table = connect(mapStateToProps, mapDispatchToProps)(_Table)