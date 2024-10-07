// Github.jsx
import React from 'react';
import { useLoaderData } from 'react-router-dom';

function Github() {
  const { userData, repos } = useLoaderData();

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      {/* User Information Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start">
        {/* Avatar Image */}
        <div className="flex-shrink-0">
          <img
            src={userData.avatar_url}
            alt={`${userData.login} Avatar`}
            className="w-48 h-48 rounded-full mb-4 md:mb-0 md:mr-6 object-cover"
          />
        </div>

        {/* User Details */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold mb-2">{userData.name || userData.login}</h1>
          <p className="text-lg">
            <strong>Followers:</strong> {userData.followers}
          </p>
          <p className="text-lg">
            <strong>Public Repositories:</strong> {userData.public_repos}
          </p>
          <div className="mt-2">
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              View GitHub Profile
            </a>
          </div>
        </div>
      </div>

      {/* Repositories Section */}
      <div className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">Repositories</h2>
        {repos.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map((repo) => (
              <li
                key={repo.id}
                className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 font-semibold text-xl hover:underline"
                >
                  {repo.name}
                </a>
                {repo.description && (
                  <p className="mt-2 text-gray-300">{repo.description}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No repositories found.</p>
        )}
      </div>
    </div>
  );
}

export default Github;

export const githubInfoLoader = async () => {
  // Fetch user data
  const userResponse = await fetch('https://api.github.com/users/Dheerajsharma13');
  if (!userResponse.ok) {
    throw new Error('Failed to fetch GitHub user data');
  }
  const userData = await userResponse.json();

  // Fetch repositories using the repos_url from user data
  const reposResponse = await fetch(userData.repos_url);
  if (!reposResponse.ok) {
    throw new Error('Failed to fetch GitHub repositories');
  }
  const repos = await reposResponse.json();

  return { userData, repos };
};
