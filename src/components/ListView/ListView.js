import React from 'react'
import './ListView.scss'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { Button } from 'react-bootstrap';
import { redirect } from '../../helpers'

//todo: add docs
const ListView = ({ entityName, entities, columns }) => (
  <div className="content">
  	<div className="list-view">
      <h2>{entityName}</h2>
      <Button className="headerButton" onClick={() => redirect(`/${entityName}/create`)}>Create</Button>
      <BootstrapTable 
          data={entities} 
          options={{ onRowClick: (row) => redirect(`/${entityName}/${row.id}`)}}
          striped 
          hover 
          pagination >
        <TableHeaderColumn dataField="id" isKey={true} hidden />
        { Object.keys(columns).map(
            x => <TableHeaderColumn dataField={x} dataSort={true}>{columns[x]}</TableHeaderColumn>
        )}
      </BootstrapTable>
    </div>
  </div>
)

export default ListView