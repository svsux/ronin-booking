import * as cookie from "cookie";

export function parseCookies(req) {
  if (typeof window === "undefined") {
    return cookie.parse(req ? req.headers.cookie || "" : "");
  } else {
    return cookie.parse(document.cookie || "");
  }
}
