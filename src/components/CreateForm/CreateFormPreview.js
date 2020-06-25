import React from "react";
import "../../styles/form-preview.css";
import CreateSingleQuestionPreview from "./CreateSingleQuestionPreview";

export default function CreateFormPreview({ form }) {
  return (
    <>
      <div className="create-preview-container">
        <h2>form preview</h2>
        <form className="create-preview-form-container">
          {form.questions.map((question) => (
            <CreateSingleQuestionPreview
              question={question}
              key={question.id}
            />
          ))}
        </form>
      </div>
    </>
  );
}
