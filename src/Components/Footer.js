import React, {Component} from 'react'
import Switch, {Case, Default} from 'react-switch-case'
import {AllHtmlEntities} from 'html-entities'

import  './Footer.css'
import './LoadAssets'

const entities = new AllHtmlEntities()
export default class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      styles: {
        focused: 0
      }
    }
  }

  clicked(index) {
    this.setState({focused: index})
  }

  render() {
    var self = this
    return (
      <div className="wsiFooterDiv">
        <ul className="wsiFooterUl">{this.props.items.map(function (m, i, a) {
          var style = 'wsiFooterLi'
          if (self.state.focused === i) {
            style += ' focused'
          }
          return (<li
            key={i}
            className={style}
            style={this.state.styles}
            onClick={self.clicked.bind(self, i)}>
            <Switch condition={m[0]}>
              <Case value='0'>
                <span>
                  <span className="wsiFooterSpan">{entities.decode(m[1])}</span>{i !== (a.length - 1) ? <span className="wsiFooterSpan"> | </span> : ''}
                </span>
              </Case>
              <Case value='1'>
                <span>
                <a className="wsiFooterA" href="#">{m[1]}</a>{i !== (a.length - 1) ? <span className="wsiFooterSpan"> | </span> : ''}
                </span>
              </Case>
              <Case value='2'>
                <span>
                  <a className="wsiFooterA" href="#">{m[1]}</a>
                  <span className="wsiFooterNote">{m[2]}</span>{i !== (a.length - 1) ? <span className="wsiFooterSpan"> | </span> : ''}
                </span>
              </Case>
              <Default>
                <span>oh men....</span>
              </Default>
            </Switch>
          </li>)
        }, this)}
        </ul>
      </div>)
  }
}
