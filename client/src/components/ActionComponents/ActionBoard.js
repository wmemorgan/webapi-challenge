import React from 'react'

import * as S from './ActionStyles'
import ActionList from './ActionList'
import ActionForm from './ActionForm'

const ActionBoard = props => {
  return (
    <S.ActionBoardContainer>
      <h2>Action Items:</h2>
      <ActionForm {...props} />
      <ActionList {...props} />
    </S.ActionBoardContainer>
  )
}

export default ActionBoard