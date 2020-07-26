import React from 'react';

class Form extends React.Component{
    render(){
      return(
        <div className="form">
          <form onSubmit={this.props.handleSubmit}>
            <input name="todo" type="text" /><br/>
            <input name="priority" type="number" min="1" max="10" />
            <button type="submit">確定</button>
          </form>
        </div>
      )
    }
}

class Todo extends React.Component {
  render(){
    const className ='undone'
    const link = this.props.done ? '削除' : '完了！'
    return(
      <li className={className}>
        <span>{this.props.todo} </span>
        <span>重要度: {this.props.priority} </span>
        <a href="" onClick={(e) => {e.preventDefault(); this.props.done ? this.props.deleteTodo(this.props) : this.props.setTodoStatus(this.props)}}>{link}</a>
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
        deleteTodo={this.props.deleteTodo}
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
      numberOfTodos: todos.length + 1,
      targetValue: 30,
      nowTargetValue: 0
    });
  }

  handleSubmit(e){
    e.preventDefault();
    const todo = e.target.todo.value;
    const priority = e.target.priority.value;
    const todos = this.state.todos.slice();
    const numberOfTodos = this.state.numberOfTodos;

    todos.push({
      id: numberOfTodos,
      todo: todo,
      priority: priority,
      done: false
    });

    this.setState({ todos});
    this.setState({ numberOfTodos: numberOfTodos + 1 });

    e.target.todo.value = '';
    e.target.priority.value = '';
  }

  deleteTodo(clickTodo){
    const todos = this.state.todos.slice();
    var nowTargetValue = this.state.nowTargetValue;

    //console.log(todos)

    const num = todos[clickTodo.id -1 ].priority - 0;

    nowTargetValue += num;

    todos.splice((clickTodo.id - 1),1);

    //console.log(todos.length)

    for (let i = clickTodo.id - 1; i < todos.length;i++){
      todos[i].id = i + 1 ;
    };

    //console.log(todos)

    this.setState({ todos });
    this.setState({numberOfTodos: todos.length + 1});

    if(this.state.targetValue <= nowTargetValue){
      alert('目標達成おめでとう！自分自身に何かご褒美をあげましょう');
      nowTargetValue = 0;
    }

    this.setState({nowTargetValue});

  }

  render()
  {
    return (
      <div className="app">
        <h1>To Do List</h1>
        あなたの目標値は{this.state.targetValue}です。<br />
        現在の達成地は{this.state.nowTargetValue}です。<br />
        <Form handleSubmit={this.handleSubmit.bind(this)} />

        <TodoList
        todos={this.state.todos}
        setTodoStatus={this.setTodoStatus.bind(this)} 
        deleteTodo={this.deleteTodo.bind(this)}/>
      
      </div>
    );
  }
}

export default App;

