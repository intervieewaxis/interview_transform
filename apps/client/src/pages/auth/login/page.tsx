import { useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { t, Trans } from "@lingui/macro";
import { ArrowRight } from "@phosphor-icons/react";
import { loginSchema } from "@reactive-resume/dto";
import { usePasswordToggle } from "@reactive-resume/hooks";
import {
  Alert,
  AlertTitle,
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";

import { useLogin } from "@/client/services/auth";
import { useFeatureFlags } from "@/client/services/feature";

type FormValues = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const { login, loading } = useLogin();
  const { flags } = useFeatureFlags();

  const formRef = useRef<HTMLFormElement>(null);
  usePasswordToggle(formRef);

  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data);
    } catch {
      form.reset();
    }
  };

  const getQueryParam = (param: string): string | null => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };

 const xorDecrypt = (encryptedBase64: string, key: string): string => {
    const encryptedData = atob(encryptedBase64);
    let output = '';

    for (let i = 0; i < encryptedData.length; i++) {
        output += String.fromCharCode(encryptedData.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }

    return output;
};

useEffect(() => {  
    const queryParam = getQueryParam('type');
    if (queryParam !== null && queryParam !== undefined) {
        // Safely handle null or undefined queryParam
        const encryptedEmail = decodeURIComponent(queryParam);
       // console.log('Encoded Email:', encryptedEmail);

        const key = "SMINTRVHE";
        const email = xorDecrypt(encryptedEmail, key);
       console.log('il:', email);

        if (email) {
            const timer = setTimeout(() => {
                form.setValue("identifier", email);
                form.setValue("password", "12345678");
                form.handleSubmit(onSubmit)();
            }, 2000); 
        }
    } else {
        console.log('Query parameter "type" is missing or null.');
    }
}, []);

  return (
    <div className="space-y-8">
      <Helmet>
        <title>
          {t`Resume Transform`} - {t`InterviewAxis`}
        </title>
      </Helmet>

      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight">{t`Sign in to your account`}</h2>
        <h6>
          <span className="opacity-75">{t`Don't have an account?`}</span>
          <Button asChild variant="link" className="px-1.5">
            <Link to="/auth/register">
              {t({ message: "Create one now", context: "This is a link to create a new account" })}{" "}
              <ArrowRight className="ml-1" />
            </Link>
          </Button>
        </h6>
      </div>

      {flags.isEmailAuthDisabled && (
        <Alert variant="error">
          <AlertTitle>{t`Signing in via email is currently disabled by the administrator.`}</AlertTitle>
        </Alert>
      )}

      <div className={cn(flags.isEmailAuthDisabled && "pointer-events-none select-none blur-sm")}>
        <Form {...form}>
          <form
            ref={formRef}
            className="flex flex-col gap-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`Email`}</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="email"
                      className="lowercase"
                      placeholder="john.doe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t`You can also enter your username.`}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`Password`}</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    <Trans>
                      Hold <code className="text-xs font-bold">Ctrl</code> to display your password
                      temporarily.
                    </Trans>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4 flex items-center gap-x-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {t`Sign in`}
              </Button>

              <Button asChild variant="link" className="px-4">
                <Link to="/auth/forgot-password">{t`Forgot Password?`}</Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
