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
import Slider from "react-slick";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import ImageUploader from "react-images-upload";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchSingleProduct,
  updateProduct,
} from "../../../actions";
import {
  ImageValidation,
  validateYoutubeUrl,
} from "../../../services/validation";
import Breadcrumb from "../../common/breadcrumb";
import { imageResize } from "../../../services";
import Resizer from "react-image-file-resizer";
const { Option } = Select;
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
      productDetails: [],
      spec: [],
      open: false,
      nav1: null,
      nav2: null,
    };
  }

  async componentWillMount() {
    // await this.props.fetchSingleProduct(
    //   this.props.match.params.id,
    //   this.props.authInfo,
    //   this.props.history
    // );
    // await this.props.fetchallCategories(
    //   this.props.authInfo,
    //   1,
    //   this.props.history
    // );
    // this.setState({ categories: this.props.categories });
  }

  componentDidMount() {
    // this.setState({
    //   nav1: this.slider1,
    //   nav2: this.slider2,
    // });
  }

  componentWillReceiveProps(newProps) {
    // if (this.state.categories !== newProps.categories) {
    //   this.setState({ categories: newProps.categories });
    // }

    // if (this.state.subCategories !== newProps.subCategories) {
    //   this.setState({ subCategories: newProps.subCategories });
    // }
    // if (this.state.productDetails !== newProps.productDetails) {
    //   this.setState({ productDetails: newProps.productDetails });
    //   if (newProps.productDetails.data !== undefined) {
    //     let obj = [];
    //     const arr = Object.entries(newProps.productDetails.data);
    //     for (
    //       let j = 0;
    //       j < Object.entries(newProps.productDetails.data).length;
    //       j++
    //     ) {
    //       if (
    //         arr[j][0] !== "maker" &&
    //         arr[j][0] !== "release_year" &&
    //         arr[j][0] !== "cpu" &&
    //         arr[j][0] !== "screen_size" &&
    //         arr[j][0] !== "memory_capacity" &&
    //         arr[j][0] !== "os" &&
    //         arr[j][0] !== "storage"
    //       ) {
    //         obj.push({ key: arr[j][0], value: arr[j][1] });
    //       }
    //     }

    //     this.setState({ spec: obj });
    //   }
    // }
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

  handleAddImageChange = async (e) => {
    // let add = [];
    // if (e.length > 0) {
    //   for (let j = 0; j < e.length; j++) {
    //     const sizedFile = await imageResize(e[j], 576, 768,"file");
    //     Resizer.imageFileResizer(
    //       sizedFile,
    //       768,
    //       576,
    //       "JPEG",
    //       50,
    //       0,
    //       (uri) => {
    //         add.push(uri);
    //       },
    //       "base64"
    //     );
    //   }
    //   this.setState({ additionalImages: add });
    // } else {
    //   this.setState({ additionalImages: [] });
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
    //     try {
    //       let obj = {};
    //       if (values.data !== undefined) {
    //         for (let i = 0; i < values.data.length; i++) {
    //           obj[values.data[i].key] = values.data[i].value;
    //         }
    //       }

    //       if (values.category === "laptop") {
    //         obj["maker"] = values.maker;
    //         obj["release_year"] = values.releaseYear.toString().split(" ")[3];
    //         obj["cpu"] = values.cpu;
    //         obj["screen_size"] = values.screenSize;
    //         obj["os"] = values.os;
    //         obj["memory_capacity"] = values.memoryCapacity.replace(/\s/g,'').toLocaleUpperCase();
    //         obj["storage"] = values.storage.replace(/\s/g,'').toLocaleUpperCase();
    //       }
    //       if (values.category === "smartphone") {
    //         obj["maker"] = values.maker;
    //         obj["release_year"] = values.releaseYear.toString().split(" ")[3];
    //         obj["os"] = values.os;
    //         obj["memory_capacity"] = values.memoryCapacity.replace(/\s/g,'').toLocaleUpperCase();
    //         obj["storage"] = values.storage.replace(/\s/g,'').toLocaleUpperCase();
    //       }
    //       obj["maker"] = values.maker;
    //       obj["release_year"] = values.releaseYear.toString().split(" ")[3];

    //       let productData = JSON.stringify({
    //         name: values.name,
    //         description: values.description,
    //         category_slug: values.category,
    //         subcategory_slug: values.subCategory,
    //         image: this.state.image,
    //         video_url: videoUrl,
    //         prices: values.prices,
    //         additionImages: this.state.additionalImages,
    //         data: obj,
    //       });

    //       this.props.updateProduct(
    //         this.props.match.params.id,
    //         productData,
    //         this.props.authInfo,
    //         this.props.history
    //       );
    //     } catch (error) {
    //       toast.error(
    //         "Something is wrong..!! Please, try again with proper value."
    //       );
    //     }
    //   } else {
    //     toast.warn("Please, provide a valid youtube url.");
    //   }
    // }
  };

  render() {
    const width = { width: "72vh" };
    const imgwidth = { width: "65vh", height: "50vh" };
    if (this.props.productLoading) {
      return null;
    }
    console.log(this.props.productDetails.category_slug)
    return (
      <>
        <Breadcrumb title="Edit Product" parent="Product" />
        <div>
          <Form
            name="nest-messages"
            onFinish={this.onFinish}
            validateMessages={validateMessages}
            initialValues={{
              name: this.state.productDetails.name,
              description: this.state.productDetails.description,
              videoUrl: this.state.productDetails.video,
              prices: this.state.productDetails.prices,
              data: this.state.spec,
              category : this.state.productDetails.category_slug,
              subCategory : this.state.productDetails.subCategory_slug
            }}
          >
            <Row>
              <Col>
                <Card title="General Information" style={width} className="m-2">
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

                  <Form.Item
                    {...layout}
                    name="videoUrl"
                    label="Video Url"
                    rules={[
                      // { required: true, whitespace: true },
                      {
                        type: "url",
                        message: "This field must be a valid url.",
                      },
                    ]}
                  >
                    <Input />
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
                <Card title="Current Images" style={width} className="m-2">
                  <img
                    style={imgwidth}
                    src={this.state.productDetails.image}
                    alt="main"
                  />
                  <br />
                  <br />

                  <div>
                    <Slider
                      dots={true}
                      infinite={true}
                      speed={1000}
                      slidesToScroll={1}
                      arrows={true}
                      slidesToShow={2}
                    >
                      {this.state.productDetails.additional_images
                        ? this.state.productDetails.additional_images.map(
                            (val) => (
                              <div key={val.image} className="item">
                                <img
                                  className="img-fluid"
                                  src={val.image}
                                  alt=""
                                />
                              </div>
                            )
                          )
                        : null}
                    </Slider>
                  </div>
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
});

export default connect(mapStateToProps, {
  fetchSingleProduct,
  updateProduct,
})(withRouter(ProductCreate));
