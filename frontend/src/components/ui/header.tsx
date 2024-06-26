import { Link } from "react-router-dom"
import { Button } from "./button"

const Header = ({ onLogOut }) => {
  return (
    <header className="text-gray-600 body-font">
    <div className="container mx-auto flex flex-wrap p-5 justify-between flex-col md:flex-row items-center">
        <Link to={`/`} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <span className="ml-3 text-xl">Omnify Assingment :</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
           <Link to={`/`} className="mr-5 text-gray-900 hover:text-gray-600">Home</Link>
           <Link to={`/user/new`} className="mr-5 text-gray-900 hover:text-gray-600">Add User</Link>
        </nav>
        <Button className=""  onClick={onLogOut} variant="outline">Logout
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
        </Button>
  </div>
</header>
  )
}

export default Header