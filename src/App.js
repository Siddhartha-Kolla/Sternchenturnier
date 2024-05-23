import logo from './logo.svg';
import './App.css';
import Grid from '@mui/material/Grid';
import Inter from '@fontsource/inter';
import React, { useState, useEffect, useMemo } from 'react';

const Table = ({team1,team2, onDragStart, onDrop, index, isLocked}) => {
  return (
    <div className='table'>
      <div 
        className='team' 
        draggable={!isLocked} 
        onDragStart={(e) => !isLocked && onDragStart(e, index, 0)}
        onDrop={(e) => onDrop(e, index, 0)}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className='player'>
          <p>{team1[0]}</p>
        </div>
        <div className='player'>
          <p>{team1[1]}</p>
        </div>
      </div>
      <div 
        className='team' 
        draggable={!isLocked} 
        onDragStart={(e) => !isLocked && onDragStart(e, index, 1)}
        onDrop={(e) => onDrop(e, index, 1)}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className='player'>
          <p>{team2[0]}</p>
        </div>
        <div className='player'>
          <p>{team2[1]}</p>
        </div>
      </div>
    </div>
  );
}

function PointTable() {
    return (
      <div className='points-table'>
        <div className='point_table'>
          <Grid container className='point_label'>
            <Grid item xs={5}>Table 1</Grid>
          </Grid>
          <Grid container className='point_score'>
            <Grid item xs={5} className='side'>1 | 2</Grid>
            <Grid item xs={2} className='vs'>vs</Grid>
            <Grid item xs={5} className='side'>3 | 4</Grid>
          </Grid>
          <Grid container className='point_label'>
            <Grid item xs={5}>Table 1</Grid>
          </Grid>
          <Grid container className='point_score'>
            <Grid item xs={5} className='side'>1 | 2</Grid>
            <Grid item xs={2} className='vs'>vs</Grid>
            <Grid item xs={5} className='side'>3 | 4</Grid>
          </Grid>
          <Grid container className='point_label'>
            <Grid item xs={5}>Table 1</Grid>
          </Grid>
          <Grid container className='point_score'>
            <Grid item xs={5} className='side'>1 | 2</Grid>
            <Grid item xs={2} className='vs'>vs</Grid>
            <Grid item xs={5} className='side'>3 | 4</Grid>
          </Grid>
          <Grid container className='point_label'>
            <Grid item xs={5}>Table 1</Grid>
          </Grid>
          <Grid container className='point_score'>
            <Grid item xs={5} className='side'>1 | 2</Grid>
            <Grid item xs={2} className='vs'>vs</Grid>
            <Grid item xs={5} className='side'>3 | 4</Grid>
          </Grid>
          <Grid container className='point_label'>
            <Grid item xs={5}>Table 1</Grid>
          </Grid>
          <Grid container className='point_score'>
            <Grid item xs={5} className='side'>1 | 2</Grid>
            <Grid item xs={2} className='vs'>vs</Grid>
            <Grid item xs={5} className='side'>3 | 4</Grid>
          </Grid>
        </div>
      </div>
    )
  }

function rotateRight(arr) {
  if (arr.length <= 1) {
      return arr;
  }
  
  const lastElement = arr.pop();
  arr.unshift(lastElement);
  
  return arr;
}

function distributePlayers(players_num) {
  var rounds = [];
  var players_list = [];
  for (let i=1;i <= players_num;i++) {
    players_list.push(i);
  }

  for (let i=1;i < players_num;i++) {
    var game = [];
    for (let x=1;x<= Math.floor(players_num/2);x++) {
      game.push([players_list[x-1],players_list.slice(x*(-1))[0]]);
    }
    var turned_list = players_list.slice(1);
    turned_list = rotateRight(turned_list);
    var turned_list_final = [players_list[0]];
    turned_list_final = turned_list_final.concat(turned_list);
    players_list = turned_list_final;
    rounds.push(game)
  }

  return rounds;
}

function App() {

  const [tables, setTables] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [draggedHalf, setDraggedHalf] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  const addTable = (team1, team2) => {
    const newTable = { id: tables.length + 1, team1, team2 };
    setTables(prevTables => [...prevTables, newTable]);
  };

  const updateTable = (id, newTeam1, newTeam2) => {
    const updatedTables = tables.map(table =>
      table.id === id ? { ...table, team1: newTeam1, team2: newTeam2 } : table
    );
    setTables(updatedTables);
  };

  const handleDragStart = (e, index, half) => {
    setDraggedIndex(index);
    setDraggedHalf(half);
  };

  const handleDrop = (e, index, half) => {
    if (draggedIndex === null || draggedHalf === null) return;

    const newTables = [...tables];
    const sourceTeam = newTables[draggedIndex][draggedHalf === 0 ? 'team1' : 'team2'];
    const targetTeam = newTables[index][half === 0 ? 'team1' : 'team2'];

    if (half === 0) {
      newTables[index].team1 = sourceTeam;
      newTables[draggedIndex][draggedHalf === 0 ? 'team1' : 'team2'] = targetTeam;
    } else {
      newTables[index].team2 = sourceTeam;
      newTables[draggedIndex][draggedHalf === 0 ? 'team1' : 'team2'] = targetTeam;
    }

    setTables(newTables);

    // Update play_order array
    let newPlayOrder = [...play_order];
    let temp = newPlayOrder[draggedIndex][draggedHalf];
    newPlayOrder[draggedIndex][draggedHalf] = newPlayOrder[index][half];
    newPlayOrder[index][half] = temp;

    setPlayOrder(newPlayOrder);

    setDraggedIndex(null);
    setDraggedHalf(null);
  };

  const toggleLock = () => {
    setIsLocked(prevIsLocked => !prevIsLocked);
  };

  let players = 16;
  let player_board = useMemo(() => distributePlayers(players), [players]);
  player_board = player_board.sort((a, b) => 0.5 - Math.random());
  
  let [play_order, setPlayOrder] = useState(() => {
    let round = 0;
    let order = [];
    for (let i = 0; i < player_board[round].length / 2; i++) {
      order.push([player_board[round][2 * i], player_board[round][2 * i + 1]]);
    }
    return order;
  });

  useEffect(() => {
    for (let x = 0; x < players / 4; x++) {
      addTable(play_order[x][0], play_order[x][1]);
    }
  }, []);

  function end_game() {
    console.log(play_order);
  }

  return (
    <div className="App">
      <header className="App-header flex bg-green-600">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body className='App-body bg-black'>
        <Grid container>
          <Grid item xs={8} className="bg-green-600 tables">
            {tables.map((table, index) => (
              <Table 
                key={table.id} 
                team1={table.team1} 
                team2={table.team2} 
                onDragStart={handleDragStart}
                onDrop={handleDrop}
                index={index}
                isLocked={isLocked}
              />
            ))}
          </Grid>
          <Grid item xs={4} className='bg-green-600 control-panel'>
            <button className='button'>Generate</button>
            <button className='button'>End</button>
            <button className='button' onClick={toggleLock}>{isLocked ? 'Unlock' : 'Lock'}</button>
            <button className='end-button' onClick={end_game}>End Game</button>
            <PointTable/>
            <div className='points'></div>
          </Grid>
        </Grid>
      </body>
    </div>
  );
}

export default App;
