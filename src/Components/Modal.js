import React from 'react'

export default class Modal extends React.Component {
  render() {
    if (!this.props.show) {
      return null
    }

    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)'
    }

    const modalStyle = {
      display: "inherit",
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto'
    }

    const outerRim = {
      display: 'table',
      position: 'absolute',
      width: '100%',
      height: '100%'
    }

    const middleRim = {
      display: 'table-cell',
      verticalAlign: 'middle'
    }
    const innerRim = {
      cursor: 'pointer',
      textAlign: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '50%'
    }
    const modalClose = {
      height: '1rem',
      width: '1rem',
      textAlign: 'center'
    }

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>
          <div style={outerRim}>
            <div style={middleRim}>
              <div style={innerRim}>
                <span style={modalClose} onClick={this.props.onClose}>&#x2717;</span>
                &nbsp;&nbsp;
                <span>{this.props.children}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Modal.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  show: React.PropTypes.bool,
  children: React.PropTypes.node
}
