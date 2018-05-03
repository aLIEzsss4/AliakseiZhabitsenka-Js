import React, {Component} from 'react';
import getUniqueId from './../helper-functions/getUniqueId';


const calculateDropTarget = (e, tasksLength) => {
	const taskPercent = 1/tasksLength;
	const dropPercent = (e.pageY - e.currentTarget.getBoundingClientRect().top)/e.currentTarget.offsetHeight;
	const to = Math.ceil(dropPercent/taskPercent) - 1;
	return to;
}


class menuElement extends Component {
	onDragStart = (e, i) => {
		e.dataTransfer.setData('text', i);
		e.currentTarget.style.cursor = 'grabbing'
	}

	allowDrop = e => {
		e.preventDefault();
	}

	onDrop = e => {
		e.preventDefault();
		const i = e.dataTransfer.getData('text');
		const to = calculateDropTarget(e, this.props.tasks.length);

		this.props.onTaskMove(i, to);
	}

	render() {
		let tasksElements;
		if (this.props.tasks.length < 1){
			tasksElements = <div className="todo__no-tasks">No tasks are found...</div>
		} else {
			tasksElements = this.props.tasks.map((task, i) => {
				let indexClass = 'todo__task-index';
				let contentClass = 'todo__task-content';
				let titleClass = 'todo_task-title';
				let dateClass = 'todo__task-date';
				let completeBtnClass = 'todo__task-complete-btn todo__task-btn todo-btn';
				if (task.completed){
					indexClass += ' todo__task-index_completed';
					contentClass += ' todo__task-content_completed';
					titleClass += ' todo_task-title_completed'
					completeBtnClass += ' todo__task-complete-btn_completed';
				} else if (task.date < Date.now()){
					dateClass += ' todo__task-date_overdue';
				}
				return (
					<li onDragStart={e => this.onDragStart(e, i)} draggable className="todo__task" key={getUniqueId()}>
						<div className={indexClass}>{i+1}</div>
						<div className={contentClass}>
							<span className={titleClass}>{task.title}</span>
							<span className={dateClass}>{(new Date(task.date)).toLocaleDateString()}</span>
						</div>
						<div className="todo__task-controls">
							<button onClick={this.props.onTaskRename.bind(null, i)} className="todo__task-rename-btn todo__task-btn todo-btn">rename</button>
							<button onClick={this.props.onTaskComplete.bind(null, i)} className={completeBtnClass}>{task.completed ? 'reassign' : 'complete'}</button>
							<button onClick={this.props.onTaskRemove.bind(null, i)} className="todo__task-delete-btn todo__task-btn todo-btn">delete</button>
						</div>
					</li>
				);
			});
		}
		return (
			<div className="todo__menu">
				<ul onDrop={this.onDrop} onDragOver={this.allowDrop}>
					{tasksElements}
				</ul>
			</div>
		);
	}
}

export default menuElement