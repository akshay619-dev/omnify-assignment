import { Link } from 'react-router-dom';


type PaginatiomProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (id: number) => void;
};
const Pagination: React.FC<PaginatiomProps>  = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <>
            <div className="flex mt-10  w-full mx-auto">
                
                <Link to={'#'} className="text-grey-500 inline-flex items-center md:mb-2 lg:mb-0 px-3">
                {/* {currentPage === totalPages &&  */}
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Prev
                </button>
                {/* } */}
                </Link>
                <Link to={'#'} className="text-grey-500 inline-flex items-center md:mb-2 lg:mb-0">
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
                {currentPage !== totalPages && <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>}
                </Link>


            </div>

        </>
    );
};

export default Pagination;
