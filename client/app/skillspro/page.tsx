import { Field } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"

type Skill = {
  name: string
  value: number
}

const frontendSkills: Skill[] = [
  { name: "HTML", value: 95  },
  { name: "CSS", value: 95 },
  { name: "JavaScript", value: 75 },
  { name: "React", value: 70 },
  { name: "Next.js", value: 70 },
  { name: "TypeScript", value: 80 },
  { name: "Bootstrap", value: 99 },
  { name: "Tailwind", value: 90 },
  { name: "Redux", value: 70 },
]

const backendSkills: Skill[] = [
  { name: "Node.js", value: 70 },
  { name: "Express", value: 75 },
  { name: "PostgreSQL", value: 80 },
  { name: "MongoDB", value: 78 },
]
const otherSkills: Skill[] = [
  { name: "Github", value: 70 },
  { name: "Figma", value: 75 },
  { name: "Vercel", value: 80 },
  { name: "Canva", value: 78 },
]

export default function ProgressWithLabel() {
  const skillGroups = [
    { title: "Frontend", skills: frontendSkills, prefix: "frontend" },
    { title: "Backend", skills: backendSkills, prefix: "backend" },
    { title: "Other Skills", skills: otherSkills, prefix: "other" },
  ]

  return (
    <section className="m-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3 h-auto">
      {skillGroups.map((group) => (
        <Field key={group.title} className="w-full rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              {group.title}
            </p>
          </div>

          <div className="space-y-4">
            {group.skills.map((skill) => {
              const id = `${group.prefix}-${skill.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`

              return (
                <div key={skill.name} className="space-y-2">
                  <label htmlFor={id} className="text-sm font-medium text-foreground">{skill.name}</label>
                  <div className="flex items-center gap-2">
                    <Progress value={skill.value} id={id} className="flex-1" />
                    <span className="text-sm font-medium text-muted-foreground">{skill.value}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </Field>
      ))}
    </section>
  )
}
