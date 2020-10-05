import React from 'react'
import { Button, Icon, SemanticICONS } from 'semantic-ui-react'
import {DraftInlineStyleType} from "draft-js";

type Props = {
  active: boolean
  style: DraftInlineStyleType | string
  onToggle: (style: DraftInlineStyleType| string) => void
  icon: SemanticICONS
}

export class TextStyleButton extends React.Component<Props> {

  onToggle = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    this.props.onToggle(this.props.style)
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <Button icon
              className={className}
              onMouseDown={this.onToggle}>
        <Icon name={this.props.icon}/>
      </Button>
    );
  }
}
