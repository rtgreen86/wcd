import './Spinner.css';

export const Spinner = ({
  stop = false,
}: {
  stop?: boolean
}) => (
  <div className={`spinner spinner-border text-primary${stop ? ' stop-animation' : ''}`} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
);
