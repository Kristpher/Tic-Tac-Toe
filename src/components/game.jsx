import React, { useState, useEffect } from 'react';
import './game.css';
import x from './pics/x-image.png';
import o from './pics/O-image.png';

function Game() {
  const [check, setCheck] = useState(true);
  const [start, setStart] = useState(true);
  const [arr, setArr] = useState(Array(9).fill(-1));
  const [num, setNum] = useState(-1);
  const [val, setVal] = useState(Array(9).fill(-1));
  const [click, setClick] = useState(1);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [startingPlayer, setStartingPlayer] = useState(false);
  const [show, setShow] = useState(false);
  const [tie,setTie]=useState(false);
  useEffect(() => {
    if (num !== -1) {
      if (num === 1) {
        if (!startingPlayer) {
          setCount1(prevCount => prevCount + 1);
          console.log(' 1 Player 1 wins', count1 + 1, "num is", num);
        } else {
          setCount1(prevCount => prevCount + 1);
          console.log(' 2 Player 2 wins', count2 + 1, "num is", num);
        }
      } else {
        if (startingPlayer) {
          setCount2(prevCount => prevCount + 1);
          console.log('3 Player 2 wins', count2 + 1, "num is", num);
        } else {
          setCount2(prevCount => prevCount + 1);
          console.log(' 4 Player 1 wins', count1 + 1, "num is", num);
        }
      }
      setStartingPlayer(!startingPlayer); 
    }
  }, [num]); 

  function create() {
    setStart(false);
    setNum(-1);
    setArr(Array(9).fill(-1));
    setCheck(true);
    setVal(Array(9).fill(-1));
    setClick(1);
    setShow(true);
    setTie(false);
  }

  function change(index) {
    if (arr[index] === -1 && click === 1 && start === false) {
      const newArr = [...arr];
      newArr[index] = check ? 1 : 0;
      setArr(newArr);
      setVal(newArr);
      setCheck(!check);
      setShow(false);
      winner(newArr);
      
    }
  }

  function winner(arr) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
     let isTie=true;
    for (const [a, b, c] of winningCombinations) {
      if (arr[a] !== -1 && arr[a] === arr[b] && arr[a] === arr[c]) {
        if (arr[a] === 1) {
          if (!startingPlayer) {
            console.log("1");
            setNum(1);

          } else {
            console.log("2");
            setNum(0);
          }
        } else if (arr[a] === 0) {
          if (!startingPlayer) {
            console.log("3");
            setNum(0);
          } else {
            console.log("4");
            setNum(1);
          }
        }
        
        const newArr = [...arr];
        newArr[a] = newArr[b] = newArr[c] = 2;
        if (newArr[a] === 2) {
          setClick(0);
        }
        setArr(newArr);
        isTie=false;
        return;
      }
    }
    if (isTie && !arr.includes(-1) && !arr.includes(2)) {
      setTie(true);
    }
  }

  return (
    <div className="main-game">
      <h1 className="game-name">Tic-Tac-Toe</h1>
      <h2>{num !== -1 ? (!num ? "Player 2 wins" : "Player 1 wins") : (show ? (!startingPlayer ? "Player 1 start the game" : "Player 2 start the game") : "")}{tie && "It's a tie!"}</h2>
      <h4>Player 1: {count1} Player 2: {count2}</h4>
      <div className="ground">
        {val.map((value, index) => (
          <div key={index} className="sq" onClick={() => change(index)} style={{ background: arr[index] === 2 ? "lightblue" : "#ccc" }}>
            <img src={value !== -1 ? (value ? x : o) : ""} alt="" className="" />
          </div>
        ))}
      </div>
      <button onClick={create}>{start ? "start" : "reset"}</button>
    </div>
  );
}

export default Game;