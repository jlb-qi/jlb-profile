import { useParams, Navigate } from 'react-router-dom';
import { ProjectDetail } from '../components/ProjectDetail';
import { projects } from '../data/projects';

export const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return <ProjectDetail project={project} />;
};

export default ProjectPage;
