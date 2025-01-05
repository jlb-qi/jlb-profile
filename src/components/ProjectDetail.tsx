import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { ProjectData } from '../data/projects';

interface ProjectDetailProps {
  project: ProjectData;
}

export const ProjectDetail = ({ project }: ProjectDetailProps) => {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/projects" className="inline-block mb-8 text-white hover:text-gray-300">
          ← Back to Projects
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
          
          <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg mb-8" />
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-gray-300">{project.overview}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Core Problem</h2>
              <p className="text-gray-300">{project.coreProblem}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Goal</h2>
              <p className="text-gray-300">{project.goal}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Technical Details</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {project.technicalDetails.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {project.keyFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Current Status</h2>
              <div className="space-y-3 text-gray-300">
                <p><span className="font-medium">Current State:</span> {project.status.currentState}</p>
                {project.status.challenges && (
                  <p><span className="font-medium">Challenges:</span> {project.status.challenges}</p>
                )}
                {project.status.nextSteps && (
                  <p><span className="font-medium">Next Steps:</span> {project.status.nextSteps}</p>
                )}
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
