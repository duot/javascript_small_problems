function newStack() {
  let stack = [];
  let push = (item) => stack.push(item);
  let pop = () => stack.pop();
  let printStack = () => stack.forEach((cur) => console.log(cur));

  return  {
    push,
    pop,
    printStack,
  };
}


let stack = newStack();
stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)
stack.printStack();
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
stack.printStack();

stack.push(4)
stack.printStack();
