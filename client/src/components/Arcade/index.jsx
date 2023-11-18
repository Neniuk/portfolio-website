import React, { Component } from "react";
import "./styles.css";

class MyArcade extends Component {
	render() {
		return (
			<div className="card">
				<div className="arcade">
					<div className="arcade-content"></div>
				</div>
			</div>
		);
	}
}

export default React.memo(MyArcade);
