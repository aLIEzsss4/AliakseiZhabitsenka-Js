import * as React from 'react';
import {Link} from 'react-router-dom';
import {ISidebarState} from './Sidebar.types';
const s: {[props: string]: string} = require('./Sidebar.css');

class Sidebar extends React.PureComponent<null, ISidebarState> {
  state: ISidebarState = {
    opened: true
  }

  close = () => {
    this.setState({opened: false});
  }
  open = () => {
    this.setState({opened: true});
  }

  getSidebarClass = () => {
    let sidebarClass = s.sidebar;
    this.state.opened ?
      sidebarClass += ' '+s.sidebarOpened :
      sidebarClass += ' '+s.sidebarClosed;
    return sidebarClass;
  }

  render() {
    return (
      <div className={this.getSidebarClass()}>
        <div className={s.content}>
          <div className={s.top}>
            <div className={s.toggleIconWrapper}>
              {this.state.opened ?
                <span onClick={this.close} className={`${s.closeIcon} ${s.toggleIcon}`} /> :
                <span onClick={this.open} className={`${s.openIcon} ${s.toggleIcon}`}/>}
            </div>
            <Link to='/home'>
              <div className={s.logo}>
                <div className={s.logoIcon} />
                <div className={s.logoText}><span>Movie</span> <span>House</span></div>
              </div>
            </Link>
          </div>
          <div className={s.pagesNav}>
            <Link to='/home/movie' className={s.pageLink}>
              <span className={`${s.movieIcon} ${s.pageIcon}`} />
              <span className={s.pageText}>Movie</span>
            </Link>
            <Link to='/home/tvshow' className={s.pageLink}>
              <span className={`${s.tvshowIcon} ${s.pageIcon}`} />
              <span className={s.pageText}>TV Show</span>
            </Link>
            <Link to='/home/library' className={s.pageLink}>
              <span className={`${s.libraryIcon} ${s.pageIcon}`} />
              <span className={s.pageText}>My Library</span>
            </Link>
            <Link to='/support' className={s.pageLink}>
              <span className={`${s.supportIcon} ${s.pageIcon}`} />
              <span className={s.pageText}>Support</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar