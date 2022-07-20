import './App.css';
import AppContent from './components/AppContent';
import AppHeader from './components/AppHeader';
import PageTitle from './components/PageTitle';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App overflow-scroll">
      <PageTitle />
      <div className="px-12 w-full">
        <AppHeader />
        <AppContent />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
