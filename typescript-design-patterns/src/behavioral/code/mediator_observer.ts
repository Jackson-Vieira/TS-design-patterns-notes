// Desafio 1: Um sistema de leilão, onde um usuário envia ofertas em um determinado quarto (Room/Group) e esse mediator precisa notificar os outros usuarios que esse lance foi feito.

interface Participant {
  name: string;
  bid: number;
  auctionMediator: AuctionMediator;
  notify(message: MessageNotify): void;
}

interface MessageNotify {
  participant: Participant;
  message: string;
}

class AuctionMediator {
  private participants: Array<Participant> = [];
  
  constructor() {}

  register(participant: Participant) {
    this.participants.push(participant);
    participant.auctionMediator = this;
  }

  placeBid(participant: Participant, bid: number): void {
    participant.bid = bid;
    this.notifyParticipants({
      participant: participant,
      message: `${participant.name} placed a bid of $${bid}`,
    });
  }

  notifyParticipants(message: MessageNotify) {
    /* this.participants.forEach(
      (participant) =>
        message.participant != participant && participant.notify(message)
    ); */
    this.participants.forEach((participant) => participant.notify(message));
  }
}

class ParticipantImpl implements Participant {
  name: string;
  bid: number = 0;
  auctionMediator: AuctionMediator;

  constructor(name: string, mediator: AuctionMediator) {
    this.name = name;
    this.auctionMediator = mediator;
    this.auctionMediator.register(this);
  }

  notify(m: MessageNotify) {
    console.log(`${this.name} see -> ${m.message}`);
  }

  placeBid(bid: number): void {
    this.auctionMediator.placeBid(this, bid);
  }
}

// Client code
function runAuction(): void {
  const mediator = new AuctionMediator();
  const participant1 = new ParticipantImpl("Jhon", mediator);
  const participant2 = new ParticipantImpl("Bob", mediator);
  const participant3 = new ParticipantImpl("Jack", mediator);

  setInterval(() => {
    participant1.placeBid(Math.floor(Math.random() * 100));
    participant2.placeBid(Math.floor(Math.random() * 100));
    participant3.placeBid(Math.floor(Math.random() * 100));
  }, 1000);
}

runAuction();
