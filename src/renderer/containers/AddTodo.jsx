// @flow
import React from 'react'
import { connect } from 'react-redux'

import { addTodo } from '../actions'
import type { Dispatch } from '../types'

let AddTodo = ({ dispatch }: { dispatch: Dispatch }) => {
  let input

  return <>
    <input ref={node => {
      input = node
    }} />
    <button onClick={() => {
      if(input) {
        dispatch(addTodo(input.value))
        input.value = ''
      }
    }}>
      Add Todo
    </button>
  </>
}

AddTodo = connect()(AddTodo)

export default AddTodo
