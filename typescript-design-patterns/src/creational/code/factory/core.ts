import { Database, Webserver } from "./interfaces"

export default function createCore(db: Database, ws: Webserver){
  const database = db;
  const webserver = ws;
  
  function start(){
    console.log('Starting the core...')
    database.start()
    webserver.start()  
    console.log('Core started.')
  }

  function stop(){
    console.log('Stopping the core...')
    webserver.stop()
    database.stop()
    console.log('Core stopped.')
  }

  return {
    start,
    stop
  }
}