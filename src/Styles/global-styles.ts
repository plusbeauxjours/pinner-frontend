import { createGlobalStyle } from "./typed-components";
import reset from "styled-reset";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

const GlobalStyles = createGlobalStyle`
    
    ${reset};
    * {
        box-sizing: border-box;
    }
    body{
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, 'Qwigley';
        background-color: ${props => props.theme.bgColor};
        color: ${props => props.theme.color};
        font-size: 12px;
        font-weight: 0
    }
    a{ 
        color:inherit;
        text-decoration:none;
    }
    input, textarea, button{
        background-color: ${props => props.theme.bgColor};
        &:active,
        &:focus{
            outline:none;
        }
    }
    svg{
        fill: ${props => props.theme.color};
    }
    h1,h2,h3,h4,h5,h6{
        font-family: 'Maven Pro', sans-serif;
    }
    .pac-container {
        border-radius: 0 0 5px 5px;
        z-index: 10;
        background-image: none;
        font-size: 1px;
        color: red;
    }
    .pac-item-query {
        color: red;
    }
    .pac-item {
        padding: 20px;
    }
    /* .DateRangePicker_picker {
        background-color: red;
        color: red;
        z-index: 10;
    }
    .DateRangePicker_picker__portal {
        background-color: red;
        color: red;
        z-index: 10;
    } */
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }

    `;

export default GlobalStyles;
