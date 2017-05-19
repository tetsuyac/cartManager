import React, {Component} from 'react'
import ImageGallery from 'react-image-gallery'

import 'react-image-gallery/styles/css/image-gallery.css'

export default class Picture extends Component {
  constructor(props) {
    super(props)
    this.state = {
      styles: {}
    }
    this.handleImageLoad = this.handleImageLoad.bind(this)
    this.handleSlide = this.handleSlide.bind(this)
  }

  componentDidMount() {
  }

  handleImageLoad(event) {
//    console.log('Image loaded ', event.target)
  }

  handleSlide(slide) { // TODO object to in
    var s = this.props.getAppState('s')
    this.props.setAppState({
      s: {
        ...s,
        vd: slide
      }
    })
  }

  render() {
    return (
      <div style={{...this.state.styles}}>
        <ImageGallery
          items={this.props.pairs}
          slideInterval={2000}
          onImageLoad={this.handleImageLoad}
          onSlide={this.handleSlide}/>
      </div>
    )
  }
}
Picture.defaultProps = {
  pairs: [],
  products: {},
  setAppState: {},
  getAppState: function () {
  },
  s: {}
}
