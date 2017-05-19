import React, {Component} from 'react'
import LoadAssets from './Components/LoadAssets'
import LoadProducts from './Components/LoadProducts'
import MolGrid from './Components/MolGrid'
import 'bootstrap-css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assets: {},
      products: {},
      s: {}
    }
    this.setAppState = this.setState.bind(this)
    this.getAppState = this.getAppState.bind(this)
  }

  getAppState(sa) {     // TODO will support multi product lines.
    var rsa = {}        // returning state accumulative
    sa = Array.isArray(sa)
      ? sa
      : [sa]
    sa.forEach((s) => {
      if (this.state.hasOwnProperty(s)) {
        rsa[s] = JSON.parse(JSON.stringify(this.state[s]))
      }
    })
    return rsa[sa]
  }

  render() {
    return (
      <div>
        <LoadAssets setAppState={this.setAppState}/>
        <LoadProducts setAppState={this.setAppState}/>
        <MolGrid
          assets={this.state.assets}
          products={this.state.products}
          setAppState={this.setAppState}
          getAppState={this.getAppState}
          s={Object.assign({}, this.state.s)}
        />
      </div>
    )
  }
}
