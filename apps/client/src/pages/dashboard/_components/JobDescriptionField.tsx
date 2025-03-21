import {
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
  Input
} from "@reactive-resume/ui";
import { useState } from "react";
import axios from "axios";
import { UseFormReturn, Path, PathValue } from "react-hook-form";

// Make the component use a generic type parameter to match the parent form's type
interface JobDescriptionFieldProps<T extends { jd?: string }> {
  form: UseFormReturn<T>;
}

// Use a generic type parameter T that extends an object with an optional jd property
function JobDescriptionField<T extends { jd?: string }>({ form }: JobDescriptionFieldProps<T>) {
  // Changed the default state to true so "Add from Link" tab shows first
  const [isLinkTab, setIsLinkTab] = useState(true);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkLoading, setLinkLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Helper function to safely set the form value
  const setJdValue = (value: string) => {
    form.setValue('jd' as Path<T>, value as PathValue<T, Path<T>>);
  };

  const handleFetchFromLink = async () => {
    if (!linkUrl) {
      setMessage("Please enter a URL");
      return;
    }
   
    setLinkLoading(true);
    setMessage("");
   
    try {
      const response = await axios.post(
        "https://jdscraper.interviewaxis.com/extract",
        {
          url: linkUrl
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
     
      console.log(JSON.stringify(response.data.data));
     
      // Set the text with the received data
      if (response.data && response.data.data) {
        // Check if the data is an object and extract just the job description
        if (typeof response.data.data === 'object') {
          // If it's a job description object with job_description field
          if (response.data.data.job_description) {
            // Replace literal \n with actual line breaks
            const formattedText = response.data.data.job_description.replace(/\\n/g, '\n');
            setJdValue(formattedText);
          } else {
            // For other objects, extract just the content without the JSON structure
            const extractedText = Object.values(response.data.data).join('\n\n');
            setJdValue(extractedText.replace(/\\n/g, '\n'));
          }
        } else if (typeof response.data.data === 'string') {
          // Try to parse if it's a JSON string
          try {
            const parsedData = JSON.parse(response.data.data);
            if (parsedData.job_description) {
              const formattedText = parsedData.job_description.replace(/\\n/g, '\n');
              setJdValue(formattedText);
            } else {
              setJdValue(response.data.data.replace(/\\n/g, '\n'));
            }
          } catch (e) {
            // Not valid JSON, just use as is
            setJdValue(response.data.data.replace(/\\n/g, '\n'));
          }
        } else {
          setJdValue(String(response.data.data).replace(/\\n/g, '\n'));
        }
       
        // Switch to the manual tab
        setIsLinkTab(false);
        setMessage("Job description fetched successfully!");
      }
    } catch (error: any) { // Using 'any' for error type since axios errors can be complex
      if (error.response) {
        console.error("Server responded with an error:", error.response.status, error.response.data);
        setMessage("Failed to fetch data from URL. Server error.");
      } else if (error.request) {
        console.error("No response received:", error.request);
        setMessage("Failed to fetch data from URL. No response received.");
      } else {
        console.error("Error:", error.message);
        setMessage("Failed to fetch data from URL. " + error.message);
      }
    } finally {
      setLinkLoading(false);
    }
  };

  return (
    <FormField
      name={'jd' as Path<T>}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Job Description</FormLabel>
          <FormControl>
            <div className="w-full">
              {/* Custom tab implementation - reversed order of tabs */}
              <div className="flex  mb-4">
                <button
                  type="button"
                  className={`py-2 px-4 mr-2 ${isLinkTab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                  onClick={() => setIsLinkTab(true)}
                >
                  Add from Link
                </button>
                <button
                  type="button"
                  className={`py-2 px-4 ${!isLinkTab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                  onClick={() => setIsLinkTab(false)}
                >
                  Manual Entry
                </button>
              </div>
              
              {isLinkTab ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input 
                      placeholder="Enter job posting URL" 
                      value={linkUrl} 
                      onChange={(e) => setLinkUrl(e.target.value)} 
                      className="flex-1"
                    />
                    <button
                      type="button"
                      onClick={handleFetchFromLink}
                      disabled={linkLoading}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                    >
                      {linkLoading ? "Loading..." : "Fetch JD"}
                    </button>
                  </div>
                  {message && (
                    <p className={`text-sm ${message.includes("Failed") ? "text-red-500" : "text-green-500"}`}>
                      {message}
                    </p>
                  )}
                </div>
              ) : (
                <textarea
                  {...field}
                  placeholder="Enter job description manually or paste it here..."
                  className="w-full min-h-[150px] p-2 border border-gray-300 rounded bg-black text-white"
                />
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default JobDescriptionField;