import { useState } from 'react';
import { Header, SortedButtonAndFind } from './Components';
import {
	useRequestGetTodo,
	useRequestAddTodo,
	useRequestChangeTodo,
	useRequestDeleteTodo,
} from './hooks';
import { AppContext } from './context';
import { TodoList } from './Components/TodoList/TodoList';

function App() {
	const [sortByAlphabet, setSortByAlphabet] = useState(false);
	const [searchTodo, setSearchTodo] = useState('');
	const [sortedTodos, setSortedTodos] = useState([]);
	const [todoText, setTodoText] = useState('');
	const [selectedTodoId, setSelectedTodoId] = useState(null);
	const [refreshTodoFlag, setRefreshTodoFlag] = useState(false);
	const [errorParagraph, setErrorParagraph] = useState(false);

	const refreshTodo = () => setRefreshTodoFlag(!refreshTodoFlag);

	const onChange = ({ target }) => {
		setTodoText(target.value);
	};

	const sortTodos = (todosArray) =>
		[...todosArray].sort((a, b) => a.title.localeCompare(b.title));

	const filterTodos = (query, todosArray) => {
		const filteredList = todosArray.filter((todo) =>
			todo.title.toLowerCase().includes(query.toLowerCase()),
		);
		setSortedTodos(filteredList);
	};

	const toggleSortByAlphabet = () => {
		setSortByAlphabet(!sortByAlphabet);
	};

	const hundleSearhTodo = ({ target }) => {
		setSearchTodo(target.value);
	};

	const selectTodo = (id) => {
		setSelectedTodoId(id);
	};

	const { loader } = useRequestGetTodo(
		refreshTodoFlag,
		sortByAlphabet,
		searchTodo,
		sortTodos,
		filterTodos,
		sortedTodos,
		setSortedTodos,
	);

	const { requestAddTodo, isCreating } = useRequestAddTodo(
		setErrorParagraph,
		todoText,
		refreshTodo,
		setTodoText,
	);

	const { requestChangeTodo, isUpdating } = useRequestChangeTodo(
		setErrorParagraph,
		todoText,
		selectedTodoId,
		refreshTodo,
		setTodoText,
		setSelectedTodoId,
	);

	const { requestDeleteTodo, isDeleting } = useRequestDeleteTodo(
		refreshTodo,
		setSelectedTodoId,
		selectedTodoId,
	);

	const contextValue = {
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
		toggleSortByAlphabet,
		sortByAlphabet,
		searchTodo,
		hundleSearhTodo,
		loader,
		sortedTodos,
		selectTodo,
	};

	return (
		<AppContext.Provider value={contextValue}>
			<Header />
			<SortedButtonAndFind />
			<TodoList />
		</AppContext.Provider>
	);
}

export default App;
