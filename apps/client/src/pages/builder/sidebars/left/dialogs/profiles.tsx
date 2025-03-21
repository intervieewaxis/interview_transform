import { useCallback } from "react";
import { useDebounceValue } from "usehooks-ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { t, Trans } from "@lingui/macro";
import { defaultProfile, profileSchema } from "@reactive-resume/schema";
import {
  Avatar,
  AvatarImage,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@reactive-resume/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { BrandIcon } from "@/client/components/brand-icon";

import { SectionDialog } from "../sections/shared/section-dialog";
import { URLInput } from "../sections/shared/url-input";

const formSchema = profileSchema;

type FormValues = z.infer<typeof formSchema>;

export const ProfilesDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultProfile,
    resolver: zodResolver(formSchema),
  });

  const [iconSrc, setIconSrc] = useDebounceValue("", 400);

  const handleIconChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setIconSrc("");
    } else {
      setIconSrc(`https://cdn.simpleicons.org/${event.target.value}`);
    }
  }, []);

  return (
    <SectionDialog<FormValues> id="profiles" form={form} defaultValues={defaultProfile}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="network"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Network`}</FormLabel>
              <FormControl>
                {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
                <Input {...field} placeholder="LinkedIn" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Username`}</FormLabel>
              <FormControl>
                <Input {...field} placeholder="john.doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="url"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t`Website`}</FormLabel>
              <FormControl>
                <URLInput {...field} placeholder="https://linkedin.com/in/johndoe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="icon"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel htmlFor="iconSlug">{t`Icon`}</FormLabel>
              <FormControl>
                <div className="flex items-center gap-x-2">
                  <Avatar className="size-8 bg-white p-1.5">
                    <BrandIcon slug={field.value} />
                  </Avatar>
                  <Input {...field} placeholder="github" onChange={field.onChange} />
                </div>
              </FormControl>
              <FormMessage />
              <FormDescription className="ml-10">
                <Trans>
                  Powered by{" "}
                  <a
                    href="https://simpleicons.org/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="font-medium"
                  >
                    Simple Icons
                  </a>
                </Trans>
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </SectionDialog>
  );
};
