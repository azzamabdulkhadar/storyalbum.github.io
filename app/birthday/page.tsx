import type { Metadata } from "next";
import BirthdayScreen from "@/components/birthday/BirthdayScreen";

export const metadata: Metadata = {
  title: "Happy Birthday ♡",
  description: "A little celebration made just for her.",
};

export default function BirthdayPage() {
  return <BirthdayScreen />;
}
