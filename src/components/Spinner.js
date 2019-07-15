import React from 'react';
import styled, { keyframes } from 'styled-components';
import media from "styled-media-query";
import PropTypes from 'prop-types';

const rotate = keyframes`
    100%{
        transform: rotate(360deg);
    }
`;

const rotateReverse = keyframes`
    100%{
        transform: rotate(-360deg);
    }
`

const dash = keyframes` 
    0%{
        stroke-dasharray: 2000,2600;
        stroke-dashoffset: 0;
    }
    50%{
        stroke-dasharray: 2400,2600;
        stroke-dashoffset: -500px;
    }
    100%{
        stroke-dasharray: 2000,2600;
        stroke-dashoffset: 0;
    }
`

const dash2 = keyframes`
    0%{
        stroke-dasharray: 100,2600;
        stroke-dashoffset: -2000px;
    }
    50%{
        stroke-dasharray: 500,2600;
        stroke-dashoffset: -1000px;
    }
    100%{
        stroke-dasharray: 100,2600;
        stroke-dashoffset: -1960px;
    }
`

const SpinnerWrapper = styled.div`
    width: ${({ width }) => width ? width : '25%'};
    ${media.lessThan("large")`
        width: ${({ width }) => width ? '25%' : '50%'};
    `}
    position: relative;
    margin: 0px auto;
    div.ad15 {
        animation-duration: 1.5s;
    }
    div.ateiu {
        animation-timing-function: ease-in-out;
    }
    .overwatch-logo {
        filter:
            drop-shadow(0 0 120px rgba(255,255,255,0.15))
            drop-shadow(0 0 16px rgba(255,255,255,0.05));
            opacity: 0.8;
        }
    .circularCW,
    .circularCCW {
        height: 100%;
        transform-origin: center center;
        width: 100%;
        position: absolute;
        top: 0; bottom: 0; left: 0; right: 0;
        margin: auto;
    }
    .circularCW {
        animation: ${rotate} 2s linear infinite;
    }
    .circularCCW {
        animation: ${rotateReverse} 4s linear infinite;
    }
    .path,
    .path2,
    .path3,
    .path4,
    .path5,
    .path6,
    .path7,
    .path8 {
        stroke-linecap: square;
        stroke-width: 33;
        opacity: 0.8;
    }
    .path {
        stroke-dasharray: 1400,2600;
        stroke-dashoffset: 0;
        animation: ${dash} 3.7s ease-in-out infinite;
        opacity: 0.3;
    }
    .path2 {
        stroke-dasharray: 40,2600;
        stroke-dashoffset: -500px;
    }
    .path3 {
        stroke-dasharray: 200,2600;
        stroke-dashoffset: -700px;
    }
    .path4 {
        stroke-dasharray: 40,2600;
        stroke-dashoffset: -2000px;
        animation: ${dash2} 2.5s ease-in-out infinite;
    }
    .path5 {
        stroke-dasharray: 200,2600;
        stroke-dashoffset: 0;
    }
    .path6 {
        stroke-dasharray: 300,2600;
        stroke-dashoffset: -1000px;
    }
    .path7 {
        stroke-dasharray: 40,2600;
        stroke-dashoffset: -1200px;
    }
    .path8 {
        stroke-dasharray: 100,2600;
        stroke-dashoffset: -300px;
    }
`;

const Spinner = (props) => (
    <SpinnerWrapper {...props}>
        <svg className="overwatch-logo" viewBox="0 0 1000 1000">
        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" x="200" y="210">
            <defs></defs>
                <path d="M296.704.004c-66.766.428-132.772 24.23-184.63 66.083l56.662 65.786c47.82-37.74 112.256-53.118 172.018-41.237 32.844 6.318 64.096 20.74 90.464 41.237l56.66-65.786C434.242 22.804 365.77-1.03 296.705.004z" color="#000" fill="#fa9c1e" overflow="visible"/>
                <path d="M93.628 82.253C33.924 138.343-1.082 219.877.026 302.123c.035 85.37 38.978 169.23 103.652 224.696 59.78 52.283 141.085 78.917 220.46 72.18 86.01-6.405 167.65-52.345 218.118-122.143 49.125-66.33 68.37-153.797 52.064-234.91-11.987-62.09-44.54-119.634-90.837-162.405l-56.662 65.786c45.657 43.034 70.586 106.557 65.886 169.224-2.056 31.05-11.074 61.69-26.314 88.96L370.92 291.974 312.66 166.39l-.088 190.18 116.695 112.926c-52.002 40.402-123.353 53.802-186.578 35.894-25.744-7.18-50.122-19.23-71.31-35.398L288.87 356.57c-.206-61.831.717-128.578 0-190.383L230.52 291.974 114.058 404.437c-35.53-62.024-36.38-142.21-2.182-204.927 10.69-20.092 24.84-38.428 41.257-54.182L96.47 79.542l-2.842 2.71z" color="#000" fill="#fff" overflow="visible"/>
        </svg>
        </svg>
        <svg className="circularCW" viewBox="0 0 1000 1000">
            <circle className="path" cx="500" cy="500" r="355" stroke="#fa9c1e"  fill="none" />
        </svg>
        <svg className="circularCCW ad15" viewBox="0 0 1000 1000">
            <circle className="path2" cx="500" cy="500" r="355" stroke="#fa9c1e" fill="none" />
        </svg>
        <svg className="circularCW" viewBox="0 0 1000 1000">
            <circle className="path3" cx="500" cy="500" r="355" stroke="#fa9c1e" fill="none" />
        </svg>
        <svg className="circularCW" viewBox="0 0 1000 1000">
            <circle className="path4" cx="500" cy="500" r="355" stroke="#fa9c1e" fill="none" />
        </svg>
        <svg className="circularCW" viewBox="0 0 1000 1000">
            <circle className="path5" cx="500" cy="500" r="420" stroke="#fff" fill="none" />
        </svg>
        <svg className="circularCW" viewBox="0 0 1000 1000">
            <circle className="path6" cx="500" cy="500" r="420" stroke="#fff" fill="none" />
        </svg>
        <svg className="circularCCW" viewBox="0 0 1000 1000">
            <circle className="path7" cx="500" cy="500" r="420" stroke="#fff" fill="none" />
        </svg>
        <svg className="circularCCW ateiu" viewBox="0 0 1000 1000">
            <circle className="path8" cx="500" cy="500" r="420" stroke="#fff" fill="none" />
        </svg>
    </SpinnerWrapper>
);

Spinner.propTypes = {
    width: PropTypes.string
};

Spinner.defaultProps = {
    width: '5em'
};

export default Spinner;