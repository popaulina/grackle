import React from 'react'
import './ListView.scss'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

export const ListView = ({ entityName, entities, columns }) => (
	<div className="table">
    <h2>{entityName}</h2>
    <BootstrapTable data={entities} striped hover pagination >
      <TableHeaderColumn dataField="id" isKey={true} hidden />
      { Object.keys(columns).map(
          x => <TableHeaderColumn dataField={x} dataSort={true}>{columns[x]}</TableHeaderColumn>
      )}
    </BootstrapTable>
  </div>
)

export default ListView