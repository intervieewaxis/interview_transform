import { t } from "@lingui/macro";
import {
  ArrowClockwise,
  ArrowCounterClockwise,
  ArrowsOutCardinal,
  CircleNotch,
  ClockClockwise,
  CubeFocus,
  FilePdf,
  Hash,
  LineSegment,
  LinkSimple,
  MagnifyingGlass,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
} from "@phosphor-icons/react";
import { Button, Separator, Toggle, Tooltip } from "@reactive-resume/ui";
import { motion } from "framer-motion";
import { useState } from "react";

import { useToast } from "@/client/hooks/use-toast";
import { usePrintResume } from "@/client/services/resume";
import { useUser } from "@/client/services/user";
import { useBuilderStore } from "@/client/stores/builder";
import { useResumeStore, useTemporalResumeStore } from "@/client/stores/resume";

const openInNewTab = (url: string) => {
  const win = window.open(url, "_blank");
  if (win) win.focus();
};

export const BuilderToolbar = () => {
  const { toast } = useToast();

  const [panMode, setPanMode] = useState<boolean>(true);

  const setValue = useResumeStore((state) => state.setValue);
  const undo = useTemporalResumeStore((state) => state.undo);
  const redo = useTemporalResumeStore((state) => state.redo);
  const frameRef = useBuilderStore((state) => state.frame.ref);

  const id = useResumeStore((state) => state.resume.id);
  const isPublic = useResumeStore((state) => state.resume.visibility === "public");
  const pageOptions = useResumeStore((state) => state.resume.data.metadata.page.options);

  const { printResume, loading } = usePrintResume();

  const { user } = useUser();

  // const onPrint = async () => {
  //   const url = await printResume({ id });

  //   openInNewTab(url);
  // };

  const onCopy = async () => {
    const url = await printResume({ id });
    await navigator.clipboard.writeText(url);

    toast({
      variant: "success",
      title: t`A link has been copied to your clipboard.`,
      description: t`Anyone with this link can view and download the resume. Share it on your profile or with recruiters.`,
    });
  };

  const onPrint = async () => {
    const myemail = user?.email || "";
    const formData = new FormData();
    formData.append("email", myemail);

    // const currentUrl = window.location.href;
    // const rid = currentUrl.split("/").pop() || "";

    const { resume } = useResumeStore.getState();
    // const url = await printResume({ id: resume.id });
    // openInNewTab(url);

    try {
      const response = await fetch("https://interviewaxis.com/api/v1/checkCredit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();

        if (result.status === 404 && result.message === "To download, please purchase Plan 2") {
          alert(
            'You do not have credits to download the CV. Please subscribe "Plan 2" to download',
          );
          window.location.href = `https://www.interviewaxis.com/pricing-plan?tid=${resume.id}`;
        } else if (result.credit === "yes") {
          const { resume } = useResumeStore.getState();
          const confirmDownload = confirm(
            "1 credit will be deducted while exporting the PDF. Do you want to proceed?",
          );

          if (confirmDownload) {
            await fetch("https://www.interviewaxis.com/api/v1/incrementDownloadCount", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: myemail,
                count: 1,
              }),
            });

            const url = await printResume({ id: resume.id });
            openInNewTab(url);
          } else {
            console.log("User canceled the PDF export.");
          }
        } else {
          alert("You have exhausted all the credits of Plan 2. Kindly re-subscribe.");
          window.location.href = `https://www.interviewaxis.com/pricing-plan?tid=${resume.id}`;
        }
      } else {
        alert("Failed to check credits. Please try again.");
      }
    } catch (error) {
      console.error("Error checking credits:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const onZoomIn = () => frameRef?.contentWindow?.postMessage({ type: "ZOOM_IN" }, "*");
  const onZoomOut = () => frameRef?.contentWindow?.postMessage({ type: "ZOOM_OUT" }, "*");
  const onResetView = () => frameRef?.contentWindow?.postMessage({ type: "RESET_VIEW" }, "*");
  const onCenterView = () => frameRef?.contentWindow?.postMessage({ type: "CENTER_VIEW" }, "*");
  const onTogglePanMode = () => {
    setPanMode(!panMode);
    frameRef?.contentWindow?.postMessage({ type: "TOGGLE_PAN_MODE", panMode: !panMode }, "*");
  };

  return (
    <motion.div className="fixed inset-x-0 bottom-0 mx-auto hidden py-6 text-center md:block">
      <div className="inline-flex items-center justify-center rounded-full bg-background px-4 shadow-xl">
        <Tooltip content={t`Undo`}>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-none"
            onClick={() => {
              undo();
            }}
          >
            <ArrowCounterClockwise />
          </Button>
        </Tooltip>

        <Tooltip content={t`Redo`}>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-none"
            onClick={() => {
              redo();
            }}
          >
            <ArrowClockwise />
          </Button>
        </Tooltip>

        <Separator orientation="vertical" className="h-9" />

        <Tooltip content={panMode ? t`Scroll to Pan` : t`Scroll to Zoom`}>
          <Toggle className="rounded-none" pressed={panMode} onPressedChange={onTogglePanMode}>
            {panMode ? <ArrowsOutCardinal /> : <MagnifyingGlass />}
          </Toggle>
        </Tooltip>

        <Separator orientation="vertical" className="h-9" />

        <Tooltip content={t`Zoom In`}>
          <Button size="icon" variant="ghost" className="rounded-none" onClick={onZoomIn}>
            <MagnifyingGlassPlus />
          </Button>
        </Tooltip>

        <Tooltip content={t`Zoom Out`}>
          <Button size="icon" variant="ghost" className="rounded-none" onClick={onZoomOut}>
            <MagnifyingGlassMinus />
          </Button>
        </Tooltip>

        <Tooltip content={t`Reset Zoom`}>
          <Button size="icon" variant="ghost" className="rounded-none" onClick={onResetView}>
            <ClockClockwise />
          </Button>
        </Tooltip>

        <Tooltip content={t`Center Artboard`}>
          <Button size="icon" variant="ghost" className="rounded-none" onClick={onCenterView}>
            <CubeFocus />
          </Button>
        </Tooltip>

        <Separator orientation="vertical" className="h-9" />

        <Tooltip content={t`Toggle Page Break Line`}>
          <Toggle
            className="rounded-none"
            pressed={pageOptions.breakLine}
            onPressedChange={(pressed) => {
              setValue("metadata.page.options.breakLine", pressed);
            }}
          >
            <LineSegment />
          </Toggle>
        </Tooltip>

        <Tooltip content={t`Toggle Page Numbers`}>
          <Toggle
            className="rounded-none"
            pressed={pageOptions.pageNumbers}
            onPressedChange={(pressed) => {
              setValue("metadata.page.options.pageNumbers", pressed);
            }}
          >
            <Hash />
          </Toggle>
        </Tooltip>

        <Separator orientation="vertical" className="h-9" />

        {/* <Tooltip content={t`Copy Link to Resume`}>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-none"
            disabled={!isPublic}
            onClick={onCopy}
          >
            <LinkSimple />
          </Button>
        </Tooltip> */}

        <Tooltip content={t`Download PDF`}>
          <Button
            size="icon"
            variant="ghost"
            disabled={loading}
            className="rounded-none"
            onClick={onPrint}
          >
            {loading ? <CircleNotch className="animate-spin" /> : <FilePdf />}
          </Button>
        </Tooltip>
      </div>
    </motion.div>
  );
};
