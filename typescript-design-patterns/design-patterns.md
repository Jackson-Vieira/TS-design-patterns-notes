# Design Patterns

- [Design Patterns](#design-patterns)
  - [O Que são Design patterns?](#o-que-são-design-patterns)
  - [Tipos de Design Patterns](#tipos-de-design-patterns)
    - [Criacionais](#criacionais)
      - [Abstract Factory](#abstract-factory)
      - [Factory Method](#factory-method)
    - [Estruturais](#estruturais)
      - [Adapter](#adapter)
      - [Facade](#facade)
    - [Comportamentais](#comportamentais)
      - [Observer](#observer)
      - [Mediator](#mediator)

## O Que são Design patterns?

Design patterns são padrões de projeto que podem ser usados para resolver problemas comuns de desenvolvimento de software.

- Design patterns são soluções testadas e comprovadas para problemas comuns de desenvolvimento de software.
- Design patterns são documentados, o que significa que você pode aprender com a experiência de outros desenvolvedores.
- Design patterns são fáceis de entender, pois são baseados em conceitos de programação orientada a objetos.
- Design patterns são reutilizáveis, o que significa que você pode usá-los para resolver problemas semelhantes em diferentes contextos.

## Tipos de Design Patterns

### [Criacionais](./src/creational)
São design patterns que abstraem a criação de objetos, de forma que o cliente não precise se preocupar com a criação de objetos, mas sim com o uso deles.

#### [Abstract Factory](./src/creational/abstract-factory)
O padrão Abstract Factory é um padrão de projeto criacional que permite que você produza famílias de objetos relacionados sem especificar suas classes concretas.

#### [Factory Method](./src/creational/factory-method)
O padrão Factory Method é um padrão de projeto criacional que fornece uma interface para criar objetos em uma superclasse, mas permite que as subclasses alterem o tipo de objetos que serão criados.

### [Estruturais](./src/structural)
São design patterns que facilitam a composição de classes ou objetos.

#### [Adapter](./src/structural/adapter)
O padrão Adapter é um padrão de projeto estrutural que permite objetos com interfaces incompatíveis trabalharem juntos.

#### [Facade](./src/structural/facade)
O padrão Facade é um padrão de projeto estrutural que fornece uma interface simplificada para uma biblioteca, um framework ou qualquer conjunto complexo de classes.

### [Comportamentais](./src/behavioral)
São Design patterns que permitem que você altere o comportamento de um objeto em tempo de execução.

#### [Observer](./src/behavioral/observer)
O padrão Observer é um padrão de projeto comportamental que permite que você defina uma subscrição de notificação para um objeto, de modo que outro objeto possa ser notificado quando ocorrer um evento.

#### [Mediator](./src/behavioral/mediator)
O padrão Mediator é um padrão de projeto comportamental que permite que você reduza as dependências complexas entre objetos. O padrão Mediator promove o acoplamento fraco ao evitar que os objetos se refiram uns aos outros explicitamente, Em vez disso, os objetos enviam notificações uns aos outros através de um objeto mediador.
