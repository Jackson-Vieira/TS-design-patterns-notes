# Mediator 

Mediator é um padrão de projeto comportamental que permite que você reduza as dependências complexas entre objetos. O padrão Mediator promove o acoplamento fraco ao evitar que os objetos se refiram uns aos outros explicitamente, Em vez disso, os objetos enviam notificações uns aos outros através de um objeto mediador.

## Problem

Imagine que você tem muitos componentes que precisam se comunicar entre si, mas não quer que eles dependam uns dos outros. Nesse caso, a solução mais simples seria introduzir um objeto hub global com o qual todos os componentes se comunicariam. Esse objeto atuaria como um mediador entre os componentes, retransmitindo solicitações e passando respostas de um lado para o outro. Essa abordagem funciona, mas tem algumas desvantagens sérias:

- É difícil implementar tal objeto hub de uma forma que seja reutilizável e flexível o suficiente para ser usado em diferentes cenários.

- É difícil fazer o objeto hub seguir o Princípio da Responsabilidade Única. Ele inevitavelmente acabará com muitas responsabilidades diferentes, tornando-o difícil de reutilizar e de manter.

- O objeto hub se tornará um objeto global, dificultando o teste dos componentes que o utilizam.

## Solução

O padrão Mediator sugere que você deve evitar acoplar o remetente de uma solicitação ao seu receptor, dando a mais de um objeto a chance de lidar com a solicitação. Dito de outra forma, os objetos que enviam solicitações não devem ser forçados a saber quais objetos devem tratá-los. Em vez disso, você deve dar a mais de um objeto a chance de lidar com uma solicitação.

O padrão Mediador sugere que você extraia toda a lógica de comunicação em um objeto Mediador separado. Os objetos enviarão solicitações ao Mediador em vez de enviá-los diretamente uns aos outros. O Mediador cuidará de toda a comunicação e roteamento entre os objetos.

## Estrutura

![Mediator Structure](https://refactoring.guru/images/patterns/diagrams/mediator/structure.png)

## Example

```typescript
interface Mediator {
  notify(sender: object, event: string): void
}

class ConcreteMediator implements Mediator {
  private component1: Component1
  private component2: Component2

  constructor(c1: Component1, c2: Component2) {
    this.component1 = c1
    this.component1.setMediator(this)
    this.component2 = c2
    this.component2.setMediator(this)
  }

  public notify(sender: object, event: string): void {
    if (event === 'A') {
      console.log('Mediator reacts on A and triggers following operations:')
      this.component2.doC()
    }

    if (event === 'D') {
      console.log('Mediator reacts on D and triggers following operations:')
      this.component1.doB()
      this.component2.doC()
    }
  }
}

class BaseComponent {
  protected mediator: Mediator

  constructor(mediator: Mediator = null) {
    this.mediator = mediator
  }

  public setMediator(mediator: Mediator): void {
    this.mediator = mediator
  }
}

class Component1 extends BaseComponent {
  public doA(): void {
    console.log('Component 1 does A.')
    this.mediator.notify(this, 'A')
  }

  public doB(): void {
    console.log('Component 1 does B.')
    this.mediator.notify(this, 'B')
  }
}

class Component2 extends BaseComponent {
  public doC(): void {
    console.log('Component 2 does C.')
    this.mediator.notify(this, 'C')
  }

  public doD(): void {
    console.log('Component 2 does D.')
    this.mediator.notify(this, 'D')
  }
}

function clientCode() {
  const c1 = new Component1()
  const c2 = new Component2()
  const mediator = new ConcreteMediator(c1, c2)

  console.log('Client triggers operation A.')
  c1.doA()

  console.log('')

  console.log('Client triggers operation D.')
  c2.doD()
}

clientCode()
```

## Mediator x Observer

O padrão Mediator é muito semelhante ao padrão Observer, mas há uma diferença fundamental entre eles. O padrão Observer permite que um número arbitrário de objetos observem um objeto subjacente, enquanto o padrão Mediator permite que um número arbitrário de objetos se comuniquem com um objeto mediador.

## Exemplo de Mediator e Observer Juntos

Neste exemplo, teremos um sistema de leilão onde os lances dos participantes são registrados e exibidos em tempo real para todos os participantes do leilão. Utilizaremos o padrão Mediator para coordenar as interações entre os participantes e o padrão Observer para notificar os participantes sobre mudanças nos lances.

```typescript
interface AuctionParticipant {
  name: string;
  bid: number;
  auctionMediator: AuctionMediator;
  notify(message: string): void;
}
```

Agora, vamos criar uma classe AuctionMediator que atuará como intermediário entre os participantes do leilão:

```typescript

class AuctionMediator {
  private participants: AuctionParticipant[] = [];

  register(participant: AuctionParticipant): void {
    this.participants.push(participant);
    participant.auctionMediator = this;
  }

  placeBid(participant: AuctionParticipant, bid: number): void {
    participant.bid = bid;
    this.notifyParticipants(`${participant.name} placed a bid of $${bid}`);
  }

  private notifyParticipants(message: string): void {
    this.participants.forEach((participant) => participant.notify(message));
  }
}
```

A classe AuctionMediator possui um método `register` que adiciona um novo participante ao leilão. Ele também possui um método `placeBid` que atualiza o lance do participante e notifica todos os participantes sobre a mudança.

```typescript
class AuctionParticipantImpl implements AuctionParticipant {
  name: string;
  bid: number = 0;
  auctionMediator: AuctionMediator;

  constructor(name: string, auctionMediator: AuctionMediator) {
    this.name = name;
    this.auctionMediator = auctionMediator;
    this.auctionMediator.register(this);
  }

  notify(message: string): void {
    console.log(`${this.name}: ${message}`);
  }

  placeBid(bid: number): void {
    this.auctionMediator.placeBid(this, bid);
  }
}
```

A classe AuctionParticipantImpl implementa a interface `AuctionParticipant` e se registra no mediador do leilão ao ser criada. Ela também possui um método `placeBid` que atualiza o lance do participante e notifica o mediador sobre a mudança.

## Ultima considerações

No padrão Mediator, o objeto mediador atua como intermediário entre os objetos do sistema, permitindo que eles se comuniquem sem conhecerem um ao outro explicitamente. Cada objeto se comunica com o mediador, que então decide como encaminhar a mensagem para os objetos relevantes. Dessa forma, a comunicação pode ser bidirecional, pois o objeto mediador pode enviar mensagens de volta aos objetos que solicitaram informações.

Já no padrão Observer, o objeto observável é responsável por enviar eventos para seus observadores, que se registram para receber esses eventos. Os observadores não enviam eventos de volta ao objeto observável. Essa é uma comunicação unidirecional, em que o objeto observável é a fonte dos eventos e os observadores são os consumidores desses eventos.

Em resumo, o padrão Mediator é útil quando você tem muitos objetos que precisam se comunicar entre si, mas você não quer que eles conheçam explicitamente uns aos outros. Já o padrão Observer é útil quando você precisa notificar muitos objetos sobre as mudanças de um objeto, mas não quer que o objeto conheça explicitamente seus observadores.


## Referências:
- https://www.patterns.dev/posts/mediator-pattern
- https://refactoring.guru/pt-br/design-patterns/mediator
- https://refactoring.guru/pt-br/design-patterns/observer
- https://www.patterns.dev/posts/observer-pattern