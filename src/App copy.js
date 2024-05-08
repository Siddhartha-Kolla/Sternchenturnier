import logo from './logo.svg';
import table from './table.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header flex bg-green-600">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body className='App-body bg-black'>
        <p>Hello world</p>
        <img src={table} className='table'/>
      </body>
    </div>
  );
}

export default App;
