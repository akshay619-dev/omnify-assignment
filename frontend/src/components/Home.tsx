import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../config/axiosConfig';
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { useToast } from "./ui/use-toast"
import moment from 'moment';
import Pagination from '../config/Pagination';

interface User {
    id: number;
    name: string;
    friends: { friend: number; friend_name: string }[];
    created_at: string;
    updated_at: string;
  }
  
const Home = () => {
    const { toast } = useToast()
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    const fetchUsers = (page:number) => {
        axiosInstance.get(`/api/users/?page=${page}`)
            .then(response => {
                console.log(response.data)
                setUsers(response.data.results);
                setTotalPages(response.data.count / response.data.results.length);  
            })
            .catch(error => console.error(error));
    };
    const deleteUser = (id: Number) => {
        try {
            axiosInstance.delete(`/api/users/${id}/`)
            .then(() => setUsers(users.filter(user => user.id !== id)))
            .catch(error => console.error(error));
           
            toast({
                title: "Success",
                description: "User deleted successfuly....",
              })
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong!",
              })
        }
        
    };
    const handlePageChange = (page:number) => {
        setCurrentPage(page);
    };

    return (
        <>
        <div className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-left w-full mb-6">
                    <h1 className="text-xl font-medium title-font mb-2 text-gray-900">Users List</h1>
                </div>
                <div className="w-full mx-auto overflow-auto">
                    <table className="table-auto w-full text-left whitespace-no-wrap">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-lg bg-gray-100 rounded-tl rounded-bl">ID</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-lg bg-gray-100 rounded-tl rounded-bl">Users</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-lg bg-gray-100">Friends</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-lg bg-gray-100">Created At</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-lg bg-gray-100">Updated At</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-lg bg-gray-100 rounded-tl rounded-bl">Actions</th>
                              </tr>
                        </thead>
                        <tbody>
                           
                            {users.map(user => (
                                <tr key={user.id}>
                                <td className="px-4 py-3">{user.id}</td>    
                                <td className="px-4 py-3">
                                    {user.name}
                                </td>    
                                <td className="px-4 py-3">
                                        {user.friends.map(friend => (
                                            <Badge key={friend.friend} variant="outline">{friend.friend_name}</Badge>
                                        ))}
                                    </td>
                                    <td className="px-4 py-3">{ moment(user.created_at).format('Do-MMM-YY | h:mm a')}</td>
                                    <td className="px-4 py-3">{ moment(user.updated_at).format('Do-MMM-YY | h:mm a')}</td>
                                    <td className="px-4 py-3">
                                     <Button variant="outline"  className="w-1/3 mr-2"><Link to={`/user/${user.id}`} title='Edit'>Edit</Link></Button>
                                     <Button variant="outline"  className="w-1/3"  onClick={() => deleteUser(user.id)} title='Delete'>Delete</Button>
                                   
                                    </td>
                                </tr>
                                ))}



                        </tbody>
                    </table>
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
        </>
    );
};

export default Home;
