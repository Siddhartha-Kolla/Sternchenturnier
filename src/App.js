import React, { useState, useEffect, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from '@mui/material/Grid';
import Inter from '@fontsource/inter';

const Table = ({ team1, team2, onDragStart, onDrop, index, isLocked }) => {
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
  for (let i = 1; i <= players_num; i++) {
    players_list.push(i);
  }

  for (let i = 1; i < players_num; i++) {
    var game = [];
    for (let x = 1; x <= Math.floor(players_num / 2); x++) {
      game.push([players_list[x - 1], players_list.slice(x * (-1))[0]]);
    }
    var turned_list = players_list.slice(1);
    turned_list = rotateRight(turned_list);
    var turned_list_final = [players_list[0]];
    turned_list_final = turned_list_final.concat(turned_list);
    players_list = turned_list_final;
    rounds.push(game);
  }

  return rounds;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const PlayerInput = ({ onSubmit }) => {
  const [playerCount, setPlayerCount] = useState(16);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(playerCount);
  };

  return (
    <div className='hello'>
    <img src={logo} className="App-logo" alt="logo" />
    <div className="player-input">
      <form onSubmit={handleSubmit}>
        <label>
          Anzahl der Spieler:
          <input 
            type="number" 
            value={playerCount} 
            onChange={(e) => setPlayerCount(e.target.value)} 
            min="4" 
            step="4"
          />
        </label>
        <button type="submit">Starten</button>
      </form>
    </div>
    </div>
  );
};

function App() {
  const [players, setPlayers] = useState(() => {
    const savedPlayers = localStorage.getItem('players');
    return savedPlayers ? JSON.parse(savedPlayers) : null;
  });
  const [round, setRound] = useState(() => {
    const savedRound = localStorage.getItem('round');
    return savedRound ? JSON.parse(savedRound) : 0;
  });
  const [play_round, setPlayRound] = useState(() => {
    const savedPlayRound = localStorage.getItem('play_round');
    return savedPlayRound ? JSON.parse(savedPlayRound) : 0;
  });
  const [tables, setTables] = useState(() => {
    const savedTables = localStorage.getItem('tables');
    return savedTables ? JSON.parse(savedTables) : [];
  });
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [draggedHalf, setDraggedHalf] = useState(null);
  const [isLocked, setIsLocked] = useState(() => {
    const savedIsLocked = localStorage.getItem('isLocked');
    return savedIsLocked ? JSON.parse(savedIsLocked) : false;
  });

  const player_board = useMemo(() => {
    return players ? distributePlayers(players) : [];
  }, [players]);

  const [playOrder, setPlayOrder] = useState(() => {
    const savedPlayOrder = localStorage.getItem('playOrder');
    return savedPlayOrder ? JSON.parse(savedPlayOrder) : [];
  });

  useEffect(() => {
    if (players) {
      const order = [];
      for (let i = 0; i < player_board[round]?.length / 2; i++) {
        order.push([player_board[round][2 * i], player_board[round][2 * i + 1]]);
      }
      setPlayOrder(order);
    }
  }, [players, player_board, round]);

  useEffect(() => {
    if (playOrder.length) {
      const newTables = [];
      for (let x = 0; x < players / 4; x++) {
        newTables.push({ id: x + 1, team1: playOrder[x][0], team2: playOrder[x][1] });
      }
      setTables(newTables);
    }
  }, [players , playOrder]);

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('round', JSON.stringify(round));
  }, [round]);

  useEffect(() => {
    localStorage.setItem('play_round', JSON.stringify(play_round));
  }, [play_round]);

  useEffect(() => {
    localStorage.setItem('tables', JSON.stringify(tables));
  }, [tables]);

  useEffect(() => {
    localStorage.setItem('isLocked', JSON.stringify(isLocked));
  }, [isLocked]);

  useEffect(() => {
    localStorage.setItem('playOrder', JSON.stringify(playOrder));
  }, [playOrder]);

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
    let newPlayOrder = [...playOrder];
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

  const anotherRound = () => {
    const newRound = (round + 1) % player_board.length;
    setRound(newRound);

    let newOrder = [];
    for (let i = 0; i < player_board[newRound].length / 2; i++) {
      newOrder.push([player_board[newRound][2 * i], player_board[newRound][2 * i + 1]]);
    }
    setPlayOrder(newOrder);
  };

  const handleRandomize = () => {
    // Step 1: Flatten the current play order to get the pairs
    const pairs = playOrder.flat();
  
    // Step 2: Shuffle the pairs
    const shuffledPairs = shuffle(pairs);
  
    // Step 3: Reassign shuffled pairs to the tables
    const newTables = [];
    for (let i = 0; i < shuffledPairs.length / 2; i++) {
      newTables.push({
        id: i + 1,
        team1: shuffledPairs[2 * i],
        team2: shuffledPairs[2 * i + 1],
      });
    }
  
    setTables(newTables);
    setPlayOrder(newTables.map(table => [table.team1, table.team2]));
  };    

  const appendRound = () => {
    if  (!(play_round >= players - 2)) {
      let newPlayRound = play_round + 1;
      setPlayRound(newPlayRound);
      player_board.splice(round, 1);
      anotherRound();
    }
  }

  const handlePlayerCountSubmit = (count) => {
    setPlayers(count);
  };

  const handleReset = () => {
    setPlayers(null);
    setRound(0);
    setPlayRound(0);
    setTables([]);
    setDraggedIndex(null);
    setDraggedHalf(null);
    setIsLocked(false);
    setPlayOrder([]);
    localStorage.clear();
  };

  if (!players) {
    return <PlayerInput onSubmit={handlePlayerCountSubmit} />;
  }

  return (
    <html className="App">
      <title>Sternchenturnier</title>
      <header className="App-header flex">
        <button className='button next-button' style={{ width: "5vw" , fontSize: "2.5vh" }} onClick={handleReset}>{"Zurück"}</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Runde {play_round + 1}</p>
        <button onClick={appendRound} className='button next-button' style={{ width: "5vw" }}>{">"}</button>
      </header>
      <body className='App-body bg-black' style={{fontFamily: Inter}}>
        <Grid container>
          <Grid item xs={8} className="tables">
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
            <button className='button' onClick={anotherRound}>Nächste Runde</button>
            <button className='button' onClick={handleRandomize} disabled={isLocked}>Würfeln</button>
            <button className='button' onClick={toggleLock}>{isLocked ? 'Entsperren' : 'Sperren'}</button>
          </Grid>
        </Grid>
      </body>
    </html>
  );
}

export default App;