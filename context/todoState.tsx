import TodoContext from './todocontext'
import { reducer } from './todoReducer';
import { useReducer } from 'react';
import { GET_TODO} from './types';
import { getTodo } from '../services/request'


interface Props {
    
    children: React.ReactNode
    
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

            } catch (err: unknown) {
                return err
            }

        };


  

    return (
        <TodoContext.Provider value={{ data: state.data, getTodoData }}>
            {props.children}
        </TodoContext.Provider>
    );
};

export default CreateTransactionState;