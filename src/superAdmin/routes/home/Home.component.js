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
      <div id="sAdminHome">
        <Modal
          className="modal"
          title="Create/Update an item"
          show={self.isShowingModal}
          close={this.closeModalHandler}>
          <Form
            onSubmit={e => this.handleSubmit(e)}
            validated={self.crudFormValidated}
          >
            <div>
              <h4>Applicant details</h4>
              <Form.Group>
                <Form.Label>Full-Name</Form.Label>
                <Form.Control
                  onChange={((i) => this.handleInputFields(i))}
                  name="applicantFullName"
                  type="text"
                  placeholder="ex: Mohamed said" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  onChange={((i) => this.handleInputFields(i))}
                  name="applicantPhoneNum"
                  type="tel"
                  placeholder="ex: 0122400030009" />
              </Form.Group>
            </div>
            <hr />
            <div>
              <h4>Team Reference Numbers</h4>
              <Form.Group controlId="">
                <Form.Label>Loan officer Ref Number </Form.Label>
                <Typeahead
                  isInvalid={self.crudFormData.loanOfficerRefNum ? false : true}
                  isValid={self.crudFormData.loanOfficerRefNum ? true : false}
                  labelKey={(option) => `${option.name}`}
                  onChange={((i) => i.length ? this.handleSelectField(i, "loanOfficerRefNum") : this.handleSelectField(null, "loanOfficerRefNum"))}
                  options={options}
                  allowNew
                  newSelectionPrefix="Add new loan officer: "
                  placeholder="ex: 62B20H"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Data Entry Ref Number</Form.Label>
                <Typeahead
                  isInvalid={self.crudFormData.dataEntryRefNum === "" ? true : false}
                  isValid={self.crudFormData.dataEntryRefNum === "" ? false : true}
                  labelKey={(option) => `${option.name}`}
                  onChange={((i) => i.length ? this.handleSelectField(i, "dataEntryRefNum") : this.handleSelectField(null, "dataEntryRefNum"))}
                  options={options}
                  allowNew
                  newSelectionPrefix="Add a new Data Entry: "
                  placeholder="ex: Y462H20N"
                />
              </Form.Group>
            </div>
            <button className="btn-continue" type="submit">
              Submit
            </button>
          </Form>
        </Modal>
        <header>
          <h1>Rasidi Dashboard</h1>
        </header>
        <section>
          <div className="text-right">
            <button type="button" onClick={this.openModalHandler} className="btn btn-primary">Create/Update New item</button>
          </div>
        </section>
        <Tabs className="tabsStyling">
          <div label="Weekly">
            <h5>Weekly board</h5>
          </div>
          <div label="Daily">
            <h5>Daily Board</h5>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default Home;
