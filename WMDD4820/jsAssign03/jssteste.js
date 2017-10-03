const addTodo = document.getElementById('addTodo')
const TodoItem = document.getElementById('addTodoItem')
let liCounter = 0
const ls = localStorage

let toDoObj = function (key, what, status) {
  let obj = {
    taskId: key,
    taskDescription: what,
    isComplete: status,
    del(key) {
      // ls.removeItem(key.substring(2, key.length))
      console.log(key.substring(2, key.length))
      document.getElementById(key).remove()
    }
  }
  return obj
}

retrieveTodo()

addTodo.addEventListener('click', (e) => {
  e.preventDefault()
  let newToDo = new toDoObj(liCounter, document.getElementById('addTodoItem').value, false)
  addLi(TodoItem.value)
  ls.setItem(newToDo.taskId, JSON.stringify(newToDo))
  liCounter++
})

function addLi (text) {
  const ol = document.querySelector('ol')
  const li = document.createElement('li')
  const p = document.createElement('p')
  const button = document.createElement("button");

  li.appendChild(p)
  li.appendChild(button);

  li.setAttribute("id","li" + liCounter);
  li.addEventListener('click', (e) => {
    toggleCompleteStatus(e.target.parentNode.getAttribute('id'))
  })

  // li.addEventListener('click', (e) => {
  //   e.preventDefault()
  //   const del  = document.createElement('del')
  //   del.textContent = text

  //   if (li.firstElementChild.tagName == 'P') {
  //     li.replaceChild(del, li.firstElementChild)
  //   }
  //   else {
  //     li.replaceChild(p, li.firstElementChild)
  //   }
  // })

  p.textContent = text

  button.innerHTML = "Delete";
  button.setAttribute("id","btn" + liCounter)
  button.addEventListener('click', (e) => {
    newToDo.del(e.target.parentNode.getAttribute('id'))
  })

  ol.appendChild(li)
}

// function 

function toggleCompleteStatus (id) {
  if (newToDo.taskId(id).isComplete) {
    console.log(newToDo.taskId(id).isComplete)
  };
}

function retrieveTodo() {
  for (var i = 0; i < ls.length; i++) {
    toDoObj2 = JSON.parse(ls.getItem(i))
    console.log(toDoObj2)
  }
}
