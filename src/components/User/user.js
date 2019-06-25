import React, { Component } from "react";
import Gallery from "../Gallery";
import UserGallery from "./userGallery";
import EditUser from "./EditUser";
import Avatar from "@material-ui/core/Avatar";

import "./profile.css";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      profileblurb: "",
      contactlinks: "",
      avatarurl: "",
      created_at: "",
      editHidden: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ editHidden: !this.state.editHidden });
  }

  componentDidMount(req, res) {
    fetch(`http://localhost:8080/users/${this.props.match.params.id}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          username: data.username,
          profileblurb: data.profileblurb,
          contactlinks: data.contactlinks,
          avatarurl: data.avatarurl,
          created_at: data.created_at,
          editHidden: true
        });
      });
  }
  render() {
    const data = this.state;
    const style = this.state.editHidden === true ? { display: "none" } : {};

    return (
      <div className="container">
        <div className="profile-cover" />
        <div className="profile-content">
          <div className="user-head">
            <Avatar
              alt="default"
              src="https://i.imgur.com/tbaa3Y7.png"
              style={{
                height: 100,
                width: 100,
                zIndex: 1,
                marginRight: "25px"
              }}
            />
            <div
              className="glitch"
              data-text={`${data.username}`}
              id="user-glitch"
            >
              {data.username}
              <div className="date-info">join date: {data.created_at}</div>
              <div className="user-blurb">
                <p>{data.profileblurb}</p>
                {localStorage.userId === this.props.match.params.id ? (
                  <div className="edit-holder">
                    <div onClick={this.handleChange}>wharglbargl</div>
                    <div className="edit-div" style={style}>
                      <EditUser profileblurb={this.props.profileblurb} />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="user-gallery">
          <div className="glitch" data-text="UPLOADS" id="uploads-header">
            UPLOADS
          </div>
          <div className="user-uploads">
            <UserGallery />
          </div>
        </div>
      </div>
    );
  }
}

export default User;
