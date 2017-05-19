import React, {Component} from 'react'
import Collapsible from 'react-collapsible'
import Accordion from 'react-responsive-accordion'
import FontAwesome from 'react-fontawesome'
import './Details.css'

class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.Collapsible = Collapsible // TODO avoiding warning
    this.FontAwesome = FontAwesome // ...
  }

  componentDidMount() {
  }

  render() {
    var go, p, id, vd

    function setS(me) {
      p = me.props.products.p
      id = me.props.s.id
      vd = me.props.s.vd
      return true
    }

    go = (this.props.products.hasOwnProperty('p')
        ? this.props.products.p !== undefined     // products
          ? this.props.s.hasOwnProperty('id')     // product id
            ? this.props.s.id !== -1              //
              ? this.props.s.hasOwnProperty('vd') // product variant id
                ? this.props.s.vd !== -1          //
                  ? setS(this)                    // set s
                  : false                         // props is not ready
                : false                           //  ...
              : false                             //
            : false                               //
          : false                                 //
        : false                                   //
    )
    var tmp = go ? p[id].details[vd].marks[0] : '' // TODO avoiding warning
    return (
      <div className="AccordionBase">
        <Accordion>
          <div data-trigger="Accordion effect entry 1" data-trigger-when-open="[opend] Accordion effect entry 1">
            <p>Accordion effect entry 1. will be externalizd.
              Accordion effect entry 1. will be externalizd.
              Accordion effect entry 1. will be externalizd. </p>
          </div>
          <div data-trigger="Accordion effect entry 2" data-trigger-when-open="[opend] Accordion effect entry 2">
            <p>Accordion effect entry 2. will be externalizd.
              Accordion effect entry 2. will be externalizd.
              Accordion effect entry 2. will be externalizd. </p>
          </div>
          <div data-trigger="Accordion effect entry 3" data-trigger-when-open="[opend] Accordion effect entry 3">
            <p>Accordion effect entry 3. will be externalizd.
              Accordion effect entry 3. will be externalizd.
              Accordion effect entry 3. will be externalizd. </p>
          </div>
        </Accordion>
      </div>
    )
  }
}
Detail.defaultProps = {
  products: {},
  setAppState: {},
  s: {}
}
export default Detail