import slugify from "slugify";
import React from "react";
import Radio from "../../radio/Radio";
import DashboardHeading from "../dashboard/DashboardHeading";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {Label} from "../../label";
import {Input} from "../../input";
import {Field, FieldCheckboxes} from "../../field";
import {db} from "../../../firebase/firebase-config";
import {categoryStatus} from "../../../utils/constants";
import {Button} from "../../button";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
const CategoryAddNew = () => {
  const {
    control,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: {errors, isSubmitting, isValid},
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createdAt: new Date(),
    },
  });
  const watchStatus = watch("status");

  const handleAddNewCategory = async (values) => {
    if (!isValid) return;
    try {
      const newValues = {...values};
      newValues.slug = slugify(newValues.slug || newValues.name, {
        lower: true,
      });
      const colRef = collection(db, "categories");
      await addDoc(colRef, {
        ...newValues,
        createdAt: serverTimestamp(),
      });
      toast.success("Create New Category Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      reset({
        name: "",
        slug: "",
        status: 1,
        createdAt: new Date(),
      });
    }
  };
  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>

      <form
        onSubmit={handleSubmit(handleAddNewCategory)}
        autoComplete="off"
      >
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                value={categoryStatus.APPROVED}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                value={categoryStatus.UNAPPROVED}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          type="submit"
          kind="primary"
          className="mx-auto"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
