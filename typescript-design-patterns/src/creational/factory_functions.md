# Funções de fábrica (Factory Functions)

- [Funções de fábrica (Factory Functions)](#funções-de-fábrica-factory-functions)
  - [O que é](#o-que-é)
  - [Por que usar](#por-que-usar)
  - [Exemplo](#exemplo)
  - [Novas Oservações](#novas-oservações)

## O que é
São funções que retornam um objeto. Elas são muito úteis para criar objetos com propriedades e métodos pré-definidos. a principal diferença entre uma função de fábrica e uma função construtora é que a função de fábrica retorna um objeto já criado, enquanto a função construtora retorna um objeto que será criado com o operador new.

## Por que usar
Um dos principais desafios em um sistema real é identificar o que são depedencias do objeto e o que não são (dependencias externas). Para resolver o problema de dependencias externas podemos utilizar o conceito introduzido no Typescript que são interfaces, um objeto depende da interface e não de uma implementação específica, isso facilita o desenvolvimento de os testes automatizados, melhorando a qualidade do código.

## Exemplo

```js
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}
```

```js
const createUser = (name, email) => {
  return {
    name,
    email,
    login() {
      console.log(`${this.name} fez login.`);
    },
    logout() {
      console.log(`${this.name} fez logout.`);
    },
  };
};
```

Nesse exemplo temos duas implementações do Objecto Usuario uma utilizando Classes e outra implementação utilizando uma factory, a factory além de encapsular melhor o codigo, ela também é mais flexivel, pois podemos passar qualquer objeto para a função e ela vai retornar um objeto com as propriedades e métodos que precisamos.

## Novas Oservações

As fábricas são usadas para criar instâncias de entidades. Eles são usados ​​na camada de aplicação e não fazem parte da camada de domínio. Eles são comumente usados ​​para criar instâncias de entidades e embedar (incorporar) a outras entidades.

Exemplo de código que utiliza uma fábrica para criar uma instância de uma entidade. Nesse exemplo, a entidade é uma mensagem.

```typescript
interface MessageObject {
  id: string;
  text: string;
}
```

```typescript
class Message {
  private id: string;
  private text: string;

  constructor(message: MessageObject) {
    this.id = message.id;
    this.text = message.text;
  }

  get id(): string {
    return this.id;
  }

  get text(): string {
    return this.text;
  }
}
```

Create a factory function to create instances of the `Message` entity, a factory nesse caso funciona como um encapsulamento para a criar a instancia da classe com o new.

```typescript
const createMessage = (message: MessageObject) => {
  return new Message(message);
};
```

```typescript
const createMessage = (message: MessageObject) => {
  return {
    id: message.id,
    text: message.text,
  }
};
```

Este outro exemplo a factory já retorna o objeto diretamente e não é utilizada como um encapsulamento da classe menssagem.