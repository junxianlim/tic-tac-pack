import React, { PropTypes } from 'react'

const Square = ({ square, mark, win }, { store }) => {
  const handleClick = () => {
    store.dispatch({
      type: 'MOVE',
      square: square,
    })
  }

  const status = win ? `${mark} win` : mark

  return mark ?
    <div className={status}>{mark}</div> :
    <div onClick={handleClick}/>
}

Square.propTypes = {
  square: PropTypes.number.isRequired,
  mark: PropTypes.string,
  win: PropTypes.bool,
}

Square.defaultProps = {
  win: false,
}

Square.contextTypes = {
  store: PropTypes.object,
}

export default Square
