import React from 'react';

export default class RabbitElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updating: false,
            name: this.props.name,
            weight: this.props.weight
        }
    }

    openUpdateForm = () => {
        this.setState({
            updating: !this.state.updating
        })
    }

    handleUpdate = () => {
        this.props.updateRabbit(this.props.id, this.state.name, this.state.weight, this.openUpdateForm);
    }


    handleDelete = () => {
        this.props.deleteRabbit(this.props.id, this.state.name, this.state.weight);
    }

    renderRabbit = () => {
        return (
        <div className='div-element'
                id={this.props.id}
        >
            <div className="div-element-info">Name: {this.props.name}</div> 
            <div className="div-element-info">Weight: {this.props.weight}</div>
            <button className="btn btn-half btn-small"
                    onClick={this.openUpdateForm}             
            > 
                Update Rabbit
            </button>
            <button className="btn btn-half btn-small"
                    onClick={this.handleDelete}
            >
                Delete
            </button>
        </div>
        )
    }

    

    renderRabbitUpdate = () => {
        return (
        <form className="form-update">
            <input  className="input"
                    type='text' 
                    name='rabbitName' 
                    placeholder='Name your rabbit'
                    defaultValue={this.props.name}
                    onChange={(e) => {this.setState({name: e.target.value})}}
            />
            <input  className="input"
                    type='number' 
                    name='rabbitWeight'
                    placeholder='Weight'
                    defaultValue={this.props.weight}
                    onChange={(e) => {this.setState({weight: e.target.value})}}
            />
            <button className="btn btn-half btn-small" 
                    type='button'
                    onClick={this.openUpdateForm}
            >
                Cancel  
            </button>
            <button className="btn btn-half btn-small"
                    type='button'
                    onClick={this.handleUpdate}
            >
                Update
            </button>
        </form>
        )
    }

    render() {
        return (
            <React.Fragment>
                {this.state.updating ? this.renderRabbitUpdate() : this.renderRabbit()}
            </React.Fragment>
        )
    }
}