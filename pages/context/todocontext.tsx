import React, {createContext} from 'react';

interface ITodoContextInterface {
    data: Record<string, never>[],
    getTodoData: any
}

const TodoContext = createContext<ITodoContextInterface | null>(null)

export default TodoContext;