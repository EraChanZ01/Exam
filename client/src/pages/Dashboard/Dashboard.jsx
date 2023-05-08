import React from 'react';
import { connect } from 'react-redux';
import CONSTANTS from '../../constants';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
import ModeratorDashboard from '../../components/ModeratorDashboard/ModeratorDashboard'
import Header from '../../components/Header/Header';
import { Redirect } from 'react-router-dom';

const Dashboard = props => {
  const { data: { role }, history, error } = props;
  return (

    <div>
      {error ? <Redirect to="/login" /> :
        <>
          <Header />
          {role === CONSTANTS.CUSTOMER ? (
            <CustomerDashboard history={history} match={props.match} />
          ) : (
            role === CONSTANTS.MODERATOR ? (
              <ModeratorDashboard history={history} match={props.match}/>
            ) : (
              <CreatorDashboard history={history} match={props.match} />
            )
          )}
        </>
      }
    </div>
  );
};
const mapStateToProps = (state) => {
  return { ...state.userStore }
}

export default connect(mapStateToProps)(Dashboard);
