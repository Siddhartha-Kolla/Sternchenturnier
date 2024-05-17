import logo from './logo.svg';
import './App.css';
import Grid from '@mui/material/Grid';
import Inter from '@fontsource/inter';

function Table() {
  return (
    <div className='table bg-red-800'>
      <div className='team' draggable>
        <div className='player'>
          <p>1</p>
        </div>
        <div className='player'>
          <p>2</p>
        </div>
      </div>
      <div className='team' draggable>
        <div className='player'>
          <p>3</p>
        </div>
        <div className='player'>
          <p>4</p>
        </div>
      </div>
    </div>
  );
}

function PointTable(){
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


  for (let i=1;i <= players_num;i++) {
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

  // Variables
  let players = 16
  let lock = false;
  let end = false;
  let game_end = false;
  let player_board = distributePlayers(16);
  let players_points = [];
  for (let i=0;i<=players;i++) {
    players_points.push(0);
  }

  return (
    <div className="App">
      <header className="App-header flex bg-green-600">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body className='App-body bg-black'>
        <Grid container>
          <Grid item xs={8} className="bg-green-600 tables">
            <Table/>
            <Table/>
            <Table/>
            <Table/>
            <Table/>
          </Grid>
          <Grid item xs={4} className='bg-green-600 control-panel'>
            <button className='button'>Generate</button>
            <button className='button'>End</button>
            <button className='button'>Lock</button>
            <button className='end-button'>End Game</button>
            <PointTable/>
            <div className='points'></div>
          </Grid>
        </Grid>
      </body>
    </div>
  );
}


export default App;
