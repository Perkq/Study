import logo from './logo.svg';
import './App.css';
import MainComponentContainer from './components/mainContainer.tsx';
import {Products} from "./state/state.ts"



function App() {
  return (
  <div>
    <MainComponentContainer Products={Products} />

  </div>
  );
}

export default App;
