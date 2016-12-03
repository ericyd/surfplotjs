'use strict';

import React, { Component } from 'react';
import './option-group.scss';
import '../../../icon.scss';

export default class OptionGroup extends Component {
    constructor () {
        super();
        this.state = {
            isCollapsed: true
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillUnmount () {
        console.log('unmounting');
    }

    handleClick (e) {
        this.setState({ isCollapsed: !this.state.isCollapsed });
    }

    render () {
        return (
            <div className='option-group'>

                <section className='option-group__header' onClick={this.handleClick}>
                    <img src='img/icons/iconmonstr-triangle-1.svg'
                        className={['icon',
                            this.state.isCollapsed ? 'is-collapsed' : 'is-expanded'].join(' ')} />
                    {this.props.title}
                </section>

                <section className={[
                    'option-group__options',
                    this.state.isCollapsed ? 'hide' : 'show'].join(' ')}>
                    <ul>
                        {
                            this.props.options.map((option, i) => {
                                return (
                                    <li key={option}>{option}</li>
                                );
                            })
                        }
                    </ul>
                </section>

            </div>
        );
    }
}

OptionGroup.propTypes = {
    title: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired
};
