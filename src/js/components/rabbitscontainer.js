import React from 'react';

import RabbitElement from './rabbitelement'

export default class RabbitsContainer extends React.Component {
    constructor(props) {
        super(props);        
    }


    showList = () => {
        if(this.props.list.length === 0) return;
        return this.props.list.map(element => {
            return <RabbitElement 
                        key={element.id}
                        id={element.id}
                        name={element.name}
                        weight={element.weight}
                        updateRabbit={this.props.updateRabbit}
                        deleteRabbit={this.props.deleteRabbit}
                    />
        })
    }

    render() {
        return (
            <div className='div-container'>
                {this.showList()}
            </div>
        )
    }
}