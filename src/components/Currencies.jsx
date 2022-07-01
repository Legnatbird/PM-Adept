import { useSelector, useDispatch } from "react-redux"
import { fetchCurrencies } from "../features/Currencies/currenciesSlide";
import { setConvert } from "../features/Convert/convertSlide";
import { useEffect } from "react"
import Currency from "./Currency";
import Results from "./Results";

export default function Currencies() {
  const currencies = useSelector(state => state.currencies);
  const { visible } = useSelector(state => state.converted);
  const currency = useSelector(state => state.currency.values);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setConvert({
      visible: true,
      convert: (currency[1] / currency[0]).toFixed(2)
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
              <Currency bott="base"/>
              <Currency bott="toCurrency" message="to"/>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input defaultValue={1} min={0} step={0.01} type="number" name="amount" id="amount" className="form-control" />
              </div>
              <div style={{display: "flex", flexDirection: "column"}}>
                <button type="submit" className="btn btn-primary">Convert</button>
                {visible && <Results />}
              </div>
            </form>
          </div>
        </>
      ) : null}
    </>
  )
}