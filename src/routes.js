import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Groups from './Components/Groups/Groups';
import Taskboard from './Components/Taskboard/Taskboard';

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/dashboard' component={Groups}/>
        <Route path='/taskboard' component={Taskboard}/>
    </Switch>
)