import React, {createContext} from 'react';


interface dataType {
    todo: string,
    dueDate: string
}
interface ITodoContextInterface {
    data: dataType,
    getTodoData: Object
}

const TodoContext = createContext<ITodoContextInterface | null>(null)

export default TodoContext;