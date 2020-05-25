import React from "react";

interface CardProps {
    card: number
}

export const Card:React.FC<CardProps> = ({card}) => {
    return (
        <div className='card'>
            <p>{card}</p>
        </div>
    )
}