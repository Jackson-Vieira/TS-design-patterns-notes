# Observer

O padrão Observer é um padrão de design comportamental que permite que você defina uma dependência de um-para-muitos entre objetos, de modo que quando um objeto muda de estado, todos os seus dependentes são notificados e atualizados automaticamente.

Um Objecto que é observado é chamado de **Observable** e os objetos que observam o **Observable** são chamados de **Observers**.

## Estrutura

![Diagrama de Classes](https://refactoring.guru/images/patterns/diagrams/observer/structure.png)

## Como implementar

- Examine sua lógica de negócios e tente dividi-la em duas partes: a funcionalidade principal, independente de outro código, atuará como o publicador; o restante se transformará em um conjunto de classes de assinantes.

- Declare a interface do assinante. No mínimo, ele deve declarar um único método de `update`.

- Declare a interface do editor e descreva um par de métodos para `subscribe` um objeto de assinante e `unsubscribe` da lista. Lembre-se de que os editores devem trabalhar com assinantes apenas por meio da interface do assinante.

- Crie classes de publicador concretas. Cada vez que algo importante acontece dentro de uma editora, ela deve notificar todos os seus assinantes.

- Implemente os métodos de notificação de atualização em classes de assinantes concretas. A maioria dos assinantes precisaria de alguns dados de contexto sobre o evento. Pode ser passado como argumento do método de notificação.

[Exemplo de código (sistema de notificação e logger)](./code/observer.ts)

## Referências:
- https://refactoring.guru/pt-br/design-patterns/observer
- https://www.patterns.dev/posts/observer-pattern
