import React, { Component } from "react";
import "./styles.css";

class MyProjects extends Component {
	render() {
		return (
			<div className="card">
				<div className="projects">
					<div className="projects-title-container">
						<h1 className="projects-title">Projects</h1>
					</div>
					<div className="projects-container">
						<div className="project">
							<h3>Project 1</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Nulla accumsan, metus ultrices
								eleifend gravida, nulla nunc varius lorem, vitae
								rutrum nisi dolor eget odio. Nullam mollis. Ut
								justo. Suspendisse potenti.
							</p>
						</div>
						<div className="project">
							<h3>Project 2</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Nulla accumsan, metus ultrices
								eleifend gravida, nulla nunc varius lorem, vitae
								rutrum nisi dolor eget odio. Nullam mollis. Ut
								justo. Suspendisse potenti.
							</p>
						</div>
						<div className="project">
							<h3>Project 3</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Nulla accumsan, metus ultrices
								eleifend gravida, nulla nunc varius lorem, vitae
								rutrum nisi dolor eget odio. Nullam mollis. Ut
								justo. Suspendisse potenti.
							</p>
						</div>
						<div className="project">
							<h3>Project 4</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Nulla accumsan, metus ultrices
								eleifend gravida, nulla nunc varius lorem, vitae
								rutrum nisi dolor eget odio. Nullam mollis. Ut
								justo. Suspendisse potenti.
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MyProjects;
