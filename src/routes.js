import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './pages/main';
import Serie from './pages/serie';
import AddSerie from './pages/createItem';

const Routes = () => (
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/series/:id" component={Serie} />
            <Route path="/series-status/:status" component={Main}/>
            <Route path="/series-search/:title" component={Main}/>
            <Route path="/series-create" component={AddSerie} />
        </Switch>
);

export default Routes;