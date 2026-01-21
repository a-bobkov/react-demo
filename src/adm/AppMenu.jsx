import './AppMenu.css';

export function AppMenu()
{
  return (
    <>
      <div className="Menu">
        <div className="Header">
          Applications
        </div>
        <div className="MenuItem">
          <a href="/users">
            Users
          </a>
        </div>
      </div>
    </>
  );
}
