import React, {Component} from 'react'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      styles: {
        header: {
          width: "25rem",
          margin: "0 auto",
          textAlign: "center"
        },
        img: {
          width: "100%",
          marginTop: "-6rem"
        }
      }
    }
  }

  render() {
    return (
      <header style={{...this.state.styles.header}}>
        <div>
          <img alt=""
               style={{...this.state.styles.img}}
               src={this.props.logo}>

          </img>
        </div>
      </header>

    )
  }
}
Header.defaultProps = {logo: {}}
export default Header
