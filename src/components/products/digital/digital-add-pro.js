import React, { Component } from "react";
import { Card } from "antd";
import "antd/dist/antd.css";
import { Form, Button, Row, Col, Input, InputNumber } from "antd";
import { toast } from "react-toastify";
import ImageUploader from "react-images-upload";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createProduct } from "../../../actions";
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
      Imagesubmitted: true,
    };
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
    if (this.state.file != null) {
      let productData = {
        title: values.title,
        description: values.description,
        price: values.price,
      };
      this.props.createProduct(
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
    let valid = { display: "block" };
    if (!this.state.Imagesubmitted) {
      valid = { display: "none" };
    }
    if (this.state.Imagesubmitted) {
      valid = { display: "block" };
    }
    return (
      <>
        <Breadcrumb title="Add Product" parent="Product" />
        <div>
          <Form
            name="nest-messages"
            onFinish={this.onFinish}
            validateMessages={validateMessages}
          >
            <Row>
              <Col>
                <Card style={{ width: "72vh" }} className="m-2">
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
                <div className="container d-flex justify-content-center">
                  <Form.Item
                    wrapperCol={{
                      span: 12,
                      offset: 6,
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Submit
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
  authInfo: state.adminLogin.authInfo,
  isLoggedIn: state.adminLogin.isLoggedIn,
});

export default connect(mapStateToProps, {
  createProduct,
})(withRouter(ProductCreate));
