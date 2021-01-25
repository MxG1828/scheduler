import { useState } from "react";


const useVisualMode = (initial) =>{
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode,replace) => {
    setMode(prev => newMode);
    if(!replace){
      setHistory (prev => [...prev,newMode])
    } else {
      setHistory (prev => {
        let now = [...prev];
        now.splice(now.length-1,1,newMode);
        return now;
      })
    }
  }
      
  const back = () => {
    if(history.length > 1){
      setMode(prev => {
        history.pop();
        return history[history.length-1]
      });

    }
  }
  return {mode , transition, back}
}

export default useVisualMode;