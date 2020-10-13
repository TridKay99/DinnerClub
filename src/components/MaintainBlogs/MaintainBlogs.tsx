import React from 'react'
import {BreakkyBlogsServiceNew} from "../../Services/BreakkyBlogsServicesNew"
import {Tab} from "semantic-ui-react"
import {DisplayToggle} from "../DinnerClubContainerAdventures"
import {BreakkyBlog} from "../../Types/BreakkyBlog"
import '../styles/component-maintain-blogs.scss'
import {MaintainBreakkyBlogs} from "./MaintainBreakkyBlogs"

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
  maintainToggle: MaintainBlogsToggle
  selectedBlog: BreakkyBlog | null
}

export class MaintainBlogs extends React.Component<Props, State> {

  state: State = {
    breakkyBlogs: [],
    maintainToggle: MaintainBlogsToggle.MAINTAIN,
    selectedBlog: null
  }

  componentDidMount = async() => {
    const breakkyBlogs = await BreakkyBlogsServiceNew.getAll()
    this.setState({breakkyBlogs})
  }

  changeMaintainToggle = (maintainToggle: MaintainBlogsToggle) => {
    console.log('maintainToggle', maintainToggle)
    this.setState({maintainToggle})
  }

  blogVarietyTabs = () => {
    return [
    { menuItem: 'Breakky Blogs', render: () =>
        <Tab.Pane>
          <MaintainBreakkyBlogs maintainToggle={this.state.maintainToggle}
                                changeMaintainToggle={this.changeMaintainToggle}
                                breakkyBlogs={this.state.breakkyBlogs}
                                handleClick={this.props.handleClick}
          />
        </Tab.Pane> },
    { menuItem: 'Dinner Dramas', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
      ]
  }

  render() {
    return (
      <div className={'maintainBlogsContainer'}>
        <div className={'blogTabs'}>
          {(this.state.maintainToggle === MaintainBlogsToggle.MAINTAIN || this.state.maintainToggle === MaintainBlogsToggle.CREATE) &&
            <Tab menu={{fluid: true, vertical: true, pointing: true}} panes={this.blogVarietyTabs()}/>
          }
        </div>
      </div>
    )
  }
}
