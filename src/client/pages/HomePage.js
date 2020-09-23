import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; // ES6
import { fetchLaunches, filterArticles } from '../actions';
import Article from '../global/article/article';
// Limitation of Server Side rendering
// ReactDOMServer does not yet support lazy-loaded components.
// const Article = React.lazy(() => import('../global/article/article'));
import * as config from '../config/filter.json';
import * as util from '../utility/yearFilter';
// Component definition
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    // Setting up initial state so that Various filter can be applied later ...
    this.state = {
      yearFilter: null,
      successfulLaunch: null,
      successfulLanding: null,
      filterConfig: config.default,
      filterParams: {}
    };
    this.setYearFilter = this.setYearFilter.bind(this);
    this.setSuccessfulLaunch = this.setSuccessfulLaunch.bind(this);
    this.setSuccessfulLanding = this.setSuccessfulLanding.bind(this);
  }

  setYearFilter(e) {
    const value = Number(e.target.innerText);
    const filter = this.state.filterConfig;
    const mappedFilter = util.mapFilter(filter.year, value);
    filter.year = [...mappedFilter];
    this.updateState('filterConfig', filter ,{launch_year : value});
    //this.props.filterArticles(this.state.filterParams)
    //launch_success=true&land_success=true

  }

  // Below both the function can be combined into one function
  // for better code splitting and redability
  setSuccessfulLaunch(e) {
    const value = e.target.innerText.toLowerCase();
    const filter = this.state.filterConfig;
    const launchFilter = util.launchFilter(filter.launch, value);
    filter.launch = [...launchFilter];
    //this.props.filterArticles(this.state.filterParams)
    this.updateState('filterConfig', filter, {launch_success : value});
  }

  setSuccessfulLanding(e) {
    const value = e.target.innerText.toLowerCase();
    const filter = this.state.filterConfig;
    const landFilter = util.landFilter(filter.land, value );
    filter.land = [...landFilter];
    //this.props.filterArticles(this.state.filterParams)
    this.updateState('filterConfig', filter, {land_success : value});
  }

  updateState(key, value, filterParams) {
    this.setState(
      {
        [key]: { ...value },
        filterParams : {...this.state.filterParams, ...filterParams }
      },
      () => {
        console.log('year filter ');
        this.props.filterArticles(this.state.filterParams)
      }
    );
  }

  // defining functions here
  componentDidMount() {
    const { fetchLaunches: loadArticles } = this.props;
    loadArticles('initial load');
  }

  render() {
    const localConfig = this.state.filterConfig;
    return (
      // Actual container starts from here
      <div className="row dsdsd main-wrapper">
        <div>
          <section className="section">
            <h3 className="space-title">SpaceX Launch Programs</h3>
          </section>

          <div className="app_wrapper">
            <aside className="bg-white sidepane">
              <h4 className="heading">Filters</h4>
              <section className="filter-container">
                <h5>Launch Year</h5>
                <hr />
                {/* we can avoid registering multiple event listner here */}
                {/* And hence attached listner to parent  */}
                {/* Taking advantages of event bubbling */}
                <ul
                  className="filter-items-container"
                  onClick={(e) => this.setYearFilter(e, 'filter_year')}
                >
                  {localConfig.year.map((c) => (
                    <li
                      key={`filter_year_${c.year.toString().toUpperCase()}`}
                      className={c.active ? 'active-filter' : ''}
                    >
                      {c.year}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="filter-container">
                <h5>Successful Launch</h5>
                <hr />
                <ul className="filter-items-container" onClick={(e) => this.setSuccessfulLaunch(e)}>
                  {localConfig.launch.map((c) => (
                    <li key={`filter_years_${c.id}`} className={c.active ? 'active-filter' : ''}>
                      {c.launch.toString().toUpperCase()}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="filter-container">
                <h5>Successful Landing</h5>
                <hr />
                <ul
                  className="filter-items-container"
                  onClick={(e) => this.setSuccessfulLanding(e)}
                >
                  {localConfig.land.map((c) => (
                    <li key={`filter_yedar_${c.id}`} className={c.active ? 'active-filter' : ''}>
                      {c.launch.toString().toUpperCase()}
                    </li>
                  ))}
                </ul>
              </section>
            </aside>
            <section className="content-section">
              <div className="row">
                <Article articles={this.props.articles} />
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    articles: state.articles,
  };
};

const loadData = (store) => {
  // For the connect tag we need Provider component but on the server at this moment app is not rendered yet
  // So we need to use store itself to load data
  return store.dispatch(fetchLaunches()); // Manually dispatch a network request
};

HomePage.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.any),
  fetchLaunches: PropTypes.func,
  filterArticles: PropTypes.func,
};

HomePage.defaultProps = {
  articles: [],
  fetchLaunches: null,
  filterArticles: null,
};

export default {
  component: connect(mapStateToProps, { fetchLaunches, filterArticles })(HomePage),
  loadData,
};
