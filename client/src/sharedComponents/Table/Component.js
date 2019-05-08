import React from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const component = (props) => {
    if (props.fieldsTitles && props.fieldsData.length) return (
        <div>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        {props.fieldsTitles.map((item, index) => (<th key={index}>{item}</th>))}
                    </tr>
                </thead>
                <tbody>{props.fieldsData.map((item, index) => (
                    <tr key={index}>
                        <th>#</th>
                        <th>{item.fullName}</th>
                        <th>{item.phoneNum}</th>
                        <th>{item.loanOfficerRefNum}</th>
                        <th>{item.dataEntryRefNum}</th>
                        <th></th>
                        <th>
                            <Button disabled={props.loading}
                                onClick={props.crudHandler.modalOpenToUpdate.bind(this, item)}
                                variant="warning">
                                UPDATE
                           </Button>
                        </th>
                        <th>
                            <Button disabled={props.loading}
                                onClick={props.crudHandler.deleteHandler.bind(this, item._id)}
                                variant="danger">
                                DELETE
                            </Button>
                        </th>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Button id="loadMoreButton" onClick={props.crudHandler.loadMoreHandler.bind(this)} disabled={false} variant="primary">Load More</Button>
        </div>)
    return (<h5>No applications found at the moment</h5>)
}

export default component;
