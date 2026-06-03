import Navbar from "../components/Navbar";

function NGOs() {

  const ngos = [
    {
      id: 1,
      name: "Helping Hands NGO",
      city: "Bangalore"
    },
    {
      id: 2,
      name: "Food For All",
      city: "Hyderabad"
    }
  ];

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2>NGOs</h2>

        <div className="row">

          {ngos.map((ngo) => (

            <div className="col-md-4 mt-3" key={ngo.id}>

              <div className="card shadow">

                <div className="card-body">

                  <h5>{ngo.name}</h5>

                  <p>{ngo.city}</p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default NGOs;