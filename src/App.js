import React from 'react';

class Form extends React.Component{
    render(){
      return(
        <div className="form">
          <form onSubmit={this.props.handleSubmit}>
            <input name="todo" type="text" /><br/>
            <input name="priority" type="text" />
            <button type="submit">確定</button>
          </form>
        </div>
      )
    }
}

class Todo extends React.Component {
  render(){
    const className ='undone'
    const link = this.props.done ? '元に戻す' : '完了！'
    return(
      <li className={className}>
        <span>{this.props.todo} </span>
        <a href="" onClick={(e) => {e.preventDefault(); this.props.setTodoStatus(this.props)}}>{link}</a>
      </li>
    );
  }
}

class TodoList extends React.Component {
  render(){
    const todos = this.props.todos.map( todo =>
      <Todo
        key={todo.id}
        {...todo}
        setTodoStatus={this.props.setTodoStatus}
      />
    )

    return(
      <ul>
        {todos}
      </ul>
    );
  }
}

class App extends React.Component{

  handleInput({ target: {value} }) {
    this.setState({
      value
    });
  }

  send() {
      const { value, priority } = this.state;
      this.setState({
        todo: '',
        priority: '',
        message: value,
        viewPriority: priority
      });
  }

  setTodoStatus(clickTodo){
    const todos = this.state.todos.slice();
    const todo = todos[clickTodo.id - 1];
    todo.done = !todo.done;
    todos[clickTodo.id - 1] = todo;

    this.setState({ todos });
  }

  priorityInput( event ) {
    this.setState({
      priority: event.target.value
    });
  }

  constructor(props){
    super(props);

    const todos = [
      {
        id: 0,
        todo: 'test',
        priority: '9',
        done: true
      }
    ]

    this.state = ({
      todos: todos,
      numberOfTodos: todos.length + 1
    });
  }

  handleSubmit(e){
    e.preventDefault();
    const todo = e.target.todo.value;
    const priority = e.target.priority.value
    const todos = this.state.todos.slice()
    const numberOfTodos = this.state.numberOfTodos

    todos.push({
      id: numberOfTodos,
      todo: todo,
      priority: priority,
      done: false
    })

    this.setState({ todos})
    this.setState({ numberOfTodos: numberOfTodos + 1 })

    e.target.todo.value = '';
    e.target.priority.value = '';
  }

  render()
  {
    return (
      <div className="app">
        <h1>To Do List</h1>
        <Form handleSubmit={this.handleSubmit.bind(this)} />

        <TodoList todos={this.state.todos}
        setTodoStatus={this.setTodoStatus.bind(this)} />
      
      </div>
    );
  }
}

export default App;

