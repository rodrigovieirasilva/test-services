import { useState, useContext } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

import { createContext } from 'react';

class Context {
  public teste: Teste;
  constructor() {
    this.teste = new Teste();
  }
}

const ThemeContext = createContext<Context | null>(null);

class Teste {
  private interval;
  public a = 0;
  constructor() {
    this.interval = setInterval(() => {
      this.a += 1;
      console.log(this.a);
    }, 1000);
  }
}

function Outro() {
  const { teste } = useContext<Context>(ThemeContext);
  const [a, setA] = useState<number>(teste.a);
  componentWillUnmount
  setInterval(() => setA(teste.a), 1000);
  return <div>Teste:{a}</div>;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => setCount((count) => count - 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {count > 0 && count < 3 ? (
        <ThemeContext.Provider value={new Context()}>
          <Outro />
        </ThemeContext.Provider>
      ) : null}
    </div>
  );
}

export default App;
