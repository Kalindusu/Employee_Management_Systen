import './App.css';
import Header from './pages/header/Header';
import NoMatch from './pages/nomatch/NoMatch';
import { Routes, Route } from 'react-router-dom';
import PostUser from './pages/employee/postUser'; 
import Dashboard from './pages/dashbord/Dashbord';
import UpdateUser from './pages/employee/UpdateUser';
import ViewUser from './pages/employee/ViewUser';
import LeaveUser from './pages/employee/LeaveUser';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employee" element={<PostUser />} />
        <Route path="/employee/:id" element={<UpdateUser />} />
        <Route  path="/viewuser/:id" element={<ViewUser/>}/>
        <Route  path="/leaveuser/:id" element={<LeaveUser/>}/>

       
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
