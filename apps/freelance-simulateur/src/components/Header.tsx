import React from 'react';
import { Github, Linkedin } from 'lucide-react';

export function Header() {
  return (
    <header className="container mx-auto px-4 py-6 flex justify-between items-center">
      <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
        Briller
      </div>
      <div className="flex gap-4">
        <a 
          href="https://github.com/Seboran/monorepo" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900"
        >
          <Github className="w-6 h-6" />
        </a>
        <a 
          href="https://bsky.app/profile/nirinarabeson.fr" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-400 hover:text-blue-500"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L1 21h22L12 2zm0 4.5l8 14H4l8-14z" />
          </svg>
        </a>
        <a 
          href="https://www.linkedin.com/in/nirinarabeson/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700"
        >
          <Linkedin className="w-6 h-6" />
        </a>
      </div>
    </header>
  );
}