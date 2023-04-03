// Video de Apoio: https://www.youtube.com/watch?v=uyOJ2jjBtBs - Felipe Deschamps

import createCore from "./core";

function createMock(){
  let isStarted = false;
  let isStopped = false;

  return {
    start: () => {
      if(isStarted) throw new Error('Mock already started.');
      isStarted = true;
    },
    stop: () => {
      if(isStopped) throw new Error('Mock already stopped.');
      isStopped = true;
    }
  }
}

const core = createCore(createMock(), createMock());

try {
  core.start();  
  core.stop();
} catch(e) {
  console.log(e)
}