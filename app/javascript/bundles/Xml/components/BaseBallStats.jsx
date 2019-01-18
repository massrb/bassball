
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom'
// import DeDupeResult from './DeDupeResult';


class HdrRows extends React.Component {

    constructor(props) {
    	super(props);
    	this.clickHandler = this.clickHandler.bind(this);
    	this.getIndicator = this.getIndicator.bind(this);
    	// this.componentDidMount = this.componentDidMount.bind(this);
    }

	clickHandler(e) {
		var fld = e.target.parentNode.dataset.fld;
		console.log("target:", e.target);
		console.log('click handler', fld);
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
   	console.log('render HdrRows');
   	var clickHandler = this.clickHandler;

   	 var fields = ['AVG', 'Hits', 'Runs',
   	 'RBI','at_bats','Steals', 'OPS'];
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
	 <td>{props.row.at_bats}</td>
	 <td>{props.row.steals}</td>
	 <td>{props.row.ops}</td>
  </tr>)

}	


class StatsResult extends React.Component {

  constructor(props) {
  	super(props)
  }

  componentDidMount() {
  	console.log('StatsResult mounted');
  }

  render() {
	  var rows = [];

	  rows.push(this.props.rows.map((row, ky) => {
		  return(<Row key={ky} ky={ky} row={row} />)
	  }))

	  console.log('return render StatsResult')
	  return(
			<table className={"table table-striped"}>
				<tbody>
				  <HdrRows dir={this.props.dir} field={this.props.field} 
				  selectRow={this.props.selectRow}/>
				  {rows}
				</tbody>
			</table>
	  	)
	}

}

export default class BaseBallStats extends React.Component {

	constructor(props) {
		super(props)
		this.selectRow = this.selectRow.bind(this);
		this.renderRow = this.renderRow.bind(this);
		this.field = 'hits';
		this.dir = 'desc';
    }

    selectRow(fld) {
    	console.log('select row');
    	console.log(fld);
    	this.renderRow(fld);
    }


    renderRow(fld) {
    	var that = this;
    	var field = fld || this.field;
    	if (field == this.field) {
    		if (this.dir == 'desc') {
    			this.dir = 'asc';
    		} else
    		{
    			this.dir = 'desc';
    		}
    	} else {
    		this.dir = 'desc';
    	}
    	
    	this.field = field;
    	var data = {field: field};

    	console.log('render row', data);
    	var url = `${window.location}?field=${field}&dir=${this.dir}`;
    	console.log('url:', url);
		$.ajax({
			type: "get",
			url: url,
			success: function (data) {
					// your callback here
				console.log(data);
				ReactDOM.render(
					React.createElement(StatsResult, 
					 { selectRow: that.selectRow, field: field, 
					 	dir: that.dir,
					   rows: data }),
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
		return (<div className={'baseball-stats'}></div>)		
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