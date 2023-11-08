import AppWeb3auth from './AppWeb3auth';
import AppThirdweb from './AppThirdweb';

function App() {
  // const [showWeb3Auth, setShowWeb3Auth] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <AppWeb3auth />
      </header>
      <header className="App-header">
        <AppThirdweb />
      </header>
    </div>
  );
}

export default App;