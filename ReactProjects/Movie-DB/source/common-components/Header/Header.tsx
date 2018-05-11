import * as React from 'react';
import {Link} from 'react-router-dom';
const s: {[props: string]: string} = require('./Header.css');

class Header extends React.PureComponent {
  public render() {
    return (
      <div className={s.header}>
        <div className={s.row}>
          <div className={s.searchCol}>
            <form>
              <div className={s.search}>
                <button className={s.searchBtn}></button>
                <input className={s.searchInput} placeholder='Search...' />
              </div>
            </form>
          </div>
          <div className={s.navCol}>
            <div className={s.nav}>
              <Link className={s.link} to='/add-movie'>Add Movie</Link>
              <Link className={s.link} to='/about'>About</Link>
              <Link className={s.link} to='/pricing'>Pricing</Link>
              <Link className={s.link} to='/blog'>Blog</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header