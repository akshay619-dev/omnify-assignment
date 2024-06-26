import { useState, useEffect } from 'react';
import axiosInstance from '../config/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useToast } from "./ui/use-toast"
import './UserForm.css'

interface FriendType {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  friends: { friend: number }[];
}

interface UserFormProps {
  onFormSubmit: (formData: { name: string; friend_ids: number[] }, id?: number) => void;
}

const UserForm = ({ onFormSubmit }: UserFormProps) => {
  const { toast } = useToast()
  const [name, setName] = useState('');
  const [friends, setFriends] = useState<FriendType[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/api/users/all_users/')
      .then(response => { setFriends(response.data) })
      .catch(error => console.error(error));

    if (id) {
      axiosInstance.get(`/api/users/${id}/`)
        .then(response => {
          const user: User = response.data;
          setName(user.name);
          setSelectedFriends(user.friends.map(item => item.friend));
        })
        .catch(error => console.error(error));  
    }
  }, [id]);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      if (!name) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Name field should not be empty!",
        })
        return false
      }
      const formData = {
        name,
        friend_ids: selectedFriends
      };

      onFormSubmit(formData, id ? parseInt(id) : undefined);
      navigate('/');
    } catch (error) {

    }

  };

  return (
    <>
      <div className="container px-5 py-12 mx-auto">
        <div className="w-full ">
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-2xl font-medium title-font mb-2 text-gray-900"> {id ? 'Update User' : 'Add User'}</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2 mb-2">
                    <Label htmlFor="name" className="text-lg font-medium">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter the name"
                      value={name} onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2 mb-2">
                    <div className=" items-center">
                      <Label htmlFor="name" className="text-lg font-medium">Select Friend</Label>
                    <select
                      id="friends"
                      className="flex mt-2 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                      multiple
                      value={selectedFriends.map(String)}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setSelectedFriends([...e.target.selectedOptions].map((o: HTMLOptionElement) => parseInt(o.value, 10)))
                      }
                    >
                      {friends.filter((item) => item.id !== (id ? parseInt(id, 10) : -1)).map(friend => (
                        <option
                          key={friend.id}
                          value={friend.id}
                          className={selectedFriends.includes(friend.id) ? 'selected-friend' : ''}
                        >
                          {friend.name}
                        </option>
                      ))}
                    </select>
                    </div>
                  </div>
                  <Button variant="outline" type="submit" className="w-full">
                    {id ? 'Update User' : 'Add User'}
                  </Button>

                </div>
              </form>

            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default UserForm;
