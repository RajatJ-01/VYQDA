import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserCard from "./components/UserCard";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersPerPage] = useState(3);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // In a real application with server-side pagination, you would include
        // the page and limit parameters in the API call
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
        setTotalUsers(data.length);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Apply search and pagination
  useEffect(() => {
    // Filter users based on search term
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filtered);
    setTotalUsers(filtered.length);
    // Reset to first page when search term changes
    setCurrentPage(1);
  }, [searchTerm, users]);

  // Get current users for the page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">User Dashboard</h1>

      <SearchBar onSearch={handleSearch} />

      {filteredUsers.length === 0 ? (
        <div className="alert alert-info mt-3">
          No users found matching your search.
        </div>
      ) : (
        <>
          <div className="row mt-4">
            {currentUsers.map((user) => (
              <div className="col-md-4 mb-4" key={user.id}>
                <UserCard user={user} />
              </div>
            ))}
          </div>

          <Pagination
            usersPerPage={usersPerPage}
            totalUsers={totalUsers}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
}

export default App;
