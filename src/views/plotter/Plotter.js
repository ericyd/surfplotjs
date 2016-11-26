'use strict';

import React, { Component } from 'react';
import FunctionBar from './functions/FunctionBar';
import OptionBar from './options/OptionBar';
import Plot from './Plot';
import './plotter.scss';

export default class Plotter extends Component {
    constructor () {
        super();
        this.state = {
            isFunctionBarCollapsed: true,
            isOptionBarCollapsed: true,
            functions: [
                {
                    value: 'cos(x)-sin(y)'
                }
            ]
        };

        this.handleSidebarToggle = this.handleSidebarToggle.bind(this);
        this.addFunction = this.addFunction.bind(this);
    }

    componentWillMount () {
        // if this.props.initialState is not empty, set as original state
        if (Object.keys(this.props.initialState).length !== 0 && this.props.initialState.constructor === Object) {
            this.setState(this.props.initialState);
        }
    }

    componentWillUnmount () {
        // save the state in the parent before it unmounts so it is still here when it returns
        this.props.handleUnmount(this.state);
    }

    handleSidebarToggle (e) {
        switch (e.target.name) {
            case 'functionBarToggle':
                this.setState({ isFunctionBarCollapsed: !this.state.isFunctionBarCollapsed });
                break;

            case 'optionBarToggle':
                this.setState({ isOptionBarCollapsed: !this.state.isOptionBarCollapsed });
                break;

            default:
                break;
        }
    }

    addFunction () {
        const functions = this.state.functions;
        functions.push({ value: '' });
        this.setState({
            functions: functions
        });
    }

    render () {
        return (
            <div className='plotter'>
                <button type='button'
                    name='functionBarToggle'
                    onClick={this.handleSidebarToggle}
                    className='toggleButton left'>
                    Toggle the FunctionBar
                </button>
                <FunctionBar
                    isCollapsed={this.state.isFunctionBarCollapsed}
                    functions={this.state.functions}
                    addFunction={this.addFunction}
                    />

                <button type='button'
                    name='optionBarToggle'
                    onClick={this.handleSidebarToggle}
                    className='toggleButton right'>
                    Toggle the OptionBar
                </button>
                <OptionBar isCollapsed={this.state.isOptionBarCollapsed} />

                <Plot />
            </div>
        );
    }
}

Plotter.propTypes = {
    handleUnmount: React.PropTypes.func.isRequired,
    initialState: React.PropTypes.object.isRequired
};
