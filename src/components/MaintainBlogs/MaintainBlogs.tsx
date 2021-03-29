import React, {useEffect, useState} from 'react'
import {BreakkyBlog, DinnerDrama} from "../../Types/BlogTypes"
import {BreakkyBlogsServiceNew} from "../../Services/BreakkyBlogsServicesNew"
import {DinnerDramaServiceNew} from "../../Services/DinnerDramaServiceNew"
import {DisplayToggle} from "../../Enums/DisplayToggle"
import {Button, Tab} from "semantic-ui-react"
import '../styles/component-maintain-blogs.scss'
import {MaintainBreakkyBlogs} from "./MaintainBreakkyBlogs"
import {MaintainDinnerDramas} from "./MaintainDinnerDramas"

type Props = {
  handleClick: (value: DisplayToggle) => void
  pageToRender: DisplayToggle
}

export enum BlogDisplayToggle {
  MAINTAIN = 'maintain',
  EDIT = 'edit'
}

export const MaintainBlogs = (props: Props) => {
  const [breakkyBlogs, setBreakkyBlogs] = useState<BreakkyBlog[]>([])
  const [dinnerDramas, setdinnerDramas] = useState<DinnerDrama[]>([])
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [blogDisplayToggle, setBlogDisplayToggle] = useState<BlogDisplayToggle>(BlogDisplayToggle.MAINTAIN)

  useEffect(() => {
    collectBlogs()
  }, [])

  const collectBlogs = async () => {
    const breakkyBlogs = await BreakkyBlogsServiceNew.getAll()
    const dinnerDramas = await DinnerDramaServiceNew.getAll()
    setBreakkyBlogs(breakkyBlogs)
    setdinnerDramas(dinnerDramas)
  }

  const setBlogDisplay = (display: BlogDisplayToggle) => {
    setBlogDisplayToggle(display)
  }

  const panes = () => {
    return [
      { menuItem: 'Breakky Blogs', render: () =>
        <Tab.Pane>
          <MaintainBreakkyBlogs breakkyBlogs={breakkyBlogs}
                                blogDisplayToggle={blogDisplayToggle}
                                setBlogDisplay={setBlogDisplay}
                                collectBlogs={collectBlogs}
                                activeIndex={activeIndex}
          />
        </Tab.Pane>
      },
      { menuItem: 'Dinner Dramas', render: () =>
        <Tab.Pane>
          <MaintainDinnerDramas dinnerDramas={dinnerDramas}
                                blogDisplayToggle={blogDisplayToggle}
                                setBlogDisplay={setBlogDisplay}
                                collectBlogs={collectBlogs}
                                activeIndex={activeIndex}
          />
        </Tab.Pane>
      }
    ]
  }

  const returnHome = () => {
    props.handleClick(DisplayToggle.HOME)
  }

  return (
    <React.Fragment>
      <Button content={'Return Home'}
              onClick={() => returnHome()}
              inverted
              color={"teal"}/>
      <div className={'maintainBlogsContainer'}>
        <div className={'blogTabs'}>
          <Tab menu={{ pointing: true}}
               panes={panes()}
               activeIndex={activeIndex}
               onTabChange={(e, data) => setActiveIndex(data.activeIndex as number)}
          />
        </div>
      </div>
    </React.Fragment>
  )
}
