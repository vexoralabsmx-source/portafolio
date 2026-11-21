import { NAME, ROLE, LOCATION, SITE_URL, DESCRIPTION } from "@/lib/portfolio";
import { FALLBACK_PROJECTS } from "@/app/work/content";

export function GET() {
  return Response.json({
    name: NAME,
    role: ROLE,
    website: SITE_URL,
    location: LOCATION,
    description: DESCRIPTION,
    projects: FALLBACK_PROJECTS.map(({ title, description, link }) => ({ title, description, link })),
  });
}
