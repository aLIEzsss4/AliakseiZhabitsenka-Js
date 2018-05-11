import * as React from 'react';
import {Link} from 'react-router-dom';
const s: {[props: string]: string} = require('./Card.css');

class newComponent extends React.Component {
  public render() {
    return (
      <Link to={`/single/id`} className={s.cardWrapper}>
        <div className={s.card} />
        <div className={s.cardHover}>Title</div>
      </Link>
    );
  }
}

export default newComponent