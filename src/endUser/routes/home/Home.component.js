import React, { Component } from 'react';
import Tabs from '../../../sharedComponents/Tabs';
import Modal from '../../../sharedComponents/Modal';
import Form from 'react-bootstrap/Form';
import { Typeahead } from 'react-bootstrap-typeahead';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      isShowingModal: false,
      crudFormValidated: false,
      isUpdatingItem: false,
      crudFormData: {
        applicantFullName: "",
        applicantPhoneNum: "",
        loanOfficerRefNum: "",
        dataEntryRefNum: ""
      }
    }
  }

  // Modal fun()
  openModalHandler = () => {
    this.setState({
      isShowingModal: true
    });
  }

  closeModalHandler = () => {
    this.setState({
      isShowingModal: false
    });
  }

  // Handling submit creating or updating applicant data
  handleSubmit(event) {
    event.preventDefault();
    const self = this.state;
    const form = event.currentTarget;
    const arrToCheck = Object.values(self.crudFormData);
    const isValid = arrToCheck.every((oneField) => oneField !== "");
    if (isValid) {
      this.setState({ crudFormValidated: true });
      self.isUpdatingItem ? this.props.updateApplicant(self.crudFormData) : this.props.createApplicant(self.crudFormData);
    } else {
      this.setState({ crudFormValidated: false });
    }
  }

  handleInputFields(event) {
    let fieldName = event.target.name;
    let fieldVal = event.target.value;
    this.setState((prevState) => ({
      ...prevState,
      crudFormData: {
        ...prevState.crudFormData,
        [fieldName]: fieldVal
      }
    })
    )
  }

  handleSelectField(fieldVal, fieldName) {
    this.setState((prevState) => ({
      ...prevState,
      crudFormData: {
        ...prevState.crudFormData,
        // Will take only id for one option
        [fieldName]: fieldVal ? fieldVal[0].id : ''
      }
    })
    )
  }

  render() {
    const self = this.state;
    var options = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Miles' },
      { id: 3, name: 'Charles' },
      { id: 4, name: 'Herbie' },
    ];
    return (
      <h1>Hello World!</h1>
      );
  }
}

export default Home;
