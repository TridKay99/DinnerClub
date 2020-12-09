import React, {useEffect, useState} from 'react'
import {DisplayToggle} from "../Enums/DisplayToggle"
import {Banner} from "./Banner/Banner"
import {NavBar} from "./Banner/NavBar"
import {AdminLogin} from "./AdminLogin"
import {MaintainBlogs} from "./MaintainBlogs/MaintainBlogs"
import {DinnerDramasContainer} from "./BlogContainers/dinner_dramas/DinnerDramasContainer"
import {BreakkyBlogContainer} from "./BlogContainers/breakky_blog/BreakkyBlogContainer"
import {Home} from "./Home"

export const DinnerClubContainerAdventureHooks = () => {
    const [pageToRender, setPageToRender] = useState<DisplayToggle>(DisplayToggle.HOME)
    const [isBlogPicked, setIsBlogPicked] = useState<boolean>(false)
    const [removeMainBlogButtons, setRemoveMainBlogButtons] = useState<boolean>(false)

    useEffect(() => {
        if((pageToRender === DisplayToggle.ADMIN_LOGIN
          || pageToRender === DisplayToggle.MAINTAIN_BLOGS
          || pageToRender === DisplayToggle.NEW_BLOG)
          && !removeMainBlogButtons) {
            setRemoveMainBlogButtons(true)
        }

        if((pageToRender === DisplayToggle.HOME
          || pageToRender === DisplayToggle.BREAKKY_BLOG_LIST
          || pageToRender === DisplayToggle.DINNER_BLOG_LIST)
          && removeMainBlogButtons) {
            setRemoveMainBlogButtons(false)
        }
    }, [pageToRender])

    const handlePageToRender = (value: DisplayToggle) => {
        setPageToRender(value)
    }

    const handleIsBlogPicked = () => {
        setIsBlogPicked(true)
    };

    const swapPageToRender = () => {
        switch(pageToRender) {
            case DisplayToggle.ADMIN_LOGIN: return <AdminLogin handleClick={handlePageToRender}
                                                               pageToRender={DisplayToggle.ADMIN_LOGIN}/>;
            case DisplayToggle.MAINTAIN_BLOGS: return <MaintainBlogs handleClick={handlePageToRender}
                                                                     pageToRender={DisplayToggle.ADMIN_LOGIN}/>
            case DisplayToggle.DINNER_BLOG_LIST: return <DinnerDramasContainer isBlogPicked={isBlogPicked}
                                                                               handleIsBlogPicked={handleIsBlogPicked}/>;
            case DisplayToggle.BREAKKY_BLOG_LIST: return <BreakkyBlogContainer isBlogPicked={isBlogPicked}
                                                                               handleIsBlogPicked={handleIsBlogPicked}/>;
            default: return <Home/>
        }
    };

    return (
      <div className={'container'}>
        <Banner handleClick={handlePageToRender}/>
        <br/>
        <br/>
        {!removeMainBlogButtons &&
            <NavBar handleClick={handlePageToRender} removeMainBlogButtons={removeMainBlogButtons}/>
        }
        {swapPageToRender()}
      </div>
    )
}
