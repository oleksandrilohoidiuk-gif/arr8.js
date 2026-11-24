class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  add(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      this.size++;
      return;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          break;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          break;
        }
        current = current.right;
      }
    }
    this.size++;
  }

  remove(value) {
    const sizeBefore = this.size;
    this.root = this._removeNode(this.root, value);
    return this.size < sizeBefore;
  }

  _removeNode(node, value) {
    if (node === null) {
      return null;
    }

    if (value < node.value) {
      node.left = this._removeNode(node.left, value);
      return node;
    }
    if (value > node.value) {
      node.right = this._removeNode(node.right, value);
      return node;
    }

    this.size--;

    if (node.left === null && node.right === null) {
      return null;
    }

    if (node.left === null) {
      return node.right;
    }
    if (node.right === null) {
      return node.left;
    }

    let replacement = node.right;
    while (replacement.left !== null) {
      replacement = replacement.left;
    }

    node.value = replacement.value;

    node.right = this._removeNode(node.right, replacement.value);
    this.size++;

    return node;
  }

  contains(value) {
    let current = this.root;
    while (current !== null) {
      if (value === current.value) {
        return true;
      }
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }

  printAll() {
    const result = [];
    this._inOrder(this.root, result);
    console.log(result.length ? result.join(", ") : "Дерево порожнє");
    return result;
  }

  _inOrder(node, result) {
    if (node === null) return;
    this._inOrder(node.left, result);
    result.push(node.value);
    this._inOrder(node.right, result);
  }

  max() {
    if (this.root === null) {
      console.log("Дерево порожнє");
      return null;
    }
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.value;
  }

  min() {
    if (this.root === null) {
      console.log("Дерево порожнє");
      return null;
    }
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.value;
  }

  count() {
    return this.size;
  }
}

const tree = new BinaryTree();

console.log("=== Додавання елементів: 3, 1, 9, 7, 10, 1, 6, 8 ===");
[3, 1, 9, 7, 10, 1, 6, 8].forEach((n) => tree.add(n));
console.log("Усі елементи:");
tree.printAll();
console.log("Кількість:", tree.count());
console.log("Найбільший:", tree.max());
console.log("Найменший:", tree.min());

console.log("\n=== Пошук ===");
console.log("Чи є 7?  ", tree.contains(7));
console.log("Чи є 100?", tree.contains(100));

console.log("\n=== Видалення ===");
console.log("Видаляємо 8 (немає нащадків):", tree.remove(8));
tree.printAll();

console.log("Видаляємо 7 (є один нащадок):", tree.remove(7));
tree.printAll();

console.log("Видаляємо 3 (корінь, є обидва нащадки):", tree.remove(3));
tree.printAll();

console.log("Видаляємо 100 (такого немає):", tree.remove(100));

console.log("\n=== Підсумок ===");
console.log("Кількість:", tree.count());
console.log("Найбільший:", tree.max());
console.log("Найменший:", tree.min());

console.log("\n=== Порожнє дерево ===");
const empty = new BinaryTree();
empty.printAll();
console.log("Кількість:", empty.count());
empty.max();
empty.min();
