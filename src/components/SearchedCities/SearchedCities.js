import React from 'react';
import Wrapper from './SearchedCities.module.css';
/* eslint eqeqeq: 0 */
const SearchedCities = (props) => {
    let keys = Object.keys(props.cities);

    function convertTimestamp(timestamp) {
        var d = new Date(timestamp * 1000),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;
    
        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }
    
        // ie: 2014-03-24, 3:00 PM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
        return time;
    }

    function renderCityData() {
        let returnValue = [];
        for(let i=0; i<props.cities.length; i++) {
            let parsedObj = JSON.parse(props.cities[keys[i]]);
            returnValue.push(
                <div>                    
                    <p>City: {parsedObj.name},
                    Temperature in {parsedObj.unit}: {parsedObj.main.temp},
                    Date Searched: {convertTimestamp(parsedObj.dt)}</p>
                </div>
            )
        }
        return returnValue;
    }
    function handleClearRecent() {
        localStorage.clear();
    }

    return (
        <div className={Wrapper}>
            {
            props.cities.length > 0 ? 
                <div>
                    <p><strong>Recently Searched Cities </strong><button id="clear" type="clear" onClick={handleClearRecent}>Clear</button></p>
                    {renderCityData()}
                </div>
            : null
            }
        </div>
    );
    // return null;
}

export default SearchedCities;