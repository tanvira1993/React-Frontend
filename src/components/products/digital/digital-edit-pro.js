import React, { Component } from "react";
import { Card } from "antd";
import "antd/dist/antd.css";
import { Form, Button, Row, Col, Input, InputNumber } from "antd";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import ImageUploader from "react-images-upload";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSingleProduct, updateProduct } from "../../../actions";
import { ImageValidation } from "../../../services/validation";
import Breadcrumb from "../../common/breadcrumb";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

class ProductCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      productDetails: [],
      Imagesubmitted: true,
      productLoading: true,
    };
  }

  async componentWillMount() {
    await this.props.fetchSingleProduct(
      this.props.match.params.id,
      this.props.authInfo,
      this.props.history
    );
  }

  componentWillReceiveProps(newProps) {
    if (this.state.productDetails !== newProps.productDetails) {
      this.setState({ productDetails: newProps.productDetails });
    }

    if (this.state.productLoading !== newProps.productLoading) {
      this.setState({ productLoading: newProps.productLoading });
    }
  }

  handleImageChange = (e) => {
    let imagefile = e[0];
    if (imagefile !== undefined) {
      if (ImageValidation(imagefile.name)) {
        this.setState({ file: imagefile, Imagesubmitted: false });
      } else {
        toast.error("Only image allowed..!!");
        this.setState({
          file: null,
          Imagesubmitted: true,
        });
      }
    } else {
      this.setState({
        file: null,
        Imagesubmitted: true,
      });
    }
  };

  onFinish = (values) => {
    if (this.state.file == null) {
      let productData = {
        title: values.title,
        description: values.description,
        price: values.price,
      };
      this.props.updateProduct(
        this.props.match.params.id,
        productData,
        this.props.authInfo,
        this.props.history,
        ""
      );
    } else if (this.state.file != null) {
      let productData = {
        title: values.title,
        description: values.description,
        price: values.price,
      };
      this.props.updateProduct(
        this.props.match.params.id,
        productData,
        this.props.authInfo,
        this.props.history,
        this.state.file
      );
    } else {
      toast.warn("Please, provide a valid Image.");
    }
  };

  render() {
    const width = { width: "72vh" };
    const imgwidth = { width: "65vh", height: "50vh" };
    let valid = { display: "block" };
    if (this.props.productLoading) {
      return null;
    }
    if (!this.state.Imagesubmitted) {
      valid = { display: "none" };
    }
    if (this.state.Imagesubmitted) {
      valid = { display: "block" };
    }

    return (
      <>
        <Breadcrumb title="Edit Product" parent="Product" />
        <div>
          <Form
            name="nest-messages"
            onFinish={this.onFinish}
            validateMessages={validateMessages}
            initialValues={{
              title:
                this.props.productDetails.products == undefined
                  ? null
                  : this.props.productDetails.products.title,
              description:
                this.props.productDetails.products == undefined
                  ? null
                  : this.props.productDetails.products.description,
              price:
                this.props.productDetails.products == undefined
                  ? null
                  : this.props.productDetails.products.price,
            }}
          >
            <Row>
              <Col>
                <Card style={width} className="m-2">
                  <Form.Item
                    {...layout}
                    name="title"
                    label="Title"
                    rules={[{ required: true, whitespace: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...layout}
                    name="price"
                    label="Price"
                    rules={[{ required: true, message: "Missing price" }]}
                  >
                    <InputNumber placeholder="Price" min={1} />
                  </Form.Item>
                  <Form.Item
                    {...layout}
                    name="description"
                    label="Description"
                    rules={[{ required: true, whitespace: true }]}
                  >
                    <Input.TextArea />
                  </Form.Item>

                  {valid.display === "none" ? (
                    <ImageUploader
                      withIcon={true}
                      buttonText="Select Feature Image"
                      buttonStyles={valid}
                      onChange={(e) => this.handleImageChange(e)}
                      withPreview={true}
                    />
                  ) : (
                    <ImageUploader
                      withIcon={true}
                      buttonText="Select Image"
                      onChange={(e) => this.handleImageChange(e)}
                      withPreview={true}
                      imgExtension={[".jpg", ".jpeg", ".png", ".gif"]}
                      maxFileSize={5242880}
                      fileTypeError={"is not supported file extension"}
                      fileSizeError={"file size is too big"}
                      singleImage={true}
                    />
                  )}
                </Card>
                <Card title="Current Image" style={width} className="m-2">
                  <img
                    style={imgwidth}
                    src={
                      this.props.productDetails.products == undefined
                        ? null
                        : this.props.productDetails.base_url +
                          this.props.productDetails.products.image
                    }
                    alt="main"
                  />
                </Card>
                <div className="container d-flex justify-content-center">
                  <Form.Item
                    wrapperCol={{
                      span: 12,
                      offset: 6,
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Update
                    </Button>
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  productDetails: state.products.product,
  authInfo: state.adminLogin.authInfo,
  isLoggedIn: state.adminLogin.isLoggedIn,
  productLoading: state.products.productLoading,
});

export default connect(mapStateToProps, {
  fetchSingleProduct,
  updateProduct,
})(withRouter(ProductCreate));
