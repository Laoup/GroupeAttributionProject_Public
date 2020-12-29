import React, { Component } from 'react';
import './index.scss';

import InscriptionForm from '../../organisms/InscriptionForm';

import { connect } from 'react-redux';
import { addXsrfToken } from '../../store/reducers';
import http from '../../axiosHttpConfig';

class HomeTemplate extends Component {
  handleClick = async () => {
    try {
    let answer = await http.get("/admin/get-promos",
      { withCredentials: true,
        headers: {
          'x-xsrf-token': this.props.store_xsrfToken
        }
      }
    );
    console.log("answer = ");
    console.log(answer);
    }
    catch (e) {
      console.log(e);
    }
  }

  render() {
    //<button onClick={this.handleClick} >test request</button>
    return (
      <>
        <main className="home-template-main">
          <InscriptionForm />
        </main>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  store_xsrfToken: state.xsrfToken
});

const mapDispatchToProps = {
  addXsrfToken
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeTemplate);
