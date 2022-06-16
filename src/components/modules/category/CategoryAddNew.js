import React from "react";
import {useForm} from "react-hook-form";
import {Button} from "../../button";
import {Field} from "../../field";
import {Input} from "../../input";
import {Label} from "../../label";
import Radio from "../../radio/Radio";
import DashboardHeading from "../dashboard/DashboardHeading";

const CategoryAddNew = () => {
  const {
    control,
    setValue,
    formState: {errors, isSubmitting, isValid},
  } = useForm({
    mode: "onChange",
  });
  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form autoComplete={"off"}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
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
            <div className="gap-x-5 flex flex-wrap">
              <Radio name="status" control={control} checked={true}>
                Approved
              </Radio>
              <Radio name="status" control={control}>
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>
        <Button kind="primary" className="mx-auto">
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
