import { setCurrency } from "../features/Selected/selectedSlide";
import { useSelector, useDispatch } from "react-redux";

export default function Currency({bott, message= "Currency"}) {

  const currencies = useSelector(state => state.currencies);
  const dispatch = useDispatch();

  function handleChange(e) {
    dispatch(setCurrency({
      [e.target.name]: e.target.value,
      currencies: e.target.value,
      values: currencies.currencies[e.target.value]
    }));
  }

  const options = Object.keys(currencies.currencies).map(key => (
    <option value={key} key={key}>
      {key}
    </option>
  ))

  return (
    <div className="form-group">
      <label htmlFor={bott}>{message}</label>
      <select name={bott} id={bott} className="form-control" onChange={handleChange}>
        {options}
      </select>
    </div>
  )
}