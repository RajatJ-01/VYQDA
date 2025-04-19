function UserCard({ user }) {
  return (
    <div className="card h-100 shadow">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <div
            className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
            style={{ width: "50px", height: "50px" }}
          >
            {user.name.charAt(0)}
          </div>
          <h5 className="card-title mb-0">{user.name}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <i className="bi bi-envelope me-2"></i>
            <strong>Email:</strong> {user.email}
          </li>
          <li className="list-group-item">
            <i className="bi bi-telephone me-2"></i>
            <strong>Phone:</strong> {user.phone}
          </li>
          <li className="list-group-item">
            <i className="bi bi-building me-2"></i>
            <strong>Company:</strong> {user.company.name}
          </li>
          <li className="list-group-item">
            <i className="bi bi-geo-alt me-2"></i>
            <strong>City:</strong> {user.address.city}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserCard;
