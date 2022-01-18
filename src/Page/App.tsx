import { HashRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './Login';
import HomePage from './Home';

export default () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />}/>
      </Routes>
    </HashRouter>
  );
}
