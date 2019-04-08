import React from 'react';

export default class RabbitCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            name: '',
            weight: null
        }
    }

    handleOpenForm = () => {
        this.setState({
            showForm: !this.state.showForm
        })
        this.props.changeHeader();
    }

    handleCreation = () => {
        this.props.createRabbit(this.state.name, this.state.weight);
        this.handleOpenForm();
    }

    renderRabbitCreator = () => {
        if(this.state.showForm) return (
            <form>
                <input className="input"
                       type='text' 
                       name='rabbitName' 
                       placeholder='Name your rabbit'
                       onChange={(e) => {this.setState({name: e.target.value})}}
                />
                <input className="input"
                       type='number' 
                       name='rabbitWeight'
                       placeholder='Weight'
                       onChange={(e) => {this.setState({weight: e.target.value})}}
                />
                <button className="btn btn-half"  type='button'
                  onClick={this.handleOpenForm}
                >
                    Cancel  
                </button>
                <button className="btn btn-half" type='button'
                        onClick={this.handleCreation}
                >
                    Create
                </button>
                
            </form>
        )
        else return (
            <button className="btn btn-full" onClick={this.handleOpenForm}> 
                Get another one!
            </button>
        )
    }


    

    render() {
        return (
            <div className="div-creator">
                {this.renderRabbitCreator()}
            </div>
            
        )
    }
}