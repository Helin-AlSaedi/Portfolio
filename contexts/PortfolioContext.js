import { createContext, useState, useEffect } from "react";

export const PortfolioContext = createContext();

const startingProjects = [
  {
    id: "1",
    title: "Project One",
    description: "demo project.",
    tech: ["React", "Tailwind CSS"],
    link: "https://example.com/project-one",
    image: "/project1.jpg",
  },
  {
    id: "2",
    title: "Project Two",
    description: "demo project.",
    tech: ["Next.js", "DaisyUI"],
    link: "https://example.com/project-two",
    image: "/project2.jpg",
  },
  {
    id: "3",
    title: "Project Three",
    description: "demo project.",
    tech: ["Next.js", "DaisyUI", "Javascript"],
    link: "https://example.com/project-three",
    image: "/project3.jpg",
  },
];

const startingTechSkills = [
  { name: "React", url: "/react.png" },
  { name: "JavaScript", url: "/javascript.png" },
  { name: "Tailwind CSS", url: "/tailwind.png" },
  { name: "css", url: "/css.png" },
];

export default function PortfolioProvider({ children }) {
  const [projects, setProjects] = useState(startingProjects);
  const [techSkills, setTechSkills] = useState(startingTechSkills);

  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects && JSON.parse(storedProjects).length > 0) {
      setProjects(JSON.parse(storedProjects));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    const storedTechSkills = localStorage.getItem("techSkills");
    if (storedTechSkills && JSON.parse(storedTechSkills).length > 0) {
      setTechSkills(JSON.parse(storedTechSkills));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("techSkills", JSON.stringify(techSkills));
  }, [techSkills]);

  function addProject(project) {
    setProjects([...projects, project]);
  }

  function updateProject(updatedProject) {
    setProjects(
      projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  }

  function deleteProject(id) {
    setProjects(projects.filter((project) => project.id !== id));
  }

  function addTechSkill(skill) {
    setTechSkills([...techSkills, skill]);
  }

  function deleteTechSkill(skillName) {
    setTechSkills(techSkills.filter((skill) => skill.name !== skillName));
  }

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        techSkills,
        addTechSkill,
        deleteTechSkill,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}
