import React, { useEffect, useState } from 'react';

function Spooky(): JSX.Element {
    const [left, setLeft] = useState(60);
    const [top, setTop] = useState(200);

    const min = -200;
    const max = 200;

    function setNewPosition(){
        setLeft(calculatePostion(left));
        setTop(calculatePostion(top));
    }

    function calculatePostion(previous?: number): number{
        const delta = min + (Math.random() * (max - min));
        
        let newPosition = previous ? previous + delta : delta;

        if(newPosition < 0){
            newPosition = calculatePostion();
        }

        if(newPosition > 800){
            newPosition = calculatePostion();
        }

        return newPosition;
    }

    return (
        <img 
            src={require('./spooky.gif')}
            style = {{
                width: '100px',
                height: '100px', 
                position: 'absolute', 
                zIndex: 10,
                top: `${top}px`,
                left: `${left}px`
            }}
            onMouseEnter = {setNewPosition}
        />   
    );
}

export default Spooky;