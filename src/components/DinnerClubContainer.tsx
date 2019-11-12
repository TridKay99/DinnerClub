import React from 'react';
import { Banner } from './banner/Banner';
import {Container} from "semantic-ui-react";
import {NavBar} from "./banner/NavBar";

export class DinnerClubContainer extends React.Component {

  render() {
    return (
      <Container>
        <Banner />
        <NavBar />
      </Container>
    )
  }
}
