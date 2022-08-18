// TODO: Add a todo service that provides CRUD operations for todos.

import {useCallback, useEffect, useState} from 'react';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const useTodos = p => {
  const [page, setPage] = useState(p);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllTodos = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/todos?_limit=20&_page=${page}`);
      const data = await res.json();

      setTodos(prev => prev.concat(data));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
      setIsLoading(false);
    }
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    getAllTodos();
  }, [getAllTodos]);

  return {todos, error, isLoading, page, setPage};
};
