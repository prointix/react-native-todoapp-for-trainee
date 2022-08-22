// TODO: Add a todo service that provides CRUD operations for todos.

import {useEffect, useState, useCallback} from 'react';

export const addTodo = async (title, subTitle) => {
  try {
    const req = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: title,
        subTitle: subTitle,
        completed: false,
      }),
    };

    await fetch('https://todos-app-server1.herokuapp.com/todos', req);
  } catch (error) {}
};

export const deleteTodo = async id => {
  try {
    await fetch(`https://todos-app-server1.herokuapp.com/todos/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {}
};

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllTodos = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://todos-app-server1.herokuapp.com/todos?_limit=15&_page=1',
      );
      const data = await response.json();
      setTodos(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }, []);

  const getMoreTodos = useCallback(async currentPage => {
    setIsLoading(true);
    console.log(currentPage);
    try {
      const response = await fetch(
        `https://todos-app-server1.herokuapp.com/todos?_limit=15&_page=${currentPage}`,
      );
      const data = await response.json();
      if (data.length > 0) {
        setTodos(prev => prev.concat(data));
      } else if (data.length === 0) {
        console.log('os hz');
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (err) {}
  }, []);

  const updateTodo = async (id, title, subTitle, completed) => {
    setIsLoading(true);
    try {
      const req = {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: title,
          subTitle: subTitle,
          completed: completed,
        }),
      };

      await fetch(`https://todos-app-server1.herokuapp.com/todos/${id}`, req);
    } catch (error) {}
    setIsLoading(false);
  };

  useEffect(() => {
    console.log('use effect');
    getAllTodos();

    return () => {};
  }, [getAllTodos]);

  // const getAllTodos = useCallback(async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await fetch(`${BASE_URL}/todos?_limit=15&_page=${page}`);
  //     const data = await res.json();

  //     setTodos(prev => prev.concat(data));
  //     setIsLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //     setError(err.message);
  //     setIsLoading(false);
  //   }
  //   setIsLoading(false);
  // }, [page]);

  return {
    todos,
    getAllTodos,
    setIsLoading,
    isLoading,
    updateTodo,
    getMoreTodos,
  };
};
