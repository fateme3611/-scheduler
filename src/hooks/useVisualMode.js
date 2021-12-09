import { useState } from "react";

export  function useVisualMode(initialMode){
    const [mode, setMode] = useState(initialMode);

    const [history, setHistory] = useState([initialMode]);
    return {
        mode, 
        transition:(newMode, replace=false) => {
            if(!replace){
                setHistory(prev=> [...prev, mode]);
            }
            setMode(newMode);
        },
        back: ()=>{
            if(history.length > 1){
                const prev = history.pop();
                setMode(prev);
                setHistory([...history]);
            } else {
                setMode(history[0]);
            }
        }
    };
}

