import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  profile,
  projects,
  hydratePortfolioFromServer,
  savePortfolioAdminData,
  resetPortfolioAdminData,
  type Project,
} from "@/data/portfolio";

const title = "Admin — Portfolio Content Manager";
const description = "Manage portfolio profile and project data without editing source files.";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AdminPage,
});

type AdminProfileForm = typeof profile;
type AdminProjectForm = Project;

function AdminPage() {
  const [profileForm, setProfileForm] = useState<AdminProfileForm>(profile);
  const [projectForm, setProjectForm] = useState<AdminProjectForm[]>(projects);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    void hydratePortfolioFromServer();
    setProfileForm(profile);
    setProjectForm(projects);
  }, []);

  const hasChanges = useMemo(() => {
    const profileChanged = JSON.stringify(profileForm) !== JSON.stringify(profile);
    const projectsChanged = JSON.stringify(projectForm) !== JSON.stringify(projects);
    return profileChanged || projectsChanged;
  }, [profileForm, projectForm]);

  function makeEmptyProject(): Project {
    const nextIndex = projectForm.length + 1;
    return {
      slug: `project-${nextIndex}`,
      title: `New Project ${nextIndex}`,
      kind: "Custom project",
      featured: false,
      summary: "Add a short summary for this project.",
      problem: "Describe the problem this project solves.",
      approach: ["Add the approach to this project."],
      architecture: ["Add the system architecture."],
      outcomes: ["Add the outcome or impact."],
      stack: ["React", "TypeScript"],
      repo: "",
    };
  }

  function addProject() {
    setProjectForm((current) => [...current, makeEmptyProject()]);
  }

  function removeProject(projectIndex: number) {
    setProjectForm((current) => current.filter((_, index) => index !== projectIndex));
  }

  function save() {
    savePortfolioAdminData({
      profile: profileForm,
      projects: projectForm,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  function reset() {
    resetPortfolioAdminData();
    setProfileForm(profile);
    setProjectForm(projects);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  function updateProject(
    projectIndex: number,
    field: keyof AdminProjectForm,
    value: string | boolean,
  ) {
    setProjectForm((current) =>
      current.map((project, index) => {
        if (index !== projectIndex) return project;

        if (field === "featured") {
          return { ...project, featured: Boolean(value) };
        }

        if (
          field === "approach" ||
          field === "architecture" ||
          field === "outcomes" ||
          field === "stack"
        ) {
          return {
            ...project,
            [field]: Array.isArray(value)
              ? value
              : String(value)
                  .split("\n")
                  .map((line) => line.trim())
                  .filter(Boolean),
          };
        }

        return {
          ...project,
          [field]: value,
        };
      }),
    );
  }

  function updateListField(
    projectIndex: number,
    field: "approach" | "architecture" | "outcomes" | "stack",
    value: string,
  ) {
    updateProject(
      projectIndex,
      field,
      value
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Portfolio admin</p>
          <h1 className="mt-2 text-3xl font-bold">Manage portfolio content</h1>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={save}
            disabled={!hasChanges}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saved ? "Saved" : "Save changes"}
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <section className="card-surface p-6">
          <h2 className="text-xl font-semibold">Profile</h2>
          <div className="mt-5 space-y-4">
            {[
              ["name", "Name"],
              ["shortName", "Short name"],
              ["tagline", "Tagline"],
              ["location", "Location"],
              ["email", "Email"],
              ["phone", "Phone"],
              ["github", "GitHub URL"],
              ["githubUser", "GitHub username"],
              ["leetcodeUser", "LeetCode username"],
              ["linkedin", "LinkedIn URL"],
              ["photo", "Photo path"],
              ["resumeUrl", "Resume URL"],
            ].map(([key, label]) => (
              <label key={key} className="block text-sm text-muted-foreground">
                <span className="mb-1 block text-xs font-medium uppercase tracking-[0.08em]">
                  {label}
                </span>
                <input
                  value={profileForm[key as keyof AdminProfileForm] as string}
                  onChange={(e) =>
                    setProfileForm((current) => ({
                      ...current,
                      [key]: e.target.value,
                    }))
                  }
                  className="w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-foreground outline-none focus:border-primary/60"
                />
              </label>
            ))}

            <label className="block text-sm text-muted-foreground">
              <span className="mb-1 block text-xs font-medium uppercase tracking-[0.08em]">
                Summary
              </span>
              <textarea
                rows={5}
                value={profileForm.summary}
                onChange={(e) =>
                  setProfileForm((current) => ({ ...current, summary: e.target.value }))
                }
                className="w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-foreground outline-none focus:border-primary/60"
              />
            </label>
          </div>
        </section>

        <section className="card-surface p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Projects</h2>
            <button
              type="button"
              onClick={addProject}
              className="rounded-md border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-primary"
            >
              Add project
            </button>
          </div>
          <div className="mt-5 space-y-6">
            {projectForm.map((project, index) => (
              <div
                key={project.slug || index}
                className="rounded-xl border border-border bg-surface-2/50 p-4"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <strong className="text-sm uppercase tracking-[0.08em] text-muted-foreground">
                    Project {index + 1}
                  </strong>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-xs text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={project.featured}
                        onChange={(e) => updateProject(index, "featured", e.target.checked)}
                      />
                      Featured
                    </label>
                    <button
                      type="button"
                      onClick={() => removeProject(index)}
                      className="rounded-md border border-destructive/30 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-destructive"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    value={project.title}
                    onChange={(e) => updateProject(index, "title", e.target.value)}
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm"
                    placeholder="Title"
                  />
                  <input
                    value={project.kind}
                    onChange={(e) => updateProject(index, "kind", e.target.value)}
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm"
                    placeholder="Kind"
                  />
                  <input
                    value={project.slug}
                    onChange={(e) => updateProject(index, "slug", e.target.value)}
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm md:col-span-2"
                    placeholder="slug"
                  />
                  <textarea
                    rows={3}
                    value={project.summary}
                    onChange={(e) => updateProject(index, "summary", e.target.value)}
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm md:col-span-2"
                    placeholder="Summary"
                  />
                  <textarea
                    rows={3}
                    value={project.problem}
                    onChange={(e) => updateProject(index, "problem", e.target.value)}
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm md:col-span-2"
                    placeholder="Problem"
                  />
                  <textarea
                    rows={4}
                    value={project.approach.join("\n")}
                    onChange={(e) => updateListField(index, "approach", e.target.value)}
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm md:col-span-2"
                    placeholder="Approach (one item per line)"
                  />
                  <textarea
                    rows={4}
                    value={project.architecture.join("\n")}
                    onChange={(e) => updateListField(index, "architecture", e.target.value)}
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm md:col-span-2"
                    placeholder="Architecture (one item per line)"
                  />
                  <textarea
                    rows={4}
                    value={project.outcomes.join("\n")}
                    onChange={(e) => updateListField(index, "outcomes", e.target.value)}
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm md:col-span-2"
                    placeholder="Outcomes (one item per line)"
                  />
                  <textarea
                    rows={3}
                    value={project.stack.join("\n")}
                    onChange={(e) => updateListField(index, "stack", e.target.value)}
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm md:col-span-2"
                    placeholder="Stack (one item per line)"
                  />
                  <input
                    value={project.repo ?? ""}
                    onChange={(e) => updateProject(index, "repo", e.target.value)}
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm md:col-span-2"
                    placeholder="Repository URL"
                  />
                </div>

                <div className="mt-3 text-xs text-muted-foreground">
                  Update the project details and click Save changes.
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
