
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom'
// import DeDupeResult from './DeDupeResult';

export default class BaseBallStats extends React.Component {

	constructor(props) {
		super(props)
    }

    componentDidMount() {
    	$.ajax({
				type: "get",
				url: window.location,
				success: function (data) {
						// your callback here
					console.log(data);
					//ReactDOM.render(
					//	React.createElement(DeDupeResult, { data: data }),
					//	document.getElementById('main-container')
					//);
				},
				error: function (error) {
					alert('Upload failed');
				},
				async: true,
				cache: false,
				contentType: false,
				processData: false,
				timeout: 60000
		});
    }

	render() {
		return (<h3> Baseball Statistics </h3>)		
	} 

}