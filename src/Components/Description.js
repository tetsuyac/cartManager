import React, {Component} from 'react'
import Modal from './Modal'

import './Description.css'

class Description extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      detailsPrice: [0],
      detailsAmount: [0],
      detailsCartVal: [0]
    }
    this.store = {
      go: false,
      propPrepDone: false
    }
  }

  getDataName(name) {
    switch (name) {
      case 'detailsPrice':
        return 'price'
      case 'detailsAmount':
        return 'amount'
      default:
        return ''
    }
  }

  getStateByKey = (k) => {
    return this.props.s !== undefined
      ? this.state[k][this.props.s.vd]
      : undefined
  }

  setStateByKey(o, val, all) { // o__.{k,v}
    // val.1:set, all.1:all
    // val.0:get, all.0:vd
    var id = this.props.s.id, vd = this.props.s.vd
    var i = all ? 0 : vd, l = all ? this.getCurrentProductVariantSize() : vd + 1
    var kv = this.getKV(o)
    var a1 = [].concat(this.state[kv.k])
    var o1 = {}
    for (i; i < l; i++) {
      kv.v = val
        ? kv.v
        : this.props.products.p[id].details[i][this.getDataName(kv.k)]
      a1[i] = kv.v
    }
    o1[kv.k] = a1
    this.setState(o1)
  }

  getCurrentProductVariantSize() {
    return this.props.s.prodMap[this.props.s.id] + 1
  }

  isPropsReadyForPrep() {
    var o = {'detailsPrice': undefined}
    var vdl = this.getCurrentProductVariantSize()
    var kv = this.getKV(o)
    if (vdl !== this.state[kv.k].length) {
      return false                                 // props has not been initialized yet.
    }
    return true
  }

  propPrep() {
    if (!this.store.propPrepDone) {
      this.setStateByKey({'detailsPrice': undefined}, 0, 1)
      this.store.propPrepDone = true
    }
  }

  syncState = () => {}

  resetState = () => {
    var vdl = this.getCurrentProductVariantSize()
    var o = {}
    o['detailsPrice'] = []
    o['detailsAmount'] = []
    o['detailsCartVal'] = []
    for (var i = 0, l = vdl; i < l; i++) {
      o['detailsPrice'][i] = 0
      o['detailsAmount'][i] = 0
      o['detailsCartVal'][i] = 0
    }
    this.setState({
      ...o
    })
    return true
  }

  componentDidMount() {}

  componentDidUpdate() {
    if (this.store.go) {                      // asset propagated
      if (!this.isPropsReadyForPrep()) {
        this.resetState()                     // props propagated so, reset state properties
      } else if (!this.store.propPrepDone) {
        this.propPrep()                       // set state detailsPrice loading
      }
    }
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleEvent(evt) {
//    console.log(evt)
    switch (evt) {
      case 'cartUpdate':
        this.handleState({modalIsOpen: true})
        this.toggleModal()
        break
      default:
        break
    }
  }

  getKV(o) {
    var k, r = {}
    for (k in o) {
      r['k'] = k
      break
    }
    r['v'] = o[k]
    return r
  }

  handleState(newState) {
    var s = this.props.getAppState('s')
    var kv = this.getKV(newState)
    s[kv.k] = kv.v
    this.props.setAppState({
      s: s
    })
  }

  detailsAmountChange = (e) => {
    this.setStateByKey({detailsAmount: e.target.value}, 1, 0)
  }

  detailsCartClick = (e) => {
//    console.log(this.state.input)
    this.detailsCartVal()
  }

  detailsCartVal = () => {
//    console.log('detailsCartVal')
    var price = parseInt(this.state.detailsPrice[this.props.s.vd] * 100, 10)
    var amount = (this.state.detailsAmount[this.props.s.vd] - 0)
    var r = price === 0
      ? '0.00'
      : price * amount / 100 + ''
    this.setStateByKey({detailsCartVal: r}, 1, 0)
  }

  render() {
    var go, p, id, vd, _r, r

    function setS(me) {
      p = me.props.products.p
      id = me.props.s.id
      vd = me.props.s.vd
      return true
    }

    this.store.go = go = (this.props.products.hasOwnProperty('p')
        ? this.props.products.p !== undefined     // products
          ? this.props.s.hasOwnProperty('id')     // product id
            ? this.props.s.id !== -1              //
              ? this.props.s.hasOwnProperty('vd') // product variant id
                ? this.props.s.vd !== -1          //
                  ? setS(this)                    // set state s
                  : false                         //  ...
                : false                           //
              : false                             //
            : false                               //
          : false                                 //
        : false                                   //
    )
    return (
      <section>
        <Modal
          display="inherit"
          show={this.state.isOpen}
          onClose={this.toggleModal}>
          {"total amount in Cart: $" + this.getStateByKey("detailsCartVal")}
        </Modal>

        <summary className="descriptionSummary">{go ? p[id].summaries[vd] : ''}</summary>
        <div>
          <p className="descriptionDetailsMain">{go ? p[id].details[vd].main : ''}</p>
          <ul className="descriptionDetailsSub">
            <li>{go ? p[id].details[vd].marks[0] : ''}</li>
            <li>{go ? p[id].details[vd].marks[1] : ''}</li>
            <li>{go ? p[id].details[vd].marks[2] : ''}</li>
            <li>{go ? p[id].details[vd].marks[3] : ''}</li>
          </ul>
          <div className="detailsPrice">
            <div>{go ? '\$' + p[id].details[vd].price : ''}</div>
          </div>
          <div className="detailsAmount">
            <input
              type="number"
              min="0"
              defaultValue={this.state.detailsAmount[vd] !== undefined
                ? this.state.detailsAmount[vd]
                : 0}
              value={this.state.detailsAmount[vd]}
              onChange={this.detailsAmountChange}
            />
          </div>
          <div className="detailsCart">
            <img alt=""
                 onClick={(e) => {
                   this.handleEvent('cartUpdate')
                   this.detailsCartClick()
                 }}
                 style={{...this.state.styles}}
                 src={this.state.buttonAddToCart
                   ? this.state.buttonAddToCart
                   : this.props.assets.pts
                     ? (r = this.props.assets.pts.solos.find((e) => {
                       for (var k in e) {
                         if (k === 'buttonAddToCart') {
                           _r = e
                           return true
                         }
                       }
                       return false
                     }))
                       ? ((r) => {
                         this.setState(_r)
                         return {}
                       })()
                       : {}
                     : {}
                 }
            >
            </img>
          </div>
        </div>
      </section>
    )
  }
}
Description.defaultProps = {
  products: {},
  assets: {},
  setAppState: {},
  getAppState: function () {
  },
  s: {modalIsOpen: false}
}
export default Description
