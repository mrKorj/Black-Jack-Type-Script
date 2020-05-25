import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import logger from "redux-logger";
import shuffle from 'lodash.shuffle'
import {HIT, NEW_GAME, STAND, START} from "./types";

export interface IState {
    stack: number[],
    player: number[],
    playerPoints: number,
    dealer: number[],
    dealerPoints: number,
    winner: string
}

export interface IAction {
    type: string,
    payload: Record<string, any>
}

const cardStack = [
    11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
    11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
    11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
    11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
]

const initialStore: IState = {
    stack: shuffle(cardStack),
    player: [],
    playerPoints: 0,
    dealer: [],
    dealerPoints: 0,
    winner: ''
}

const take2CardsFromStack = (array: number[]): number[] => {
    const popped = []
    for (let i = 0; i < 2; i++) {
        popped.push(array.pop() as number)
    }
    return popped
}


const reducer = (state = initialStore, action: IAction) => {
    switch (action.type) {
        case START: {
            const player = take2CardsFromStack(state.stack)
            const dealer = state.dealer.concat(state.stack.pop() as number)
            const sumPlayer = player.reduce((a, b) => a + b, 0)
            const sumDealer = dealer.reduce((a: number, b: number) => a + b, 0)
            switch (sumPlayer) {
                case 21: {
                    return {
                        ...state,
                        player,
                        dealer,
                        playerPoints: sumPlayer,
                        winner: 'Player'
                    }
                }
                case 22: {
                    return {
                        ...state,
                        dealer,
                        playerPoints: sumPlayer,
                        dealerPoints: sumDealer,
                        winner: 'Dealer'
                    }
                }
                default: {
                    return {
                        ...state,
                        player,
                        dealer,
                        playerPoints: sumPlayer,
                        dealerPoints: sumDealer,
                    }
                }
            }
        }
        case HIT: {
            const player = state.player.concat(state.stack.pop() as number)
            const sum = player.reduce((a, b) => a + b, 0)
            if (sum > 21) {
                return {
                    ...state,
                    player,
                    playerPoints: sum,
                    winner: 'Dealer'
                }
            } else {
                return {
                    ...state,
                    player,
                    playerPoints: sum,
                }
            }

        }
        case STAND: {
            const dealer = state.dealer.concat(state.stack.pop() as number)
            const sum = dealer.reduce((a, b) => a + b, 0)

            for (let i = sum; i < 17; i++) {
                dealer.push(state.stack.pop() as number)
                i = dealer.reduce((a, b) => a + b, 0)
            }

            const sumDealer = dealer.reduce((a, b) => a + b, 0)
            const sumPlayer = state.player.reduce((a, b) => a + b, 0)

            if (sumDealer <= 21 && sumDealer > sumPlayer) {
                return {
                    ...state,
                    dealer,
                    winner: 'Dealer',
                    dealerPoints: sumDealer,
                }
            } else {
                return {
                    ...state,
                    dealer,
                    dealerPoints: sumDealer,
                    winner: 'Player'
                }
            }
        }
        case NEW_GAME: {
            return {
                stack: shuffle(cardStack),
                player: [],
                dealer: [],
                playerPoints: 0,
                dealerPoints: 0,
                winner: ''
            }
        }
        default:
            return state
    }
}

export function createReduxStore() {
    const middleware = composeWithDevTools(applyMiddleware(logger))
    return createStore(reducer, middleware)
}


