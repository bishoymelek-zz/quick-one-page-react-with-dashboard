import React, { Component } from 'react';
import Tabs from '../../../sharedComponents/Tabs';
import Modal from '../../../sharedComponents/Modal';
import Table from '../../../sharedComponents/Table';
import Spinner from '../../../sharedComponents/Spinner';
import clientsApi from './../../../api/clientsApi';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      listType: "Daily",
      loading: false,
      isShowingModal: false,
      isUpdatingItem: false,
      itemIdToUpdate: null,
      crudFormData: {
        applicantFullName: "",
        applicantPhoneNum: "",
        loanOfficerRefNum: null,
        dataEntryRefNum: null
      },
      loadMoreAppsButton: {
        disable: false
      },
      alert: {
        isShowing: false,
        message: '',
        variant: 'success'
      },
    }
    this.handleInputFields = this.handleInputFields.bind(this);
    this.handleSelectField = this.handleSelectField.bind(this);
    this.handleCrudValidation = this.handleCrudValidation.bind(this);
    this.createOrUpdateOne = this.createOrUpdateOne.bind(this);
    this.deleteApp = this.deleteApp.bind(this);
    this.handleCleaningTypeahead = this.handleCleaningTypeahead.bind(this);
    this.handleLoadMoreApps = this.handleLoadMoreApps.bind(this);
    this.handleActiveTab = this.handleActiveTab.bind(this);
    this.handleUpdatingApp = this.handleUpdatingApp.bind(this);
  }

  openModalHandler = () => {
    this.setState({
      isShowingModal: true
    });
  }

  closeModalHandler = () => {
    this.setState((prevState) => ({
      ...prevState,
      isShowingModal: false,
      alert: {
        isShowing: false,
        message: '',
        variant: ''
      }
    }));
  }

  // Handling submit creating or updating applicant data
  handleCrudValidation(event) {
    event.preventDefault();
    event.stopPropagation();
    const selfState = this.state;
    if (event.currentTarget.checkValidity() && selfState.crudFormData.loanOfficerRefNum && selfState.crudFormData.dataEntryRefNum) {
      this.createOrUpdateOne(selfState.crudFormData);
    }
  }

  // handler for react-bootstrap Input components
  handleInputFields(event) {
    let fieldName = event.target.name;
    let fieldVal = event.target.value;
    this.setState((prevState) => ({
      ...prevState,
      crudFormData: {
        ...prevState.crudFormData,
        [fieldName]: fieldVal
      }
    }));
  }

  // handler for typeahead component
  handleSelectField(fieldVal, fieldName) {
    this.setState((prevState) => ({
      ...prevState,
      crudFormData: {
        ...prevState.crudFormData,
        // Will take only id for one(first) option
        [fieldName]: fieldVal ? fieldVal[0].id : null
      }
    }));
  }

  // create one app
  async createOrUpdateOne(data, appId = 0) {
    this.props.startLoading();
    const reqBody = {
      fullName: data.applicantFullName,
      phoneNum: data.applicantPhoneNum,
      loanOfficerRefNum: data.loanOfficerRefNum,
      dataEntryRefNum: data.dataEntryRefNum
    }
    let res;
    if (this.state.isUpdatingItem) {
      reqBody._id = this.state.itemIdToUpdate;
      res = await clientsApi.updateOne(reqBody);
    } else {
      res = await clientsApi.createOne(reqBody);
    }
    const resBody = await res.json();
    if (res.status === (200 || 500)) {
      this.props.getListOfApps();
      // not working still
      // this.handleCleaningTypeahead();
    } else {
      this.props.stopLoading();
    }
    this.setState(prevState => ({
      ...prevState,
      crudFormData: res.status === 400 ? prevState.crudFormData : {
        applicantPhoneNum: '',
        applicantFullName: '',
        loanOfficerRefNum: null,
        dataEntryRefNum: null
      },
      alert: {
        ...prevState.alert,
        isShowing: true,
        message: resBody.message,
        variant: res.status === 200 ? "success" : res.status === 400 ? "warning" : res.status === 500 ? "danger" : null
      }
    }));
  }

  // handler to delete on app by id
  async deleteApp(appId) {
    try {
      this.props.startLoading();
      const resToDeleteOneApp = await clientsApi.deleteOne(appId);
      const resBodyToDeleteOneApp = await resToDeleteOneApp.json();
      if (resToDeleteOneApp.status === 200 && resBodyToDeleteOneApp.success) {
        this.props.getListOfApps();
      } else {
        this.props.addError(resBodyToDeleteOneApp.message);
      }
    } catch (error) {
      this.props.addError(error);
    }
  }

  // TODO: to be finished
  handleCleaningTypeahead = (e) => {
    e.clear();
    this.setState((prev) => ({
      ...prev,
      shouldCleanTypeahead: false
    }))
  }

  handleUpdatingApp(data){
    this.setState((prevState)=>({
      ...prevState,
      isUpdatingItem:true,
      itemIdToUpdate:data._id,
      isShowingModal:true,
      crudFormData:{
        applicantFullName: data.fullName,
        applicantPhoneNum: data.phoneNum,
        loanOfficerRefNum: data.loanOfficerRefNum,
        dataEntryRefNum: data.dataEntryRefNum
      }
    }));
  }
  componentDidMount() {
    if (!this.props.listOfDailyApps.length) {
      this.props.startLoading();
      this.props.getListOfApps();
    }
  }
  handleLoadMoreApps() {
    const selfProps = this.props;
    if (selfProps.appsListTotalPagesNum !== selfProps.appsListCurrentPage) {
      this.props.getListOfApps(this.props.appsListCurrentPage + 1);
    } else {
      this.setState((prevState) => ({
        ...prevState,
        loadMoreAppsButton: {
          ...prevState.loadMoreAppsButton,
          disable: true
        }
      }));
    }
  }
  handleActiveTab(label) {
    if (label) {
      this.setState((prevState) => ({
        ...prevState,
        listType: label
      }));
      if(label==="Weekly")
        this.props.getListOfApps(false);
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loading !== prevState.loading) {
      return { loading: nextProps.loading };
    }
    else return null;
  }
  render() {
    const selfProps = this.props;
    const selfState = this.state;
    const applicantReportFields = [
      "Number",
      "Applicant Name",
      "Applicant Phone Number",
      "Loan Officer Ref Number",
      "Data Entry Ref Number",
      "Created At",
      "Update",
      "Delete"
    ];
    return (
      <div id="sAdminHome">
        <Spinner loading={selfState.loading}></Spinner>
        <Modal
          className="modal"
          isUpdating={selfState.isUpdatingItem}
          title="Create/Update an item"
          formData={selfState.crudFormData}
          shouldCleanTypeahead={this.handleCleaningTypeahead}
          formSubmitHandler={this.handleCrudValidation}
          formInputHandler={{ normalFields: this.handleInputFields, typeaheadFields: this.handleSelectField }}
          show={selfState.isShowingModal}
          alert={selfState.alert}
          close={this.closeModalHandler} />
        <header>
          <h1>Rasidi Dashboard</h1>
        </header>
        <section>
          <div className="text-right">
            <button type="button" onClick={this.openModalHandler} className="btn btn-primary">Create/Update New item</button>
          </div>
        </section>
        <Tabs activeTab={this.handleActiveTab} className="tabsStyling">
          <div name="Daily" label="Daily">
            <h5>Daily Board</h5>
            <Table loading={selfState.loading} 
            crudHandler={{ deleteHandler: this.deleteApp,modalOpenToUpdate:this.handleUpdatingApp, loadMoreHandler: this.handleLoadMoreApps }}
            fieldsTitles={applicantReportFields} 
            fieldsData={selfProps.listOfDailyApps} />
          </div>
          <div name="Weekly" label="Weekly">
            <h5>Weekly board</h5>
            <Table loading={selfState.loading} 
            crudHandler={{ deleteHandler: this.deleteApp,modalOpenToUpdate:this.handleUpdatingApp, loadMoreHandler: this.handleLoadMoreApps }}
            fieldsTitles={applicantReportFields} 
            fieldsData={selfProps.listOfWeeklyApps} />
          </div>
        </Tabs>
      </div>
    );
  }
}

export default Home;
