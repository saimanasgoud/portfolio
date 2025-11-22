import React from "react";
import "./Skillset.css";
import {
  FaCode,
  FaDatabase,
  FaServer,
  FaJava,
  FaTools,
} from "react-icons/fa";

function ServiceCard({ title, icon: Icon, children, colorClass, animationClass }) {
  return (
    <div
      className={`group relative bg-white border border-blue-100 p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-out ${animationClass}`}
    >
      {/* Gradient Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Icon & Title */}
      <div className="flex items-center mb-4 space-x-3">
        {Icon && (
          <div
            className={`p-3 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 group-hover:from-blue-500 group-hover:to-indigo-500 transition-all duration-500`}
          >
            <Icon
              className={`text-3xl ${colorClass} group-hover:text-white transition-colors`}
            />
          </div>
        )}
        <h2 className={`text-xl font-bold text-gray-800 group-hover:text-indigo-600`}>
          {title}
        </h2>
      </div>

      {/* Description */}
      <div className="text-gray-600 text-sm leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );
}

export default function Skillset() {
  return (
    <section className="bg-gradient-to-b text-left from-blue-50 via-white to-blue-50 px-3 py-20 mt-20 overflow-hidden">
      <div className="text-center mb-12 animate-fadeInDown">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-3">
          My Technical Skillset
        </h1>
        <p className="text-gray-600 text-sm max-w-xl mx-auto">
          A refined overview of the technologies and frameworks I work with —
          crafting seamless, performant, and scalable solutions from concept to deployment.
        </p>
      </div>

      {/* Grid layout */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        <ServiceCard
          title="Web Development"
          icon={FaCode}
          colorClass="text-blue-500"
          animationClass="animate-fadeInUp delay-100"
        >
          <ul className="list-disc list-inside space-y-2">
            <li>Responsive UI with React & Tailwind CSS</li>
            <li>Component-driven architecture (Hooks, Context API)</li>
            <li>State management with Redux & Zustand</li>
            <li>Client-side routing with React Router DOM</li>
            <li>Performance optimization (code splitting, lazy loading)</li>
            <li>Testing with Jest & React Testing Library</li>
          </ul>
        </ServiceCard>

        <ServiceCard
          title="Java & OOP"
          icon={FaJava}
          colorClass="text-orange-600"
          animationClass="animate-fadeInUp delay-200"
        >
          <ul className="list-disc list-inside space-y-2">
            <li>Java (Collections, Generics)</li>
            <li>OOP Principles: Inheritance, Polymorphism, Abstraction, Encapsulation</li>
            <li>Multithreading & Synchronization</li>
            <li>Java 8+ features: Streams & Lambdas</li>
            <li>Unit testing with JUnit</li>
            <li>Build tools: Maven & Gradle</li>
          </ul>
        </ServiceCard>

        <ServiceCard
          title="Backend & APIs"
          icon={FaServer}
          colorClass="text-green-600"
          animationClass="animate-fadeInUp delay-300"
        >
          <ul className="list-disc list-inside space-y-2">
            <li>Spring Boot: RESTful services & dependency injection</li>
            <li>Database integration with MySQL</li>
            <li>ORM with Hibernate & JPA</li>
            <li>Spring Security: Authentication & Authorization</li>
            <li>API documentation with Swagger/OpenAPI</li>
            <li>Testing with Postman & integration tests</li>
          </ul>
        </ServiceCard>

        <ServiceCard
          title="Databases & Version Control"
          icon={FaDatabase}
          colorClass="text-indigo-600"
          animationClass="animate-fadeInUp delay-400"
        >
          <ul className="list-disc list-inside space-y-2">
            <li>SQL: schema design, indexing, complex queries</li>
            <li>Version control with Git & GitHub collaboration</li>
            <li>Active contributions to open-source repositories</li>
            <li>NoSQL basics (MongoDB)</li>
            <li>Database backups & migrations</li>
          </ul>
        </ServiceCard>

        <ServiceCard
          title="Firebase & Realtime DB"
          icon={FaDatabase}
          colorClass="text-yellow-600"
          animationClass="animate-fadeInUp delay-600"
        >
          <ul className="list-disc list-inside space-y-2">
            <li>Implemented real-time messaging using Firebase Realtime Database</li>
            <li>Secured data operations with Firebase Authentication & Rules</li>
            <li>Designed scalable data structure for fast read/write performance</li>
            <li>Integrated seamless CRUD operations for live applications</li>
            <li>Cloud Functions for serverless business logic</li>
            <li>Analytics & Crashlytics integration for app insights</li>
          </ul>
        </ServiceCard>

        <ServiceCard
          title="Additional Skills"
          icon={FaTools}
          colorClass="text-pink-600"
          animationClass="animate-fadeInUp delay-500"
        >
          <ul className="list-disc list-inside space-y-2">
            <li>Agile methodologies & teamwork</li>
            <li>Responsive design & accessibility</li>
            <li>Problem-solving on HackerRank (DSA & algorithms)</li>
            <li>Strong analytical & communication skills</li>
            <li>CI/CD pipelines (GitHub Actions)</li>
            <li>Mentoring & code reviews</li>
          </ul>
        </ServiceCard>


      </div>
    </section>
  );
}
