import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useState } from 'react';
import axios from 'axios';
import { useToast } from "./ui/use-toast"

interface LoginFormProps {
  onLogin: () => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const { toast } = useToast()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {

      if (username != '' && password != '') {
        axios.post(`${import.meta.env.VITE_API_URI}/o/token/`, {
          grant_type: 'password',
          username,
          password,
          client_id: import.meta.env.VITE_CLIENT_ID,
          client_secret: import.meta.env.VITE_CLIENT_SECRET,
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(response => {
            localStorage.setItem('access_token', response.data.access_token);
            toast({
              title: "Success",
              description: "Login Successfull....",
            })
            onLogin();
          })
          .catch(error => {
            console.error(error)
            toast({
              variant: "destructive",
              title: "Error",
              description: "Invalid Credentials...Please try again.",
            })
          });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please all fields are mandatory...",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong....",
      })
    }


  };
  return (
    <>
      <div className="container px-5 py-24 mx-auto">
        <div className="w-full">
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your username below to login to your account
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Username</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="hello"
                      value={username} onChange={e => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>

                    </div>
                    <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                  </div>
                  <Button variant="outline" type="submit" className="w-full">
                    Login
                  </Button>

                </div>
              </form>

            </div>
          </div>

        </div>
      </div>
    </>
  )
}


export { LoginForm }
