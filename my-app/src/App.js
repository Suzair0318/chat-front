import { BrowserRouter , Routes , Route} from 'react-router-dom';
import {User} from '../src/Components/User';
import {Chat} from '../src/Components/Chat';
import './App.css';

function App() {
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<User/>} />
        <Route path='/Chat' element={<Chat/>} />
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
