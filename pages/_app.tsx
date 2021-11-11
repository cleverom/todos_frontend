import { makeStyles } from '@mui/styles';
import CreateTodoState from '../context/todoState'
import { CookiesProvider } from "react-cookie"

import { AppProps } from 'next/app';


const useStyles = makeStyles({
  body:{
   
  }

})

function MyApp({Component, pageProps}: AppProps) {

  const classes = useStyles()


  return (
    <CookiesProvider>

    <CreateTodoState error={undefined}  value={''}>

    <div className={classes.body}>
     <Component {...pageProps} />
    </div>
    </CreateTodoState>
    </CookiesProvider>
  )
}

export default MyApp
