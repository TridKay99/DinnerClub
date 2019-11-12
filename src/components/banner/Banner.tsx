import React from 'react';
import '../styles/component-banner.scss'
import { Header } from 'semantic-ui-react';
import instagram from '../styles/instagram.png'

export class Banner extends React.Component {

  render() {
    return (
      <div className={'banner'}>
        <Header as={'h1'}>
          Secret Header
        </Header>
        <Header as='h1' className={'dinnerClubTitle'} textAlign={'center'}>
          Dinner Club Adventures
        </Header>
        <a href={'https://www.instagram.com/dinner_club_adventures/?hl=en'} target="_blank">
          <img src={instagram} alt={''} className={'instagram'}/>
        </a>
      </div>
    )
  }
}
