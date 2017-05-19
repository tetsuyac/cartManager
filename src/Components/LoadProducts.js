import {Component} from 'react'
import products from './products'

export default class LoadProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
//    let o = products
    products.init()
    var r = this.props.setAppState instanceof Function
      ? this.props.setAppState(Object.assign({}, {products: products, s: products.s}))
      : undefined
    if (r) {
//      console.log(o.getProdMutNum(0))
//      console.log('0,0,summaries:' + o.getProdItem(0, 0, 'summaries'))
//      console.log('0,0,images:   ' + o.getProdItem(0, 0, 'images'))
//      console.log('0,0,details:  ' + po(o.getProdItem(0, 0, 'details')))
//      console.log('0,1,summaries:' + o.getProdItem(0, 1, 'summaries'))
//      console.log('0,1,images:   ' + o.getProdItem(0, 1, 'images'))
//      console.log('0,1,details:  ' + po(o.getProdItem(0, 1, 'details')))
//      console.log('0,2,summaries:' + o.getProdItem(0, 2, 'summaries'))
//      console.log('0,2,images:   ' + o.getProdItem(0, 2, 'images'))
//      console.log('0,2,details:  ' + po(o.getProdItem(0, 2, 'details')))
//      console.log('0,3,summaries:' + o.getProdItem(0, 3, 'summaries'))
//      console.log('0,3,images:   ' + o.getProdItem(0, 3, 'images'))
//      console.log('0,3,details:  ' + po(o.getProdItem(0, 3, 'details')))
    }
  }

  render() {
    return null
  }
}

/*function po(o) {
  var s = ''
  for (var k in o) {
    s += k + ': ' + o[k] + '\n'
  }
  return s
}*/

