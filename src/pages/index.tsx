import MainLayout from 'layouts/MainLayout';
import { NavLink, Route, Routes } from 'react-router-dom';
import styles from './app.module.scss';
import Choice from './choice';

function App() {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Choice />} />
          </Route>
          <Route
            path="*"
            element={
              <div>
                Not Found <NavLink to="/">To Home</NavLink>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
