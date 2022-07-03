import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import getHistorical from '../utils/getHistorical';
import getDate from '../utils/getDate';

export default function Historical() {

  const currencies = useSelector(state => state.currency.currencies);

  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState();
  const [data, setData] = useState({});
  const [text, setText] = useState()

  useEffect(() => {
    if (data[currencies[1]] && data[currencies[0]]) {
      setValue((data[currencies[1]] / data[currencies[0]]).toFixed(2));
    };
    if (typeof value === "string") {
      setText(`The rate of ${currencies[0]} on this date was: ${value} ${currencies[1]}`);
    };
    if (typeof value === "string") {
      if (!data[currencies[1]]) {
        setText(`${currencies[1]} not exist in this date`);
      }
      if (!data[currencies[0]]) {
        setText(`${currencies[0]} not exist in this date`);
      }
    } else {
      setText("Please select a date");
    }
  }, [currencies, value, setText, setValue, data, visible]);
  
  function handleChange(e) {
    if (typeof e.target.value === "string") {
      let data = getHistorical(e.target.value).then(data => setData(data));
      setData(data);
      setValue((data[currencies[1]] / data[currencies[0]]).toFixed(2));
      setVisible(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setVisible(true);
  }


  return (
    <div className="row">
      <div style={{ width: "100%", marginLeft: "10px" }} className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h3>Historic Lookup</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="from">Date</label>
                <input className="form-control" type="date" id="date" max={getDate()} min="1999-01-01" onChange={handleChange} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <button type="submit" className="btn btn-primary">Check</button>
                {visible && <p style={{ marginTop: "10px", marginBottom: "unset" }}>{text}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}