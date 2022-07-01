import { useSelector } from "react-redux";
import Currencies from "../components/Currencies"
import Results from "../components/Results";


export default function Principal() {

	const {visible, convert} = useSelector(state => state.converted);
	const currency = useSelector(state => state.currency.currencies);
	return (
		<div className="container">
			<div className="row">
				<div className="cold-md-6">
					<div className="card">
						<div className="card-header">
							<h3>Currency Converter</h3>
						</div>
						<Currencies />
					</div>
				</div>
			{visible && <Results result={`1 ${currency[0]} = ${convert} ${currency[1]}`} />}
			</div>
		</div>
	)
}