import React, {Component} from 'react'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import './Nav.css'

export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      styles: {
        "fontSize": ".8rem",
        "backgroundColor": "black",
        "color": "white",
        "padding": "0",
        "marginRight": "-.4rem"
      }
    }
    this.stop = this.stop.bind(this)
  }

  render() {
    return (
      <nav>
        <Tabs defaultIndex={1} onSelect={index => console.log(index)}>
          <TabList className="wsi-tabs" style={{...this.state.styles}}>
            <Tab>COOCKWARE</Tab>
            <Tab>COOKS' TOOLS</Tab>
            <Tab>CUTLERY</Tab>
            <Tab>ELECTRICS</Tab>
            <Tab>BAKEWARE</Tab>
            <Tab>FOOD</Tab>
            <Tab>TABLETOP & BAR</Tab>
            <Tab>HOMEKEEPING</Tab>
            <Tab>OUTDOOR</Tab>
            <Tab>SALE</Tab>
            <Tab>COMPANY HOME</Tab>
          </TabList>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
        </Tabs>
        <ol className="wsi-breadcrumbs breadcrumb">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Homekeeping</a></li>
          <li className="breadcrumb-item"><a href="#">Aprons</a></li>
          <li className="breadcrumb-item"><a href="#">Adult Aprons</a></li>
          <li className="breadcrumb-item breadcrumbs-end"><a href="#">Company Classic Apron, French Blue</a></li>
        </ol>
      </nav>
    )
  }

  stop(e) {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }
}
