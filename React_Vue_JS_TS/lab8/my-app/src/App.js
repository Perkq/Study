import './App.css';
import ContainerComponent from './components/MainComponent/container.tsx';
import {Products} from './state/state.ts'
function App() {
  return (
    <div>
     <ContainerComponent Products={Products}/>
    </div>
   );
}

export default App;
