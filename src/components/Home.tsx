import React from 'react';
import './styles/component-banner.scss'
import {Header} from 'semantic-ui-react';

export class Home extends React.Component {

  render() {
    return (
      <>
        <Header as='h2' className={'homeText'} textAlign={'center'}>
          "Hot Tip: Maybe fire the barista?"
        </Header>
        <Header as='h3' className={'homeText'} textAlign={'center'}>
          One Greek, one Italian and a Fridge take on the world
        </Header>
      </>
    )
  }
}
