import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom'
// import DeDupeResult from './DeDupeResult';

export default class UploadXml extends React.Component {

	constructor(props) {
		console.log('upload csv ctor');
		super(props);
		this.showDialog = this.showDialog.bind(this);
		this.uploadFile = this.uploadFile.bind(this);
		// How to set initial state in ES6 class syntax
		// https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class
		this.state = { show_link: true };
	}

	showDialog() {
		this.setState({show_link: false})
	}

	uploadFile() {
		var fpath = $('.xml-upload-element').val(); 
		if (fpath) {
			var data = new FormData();

			data.append( 'xml_file', $( '.xml-upload-element')[0].files[0]);
		// add assoc key values, this will be posts values
			console.log(fpath);
			console.log('ajax post');
			$.ajax({
				type: "POST",
				url: "/main/upload_xml",
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
				data: data,
				cache: false,
				contentType: false,
				processData: false,
				timeout: 60000
		});
		} else
		{
			alert('no file choosen');
		}
	}


	render() {
		if(this.state.show_link) {
		return(
			<li className="xml-upload-element">  
					<a onClick={this.showDialog}>Upload XML file</a>
			</li>
			)
	} else {
			 return(
				<span>
					<input className={'xml-upload-element'} type="file" id="file" ref="fileUploader"/>
					<input className={'xml-upload-button'} type="button" value="Upload" onClick={this.uploadFile}/>
				</span>
			 )
		}
	}

}