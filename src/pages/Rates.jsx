import Currencies from "../components/Currencies"
import Historical from "../components/Historical"

export default function Rates() {
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
			</div>
			<Historical />
		</div>
	)
}