import { useSelector, useDispatch } from "react-redux";
import { setCurrency } from "../features/Selected/selectedSlide";
import { setConvert } from "../features/Convert/convertSlide";

export default function Currency({ bott, message = "Currency" }) {

  const currencies = useSelector(state => state.currencies);
  const { convert, convertTo } = useSelector(state => state.converted);
  const dispatch = useDispatch();

  function handleChange(e) {
    dispatch(setCurrency({
      [e.target.name]: e.target.value,
      currencies: e.target.value,
      values: currencies.currencies[e.target.value]
    }));
    dispatch(setConvert({
      visible: false,
      convert,
      convertTo
    }))
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