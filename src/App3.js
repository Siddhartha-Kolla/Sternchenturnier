import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from '@mui/material/Grid';
import Inter from '@fontsource/inter';

const Table = ({team1,team2}) => {
    return (
      <div className='table bg-red-800'>
        <div className='team' draggable>
          <div className='player'>
            <p>{team1[0]}</p>
          </div>
          <div className='player'>
            <p>{team1[1]}</p>
          </div>
        </div>
        <div className='team' draggable>
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

const DynamicTables = () => {
  const [tables, setTables] = useState([
    { id: 1, team1: ['Player 1A', 'Player 1B'], team2: ['Player 2A', 'Player 2B'] },
    { id: 2, team1: ['Player 3A', 'Player 3B'], team2: ['Player 4A', 'Player 4B'] },
  ]);

  const addTable = () => {
    const newTable = { id: tables.length + 1, team1: ['New Player 1A', 'New Player 1B'], team2: ['New Player 2A', 'New Player 2B'] };
    setTables([...tables, newTable]);
  };

  const updateTable = (id, newTeam1, newTeam2) => {
    const updatedTables = tables.map(table =>
      table.id === id ? { ...table, team1: newTeam1, team2: newTeam2 } : table
    );
    setTables(updatedTables);
  };

  return (
    <div className='bg-green-600'>
      <button onClick={addTable}>Add Table</button>
      {tables.map(table => (
        <Table key={table.id} team1={table.team1} team2={table.team2} />
      ))}
      <button onClick={() => updateTable(1, ['Updated Player 1A', 'Updated Player 1B'], ['Updated Player 2A', 'Updated Player 2B'])}>
        Update Table 1
      </button>
    </div>
  );
};

export default DynamicTables;
