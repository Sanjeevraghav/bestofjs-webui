import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TagFilter from '../components/TagView'
import log from '../helpers/log'
import * as uiActionCreators from '../actions/uiActions'
import { getProjectsSortedBy, getAllProjectsCount } from '../selectors'

class AllProjectsPage extends Component {
  render() {
    log('Render the <AllProjectsPage> container', this.props)
    const {
      tagProjects,
      isLoggedin,
      uiActions,
      ui,
      graphProjects,
      count
    } = this.props
    return (
      <TagFilter
        projects={tagProjects}
        graphProjects={graphProjects}
        maxStars={tagProjects.length > 0 ? tagProjects[0].stars : 0}
        isLoggedin={isLoggedin}
        ui={ui}
        uiActions={uiActions}
        count={count}
      />
    )
  }
}

function mapStateToProps(sortFilter) {
  return function(state) {
    const tagProjects = getProjectsSortedBy({
      criteria: sortFilter,
      limit: 50
    })(state)
    const count = getAllProjectsCount(state)
    const { auth: { username }, ui } = state
    return {
      tagProjects,
      isLoggedin: username !== '',
      ui: Object.assign({}, ui, {
        starFilter: sortFilter
      }),
      count
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    uiActions: bindActionCreators(uiActionCreators, dispatch)
  }
}

export default sortFilter =>
  connect(mapStateToProps(sortFilter), mapDispatchToProps)(AllProjectsPage)
