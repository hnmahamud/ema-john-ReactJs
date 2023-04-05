import { FaceFrownIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

// Error page
const ErrorPage = () => {
  const { error, status } = useRouteError();
  console.error(error);
  return (
    <section className="flex items-center h-screen">
      <div className="flex flex-col items-center justify-center px-5 mx-auto my-8">
        <FaceFrownIcon className="w-20 h-20 text-yellow-500" />
        <div className="text-center">
          <h2 className="mb-8 font-extrabold text-6xl text-yellow-500">
            <span className="sr-only">Error</span>
            {status || 404}
          </h2>
          <p className="text-lg font-semibold md:text-xl text-red-800 mb-8">
            {error?.message}
          </p>
          <Link to="/" className="btn btn-xs border-0 rounded-md transition-colors duration-200 bg-blue-500 hover:bg-blue-600 px-12">
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
