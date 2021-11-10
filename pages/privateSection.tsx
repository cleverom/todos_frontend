import type { NextPage } from 'next'
import { makeStyles } from '@mui/styles';
import TodoList from '../component/todoList';
import Form from '../component/todoForm';
import Header from '../component/todoHeader';
import { parseCookies } from "../services/request"

const useStyles = makeStyles({
  root: {
      textAlign: "center",
      // height: "100%"
      backgroundColor: "#050A30"
  },
  form:{
    marginTop: '1rem'
  }
});

const cookies = parseCookies()

 const Home: NextPage = () => {
  const classes = useStyles();
  return (
      <div className={classes.root}>
          <Header />
          <div className={classes.form}>
          <Form />
          </div>
          <TodoList />
      </div>
  
  )
}

export default Home


