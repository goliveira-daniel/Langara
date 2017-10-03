const addTodo = document.getElementById('addTodo')
const TodoItem = document.getElementById('addTodoItem')
let liCounter = 0

addTodo.addEventListener('click', (e) => {
  e.preventDefault()
  addLi(TodoItem.value)
})

function addLi (text) {
  const ol = document.querySelector('ol')
  const li = document.createElement('li')
  const p = document.createElement('p')
  p.textContent = text
  li.appendChild(p)
  // li.textContent = text
  li.setAttribute("id","li" + liCounter);
  li.addEventListener('click', (e) => {
  	e.preventDefault()
  	const del  = document.createElement('del')
  	del.textContent = text

  	if (li.firstElementChild.tagName == 'P') {
  		li.replaceChild(del, li.firstElementChild)
  	}
  	else {
  		li.replaceChild(p, li.firstElementChild)
  	}
  })

  const button = document.createElement("button");
  li.appendChild(button);
  button.innerHTML = "Delete";
  button.setAttribute("id","btn" + liCounter)

  button.addEventListener('click', (e) => {
  	e.preventDefault()
  	// this long line gets the id of btn pressed, replace start by a LI id
  	// and tries to remove it. It's long but works just fine
  	const removeLi = document.getElementById('li' + button.id.substring(3, button.id.length)).remove()
  })

  ol.appendChild(li)
  liCounter++
}