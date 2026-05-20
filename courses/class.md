# JavaScript Classes: From Beginner to Master

> A complete course with theory, examples, and exercises — from zero to interview-ready.

---

## Table of Contents

1. [Chapter 1 — What is a Class?](#chapter-1--what-is-a-class)
2. [Chapter 2 — Constructor & Properties](#chapter-2--constructor--properties)
3. [Chapter 3 — Methods](#chapter-3--methods)
4. [Chapter 4 — Getters & Setters](#chapter-4--getters--setters)
5. [Chapter 5 — Static Members](#chapter-5--static-members)
6. [Chapter 6 — Inheritance & extends](#chapter-6--inheritance--extends)
7. [Chapter 7 — super Keyword](#chapter-7--super-keyword)
8. [Chapter 8 — Private Fields & Methods](#chapter-8--private-fields--methods)
9. [Chapter 9 — Mixins & Composition](#chapter-9--mixins--composition)
10. [Chapter 10 — Abstract Classes Pattern](#chapter-10--abstract-classes-pattern)
11. [Chapter 11 — Design Patterns with Classes](#chapter-11--design-patterns-with-classes)
12. [Chapter 12 — Classes & Prototypes Under the Hood](#chapter-12--classes--prototypes-under-the-hood)
13. [Exercises — Beginner](#exercises--beginner)
14. [Exercises — Intermediate](#exercises--intermediate)
15. [Exercises — Advanced](#exercises--advanced)
16. [Interview Questions](#interview-questions)

---

## Chapter 1 — What is a Class?

### Concept

A **class** is a blueprint for creating objects. It encapsulates data (properties) and behavior (methods) together.

Before ES6 (2015), JavaScript used constructor functions. Classes are **syntactic sugar** over the existing prototype-based inheritance — they don't introduce a new object model.

### Syntax

```js
class ClassName {
  // body
}
```

### Your First Class

```js
class Car {
  // We'll add things here
}

const myCar = new Car(); // creates an instance
console.log(myCar); // Car {}
console.log(typeof Car); // "function"  ← classes ARE functions under the hood
```

> **Key point:** `typeof Car === "function"`. A class is a special function.

---

## Chapter 2 — Constructor & Properties

### The `constructor` Method

The `constructor` is a special method called automatically when you use `new`. It initializes the object's properties.

```js
class Car {
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year  = year;
  }
}

const car1 = new Car("Toyota", "Corolla", 2020);
const car2 = new Car("BMW", "X5", 2023);

console.log(car1.brand); // "Toyota"
console.log(car2.year);  // 2023
```

### Rules about `constructor`

- A class can only have **one** constructor. Two will throw a `SyntaxError`.
- If you don't define one, JavaScript provides an empty default constructor.
- Use `this` to assign instance properties.

### Default Parameter Values

```js
class Car {
  constructor(brand = "Unknown", model = "Unknown", year = new Date().getFullYear()) {
    this.brand = brand;
    this.model = model;
    this.year  = year;
  }
}

const unknownCar = new Car();
console.log(unknownCar.brand); // "Unknown"
console.log(unknownCar.year);  // current year
```

### Class Fields (Modern Syntax — ES2022)

You can declare properties directly in the class body, outside the constructor:

```js
class Car {
  color = "white"; // default value for all instances
  mileage = 0;

  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }
}

const car = new Car("Ford", "Focus");
console.log(car.color);   // "white"
console.log(car.mileage); // 0
```

---

## Chapter 3 — Methods

### Instance Methods

Methods defined inside a class are available on every instance.

```js
class Car {
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year  = year;
    this.speed = 0;
  }

  accelerate(amount) {
    this.speed += amount;
    console.log(`${this.brand} is now going ${this.speed} km/h`);
  }

  brake(amount) {
    this.speed = Math.max(0, this.speed - amount);
    console.log(`${this.brand} slowed to ${this.speed} km/h`);
  }

  describe() {
    return `${this.year} ${this.brand} ${this.model}`;
  }
}

const car = new Car("Nissan", "GTR", 2022);
car.accelerate(100); // "Nissan is now going 100 km/h"
car.accelerate(50);  // "Nissan is now going 150 km/h"
car.brake(30);       // "Nissan slowed to 120 km/h"
console.log(car.describe()); // "2022 Nissan GTR"
```

### Methods are on the Prototype

Instance methods are stored on `Car.prototype`, NOT on each individual object. This is memory-efficient.

```js
console.log(car.describe === Car.prototype.describe); // true
```

### Method Chaining

Return `this` from methods to enable chaining:

```js
class Builder {
  constructor() {
    this.items = [];
  }

  add(item) {
    this.items.push(item);
    return this; // enables chaining
  }

  remove(item) {
    this.items = this.items.filter(i => i !== item);
    return this;
  }

  build() {
    return this.items.join(", ");
  }
}

const result = new Builder()
  .add("HTML")
  .add("CSS")
  .add("JavaScript")
  .remove("CSS")
  .build();

console.log(result); // "HTML, JavaScript"
```

---

## Chapter 4 — Getters & Setters

Getters and setters let you define computed properties and add validation when setting values.

### Basic Syntax

```js
class Temperature {
  constructor(celsius) {
    this._celsius = celsius; // convention: _ means "internal"
  }

  // Getter: accessed like a property, not a method
  get fahrenheit() {
    return this._celsius * 9/5 + 32;
  }

  get celsius() {
    return this._celsius;
  }

  // Setter: validates before assigning
  set celsius(value) {
    if (value < -273.15) {
      throw new Error("Temperature below absolute zero is not possible!");
    }
    this._celsius = value;
  }
}

const temp = new Temperature(100);
console.log(temp.fahrenheit); // 212  (no parentheses!)
console.log(temp.celsius);    // 100

temp.celsius = 0;
console.log(temp.fahrenheit); // 32

temp.celsius = -300; // Error: Temperature below absolute zero is not possible!
```

### Real-World Example: Full Name

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName  = lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(name) {
    const parts = name.split(" ");
    if (parts.length < 2) throw new Error("Provide first and last name");
    this.firstName = parts[0];
    this.lastName  = parts.slice(1).join(" ");
  }
}

const p = new Person("John", "Doe");
console.log(p.fullName); // "John Doe"

p.fullName = "Jane Smith";
console.log(p.firstName); // "Jane"
console.log(p.lastName);  // "Smith"
```

---

## Chapter 5 — Static Members

### Static Methods

`static` methods belong to the **class itself**, not to instances. You call them on the class, not on objects.

```js
class MathHelper {
  static add(a, b)      { return a + b; }
  static subtract(a, b) { return a - b; }
  static multiply(a, b) { return a * b; }
  static divide(a, b) {
    if (b === 0) throw new Error("Cannot divide by zero");
    return a / b;
  }
}

console.log(MathHelper.add(5, 3));      // 8
console.log(MathHelper.multiply(4, 6)); // 24

const m = new MathHelper();
m.add(1, 2); // TypeError: m.add is not a function
```

### Static Properties

```js
class Config {
  static version    = "1.0.0";
  static maxRetries = 3;
  static baseURL    = "https://api.example.com";
}

console.log(Config.version);    // "1.0.0"
console.log(Config.maxRetries); // 3
```

### Factory Pattern with Static Methods

A very common use of static methods is as **factory methods** — alternative constructors:

```js
class User {
  constructor(name, role, email) {
    this.name  = name;
    this.role  = role;
    this.email = email;
  }

  // Factory methods
  static createAdmin(name, email) {
    return new User(name, "admin", email);
  }

  static createGuest() {
    return new User("Guest", "guest", "guest@example.com");
  }

  static fromJSON(json) {
    const data = JSON.parse(json);
    return new User(data.name, data.role, data.email);
  }

  toString() {
    return `[${this.role.toUpperCase()}] ${this.name} <${this.email}>`;
  }
}

const admin = User.createAdmin("Alice", "alice@company.com");
const guest = User.createGuest();
const fromData = User.fromJSON('{"name":"Bob","role":"user","email":"bob@test.com"}');

console.log(admin.toString());    // "[ADMIN] Alice <alice@company.com>"
console.log(guest.toString());    // "[GUEST] Guest <guest@example.com>"
console.log(fromData.toString()); // "[USER] Bob <bob@test.com>"
```

---

## Chapter 6 — Inheritance & `extends`

### Basic Inheritance

`extends` creates a child class that inherits all properties and methods from a parent class.

```js
class Animal {
  constructor(name, sound) {
    this.name  = name;
    this.sound = sound;
    this.alive = true;
  }

  speak() {
    console.log(`${this.name} says: ${this.sound}!`);
  }

  breathe() {
    console.log(`${this.name} is breathing...`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name, "Woof"); // MUST call super() first
    this.tricks = [];
  }

  learnTrick(trick) {
    this.tricks.push(trick);
    console.log(`${this.name} learned: ${trick}`);
  }

  showTricks() {
    if (this.tricks.length === 0) {
      console.log(`${this.name} knows no tricks yet.`);
    } else {
      console.log(`${this.name}'s tricks: ${this.tricks.join(", ")}`);
    }
  }
}

class Cat extends Animal {
  constructor(name, isIndoor = true) {
    super(name, "Meow");
    this.isIndoor = isIndoor;
  }

  purr() {
    console.log(`${this.name} is purring... purrr`);
  }
}

const dog = new Dog("Rex");
dog.speak();           // "Rex says: Woof!"
dog.breathe();         // "Rex is breathing..."  (inherited)
dog.learnTrick("sit");
dog.learnTrick("roll over");
dog.showTricks();      // "Rex's tricks: sit, roll over"

const cat = new Cat("Whiskers");
cat.speak(); // "Whiskers says: Meow!"
cat.purr();  // "Whiskers is purring... purrr"

console.log(dog instanceof Dog);    // true
console.log(dog instanceof Animal); // true  ← also instance of parent
console.log(cat instanceof Dog);    // false
```

### Overriding Methods

A child class can override (redefine) a parent method:

```js
class Shape {
  constructor(color = "black") {
    this.color = color;
  }

  area() {
    return 0;
  }

  describe() {
    return `A ${this.color} shape with area ${this.area().toFixed(2)}`;
  }
}

class Circle extends Shape {
  constructor(radius, color) {
    super(color);
    this.radius = radius;
  }

  area() { // overrides parent
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(width, height, color) {
    super(color);
    this.width  = width;
    this.height = height;
  }

  area() { // overrides parent
    return this.width * this.height;
  }
}

const circle = new Circle(5, "red");
const rect   = new Rectangle(4, 6, "blue");

console.log(circle.describe()); // "A red shape with area 78.54"
console.log(rect.describe());   // "A blue shape with area 24.00"
```

---

## Chapter 7 — `super` Keyword

`super` has two uses:

1. `super(...)` — calls the parent constructor (required in child `constructor`)
2. `super.method(...)` — calls a parent method from a child

```js
class Vehicle {
  constructor(make, model) {
    this.make  = make;
    this.model = model;
    this.speed = 0;
  }

  describe() {
    return `${this.make} ${this.model}`;
  }

  accelerate(amount) {
    this.speed += amount;
    return this;
  }
}

class ElectricCar extends Vehicle {
  constructor(make, model, batteryCapacity) {
    super(make, model); // calls Vehicle's constructor
    this.batteryCapacity = batteryCapacity;
    this.batteryLevel    = 100;
  }

  describe() {
    // calls parent's describe(), then adds more info
    return `${super.describe()} (Electric, ${this.batteryCapacity}kWh)`;
  }

  accelerate(amount) {
    super.accelerate(amount); // calls parent's accelerate()
    this.batteryLevel -= amount * 0.1; // drain battery
    console.log(`Battery: ${this.batteryLevel.toFixed(1)}%`);
    return this;
  }
}

const tesla = new ElectricCar("Tesla", "Model 3", 75);
console.log(tesla.describe()); // "Tesla Model 3 (Electric, 75kWh)"
tesla.accelerate(50);          // "Battery: 95.0%"
tesla.accelerate(30);          // "Battery: 92.0%"
```

---

## Chapter 8 — Private Fields & Methods

### The Problem

Without private fields, "internal" properties are accessible from outside:

```js
class BankAccount {
  constructor(balance) {
    this._balance = balance; // just a convention, not truly private
  }
}
const acc = new BankAccount(1000);
acc._balance = 9999999; // 😱 anyone can do this!
```

### True Private Fields (ES2022)

Use the `#` prefix for genuinely private fields and methods:

```js
class BankAccount {
  #balance;       // private field declaration
  #owner;
  #transactionHistory = [];

  constructor(owner, initialBalance) {
    this.#owner   = owner;
    this.#balance = initialBalance;
  }

  // Private method
  #recordTransaction(type, amount) {
    this.#transactionHistory.push({
      type,
      amount,
      date: new Date().toISOString(),
      balance: this.#balance
    });
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Deposit amount must be positive");
    this.#balance += amount;
    this.#recordTransaction("deposit", amount);
    return this;
  }

  withdraw(amount) {
    if (amount <= 0)         throw new Error("Withdrawal amount must be positive");
    if (amount > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= amount;
    this.#recordTransaction("withdrawal", amount);
    return this;
  }

  get balance() {
    return this.#balance;
  }

  get statement() {
    return this.#transactionHistory
      .map(t => `${t.type}: $${t.amount} | Balance: $${t.balance}`)
      .join("\n");
  }
}

const account = new BankAccount("Alice", 500);
account.deposit(200).deposit(100).withdraw(50);

console.log(account.balance);   // 750
console.log(account.statement);
// deposit: $200 | Balance: $700
// deposit: $100 | Balance: $800
// withdrawal: $50 | Balance: $750

account.#balance; // SyntaxError: Private field '#balance' must be declared in an enclosing class
```

---

## Chapter 9 — Mixins & Composition

JavaScript only supports **single inheritance** (one `extends`). Mixins let you compose behaviors from multiple sources.

### Mixin Pattern

```js
// Mixin: a plain object or function that adds methods to a class
const Serializable = (Base) => class extends Base {
  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(json) {
    return Object.assign(new this(), JSON.parse(json));
  }
};

const Timestamped = (Base) => class extends Base {
  constructor(...args) {
    super(...args);
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  touch() {
    this.updatedAt = new Date().toISOString();
    return this;
  }
};

const Validatable = (Base) => class extends Base {
  validate() {
    for (const [field, rule] of Object.entries(this.constructor.validationRules || {})) {
      if (!rule(this[field])) {
        throw new Error(`Validation failed for field: ${field}`);
      }
    }
    return true;
  }
};

// Compose: User gets ALL three behaviors
class User extends Serializable(Timestamped(Validatable(class {}))) {
  static validationRules = {
    name:  (v) => typeof v === "string" && v.length >= 2,
    email: (v) => /\S+@\S+\.\S+/.test(v),
  };

  constructor(name, email) {
    super();
    this.name  = name;
    this.email = email;
  }
}

const user = new User("Alice", "alice@example.com");
console.log(user.validate());    // true
console.log(user.serialize());   // JSON string
console.log(user.createdAt);     // ISO date string
user.touch();
```

---

## Chapter 10 — Abstract Classes Pattern

JavaScript has no built-in `abstract` keyword, but we can simulate it:

```js
class AbstractShape {
  constructor() {
    if (new.target === AbstractShape) {
      throw new Error("AbstractShape cannot be instantiated directly");
    }
  }

  // "Abstract" method — child MUST implement
  area() {
    throw new Error(`${this.constructor.name} must implement area()`);
  }

  perimeter() {
    throw new Error(`${this.constructor.name} must implement perimeter()`);
  }

  // Concrete method — available to all children
  describe() {
    return `${this.constructor.name}: area=${this.area().toFixed(2)}, perimeter=${this.perimeter().toFixed(2)}`;
  }
}

class Triangle extends AbstractShape {
  constructor(a, b, c) {
    super();
    this.a = a;
    this.b = b;
    this.c = c;
  }

  area() {
    const s = (this.a + this.b + this.c) / 2;
    return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
  }

  perimeter() {
    return this.a + this.b + this.c;
  }
}

// new AbstractShape(); // Error: AbstractShape cannot be instantiated directly

const t = new Triangle(3, 4, 5);
console.log(t.describe()); // "Triangle: area=6.00, perimeter=12.00"
```

---

## Chapter 11 — Design Patterns with Classes

### Singleton

Only one instance ever exists:

```js
class Database {
  static #instance = null;
  #connections = [];

  constructor(host) {
    if (Database.#instance) return Database.#instance;
    this.host = host;
    Database.#instance = this;
  }

  connect(name) {
    this.#connections.push(name);
    console.log(`Connected: ${name} (total: ${this.#connections.length})`);
  }

  static getInstance(host = "localhost") {
    if (!Database.#instance) new Database(host);
    return Database.#instance;
  }
}

const db1 = Database.getInstance("db.myapp.com");
const db2 = Database.getInstance();

console.log(db1 === db2); // true — same instance!
db1.connect("user-service");
db2.connect("order-service");
```

### Observer Pattern

```js
class EventEmitter {
  #listeners = new Map();

  on(event, callback) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, []);
    }
    this.#listeners.get(event).push(callback);
    return this;
  }

  off(event, callback) {
    if (this.#listeners.has(event)) {
      this.#listeners.set(
        event,
        this.#listeners.get(event).filter(cb => cb !== callback)
      );
    }
    return this;
  }

  emit(event, ...args) {
    if (this.#listeners.has(event)) {
      this.#listeners.get(event).forEach(cb => cb(...args));
    }
    return this;
  }
}

class Store extends EventEmitter {
  #state;

  constructor(initialState) {
    super();
    this.#state = initialState;
  }

  get state() {
    return { ...this.#state }; // return copy
  }

  setState(newState) {
    const prevState = this.#state;
    this.#state = { ...this.#state, ...newState };
    this.emit("change", this.#state, prevState);
    return this;
  }
}

const store = new Store({ count: 0, user: null });

store.on("change", (newState, prevState) => {
  console.log("State changed:", prevState, "→", newState);
});

store.setState({ count: 1 });
store.setState({ user: "Alice" });
```

### Iterator Pattern

```js
class Range {
  constructor(start, end, step = 1) {
    this.start = start;
    this.end   = end;
    this.step  = step;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const { end, step } = this;
    return {
      next() {
        if (current <= end) {
          const value = current;
          current += step;
          return { value, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
}

const range = new Range(1, 10, 2);
for (const num of range) {
  process.stdout.write(num + " "); // 1 3 5 7 9
}
console.log();

console.log([...new Range(0, 6, 3)]); // [0, 3, 6]
```

---

## Chapter 12 — Classes & Prototypes Under the Hood

Understanding what classes compile to helps you ace deep interview questions.

```js
// This ES6 class:
class Animal {
  constructor(name) { this.name = name; }
  speak() { console.log(`${this.name} speaks`); }
}

class Dog extends Animal {
  speak() { console.log(`${this.name} barks`); }
}

// Is essentially this under the hood:
function AnimalFn(name) { this.name = name; }
AnimalFn.prototype.speak = function() { console.log(`${this.name} speaks`); };

function DogFn(name) { AnimalFn.call(this, name); }
DogFn.prototype = Object.create(AnimalFn.prototype);
DogFn.prototype.constructor = DogFn;
DogFn.prototype.speak = function() { console.log(`${this.name} barks`); };
```

### The Prototype Chain

```js
const dog = new Dog("Rex");

// Lookup chain for dog.speak():
// 1. dog (own property?) → no
// 2. Dog.prototype → YES → found speak()

// instanceof checks the prototype chain:
console.log(dog instanceof Dog);    // true
console.log(dog instanceof Animal); // true
console.log(dog instanceof Object); // true (everything is)

// Inspect the chain:
console.log(Object.getPrototypeOf(dog) === Dog.prototype);    // true
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype); // true
```

---

## Exercises — Beginner

### Exercise 1: Book Class

Create a `Book` class with:
- Properties: `title`, `author`, `pages`, `isRead` (default `false`)
- Method `read()` that marks the book as read and logs a message
- Method `describe()` that returns a formatted string

```js
// Your solution here

// Expected output:
const book = new Book("The Hobbit", "Tolkien", 310);
console.log(book.describe());
// "The Hobbit by Tolkien (310 pages) — Not read"
book.read();
// "You just read The Hobbit!"
console.log(book.describe());
// "The Hobbit by Tolkien (310 pages) — Read ✓"
```

<details>
<summary>Solution</summary>

```js
class Book {
  constructor(title, author, pages) {
    this.title  = title;
    this.author = author;
    this.pages  = pages;
    this.isRead = false;
  }

  read() {
    this.isRead = true;
    console.log(`You just read ${this.title}!`);
  }

  describe() {
    const status = this.isRead ? "Read ✓" : "Not read";
    return `${this.title} by ${this.author} (${this.pages} pages) — ${status}`;
  }
}
```
</details>

---

### Exercise 2: Counter Class

Create a `Counter` class with:
- A private count starting at 0
- Methods: `increment()`, `decrement()`, `reset()`, `getValue()`
- Getter `value` that returns current count
- Optional: `incrementBy(n)` and `decrementBy(n)`

```js
// Your solution here

const counter = new Counter();
counter.increment();
counter.increment();
counter.increment();
console.log(counter.value); // 3
counter.decrement();
console.log(counter.value); // 2
counter.reset();
console.log(counter.value); // 0
```

<details>
<summary>Solution</summary>

```js
class Counter {
  #count = 0;

  increment()       { this.#count++; return this; }
  decrement()       { this.#count--; return this; }
  incrementBy(n)    { this.#count += n; return this; }
  decrementBy(n)    { this.#count -= n; return this; }
  reset()           { this.#count = 0; return this; }
  getValue()        { return this.#count; }
  get value()       { return this.#count; }
}
```
</details>

---

### Exercise 3: Rectangle Class

Create a `Rectangle` class with:
- Properties `width` and `height`
- Getters: `area`, `perimeter`, `isSquare`
- Method `scale(factor)` that returns a new scaled Rectangle

```js
const rect = new Rectangle(4, 6);
console.log(rect.area);      // 24
console.log(rect.perimeter); // 20
console.log(rect.isSquare);  // false

const square = new Rectangle(5, 5);
console.log(square.isSquare); // true

const big = rect.scale(2);
console.log(big.width, big.height); // 8 12
```

<details>
<summary>Solution</summary>

```js
class Rectangle {
  constructor(width, height) {
    this.width  = width;
    this.height = height;
  }

  get area()      { return this.width * this.height; }
  get perimeter() { return 2 * (this.width + this.height); }
  get isSquare()  { return this.width === this.height; }

  scale(factor) {
    return new Rectangle(this.width * factor, this.height * factor);
  }
}
```
</details>

---

## Exercises — Intermediate

### Exercise 4: Stack & Queue Data Structures

Implement a generic `Stack` (LIFO) and `Queue` (FIFO) class using private fields.

```js
// Stack
const stack = new Stack();
stack.push(1).push(2).push(3);
console.log(stack.pop());  // 3
console.log(stack.peek()); // 2
console.log(stack.size);   // 2

// Queue
const queue = new Queue();
queue.enqueue("a").enqueue("b").enqueue("c");
console.log(queue.dequeue()); // "a"
console.log(queue.front());   // "b"
console.log(queue.size);      // 2
```

<details>
<summary>Solution</summary>

```js
class Stack {
  #items = [];

  push(item)  { this.#items.push(item); return this; }
  pop()       {
    if (this.isEmpty()) throw new Error("Stack is empty");
    return this.#items.pop();
  }
  peek()      {
    if (this.isEmpty()) throw new Error("Stack is empty");
    return this.#items[this.#items.length - 1];
  }
  isEmpty()   { return this.#items.length === 0; }
  get size()  { return this.#items.length; }
  clear()     { this.#items = []; return this; }
  toArray()   { return [...this.#items]; }
}

class Queue {
  #items = [];

  enqueue(item) { this.#items.push(item); return this; }
  dequeue()     {
    if (this.isEmpty()) throw new Error("Queue is empty");
    return this.#items.shift();
  }
  front()       {
    if (this.isEmpty()) throw new Error("Queue is empty");
    return this.#items[0];
  }
  isEmpty()   { return this.#items.length === 0; }
  get size()  { return this.#items.length; }
}
```
</details>

---

### Exercise 5: Linked List

Build a `LinkedList` class with `Node` as an inner helper:

```js
const list = new LinkedList();
list.append(1).append(2).append(3).prepend(0);
console.log(list.toArray()); // [0, 1, 2, 3]
list.remove(2);
console.log(list.toArray()); // [0, 1, 3]
console.log(list.contains(3)); // true
console.log(list.size);        // 3
```

<details>
<summary>Solution</summary>

```js
class Node {
  constructor(value) {
    this.value = value;
    this.next  = null;
  }
}

class LinkedList {
  #head = null;
  #size = 0;

  get size() { return this.#size; }

  append(value) {
    const node = new Node(value);
    if (!this.#head) { this.#head = node; }
    else {
      let curr = this.#head;
      while (curr.next) curr = curr.next;
      curr.next = node;
    }
    this.#size++;
    return this;
  }

  prepend(value) {
    const node = new Node(value);
    node.next  = this.#head;
    this.#head = node;
    this.#size++;
    return this;
  }

  remove(value) {
    if (!this.#head) return this;
    if (this.#head.value === value) {
      this.#head = this.#head.next;
      this.#size--;
      return this;
    }
    let curr = this.#head;
    while (curr.next && curr.next.value !== value) curr = curr.next;
    if (curr.next) { curr.next = curr.next.next; this.#size--; }
    return this;
  }

  contains(value) {
    let curr = this.#head;
    while (curr) { if (curr.value === value) return true; curr = curr.next; }
    return false;
  }

  toArray() {
    const result = [];
    let curr = this.#head;
    while (curr) { result.push(curr.value); curr = curr.next; }
    return result;
  }
}
```
</details>

---

### Exercise 6: Animal Hierarchy

Build a full animal hierarchy:

```
Animal
├── Mammal (warm-blooded, gives birth)
│   ├── Dog  (fetch, bark)
│   └── Cat  (purr, hiss)
└── Bird  (feathers, lays eggs)
    ├── Eagle (soar)
    └── Penguin (swim, cannot fly — override fly())
```

Each class should have relevant properties and methods. Use `super` appropriately.

<details>
<summary>Solution</summary>

```js
class Animal {
  constructor(name, age) {
    this.name = name;
    this.age  = age;
  }
  eat(food)   { console.log(`${this.name} eats ${food}`); }
  sleep()     { console.log(`${this.name} is sleeping...`); }
  toString()  { return `${this.constructor.name}(${this.name}, age ${this.age})`; }
}

class Mammal extends Animal {
  constructor(name, age) {
    super(name, age);
    this.warmBlooded = true;
  }
  giveBirth(babyName) { console.log(`${this.name} gave birth to ${babyName}!`); }
}

class Dog extends Mammal {
  constructor(name, age, breed) {
    super(name, age);
    this.breed  = breed;
    this.tricks = [];
  }
  bark()           { console.log(`${this.name}: WOOF WOOF!`); }
  fetch(item)      { console.log(`${this.name} fetches the ${item}!`); }
  learn(trick)     { this.tricks.push(trick); return this; }
}

class Cat extends Mammal {
  constructor(name, age, isIndoor = true) {
    super(name, age);
    this.isIndoor = isIndoor;
  }
  purr()  { console.log(`${this.name}: purrrrr...`); }
  hiss()  { console.log(`${this.name}: HISSSSS!`); }
}

class Bird extends Animal {
  constructor(name, age, canFly = true) {
    super(name, age);
    this.canFly  = canFly;
    this.feathers = true;
  }
  layEgg()        { console.log(`${this.name} laid an egg!`); }
  fly() {
    if (!this.canFly) { console.log(`${this.name} cannot fly!`); return; }
    console.log(`${this.name} is flying!`);
  }
}

class Eagle extends Bird {
  constructor(name, age) { super(name, age, true); }
  soar() { console.log(`${this.name} soars high above the clouds!`); }
  hunt(prey) { console.log(`${this.name} dives and catches a ${prey}!`); }
}

class Penguin extends Bird {
  constructor(name, age) { super(name, age, false); }
  swim() { console.log(`${this.name} is swimming gracefully!`); }
}
```
</details>

---

## Exercises — Advanced

### Exercise 7: Promise-Based Event System

Build a `PubSub` class (publish-subscribe) with async support:

```js
const pubsub = new PubSub();

const unsub = pubsub.subscribe("user:login", async (data) => {
  console.log("User logged in:", data.username);
});

await pubsub.publish("user:login", { username: "Alice" });
unsub(); // unsubscribe
await pubsub.publish("user:login", { username: "Bob" }); // no output
```

<details>
<summary>Solution</summary>

```js
class PubSub {
  #subscribers = new Map();

  subscribe(event, handler) {
    if (!this.#subscribers.has(event)) {
      this.#subscribers.set(event, new Set());
    }
    this.#subscribers.get(event).add(handler);
    // Return unsubscribe function
    return () => this.#subscribers.get(event)?.delete(handler);
  }

  async publish(event, data) {
    const handlers = this.#subscribers.get(event);
    if (!handlers) return;
    const promises = [...handlers].map(handler => Promise.resolve(handler(data)));
    await Promise.all(promises);
  }

  once(event, handler) {
    const wrapper = (data) => {
      handler(data);
      unsub();
    };
    const unsub = this.subscribe(event, wrapper);
    return unsub;
  }
}
```
</details>

---

### Exercise 8: Lazy Evaluated Collection

Build a `LazyCollection` class that chains operations without executing until `.toArray()` or `.first()` is called:

```js
const result = new LazyCollection([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  .filter(n => n % 2 === 0)
  .map(n => n * n)
  .take(3)
  .toArray();

console.log(result); // [4, 16, 36]
```

<details>
<summary>Solution</summary>

```js
class LazyCollection {
  #source;
  #operations = [];

  constructor(source) {
    this.#source = source;
  }

  #addOp(type, fn, n) {
    const clone = new LazyCollection(this.#source);
    clone.#operations = [...this.#operations, { type, fn, n }];
    return clone;
  }

  filter(fn)  { return this.#addOp("filter", fn); }
  map(fn)     { return this.#addOp("map", fn); }
  take(n)     { return this.#addOp("take", null, n); }

  *[Symbol.iterator]() {
    let taken = 0;
    const takeLimit = this.#operations.find(o => o.type === "take")?.n ?? Infinity;

    for (const item of this.#source) {
      if (taken >= takeLimit) break;

      let current = item;
      let skip    = false;

      for (const op of this.#operations) {
        if (op.type === "filter" && !op.fn(current)) { skip = true; break; }
        if (op.type === "map")    current = op.fn(current);
        if (op.type === "take")   continue;
      }

      if (!skip) { yield current; taken++; }
    }
  }

  toArray()  { return [...this]; }
  first()    { for (const item of this) return item; }
}
```
</details>

---

## Interview Questions

### Q1 — What is the difference between a class and a constructor function?

**Answer:**

Classes are syntactic sugar over constructor functions. Under the hood, `typeof MyClass === "function"`. Key differences:

| Feature | Class | Constructor Function |
|---------|-------|---------------------|
| Hoisting | Not hoisted (TDZ) | Hoisted |
| Strict mode | Always strict | Not by default |
| `new` required | Enforced (throws without `new`) | Not enforced |
| Method enumeration | Non-enumerable by default | Enumerable by default |
| `extends` | Built-in keyword | Manual prototype chain |

```js
// Class — cannot call without new:
class Foo {}
Foo(); // TypeError: Class constructor Foo cannot be invoked without 'new'

// Function — can accidentally call without new:
function Bar() { this.x = 1; }
Bar(); // Sets x on global object — silent bug!
```

---

### Q2 — What does `super` do, and when is it required?

**Answer:**

`super` serves two purposes:
1. **In constructor**: calls the parent class's constructor. Required before using `this` in a subclass constructor.
2. **In methods**: calls the parent class's version of a method.

```js
class Child extends Parent {
  constructor() {
    // this.x = 1; // ReferenceError: Must call super before accessing 'this'
    super();    // must come first
    this.x = 1; // now OK
  }

  someMethod() {
    super.someMethod(); // call parent's version
    // ... additional logic
  }
}
```

---

### Q3 — What is the difference between static and instance methods?

**Answer:**

- **Instance methods**: defined on `ClassName.prototype`, available on objects created with `new`
- **Static methods**: defined directly on the class (constructor function), called on the class itself

```js
class Example {
  instanceMethod() { return "on instance"; }
  static staticMethod() { return "on class"; }
}

const obj = new Example();
obj.instanceMethod();        // ✓ "on instance"
Example.staticMethod();      // ✓ "on class"
obj.staticMethod();          // TypeError
Example.instanceMethod();    // TypeError
```

Use static for utility functions, factory methods, or operations that don't need `this`.

---

### Q4 — How does prototypal inheritance work with classes?

**Answer:**

When you do `class Dog extends Animal`:
1. `Dog.prototype` is set to `Object.create(Animal.prototype)`
2. `Dog.__proto__` is set to `Animal` (for static inheritance)
3. The prototype chain: `dog → Dog.prototype → Animal.prototype → Object.prototype → null`

Method lookup walks this chain. The first match wins (allowing overriding).

---

### Q5 — What are private class fields and how do they differ from conventions?

**Answer:**

- **Convention** (`_property`): still publicly accessible, just signals "don't touch"
- **True private** (`#property`): only accessible inside the class, enforced by the engine

```js
class A {
  _conventional = 1; // accessible from outside
  #truePrivate  = 2; // not accessible from outside

  getPrivate() { return this.#truePrivate; }
}

const a = new A();
console.log(a._conventional); // 1 — accessible
console.log(a.#truePrivate);  // SyntaxError
console.log(a.getPrivate());  // 2 — only through method
```

Private fields are also not inherited (subclasses can't access them).

---

### Q6 — Can you explain `new.target`?

**Answer:**

`new.target` refers to the constructor that was called with `new`. It's `undefined` in regular function calls. Used to:
1. Detect if a function/class was called with `new`
2. Prevent direct instantiation of abstract base classes

```js
class AbstractBase {
  constructor() {
    if (new.target === AbstractBase) {
      throw new Error("Cannot instantiate abstract class");
    }
    console.log("Instantiating:", new.target.name);
  }
}

class Concrete extends AbstractBase {}

new AbstractBase(); // Error
new Concrete();     // "Instantiating: Concrete"
```

---

### Q7 — What is the difference between `Object.create()` and `class extends`?

**Answer:**

Both set up prototype chains, but `class extends` does more:

```js
// class extends:
// 1. Sets up prototype chain for instances
// 2. Sets up prototype chain for static methods (Dog.__proto__ = Animal)
// 3. Calls super() to initialize parent

// Object.create():
// Only creates an object with a specific prototype
const proto   = { greet() { return "hi"; } };
const obj = Object.create(proto);
obj.greet(); // "hi"
Object.getPrototypeOf(obj) === proto; // true
```

---

### Q8 — What happens when you access a property on an object?

**Answer:**

JavaScript performs a **prototype chain lookup**:

1. Check the object's own properties (`hasOwnProperty`)
2. If not found, check `Object.getPrototypeOf(obj)` (the prototype)
3. Continue up the chain until `null` is reached
4. Return `undefined` if not found anywhere

```js
class A { foo() { return "A"; } }
class B extends A { }
class C extends B { foo() { return "C"; } }

const c = new C();
c.foo();  // "C" — found on C.prototype
c.bar;    // undefined — not found anywhere

// You can verify:
c.hasOwnProperty("foo"); // false — it's on the prototype, not the instance
```

---

### Q9 — How would you implement a mixin in JavaScript?

**Answer:**

Since JavaScript only supports single inheritance, mixins let you add behaviors from multiple sources by composing class factories:

```js
// Functional mixin pattern
const Flyable  = (Base) => class extends Base {
  fly()   { console.log(`${this.name} is flying`); }
  land()  { console.log(`${this.name} landed`); }
};

const Swimmable = (Base) => class extends Base {
  swim()  { console.log(`${this.name} is swimming`); }
  float() { console.log(`${this.name} is floating`); }
};

class Animal {
  constructor(name) { this.name = name; }
}

// Duck can both fly and swim
class Duck extends Flyable(Swimmable(Animal)) {
  quack() { console.log(`${this.name}: Quack!`); }
}

const duck = new Duck("Donald");
duck.fly();   // "Donald is flying"
duck.swim();  // "Donald is swimming"
duck.quack(); // "Donald: Quack!"
```

---

### Q10 — Tricky: What does this output and why?

```js
class Animal {
  constructor(name) { this.name = name; }
  static create(name) { return new this(name); }
}

class Dog extends Animal {
  bark() { console.log(`${this.name} barks`); }
}

const a = Animal.create("Cat");
const d = Dog.create("Rex");

console.log(a instanceof Animal); // ?
console.log(a instanceof Dog);    // ?
console.log(d instanceof Animal); // ?
console.log(d instanceof Dog);    // ?
```

**Answer:**

```
true   // a is created by Animal.create → new Animal("Cat")
false  // a is NOT a Dog
true   // d is created by Dog.create → new this("Rex") where this=Dog → new Dog("Rex")
true   // d IS a Dog, and Dog extends Animal → also instanceof Animal
```

The key insight: `new this(name)` inside `Animal.create` uses **the class that called the method** (`this` in a static method refers to the class itself, not an instance). So `Dog.create()` calls `new Dog(name)`, not `new Animal(name)`. This is called **polymorphic factories** and is a powerful pattern.

---

### Q11 — What is the output of this code?

```js
class Foo {
  x = 10;
  constructor() {
    this.x = 20;
  }
}

class Bar extends Foo {
  x = 30;
}

const b = new Bar();
console.log(b.x); // ?
```

**Answer:** `30`

Class field initialization order:
1. Parent constructor runs (`x = 20`)
2. Child class fields initialize (`x = 30`)

Child fields always run after `super()` returns.

---

*Happy coding! 🚀 Remember: the best way to master classes is to build real projects with them.*