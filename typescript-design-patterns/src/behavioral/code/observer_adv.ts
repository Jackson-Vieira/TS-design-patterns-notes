// Desafio: Permitir que o objeto do editor de texto notifique outros objetos de serviço sobre mudanças em seu estado.

// link: https://refactoring.guru/images/patterns/diagrams/observer/example.png

type EventType = 'change' | 'save';

interface Observer {
  update(event: EventType, data: any): void;
}

class EventManager{
  // hash map of event types and listeners
  subscribers: Map<EventType, Observer[]> = new Map();

  // subscribe to an event
  subscribe(event: EventType, observer: Observer) {
    const observers = this.subscribers.get(event) || [];
    observers.push(observer);
    this.subscribers.set(event, observers);
  }

  // unsubscribe from an event
  unsubscribe(event: EventType, observer: Observer) {
    const observers = this.subscribers.get(event);
    if (!observers) return;
    const index = observers.findIndex(obs => obs === observer);
    if (index === -1) return;
    observers.splice(index, 1);
  }

  // notify all subscribers about an event
  notify(event: EventType, data: any) {
    const observers = this.subscribers.get(event);
    if (!observers) return;
    observers.forEach(observer => observer.update(event, data));
  }
}

class Editor {
  public eventManager: EventManager;

  constructor(eventManager: EventManager) {
    this.eventManager = eventManager;
  }

  // editor methods
  type(fileName: string) {
    this.eventManager.notify('change', fileName);
  }

  save(fileName: string) {
    this.eventManager.notify('save', fileName);
  }

  someBussinessLogic() {
    this.type('file.txt');
    this.save('file.txt');
  }
}


class EmailAlertListerner implements Observer {

  private email: string;
  private message: string;

  constructor(email: string, message: string) {
    this.email = email;
    this.message = message;
  }

  update(event: EventType, data: any) {
    console.log(this.email, this.message);
  }
}

class LoggerListerner implements Observer {

  update(event: EventType, data: any) {
    console.log(`Logger: ${event} - ${data}`);
  }
}

// An application can configure publishers and subscribers at
// runtime.

const editor = new Editor(new EventManager());

const emailAlertListerner = new EmailAlertListerner(
  "admin@cep.com",
  "Alerta de mudança de arquivo"
);

const loggerListerner = new LoggerListerner();

editor.eventManager.subscribe('change', emailAlertListerner);
editor.someBussinessLogic();
editor.eventManager.subscribe('save', loggerListerner);
editor.someBussinessLogic();
editor.someBussinessLogic();