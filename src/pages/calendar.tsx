import Head from "next/head";
import CalendarView from "~/components/Calendar/CalendarView";
import Navbar from "~/components/Navbar";

export default function Calendar() {
  return (
    <>
      <Head>
        <title>PRM - Calendar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen w-screen">
        <Navbar />

        <div className="px-0 lg:px-44 w-full flex flex-col gap-8 items-center mt-8">
          <CalendarView />
        </div>
      </div>
    </>
  )
}
