import * as React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import HomePage from './../../pages/HomePage/HomePage';
import SupportPage from './../../pages/SupportPage/SupportPage';
import AddMoviewPage from './../../pages/AddMoviewPage/AddMoviewPage';
import AboutPage from './../../pages/AboutPage/AboutPage';
import PricingPage from './../../pages/PricingPage/PricingPage';
import BlogPage from './../../pages/BlogPage/BlogPage';
import Sidebar from './../../common-components/Sidebar/Sidebar';
import Header from './../../common-components/Header/Header';
const s: {[props: string]: string} = require('./MainWrapper.css');

class newComponent extends React.PureComponent {
  public render() {
    return (
      <React.Fragment>
        <div className={s.row}>
          <div className={s.sidebarCol}>
            <Sidebar />
          </div>
          <div className={s.mainCol}>
            <Header />
            <Switch>
              <Route exact path='/home' component={HomePage} />
              <Route exact path='/home/:category' component={HomePage} />
              <Route exact path='/support' component={SupportPage} />
              <Route exact path='/add-movie' component={AddMoviewPage} />
              <Route exact path='/about' component={AboutPage} />
              <Route exact path='/pricing' component={PricingPage} />
              <Route exact path='/blog' component={BlogPage} />
              <Redirect from='/' to='/home' />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default newComponent