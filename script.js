const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';
const addToDoButton = document.querySelector('#addToDo');
const toDoList = document.querySelector('#toDoList');
const toDoInput = document.querySelector('#toDoInput');
const form = document.querySelector('#todo-form');
const lista = [];

const getLista = () => {
  fetch(BASE_URL + '?_limit=7')
    .then(res => res.json())
    .then(data => {
      data.forEach(todos => {
        lista.push(todos)
      });
      listLista();
      console.log(data)
    })
}
getLista();

const listLista = () => {
  toDoList.innerHTML = ''

  lista.reverse().forEach(todos => {
    const todosElement = createTodosElement(todos)
    toDoList.appendChild(todosElement)
  })
}

const createTodosElement = (todosData) => {
  let todos = document.createElement('ul');
  todos.classList.add('ulLista');

  let toDoInput = document.createElement('li');
  toDoInput.classList.add('listing');
  toDoInput.innerText = todosData.title;
  toDoInput.dataset.id = todosData.id;

  todos.appendChild(toDoInput);

  let deleteButton = document.createElement('button');
  deleteButton.innerText = 'Klart';
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', function() {
    const id = todosData.id;
    fetch(BASE_URL + '/' + id, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          const index = lista.findIndex(todos => todos.id == id)
          lista.splice(index, 1)
          listLista()
        }
      })
  });

  todos.appendChild(deleteButton);

  return todos;
};

const handleSubmit = e => {
  e.preventDefault();

  if (!toDoInput.value) {
    alert("Enter a ToDo");
    return;
  }

  const newTodos = {
    title: document.querySelector('#toDoInput').value,
    completed: false
  };
  
  fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(newTodos),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then(response => response.json())
  .then((data) => {
    lista.unshift(data);
    // console.log(data)
    const todosElement = createTodosElement(data)
    toDoList.insertBefore(todosElement, toDoList.firstChild);
  });
};


form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!toDoInput.value) {
    alert('Skriv in en ToDo');
  } else {
    console.log(toDoInput.value);
    handleSubmit(e);
    toDoInput.value = '';
  }
});

