import React from 'react';
import ProductContainer from './containers/ProductContainer';
import NotFound from './components/404';
import { BrowserRouter, Route, Switch} from 'react-router-dom';



function App() {
  return (
      <BrowserRouter>
      <Switch>
       <Route exact path="/" render={() => (<ProductContainer />)}/>
       <Route component={NotFound} />
       </Switch>
       </BrowserRouter>
  );
}

export default App;
