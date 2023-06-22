import { useEffect, useState } from "react";
import LoadingSpinner from "./ui/LoadingSpinner";
import { supabaseClient } from "../config/supabase-client";
import { Button } from "./ui/Button";
import { EFieldTypes } from "../store/type/field.type";

export const Submissions = ({ id, form_uid }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    const { data, error } = await supabaseClient
      .from("form_submissions")
      .select("*")
      .eq("form_id", id);
    if (!error) {
      const formattedData = data.map((entry) => {
        const row: any = {};
        entry.submissions.forEach((submission: any) => {
          row[submission.label] = {
            value: submission.value,
            type: submission.type,
          };
        });
        return row;
      });
      const allLabels: any = {};
      formattedData.forEach((row) => {
        Object.keys(row).forEach((label) => {
          allLabels[label] = true;
        });
      });
      const labels = Object.keys(allLabels);
      setLabels(labels);
      setSubmissions(formattedData);
    }
    setIsLoading(false);
  };

  const handleDownload = () => {
    // Create CSV content
    let csvContent = labels.join(",") + "\n";
    submissions.forEach((row) => {
      csvContent += labels.map((label) => row[label]).join(",") + "\n";
    });

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    // Create an anchor element and trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = `FormEasy-${form_uid}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, []);

  console.log({ submissions });

  return (
    <div className="py-10">
      {isLoading ? (
        <div className="flex justify-center items-center h-60 w-full">
          <LoadingSpinner />
        </div>
      ) : submissions?.length > 0 ? (
        <div className="space-y-6">
          <div className="flex justify-end w-full">
            <div>
              <Button text="Download as CSV" onClick={handleDownload} />
            </div>
          </div>
          <div className="bg-white rounded p-4 space-y-4 shadow overflow-x-auto left-panel">
            <div className="flex space-x-8 px-6 py-4 bg-gray-100 min-w-max rounded-md shadow-md">
              {labels.map((label, index) => (
                <p
                  key={index}
                  className="text-sm font-semibold text-center min-w-[200px] max-w-[200px] break-words"
                >
                  {label}
                </p>
              ))}
            </div>
            <div className="space-y-4 min-w-max">
              {submissions.map((row: any, rowIndex: number) => (
                <div
                  key={rowIndex}
                  className="flex space-x-8 px-6 py-3 bg-white rounded-md border-2"
                >
                  {labels.map((label, cellIndex) => (
                    <p
                      key={cellIndex}
                      className="text-sm font-semibold text-center min-w-[200px] max-w-[200px]  break-words"
                    >
                      {row[label]?.value?.length ? (
                        row[label].type === EFieldTypes.FILE ||
                        row[label].type === EFieldTypes.URL ? (
                          <a
                            href={row[label].value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600"
                          >
                            {row[label].type === EFieldTypes.URL
                              ? row[label].value
                              : "File Link"}
                          </a>
                        ) : (
                          row[label].value
                        )
                      ) : (
                        "-"
                      )}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full min-h-[300px] bg-white rounded shadow">
          <p className=" font-semibold">No submissions found</p>
        </div>
      )}
    </div>
  );
};
