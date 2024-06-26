
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Home';
import UserForm from './components/UserForm';
import axiosInstance from './config/axiosConfig';
import { LoginForm } from './components/LoginForm'
import Header from './components/ui/header';
import { useToast } from "./components/ui/use-toast"
function App() {
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));

  const handleLogin = () => {
      setIsAuthenticated(true);
  };
  const handleLogOut = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
};

  const handleSubmitForm = (formData:string, id:Number) => {

      if (id) {
          // Update existing user
          axiosInstance.put(`/api/users/${id}/`, formData)
              .then(response => {
                console.log(response.data)
                toast({
                    title: "Success",
                    description: "User has been updated successfuly....",
                })
                
              })
              .catch(error => {console.error(error)
                toast({
                    title: "Error",
                    description: "Something went wrong!",
                })

              });
      } else {
          // Create new user
          axiosInstance.post('/api/users/', formData)
              .then(response => {console.log(response.data)
                toast({
                    title: "Success",
                    description: "New user has been added successfuly....",
                })
              })
              .catch(error => {console.error(error)
                toast({
                    title: "Error",
                    description: "Somethin went wrong!",
                })
              });
      }
  };

  return (
    <>
    <Router>
            <div>
                {isAuthenticated ? (
                  <>
                  <Header onLogOut={handleLogOut} />
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/user/new" element={<UserForm onFormSubmit={handleSubmitForm} />} />
                        <Route path="/user/:id" element={<UserForm onFormSubmit={handleSubmitForm} />} />
                    </Routes>
                    </>  
                ) : (
                    <LoginForm onLogin={handleLogin} />
                )}
            </div>
        </Router>
    </>
  )
}

export default App
