import React from 'react';
import './Todo.css';
//...Components
import TitleElement from './components/TitleElement';
import SortElement from './components/SortElement';
import MenuElement from './components/MenuElement';
import ControlsElement from './components/ControlsElement';
//...Helper Functions
import {sortTasks, isTasksSorted} from './helper-functions/tasksSort';

class Todo extends React.Component {

	constructor() {
		super();

		const tasks = JSON.parse(localStorage.getItem('tasks'));
		this.state = {
			tasks: tasks == null ? [] : tasks
		}
	}

	//.............Manipulating Methods

	addTask = () => {
		const title = prompt('Enter title');
		if (title === null) return;

		const dateNow = new Date();
		const exampleDate = `${dateNow.getMonth() + 1}-${dateNow.getDate()}-${dateNow.getFullYear()}`;
		const date = Date.parse(prompt(`Enter date in format month-day-year(${exampleDate})`));
		if (isNaN(date)){
			alert('INCORRECT DATE');
			return;
		}

		const newTask = {
			title: title,
			date: date,
			completed: false,
			uploadDate: Date.now()
		}

		const newTaskIndex = prompt('Insert new task before...') - 1;

		const newState = Object.assign({}, this.state);
		newState.tasks.splice(newTaskIndex, 0, newTask);

		this.setState(newState);
	}

	removeTasks = (indexes) => {
		let newTasks = [];
		if (Array.isArray(indexes)){
			newTasks = this.state.tasks.filter((val, i) => {
				return !(indexes.indexOf(i) + 1);
			});
		} else if (typeof indexes === 'number' || typeof indexes === 'string') {
			const index = indexes;
			newTasks = Object.assign([], this.state.tasks);
			newTasks.splice(index, 1);
		}
		this.setState({tasks: newTasks});
	}

	moveTask = (i, to) => {
		const newTasks = Object.assign([], this.state.tasks);
		newTasks.splice(to, 0, newTasks.splice(i, 1)[0]);
		this.setState({tasks: newTasks});
	}

	renameTask = (i) => {
		const newTitle = prompt('Enter new title');
		if (newTitle === null) return;

		const newTasks = Object.assign([], this.state.tasks);
		newTasks[i].title = newTitle;
		this.setState({
			tasks: newTasks
		})
	}

	completeTask = (i) => {
		const newTasks = Object.assign([], this.state.tasks);
		newTasks[i].completed = !newTasks[i].completed;
		this.setState({
			tasks: newTasks
		})
	}

	sortTasks = (by) => {
		if (by === this._sortState) return;

		const newTasks = Object.assign([], this.state.tasks);

		sortTasks(newTasks, by);
		
		this.setState({
			tasks: newTasks
		})
	}

	saveTasks = () => {
		localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
	}

	render() {
		return (
			<div className="todo">
				<TitleElement>Todo List</TitleElement>
				<SortElement
					onSort={this.sortTasks}
					isSorted={isTasksSorted(this.state.tasks)}
				/>
				<MenuElement
					tasks={this.state.tasks}
					onTaskRename={this.renameTask}
					onTaskComplete={this.completeTask}
					onTaskRemove={this.removeTasks}
					onTaskMove={this.moveTask}
				/>
				<ControlsElement
					onAddTask={this.addTask}
					onRemoveTasks={this.removeTasks}
					onSaveTasks={this.saveTasks}
				/>
			</div>
		);
	}
}

export default Todo;