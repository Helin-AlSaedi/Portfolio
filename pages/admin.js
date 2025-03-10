import { useState, useContext } from "react";
import { PortfolioContext } from "@/contexts/PortfolioContext";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    techSkills,
    addTechSkill,
    deleteTechSkill,
  } = useContext(PortfolioContext);

  const [techInput, setTechInput] = useState("");
  const [projectForm, setProjectForm] = useState({
    id: "",
    title: "",
    image: "",
    description: "",
    tech: [],
    link: "",
  });

  const [techSkillName, setTechSkillName] = useState("");
  const [techSkillUrl, setTechSkillUrl] = useState("");

  function handleLogin() {
    if (username === "admin" && password === "password") {
      setLoggedIn(true);
    } else {
      alert("Invalid login");
    }
  }

  function keyDown(e) {
    if (e.key === "Enter") {
      handleLogin();
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setProjectForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (projectForm.id) {
      updateProject(projectForm);
    } else {
      const newProject = { ...projectForm, id: Date.now().toString() };
      addProject(newProject);
    }

    setProjectForm({
      id: "",
      title: "",
      image: "",
      description: "",
      tech: [],
      link: "",
    });
  }

  function handleEdit(project) {
    setProjectForm(project);
  }

  function handleDelete(id) {
    deleteProject(id);
  }

  function addTechToProject() {
    const trimmedTech = techInput.trim();
    if (trimmedTech !== "" && !projectForm.tech.includes(trimmedTech)) {
      setProjectForm({
        ...projectForm,
        tech: [...projectForm.tech, trimmedTech],
      });
      setTechInput("");
    }
  }

  function removeTechFromProject(techToRemove) {
    setProjectForm({
      ...projectForm,
      tech: projectForm.tech.filter((tech) => tech !== techToRemove),
    });
  }

  function handleTechSkillSubmit(e) {
    e.preventDefault();
    if (techSkillName.trim() !== "" && techSkillUrl.trim() !== "") {
      addTechSkill({ name: techSkillName.trim(), url: techSkillUrl.trim() });
      setTechSkillName("");
      setTechSkillUrl("");
    }
  }

  function handleDeleteTechSkill(skill) {
    deleteTechSkill(skill);
  }

  if (!loggedIn) {
    return (
      <div className="mx-auto max-w-sm p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <div className="form-control mb-4">
          <label className="label">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered"
            placeholder="Username"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered"
            placeholder="Password"
            onKeyDown={keyDown}
          />
        </div>
        <button onClick={handleLogin} className="btn btn-primary w-full">
          Log In
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="navbar ">
        <div className="flex w-full items-center justify-between">
          <div className="text-lg font-bold">Admin Dashboard</div>
          <div className="flex items-center">
            <ThemeSwitcher />
            <a href="/" className="btn btn-square btn-ghost ml-5">
              Home
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Projects</h2>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-8">
          <div className="form-control mb-4">
            <label className="label">Title</label>
            <input
              type="text"
              name="title"
              value={projectForm.title}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">Image</label>
            <input
              type="text"
              name="image"
              value={projectForm.image}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="Image URL"
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">Description</label>
            <textarea
              name="description"
              value={projectForm.description}
              onChange={handleChange}
              className="textarea textarea-bordered"
              required
            ></textarea>
          </div>

          <div className="form-control mb-4">
            <label className="label">Project Link</label>
            <input
              type="text"
              name="link"
              value={projectForm.link}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="Project URL"
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">Tech Used</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                className="input input-bordered flex-1"
                placeholder="e.g., React"
              />
              <button
                type="button"
                onClick={addTechToProject}
                className="btn btn-secondary"
              >
                Add Tech
              </button>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {projectForm.tech.map((tech, index) => (
                <div
                  key={index}
                  className="badge badge-outline flex items-center gap-1 cursor-pointer"
                  onClick={() => removeTechFromProject(tech)}
                >
                  {tech} <span className="text-xs">✕</span>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            {projectForm.id ? "Update Project" : "Add Project"}
          </button>
        </form>

        <div className="overflow-x-auto mb-12">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Tech</th>
                <th>Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No projects available.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.title}</td>
                    <td>{project.description}</td>
                    <td>
                      {project.tech.map((tech, index) => (
                        <span
                          key={index}
                          className="badge badge-secondary mr-1"
                        >
                          {tech}
                        </span>
                      ))}
                    </td>
                    <td>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link link-primary"
                        >
                          View
                        </a>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleEdit(project)}
                        className="btn btn-sm btn-info mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <h2 className="text-3xl font-bold mb-4 text-center">Tech Skills</h2>
        <form
          onSubmit={handleTechSkillSubmit}
          className="max-w-xl mx-auto mb-8 flex flex-col gap-4"
        >
          <div className="form-control">
            <label className="label">Tech Skill Name</label>
            <input
              type="text"
              value={techSkillName}
              onChange={(e) => setTechSkillName(e.target.value)}
              className="input input-bordered"
              placeholder="Enter tech skill name"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Tech Skill Image URL</label>
            <input
              type="text"
              value={techSkillUrl}
              onChange={(e) => setTechSkillUrl(e.target.value)}
              className="input input-bordered"
              placeholder="Enter tech skill image URL"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Add Tech Skill
          </button>
        </form>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {techSkills.length === 0 ? (
            <p>No tech skills available.</p>
          ) : (
            techSkills.map((skill, index) => (
              <div key={index} className="relative">
                <img
                  src={skill.url}
                  alt={skill.name}
                  className="w-16 h-16 object-contain rounded-full"
                />
                <p className="text-center text-xs mt-1">{skill.name}</p>
                <button
                  onClick={() => handleDeleteTechSkill(skill.name)}
                  className="btn btn-sm btn-error absolute -top-2 -right-2 rounded-full"
                >
                  X
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
