import logo from './logo.svg';
import table from './table.svg';
import './App.css';

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
function App() {
  return (
    <div className="App">
      <header className="App-header flex bg-green-600">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body className='App-body bg-black'>
        <Table/>
      </body>
    </div>
  );
}


export default App;
