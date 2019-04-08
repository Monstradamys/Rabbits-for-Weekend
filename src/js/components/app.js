import React from 'react';

import RabbitsContainer from './rabbitscontainer';
import RabbitCreator from './rabbitcreator';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            token: null,
            list: [],
            creating: false,
            authName: '',
            authPass: '',
            authorized: false
        }

    }



    renderAuthorization = () => {
        return (
            <div className='div-authorization'>
                <h1 className="header">Hello! Please, introduce yourself.</h1>
                <form>
                    <input  className="input"
                            type='text'
                            placeholder='Insert your name'
                            onChange={e => this.setState({authName: e.target.value})}
                    />
                    <input  className="input"
                            type='password'
                            placeholder='Insert your password'
                            onChange={e => this.setState({authPass: e.target.value})}
                    />
                    <button className="btn btn-full"
                            onClick={this.getAuthorization}
                            type='button'    
                    >
                        Log in
                    </button>
                </form>
            </div>
        )
    }

    renderContent = () => {
        return (
            <div className="content">
            {this.rednerHeader()}
                <RabbitCreator  createRabbit={this.createRabbit} 
                                changeHeader={this.changeHeader}
                />
                <RabbitsContainer list={this.state.list}
                                updateRabbit={this.updateRabbit}
                                deleteRabbit={this.deleteRabbit}
                />
            
            </div>
        )
    }

    getAuthorization = () => {
        console.log(this.state)
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://conquest.weekendads.ru/login_check');
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify({'username' : this.state.authName, 'password' : this.state.authPass}));
        xhr.onreadystatechange = () => {
            if(xhr.readyState !== 4) return;
            else {
                if(xhr.status === 200) {
                    const token = JSON.parse(xhr.response).token;
                    const base64 = token.split('.')[1];
                    const decodedVal = JSON.parse(atob(base64));
                    this.setState({
                        userName: decodedVal.username,
                        token: token,
                        authorized: true
                    }, () => {
                        this.getRabbitsList()
                    })
                    
                }
                else alert('wrong username or password!')
            }
        }
    }

    getRabbitsList = () => {
        if(this.state.userName !== '') {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://conquest.weekendads.ru/rabbit/list');
            xhr.setRequestHeader('Authorization', `Bearer ${this.state.token}`)
            xhr.send();
            xhr.onreadystatechange = () => {
                if(xhr.readyState !== 4) return;
                else {
                    if(xhr.status === 200) 
                        this.setState({
                            list: JSON.parse(xhr.response)
                        })
                    else alert('cannot get rabbits list')
                }
            }
        }
    }


    createRabbit = (name, weight) => {                                                            
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://conquest.weekendads.ru/rabbit');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `Bearer ${this.state.token}`);
        xhr.send(`rabbit[name]=${name}&rabbit[weight]=${weight}`);
        xhr.onreadystatechange =  () => {
            if(xhr.readyState !== 4) return;
            else {
                if(xhr.status === 201)
                    this.getRabbitsList();
                else alert('cannot add rabbit') 
            }
        }
    }

    updateRabbit = (id, name, weight, callback) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `http://conquest.weekendads.ru/rabbit/${id}`);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `Bearer ${this.state.token}`);
        xhr.send(`rabbit[name]=${name}&rabbit[weight]=${weight}`);
        xhr.onreadystatechange = () => {
            if(xhr.readyState !== 4) return;
            else {
                if(xhr.status === 200) {
                    callback();
                    this.getRabbitsList();
                    
                }                    
                else 
                    alert('cannot update rabbit');
            }
        }
    }

    deleteRabbit = (id, name, weight) => {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `http://conquest.weekendads.ru/rabbit/${id}`);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `Bearer ${this.state.token}`);
        xhr.send(`rabbit[name]=${name}&rabbit[weight]=${weight}`);
        xhr.onreadystatechange = () => {
            if(xhr.readyState !== 4) return;
            else {
                if(xhr.status === 200) {
                    this.getRabbitsList();
                    
                }                    
                else 
                    alert('cannot update rabbit');
            }
        }
    }

    rednerHeader = () => {
        return this.state.creating === false
        ? 
            <h1 className="header">Hello, {this.state.userName}! Here is your rabbits! </h1> 
        :
            <h1 className="header">What kind of rabbit do you want?</h1>
    }

    changeHeader = () => {
        this.setState({
            creating: !this.state.creating
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.authorized ? this.renderContent() : this.renderAuthorization()}
            </React.Fragment>
        )
    }
}