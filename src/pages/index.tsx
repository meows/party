import { type NextPage } from "next";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Button from "~/components/Button";
import Input from "~/components/Input";
import { api } from "~/utils/api";
import TopMenu from "~/components/TopMenu";
import Select, { createFilter } from "react-select";
import { DropDownButton, DropDownItem } from "~/components/DropDownButton";
import Feed from "~/components/Feed";

// —————————————————————————————————————————————————————————————————————————————
// Environment

export interface StateOption {
  readonly value: string;
  readonly label: string;
}

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const stateOptions: readonly StateOption[] = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AS", label: "American Samoa" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "DC", label: "District Of Columbia" },
  { value: "FM", label: "Federated States Of Micronesia" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "GU", label: "Guam" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MH", label: "Marshall Islands" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "MP", label: "Northern Mariana Islands" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PW", label: "Palau" },
  { value: "PA", label: "Pennsylvania" },
  { value: "PR", label: "Puerto Rico" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VI", label: "Virgin Islands" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

export const colourOptions: readonly ColourOption[] = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

// —————————————————————————————————————————————————————————————————————————————
// Component

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [ignoreCase] = useState(true);
  const [ignoreAccents] = useState(true);
  const [trim] = useState(false);
  const [matchFromStart] = useState(false);

  const filterConfig = {
    ignoreCase,
    ignoreAccents,
    trim,
    matchFrom: matchFromStart ? ("start" as const) : ("any" as const),
  };
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-700">
        <div className="m-auto flex min-h-screen min-w-[375px] max-w-[600px] flex-col bg-gradient-to-b from-gray-900 to-gray-700 px-5">
          <TopMenu active="accounts" />
          <div className="flex min-w-[375px] flex-row items-center justify-center gap-2 p-5">
            <Select
              className="w-1/2 min-w-[150px] whitespace-nowrap text-xs"
              // defaultValue={colourOptions[0]}
              placeholder={"Search events..."}
              isClearable={false}
              isSearchable={true}
              name="events"
              options={colourOptions}
              // filterOption={createFilter(filterConfig)}
            />
            <Select
              className="w-1/2 min-w-[150px] whitespace-nowrap text-xs"
              // defaultValue={stateOptions[0]}
              placeholder={"Search City"}
              isClearable={false}
              isSearchable
              name="city"
              options={stateOptions}
              filterOption={createFilter(filterConfig)}
            />
          </div>
          <div className="flex min-w-[300px] flex-row items-center justify-center gap-2 p-5">
          <DropDownButton defaultValue={"Any day" as SortDateRange} name="Time Frame:">
            <DropDownItem>Any day</DropDownItem>
            <DropDownItem>Today</DropDownItem>
            <DropDownItem>Tomorrow</DropDownItem>
            <DropDownItem>Upcoming Week</DropDownItem>
            <DropDownItem>Upcoming Weekend</DropDownItem>
            <DropDownItem>Custom</DropDownItem>
          </DropDownButton>
          <DropDownButton defaultValue={"date" as SortEvents} name="Sort By:">
            <DropDownItem>Date</DropDownItem>
            <DropDownItem>Distance</DropDownItem>
            <DropDownItem>Popularity</DropDownItem>
          </DropDownButton>
          </div>
          <p className="px-5 py-5 text-2xl text-white">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p>
          <Button>Click me</Button>
          <Input type="textarea" />
          <Input type="text" />
          <Feed />
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};



