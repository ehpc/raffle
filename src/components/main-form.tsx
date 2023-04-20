"use client";

import {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  useCallback,
  useState,
} from "react";
import { Inter } from "next/font/google";
import classNames from "classnames";
import { getPlaceSuffix } from "@/utils/common";

const inter = Inter({ subsets: ["latin"] });

const MainForm = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState("");
  const [result, setResult] = useState<[string, number][]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setValue(e.target.value ?? "");
    },
    []
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (!value) {
        setInputError("required");
        return;
      }

      setIsLoading(true);

      setInputError("");
      setError("");

      setTimeout(async () => {
        try {
          const response = await fetch(
            `/api/chose-winner?participants=${value}`,
            {
              method: "GET",
            }
          );
          if (response.status !== 200) {
            throw new Error();
          }
          setResult(await response.json());
        } catch {
          setError("Unknown error");
          setResult([]);
        } finally {
          setIsLoading(false);
        }
      }, 2000);
    },
    [value]
  );

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={onInputChange}
          type="text"
          placeholder="list of participants"
          className={classNames(
            "p-4 rounded-xl outline-none bg-slate-700 border border-solid",
            inputError ? "border-red-600" : "border-slate-400",
            inter.className
          )}
        />
        <button
          type="submit"
          aria-label="go"
          className="ml-8 p-4 hover:opacity-60 duration-75 disabled:opacity-60"
          disabled={isLoading}
        >
          Go
        </button>
        {inputError && (
          <div
            className={classNames(
              "mt-1 text-red-600 font-medium",
              inter.className
            )}
          >
            {inputError}
          </div>
        )}
        {error && (
          <div
            className={classNames(
              "mt-6 text-red-600 font-medium",
              inter.className
            )}
          >
            {error}
          </div>
        )}
      </form>
      {!isLoading ? (
        <div
          className={classNames("flex flex-col gap-4 mt-10", inter.className)}
        >
          {result.map((item, index) =>
            index === 0 ? (
              <div key={item[0]} className="justify-self-end text-2xl">
                <span>{`The winner is player ${item[0]} with `}</span>
                <span className="font-semibold">{item[1]}</span>
                <span>{` points`}</span>
              </div>
            ) : (
              <div key={item[0]} className="justify-self-end">
                <span>{`player ${item[0]} gets `}</span>
                <span className="font-semibold">{item[1]}</span>
                <span>{` points and takes ${index + 1}`}</span>
                <span className="align-super text-xs">
                  {getPlaceSuffix(index + 1, "en")}
                </span>
                <span>{` place`}</span>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="text-9xl mt-20">
          <div className="animate-spin pb-10">💩</div>
        </div>
      )}
    </>
  );
};

export default MainForm;
