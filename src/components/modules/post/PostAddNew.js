import React from "react";
import {useForm} from "react-hook-form";
import styled from "styled-components";
import {Button} from "../../button";
import {Dropdown} from "../../dropdown";
import {Field} from "../../field";
import {Input} from "../../input";
import {Label} from "../../label";
import Radio from "../../radio/Radio";
const PostAddNew = () => {
  const {control, watch, setValue} = useForm({
    mode: "onChange",
    defaultValues: {
      status: "",
      category: "",
    },
  });
  const watchStatus = watch("status");
  const watchCategory = watch("category");

  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form>
        <div className="gap-x-10 grid grid-cols-2 mb-10">
          <Field>
            <Label>Title</Label>
            <Input
              type="text"
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              type="text"
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="gap-x-10 grid grid-cols-2 mb-10">
          <Field>
            <Label>Status</Label>
            <div className="gap-x-5 flex items-center">
              <Radio
                name="status"
                control={control}
                checked={watchStatus === "approved"}
                onClick={() => setValue("status", "approved")}
                value="approved"
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === "pending"}
                onClick={() => setValue("status", "pending")}
                value="pending"
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === "reject"}
                onClick={() => setValue("status", "reject")}
                value="reject"
              >
                Reject
              </Radio>
            </div>
          </Field>
          <Field>
            <Label>Author</Label>
            <Input
              type="text"
              name="author"
              control={control}
              placeholder="Find the author"
            ></Input>
          </Field>
        </div>
        <div className="gap-x-10 grid grid-cols-2 mb-10">
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Option>Knowledge</Dropdown.Option>
              <Dropdown.Option>Blockchain</Dropdown.Option>
              <Dropdown.Option>Setup</Dropdown.Option>
              <Dropdown.Option>Nature</Dropdown.Option>
              <Dropdown.Option>Developer</Dropdown.Option>
            </Dropdown>
          </Field>
          <Field></Field>
        </div>
        <Button type="submit" className="mx-auto">
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};
const PostAddNewStyles = styled.div`
  font-size: 1.6rem;
  .dashboard-heading {
    font-weight: bold;
    font-size: 3.6rem;
    margin-bottom: 40px;
    background: -webkit-linear-gradient(
      ${(props) => props.theme.primary},
      ${(props) => props.theme.secondary}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 1px;
  }
`;

export default PostAddNew;
