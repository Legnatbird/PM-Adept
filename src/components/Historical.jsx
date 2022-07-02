import { useDispatch, useSelector } from 'react-redux';
import { fetchHistorical } from '../features/Historical/historicalSlide';
import { useState, useEffect } from 'react';
import getDate from '../utils/getDate';

export default function Historical() {

  const [value, setValue] = useState();
  const [holder, setHolder] = useState();

  const currencieHistorical = useSelector(state => state.historical.history);
  const currencies = useSelector(state => state.currency.currencies);
  const dispatch = useDispatch();

  const handleChange = e => {
    if (e.target.value) {
      dispatch(fetchHistorical(e.target.value));
    }
  };

  useEffect(() => {
    if (typeof value === "string") {
      setHolder(`The rate of ${currencies[0]} at that date was: ${value} ${currencies[1]}`);
    }
  }, [value, currencies]);

  const handleSubmit = e => {
    e.preventDefault();
    if (currencieHistorical[currencies[1]] & currencieHistorical[currencies[0]]) {
      setValue((currencieHistorical[currencies[1]] / currencieHistorical[currencies[0]]).toFixed(2));
    }
    if (typeof value !== "undefined") {
      if (!currencieHistorical[currencies[1]]) {
        setValue(`${currencies[1]} not exist in this date`);
      }
      if (!currencieHistorical[currencies[0]]) {
        setValue(`${currencies[0]} not exist in this date`);
      }
    } else {
      setHolder("Please select a date");
    }
  };

  const date = getDate();
  const text = (value > 0) ? holder : value ? value : holder;

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
                <input className="form-control" type="date" id="date" max={date} min="1999-01-01" onChange={handleChange} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <button type="submit" className="btn btn-primary">Check</button>
                {(value || holder) &&  <p style={{ marginTop: "10px", marginBottom: "unset" }}>{text}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}