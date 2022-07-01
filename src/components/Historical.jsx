import { useDispatch, useSelector } from 'react-redux';
import { fetchHistorical } from '../features/Historical/historicalSlide';
import { useState } from 'react';
import getDate from '../utils/getDate';

export default function Historical() {

  const [value, setValue] = useState();

  const currencieHistorical = useSelector(state => state.historical.history);
  const currencies = useSelector(state => state.currency.currencies);
  const dispatch = useDispatch();

  const handleChange = e=> dispatch(fetchHistorical(e.target.value));
  const handleSubmit = e=> {
    if (e.target.value) {
      e.preventDefault();
      setValue((currencieHistorical[currencies[1]] / currencieHistorical[currencies[0]]).toFixed(2)); 
    } else {
      e.preventDefault();
      setValue("Insert a date");
    }
  };
  
  const text = `The rate of ${currencies[0]} at that date was: ${value} ${currencies[1]}`;
  const date = getDate();

  return (
    <>
      <div className="row">
        <div style={{width: "100%", marginLeft: "10px"}} className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Historic Lookup</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="from">Date</label>
                  <input className="form-control" type="date" id="date" max={date} onChange={handleChange}/>
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                <button type="submit" className="btn btn-primary">Check</button>
                {value && <p style={{marginTop: "10px", marginBottom: "unset"}}>{(value !== "Insert a date") ? text : value}</p>}
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}