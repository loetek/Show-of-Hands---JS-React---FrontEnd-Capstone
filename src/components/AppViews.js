import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Button
} from 'reactstrap';
import LandingPageInst from "./landingPage/LandingPageInst"
import LandingPageStu from "./landingPage/LandingPageStu"
import DataManager from "../modules/DataManager"
import LoginManager from "../modules/LoginManager";
import Login from './logins/LoginList';
import Registration from "./logins/Registration"


export default class AppViews extends Component {
    isAuthenticated = () => sessionStorage.getItem("user") !== null
    state = {
        agendas:[],
        users:[],
        links:[],
        userId: sessionStorage.getItem("user")
    }

    //!! ADD schtuff area !!//
    addUser = newUser =>
    LoginManager.post(newUser)
      .then(() => LoginManager.getAll())
      .then(user =>
        this.setState({
          users: user
        })
      );

    //!! Data Fetch Calls !!///////



    //!! Component Did Mount !!////

componentDidMount() {

    DataManager.DataManager({
    "dataSet" : "agendas",
    "fetchType" : "GET"
    })
    .then(r => {
        this.setState({
            agendas: r
        })
    })
    DataManager.DataManager({
    "dataSet" : "users",
    "fetchType" : "GET"
    })
    .then(r => {
        this.setState({
            users: r
        })
    })
    DataManager.DataManager({
    "dataSet" : "links",
    "fetchType" : "GET"
    })
    .then(r => {
        this.setState({
            links: r
        })
    })

    }

    verifyUser = (username, password) => {
        LoginManager.getUsernameAndPassword(username, password)
          .then(allUsers => this.setState({
            users: allUsers
          })
          )
      }

    render() {
        return (
          <React.Fragment>
            <Route
              exact path="/" render={props => {
                return <Login {...props}
                handleLogin={this.handleLogin}
                verifyUser={this.verifyUser}
                users={this.state.users} />
              }}
            />
            <Route
             exact path="/login/new" render={(props) => {
            return <Registration {...props}
            users={this.state.users}
            addUser={this.addUser}
            userId={this.state.userId} />
        }} />
            <Route
              exact path="/LPInst" render={props => {
              return (
                <LandingPageInst {...props} LandingPageAgenda={this.state.agendas} />
                     );
              }}
            />
            <Route
              exact path="/LPStu" render={props => {

                return( <LandingPageStu {...props} LandingPageStu={this.state.agendas} />
                );
                }}
            />
          </React.Fragment>
        );
      }


}

