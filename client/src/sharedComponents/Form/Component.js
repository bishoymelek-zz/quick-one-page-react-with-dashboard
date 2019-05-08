import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import { Typeahead } from 'react-bootstrap-typeahead';
import Alert from 'react-bootstrap/Alert';

const component = (props) => {
    const formData = props.formData;
    const inputHandlers = props.inputHandlers;
    const formSubmitHandler = props.formSubmitHandler;
    var options = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Miles' },
        { id: 3, name: 'Charles' },
        { id: 4, name: 'Herbie' },
    ];
    let loanOfficerRefNumOnUpdate = [], dataEntryRefNumOnUpdate = [];
    if (props.isUpdating) {
        loanOfficerRefNumOnUpdate = options.filter((item, index) => item.id === parseInt(props.formData.loanOfficerRefNum));
        dataEntryRefNumOnUpdate = options.filter((item, index) => item.id === parseInt(props.formData.dataEntryRefNum));
    }
    return (<Form
        onSubmit={e => formSubmitHandler(e)}
    >
        <div>
            {props.alert.isShowing ? <Alert key="1" variant={props.alert.variant}>
                {props.alert.message}
            </Alert> : null}
            <h4>Applicant details</h4>
            <Form.Group>
                <Form.Label>Full-Name</Form.Label>
                <Form.Control
                    required
                    onChange={((i) => inputHandlers.normalFields(i))}
                    name="applicantFullName"
                    type="text"
                    value={formData.applicantFullName}
                    placeholder="ex: Mohamed said" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                    required
                    onChange={((i) => inputHandlers.normalFields(i))}
                    value={formData.applicantPhoneNum}
                    name="applicantPhoneNum"
                    type="number"
                    placeholder="ex: 0122400030009" />
            </Form.Group>
        </div>
        <hr />
        <div>
            <h4>Team Reference Numbers</h4>
            <Form.Group controlId="">
                <Form.Label>Loan officer Ref Number  </Form.Label>
                <Typeahead
                    id="loanOfficerRefNum"
                    // this ref to handle clearing method when need to
                    // ref={props.shouldCleanTypeahead.bind(this)}
                    isValid={formData.loanOfficerRefNum ? true : false}
                    labelKey="name"
                    selected={loanOfficerRefNumOnUpdate}
                    onChange={((i) => i.length ? inputHandlers.typeaheadFields(i, "loanOfficerRefNum") : inputHandlers.typeaheadFields(null, "loanOfficerRefNum"))}
                    options={options}
                    controlled
                    // newSelectionPrefix="Add new loan officer: "
                    allowNew={false}
                    placeholder="ex: 62B20H"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Data Entry Ref Number</Form.Label>
                <Typeahead
                    id="dataEntryRefNum"
                    // this ref to handle clearing method when need to
                    // ref={(typeahead) => this.dataEntryRef = typeahead}
                    isValid={formData.dataEntryRefNum ? true : false}
                    selected={dataEntryRefNumOnUpdate}
                    labelKey="name"
                    onChange={((i) => i.length ? inputHandlers.typeaheadFields(i, "dataEntryRefNum") : inputHandlers.typeaheadFields(null, "dataEntryRefNum"))}
                    options={options}
                    // newSelectionPrefix="Add a new Data Entry: "
                    allowNew={false}
                    placeholder="ex: Y462H20N"
                />
            </Form.Group>
        </div>
        <Button className="btn-continue" type="submit">
            Submit
        </Button>
    </Form>)
};
export default component;
