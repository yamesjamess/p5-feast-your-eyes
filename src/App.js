import Button from 'react-bootstrap/Button';
import './App.css';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <h1>Welcome to Feast Your Eyes</h1>
      <NavBar />
      <Button variant="primary">Primary</Button>
    </div>
  );
}

export default App;