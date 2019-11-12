import React from 'react';
import '../styles/component-banner.scss'
import { Header } from 'semantic-ui-react';

export class Banner extends React.Component {

  render() {
    return (
      <div className={'banner'}>
        <Header as='h1' className={'dinnerClubTitle'} textAlign={'center'}>
          Dinner Club Adventures
        </Header>
      </div>
    )
  }
}
