
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirstPage from './Firstpage';
import SecondPage from './Secondpage'; // Assuming you have a SecondPage component

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<FirstPage />} />
            <Route path="/second" element={<SecondPage />} />
        </Routes>
    </Router>
);

export default App;
