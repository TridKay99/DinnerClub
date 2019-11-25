import React from 'react';
import '../styles/component-banner.scss'
import {Header} from 'semantic-ui-react';
import {ToggleBlogs} from "../DinnerClubContainerAdventures";

type Props = {
  handleClick: (value: ToggleBlogs) => void
}

export class Banner extends React.Component<Props> {

  render() {
    return (
      <div className={'banner'}>
        <button className={'homeTitleButton'} onClick={() => this.props.handleClick(ToggleBlogs.HOME)} color={'black'}>
          <Header as='h1' className={'dinnerClubTitle'} textAlign={'center'}>
            Dinner Club Adventures
          </Header>
        </button>
      </div>
    )
  }
}
