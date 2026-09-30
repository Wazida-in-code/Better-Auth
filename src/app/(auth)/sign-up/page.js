"use client";
import {Eye, EyeSlash} from "@gravity-ui/icons";
import { signIn, signUp } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import { useState } from "react";

const SignUpPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const onSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    // console.log(data);

    const {data: resData, error} = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        // callbackURL: "/"
    });
    console.log(resData, error);
  };
  const handleGoogle = async () => {
    const resData = await signIn.social({
      provider: "google"
    })
  };

  const handleGithub = async () => {
    const gitData = await signIn.social({
      provider: "github"
    })
  }
  return (
    <div>
      <h1>Please, Sign Up</h1>

      <Form className="flex w-96 flex-col gap-4 mb-5" onSubmit={onSubmit}>
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
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />

           <TextField className="w-full max-w-[280px]" name="password">
      <Label>Password</Label>
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
    </TextField>
        </TextField>
        <div className="flex gap-2">
          <Button type="submit">
            <Check />
            Submit
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>

      <Button onClick={handleGoogle}>Sign in with Google</Button>
      <Button onClick={handleGithub}>Sign in with Github</Button>
    </div>
  );
};

export default SignUpPage;
