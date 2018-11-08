import React, { Component} from 'react'
import {Button} from 'react-bootstrap'
/* import {Link} from 'react-router-dom' */
import { withRouter } from "react-router-dom";
import axios from 'axios'
import server_url from '../../url.json'

import './CSS/PickTaste.css'


import TasteBlock from './TasteBlock'

class TasteBoard extends Component {

    state = {

        taste: [
            '만화',
            '취업',
            '심리',
            '우울',
            '스타트업',
            '힐링',
            '여행',
            '블록체인',
            '스트레스',
            'pc게임',
            '영화',
            '샵'
        ],

        userName: '',

        selected: [],

        customTag: []
    }

    //정해진 취향을 담은 블록을 생성하는 component입니다.

    _collectSellection = (taste) => {
        this.setState({
            selected: [...this.state.selected, taste]
        })
        console.log('TasteBoard.js > _collectSellection 함수에서 this.state.selected___', this.state.selected)
    }

    //child component에서 넘겨준 취향정보를 모으는 함수 입니다.


    _deleteSellection = (taste) => {

        let array = [...this.state.selected]
        let index = this.state.selected.indexOf(taste)
        array.splice(index,1)
        
        this.setState({
            selected: array
        })

        console.log('TasteBoard.js > _deleteSellection 함수에서 this.state.selected___', this.state.selected)
    }

    //child component에서 넘겨준 취향정보를 지우는 함수 입니다.

    _isSelected = () => {
        if(this.state.selected.length<4) {
            alert('취향 또는 장르를 3개이상 고르셔야 합니다.')
            return false
        }
        return true
    }

    //취향을 3개이상 고르지 않았을시에 경고를 해주는 함수입니다.

    _gotoMain = () => {

        console.log('there should be history in here', this.props)

        this.props.history.push('/')
    }

    //취향을 3개이상 고르면 mainpage로 이동시켜주는 함수입니다.

    _renderTasteBlock = () => {
        const tasteblocks = this.state.taste.map((select, index) => {
            return <TasteBlock select = {select} key = {index} collect = {this._collectSellection} delete = {this._deleteSellection} selectedColor = {this.state.selected}/>
        })
        return tasteblocks
    }

    //각 취향을 블록 형태로 만들어서 뿌려주는 함수입니다.

    _setUserName = () => {
        
        const inputData = document.getElementsByClassName('getUserName')[0].value

        console.log('TasteBoard.js > _setUserName 함수에서 inputData___', inputData)

        this.setState ({
            userName:inputData
        })

        console.log('TasteBoard.js > _setUserName 함수에서 this.state.userName___', this.state.userName)
    }

    //입력된 유저이름을 state에 담아주는 함수입니다.

    _submitTasteNUserName = () => {

        let token = window.localStorage.getItem('token')

        let customNUser = {
            preference : this.state.selected,
            userName: this.state.userName
        }

        axios.post (`http://${server_url}:3000/api/user/preference`, customNUser, {
            headers: {Authorization: `bearer ${token}`}
        })
        .then(res => console.log('_submitTasteNUserName 함수에서  axios.post(preference) 후 res___', res))
        .catch(err => console.log('_submitTasteNUserName 함수에서  axios.post(preference) 후 err___', err))

    _handleSubmit = async () => {
        await this._setUserName()
        await this._submitTasteNUserName()
        await this._gotoMain()
        }
    }

    //입력된 취향과 유저이름을 서버로 전송하는 함수입니다.

  render() {
      console.log('render함수에서 this.state.userName___' , this.state.userName)
    return (
      <div className = 'TasteBoard'>
      <div className = 'WelcomeUser'>
      <input type='text' className="getUserName" /* onChange={} */></input>님 마음에 드는 책 종류를 선택해 주세요. (3개이상)
      </div>
      <div className = 'blockContainer'>
      {this._renderTasteBlock()}
      </div>
    <Button className = 'selectComplete' onClick={this.state.selected.length<3?()=>{alert('3개이상 고르셔야합니다!')}:this._handleSubmit}>선택완료</Button>
      </div>
    )
  }
}

export default withRouter(TasteBoard)
