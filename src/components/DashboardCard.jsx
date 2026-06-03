function DashboardCard({ title, count }) {
  return (
    <div className="col-md-4">

      <div className="card shadow text-center">

        <div className="card-body">

          <h5>{title}</h5>

          <h2 className="text-success">
            {count}
          </h2>

        </div>

      </div>

    </div>
  );
}

export default DashboardCard;