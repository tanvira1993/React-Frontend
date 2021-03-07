import React, { Component, Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { Edit, Trash2 } from "react-feather";
import { connect } from "react-redux";
import { fetchallProducts, deleteProduct } from "../../../actions";
import Pagination from "@material-ui/lab/Pagination";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "antd/dist/antd.css";
import "../../../assets/loading.css";
import Empty from "../../../assets/images/empty-search.jpg";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({});
export class Product_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      pageNo: 1,
      deleteLoading: false,
      productsLoading: true,
    };
  }

  componentWillMount() {
    this.props.fetchallProducts(
      this.props.authInfo,
      this.state.pageNo,
      this.props.history,
      ""
    );
  }

  componentWillReceiveProps(newProps) {
    if (this.state.productList !== newProps.products.products) {
      this.setState({ productList: newProps.products.products });
    }
    if (this.state.productsLoading !== newProps.productsLoading) {
      this.setState({ productsLoading: newProps.productsLoading });
    }
  }

  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  deleteProduct = async (uuid) => {
    if (window.confirm("Are you sure you wish to delete this product?")) {
      this.setState({ deleteLoading: true });
      await this.props.deleteProduct(
        uuid,
        this.props.authInfo,
        this.props.history
      );
      await this.timeout(3000);
      await this.props.fetchallProducts(
        this.props.authInfo,
        this.state.pageNo,
        this.props.history,
        ""
      );
      this.setState({ deleteLoading: false });
    }
  };

  render() {
    const noproduct = (
      <div className="row">
        <div className="col-sm-12 text-center section-b-space mt-5 no-found">
          <img src={Empty} className="img-fluid mb-4" alt="empty-search" />
          <h3>Sorry! Couldn't find the product you were looking For!!!</h3>
        </div>
      </div>
    );
    if (this.state.productsLoading) {
      return null;
    }
    return (
      <Fragment>
        <Breadcrumb title="Product List" parent="Physical" />

        <div className="container-fluid">
          {this.props.products.products.data === undefined ? null : this.props
              .products.products.data.length === 0 ? (
            noproduct
          ) : this.state.deleteLoading ? (
            <div className="m-50">
              <div className="loading-cls"></div>
            </div>
          ) : (
            <div className="row products-admin ratio_asos">
              {this.props.products.products.data.map((myData, i) => {
                return (
                  <div className="col-xl-3 col-sm-6" key={i}>
                    <div className="card">
                      <div className="products-admin">
                        <div className="card-body product-box">
                          <div className="img-wrapper">
                            <div className="front">
                              <a className="bg-size">
                                <img
                                  className="img-fluid blur-up bg-img lazyloaded"
                                  src={
                                    this.props.products.base_url + myData.image
                                  }
                                  alt="lazy-loading"
                                />
                              </a>
                              <div className="product-hover">
                                <ul>
                                  <Link
                                    to={{
                                      pathname:
                                        `${process.env.PUBLIC_URL}/products/edit-product/` +
                                        myData.id,
                                      state: {
                                        uuid: myData.id,
                                      },
                                    }}
                                  >
                                    <li>
                                      <button className="btn" type="button">
                                        <Edit className="editBtn" />
                                      </button>
                                    </li>
                                  </Link>
                                  <li>
                                    <button
                                      className="btn"
                                      type="button"
                                      onClick={() => {
                                        this.deleteProduct(myData.id);
                                      }}
                                    >
                                      <Trash2 className="deleteBtn" />
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="product-detail">
                            <a>
                              {" "}
                              <h6>{myData.title}</h6>
                            </a>
                            <h6>{myData.price} &nbsp; &nbsp;BDT</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="container d-flex justify-content-center">
            {this.state.productList.current_page === undefined ? null : this
                .state.productList.data.length === 0 ? null : (
              <Pagination
                count={this.state.productList.last_page}
                page={this.state.productList.current_page}
                onChange={(event, page) => {
                  this.setState({ pageNo: page });
                  this.props.fetchallProducts(
                    this.props.authInfo,
                    page,
                    this.props.history,
                    ""
                  );
                }}
              />
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  productsLoading: state.products.productsLoading,
  error: state.products.error,
  authInfo: state.adminLogin.authInfo,
  isLoggedIn: state.adminLogin.isLoggedIn,
});

export default connect(mapStateToProps, {
  fetchallProducts,
  deleteProduct,
})(withRouter(withStyles(useStyles)(Product_list)));
