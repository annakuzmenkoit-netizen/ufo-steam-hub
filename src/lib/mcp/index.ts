import { defineMcp } from "@lovable.dev/mcp-js";
import listCourses from "./tools/list-courses";
import listCamps from "./tools/list-camps";
import getContacts from "./tools/get-contacts";
import submitRegistration from "./tools/submit-registration";

export default defineMcp({
  name: "ufo-steam-hub-mcp",
  title: "UFO STEAM HUB",
  version: "0.1.0",
  instructions:
    "Tools for UFO STEAM HUB — a children's STEAM education center in Kremenchuk. Use `list_courses` to see courses (ages, prices, descriptions), `list_camps` for seasonal camps, `get_contacts` for address/email/hours, and `submit_registration` to send an enrollment request to the team.",
  tools: [listCourses, listCamps, getContacts, submitRegistration],
});
