import React from 'react';

const titleElement = props => {
	return <h2 className="todo__title">{props.children}</h2>
}

export default titleElement