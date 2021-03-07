import React, { Component } from "react";
import { Card } from "antd";
import "antd/dist/antd.css";
import {
  Form,
  Select,
  Button,
  Row,
  Col,
  Input,
  Space,
  InputNumber,
} from "antd";
import { toast } from "react-toastify";
import ImageUploader from "react-images-upload";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  createProduct
} from "../../../actions";
import {
  validateYoutubeUrl,
  ImageValidation,
} from "../../../services/validation";
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
      slug: "",
      file: null,
      image: null,
      additionalImages: [],
      categories: [],
      subCategories: [],
    };
  }

  componentWillMount() {
  }

  componentWillReceiveProps(newProps) {
    
  }



  handleImageChange = async (e) => {
    // let imagefile = e.target.files[0];
    // if (imagefile !== undefined) {
    //   if (ImageValidation(imagefile.name)) {
    //     const sizedFile = await imageResize(imagefile, 576, 768,"file");
    //     Resizer.imageFileResizer(
    //       sizedFile,
    //       768,
    //       576,
    //       "JPEG",
    //       50,
    //       0,
    //       (uri) => {
    //         this.setState({ file: imagefile, image: uri });
    //       },
    //       "base64"
    //     );
    //   } else {
    //     toast.error("Only image allowed..!!");
    //     this.setState({
    //       image: null,
    //       file: null,
    //     });
    //   }
    // } else {
    //   this.setState({
    //     image: null,
    //     file: null,
    //   });
    // }
  };


  onFinish = (values) => {
    // if (values.prices === undefined || values.prices.length === 0) {
    //   toast.warn("At least one Price Field required!");
    // } else {
    //   if (validateYoutubeUrl(values.videoUrl)) {
    //     let videoUrl = validateYoutubeUrl(values.videoUrl);
    //     if(videoUrl === true){
    //       videoUrl = ''
    //     }
    //     if (this.state.additionalImages.length === 0) {
    //       toast.error("Please, provide Only jpeg/png file into Image field..!");
    //     } else {
    //       if (this.state.additionalImages.length === 0) {
    //         toast.error("Please, provide at least one image..!");
    //       } else {
    //         try {
    //           let obj = {};
    //           if (values.data !== undefined) {
    //             for (let i = 0; i < values.data.length; i++) {
    //               obj[values.data[i].key] = values.data[i].value;
    //             }
    //           }

    //           if (values.category === "laptop") {
    //             obj["maker"] = values.maker;
    //             obj["release_year"] = values.releaseYear.toString().split(" ")[3];
    //             obj["cpu"] = values.cpu;
    //             obj["screen_size"] = values.screenSize;
    //             obj["os"] = values.os;
    //             obj["memory_capacity"] = values.memoryCapacity.replace(/\s/g,'').toLocaleUpperCase();
    //             obj["storage"] = values.storage.replace(/\s/g,'').toLocaleUpperCase();
    //           }
    //           if (values.category === "smartphone") {
    //             obj["maker"] = values.maker;
    //             obj["release_year"] = values.releaseYear.toString().split(" ")[3];
    //             obj["os"] = values.os;
    //             obj["memory_capacity"] = values.memoryCapacity.replace(/\s/g,'').toLocaleUpperCase();
    //             obj["storage"] = values.storage.replace(/\s/g,'').toLocaleUpperCase();
    //           }
    //           obj["maker"] = values.maker;
    //           obj["release_year"] = values.releaseYear.toString().split(" ")[3];

    //           let productData = JSON.stringify({
    //             name: values.name,
    //             description: values.description,
    //             category_slug: values.category,
    //             subcategory_slug: values.subCategory,
    //             image: this.state.additionalImages[0],
    //             video_url: videoUrl,
    //             prices: values.prices,
    //             additionImages: this.state.additionalImages,
    //             data: obj,
    //           });
              
    //           this.props.createProduct(
    //             productData,
    //             this.props.authInfo,
    //             this.props.history
    //           );
    //         } catch (error) {
    //           toast.error(
    //             "Something is wrong..!! Please, try again with proper value."
    //           );
    //         }
    //       }
    //     }
    //   } else {
    //     toast.warn("Please, provide a valid youtube url.");
    //   }
    // }
  };

  render() {
    const width = { width: "74vh" };
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
                <Card
                  title="General Information"
                  style={{ width: "72vh" }}
                  className="m-2"
                >

                  <Form.Item
                    {...layout}
                    name="name"
                    label="Name"
                    rules={[{ required: true, whitespace: true }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    {...layout}
                    name="description"
                    label="Description"
                    rules={[{ required: true, whitespace: true }]}
                  >
                    <Input.TextArea />
                  </Form.Item>


                  <ImageUploader
                    withIcon={true}
                    buttonText="Select Images"
                    onChange={this.handleAddImageChange}
                    withPreview={true}
                    imgExtension={[".jpg", ".jpeg", ".png", ".gif"]}
                    maxFileSize={5242880}
                    fileTypeError={"is not supported file extension"}
                    fileSizeError={"file size is too big"}
                  />
                </Card>
              </Col>
              <Col>
               

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
  createProduct
})(withRouter(ProductCreate));
