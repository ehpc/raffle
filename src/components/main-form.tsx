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
  const [result, setResult] = useState<[string, number][]>([]);

  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setValue(e.target.value ?? "");
    },
    []
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
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
      }
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
            "p-4 rounded-xl outline-none bg-slate-700 border border-solid border-slate-400",
            inter.className
          )}
        />
        <button
          type="submit"
          aria-label="go"
          className="ml-8 p-4 hover:opacity-60 duration-75"
        >
          Go
        </button>
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
      <div className={classNames("flex flex-col gap-4 mt-10", inter.className)}>
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
    </>
  );
};

export default MainForm;
