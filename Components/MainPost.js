import React, {Component} from "react"
import { Link } from 'react-router-dom'
import Image from 'react-image-resizer'
import { Icon } from "semantic-ui-react";
import server_url from '../../url.json'

import axios from 'axios'

class MainPost extends Component {

    state = {
        liked:false,
        likeCount:this.props.likecount
    }

    //서버에서 받아온 각 포스트 정보를 담게될 블록형태의 component입니다.

    componentDidMount () {
        this._getLikeData()
    }

    _getLikeData = () => {

        let token = window.localStorage.getItem('token')

        axios.get(`http://${server_url}:3000/api/like/${this.props.postid}`, {headers:{Authorization: `bearer ${token}`}})
        .then(response => {
            this.setState({
                liked: response.data[0][0][1]
              })
              console.log('liked', this.state.liked)
        })
        .catch(error => console.log(error))
    }

    //해당 게시물이 like됐는지 안됐는지 확인하는 함수입니다.


    _handleLike = () => {

        let token = window.localStorage.getItem('token')

        if(this.state.liked) {

            axios.delete(`http://${server_url}:3000/api/like/${this.props.postid}`, {headers:{Authorization: `bearer ${token}`}})
            .then(response => {
                console.log(response)
                this.setState({
                    liked:false,
                    likeCount: this.state.likeCount-1
                })
                console.log('liked should change', this.state.liked)
            })
            .catch(error => console.log(error))

        } else {

            axios.post(`http://${server_url}:3000/api/like/${this.props.postid}`, {}, {headers:{Authorization: `bearer ${token}`}})
            .then(response => {
                console.log(response)
                this.setState({
                    liked:true,
                    likeCount: this.state.likeCount+1
                })
                console.log('liked should change', this.state.liked)
            })
            .catch(error => console.log(error))
        }
    }

    //유저가 해당 게시물을 like했을때 likecount와 liked 상태를 관리하는 함수입니다.

    render(){
        return(
                <div className ='BookBoard'>
                <Link to={{
                pathname : `/postdetail/${this.props.postid}`
                }}>
                <Image className = 'likeThumbnail' src = {`http://${server_url}:3000/upload/${this.props.url}`} alt='bookcover' width={240} height={240} />
                </Link>
                {this.state.liked?
                <span> <Icon name='heart' size="large" onClick={this._handleLike}/>X{this.state.likeCount}</span>: 
                <span> <Icon name='heart outline' size="large" onClick={this._handleLike}/>X{this.state.likeCount}</span>}
                <span>{this.props.title}</span>
                </div>
        )
    }
}

export default MainPost;