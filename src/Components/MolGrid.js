import React from 'react'
import CreateReactClass from 'create-react-class'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin'
import {Responsive} from 'react-grid-layout'
var WidthProvider = require('react-grid-layout').WidthProvider
var ResponsiveReactGridLayout = WidthProvider(Responsive)

import Mol from './Mol'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './MolGrid.css'

const originalLayouts = {}
//const originalLayouts = getFromLS('layouts') || {}

var MolGrid = CreateReactClass({
  mixins: [PureRenderMixin],
  getDefaultProps() {
    return {
      className: "layout",
      breakpoints:{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
      cols:       {lg: 12,   md: 10,  sm: 6,  xs: 4,   xxs: 2},
      isDraggable: false,
      isResizable: false,
      rowHeight: 52,
      width:1200,
      autosize:true,
      verticalCompact:true,
      containerPadding:[2,2],
      margin:[0,0],
      onLayoutChange: function () {
      },
      assets: {},
      products: {},
      setAppState:{},
      getAppState:function(){},
      s:{}
    }
  },

  getInitialState() {
    return {
      layouts: JSON.parse(JSON.stringify(originalLayouts))
    }
  },

  resetLayout() {
    this.setState({layouts: {}})
  },

  onLayoutChange(layout, layouts) {
    saveToLS('layouts', layouts)
    this.setState({layouts})
    this.props.onLayoutChange(layout, layouts)
  },

  render() {
    return (
      <div id="molGrid">
        {/*<button onClick={this.resetLayout}>Reset Layout</button>*/}
        <ResponsiveReactGridLayout
          {...this.props}
          layouts={this.state.layouts}
          onLayoutChange={this.onLayoutChange}>
          <div key={'a'} id={'a'} data-grid={{i: 'a', x: 0, y: 0, w: 12, h: 2, }}>
            <Mol myId={'a'}
                 className={'paneHeader'}
                 logo={this.props.assets.hasOwnProperty('pts')
                   ? this.props.assets.pts.solos.find((e) => {
                     return e.hasOwnProperty('logo')
                   }).logo
                   : ''}
            ></Mol>
          </div>
          <div key={'b'} id={'b'} data-grid={{i: 'b', x: 0, y: 2, w: 12, h: 2, }}>
            <Mol myId={'b'}
                 className={'paneNav'}
            ></Mol>
          </div>
          <div key={'c'} id={'c'} data-grid={{i: 'c', x: 0, y: 4, w: 6, h: 12, }}>
            <Mol myId={'c'}
                 className={'panePicture'}
                 pairs={this.props.assets.hasOwnProperty('pts')
                   ? this.props.assets.pts.reactImageGallery.images
                   : []}
                 getAppState={this.props.getAppState}
                 setAppState={this.props.setAppState}
            ></Mol>
          </div>
          <div key={'d'} id={'d'} data-grid={{i: 'd', x: 6, y: 16, w: 6, h: 6, }}>
            <Mol myId={'d'}
                 className={'paneDescription'}
                 products={this.props.products ? this.props.products : {}}
                 assets={this.props.assets ? this.props.assets : {}}
                 getAppState={this.props.getAppState}
                 setAppState={this.props.setAppState}
                 s={Object.assign({},this.props.s)}
            ></Mol>
          </div>
          <div key={'e'} id={'e'} data-grid={{i: 'e', x: 6, y: 22, w: 6, h: 6, }}>
            <Mol myId={'e'}
                 className={'paneDetails'}
                 products={this.props.products ? this.props.products : {}}
                 setAppState={this.props.setAppState}
            ></Mol>
          </div>
          <div key={'f'} id={'f'} data-grid={{i: 'f', x: 0, y: 28, w: 12, h: 1,}}>
            <Mol myId={'f'}
                 className={'paneFooter'}
            ></Mol>
          </div>
        </ResponsiveReactGridLayout>
      </div>
    )
  }
})
export default MolGrid

/*function getFromLS(key) {
  let ls = {}
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {}
    } catch (e) {// Ignore
    }
  }
  return ls[key]
}*/

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem('rgl-8', JSON.stringify({
      [key]: value
    }))
  }
}
