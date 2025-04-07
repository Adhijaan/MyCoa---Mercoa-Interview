"use client";

interface Prop {
  mercoaJWT: string;
}

export default function MercoaWrapper({ mercoaJWT }: Prop) {
  return (
    <iframe
      src={`https://mercoa.com/embedded?token=${mercoaJWT}`}
      id="mercoaIframe"
      style={{ display: "block", width: "100%", height: "1050px", border: "none" }}
      allow="clipboard-write"></iframe>
  );
}
