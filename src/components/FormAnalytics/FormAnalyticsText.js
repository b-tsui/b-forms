import React, { useState } from "react";
import PropTypes from "prop-types";
import TablePaginationActions from "./FormAnalyticsTablePaginationActions";
import FormAnalyticsWordCloud from "./FormAnalyticsWordCloud";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 300,
  },
});

export default function FormAnalyticsText({ question }) {
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //for switching between table/cloud
  const [state, setState] = useState({
    checked: false,
  });

  let answers = [];

  question.answers.forEach((answer, i) => {
    answers.push(answer.answer);
  });

  //for table
  let rows = answers;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //handle switch state
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <div className="form-analytics-text-container">
        <div className="form-analytics-text-title">{question.question}</div>
        {answers.length === 0 && "no responses yet"}
        {answers.length > 0 && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Table</Grid>
                <Grid item>
                  <Switch
                    checked={state.checked}
                    onChange={handleChange}
                    name="checked"
                    color="primary"
                  />
                </Grid>
                <Grid item>Cloud</Grid>
              </Grid>
            </Typography>
          </div>
        )}
        {answers.length > 0 && state.checked && (
          <div className="text-analytics-cloud-container">
            <FormAnalyticsWordCloud answers={answers} />
            {/*  /> */}
          </div>
        )}
        {answers.length > 0 && !state.checked && (
          <TableContainer
            component={Paper}
            className="text-analytics-table-container"
          >
            <Table
              className={classes.table}
              aria-label="custom pagination table"
            >
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {row}
                    </TableCell>
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  );
}
