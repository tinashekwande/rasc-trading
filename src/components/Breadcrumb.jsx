import { Link } from 'react-router-dom';

const Breadcrumb = ({ crumbs }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
      <ol className="flex items-center gap-2 list-none p-0 m-0">
        {crumbs.map((crumb, i) => (
          <li key={crumb.href} className="flex items-center gap-2">
            {i < crumbs.length - 1 ? (
              <>
                <Link to={crumb.href} className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
                <span className="text-gray-600" aria-hidden="true">/</span>
              </>
            ) : (
              <span className="text-gray-300" aria-current="page">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
