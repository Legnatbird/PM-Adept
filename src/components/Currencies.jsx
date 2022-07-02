import { useSelector, useDispatch } from "react-redux"
import { fetchCurrencies } from "../features/Currencies/currenciesSlide";
import { setConvert } from "../features/Convert/convertSlide";
import { useEffect } from "react"
import Currency from "./Currency";

export default function Currencies() {
  const { visible, convert, convertTo } = useSelector(state => state.converted);
  const currencies = useSelector(state => state.currencies);
  const currency = useSelector(state => state.currency.values);
  const currencie = useSelector(state => state.currency.currencies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  function handleChange(e) {
    console.log(e.target.value);
    dispatch(setConvert({
      visible,
      convert: e.target.value,
      convertTo
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setConvert({
      visible: true,
      convert,
      convertTo: parseFloat(convert * (currency[1] / currency[0])).toFixed(2)
    }));
  }


  return (
    <>
      {currencies.loading && <div>Loading currencies</div>}
      {!currencies.loading && currencies.error ? <div>Error: {currencies.error}</div> : null}
      {!currencies.loading && Object.keys(currencies.currencies).length ? (
        <>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <Currency bott="base" />
              <Currency bott="toCurrency" message="to" />
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input defaultValue={1} min={0} step={0.01} type="number" name="amount" id="amount" className="form-control" onChange={handleChange} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <button type="submit" className="btn btn-primary">Convert</button>
                {visible && <p style={{ marginTop: "10px", marginBottom: "unset" }}>{`${convert} ${currencie[0]} = ${convertTo} ${currencie[1]}`}</p>}
              </div>
            </form>
          </div>
        </>
      ) : null}
    </>
  )
}