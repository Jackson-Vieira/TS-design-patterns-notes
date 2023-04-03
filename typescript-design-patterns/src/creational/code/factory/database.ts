import { Database } from "./interfaces"

export default function createDatabase() : Database {
  
  function start(){
    console.log('Starting the database...')
  }

  function stop(){
    console.log('Stopping the database...')
  }

  return {
    start,
    stop
  }
}