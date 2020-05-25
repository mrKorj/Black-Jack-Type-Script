import React from "react";
import {connect} from 'react-redux'
import {IState} from "../redux/store";

interface WinnerProps {
    winner: string,
    playerPoints: number,
    dealerPoints: number
}

const _WinnerScreen: React.FC<WinnerProps> = ({winner, playerPoints, dealerPoints}) => {
    return (
        <div className='game-over'>
            <h4>Winner is: <strong className='red-text text-accent-2'>{winner}</strong></h4>
            <h5>Player points: {playerPoints}</h5>
            <h5>Dealer points: {dealerPoints}</h5>
        </div>
    )
}

const stateToProps = (state: IState) => {
    return {
        winner: state.winner,
        playerPoints: state.playerPoints,
        dealerPoints: state.dealerPoints
    }
}

export const WinnerScreen = connect(stateToProps)(_WinnerScreen)