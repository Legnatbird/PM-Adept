import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchHistorical, setVisible } from '../features/Historical/historicalSlide';
import getDate from '../utils/getDate';

export default function Historical() {

  const [value, setValue] = useState();
  const [holder, setHolder] = useState();

  const { history, visible } = useSelector(state => state.historical);
  const currencies = useSelector(state => state.currency.currencies);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof value === "string") {
      setHolder(`The rate of ${currencies[0]} on this date was: ${value} ${currencies[1]}`);
    };

    if (history[currencies[1]] & history[currencies[0]]) {
      setValue((history[currencies[1]] / history[currencies[0]]).toFixed(2));
    } else if (typeof value !== "undefined") {
      if (!history[currencies[1]]) {
        setValue(`${currencies[1]} not exist in this date`);
      } else if (!history[currencies[0]]) {
        setValue(`${currencies[0]} not exist in this date`);
      }
    } else {
      setHolder("Please select a date");
    }
  }, [currencies, history, value, dispatch]);

  function handleChange(e) {
    if (e.target.value) {
      dispatch(fetchHistorical(e.target.value));
      return dispatch(setVisible({ visible: false }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    return dispatch(setVisible({ visible: true }));
  }


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
                {(visible) && <p style={{ marginTop: "10px", marginBottom: "unset" }}>{text}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}