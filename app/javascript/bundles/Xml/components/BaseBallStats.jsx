
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom'
// import DeDupeResult from './DeDupeResult';

const HdrRows = (props) => {
	function clickHandler(e) {
		var fld = e.target.dataset.fld;
		console.log('click handler', fld);
		props.selectRow(fld);
	}

	return(<tr>
		<th>Name</th>
		<th>Position</th>
		<th data-fld='avg' onClick={clickHandler}>AVG</th>
		<th data-fld='hits' onClick={clickHandler}>Hits</th>
		<th data-fld='runs' onClick={clickHandler}>Runs</th>
		<th data-fld='rbi' onClick={clickHandler}>RBI</th>
		<th data-fld='at_bats' onClick={clickHandler}>at bats</th>
		<th data-fld='steals' onClick={clickHandler}>Steals</th>
		<th data-fld='ops' onClick={clickHandler}>OPS</th>
	</tr>)
}


const Row = (props) => {
  var name = `${props.row.given_name} ${props.row.surname}`;

  return(
  <tr key={props.ky}>
	 <td>{name}</td>
	 <td>{props.row.position}</td>
	 <td>{props.row.avg}</td>
	 <td>{props.row.hits}</td>
	 <td>{props.row.runs}</td>
	 <td>{props.row.rbi}</td>
	 <td>{props.row.at_bats}</td>
	 <td>{props.row.steals}</td>
	 <td>{props.row.ops}</td>
  </tr>)

}	


const StatsResult = (props) => {

  var rows = [];

  rows.push(props.rows.map((row, ky) => {
	  return(<Row key={ky} ky={ky} row={row} />)
  }))

  return(
		<table className={"table table-striped"}>
			<tbody>
			  <HdrRows selectRow={props.selectRow}/>
			  {rows}
			</tbody>
		</table>
  	)

}

export default class BaseBallStats extends React.Component {

	constructor(props) {
		super(props)
		this.selectRow = this.selectRow.bind(this);
		this.renderRow = this.renderRow.bind(this);
    }

    selectRow(fld) {
    	console.log('select row');
    	console.log(fld);
    	this.renderRow(fld);
    }

    renderRow(fld='hits') {
    	var that = this;
    	var data = {field: fld};
    	console.log('render row', data);
    	var url = `${window.location}?field=${fld}`;
    	console.log('url:', url);
		$.ajax({
			type: "get",
			url: url,
			success: function (data) {
					// your callback here
				console.log(data);
				ReactDOM.render(
					React.createElement(StatsResult, 
					 { selectRow: that.selectRow, rows: data }),
					document.getElementById('main-container')
				);
			},
			error: function (error) {
				alert('Upload failed');
			},
			async: true,
			cache: false,
			// data: data,
			contentType: false,
			processData: false,
			timeout: 60000
		});
    }

    componentDidMount() {
    	this.renderRow()
    }

	render() {
		return (<h3> Baseball Statistics </h3>)		
	} 

}