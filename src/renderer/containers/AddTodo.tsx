import MaterialIcon from '@material/react-material-icon'
import React, { Component } from 'react'
import TextField, { Input } from '@material/react-text-field'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import Todo from '../types/Todo'
import { addTodo as acAddTodo } from '../actions/todos'
import { NormalizedTodoRes } from '../actions/types'

interface DispatchProps {
  addTodo: (data: Partial<Todo>) => Promise<NormalizedTodoRes>
}

type OwnProps = RouteComponentProps<{ date: string }>

type Props = DispatchProps & OwnProps

interface State {
  value: string
}

class AddTodo extends Component<Props, State> {
  public state = {
    value: ''
  }

  private handleChange = evt => {
    this.setState({ value: evt.target.value })
  }

  private handleKeyUp = evt => {
    if (evt.target.value && evt.key === 'Enter') {
      const { addTodo } = this.props
      const { date } = this.props.match.params

      this.setState({ value: '' })
      addTodo({ date, name: String(evt.target.value) })
    }
  }

  public render(): JSX.Element {
    const { value } = this.state

    let carriageReturn
    if (value) carriageReturn = <MaterialIcon icon="subdirectory_arrow_left" />

    return (
      <TextField
        label="New Todo"
        leadingIcon={<MaterialIcon icon="add" id="add-todo-plus" />}
        trailingIcon={carriageReturn}
        floatingLabelClassName="add-todo-label"
        id="add-todo"
      >
        <Input value={value} onChange={this.handleChange} onKeyUp={this.handleKeyUp} />
      </TextField>
    )
  }
}

const mapDispatchToProps = {
  addTodo: acAddTodo
}

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(AddTodo)
)
