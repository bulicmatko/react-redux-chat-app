import { CREATE_NEW_MESSAGE } from '../constants/internal-action-types.const'

import {
  NEW_MESSAGE,
  NEW_USER_NAME,
  REMOVE_LAST_MESSAGE,
} from '../constants/socket-server-action-types.const'

import socket from '../socket'

const REMOVE_LAST_MESSAGE_COMMAND = '/oops'
const SET_USER_NAME_COMMAND = '/nick '

export default store => next => action => {
  if (action.type === CREATE_NEW_MESSAGE) {

    if (action.payload.text === REMOVE_LAST_MESSAGE_COMMAND) {
      socket.send(JSON.stringify({
        type: REMOVE_LAST_MESSAGE,
        payload: {
          userId: action.payload.userId,
        },
      }))
    } else if (action.payload.text.startsWith(SET_USER_NAME_COMMAND)) {
      socket.send(JSON.stringify({
        type: NEW_USER_NAME,
        payload: {
          userId: action.payload.userId,
          userName: action.payload.text.substr(SET_USER_NAME_COMMAND.length),
        },
      }))
    } else {
      socket.send(JSON.stringify({
        type: NEW_MESSAGE,
        payload: {
          text: action.payload.text,
          userId: action.payload.userId,
        },
      }))
    }
  }

  return next(action)
}
