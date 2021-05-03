import React, {useEffect, useState} from "react";
import cx from 'classnames';
import {Scatter, G2} from '@ant-design/charts';

import './styles.scss';

import {ScatterChart} from 'react-chartkick';
import {EWorlds, IMinecraftCoordinate} from "../../../api/CoordinatesTypes";
import CoordinatesAPI from "../../../api/CoordinatesAPI";
import {StringUtils} from "../../../global/utils/string";
import WorldIcon from "../WorldIcon/WorldIcon";
import XYZList from "../XYZList/XYZList";

function Map() {
    const [coordinates, setCoordinates] = useState<IMinecraftCoordinate[]>([]);
    const [world, setWorld] = useState<EWorlds>(EWorlds.Overworld);

    async function getCoordinates(params?: any) {
        let coordinates = await CoordinatesAPI.getAllCoordinates(params);
        if (coordinates) {
            setCoordinates(coordinates);
        }
    }

    useEffect(() => {
        getCoordinates({world});
    }, [])

    function onWorldChange(world) {
        setWorld(world);
        getCoordinates({world});
    }

    let config = {
        key: world,
        appendPadding: 30,
        data: coordinates,
        xField: 'x',
        yField: 'z',
        pointStyle: {fillOpacity: 1, fill: '#5d84e4', stroke: 'transparent', r: 6},
        yAxis: {
            nice: true,
            line: {style: {stroke: '#aaa'}},
        },
        tooltip: {
            showMarkers: false,
            fields: ['x', 'z'],
            customContent: (title, items) => {
                console.log('items', items);
                if (items[0]) {
                    let data = items[0].data;
                    return (
                        <div className='tooltip-container'>
                            <div className='name'>{data.name}</div>
                            <XYZList coordinate={data}/>
                        </div>
                    )
                }
            }
        },
        xAxis: {
            grid: {line: {style: {stroke: '#eee'}}},
            line: {style: {stroke: '#aaa'}},
        },
    };


    return (
        <div className='coordinate-map'>
            <div className='worlds'>
                {Object.keys(EWorlds).map(key => {
                    let curWorld = EWorlds[key]
                    return (
                        <div key={curWorld} className={cx('world', {selected: world === curWorld})}
                             onClick={() => onWorldChange(curWorld)}>
                            <WorldIcon world={curWorld} style={{width: 20, marginRight: 9}}/>
                            {StringUtils.camelCaseToRegular(curWorld, false, true)}
                        </div>
                    )
                })}
            </div>
            <Scatter {...config} />
        </div>
    )
}

export default Map;