import React from 'react';
import '../styles/component-banner.scss';
import {Button} from 'semantic-ui-react';
import {DisplayToggle} from "../DinnerClubContainerAdventures";

export type Props = {
  handleClick: (value: DisplayToggle) => void
}

export type State = {
  isShown: boolean,
}

export class AdminButton extends React.Component<Props, State> {

  state: State = {
    isShown: false
  };

  displayAdminButton = () => {
    if(this.state.isShown) {
      return (
        <Button color={'yellow'}
                icon={'exclamation triangle'}
                className={'adminButton'}
                onClick={() => this.props.handleClick(DisplayToggle.ADMIN_LOGIN)}
                onMouseEnter={() => this.setState({isShown: true})}
                onMouseLeave={() => this.setState({isShown: false})}
        />
      )
    } else {
      return <div className={'boobs'}
                  onMouseEnter={() => this.setState({isShown: true})}
                  onMouseLeave={() => this.setState({isShown: false})}/>
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.displayAdminButton()}
      </React.Fragment>
    )
  }
}
