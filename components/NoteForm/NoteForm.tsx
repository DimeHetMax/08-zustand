"use client"
import { object, string } from "yup";
import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from "formik";
import css from "./NoteForm.module.css";
import type { NoteTag } from "../../types/note";
// import { useNotesMutation } from "../../hooks/useNotesMutatePost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
interface InitialValues {
  title: string;
  content: string;
  tag: NoteTag;
}
interface NoteFormProps {
  handleModalClose: () => void;
}
const InitialValues: InitialValues = {
  title: "",
  content: "",
  tag: "Todo",
};

const NoteFormSchema = object({
  title: string().min(3).max(50).required("Fill out the title"),
  content: string().max(500),
  tag: string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Choose one")
    .required("Select the type"),
});
const NoteForm = ({ handleModalClose }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      handleModalClose();
    },
  });
  const onSubmitForm = (
    values: InitialValues,
    actions: FormikHelpers<InitialValues>,
  ) => {
    mutate(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={InitialValues}
      onSubmit={onSubmitForm}
      validationSchema={NoteFormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" className={css.error} component="span" />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" className={css.error} component="span" />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" className={css.error} component="span" />
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={() => handleModalClose()}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};
export default NoteForm;
