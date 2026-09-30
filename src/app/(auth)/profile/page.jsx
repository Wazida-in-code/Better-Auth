"use client";

import { changePassword, updateUser } from "@/lib/auth-client";
import {Eye, EyeSlash, FloppyDisk} from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  InputGroup,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { date } from "better-auth";
import { useState } from "react";

export default function ProfilePage() {
    const [isVisible, setIsVisible] = useState(false);

  const handleProfileUpdate = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userdata = Object.fromEntries(formData.entries());

    const resData = await updateUser({
        name: userdata.name
    })
        console.log(resData);
    // alert("Form submitted successfully!");

    // const {data: newPassData, error} = await changePassword({
    //     newPassword: newPassData,
    //     currentPassword: userdata.password
    // })
  };

  return (
    <Form className="w-full max-w-96" onSubmit={handleProfileUpdate}>
      <Fieldset>
        <Fieldset.Legend>Profile Settings</Fieldset.Legend>
        <Description>Update your profile information.</Description>
        <FieldGroup>
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }

              return null;
            }}
          >
            <Label>Name</Label>
            <Input placeholder="John Doe" />
            <FieldError />
          </TextField>
          
          <Label className="mr-2">Password</Label>
                <InputGroup>
                  <InputGroup.Input
                    className="w-full max-w-[280px]"
                    type={isVisible ? "text" : "password"}
                  />
                  <InputGroup.Suffix className="pe-0">
                    <Button
                      isIconOnly
                      aria-label={isVisible ? "Hide password" : "Show password"}
                      size="sm"
                      variant="ghost"
                      onPress={() => setIsVisible(!isVisible)}
                    >
                      {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                    </Button>
                  </InputGroup.Suffix>
                </InputGroup>
          
        </FieldGroup>
        <Fieldset.Actions>
          <Button type="submit">
            <FloppyDisk />
            Save changes
          </Button>
          <Button type="reset" variant="secondary">
            Cancel
          </Button>
        </Fieldset.Actions>
      </Fieldset>
    </Form>
  );
}