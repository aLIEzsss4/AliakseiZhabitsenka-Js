import React from 'react';

const controlsElement = props => {
	return (
		<div className="todo__controls">
			<button onClick={props.onAddTask} className="todo__control-btn todo-btn">add task</button>
			<button onClick={props.onRemoveTasks} className="todo__control-btn todo-btn">delete all</button>
			<button onClick={props.onSaveTasks} className="todo__control-btn todo-btn">save</button>
		</div>
	);
}

export default controlsElement