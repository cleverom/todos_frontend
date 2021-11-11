import type { NextPage } from 'next'
import { makeStyles } from '@mui/styles';
import PrivateSection from './privateSection'
import Login from './todoLogin'
import {parseCookies} from '../services/request'

const useStyles = makeStyles({
  root: {
      textAlign: "center",
      backgroundColor: "#050A30"
  },
  form:{
    marginTop: '1rem'
  }
});




 const Home: NextPage = () => {
  const cookies = parseCookies();
  const cookie = cookies?.user;
  console.log(cookie, cookies);
  
  if (!cookie) {
    return <Login />;
  }
  const classes = useStyles();
  return (
      <div className={classes.root}>
          <PrivateSection />
      </div>
  
  )
}

export default Home


