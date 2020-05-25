import React from "react";
import {connect} from 'react-redux'
import {NEW_GAME, START} from "../redux/types";
import {IState} from "../redux/store";

interface navBarProps {
    onStart(): void,
    onNewGame(): void,
    winner: string
}

const _NavBar:React.FC<navBarProps> = ({onStart, onNewGame, winner}) => {
    const btn1 = ['waves-effect', 'waves-light', 'btn', 'red accent-3', '1']
    const btn2 = ['waves-effect', 'waves-light', 'btn', 'green accent-4', '1']
    if (!winner) {
        btn1.push('disabled')
        btn2.pop()
    } else {
        btn1.pop()
        btn2.push('disabled')
    }
    return (
        <nav className='plr2 grey darken-3'>
            <div className="nav-wrapper">
                <h5 className="brand-logo center">BlackJack</h5>
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li><a onClick={onStart} className={btn2.join(' ')}>Start Game</a></li>
                    <li><a onClick={onNewGame} className={btn1.join(' ')}>New Game</a></li>
                </ul>
            </div>
        </nav>
    )
}
const mapStateToProps = (state: IState) => {
    return {
        winner: state.winner
    }
}
const mapDispatchToProps = {
    onStart: () => ({
        type: START
    }),
    onNewGame: () => ({
        type: NEW_GAME
    }),
}

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(_NavBar)