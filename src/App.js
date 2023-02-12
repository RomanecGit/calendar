import logo from './logo.svg';
import './css/App.css';
import Calendar from './components/Calendar';

const now = new Date();

// внутри компонента App:

function App() {
  return (
      <Calendar date={now} />
  );
}

export default App;
