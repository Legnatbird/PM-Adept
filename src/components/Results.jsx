export default function Results({result}) {
  
  return (
    <div className="cold-md-6">
      <div className="card">
        <div className="card-header">
          <h3>Results</h3>
        </div>
        <div className="card-body">
          <p>{result}</p>
        </div>
      </div>
    </div>
  )
}