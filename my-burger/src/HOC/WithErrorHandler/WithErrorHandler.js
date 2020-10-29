import React, { Component } from "react";
//import axios from 'axios';
import Modal from "../../Components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";
const WithErrorHandler = (WrapperComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    //Instead of compoenentWillMount
    constructor(props) {
      super(props);

      //	componentDidMount(){
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }
    componentWillUnmount() {
			//console.log ('will unmount',this.reqInterceptor,this.resInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapperComponent {...this.props} />
        </Aux>
      );
    }
  };
};
export default WithErrorHandler;
