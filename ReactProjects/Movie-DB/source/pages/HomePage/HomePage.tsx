import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import {IHomePageProps, IHomePageState} from './HomePage.types';
import Card from './components/Card/Card';
import {ICardContent} from './components/Card/Card.types';
import getUniqKey from './../../common-helper-functions/getUniqKey';
const s: {[props: string]: string} = require('./HomePage.css');

class HomePage extends React.PureComponent<IHomePageProps, IHomePageState> {
  state: IHomePageState = {
    page: 1
  }

  render() {
    const cardsContent = [
      {
        title: 'test',
        id: 0
      },
      {
        title: 'test1',
        id: 1
      },
      {
        titel: 'test2',
        id: 2
      }
    ];
    return (
      <div className={s.wrapper}>
        <div className={s.row}>
          <div className={s.upbtnCol}>
            <button className={s.upbtn} />
          </div>
          <div className={s.cardsGridCol}>
            <div className={s.cardsGrid}>
              {typeof cardsContent === 'string' ?
                <div className={s.noCards}>{cardsContent}</div> :
                cardsContent.map(content => <Card key={getUniqKey()}>{content}</Card>)
              }
            </div>
            <div className={s.pagination}>pagination</div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage