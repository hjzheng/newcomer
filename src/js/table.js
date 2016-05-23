/*
* 一个简单的table练习
* */

(function (w) {

	function Table(options) {
		this.domEle = document.getElementById(options.domId);
		this.options = options;
		this.init();
	}

	Table.prototype.init = function() {
		this.domEle.style = this.options.style;
		this.domEle.appendChild(this.buildHtml());
	};

	Table.prototype.buildHtml = function() {
		var tableEle = document.createElement('table');
		tableEle.className = 'table';
		var theadEle = _buildHtmlTableHeader(this.options);
		var tbodyEle = _buildHtmlTableBody(this.options);
		tableEle.appendChild(theadEle);
		tableEle.appendChild(tbodyEle);

		return tableEle;
	};

	function _buildHtmlTableHeader(options) {
		var theadEle = document.createElement('thead');
		var rowEle = _buildHtmlRow(options.columns);
		theadEle.appendChild(rowEle);
		return theadEle;
	}

	function _buildHtmlTableBody(options) {
		var tbodyEle = document.createElement('tbody');
		for(var i=0; i<options.data.length; i++) {
			var rowEle = _buildHtmlRow(options.columns, options.data[i]);
			tbodyEle.appendChild(rowEle);
		}
		return tbodyEle;
	}

	function _buildHtmlRow(columns, data) {
		var trEle = document.createElement('tr');
		for(var i=0; i < columns.length; i++) {
			var tdEle = document.createElement('td');
			tdEle.innerHTML = data ? data[columns[i].key] : columns[i].label;
			trEle.appendChild(tdEle);
		}
		return trEle;
	}

	w.Table = Table;

})(window);