class Node {
  data = null;
  nextNode = null;

  constructor(data) {
    this.data = data;
  }
}

const N1 = new Node(10);
const N2 = new Node(20);
N1.nextNode = N2;
console.log(N1);