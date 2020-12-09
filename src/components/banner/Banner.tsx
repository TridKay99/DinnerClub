import React from 'react';
import '../styles/component-banner.scss';
import {Header} from 'semantic-ui-react';
import {AdminButton} from "./AdminButton";
import {DisplayToggle} from "../../Enums/DisplayToggle"

type Props = {
  handleClick: (value: DisplayToggle) => void
}

export class Banner extends React.Component<Props> {

  render() {

    return (
      <div className={'banner'}>
        <AdminButton handleClick={this.props.handleClick}/>
        <Header as='h1'
                className={'dinnerClubTitle'}
                textAlign={'center'}>
          Dinner Club Adventures
        </Header>
      </div>
    )
  }
}
