import Todo from './index'
import { makeStyles } from '@mui/styles';
import CreateTransactionState from './context/todoState'

const useStyles = makeStyles({
  body:{
    backgroundColor: "red"
  }

})

function MyApp() {

  const classes = useStyles()

  return (
    <CreateTransactionState>

    <div className={classes.body}>
      <Todo />
    </div>
    </CreateTransactionState>
  )
}

export default MyApp
