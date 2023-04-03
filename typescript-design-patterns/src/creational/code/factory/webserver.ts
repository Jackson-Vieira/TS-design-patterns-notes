import { Webserver } from "./interfaces"

export default function createWebserver() : Webserver {
  
  function start(){
    console.log('Starting the webserver...')
  }

  function stop(){
    console.log('Stopping the webserver...')
  }

  return {
    start,
    stop
  }
}