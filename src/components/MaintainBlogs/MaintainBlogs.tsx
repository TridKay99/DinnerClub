import React from 'react'
import {BreakkyBlogsServiceNew} from "../../Services/BreakkyBlogsServicesNew"
import {Tab} from "semantic-ui-react"
import {BreakkyBlog, DinnerDrama} from "../../Types/BlogTypes"
import '../styles/component-maintain-blogs.scss'
import {MaintainBreakkyBlogs} from "./MaintainBreakkyBlogs"
import {DinnerDramaServiceNew} from "../../Services/DinnerDramaServiceNew"
import {MaintainDinnerDramas} from "./MaintainDinnerDramas"
import {BlogForm} from "../BlogForm"
import {DisplayToggle} from "../../Enums/DisplayToggle"

export enum MaintainBlogsToggle {
  MAINTAIN = 'maintain',
  CREATE = 'create',
  UPDATE = 'update'
}

type Props = {
  handleClick: (value: DisplayToggle) => void
  pageToRender: DisplayToggle
}

type State = {
  breakkyBlogs: BreakkyBlog[]
  dinnerDramas: DinnerDrama[]
  maintainToggle: MaintainBlogsToggle
  selectedBlog: BreakkyBlog | null
}

export class MaintainBlogs extends React.Component<Props, State> {

  state: State = {
    breakkyBlogs: [],
    dinnerDramas: [],
    maintainToggle: MaintainBlogsToggle.MAINTAIN,
    selectedBlog: null
  }

  componentDidMount = async() => {
    const breakkyBlogs = await BreakkyBlogsServiceNew.getAll()
    const dinnerDramas = await DinnerDramaServiceNew.getAll()
    this.setState({breakkyBlogs, dinnerDramas})
  }

  changeMaintainToggle = (maintainToggle: MaintainBlogsToggle) => {
    this.setState({maintainToggle})
  }

  blogVarietyTabs = () => {
    return [
    { menuItem: 'Breakky Blogs', render: () =>
        <Tab.Pane>
          <MaintainBreakkyBlogs maintainToggle={this.state.maintainToggle}
                                changeMaintainToggle={this.changeMaintainToggle}
                                breakkyBlogs={this.state.breakkyBlogs}
                                handleClick={this.props.handleClick}/>
        </Tab.Pane> },
    { menuItem: 'Dinner Dramas', render: () =>
        <Tab.Pane>
          <MaintainDinnerDramas maintainToggle={this.state.maintainToggle}
                                changeMaintainToggle={this.changeMaintainToggle}
                                dinnerDramas={this.state.dinnerDramas}
                                handleClick={this.props.handleClick}/>
        </Tab.Pane>
    }]
  }

  render() {
    return (
      <div className={'maintainBlogsContainer'}>
        <div className={'blogTabs'}>
          {(this.state.maintainToggle === MaintainBlogsToggle.MAINTAIN || this.state.maintainToggle === MaintainBlogsToggle.CREATE || this.state.maintainToggle === MaintainBlogsToggle.UPDATE) &&
            <Tab menu={{fluid: true, vertical: true, pointing: true}} panes={this.blogVarietyTabs()}/>
          }
        </div>
      </div>
    )
  }
}
