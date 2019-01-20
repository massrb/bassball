
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom'
import Pagination from "react-js-pagination";


class HdrRows extends React.Component {

	 constructor(props) {
		super(props);
		this.clickHandler = this.clickHandler.bind(this);
		this.getIndicator = this.getIndicator.bind(this);
		// this.componentDidMount = this.componentDidMount.bind(this);
	 }

	clickHandler(e) {
		var fld = e.target.parentNode.dataset.fld;
		this.props.selectRow(fld);
	}

	componentDidMount() {
		console.log('add indicator', this.props.field);
		addRowIndicator(this.props.field);
	}

	getIndicator() {
		if (this.props.dir == 'asc') {
			return(<i className={'fa fa-angle-up'}></i>)
		} else {	
			return(<i className={'fa fa-angle-down'}></i>)			
		}
	}

	render() {
		var clickHandler = this.clickHandler;

		 var fields = ['AVG', 'Hits', 'Runs',
		 'RBI','Steals', 'OPS'];
		 var rows = [];
		 var that = this;
 
		 rows.push(fields.map((fld,ky) => {
		  var typ = fld.toLowerCase();
		  var kl = typ + '-indicator col-indicator';
		  var indicator = null;
		  if (typ == this.props.field) {
			indicator = that.getIndicator();
		  }
		  return(<th key={ky} data-fld={typ} onClick={clickHandler}>
				<span className={kl}>{indicator}</span>
				<a>{fld}</a></th>)
		 }))

		return(<tr>
			<th>ID</th>
			<th>Name</th>
			<th>Position</th>
			{rows}
		</tr>)
	}
}


const Row = (props) => {
  var name = `${props.row.given_name} ${props.row.surname}`;

  return(
  <tr key={props.ky}>
	  <td>{props.row.id}</td>
	 <td>{name}</td>
	 <td>{props.row.position}</td>
	 <td>{props.row.avg}</td>
	 <td>{props.row.hits}</td>
	 <td>{props.row.runs}</td>
	 <td>{props.row.rbi}</td>
	 <td>{props.row.steals}</td>
	 <td>{props.row.ops}</td>
  </tr>)

}	



class StatsResult extends React.Component {

  constructor(props) {
	super(props);
	this.state = {activePage: props.page};
	console.log('in ctor, page:', props.page)
	this.handlePageChange = this.handlePageChange.bind(this);
  }


  handlePageChange(pageNumber) {
	 console.log(`active page is ${pageNumber}`);
	 // this.setState({activePage: pageNumber});
	 if (this.state.activePage != pageNumber) {
		this.props.selectRow(this.props.field, pageNumber);
		this.setState({activePage: pageNumber});
	 }
  }

  componentDidMount() {
	console.log('StatsResult mounted');
  }

  render() {
	  var rows = [];

	  rows.push(this.props.rows.map((row, ky) => {
		  return(<Row key={ky} ky={ky} row={row} />)
	  }))

	  console.log('return render StatsResult page', this.state.activePage);
	  return(
			<div>
				<Pagination
				 activePage={this.state.activePage}
				 itemsCountPerPage={25}
				 totalItemsCount={this.props.rec_count}
				 pageRangeDisplayed={5}
				 onChange={this.handlePageChange}
			  />
				<table className={"table table-striped"}>
					<tbody>
					  <HdrRows dir={this.props.dir} field={this.props.field} 
					  selectRow={this.props.selectRow}/>
					  {rows}
					</tbody>
				</table>
			</div>
		)
	}

}

export default class BaseBallStats extends React.Component {

	constructor(props) {
		super(props)
		this.selectRow = this.selectRow.bind(this);
		this.renderRow = this.renderRow.bind(this);
		this.page = 1;
		this.field = 'avg';
		this.dir = 'desc';
	 }

	 selectRow(fld, page=null) {
		// console.log('select row field/page', fld, page);
		this.renderRow(fld, page);
	 }


	 renderRow(fld, page) {
		var that = this;
		var field = fld || this.field;
		console.log('renderRow', fld, page);
		console.log(this.field, this.page);
		if (!fld && !page) {

		}
		else if (field == this.field && (page == this.page || !page)) {
			// console.log('same field and page')
			if (this.dir == 'desc') {
				this.dir = 'asc';
			} else {
				this.dir = 'desc';
			}
		} else if (fld != this.field) {
			// console.log('reset page');
			this.page = 1;
			this.dir = 'desc';	
		} else if (page != this.page) {
			this.page = page || 1;
		} else {
			this.dir = 'desc';
		}
		
		this.field = field;
		var data = {field: field};

		console.log('render row', data);
		var url = `${window.location}?fld=${field}&dir=${this.dir}&pg=${this.page}`;
		console.log('url:', url);
		// ReactDOM.unmountComponentAtNode(document.getElementById('main-container'));
		$.ajax({
			type: "get",
			url: url,
			success: function (result) {
				console.log(result);
				ReactDOM.render(
					React.createElement(StatsResult, 
					 { selectRow: that.selectRow, field: field, 
						dir: that.dir,
						page: that.page,
						rec_count: result.rec_count, 
						rows: result.data }),
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
		return (
			<div className={'baseball-stats'}>
			</div>)		
	} 

}

// This is declared outside the class and at the bottom
// because the string manipulation wrecks the color
// coding in the IDE editor

function addRowIndicator(indicator) {

	//var cl = `${indicator}-indicator`;
	//var html = "<i class='fal fa-angle-down'></i>";
	//$(`.${cl}`).html(html);

}