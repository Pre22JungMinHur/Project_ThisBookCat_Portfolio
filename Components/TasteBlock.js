import React, { Component, Fragment } from 'react'

class Block extends Component {

  state = {
    isClicked:false
  }

//각 취향 정보를 담고 있는 블록 유저가 클릭하여 선택할 수 있습니다.

_handleClick = (e) => {
  
    this._toggleBlockStatus();
    this._selectedCallBack(e.target.id)
  
}

//클릭시 실행되는 모든 함수를 관장하는 함수입니다.

_changeCssonClick = () => {
    if(this.state.isClicked===false) {
      return 'white'
    }
    else if(this.state.isClicked===true) {
      return 'aquamarine'
    }
}

//유저가 클릭했을시 블록 색깔을 바꿔주는 함수입니다.

_selectedCallBack = (e) => {
  if(!this.state.isClicked) {
    this.props.collect(e) 
  } else {
    this.props.delete(e)
  }
}

//parent component에서 넘겨준 callback함수를 넘겨받아 취향을 선택하고 지우게 하는 함수입니다.

_toggleBlockStatus = () => {
  if(this.state.isClicked===false) {
    console.log('aquamarine')
    this.setState({isClicked:true})
    console.log(this.state.isClicked)
  } else if (this.state.isClicked===true) {
    console.log('white')
    this.setState({isClicked:false})
    console.log(this.state.isClicked)
  }
}

//블록의 클릭여부를 판별하는 함수입니다.

  render() {
    return (
      <div className = 'Block' style ={{backgroundColor:this._changeCssonClick()}} id = {this.props.select} onClick={(e)=>{this._handleClick(e)}} key={this.props.key}>
        {this.props.select==='샵'?<Fragment><h1 className = 'tagName'>#</h1><input className='customTag'type="text"/></Fragment>:<h1 className = 'tagName'>{this.props.select}</h1>}
      </div>
    )
  }
}

export default Block;