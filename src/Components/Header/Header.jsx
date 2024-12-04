import { useContext } from 'react';
import { AppContext } from '../../context';

import styles from '../../App.module.css';

export const Header = () => {
	const {
		errorParagraph,
		todoText,
		onChange,
		requestAddTodo,
		isCreating,
		requestChangeTodo,
		isUpdating,
		requestDeleteTodo,
		selectedTodoId,
		isDeleting,
	} = useContext(AppContext);

	return (
		<div>
			<h1>Todo list</h1>
			{errorParagraph ? (
				<p style={{ color: 'red' }}>Поле не должно быть пустым</p>
			) : (
				''
			)}
			<input
				type="text"
				name="text"
				value={todoText}
				placeholder="Введите название дела"
				onChange={onChange}
			/>
			<div className={styles.crud}>
				<button onClick={requestAddTodo} disabled={isCreating}>
					Добавить дело
				</button>
				<button onClick={requestChangeTodo} disabled={isUpdating}>
					Изменить дело
				</button>
				<button
					onClick={requestDeleteTodo}
					disabled={!selectedTodoId || isDeleting}
				>
					Удалить дело
				</button>
			</div>
		</div>
	);
};
