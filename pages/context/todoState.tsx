import TodoContext from './todocontext'
import { reducer } from './todoReducer';
import { useReducer, useEffect } from 'react';
import { GET_TODO, UPDATE_TODO } from './types';
import { getTodo } from '../services/request'


interface Props {
    error: Error
    children: React.ReactNode
    value: string | number | Error
  }

const CreateTransactionState = (props: Props) => {
    const initialState = {
        data: [],
    };
    const [state, dispatch] = useReducer(reducer, initialState);


        const getTodoData = async () => {
            try {

                const response = await getTodo('api/data')
                const data = response?.data
                console.log(response, data)

                dispatch({
                    type: GET_TODO,
                    payload: data,
                });

            } catch (error) {
                console.log(error.message);
            }

        };


  

    return (
        <TodoContext.Provider value={{ data: state.data, getTodoData }}>
            {props.children}
        </TodoContext.Provider>
    );
};

export default CreateTransactionState;