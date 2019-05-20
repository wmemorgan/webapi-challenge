import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as S from './ProjectStyles'

class ProjectList extends Component {
  render() {
    console.log(`render ProjectList props are: `, this.props)
    const { projects } = this.props
    return (
      <S.ProjectListContainer>
        <h1>Project List</h1>
        {projects.length > 0 ? (projects.map(project => (
          <Link key={project.id} to={`/projects/${project.id}`}>
            <S.Preview>
              <div>{project.name}</div>
              <div>{project.description}</div>
            </S.Preview>
          </Link>
        ))) : (
          <h2>Loading...</h2>
        )}
      </S.ProjectListContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects.projects,
    fetchingData: state.projects.fetchingData
  }
}

export default connect(mapStateToProps, {})(ProjectList)