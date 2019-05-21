import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'

import {  getProjects } from '../actions/projects'

import Form from '../components/ProjectComponents/ProjectForm'
import ProjectList from '../components/ProjectComponents/ProjectList'
import Project from '../components/ProjectComponents/ProjectDetails'

class Routes extends Component {
  componentDidMount() {
    this.props.getProjects()
  }

  render() {
    console.log(`Routes render this.props.projects is: `, this.props.projects)
    return (
      <div>
        {/* Assign routes */}
        <Route
          path='/'
          exact
          component={ProjectList}
        />
        <Route
          path='/add'
          render={props =>
            <Form
              {...props}
              add
            />}
        />
        {this.props.projects.map(project => (
          <Route
            key={project.id}
            path={`/projects/${project.id}`}
            render={props =>
              <Project
                {...props}
                project={project}
              />
            }
          />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects.projects
  }
}

export default withRouter(connect(mapStateToProps, { getProjects })(Routes))