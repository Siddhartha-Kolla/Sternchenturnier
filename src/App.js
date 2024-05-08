import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tables, setTables] = useState({
    table1: ['Player 1', 'Player 2'],
    table2: ['Player 3', 'Player 4'],
    table3: ['Player 5', 'Player 6'],
    table4: ['Player 7', 'Player 8'],
  });

  const handleDragStart = (event, player, table) => {
    event.dataTransfer.setData('player', player);
    event.dataTransfer.setData('table', table);
  };

  const handleDrop = (event, destinationTable) => {
    const droppedPlayer = event.dataTransfer.getData('player');
    const sourceTable = event.dataTransfer.getData('table');

    // Prevent dropping the player onto the same table
    if (sourceTable === destinationTable) {
      return;
    }

    const newTables = { ...tables };

    // Find the index of the dropped player in its source table
    const sourceIndex = newTables[sourceTable].indexOf(droppedPlayer);

    // Find the index where the player should be inserted in the destination table
    const destinationIndex = newTables[destinationTable].indexOf(event.target.innerText);

    // Swap the players between the source and destination tables
    newTables[destinationTable].splice(destinationIndex, 1, droppedPlayer);
    newTables[sourceTable].splice(sourceIndex, 1, event.target.innerText);

    // Update the state with the new tables
    setTables(newTables);
  };

  return (
    <div className="app">
      {Object.keys(tables).map((table) => (
        <div
          key={table}
          className="table"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleDrop(event, table)}
        >
          <h2>{table}</h2>
          {tables[table].map((player, index) => (
            <div
              key={player}
              className="player"
              draggable
              onDragStart={(event) => handleDragStart(event, player, table)}
            >
              {player}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
