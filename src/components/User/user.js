import React, { Component } from "react";
import Gallery from "../Gallery";
import EditUser from "./EditUser";
import Avatar from "@material-ui/core/Avatar";
import Edit from "@material-ui/icons/Edit";

import "./profile.css";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      first_name: "",
      last_name: "",
      profileblurb: "",
      contactlinks: "",
      avatarurl: "",
      created_at: "",
      editHidden: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log("THIS SHOULD BE HIDDEN");
    this.setState({ editHidden: !this.state.editHidden });
    console.log(this.state);
  }

  componentDidMount(req, res) {
    fetch(`http://localhost:8080/users/${this.props.match.params.id}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          username: data.username,
          first_name: data.first_name,
          last_name: data.last_name,
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
      <div className="profile-container">
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
                <p>{data.contactlinks}</p>
                {localStorage.userId === this.props.match.params.id ? (
                  <div className="edit-holder">
                    <Edit onClick={this.handleChange} />
                    <div className="edit-div" style={style}>
                      <EditUser />
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
            <Gallery />
          </div>
        </div>
      </div>
    );
  }
}

export default User;
