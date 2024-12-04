import { useContext } from 'react';
import styles from '../../App.module.css';
import { AppContext } from '../../context';

export const TodoList = () => {
	const { loader, sortedTodos, selectTodo, selectedTodoId } = useContext(AppContext);

	return (
		<div className={styles.app}>
			<ol>
				{loader ? (
					<div className={styles.loader}></div>
				) : (
					sortedTodos.map((todo, index) => (
						<li
							key={todo.id}
							onClick={() => selectTodo(todo.id)}
							style={{
								background: selectedTodoId === todo.id ? 'white' : '',
								color: selectedTodoId === todo.id ? 'black' : '',
							}}
						>
							<span>{index + 1}.</span>
							{todo.title}
						</li>
					))
				)}
			</ol>
		</div>
	);
};
