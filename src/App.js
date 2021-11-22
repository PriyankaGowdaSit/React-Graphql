import './App.css';
import AuthContext from "./Data/auth-context";
import { useQuery, gql } from "@apollo/client";
import React, { useEffect } from 'react';
import Router from './Views/Router';
import CircularProgress from '@mui/material/CircularProgress';
function App() {

  const [buildings, setBuildings] = React.useState(undefined)
  const BUILDINGS_QUERY = gql`
  query {
      Buildings {
      name
      meetingRooms{
      id
      name
      floor
      meetings{
      title
      date
      startTime
      endTime
      }
      }
      }
      }
      
      `
      
 var { data, loading, error, fetchMore } = useQuery(BUILDINGS_QUERY);

useEffect(() =>{
   setBuildings(data)
   
},[data,buildings])
  if (loading) return <div style={{display:"flex"}}><CircularProgress color="secondary" style={{margin:"auto"}}/></div>;
  if (error) return <pre>{error.message}</pre>
  console.log(data)
  console.log(buildings)

  const updateBuildingsData = async() => {

    setTimeout(async()=>{
      const userResp = await fetchMore({
        variables: {
            // Pass any args here
        },
      })
      setBuildings([])
      data=userResp.data
      console.log(data)
    },3000)
  }
  
 
  return (
    <>
   {buildings!==undefined && data!==undefined ? (
      
    <AuthContext.Provider value={{ buildings: buildings, setBuildings: updateBuildingsData}}>

      <Router id="router"/>
    </AuthContext.Provider>
   ):(
  <></>
   )}
   </>
    


  );
}

export default App;
