import React from "react";
import Image from "next/image";

interface IWeatherCard {
  promise: Promise<any> | null;
  onRemoveAlert: () => void;
}

export const WeatherCard = async ({ promise, onRemoveAlert }: IWeatherCard) => {
  const data = await promise;

  return (
    <div className="mt-2">
      {data && !data?.error && (
        <div className="bg-white p-3 max-w-sm mx-auto">
          <div className="flex mt-4 mb-2">
            <div className="flex-1">
              <p className="text-gray-600 text-sm dark:text-gray-400">
                {`${data.name}, ${data.sys.country}`}
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-300">
                {`${data.main.temp} °C`}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {`Feels like ${data.main.feels_like} °C. ${data.weather.map(
                  (element: { main: string }) => `${element.main}.`
                )}`}
              </p>
              <div className="mt-2">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <b>wind:</b> {`${data.wind.speed} m/s`}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <b>visibility:</b>{" "}
                  {`${(data.visibility / 1000).toFixed(1)} km`}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <b>humidity:</b> {`${data.main.humidity}%`}
                </p>
              </div>
            </div>
            <div>
              {data.weather && (
                <Image
                  width={100}
                  height={100}
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt={data.weather[0].description}
                  loading="lazy"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {data?.error && (
        <div>
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline mr-6">{data.error?.message}</span>
            <span
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={onRemoveAlert}
            >
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
