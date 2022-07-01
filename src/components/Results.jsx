import { useSelector } from "react-redux";

export default function Results() {

  const { convert } = useSelector(state => state.converted);
  const currencie = useSelector(state => state.currency.currencies);

  const text = `1 ${currencie[0]} = ${convert} ${currencie[1]}`

  return (
    <>
      <p style={{marginTop: "10px", marginBottom: "unset"}}>{text}</p>
    </>
  )
}