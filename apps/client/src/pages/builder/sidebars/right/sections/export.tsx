import { t } from "@lingui/macro";
import { CircleNotch, FileJs, FilePdf } from "@phosphor-icons/react";
import { buttonVariants, Card, CardContent, CardDescription, CardTitle } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { saveAs } from "file-saver";

import { usePrintResume } from "@/client/services/resume/print";
import { useUser } from "@/client/services/user";
import { useResumeStore } from "@/client/stores/resume";

import { getSectionIcon } from "../shared/section-icon";

const onJsonExport = () => {
  const { resume } = useResumeStore.getState();
  const filename = `reactive_resume-${resume.id}.json`;
  const resumeJSON = JSON.stringify(resume.data, null, 2);

  saveAs(new Blob([resumeJSON], { type: "application/json" }), filename);
};

const openInNewTab = (url: string) => {
  const win = window.open(url, "_blank");
  if (win) win.focus();
};

export const ExportSection = () => {
  const { printResume, loading } = usePrintResume();
  const { user } = useUser();

  // const onPdfExport = async () => {
  //   const { resume } = useResumeStore.getState();
  //   const url = await printResume({ id: resume.id });

  //   openInNewTab(url);
  // };

  const onPdfExport = async () => {
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

  return (
    <section id="export" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {getSectionIcon("export")}
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">{t`Export`}</h2>
        </div>
      </header>

      <main className="grid gap-y-4">
        {/* <Card
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "h-auto cursor-pointer flex-row items-center gap-x-5 px-4 pb-3 pt-1",
          )}
          onClick={onJsonExport}
        >
          <FileJs size={22} />
          <CardContent className="flex-1">
            <CardTitle className="text-sm">{t`JSON`}</CardTitle>
            <CardDescription className="font-normal">
              {t`Download a JSON snapshot of your resume. This file can be used to import your resume in the future, or can even be shared with others to collaborate.`}
            </CardDescription>
          </CardContent>
        </Card> */}

        <Card
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "h-auto cursor-pointer flex-row items-center gap-x-5 px-4 pb-3 pt-1",
            loading && "pointer-events-none cursor-progress opacity-75",
          )}
          onClick={onPdfExport}
        >
          {loading ? <CircleNotch size={22} className="animate-spin" /> : <FilePdf size={22} />}

          <CardContent className="flex-1">
            <CardTitle className="text-sm">{t`PDF`}</CardTitle>
            <CardDescription className="font-normal">
              {t`Download a PDF of your resume. This file can be used to print your resume, send it to recruiters, or upload on job portals.`}
            </CardDescription>
          </CardContent>
        </Card>
      </main>
    </section>
  );
};
