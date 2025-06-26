import React from "react";

type FormattedDateProps = {
  date: Date | string;
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
};

export default function FormattedDate({
  date,
  locale = "en-US",
  options = { dateStyle: "full" },
}: FormattedDateProps) {
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  const formatted = new Intl.DateTimeFormat(locale, options).format(parsedDate);

  return <time dateTime={parsedDate.toISOString()}>{formatted}</time>;
}
