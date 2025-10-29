import { AuthProvider } from '@context/AuthContext';
import { MyListProvider } from '@context/MyListContext';
import Toast from '@ui/Toast';
import AppContent from '@layout/AppContent';

function App() {

  return (
    <AuthProvider>
      <MyListProvider>
        <div className="App">
          <AppContent />

          <Toast />
        </div>
      </MyListProvider>
    </AuthProvider>
  );
}

export default App;