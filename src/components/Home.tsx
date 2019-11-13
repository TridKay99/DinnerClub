import React from 'react';
import './styles/component-banner.scss'
import {Header} from 'semantic-ui-react';

export class Home extends React.Component {

  render() {
    return (
      <div className={'homeImages'}>
        <div className={'instagram'}>
          <a href={'https://www.instagram.com/dinner_club_adventures/?hl=en'} target="_blank" rel=''>
            <img src={'https://res.cloudinary.com/dqsacxogt/image/upload/v1573648182/BlogPhotos/instagram_b1zv60.png'} alt={''} className={'instagram'}/>
          </a>
        </div>
        <div className={'moustacheSpace'}>
          <img src={'https://res.cloudinary.com/dqsacxogt/image/upload/v1573648191/BlogPhotos/moustache_r5dvaz.png'} alt={''} className={'moustache'}/>
        </div>
        <Header as='h2' className={'homeText'} textAlign={'center'}>
          "Hot Tip: Maybe fire the barista?"
        </Header>
        <Header as='h3' className={'homeText'} textAlign={'center'}>
          One Greek, one Italian and a Fridge take on the world
        </Header>
      </div>
    )
  }
}
