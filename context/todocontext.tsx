import React, {createContext} from 'react';


interface dataType {
    todo: string,
    dueDate: string,
    id: string,
    done: boolean,
    dateCreated: string
}
interface ITodoContextInterface {
    data: dataType[],
    getTodoData: (data: dataType) => void
}

const TodoContext = createContext<ITodoContextInterface | any>(null)

export default TodoContext;