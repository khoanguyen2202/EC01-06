import RouterPage from "./Components/RouterPage";
import { DataProvider } from "./GlobalState";

import {BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <DataProvider >
      <Router>
          <RouterPage /> 
      </Router>
    </DataProvider>
    
  )
}

export default App;
