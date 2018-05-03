import React from 'react';

const sortElement = props => {
	let sortBtnClass = "todo__sort-btn todo-btn";
	let uploadSortBtnClass = "";
	let titleSortBtnClass = "";
	let dateSortBtnClass = "";
	if (props.isSorted){
		if (props.isSorted.indexOf("upload") !== -1) uploadSortBtnClass = " todo__sort-btn_active";
		if (props.isSorted.indexOf("title") !== -1) titleSortBtnClass = " todo__sort-btn_active";
		if (props.isSorted.indexOf("date") !== -1) dateSortBtnClass = " todo__sort-btn_active";
	}

	return (
		<div className="todo__sort">
			<span>Sort by: </span>
			<div className="todo__sort-btns">
				<button onClick={props.onSort.bind(null, "upload")} className={sortBtnClass + uploadSortBtnClass}>upload date</button>
				<button onClick={props.onSort.bind(null, "title")} className={sortBtnClass + titleSortBtnClass}>title</button>
				<button onClick={props.onSort.bind(null, "date")} className={sortBtnClass + dateSortBtnClass}>date</button>
			</div>
		</div>
	);
}

export default sortElement