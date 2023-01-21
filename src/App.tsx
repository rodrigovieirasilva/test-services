import { useState, useContext, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

import { createContext } from 'react';
import {
  InitialContext,
  IServicesContext,
  ServicesContext,
} from './contexts/Services';
import { UpdatePriceFeedsEvent } from './services/PriceFeeds/types';

interface LoggedLayoutProps {
  children: JSX.Element;
}

function PriceComponent() {
  const { priceFeedsService } = useContext<IServicesContext>(ServicesContext);
  const [price, setPrice] = useState<number>();

  useEffect(() => {
    const assetId = {
      ticker: 'PETR4',
      exchange_iso10383: 'XBSP',
    };
    priceFeedsService.subscribe({
      assetId,
      price_feeds_id: 'instrument_morningstar',
      instrument_morningstar: '56.1.PETR4',
    });
    const onUpdate = ({ detail }: UpdatePriceFeedsEvent) =>
      setPrice(detail.data.price);
    priceFeedsService.onUpdate(assetId, onUpdate);
    return () => priceFeedsService.offUpdate(assetId, onUpdate);
  });
  return <p> Price: {price} </p>;
}
function LoggedLayout({ children }: LoggedLayoutProps) {
  const [context] = useState(InitialContext);

  useEffect(() => {
    return () => context.destroy();
  }, [context]);

  return (
    <ServicesContext.Provider value={context}>
      {children}
    </ServicesContext.Provider>
  );
}

function App() {
  const [logged, setLogged] = useState(false);

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
        <button onClick={() => setLogged((logged) => !logged)}>
          {logged ? 'Click to Sign-Out' : 'Click to Sign-In'}
        </button>
        {logged ? (
          <LoggedLayout>
            <PriceComponent></PriceComponent>
          </LoggedLayout>
        ) : (
          <p>No Price</p>
        )}
      </div>
    </div>
  );
}

export default App;
