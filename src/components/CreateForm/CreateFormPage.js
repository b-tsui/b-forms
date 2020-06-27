import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import CreateSingleQuestion from "./CreateSingleQuestion";
import CreateFormPreview from "./CreateFormPreview";
import CreateFormShareDialog from "./CreateFormShareDialog";
import FormAnalytics from "../FormAnalytics/FormAnalytics";
import "../../styles/create-form.css";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SaveIcon from "@material-ui/icons/Save";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const GET_FORM = gql`
  query GetForm($id: ID!) {
    form(id: $id) {
      id
      user {
        name
      }
      title
      description
      questions {
        id
        formId
        question
        questionType
        options
      }
      createdAt
    }
  }
`;

const ADD_QUESTION = gql`
  mutation AddQuestion($input: AddQuestionInput!) {
    addQuestion(input: $input) {
      id
      formId
      question
      questionType
      options
    }
  }
`;

const UPDATE_QUESTION = gql`
  mutation UpdateQuestion($input: UpdateQuestionInput!) {
    updateQuestion(input: $input) {
      id
      formId
      question
      questionType
      options
    }
  }
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CreateFormPage({
  match: {
    params: { formId },
  },
}) {
  const { loading, error, data, refetch } = useQuery(GET_FORM, {
    variables: { id: formId },
  });
  const [addQuestion] = useMutation(ADD_QUESTION);
  const [value, setValue] = useState(0); //for tab panel
  const [allQuestions, setAllQuestions] = useState([]); //stores all questions to save
  const [updateQuestion] = useMutation(UPDATE_QUESTION);

  useEffect(() => {
    if (!loading) {
      setAllQuestions(data.form.questions);
    }
  }, [loading]);
  //for query loading
  if (loading) return null;
  if (error) return `Error! ${error}`;

  const handleAddQuestion = async (e) => {
    let newQuestion = await addQuestion({ variables: { input: { formId } } });
    //update cache with new question

    refetch();
    setAllQuestions([...allQuestions, newQuestion.data.addQuestion]);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSaveQuestions = async (e) => {
    allQuestions.forEach(async (question) => {
      await updateQuestion({
        variables: {
          input: {
            id: question.id,
            formId: question.formId,
            question: question.question,
            questionType: question.questionType,
            options: question.options,
          },
        },
      });
      refetch();
    });
  };

  return (
    <>
      <div className="create-form-container">
        <Paper elevation={3} className="create-form-header">
          <div className="create-form-title">{data.form.title}</div>
          <div className="create-form-date">{`Created ${new Date(
            Number(data.form.createdAt)
          ).toLocaleDateString("en-US")} by ${data.form.user.name}`}</div>
          <div className="create-form-description">{data.form.description}</div>
          <CreateFormShareDialog formId={formId} />
        </Paper>
        <Paper square className="create-form-tabs-container">
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab
              inkBarStyle={{ background: "blue" }}
              label="Questions"
              {...a11yProps(0)}
            />
            <Tab label="Form Preview" {...a11yProps(1)} />
            <Tab label="Analytics" {...a11yProps(2)} />
          </Tabs>
        </Paper>
        <TabPanel
          value={value}
          index={0}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {data.form.questions &&
            data.form.questions.map((question) => (
              <CreateSingleQuestion
                question={question}
                refetch={refetch}
                allQuestions={allQuestions}
                setAllQuestions={setAllQuestions}
                key={question.id}
              />
            ))}
          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddQuestion}
              style={{ marginRight: "15px" }}
            >
              <AddCircleIcon />
              &nbsp; Add Question
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveQuestions}
            >
              <SaveIcon />
              &nbsp; Save All
            </Button>
          </div>
        </TabPanel>
        <TabPanel
          value={value}
          index={1}
          className="create-form-preview-container"
        >
          <CreateFormPreview form={data.form} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <FormAnalytics formId={formId} />
        </TabPanel>
      </div>
    </>
  );
}
