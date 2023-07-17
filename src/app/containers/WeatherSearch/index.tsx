"use client";
import { makeRequest } from "@/api";
import SearchInput from "@/components/SearchInput";
import React, { Suspense, useCallback, useState } from "react";
import { WeatherCard } from "./WeatherCard";
import { Loading } from "./Loading";

export const WeatherSearch = () => {
  const [data, setData] = useState<null | Promise<any>>(null);

  const onSearch = useCallback(async (value: string) => {
    const newData = makeRequest({
      endpoint: "currentWeather",
      params: { query: value },
    });

    setData(newData);
  }, []);

  const removeAlert = useCallback(() => {
    setData(null);
  }, []);

  return (
    <>
      <SearchInput onSearch={onSearch} />
      <Suspense fallback={<Loading />}>
        <WeatherCard promise={data} onRemoveAlert={removeAlert} />
      </Suspense>
    </>
  );
};
