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
import Avatar from "@material-ui/core/Avatar";
import Loader from "../../Components/Loader/Loader";
import MetaTags from "react-meta-tags";

// Homepage where user lands when logged in
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    width: "100%",
    height: "inherit",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    "& button": {
      borderRadius: "25px !important",
      width: 100
    },
    "& button span": {
      margin: "auto"
    }
  },
  homepageText: {
    color: "white",
    fontFamily: "UbuntuMedium",
    textTransform: "capitalize",
    fontWeight: 600
  },
  logoButtonBox: {
    display: "flex",
    width: "90%",
    justifyContent: "space-between",
    marginTop: 20,
    height: 55
  },
  googleLogoutButton: {
    color: theme.palette.primary.main,
    fontFamily: "UbuntuMedium",
    fontSize: 13,
    margin: "auto"
  },
  avatar: {
    margin: "0px 10px"
  },
  logoNameBox: {
    display: "flex",
    alignItems: "center"
  },
  booksBox: {
    width: "95%",
    marginTop: 20,
    overflowY: "auto",
    height: "inherit"
  },
  noResultText: {
    fontFamily: "UbuntuMedium",
    color: "white"
  }
});

class Homepage extends React.Component {
  state = {
    timeoutId: null,
    searchInputText: "",
    isSearchingBooks: false,
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
      isLoadingBooks: true
    });
    customAxios
      .get(searchUrl)
      .then(response => {
        if (type === "NAME") {
          let searchedBooksByName = this.modifyDataByType(type, response);
          this.setState({
            searchedBooksByName: searchedBooksByName,
            isLoadingBooks: false
          });
        } else {
          let searchedBooksByISBN = this.modifyDataByType(type, response);
          this.setState({
            searchedBooksByISBN: searchedBooksByISBN,
            isLoadingBooks: false
          });
        }
      })
      .catch(error => {
        this.setState({
          isLoadingBooks: false,
          searchedBooksByName: [],
          searchedBooksByISBN: {}
        });
      });
  };
  searchInpChange = event => {
    const newValue = event.target.value;
    newValue !== ""
      ? this.setState({
          isSearchingBooks: true
        })
      : this.setState({
          isSearchingBooks: false
        });

    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId);
    }

    const latestTimeoutId = setTimeout(() => {
      let searchString = "",
        searchUrl = "";
      if (this.state.searchBy === "NAME") {
        searchString = this.state.searchInputText.trim().replace(/\s/g, "+");
        searchUrl = `${API_PATH.BASE_URL}/search.json?q=${searchString}`;
      } else {
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
      searchInputText: "",
      isLoadingBooks: false,
      isSearchingBooks: false
    });
  };

  render() {
    let res = null;
    const { classes } = this.props;
    if (this.state.isSearchingBooks) {
      if (this.state.isLoadingBooks) {
        res = <Loader />;
      } else if (this.state.searchBy === "NAME") {
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
            <span className={classes.noResultText}>No results available</span>
          );
      } else if (this.state.searchBy === "ISBN") {
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
            <span className={classes.noResultText}>No results available</span>
          );
      }
    }

    return (
      <div className={classes.root}>
        <MetaTags>
          <title>Welcome</title>
          <meta
            name="Description"
            content="Epaylater Online library Homepage"
          />
        </MetaTags>
        <section className={classes.logoButtonBox}>
          <section className={classes.logoNameBox}>
            <Avatar
              alt="googleImage"
              src={this.props.userDetails.imageUrl}
              className={classes.avatar}
            >
              Img
            </Avatar>
            <span className={classes.homepageText}>
              {this.props.userDetails.name}
            </span>
          </section>
          <GoogleLogout
            clientId={API_PATH.CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.logout}
            icon={false}
          >
            <span className={classes.googleLogoutButton}>Logout</span>
          </GoogleLogout>
        </section>
        <SelectionOptions
          handleSelectionChange={this.handleSelectionChange}
          value={this.state.searchBy}
        />
        <SearchBar
          searchInpChange={this.searchInpChange}
          searchInputText={this.state.searchInputText}
        />
        <section className={classes.booksBox}>{res}</section>
      </div>
    );
  }
}
var mapStateToProps = state => {
  return {
    userDetails: state.userDetails
  };
};

var mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authActions.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme()(withStyles(styles)(Homepage)));
