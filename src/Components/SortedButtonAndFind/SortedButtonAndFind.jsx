import { useContext } from 'react';
import styles from '../../App.module.css';
import { AppContext } from '../../context';

export const SortedButtonAndFind = () => {
	const { toggleSortByAlphabet, sortByAlphabet, searchTodo, hundleSearhTodo } =
		useContext(AppContext);

	return (
		<div>
			<div className={styles.sortButton}>
				<button onClick={toggleSortByAlphabet}>
					{sortByAlphabet ? 'Отключить сортировку' : 'Включить сортировку'}
				</button>
			</div>

			<input
				type="text"
				placeholder="Поиск дела"
				value={searchTodo}
				onChange={hundleSearhTodo}
			/>
		</div>
	);
};
