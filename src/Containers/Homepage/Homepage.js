import React from "react";
import { GoogleLogout } from "react-google-login";
import { withStyles } from "@material-ui/core/styles";
import { withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { authActions } from "../../Store/Actions/authActions";
import SearchBar from "../../Components/SearchBar/SearchBar";
import customAxios from "../../Helpers/customAxios";
import { API_PATH } from "../../api";
import SelectionOptions from "../../Components/SelectionOptions/SelectionOptions";
import arrayToObjectKeyByID from "../../Helpers/arrayToObjectKeyByID";
import Book from "../Book/Book";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 5,
    margin: "0 auto"
  }
});

class Homepage extends React.Component {
  state = {
    timeoutId: null,
    searchInputText: "",
    isSearchingTasks: false,
    isLoadingBooks: false,
    searchedBooksByName: [],
    searchedBooksByISBN: {},
    searchBy: "NAME"
  };
  logout = () => {
    this.props.logout();
  };

  modifyDataByType = (type, data) => {
    if (type === "NAME") {
      let searchedBooksByName = [];
      searchedBooksByName =
        data.data.docs.length > 0 &&
        arrayToObjectKeyByID(data.data.docs, "key");
      return searchedBooksByName;
    } else {
      let searchedBooksByISBN = {};
      searchedBooksByISBN =
        Object.keys(data.data).length > 0 &&
        data.data[`ISBN:${this.state.searchInputText.trim()}`];
      return searchedBooksByISBN;
    }
  };

  searchBooks = (type, searchUrl) => {
    this.setState({
      isLoadingTasks: true
    });
    customAxios
      .get(searchUrl)
      .then(response => {
        if (type === "NAME") {
          let searchedBooksByName = this.modifyDataByType(type, response);
          this.setState({
            searchedBooksByName: searchedBooksByName,
            isLoadingTasks: false
          });
        } else {
          let searchedBooksByISBN = this.modifyDataByType(type, response);
          this.setState({
            searchedBooksByISBN: searchedBooksByISBN,
            isLoadingTasks: false
          });
        }
      })
      .catch(error => {
        this.setState({
          isLoadingTasks: false,
          searchedBooksByName: [],
          searchedBooksByISBN: {}
        });
      });
  };
  searchInpChange = event => {
    this.setState({
      isSearchingTasks: true
    });
    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId);
    }
    const newValue = event.target.value;
    const latestTimeoutId = setTimeout(() => {
      let searchString = "",
        searchUrl = "";
      if (this.state.searchBy === "NAME") {
        searchString = this.state.searchInputText.trim().replace(/\s/g, "+");
        searchUrl = `${API_PATH.BASE_URL}/search.json?q=${searchString}`;
      } else {
        // 1903773172
        searchString = this.state.searchInputText.trim();
        searchUrl = `${
          API_PATH.BASE_URL
        }/api/books?bibkeys=ISBN:${searchString}&format=json&jscmd=data`;
      }
      this.searchBooks(this.state.searchBy, searchUrl);
    }, 600);
    this.setState({
      timeoutId: latestTimeoutId,
      searchInputText: newValue
    });
  };
  handleSelectionChange = event => {
    this.setState({
      searchBy: event.target.value,
      searchedBooksByName: [],
      searchedBooksByISBN: {},
      searchInputText: ""
    });
  };

  render() {
    let res = null;
    // 1903773172
    if (this.state.isLoadingTasks) {
      return <p>Loading Books</p>;
    }
    if (this.state.searchBy === "NAME") {
      res =
        Object.values(this.state.searchedBooksByName).length > 0 ? (
          Object.values(this.state.searchedBooksByName).map((ele, index) => {
            return (
              <Book
                key={index}
                bookData={ele}
                type={this.state.searchBy}
                author={
                  ele.author_name !== undefined ? (
                    <p>{ele.author_name[0]}</p>
                  ) : null
                }
              />
            );
          })
        ) : (
          <div>No results available</div>
        );
    } else {
      res =
        Object.keys(this.state.searchedBooksByISBN).length > 0 ? (
          <Book
            bookData={this.state.searchedBooksByISBN}
            type={this.state.searchBy}
            author={
              this.state.searchedBooksByISBN.authors !== undefined ? (
                <p>{this.state.searchedBooksByISBN.authors[0].name}</p>
              ) : null
            }
          />
        ) : (
          <div>No results available</div>
        );
    }

    return (
      <div>
        <span>This is homepage</span>
        <GoogleLogout
          clientId="1050022347099-jpa77cn3uafbqsnh79n9ktlnjh22ra40.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={this.logout}
        />
        <SearchBar
          searchInpChange={this.searchInpChange}
          searchInputText={this.state.searchInputText}
        />
        <SelectionOptions
          handleSelectionChange={this.handleSelectionChange}
          value={this.state.searchBy}
        />
        {res}
      </div>
    );
  }
}

var mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authActions.logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withTheme()(withStyles(styles)(Homepage)));
