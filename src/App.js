import { Routes, Route } from 'react-router-dom';
import Interview from 'pages/Interview';
import Main from 'pages/Main';
import SelectTopic from 'pages/SelectTopic';
import Ending from 'pages/Ending';
import MyPage from 'pages/MyPage';
import Programmers from 'pages/Programmers';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />}></Route>
      <Route path='selecttopic' element={<SelectTopic />}></Route>
      <Route path='interview/:id' element={<Interview />}></Route>
      <Route path='ending' element={<Ending />}></Route>
      <Route path='mypage' element={<MyPage />}></Route>
      <Route path='programmers' element={<Programmers />}></Route>
    </Routes>
  );
}

export default App;
