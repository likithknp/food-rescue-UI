import Navbar from "../components/Navbar";

function Profile() {

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="card shadow p-4">

          <h2>User Profile</h2>

          <p>
            Name: Demo User
          </p>

          <p>
            Email: demo@foodrescue.com
          </p>

        </div>

      </div>
    </>
  );
}

export default Profile;