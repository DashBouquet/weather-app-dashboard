import { WeatherSearch } from "@/app/containers/WeatherSearch";
export default function Home() {
  return (
    <main className="mx-auto max-w-2xl flex min-h-screen flex-col p-24">
      <WeatherSearch />
    </main>
  );
}
