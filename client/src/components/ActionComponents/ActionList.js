import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getActions } from '../../actions/projectActions'

import ActionItem from './ActionItem'
import * as S from './ActionStyles'

class ActionList extends Component {
  state = {
    project_id: this.props.project.id,
    actions: []
  }

  componentDidMount() {
    this.props.getData(this.state.project_id)
  }

  render() {
    const { actions } = this.props
    console.log(`ActionList render: `, actions)
    return (
      <S.ActionListContainer>
        {actions.length > 0 && (actions.map(action  => (
          <ActionItem
            key={action.id}
            {...this.props}
            action={action}
          />
        )))}
      </S.ActionListContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    actions: state.actions.actions
  }
}

export default connect(mapStateToProps, {
  getData: getActions
})(ActionList)


