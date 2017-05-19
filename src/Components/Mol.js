import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import d3 from 'd3'
import ResizeDetector from 'react-resize-detector'

import Header from './Header'
import Nav from './Nav'
import Picture from './Picture'
import Description from './Description'
import Detail from './Details'
import Footer from './Footer'

const EventListenerMode = {capture: false}

class Mol extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isManagingFocus: false,
    }
    this.store = {myId: props.myId, me: null, svg: null, graphReady: false, molRim: undefined, isDragOn: false}
    this.me = this
  }

  onOutsideEvent = (event) => {
    if (event.type === 'mousedown') {
//      console.log('down o-ev')
    } else if (event.type === 'mouseup') {
//      console.log('up   o-ev')
    }
  }
  handleResize = (width, height) => { // dom native scheme
    var store = this.store
    if (typeof store !== 'undefined') {
      if (typeof store.molRim !== 'undefined') {
        store.width = width
        store.height = height
        this.forceUpdate()
      }
    }
  }

  handleResiseWrapper = (width, height) => {
    this.handleResize(width, height)
  }

  mousedownListener = (e) => {
    var store = this.store
    if (this.isGraphElement(e)) {
      store.me.focus()
      store.me.addEventListener('mouseup', this.mouseupListener, EventListenerMode)
      e.preventDefault()
      e.stopPropagation()
//      console.log('down native')
    }
  }

  mouseupListener = (e) => {
    var store = this.store
    store.me.blur()
    store.me.removeEventListener('mouseup', this.mouseupListener, EventListenerMode)
//    console.log('up   native')
  }

  isGraphElement(e) {
    var el = e.target.tagName
    return el === 'circle'
  }

  componentDidMount() {
    var store = this.store
    store.me = ReactDOM.findDOMNode(this)
    store.molRim = document.getElementById(store.myId)
    store.molPane = document.querySelector(`div[id=${this.props.myId}]`).querySelector('.molPane')
    store.me.addEventListener('mousedown', e => this.mousedownListener(e))
  }

  componentWillUpdate(nextProps, nextState) {
    var store = this.store
    var rt = ReactDOM.findDOMNode(window.document.getElementById('root')),
      el = ReactDOM.findDOMNode(window.document.getElementById(nextProps.myId))
    store['width'] = el.clientWidth
    store['height'] = el.clientHeight
    store['ratio'] = Math.min(el.clientWidth / rt.clientWidth, el.clientHeight / rt.clientHeight)
  }

  componentWillMount() {
  }

  componentDidUpdate(prevProps, prevState) {
  }

  componentWillUnmount() {
  }

  render() {
    var cmp
    switch (this.props.myId) {
      case 'a':
        cmp = <Header logo={this.props.logo}/>
        break
      case 'b':
        cmp = <Nav/>
        break
      case 'c':
        cmp = <Picture
          pairs={this.props.pairs}
          getAppState={this.props.getAppState}
          setAppState={this.props.setAppState}
          s={this.props.s}
        />
        break
      case 'd':
        cmp = <Description
          products={this.props.products}
          assets={this.props.assets}
          getAppState={this.props.getAppState}
          setAppState={this.props.setAppState}
          s={Object.assign({},this.props.s)}
        />
        break
      case 'e':
        cmp = <Detail
          products={this.props.products}
          setAppState={this.props.setAppState}
          s={this.props.s}
        />
        break
      case 'f':
        cmp = <Footer
          items={[
            ['0', '&copy; 2016 Company Inc., All Rights Reserved',''], // 0: na (plain text)
            ['2', 'Terms and Conditions','(Updated March 2016)'],      // 2: link plus em note
            ['1', 'Privacy Policy',''],                                // 1: link
            ['1', 'Legal Statement','']
          ]}/>
        break
      default:
        cmp = ''
    }
    return (
      <div className='molPeri'>
        <div className='molPane'>
          {cmp}
        </div>
        <ResizeDetector handleWidth handleHeight onResize={this.handleResiseWrapper}/>
      </div>
    )
  }

  renderLoading() {
    return <div className='status'>Loading Graph Data...</div>
  }

  renderProcessing() {
    return <div className='status'>Processing Graph Data...</div>
  }

  renderError() {
    return (
      <div>
        Uh oh: {this.props.error.message}
      </div>
    )
  }
}
Mol.defaultProps = {
  products: {},
  assets:{},
  setAppState:{},
  getAppState:function(){},
  s:{}
}
export default Mol