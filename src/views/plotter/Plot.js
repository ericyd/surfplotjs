'use strict';

import React, { Component } from 'react';
import vis from 'vis';
import mathjs from 'mathjs';
import './plot.scss';

export default class Plot extends Component {
    constructor () {
        super();
        this.plot = this.plot.bind(this);
    }

    componentDidMount () {
        this.plot(this.props.eq);
    }

    shouldComponentUpdate (nextProps) {
        console.log(`shouldPlotUpdate = ${nextProps.eq !== this.props.eq}, ` +
            `new EQ: ${nextProps.eq}, old EQ: ${this.props.eq}`);
        if (nextProps.eq !== this.props.eq) {
            return true;
        }
        return false;
    }

    componentDidUpdate () {
        this.plot(this.props.eq);
    }

    plot (eq) {
        // Create and populate a data table.
        const data = new vis.DataSet();
        // create some nice looking data with sin/cos
        let counter = 0;
        const steps = 50;  // number of datapoints will be steps*steps
        const axisMax = 10;
        const axisStep = axisMax / steps;
        // compile once, evaluate for each point
        const compiledEQ = mathjs.compile(eq);
        for (let x = 0; x < axisMax; x += axisStep) {
            for (let y = 0; y < axisMax; y += axisStep) {
                const value = compiledEQ.eval({ x: x, y: y });
                data.add({
                    id: counter++,
                    x: x,
                    y: y,
                    z: value,
                    style: value
                });
            }
        }

        // specify options
        const options = {
            width: '500px',
            height: '552px',
            style: 'surface',
            showPerspective: true,
            showGrid: true,
            showShadow: false,
            keepAspectRatio: true,
            verticalRatio: 0.5
        };

        // Instantiate our graph object.
        const container = document.getElementById('plot');
        /*eslint no-unused-vars: "off" */
        const graph3d = new vis.Graph3d(container, data, options);
    }

    render () {
        return (
            <div className='plot' id='plot' />
        );
    }
}

Plot.propTypes = {
    eq: React.PropTypes.string.isRequired
};
