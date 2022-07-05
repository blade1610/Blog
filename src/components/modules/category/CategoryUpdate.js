import {doc, getDoc, updateDoc} from "firebase/firestore";
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useNavigate, useSearchParams} from "react-router-dom";
import {toast} from "react-toastify";
import slugify from "slugify";
import {db} from "../../../firebase/firebase-config";
import {categoryStatus} from "../../../utils/constants";
import {Button} from "../../button";
import {Field, FieldCheckboxes} from "../../field";
import {Input} from "../../input";
import {Label} from "../../label";
import Radio from "../../radio/Radio";
import DashboardHeading from "../dashboard/DashboardHeading";

const CategoryUpdate = () => {
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  const navigate = useNavigate();
  const {
    control,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: {isSubmitting},
  } = useForm({mode: "onSubmit", defaultValues: {}});
  const watchStatus = watch("status");
  const handleUpdateCategory = async (values) => {
    const colRef = doc(db, "categories", categoryId);
    console.log(colRef);
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.slug || values.title, {lower: true}),
      status: Number(values.status),
    });
    toast.success("Update Category Successfully!");
    navigate("/manage/category");
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "categories", categoryId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }
    fetchData();
  }, [categoryId, reset]);
  if (!categoryId) return null;
  return (
    <div>
      <DashboardHeading
        title="Update category"
        desc={`Update your category id: ${categoryId}`}
      ></DashboardHeading>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(handleUpdateCategory)}
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
          className="mx-auto"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Update category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
