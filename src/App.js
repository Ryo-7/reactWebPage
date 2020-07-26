import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
//import Divider from "@material-ui/core/Divider";
//import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
//import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//import Paper from '@material-ui/core/Paper';

class Form extends React.Component{
    render(){
      return(
        <div className="form">
          <form onSubmit={this.props.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <div align="right">
                  <TextField label="ToDo" input name="todo" type="text" />
                </div>
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <div align="right">
                  <TextField label="priority" input name="priority" type="number" min="1" max="10" />
                </div>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="primary" type="submit">確定</Button>
              </Grid>
            </Grid>
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
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <div align="center">
            {this.props.todo} 
          </div>
        </Grid>
        <Grid item xs={4}>
          <div align="center">{this.props.priority} </div>
        </Grid>
        <Grid item xs={4}>
          <div align="center"><a href="" onClick={(e) => {e.preventDefault(); this.props.done ? this.props.deleteTodo(this.props) : this.props.setTodoStatus(this.props)}}>{link}</a></div>
        </Grid>
      </Grid>
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
        id: 1,
        todo: 'webアプリ作成',
        priority: '10',
        done: false
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

  resetSubmit(e){
    e.preventDefault()
    this.setState({nowTargetValue: 0})
  }

  setTargetValue(e){
    e.preventDefault()
    //console.log(e.target.value)
    this.setState({targetValue: e.target.newTargetValue.value});
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
        <Grid container spacing={3}>
          
          <Grid item xs={12}>
            <div align="center">
              <h1>To Do List</h1>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div align="center">
              あなたの目標値は{this.state.targetValue}です。<br />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
          <form onSubmit={e => this.setTargetValue(e)}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <div align="right">
                <TextField label="目標値を入力" input name="newTargetValue" type="number" />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div align="left">
                <Button variant="contained" color="primary" type="submit">変更</Button>
              </div>
            </Grid>
            </Grid>
          </form>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div align="center">
              現在の達成値は{this.state.nowTargetValue}です。<br />
            </div>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={e => this.resetSubmit(e)}>
            <div align="center">
              <Button variant="contained" color="primary" type="submit">リセット</Button>
            </div>
            </form>
          </Grid>
        </Grid>
        <Form handleSubmit={this.handleSubmit.bind(this)} />

        <Grid container spacing={3}>
        <Grid item xs={4}>
        <div align="center">
          Todo
        </div>
        </Grid>
        <Grid item xs={4}>
          <div align="center">
            priority
          </div>
        </Grid>
        <Grid item xs={4}>
          <div align="center">
            status
          </div>
        </Grid>
      </Grid>

        <TodoList
        todos={this.state.todos}
        setTodoStatus={this.setTodoStatus.bind(this)} 
        deleteTodo={this.deleteTodo.bind(this)}/>
      
      </div>
    );
  }
}

export default App;

