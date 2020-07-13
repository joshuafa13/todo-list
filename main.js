const data = {
  todos: [
    'Hit the gym',
    'Read a book',
    'Buy eggs',
    'Organize office',
    'Pay bills',
  ],
  done: ['Buy Milk'],
};

const model = {
  addItemToList(text, list) {
    if (text.trim() !== '') {
      list.push(text);
    } else {
      alert('Please enter');
    }
  },

  addNew() {
    if (event.keyCode === 13 || event.button === 0) {
      let newText = view.newTodo.value;
      this.addItemToList(newText, data.todos);
      // console.log(data.todos)
      view.clearInput();
    }
  },

  deleteFromList(text, dataList) {
    let index = dataList.findIndex((data) => data === text);
    if (index !== -1) {
      dataList.splice(index, 1);
    }
  },
};

const view = {
  list: document.querySelector('#my-todo'),
  doneList: document.querySelector('#done-list'),
  fullList: document.querySelector('.full-list'),
  newTodo: document.querySelector('#newTodo'),
  addBtn: document.querySelector('#addBtn'),

  renderTodo() {
    let content = '';
    content = data.todos
      .map((todo) => {
        return `
        <li>        
          <label class='unchecked' for="todo">${todo}</label>
          <i class="delete fa fa-trash"></i>
        </li>
      `;
      })
      .join('');
    view.list.innerHTML = content;
  },

  renderDone() {
    let content = '';
    content = data.done
      .map((text) => {
        return `
        <li>
          <label class='checked' for="todo">${text}</label>
          <i class="delete fa fa-trash"></i>
        </li>
    `;
      })
      .join('');
    view.doneList.innerHTML = content;
  },

  renderAll() {
    this.renderTodo();
    this.renderDone();
  },

  clearInput() {
    view.newTodo.value = '';
  },

  // toggleChecked (e) {
  //   if (e.target.tagName === 'LABEL') {
  //     event.target.classList.toggle('checked');
  //     const moveList = e.target.parentElement;
  //     if (e.target.matches('.checked')) {
  //       view.doneList.appendChild(moveList);
  //     } else {
  //       view.list.appendChild(moveList);
  //     }
  //   }
  // },
};

const controller = {
  init() {
    view.renderAll();
    view.addBtn.addEventListener('click', controller.printNewTodo);
    view.newTodo.addEventListener('keypress', controller.printNewTodo);
    view.fullList.addEventListener('click', controller.deleteMoveItem);
    // view.fullList.addEventListener('click', view.toggleChecked)
  },

  deleteMoveItem(event) {
    if (event.target.matches('.delete')) {
      deleteText = event.target.parentElement.firstElementChild.textContent;
      model.deleteFromList(deleteText, data.todos);
      model.deleteFromList(deleteText, data.done);
      view.renderAll();
      console.log(data.todos);
      console.log(data.done);
    } else if (event.target.tagName === 'LABEL') {
      selectedText = event.target.textContent;
      if (event.target.matches('.unchecked')) {
        model.deleteFromList(selectedText, data.todos);
        data.done.push(selectedText);
        view.renderAll();
        console.log(data.todos);
        console.log(data.done);
      } else {
        model.deleteFromList(selectedText, data.done);
        data.todos.push(selectedText);
        view.renderAll();
        console.log(data.todos);
        console.log(data.done);
      }
    }
  },

  printNewTodo() {
    model.addNew();
    view.renderTodo();
  },
};

controller.init();
