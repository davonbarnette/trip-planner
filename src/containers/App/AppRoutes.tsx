import React from 'react';
import { Route } from "react-router-dom";
import { LayoutOutlined } from '@ant-design/icons';

import { BrowserRoutes } from "../../stores/App/BrowserRouter";
import TripsContainer from "../TripsContainer/TripsContainer";


export const AppRoutesObject = {
    'Trips': {
        render: <Route key={0} path={BrowserRoutes.trips} component={TripsContainer}/>,
        path: BrowserRoutes.trips,
        icon: <LayoutOutlined/>
    },
};